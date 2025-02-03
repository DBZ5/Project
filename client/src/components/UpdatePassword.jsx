import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import './Profile.css';

const UpdatePassword = () => {
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();
    const location = useLocation();

    // Get token from URL query parameters
    const token = new URLSearchParams(location.search).get('token');
    

    const handlePasswordUpdate = async (e) => {
        e.preventDefault();
        
        if (!newPassword || !confirmPassword) {
            setError('Please fill in all fields');
            return;
        }

        if (newPassword !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        try {
            const response = await axios.put(`${import.meta.env.VITE_API_URL}/api/user/update/update-password`, {
                token,
                newPassword
            });
            
            setSuccess(response.data.message);
            // Redirect to login page after successful password update
            setTimeout(() => {
                navigate('/login');
            }, 2000);
        } catch (error) {
            setError(error.response?.data?.message || 'Failed to update password');
        }
    };

    // Verify token when component mounts
    useEffect(() => {
        const verifyToken = async () => {
            if (!token) {
                setError('Invalid or missing token');
                return;
            }

            try {
                await axios.get(`${import.meta.env.VITE_API_URL}/api/user/verify-reset-token?token=${token}`);
            } catch (error) {
                setError('Invalid or expired token');
                setTimeout(() => {
                    navigate('/login');
                }, 2000);
            }
        };

        verifyToken();
    }, [token, navigate]);

    return (
        <div>
            <Navbar />
            <div className="profile-container">
                <div className="profile-card">
                    <div className="profile-header">
                        <h2>Update Password</h2>
                    </div>
                    <div className="profile-details">
                        <form onSubmit={handlePasswordUpdate}>
                            <div className="form-group">
                                <label>New Password</label>
                                <input
                                    type="password"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    placeholder="Enter new password"
                                    className="form-control"
                                />
                            </div>
                            <div className="form-group">
                                <label>Confirm Password</label>
                                <input
                                    type="password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    placeholder="Confirm new password"
                                    className="form-control"
                                />
                            </div>
                            {error && <div className="error-message">{error}</div>}
                            {success && <div className="success-message">{success}</div>}
                            <button type="submit" className="profile-button edit-button">
                                Update Password
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UpdatePassword; 