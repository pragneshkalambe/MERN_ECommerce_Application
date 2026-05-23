import { useEffect, useState }
    from "react";

import { Link }
    from "react-router-dom";

import {
    getDashboardStats
}
    from "../services/api";

import "../styles/AdminDashboard.css";

function AdminDashboard() {

    const [stats, setStats] =
        useState({});

    useEffect(() => {

        getDashboardStats()
            .then(res => {
                setStats(res);
            });

    }, []);

    return (

        <div className="dashboard-container">

            <div className="dashboard-card">

                <h2>
                    Products
                </h2>

                <h1>
                    {stats.totalProducts}
                </h1>

            </div>

            <div className="dashboard-card">

                <h2>
                    Orders
                </h2>

                <h1>
                    {stats.totalOrders}
                </h1>

            </div>

            <div className="dashboard-card">

                <h2>
                    Revenue
                </h2>

                <h1>
                    ₹ {stats.totalRevenue}
                </h1>

            </div>

            <Link
                to="/admin/products"
                className="dashboard-btn"
            >
                Manage Products
            </Link>

        </div>

    );
}

export default AdminDashboard;