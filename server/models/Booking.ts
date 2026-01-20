
import mongoose, { Document, Schema } from 'mongoose';

export enum BookingStatus {
  PENDING = 'PENDING',
  ASSIGNED = 'ASSIGNED',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED',
  REJECTED = 'REJECTED'
}

export interface IBooking extends Document {
  customerName: string;
  serviceType: string;
  providerName?: string;
  status: BookingStatus;
  createdAt: Date;
  updatedAt: Date;
}

const BookingSchema: Schema = new Schema({
  customerName: { type: String, required: true },
  serviceType: { type: String, required: true },
  providerName: { type: String }, 
  status: { 
    type: String, 
    enum: Object.values(BookingStatus), 
    default: BookingStatus.PENDING 
  },
}, { timestamps: true });

export default mongoose.model<IBooking>('Booking', BookingSchema);
