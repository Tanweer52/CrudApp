const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

mongoose.connect('mongodb://127.0.0.1:27017/NewInfoDB').then(() => console.log("Connected to DB"));

const Address = require('./modals/address');

app.get('/api/addresses', async (req, res) => {
    try {
        const addresses = await Address.find();
        res.json(addresses);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.delete('/api/addresses/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const address = await Address.findById(id);
        if (!address) {
            return res.status(404).json({ error: 'Address not found' });
        }
        await Address.findByIdAndDelete(id);
        res.json({ message: 'Address deleted successfully' });
    } catch (err) {
        console.error('Error deleting address:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});



app.post('/api/addresses', async (req, res) => {
    try {
        const newAddress = new Address(req.body);
        const savedAddress = await newAddress.save();
        res.status(201).json(savedAddress);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});


app.put('/api/addresses/:id', async (req, res) => {
    try {
        const updatedAddress = await Address.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        res.json(updatedAddress);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});


const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server is started on port ${PORT}`);
});
