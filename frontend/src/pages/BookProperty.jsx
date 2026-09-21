import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import API_URL from "../api";

function BookProperty() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [property, setProperty] = useState(null);
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    useEffect(() => {
        const fetchProperty = async () => {
            try {
                const response = await axios.get(
                    `${API_URL}/api/properties/${id}`
                );

                setProperty(response.data.property);
            } catch (error) {
                console.error(
                    "Unable to fetch property:",
                    error
                );

                setError(
                    error.response?.data?.message ||
                    "Unable to load property."
                );
            } finally {
                setLoading(false);
            }
        };

        fetchProperty();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        setError("");
        setSuccess("");

        if (!startDate || !endDate) {
            setError(
                "Please select both start date and end date."
            );
            return;
        }

        if (new Date(startDate) >= new Date(endDate)) {
            setError(
                "End date must be after start date."
            );
            return;
        }

        if (!property?.approved) {
            setError(
                "This property is not approved for booking."
            );
            return;
        }

        if (property.status === "rented") {
            setError(
                "This property is already rented."
            );
            return;
        }

        const token = localStorage.getItem("token");

        if (!token) {
            navigate("/login");
            return;
        }

        try {
            setSubmitting(true);

            const response = await axios.post(
                `${API_URL}/api/bookings`,
                {
                    propertyId: id,
                    startDate,
                    endDate
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            console.log(
                "BOOKING CREATED:",
                response.data.booking
            );

            setSuccess(
                "Booking request submitted successfully."
            );

            setStartDate("");
            setEndDate("");

            setTimeout(() => {
                navigate("/my-bookings");
            }, 1200);

        } catch (error) {
            console.error(
                "Booking error:",
                error
            );

            setError(
                error.response?.data?.message ||
                "Unable to create booking."
            );
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) {
        return (
            <section className="hh-section">
                <div className="container">
                    <p className="hh-muted">
                        Loading property...
                    </p>
                </div>
            </section>
        );
    }

    if (!property) {
        return (
            <section className="hh-section">
                <div className="container">
                    <div className="hh-card p-4">
                        <h3>Property not found</h3>

                        <p className="hh-muted">
                            The property you are trying to
                            book could not be found.
                        </p>

                        <button
                            className="btn hh-btn"
                            onClick={() =>
                                navigate("/properties")
                            }
                        >
                            Back to Properties
                        </button>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section className="hh-section">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-lg-8">
                        <div className="mb-4">
                            <button
                                className="btn hh-btn-outline mb-3"
                                onClick={() =>
                                    navigate(
                                        `/properties/${id}`
                                    )
                                }
                            >
                                ← Back to Property
                            </button>

                            <h2 className="hh-section-title">
                                Book Property
                            </h2>

                            <p className="hh-muted">
                                Submit a booking request
                                for this property.
                            </p>
                        </div>

                        <div className="hh-card p-4">
                            <div className="mb-4">
                                <h4>
                                    {property.title}
                                </h4>

                                <p className="hh-muted mb-1">
                                    {property.location}
                                </p>

                                <p className="mb-0">
                                    <strong>
                                        ₹
                                        {Number(
                                            property.price
                                        ).toLocaleString(
                                            "en-IN"
                                        )}
                                    </strong>{" "}
                                    / month
                                </p>
                            </div>

                            {!property.approved && (
                                <div className="alert alert-warning">
                                    This property is waiting
                                    for admin approval and
                                    cannot be booked yet.
                                </div>
                            )}

                            {property.status === "rented" && (
                                <div className="alert alert-danger">
                                    This property is already
                                    rented.
                                </div>
                            )}

                            {error && (
                                <div className="alert alert-danger">
                                    {error}
                                </div>
                            )}

                            {success && (
                                <div className="alert alert-success">
                                    {success}
                                </div>
                            )}

                            <form onSubmit={handleSubmit}>
                                <div className="row g-3">
                                    <div className="col-md-6">
                                        <label
                                            className="form-label"
                                            htmlFor="startDate"
                                        >
                                            Start Date
                                        </label>

                                        <input
                                            id="startDate"
                                            type="date"
                                            className="form-control"
                                            value={startDate}
                                            onChange={(e) =>
                                                setStartDate(
                                                    e.target
                                                        .value
                                                )
                                            }
                                            min={
                                                new Date()
                                                    .toISOString()
                                                    .split(
                                                        "T"
                                                    )[0]
                                            }
                                            disabled={
                                                submitting ||
                                                !property.approved ||
                                                property.status ===
                                                    "rented"
                                            }
                                            required
                                        />
                                    </div>

                                    <div className="col-md-6">
                                        <label
                                            className="form-label"
                                            htmlFor="endDate"
                                        >
                                            End Date
                                        </label>

                                        <input
                                            id="endDate"
                                            type="date"
                                            className="form-control"
                                            value={endDate}
                                            onChange={(e) =>
                                                setEndDate(
                                                    e.target
                                                        .value
                                                )
                                            }
                                            min={
                                                startDate ||
                                                new Date()
                                                    .toISOString()
                                                    .split(
                                                        "T"
                                                    )[0]
                                            }
                                            disabled={
                                                submitting ||
                                                !property.approved ||
                                                property.status ===
                                                    "rented"
                                            }
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="mt-4">
                                    <button
                                        type="submit"
                                        className="btn hh-btn"
                                        disabled={
                                            submitting ||
                                            !property.approved ||
                                            property.status ===
                                                "rented"
                                        }
                                    >
                                        {submitting
                                            ? "Submitting..."
                                            : "Request Booking"}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default BookProperty;