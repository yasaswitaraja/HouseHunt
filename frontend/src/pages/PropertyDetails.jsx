import API_URL from "../api";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

function PropertyDetails() {
    const { id } = useParams();

    const [property, setProperty] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const defaultImages = {
        House:
            "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=85",

        Apartment:
            "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=85",

        Villa:
            "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1200&q=85",

        PG:
            "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1200&q=85",

        Room:
            "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1200&q=85"
    };

    useEffect(() => {
        const fetchProperty = async () => {
            try {
                setLoading(true);
                setError("");

                const response = await axios.get(`${API_URL}/api/properties/${id}`);                setProperty(response.data.property);
            } catch (error) {
                console.error(
                    "Error fetching property:",
                    error
                );

                setError(
                    error.response?.data?.message ||
                    "Unable to load property"
                );
            } finally {
                setLoading(false);
            }
        };

        fetchProperty();
    }, [id]);

    if (loading) {
        return (
            <div className="hh-page">
                <div className="container py-5 text-center">

                    <div
                        className="spinner-border hh-spinner"
                        role="status"
                    />

                    <p className="hh-muted mt-3">
                        Loading property...
                    </p>

                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="hh-page">
                <div className="container py-5">

                    <div className="hh-alert">
                        {error}
                    </div>

                    <Link
                        to="/properties"
                        className="hh-back-link"
                    >
                        ← Back to Properties
                    </Link>

                </div>
            </div>
        );
    }

    if (!property) {
        return null;
    }


    // ==========================================
    // PROPERTY IMAGE
    // ==========================================

    const fallbackImage =
        defaultImages[property.propertyType] ||
        defaultImages.Apartment;

    const propertyImage =
        property.images &&
        property.images.length > 0 &&
        property.images[0]
            ? property.images[0]
            : fallbackImage;


    return (
        <div className="hh-page">

            <div className="container py-5">

                {/* BACK LINK */}

                <Link
                    to="/properties"
                    className="hh-back-link"
                >
                    ← Back to Properties
                </Link>


                {/* PROPERTY CARD */}

                <div className="hh-details-card mt-4">


                    {/* ==========================================
                        IMAGE
                    ========================================== */}

                    <div className="hh-details-image">

                        <img
                            src={propertyImage}
                            alt={property.title}
                            onError={(event) => {
                                event.currentTarget.onerror = null;
                                event.currentTarget.src =
                                    fallbackImage;
                            }}
                        />

                        <span className="hh-details-type">
                            {property.propertyType}
                        </span>

                    </div>


                    {/* ==========================================
                        CONTENT
                    ========================================== */}

                    <div className="hh-details-content">

                        <div className="row g-5">


                            {/* ==================================
                                LEFT SIDE
                            ================================== */}

                            <div className="col-lg-8">

                                <p className="hh-eyebrow">
                                    VERIFIED RENTAL
                                </p>


                                <h1 className="hh-details-title">
                                    {property.title}
                                </h1>


                                <p className="hh-details-location">
                                    {property.location}
                                </p>


                                {/* PRICE */}

                                <div className="hh-details-price-box">

                                    <span className="hh-details-price">
                                        ₹
                                        {Number(
                                            property.price
                                        ).toLocaleString("en-IN")}
                                    </span>

                                    <span className="hh-price-period">
                                        /month
                                    </span>

                                </div>


                                {/* FEATURES */}

                                <div className="hh-details-features">

                                    <div>
                                        <strong>
                                            {property.bedrooms}
                                        </strong>

                                        <span>
                                            Bedrooms
                                        </span>
                                    </div>


                                    <div>
                                        <strong>
                                            {property.bathrooms}
                                        </strong>

                                        <span>
                                            Bathrooms
                                        </span>
                                    </div>


                                    <div>
                                        <strong>
                                            {property.area}
                                        </strong>

                                        <span>
                                            sq.ft
                                        </span>
                                    </div>

                                </div>


                                {/* DESCRIPTION */}

                                <div className="hh-details-section">

                                    <h2>
                                        About this property
                                    </h2>

                                    <p>
                                        {property.description}
                                    </p>

                                </div>


                                {/* PROPERTY INFORMATION */}

                                <div className="hh-details-section">

                                    <h2>
                                        Property information
                                    </h2>


                                    <div className="hh-info-grid">

                                        <div>
                                            <span>
                                                Property Type
                                            </span>

                                            <strong>
                                                {property.propertyType}
                                            </strong>
                                        </div>


                                        <div>
                                            <span>
                                                Location
                                            </span>

                                            <strong>
                                                {property.location}
                                            </strong>
                                        </div>


                                        <div>
                                            <span>
                                                Bedrooms
                                            </span>

                                            <strong>
                                                {property.bedrooms}
                                            </strong>
                                        </div>


                                        <div>
                                            <span>
                                                Bathrooms
                                            </span>

                                            <strong>
                                                {property.bathrooms}
                                            </strong>
                                        </div>


                                        <div>
                                            <span>
                                                Area
                                            </span>

                                            <strong>
                                                {property.area} sq.ft
                                            </strong>
                                        </div>


                                        <div>
                                            <span>
                                                Status
                                            </span>

                                            <strong>
                                                {property.status ===
                                                "available"
                                                    ? "Available"
                                                    : "Rented"}
                                            </strong>
                                        </div>

                                    </div>

                                </div>

                            </div>


                            {/* ==================================
                                RIGHT SIDE
                            ================================== */}

                            <div className="col-lg-4">


                                {/* BOOKING */}

                                <div className="hh-booking-sidebar">

                                    <h2>
                                        Interested in this property?
                                    </h2>

                                    <p>
                                        Choose your rental dates and
                                        submit a booking request.
                                    </p>


                                    {property.status ===
                                        "available" &&
                                    property.approved ? (

                                        <Link
                                            to={`/properties/${property._id}/book`}
                                            className="btn hh-btn w-100 py-3"
                                        >
                                            Book This Property
                                        </Link>

                                    ) : (

                                        <button
                                            className="btn hh-disabled-btn w-100 py-3"
                                            disabled
                                        >
                                            Currently Unavailable
                                        </button>

                                    )}


                                    <div className="hh-booking-note">
                                        Your booking will be sent for
                                        admin approval.
                                    </div>

                                </div>


                                {/* OWNER */}

                                {property.owner && (

                                    <div className="hh-owner-card">

                                        <p className="hh-owner-label">
                                            PROPERTY OWNER
                                        </p>

                                        <h3>
                                            {property.owner.name}
                                        </h3>

                                        <p>
                                            {property.owner.email}
                                        </p>

                                    </div>

                                )}

                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </div>
    );
}

export default PropertyDetails;