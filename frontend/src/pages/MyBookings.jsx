import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import API_URL from "../api";

function MyBookings() {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [cancellingId, setCancellingId] = useState(null);

    const fetchBookings = useCallback(async () => {
        const token = localStorage.getItem("token");

        if (!token) {
            setError("Please login to view your bookings.");
            setLoading(false);
            return;
        }

        try {
            setError("");

            const response = await axios.get(
                `${API_URL}/api/bookings/my`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            console.log(
                "MY BOOKINGS RESPONSE:",
                response.data
            );

            setBookings(response.data.bookings || []);
        } catch (error) {
            console.error(
                "Fetch bookings error:",
                error
            );

            setError(
                error.response?.data?.message ||
                "Unable to load your bookings."
            );
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchBookings();

        const handleFocus = () => {
            fetchBookings();
        };

        window.addEventListener(
            "focus",
            handleFocus
        );

        return () => {
            window.removeEventListener(
                "focus",
                handleFocus
            );
        };
    }, [fetchBookings]);

    useEffect(() => {
        const handleStorageChange = () => {
            fetchBookings();
        };

        window.addEventListener(
            "storage",
            handleStorageChange
        );

        return () => {
            window.removeEventListener(
                "storage",
                handleStorageChange
            );
        };
    }, [fetchBookings]);

    const cancelBooking = async (bookingId) => {
        const token = localStorage.getItem("token");

        if (!token) {
            setError("Please login again.");
            return;
        }

        const confirmed = window.confirm(
            "Are you sure you want to cancel this booking?"
        );

        if (!confirmed) {
            return;
        }

        try {
            setCancellingId(bookingId);
            setError("");

            const response = await axios.put(
                `${API_URL}/api/bookings/${bookingId}/cancel`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            console.log(
                "BOOKING CANCELLED:",
                response.data.booking
            );

            await fetchBookings();
        } catch (error) {
            console.error(
                "Cancel booking error:",
                error
            );

            setError(
                error.response?.data?.message ||
                "Unable to cancel booking."
            );
        } finally {
            setCancellingId(null);
        }
    };

    const getStatusClass = (status) => {
        switch (status) {
            case "approved":
                return "hh-status-approved";

            case "rejected":
                return "hh-status-rejected";

            case "cancelled":
                return "hh-status-cancelled";

            case "pending":
            default:
                return "hh-status-pending";
        }
    };

    const formatDate = (date) => {
        if (!date) {
            return "—";
        }

        return new Date(date).toLocaleDateString(
            "en-IN",
            {
                day: "2-digit",
                month: "short",
                year: "numeric"
            }
        );
    };

    if (loading) {
        return (
            <section className="hh-section">
                <div className="container">
                    <p className="hh-muted">
                        Loading your bookings...
                    </p>
                </div>
            </section>
        );
    }

    return (
        <section className="hh-section">
            <div className="container">
                <div className="mb-5">
                    <h2 className="hh-section-title">
                        My Bookings
                    </h2>

                    <p className="hh-muted">
                        Track and manage your property
                        booking requests.
                    </p>
                </div>

                {error && (
                    <div className="alert alert-danger">
                        {error}
                    </div>
                )}

                {bookings.length === 0 ? (
                    <div className="hh-card p-5 text-center">
                        <h4>No bookings yet</h4>

                        <p className="hh-muted mt-2">
                            You haven't requested any
                            properties yet.
                        </p>

                        <Link
                            to="/properties"
                            className="btn hh-btn mt-3"
                        >
                            Explore Properties
                        </Link>
                    </div>
                ) : (
                    <div className="row g-4">
                        {bookings.map((booking) => (
                            <div
                                className="col-lg-6"
                                key={booking._id}
                            >
                                <div className="hh-card p-4 h-100">
                                    <div className="d-flex justify-content-between align-items-start gap-3">
                                        <div>
                                            <h4>
                                                {booking.property
                                                    ?.title ||
                                                    "Property"}
                                            </h4>

                                            <p className="hh-muted mb-0">
                                                {booking.property
                                                    ?.location ||
                                                    "Location unavailable"}
                                            </p>
                                        </div>

                                        <span
                                            className={`hh-status ${getStatusClass(
                                                booking.status
                                            )}`}
                                        >
                                            {booking.status}
                                        </span>
                                    </div>

                                    <hr />

                                    <div className="row g-3">
                                        <div className="col-6">
                                            <small className="hh-muted">
                                                Start Date
                                            </small>

                                            <p className="mb-0">
                                                {formatDate(
                                                    booking.startDate
                                                )}
                                            </p>
                                        </div>

                                        <div className="col-6">
                                            <small className="hh-muted">
                                                End Date
                                            </small>

                                            <p className="mb-0">
                                                {formatDate(
                                                    booking.endDate
                                                )}
                                            </p>
                                        </div>

                                        <div className="col-6">
                                            <small className="hh-muted">
                                                Monthly Rent
                                            </small>

                                            <p className="mb-0">
                                                ₹
                                                {Number(
                                                    booking
                                                        .property
                                                        ?.price ||
                                                        0
                                                ).toLocaleString(
                                                    "en-IN"
                                                )}
                                            </p>
                                        </div>

                                        <div className="col-6">
                                            <small className="hh-muted">
                                                Requested On
                                            </small>

                                            <p className="mb-0">
                                                {formatDate(
                                                    booking.createdAt
                                                )}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="d-flex gap-2 mt-4">
                                        {booking.property?._id && (
                                            <Link
                                                to={`/properties/${booking.property._id}`}
                                                className="btn hh-btn-outline"
                                            >
                                                View Property
                                            </Link>
                                        )}

                                        {booking.status ===
                                            "pending" && (
                                            <button
                                                className="btn btn-outline-danger"
                                                onClick={() =>
                                                    cancelBooking(
                                                        booking._id
                                                    )
                                                }
                                                disabled={
                                                    cancellingId ===
                                                    booking._id
                                                }
                                            >
                                                {cancellingId ===
                                                booking._id
                                                    ? "Cancelling..."
                                                    : "Cancel Booking"}
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
}

export default MyBookings;