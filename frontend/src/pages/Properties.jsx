import API_URL from "../api";
import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import axios from "axios";

function Properties() {
    const [properties, setProperties] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const [searchParams] = useSearchParams();

const [filters, setFilters] = useState({
    location: searchParams.get("location") || "",
    minPrice: searchParams.get("minPrice") || "",
    maxPrice: searchParams.get("maxPrice") || "",
    propertyType: searchParams.get("propertyType") || "",
    bedrooms: searchParams.get("bedrooms") || ""
});
    // Fallback images for properties that don't have an image in MongoDB
    const defaultImages = {
        House:
            "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=900&q=80",

        Apartment:
            "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=900&q=80",

        Villa:
            "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=900&q=80",

        PG:
            "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=900&q=80",

        Room:
            "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=900&q=80"
    };

    const fetchProperties = async (currentFilters = filters) => {
        try {
            setLoading(true);
            setError("");

            const params = {};

            if (currentFilters.location.trim()) {
                params.location = currentFilters.location.trim();
            }

            if (currentFilters.minPrice) {
                params.minPrice = currentFilters.minPrice;
            }

            if (currentFilters.maxPrice) {
                params.maxPrice = currentFilters.maxPrice;
            }

            if (currentFilters.propertyType) {
                params.propertyType = currentFilters.propertyType;
            }

            if (currentFilters.bedrooms) {
                params.bedrooms = currentFilters.bedrooms;
            }

            const response = await axios.get(`${API_URL}/api/properties`, { params })

            setProperties(response.data.properties);

        } catch (error) {
            console.error("Error fetching properties:", error);

            setError(
                error.response?.data?.message ||
                "Unable to load properties"
            );

        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
    const initialFilters = {
        location: searchParams.get("location") || "",
        minPrice: searchParams.get("minPrice") || "",
        maxPrice: searchParams.get("maxPrice") || "",
        propertyType: searchParams.get("propertyType") || "",
        bedrooms: searchParams.get("bedrooms") || ""
    };

    setFilters(initialFilters);
    fetchProperties(initialFilters);
}, [searchParams]);

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFilters((previous) => ({
            ...previous,
            [name]: value
        }));
    };

    const handleSearch = (event) => {
        event.preventDefault();

        fetchProperties(filters);
    };

    const clearFilters = () => {
        const emptyFilters = {
            location: "",
            minPrice: "",
            maxPrice: "",
            propertyType: "",
            bedrooms: ""
        };

        setFilters(emptyFilters);

        fetchProperties(emptyFilters);
    };

    const getPropertyImage = (property) => {
        if (property.images && property.images.length > 0) {
            return property.images[0];
        }

        return (
            defaultImages[property.propertyType] ||
            defaultImages.Apartment
        );
    };

    return (
        <div className="hh-page">

            <div className="container py-5">

                {/* PAGE HEADER */}

                <div className="mb-4">

                    <p className="hh-eyebrow">
                        HOUSEHUNT
                    </p>

                    <h1 className="hh-page-title">
                        Find your next home
                    </h1>

                    <p className="hh-page-subtitle">
                        Browse verified rental properties and find
                        a place that fits your needs.
                    </p>

                </div>


                {/* FILTER CARD */}

                <div className="hh-filter-card mb-5">

                    <div className="p-4">

                        <form onSubmit={handleSearch}>

                            <div className="row g-3">

                                <div className="col-lg-4">

                                    <label className="form-label hh-label">
                                        Location
                                    </label>

                                    <input
                                        type="text"
                                        name="location"
                                        value={filters.location}
                                        onChange={handleChange}
                                        className="form-control hh-input"
                                        placeholder="e.g. Eluru"
                                    />

                                </div>


                                <div className="col-lg-2">

                                    <label className="form-label hh-label">
                                        Min Price
                                    </label>

                                    <input
                                        type="number"
                                        name="minPrice"
                                        value={filters.minPrice}
                                        onChange={handleChange}
                                        className="form-control hh-input"
                                        placeholder="₹0"
                                    />

                                </div>


                                <div className="col-lg-2">

                                    <label className="form-label hh-label">
                                        Max Price
                                    </label>

                                    <input
                                        type="number"
                                        name="maxPrice"
                                        value={filters.maxPrice}
                                        onChange={handleChange}
                                        className="form-control hh-input"
                                        placeholder="₹50000"
                                    />

                                </div>


                                <div className="col-lg-2">

                                    <label className="form-label hh-label">
                                        Type
                                    </label>

                                    <select
                                        name="propertyType"
                                        value={filters.propertyType}
                                        onChange={handleChange}
                                        className="form-select hh-input"
                                    >

                                        <option value="">
                                            All Types
                                        </option>

                                        <option value="Apartment">
                                            Apartment
                                        </option>

                                        <option value="House">
                                            House
                                        </option>

                                        <option value="Villa">
                                            Villa
                                        </option>

                                        <option value="PG">
                                            PG
                                        </option>

                                        <option value="Room">
                                            Room
                                        </option>

                                    </select>

                                </div>


                                <div className="col-lg-2">

                                    <label className="form-label hh-label">
                                        Bedrooms
                                    </label>

                                    <select
                                        name="bedrooms"
                                        value={filters.bedrooms}
                                        onChange={handleChange}
                                        className="form-select hh-input"
                                    >

                                        <option value="">
                                            Any
                                        </option>

                                        <option value="1">
                                            1 BHK
                                        </option>

                                        <option value="2">
                                            2 BHK
                                        </option>

                                        <option value="3">
                                            3 BHK
                                        </option>

                                        <option value="4">
                                            4 BHK
                                        </option>

                                    </select>

                                </div>


                                <div className="col-12 d-flex gap-2 mt-2">

                                    <button
                                        type="submit"
                                        className="btn hh-btn px-4"
                                    >
                                        Search Properties
                                    </button>

                                    <button
                                        type="button"
                                        className="btn hh-btn-outline"
                                        onClick={clearFilters}
                                    >
                                        Clear
                                    </button>

                                </div>

                            </div>

                        </form>

                    </div>

                </div>


                {/* RESULTS */}

                <div className="d-flex justify-content-between align-items-center mb-4">

                    <div>

                        <h2 className="hh-section-title mb-1">
                            Available Properties
                        </h2>

                        {!loading && (
                            <p className="hh-results-count">
                                {properties.length}{" "}
                                {properties.length === 1
                                    ? "property"
                                    : "properties"}{" "}
                                found
                            </p>
                        )}

                    </div>

                </div>


                {/* LOADING */}

                {loading && (
                    <div className="text-center py-5">

                        <div
                            className="spinner-border hh-spinner"
                            role="status"
                        />

                        <p className="hh-muted mt-3">
                            Finding properties...
                        </p>

                    </div>
                )}


                {/* ERROR */}

                {!loading && error && (
                    <div className="hh-alert">
                        {error}
                    </div>
                )}


                {/* EMPTY */}

                {!loading &&
                    !error &&
                    properties.length === 0 && (

                        <div className="hh-empty-state text-center py-5">

                            <h3>
                                No properties found
                            </h3>

                            <p>
                                Try changing your search filters.
                            </p>

                        </div>
                    )}


                {/* PROPERTY GRID */}

                {!loading &&
                    !error &&
                    properties.length > 0 && (

                        <div className="row g-4">

                            {properties.map((property) => (

                                <div
                                    className="col-md-6 col-lg-4"
                                    key={property._id}
                                >

                                    <div className="hh-property-card h-100">

                                        {/* PROPERTY IMAGE */}

                                        <div className="hh-property-image">

                                            <img
                                                src={getPropertyImage(property)}
                                                alt={property.title}
                                                onError={(event) => {
                                                    event.currentTarget.src =
                                                        defaultImages.Apartment;
                                                }}
                                            />

                                            <span className="hh-property-type">
                                                {property.propertyType}
                                            </span>

                                        </div>


                                        {/* PROPERTY CONTENT */}

                                        <div className="hh-property-content">

                                            <h3 className="hh-property-title">
                                                {property.title}
                                            </h3>


                                            <p className="hh-property-location">
                                                {property.location}
                                            </p>


                                            <p className="hh-property-description">
                                                {property.description}
                                            </p>


                                            <div className="hh-property-meta">

                                                <span>
                                                    {property.bedrooms} Beds
                                                </span>

                                                <span>
                                                    {property.bathrooms} Baths
                                                </span>

                                                <span>
                                                    {property.area} sq.ft
                                                </span>

                                            </div>


                                            <div className="hh-property-bottom">

                                                <div>

                                                    <span className="hh-price">
                                                        ₹
                                                        {property.price.toLocaleString(
                                                            "en-IN"
                                                        )}
                                                    </span>

                                                    <span className="hh-price-period">
                                                        /month
                                                    </span>

                                                </div>


                                                <Link
                                                    to={`/properties/${property._id}`}
                                                    className="hh-view-btn"
                                                >
                                                    View Details
                                                </Link>

                                            </div>

                                        </div>

                                    </div>

                                </div>

                            ))}

                        </div>
                    )}

            </div>

        </div>
    );
}

export default Properties;