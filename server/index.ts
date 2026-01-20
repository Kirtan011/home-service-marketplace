import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import Booking, { BookingStatus } from './models/Booking'; 

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());


mongoose.connect(process.env.MONGO_URI as string)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.error(err));

app.post('/bookings', async (req, res) => {
  try {
    const { customerName, serviceType } = req.body;
    const booking = new Booking({ customerName, serviceType });
    await booking.save();
    res.status(201).json(booking);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create booking' });
  }
});


app.get('/bookings', async (req, res) => {
  try {
    const bookings = await Booking.find().sort({ createdAt: -1 });
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch bookings' });
  }
});

app.put('/bookings/:id/assign', async (req, res) => {
  try {
    const { providerName } = req.body;
    const booking = await Booking.findById(req.params.id);
    
    if (!booking) return res.status(404).json({ error: 'Booking not found' });
    if (booking.status !== BookingStatus.PENDING) {
      return res.status(400).json({ error: 'Booking is not pending' });
    }

    booking.providerName = providerName;
    booking.status = BookingStatus.ASSIGNED;
    await booking.save();
    res.json(booking);
  } catch (err) {
    res.status(500).json({ error: 'Failed to assign booking' });
  }
});

app.put('/bookings/:id/status', async (req, res) => {
  try {
    const { status } = req.body;
    const booking = await Booking.findByIdAndUpdate(
      req.params.id, 
      { status }, 
      { new: true }
    );
    res.json(booking);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update status' });
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
