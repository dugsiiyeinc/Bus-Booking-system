import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import supabase from '../../Lib/supabase';
import toast from 'react-hot-toast'

const BookingCreate = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBooking();
  }, []);

  const fetchBooking = async () => {
    const { data, error } = await supabase
      .from('Bookings')
      .select('status')
      .eq('id', id)
      .single();

    if (error) {
      console.error('Error fetching booking:', error.message);
    } else {
      setStatus(data.status);
    }
    setLoading(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { error } = await supabase
      .from('Bookings')
      .update({ status })
      .eq('id', id);

    if (error) {
      console.error('Error updating booking:', error.message);
    } else {
      toast.success('Booking status updated successfully!', {
        position: 'top-right',
      });
      navigate('/Dashboard/BookingIndex');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-40">
        <p className="text-gray-600">Loading booking...</p>
      </div>
    );
  }

  return (
    <div className="container max-w-md mx-auto mt-10">
      <div className="p-6 bg-white rounded-xl shadow-md">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Edit Booking Status</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 font-medium mb-2">Status</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-2"
              required
            >
              <option value="">Select Status</option>
              <option value="pending">Pending</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition"
          >
            Update Status
          </button>
        </form>
      </div>
    </div>
  );
};

export default BookingCreate;
