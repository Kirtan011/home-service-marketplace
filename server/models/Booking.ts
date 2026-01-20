
import mongoose, { Document, Schema } from 'mongoose';

const BookingSchema: Schema = new Schema({
  customerName: { type: String, required: true },
  serviceType: { type: String, required: true },
  providerName: { type: String }, // Nullable if not assigned
  status: { 
    type: String, 
    enum: Object.values(BookingStatus), 
    default: BookingStatus.PENDING 
  },
}, { timestamps: true });

export default mongoose.model<IBooking>('Booking', BookingSchema);
