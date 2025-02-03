import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "./Navbar"; 
import Swal from 'sweetalert2'; 
import './AdminPage.css'; 

const AdminPage = () => {
    const [users, setUsers] = useState([]);
    const [sellers, setSellers] = useState([]);

    useEffect(() => {
        const fetchUsersAndSellers = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/user/usersAndSellers`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                });
                const allUsers = response.data.users;
                const allSellers = response.data.sellers;

                setUsers(allUsers.filter(user => user.role !== 'seller'));
                setSellers(allSellers);
            } catch (error) {
                console.error("Error fetching users and sellers:", error);
            }
        };

        fetchUsersAndSellers();
    }, []);

    const handleDeleteUser = async (userId) => {
        const result = await Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        });

        if (result.isConfirmed) {
            try {
                await axios.delete(`${import.meta.env.VITE_API_URL}/api/user/${userId}`);
                setUsers(users.filter(user => user.id !== userId));
                Swal.fire('Deleted!', 'User has been deleted.', 'success');
            } catch (error) {
                console.error("Error deleting user:", error);
            }
        }
    };

    const handleDeleteSeller = async (sellerId) => {
        const result = await Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        });

        if (result.isConfirmed) {
            try {
                const sellerProducts = sellers.find(seller => seller.id === sellerId).Products;
                await Promise.all(sellerProducts.map(product => 
                    axios.delete(`${import.meta.env.VITE_API_URL}/api/product/${product.id}`)
                ));

                await axios.delete(`${import.meta.env.VITE_API_URL}/api/user/${sellerId}`);
                setSellers(sellers.filter(seller => seller.id !== sellerId));
                Swal.fire('Deleted!', 'Seller and their products have been deleted.', 'success');
            } catch (error) {
                console.error("Error deleting seller:", error);
            }
        }
    };

    const handleDeleteProduct = async (productId) => {
        const result = await Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        });

        if (result.isConfirmed) {
            try {
                await axios.delete(`${import.meta.env.VITE_API_URL}/api/product/${productId}`);
                setSellers(sellers.map(seller => ({
                    ...seller,
                    Products: seller.Products.filter(product => product.id !== productId)
                })));
                Swal.fire('Deleted!', 'Product has been deleted.', 'success');
            } catch (error) {
                console.error("Error deleting product:", error);
            }
        }
    };

    const handleUpdateUserRole = async (userId) => {
        const result = await Swal.fire({
            title: 'Are you sure?',
            text: "You are about to change this user's role to seller.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, update it!'
        });

        if (result.isConfirmed) {
            try {
                await axios.put(`${import.meta.env.VITE_API_URL}/api/user/${userId}`, { role: 'seller' });
                const updatedUser = users.find(user => user.id === userId);
                setUsers(users.filter(user => user.id !== userId));
                setSellers([...sellers, { ...updatedUser, role: 'seller' }]);
                Swal.fire('Updated!', 'User role has been updated to seller.', 'success');
            } catch (error) {
                console.error("Error updating user role:", error);
            }
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
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map((user) => (
                                    <tr key={user.id}>
                                        <td>{user.fullName}</td>
                                        <td>{user.email}</td>
                                        <td>
                                            <button className="admin-button" onClick={() => handleDeleteUser(user.id)}>Delete User</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="admin-section">
                        <h2>Seller Management</h2>
                        <table className="admin-table">
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Products</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {sellers.map((seller) => (
                                    <tr key={seller.id}>
                                        <td>{seller.fullName}</td>
                                        <td>{seller.email}</td>
                                        <td>
                                            <ul>
                                                {seller.Products.map(product => (
                                                    <li key={product.id}>
                                                        {product.name}
                                                        <button className="admin-button" onClick={() => handleDeleteProduct(product.id)}>Delete Product</button>
                                                    </li>
                                                ))}
                                            </ul>
                                        </td>
                                        <td>
                                            <button className="admin-button" onClick={() => handleDeleteSeller(seller.id)}>Delete Seller</button>
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