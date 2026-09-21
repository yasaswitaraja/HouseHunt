import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

function Navbar() {
    const navigate = useNavigate();
    const location = useLocation();

    const [user, setUser] = useState(null);

    // =========================
    // LOAD USER
    // =========================

    const loadUser = () => {
        const storedUser = localStorage.getItem("user");

        if (storedUser) {
            try {
                setUser(JSON.parse(storedUser));
            } catch (error) {
                console.error("Unable to read user:", error);

                localStorage.removeItem("user");
                localStorage.removeItem("token");

                setUser(null);
            }
        } else {
            setUser(null);
        }
    };

    // =========================
    // UPDATE USER WHEN ROUTE CHANGES
    // =========================

    useEffect(() => {
        loadUser();
    }, [location]);

    // =========================
    // LOGOUT
    // =========================

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");

        setUser(null);

        navigate("/login");
    };

    return (
        <nav className="navbar navbar-expand-lg hh-navbar">

            <div className="container">

                {/* BRAND */}

                <Link
                    className="navbar-brand hh-brand"
                    to="/"
                >
                    HouseHunt
                </Link>

                {/* MOBILE MENU BUTTON */}

                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#houseHuntNavbar"
                    aria-controls="houseHuntNavbar"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                {/* NAVIGATION */}

                <div
                    className="collapse navbar-collapse"
                    id="houseHuntNavbar"
                >

                    <ul className="navbar-nav ms-auto align-items-lg-center">

                        {/* HOME */}

                        <li className="nav-item">

                            <Link
                                className="nav-link hh-nav-link"
                                to="/"
                            >
                                Home
                            </Link>

                        </li>

                        {/* PROPERTIES */}

                        <li className="nav-item">

                            <Link
                                className="nav-link hh-nav-link"
                                to="/properties"
                            >
                                Properties
                            </Link>

                        </li>

                        {/* LOGGED-IN USER */}

                        {user && (
                            <li className="nav-item">

                                <Link
                                    className="nav-link hh-nav-link"
                                    to="/my-bookings"
                                >
                                    My Bookings
                                </Link>

                            </li>
                        )}

                        {/* ADMIN ONLY */}

                        {user?.role === "admin" && (
                            <li className="nav-item">

                                <Link
                                    className="nav-link hh-nav-link"
                                    to="/admin"
                                >
                                    Admin Dashboard
                                </Link>

                            </li>
                        )}

                        {/* LOGGED OUT */}

                        {!user ? (
                            <>
                                <li className="nav-item">

                                    <Link
                                        className="nav-link hh-nav-link"
                                        to="/login"
                                    >
                                        Login
                                    </Link>

                                </li>

                                <li className="nav-item">

                                    <Link
                                        className="btn hh-btn ms-lg-3 mt-2 mt-lg-0"
                                        to="/register"
                                    >
                                        Register
                                    </Link>

                                </li>
                            </>
                        ) : (

                            /* LOGGED IN */

                            <li className="nav-item ms-lg-3 mt-2 mt-lg-0">

                                <button
                                    className="btn hh-btn-outline"
                                    onClick={handleLogout}
                                >
                                    Logout
                                </button>

                            </li>

                        )}

                    </ul>

                </div>

            </div>

        </nav>
    );
}

export default Navbar;