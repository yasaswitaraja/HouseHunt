import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import API_URL from "../api";

function AdminDashboard() {
    const [users, setUsers] = useState([]);
    const [properties, setProperties] = useState([]);
    const [bookings, setBookings] = useState([]);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const token = localStorage.getItem("token");

    const headers = {
        Authorization: `Bearer ${token}`
    };

    const fetchAdminData = useCallback(async () => {
        try {
            setError("");

            const [usersResponse, propertiesResponse, bookingsResponse] =
                await Promise.all([
                    axios.get(
                        `${API_URL}/api/admin/users`,
                        { headers }
                    ),

                    axios.get(
                        `${API_URL}/api/admin/properties`,
                        { headers }
                    ),

                    axios.get(
                        `${API_URL}/api/admin/bookings`,
                        { headers }
                    )
                ]);

            setUsers(
                usersResponse.data.users || []
            );

            setProperties(
                propertiesResponse.data.properties || []
            );

            setBookings(
                bookingsResponse.data.bookings || []
            );

        } catch (error) {
            console.error(
                "Admin data error:",
                error
            );

            setError(
                error.response?.data?.message ||
                "Unable to load admin dashboard."
            );
        } finally {
            setLoading(false);
        }
    }, [token]);

    useEffect(() => {
        fetchAdminData();
    }, [fetchAdminData]);

    const approveProperty = async (propertyId) => {
        try {
            setError("");

            await axios.put(
                `${API_URL}/api/admin/properties/${propertyId}/approve`,
                {},
                { headers }
            );

            await fetchAdminData();

        } catch (error) {
            console.error(
                "Approve property error:",
                error
            );

            setError(
                error.response?.data?.message ||
                "Unable to approve property."
            );
        }
    };

    const rejectProperty = async (propertyId) => {
        try {
            setError("");

            await axios.put(
                `${API_URL}/api/admin/properties/${propertyId}/reject`,
                {},
                { headers }
            );

            await fetchAdminData();

        } catch (error) {
            console.error(
                "Reject property error:",
                error
            );

            setError(
                error.response?.data?.message ||
                "Unable to reject property."
            );
        }
    };

    const approveBooking = async (bookingId) => {
        try {
            setError("");

            const response = await axios.put(
                `${API_URL}/api/admin/bookings/${bookingId}/approve`,
                {},
                { headers }
            );

            console.log(
                "APPROVED BOOKING:",
                response.data.booking
            );

            await fetchAdminData();

        } catch (error) {
            console.error(
                "Approve booking error:",
                error
            );

            setError(
                error.response?.data?.message ||
                "Unable to approve booking."
            );
        }
    };

    const rejectBooking = async (bookingId) => {
        try {
            setError("");

            const response = await axios.put(
                `${API_URL}/api/admin/bookings/${bookingId}/reject`,
                {},
                { headers }
            );

            console.log(
                "REJECTED BOOKING:",
                response.data.booking
            );

            await fetchAdminData();

        } catch (error) {
            console.error(
                "Reject booking error:",
                error
            );

            setError(
                error.response?.data?.message ||
                "Unable to reject booking."
            );
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

    const getStatusClass = (status) => {
        switch (status) {
            case "approved":
                return "hh-status-approved";

            case "rejected":
                return "hh-status-rejected";

            case "cancelled":
                return "hh-status-cancelled";

            default:
                return "hh-status-pending";
        }
    };

    if (loading) {
        return (
            <section className="hh-section">
                <div className="container">
                    <p className="hh-muted">
                        Loading admin dashboard...
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
                        Admin Dashboard
                    </h2>

                    <p className="hh-muted">
                        Manage users, properties and
                        booking requests.
                    </p>
                </div>

                {error && (
                    <div className="alert alert-danger">
                        {error}
                    </div>
                )}

                {/* STATS */}

                <div className="row g-4 mb-5">

                    <div className="col-md-3">
                        <div className="hh-card p-4">
                            <small className="hh-muted">
                                Total Users
                            </small>

                            <h2 className="mt-2 mb-0">
                                {users.length}
                            </h2>
                        </div>
                    </div>

                    <div className="col-md-3">
                        <div className="hh-card p-4">
                            <small className="hh-muted">
                                Total Properties
                            </small>

                            <h2 className="mt-2 mb-0">
                                {properties.length}
                            </h2>
                        </div>
                    </div>

                    <div className="col-md-3">
                        <div className="hh-card p-4">
                            <small className="hh-muted">
                                Pending Properties
                            </small>

                            <h2 className="mt-2 mb-0">
                                {
                                    properties.filter(
                                        (property) =>
                                            !property.approved
                                    ).length
                                }
                            </h2>
                        </div>
                    </div>

                    <div className="col-md-3">
                        <div className="hh-card p-4">
                            <small className="hh-muted">
                                Pending Bookings
                            </small>

                            <h2 className="mt-2 mb-0">
                                {
                                    bookings.filter(
                                        (booking) =>
                                            booking.status ===
                                            "pending"
                                    ).length
                                }
                            </h2>
                        </div>
                    </div>

                </div>

                {/* PROPERTIES */}

                <div className="mb-5">

                    <div className="mb-4">
                        <h3>
                            Property Management
                        </h3>

                        <p className="hh-muted">
                            Review and manage property
                            listings.
                        </p>
                    </div>

                    <div className="hh-card p-0 overflow-hidden">

                        <div className="table-responsive">

                            <table className="table table-dark table-hover mb-0">

                                <thead>
                                    <tr>
                                        <th>Property</th>
                                        <th>Owner</th>
                                        <th>Location</th>
                                        <th>Price</th>
                                        <th>Status</th>
                                        <th>Approval</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>

                                <tbody>

                                    {properties.length === 0 ? (
                                        <tr>
                                            <td
                                                colSpan="7"
                                                className="text-center py-4"
                                            >
                                                No properties found.
                                            </td>
                                        </tr>
                                    ) : (
                                        properties.map(
                                            (property) => (
                                                <tr
                                                    key={
                                                        property._id
                                                    }
                                                >
                                                    <td>
                                                        <strong>
                                                            {
                                                                property.title
                                                            }
                                                        </strong>
                                                    </td>

                                                    <td>
                                                        {
                                                            property
                                                                .owner
                                                                ?.name
                                                        }
                                                    </td>

                                                    <td>
                                                        {
                                                            property.location
                                                        }
                                                    </td>

                                                    <td>
                                                        ₹
                                                        {Number(
                                                            property.price
                                                        ).toLocaleString(
                                                            "en-IN"
                                                        )}
                                                    </td>

                                                    <td>
                                                        {
                                                            property.status
                                                        }
                                                    </td>

                                                    <td>
                                                        <span
                                                            className={`hh-status ${
                                                                property.approved
                                                                    ? "hh-status-approved"
                                                                    : "hh-status-pending"
                                                            }`}
                                                        >
                                                            {property.approved
                                                                ? "Approved"
                                                                : "Pending"}
                                                        </span>
                                                    </td>

                                                    <td>
                                                        <div className="d-flex gap-2">

                                                            {!property.approved && (
                                                                <button
                                                                    className="btn btn-sm hh-btn"
                                                                    onClick={() =>
                                                                        approveProperty(
                                                                            property._id
                                                                        )
                                                                    }
                                                                >
                                                                    Approve
                                                                </button>
                                                            )}

                                                            {property.approved && (
                                                                <button
                                                                    className="btn btn-sm btn-outline-danger"
                                                                    onClick={() =>
                                                                        rejectProperty(
                                                                            property._id
                                                                        )
                                                                    }
                                                                >
                                                                    Reject
                                                                </button>
                                                            )}

                                                        </div>
                                                    </td>
                                                </tr>
                                            )
                                        )
                                    )}

                                </tbody>

                            </table>

                        </div>

                    </div>

                </div>

                {/* BOOKINGS */}

                <div className="mb-5">

                    <div className="mb-4">
                        <h3>
                            Booking Management
                        </h3>

                        <p className="hh-muted">
                            Review and manage rental
                            booking requests.
                        </p>
                    </div>

                    <div className="hh-card p-0 overflow-hidden">

                        <div className="table-responsive">

                            <table className="table table-dark table-hover mb-0">

                                <thead>
                                    <tr>
                                        <th>Property</th>
                                        <th>User</th>
                                        <th>Start Date</th>
                                        <th>End Date</th>
                                        <th>Status</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>

                                <tbody>

                                    {bookings.length === 0 ? (
                                        <tr>
                                            <td
                                                colSpan="6"
                                                className="text-center py-4"
                                            >
                                                No bookings found.
                                            </td>
                                        </tr>
                                    ) : (
                                        bookings.map(
                                            (booking) => (
                                                <tr
                                                    key={
                                                        booking._id
                                                    }
                                                >
                                                    <td>
                                                        {
                                                            booking
                                                                .property
                                                                ?.title
                                                        }
                                                    </td>

                                                    <td>
                                                        <div>
                                                            {
                                                                booking
                                                                    .user
                                                                    ?.name
                                                            }
                                                        </div>

                                                        <small className="hh-muted">
                                                            {
                                                                booking
                                                                    .user
                                                                    ?.email
                                                            }
                                                        </small>
                                                    </td>

                                                    <td>
                                                        {formatDate(
                                                            booking.startDate
                                                        )}
                                                    </td>

                                                    <td>
                                                        {formatDate(
                                                            booking.endDate
                                                        )}
                                                    </td>

                                                    <td>
                                                        <span
                                                            className={`hh-status ${getStatusClass(
                                                                booking.status
                                                            )}`}
                                                        >
                                                            {
                                                                booking.status
                                                            }
                                                        </span>
                                                    </td>

                                                    <td>

                                                        {booking.status ===
                                                            "pending" && (
                                                            <div className="d-flex gap-2">

                                                                <button
                                                                    className="btn btn-sm hh-btn"
                                                                    onClick={() =>
                                                                        approveBooking(
                                                                            booking._id
                                                                        )
                                                                    }
                                                                >
                                                                    Approve
                                                                </button>

                                                                <button
                                                                    className="btn btn-sm btn-outline-danger"
                                                                    onClick={() =>
                                                                        rejectBooking(
                                                                            booking._id
                                                                        )
                                                                    }
                                                                >
                                                                    Reject
                                                                </button>

                                                            </div>
                                                        )}

                                                        {booking.status ===
                                                            "approved" && (
                                                            <span className="hh-muted">
                                                                Approved
                                                            </span>
                                                        )}

                                                        {booking.status ===
                                                            "rejected" && (
                                                            <span className="hh-muted">
                                                                Rejected
                                                            </span>
                                                        )}

                                                        {booking.status ===
                                                            "cancelled" && (
                                                            <span className="hh-muted">
                                                                Cancelled
                                                            </span>
                                                        )}

                                                    </td>
                                                </tr>
                                            )
                                        )
                                    )}

                                </tbody>

                            </table>

                        </div>

                    </div>

                </div>

                {/* USERS */}

                <div>

                    <div className="mb-4">
                        <h3>
                            User Management
                        </h3>

                        <p className="hh-muted">
                            View registered HouseHunt
                            users.
                        </p>
                    </div>

                    <div className="hh-card p-0 overflow-hidden">

                        <div className="table-responsive">

                            <table className="table table-dark table-hover mb-0">

                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Email</th>
                                        <th>Role</th>
                                        <th>Registered</th>
                                    </tr>
                                </thead>

                                <tbody>

                                    {users.length === 0 ? (
                                        <tr>
                                            <td
                                                colSpan="4"
                                                className="text-center py-4"
                                            >
                                                No users found.
                                            </td>
                                        </tr>
                                    ) : (
                                        users.map(
                                            (user) => (
                                                <tr
                                                    key={
                                                        user._id
                                                    }
                                                >
                                                    <td>
                                                        {
                                                            user.name
                                                        }
                                                    </td>

                                                    <td>
                                                        {
                                                            user.email
                                                        }
                                                    </td>

                                                    <td>
                                                        <span className="hh-status hh-status-approved">
                                                            {
                                                                user.role
                                                            }
                                                        </span>
                                                    </td>

                                                    <td>
                                                        {formatDate(
                                                            user.createdAt
                                                        )}
                                                    </td>
                                                </tr>
                                            )
                                        )
                                    )}

                                </tbody>

                            </table>

                        </div>

                    </div>

                </div>

            </div>
        </section>
    );
}

export default AdminDashboard;