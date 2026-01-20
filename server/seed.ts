import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Booking, { BookingStatus } from './models/Booking'; 

dotenv.config();

const sampleBookings = [
  {
    customerName: "Kirtan",
    serviceType: "Plumbing",
    status: BookingStatus.PENDING,
    createdAt: new Date()
  },
  {
    customerName: "Bob Smith",
    serviceType: "Electrical",
    status: BookingStatus.ASSIGNED,
    providerName: "Bhavesh",
    createdAt: new Date(Date.now() - 86400000) // 1 day ago
  },
  {
    customerName: "Charlie Brown",
    serviceType: "Cleaning",
    status: BookingStatus.COMPLETED,
    providerName: "Bhavesh",
    createdAt: new Date(Date.now() - 172800000) // 2 days ago
  },
   {
    customerName: "Diana Prince",
    serviceType: "Moving",
    status: BookingStatus.PENDING,
    createdAt: new Date()
  }
];

const seedDB = async () => {
  try {
    if (!process.env.MONGO_URI) {
        throw new Error("MONGO_URI is missing in .env");
    }
    
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB for seeding...');

    await Booking.deleteMany({}); // Clear existing data
    console.log('Cleared existing bookings.');

    await Booking.insertMany(sampleBookings);
    console.log('Seeded sample bookings!');

    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

seedDB();
