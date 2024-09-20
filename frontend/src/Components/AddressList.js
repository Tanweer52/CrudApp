import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navigation from './Navigation';
import { PencilSquare, Trash } from 'react-bootstrap-icons';
import "./AddressList.css";

const AddressList = () => {
    const [addresses, setAddresses] = useState([]);
    const [selectedAddress, setSelectedAddress] = useState(null);

    useEffect(() => {
        axios.get('http://localhost:5000/api/addresses').then((response) => {
            setAddresses(response.data);
        });
    }, []);

    const handleDelete = (DeleteAddress) => {
        axios
            .delete(`http://localhost:5000/api/addresses/${DeleteAddress._id}`)
            .then(() => {
                axios.get('http://localhost:5000/api/addresses').then((response) => {
                    setAddresses(response.data);
                });
            })
            .catch((error) => {
                console.error('Error deleting address:', error);
            });
    };

    const handleEdit = (address) => {
        setSelectedAddress(address);
    };

    const handleUpdate = (updatedAddress) => {
        axios
            .put(`http://localhost:5000/api/addresses/${updatedAddress._id}`, updatedAddress)
            .then(() => {
                axios.get('http://localhost:5000/api/addresses').then((response) => {
                    setAddresses(response.data);
                    setSelectedAddress(null);
                });
            })
            .catch((error) => {
                console.error('Error updating address: ', error);
            });
    };

    return (
        <div className='updateAddress'>
            <h2 className='UpdateAddressHeading'>Address Book</h2>
            <Navigation />
            {addresses.length === 0 && <h1 style={{ textAlign: 'center', color: '#345' }}>
                No Address is Added. Let's Start with Yours...
            </h1>
            }
            {selectedAddress && (
                <div>
                    <h2>Edit Address</h2>
                    <form onSubmit={() => handleUpdate(selectedAddress)}>
                        <div className="form-group">
                            <label>Name:</label>
                            <input
                                type="text"
                                className="form-control"
                                name="name"
                                value={selectedAddress.name}
                                onChange={(e) =>
                                    setSelectedAddress({
                                        ...selectedAddress,
                                        name: e.target.value,
                                    })
                                }
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Email:</label>
                            <input
                                type="email"
                                className="form-control"
                                name="email"
                                value={selectedAddress.email}
                                onChange={(e) =>
                                    setSelectedAddress({
                                        ...selectedAddress,
                                        email: e.target.value,
                                    })
                                }
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Phone:</label>
                            <input
                                type="text"
                                className="form-control"
                                name="phone"
                                value={selectedAddress.contact}
                                onChange={(e) =>
                                    setSelectedAddress({
                                        ...selectedAddress,
                                        contact: e.target.value,
                                    })
                                }
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Address:</label>
                            <input
                                type="text"
                                className="form-control"
                                name="address"
                                value={selectedAddress.address}
                                onChange={(e) =>
                                    setSelectedAddress({
                                        ...selectedAddress,
                                        address: e.target.value,
                                    })
                                }
                                required
                            />
                        </div>
                        <button type="submit" className="btn btn-primary m-2">
                            Update Address
                        </button>
                    </form>
                </div>
            )}
            <div className="cardContainer">
                {addresses.map((address) => (
                    <div className='addressCard' key={address._id}>
                        <div className="cardContent">
                            <h5>Name: {address.name}</h5>
                            <h5>Email: {address.email}</h5>
                            <h5>Contact: {address.contact}</h5>
                            <h5>Address: {address.address}</h5>
                        </div>
                        <div>
                            <button type="button" className="btn"
                                onClick={() => handleDelete(address)}>
                                <Trash />
                            </button>
                            <button
                                type="button" className="btn"
                                onClick={() => handleEdit(address)}
                            >
                                <PencilSquare />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AddressList;
