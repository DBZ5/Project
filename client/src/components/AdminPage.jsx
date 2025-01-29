import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "./Navbar"; 
import './AdminPage.css'; 

const AdminPage = () => {
    const [usersAndSellers, setUsersAndSellers] = useState([]);

    useEffect(() => {
        const fetchUsersAndSellers = async () => {
            try {
                const response = await axios.get("http://localhost:3000/api/user/usersAndSellers", {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}` // Include token for authentication
                    }
                });
                setUsersAndSellers(response.data);
            } catch (error) {
                console.error("Error fetching users and sellers:", error);
            }
        };

        fetchUsersAndSellers();
    }, []);

    const handleDelete = async (userId) => {
        try {
            await axios.delete(`http://localhost:3000/api/user/${userId}`);
            setUsersAndSellers(usersAndSellers.filter(user => user.id !== userId));
        } catch (error) {
            console.error("Error deleting user:", error);
        }
    };

    return (
        <div className="admin-container">
            <Navbar />
            <div className="admin-content">
                <header className="admin-header">
                    <h1>Admin Dashboard</h1>
                </header>
                <div className="admin-main">
                    <div className="admin-section">
                        <h2>User Management</h2>
                        <table className="admin-table">
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Role</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {usersAndSellers.map((user, index) => (
                                    <tr key={index}>
                                        <td>{user.fullName}</td>
                                        <td>{user.email}</td>
                                        <td>{user.role}</td>
                                        <td>
                                            <button className="admin-button">Edit</button>
                                            <button className="admin-button" onClick={() => handleDelete(user.id)}>Delete</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminPage;