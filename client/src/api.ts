import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000',
});

export const getBookings = async () => {
    const response = await api.get('/bookings');
    return response.data;
}

export const createBooking = async (data: { customerName: string; serviceType: string }) => {
    const response = await api.post('/bookings', data);
    return response.data;
}

export const assignProvider = async (id: string, providerName: string) => {
    const response = await api.put(`/bookings/${id}/assign`, { providerName });
    return response.data;
}

export const updateStatus = async (id: string, status: string) => {
    const response = await api.put(`/bookings/${id}/status`, { status });
    return response.data;
}
