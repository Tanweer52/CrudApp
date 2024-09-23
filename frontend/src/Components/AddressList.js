import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import Navigation from './Navigation';
import { PencilSquare, Trash } from 'react-bootstrap-icons';
import "./AddressList.css";

const AddressList = () => {
    const [addresses, setAddresses] = useState([]);
    const [selectedAddress, setSelectedAddress] = useState(null);
    const [deleteMessage, setDeleteMessage] = useState('');
    const [updateMessage, setUpdateMessage] = useState('')
    const inputRef = useRef();

    useEffect(() => {
        axios.get('http://localhost:5000/api/addresses').then((response) => {
            setAddresses(response.data);
        });
    }, []);

    useEffect(() => {
        if (inputRef.current) {
            // console.log(inputRef.current.value)
            inputRef.current.focus();
        }
    }, [selectedAddress]);


    const handleDelete = async (DeleteAddress) => {
        await axios
            .delete(`http://localhost:5000/api/addresses/${DeleteAddress._id}`)
            .then(() => {

                setDeleteMessage("Deleted!");
                setTimeout(() => {
                    setDeleteMessage('');
                }, 1000)
                axios.get('http://localhost:5000/api/addresses').then((response) => {
                    setAddresses(response.data);
                    // setDeleteMessage("Deleted!");
                    // setTimeout(() => {
                    //     setDeleteMessage('');
                    // }, 1000)
                });
            })
            .catch((error) => {
                console.error('Error deleting address:', error);
            });
    };

    const handleEdit = (address) => {
        setSelectedAddress(address);
    };

    const handleUpdate = async (updatedAddress) => {
        await axios
            .put(`http://localhost:5000/api/addresses/${updatedAddress._id}`, updatedAddress)
            .then(() => {
                setUpdateMessage("Updated!");
                setTimeout(() => {
                    setUpdateMessage('');
                }, 1000)

                axios.get('http://localhost:5000/api/addresses').then((response) => {
                    setAddresses(response.data);
                    setSelectedAddress(null);
                    // setUpdateMessage("Updated!");
                    // setTimeout(() => {
                    //     setUpdateMessage('');
                    // }, 1000)
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

            {updateMessage && <p className='Update-message'>{updateMessage}</p>}
            {deleteMessage && <p className='delete-message'>{deleteMessage}</p>}

            {addresses.length === 0 && <h1
                style={{ textAlign: 'center', color: '#345' }}>
                Address List is Empty Now. Start Adding.
            </h1>
            }
            {selectedAddress && (
                <div className='edit-address'>
                    <h2>Edit Address</h2>
                    <form onSubmit={(e) => { e.preventDefault(); handleUpdate(selectedAddress); }}>
                        <div className="form-group">
                            <label>Name:</label>
                            <input
                                ref={inputRef}
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
