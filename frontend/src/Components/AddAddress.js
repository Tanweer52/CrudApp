import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Navigation from './Navigation';
import "./AddAddress.css";

const AddAddress = () => {
    const nav = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        contact: '',
        address: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:5000/api/addresses', formData).then(() => {
            nav('/');
        });
    };

    return (
        <div className='AddingContainer'>
            <h2>Add Address</h2>
            <Navigation />

            <form onSubmit={handleSubmit}>
                <div className='form-group'>
                    <label>Name:</label>
                    <input type="text" name="name"
                        onChange={handleChange} required className='form-control' />
                </div>

                <div className='form-group'>
                    <label>Email:</label>
                    <input type="email" name="email"
                        onChange={handleChange} required className='form-control' />
                </div>

                <div className='form-group'>
                    <label>Contact:</label>
                    <input type="text" name="contact"
                        onChange={handleChange}
                        required className='form-control' />
                </div>

                <div className='form-group'>
                    <label>Address:</label>
                    <input type="text" name="address"
                        onChange={handleChange}
                        required className='form-control' />
                </div>

                <button type="submit" className='btn'>Add Address</button>
            </form>
        </div>
    );
};

export default AddAddress;
