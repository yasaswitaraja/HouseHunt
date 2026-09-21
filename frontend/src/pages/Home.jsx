import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Home() {
    const navigate = useNavigate();

    const [location, setLocation] = useState("");
    const [propertyType, setPropertyType] = useState("");
    const [minPrice, setMinPrice] = useState("");

    const handleSearch = (event) => {
        event.preventDefault();

        const params = new URLSearchParams();

        if (location.trim()) {
            params.set("location", location.trim());
        }

        if (propertyType) {
            params.set("propertyType", propertyType);
        }

        if (minPrice) {
            params.set("minPrice", minPrice);
        }

        const queryString = params.toString();

        navigate(
            queryString
                ? `/properties?${queryString}`
                : "/properties"
        );
    };

    return (
        <>
            {/* HERO */}

            <section className="hh-hero">

                <div className="container">

                    <div className="hh-hero-content">

                        <p className="text-uppercase small text-secondary mb-3">
                            Rental property platform
                        </p>

                        <h1>
                            Find a place
                            <br />
                            you can call home.
                        </h1>

                        <p className="mt-4">
                            Search rental properties, explore locations,
                            and manage your bookings from one place.
                        </p>

                        <div className="d-flex gap-3 mt-4">

                            <Link
                                to="/properties"
                                className="btn hh-btn"
                            >
                                Explore Properties
                            </Link>

                            <Link
                                to="/register"
                                className="btn hh-btn-outline"
                            >
                                Create Account
                            </Link>

                        </div>


                        {/* SEARCH */}

                        <form
                            className="hh-search-box"
                            onSubmit={handleSearch}
                        >

                            <div className="row g-2">

                                {/* LOCATION */}

                                <div className="col-md-5">

                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Search by location"
                                        value={location}
                                        onChange={(event) =>
                                            setLocation(
                                                event.target.value
                                            )
                                        }
                                    />

                                </div>


                                {/* PROPERTY TYPE */}

                                <div className="col-md-3">

                                    <select
                                        className="form-select"
                                        value={propertyType}
                                        onChange={(event) =>
                                            setPropertyType(
                                                event.target.value
                                            )
                                        }
                                    >

                                        <option value="">
                                            Property type
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


                                {/* MIN PRICE */}

                                <div className="col-md-2">

                                    <input
                                        type="number"
                                        className="form-control"
                                        placeholder="Min ₹"
                                        value={minPrice}
                                        onChange={(event) =>
                                            setMinPrice(
                                                event.target.value
                                            )
                                        }
                                    />

                                </div>


                                {/* SEARCH BUTTON */}

                                <div className="col-md-2">

                                    <button
                                        type="submit"
                                        className="btn hh-btn w-100"
                                    >
                                        Search
                                    </button>

                                </div>

                            </div>

                        </form>

                    </div>

                </div>

            </section>


            {/* WHY HOUSEHUNT */}

            <section className="hh-section">

                <div className="container">

                    <div className="mb-5">

                        <h2 className="hh-section-title">
                            Why HouseHunt?
                        </h2>

                        <p className="hh-muted">
                            A simple platform for discovering and
                            managing rental properties.
                        </p>

                    </div>


                    <div className="row g-4">

                        <div className="col-md-4">

                            <div className="hh-card p-4">

                                <h5>
                                    Search Properties
                                </h5>

                                <p className="hh-muted mb-0">
                                    Find properties using location,
                                    price, property type, and bedroom
                                    filters.
                                </p>

                            </div>

                        </div>


                        <div className="col-md-4">

                            <div className="hh-card p-4">

                                <h5>
                                    Manage Bookings
                                </h5>

                                <p className="hh-muted mb-0">
                                    Create and track rental booking
                                    requests from your account.
                                </p>

                            </div>

                        </div>


                        <div className="col-md-4">

                            <div className="hh-card p-4">

                                <h5>
                                    Property Management
                                </h5>

                                <p className="hh-muted mb-0">
                                    Owners and administrators can manage
                                    property listings efficiently.
                                </p>

                            </div>

                        </div>

                    </div>

                </div>

            </section>
        </>
    );
}

export default Home;