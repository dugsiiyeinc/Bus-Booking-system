import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Pencil, Trash2 } from 'lucide-react'; 
import supabase from '../../Lib/supabase';


const BookingIndex = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    const { data, error } = await supabase
      .from('Bookings')
      .select(`
        id,
        username,
        phone,
        day,
        status,
        Type_payment,
        created_at,
        schedule_id,
        Schedules (
          id,
          route_id,
          Routes (
            From_city,
            To_city
          )
        )
      `); // nested join Schedules → Routes

    if (error) {
      console.error('Error fetching bookings:', error.message);
    } else {
      setBookings(data);
    }
    setLoading(false);
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this booking?');
    if (confirmDelete) {
      const { error } = await supabase
        .from('Bookings')
        .delete()
        .eq('id', id);

      if (error) {
        console.error('Error deleting booking:', error.message);
      } else {
        setBookings(bookings.filter((booking) => booking.id !== id));
      }
    }
  };

  const handleEdit = (id) => {
    navigate(`/bookings/edit/${id}`);
  };

  return (
    <div className="container max-w-6xl mx-auto mt-10">
      <div className="p-6 bg-white rounded-xl shadow-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold text-gray-800">Bookings</h2>
        </div>

        {loading ? (
  <div className="flex justify-center items-center py-10">
    <div className="flex items-center gap-2">
      <svg className="animate-spin h-5 w-5 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        ></circle>
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 01-8 8z"
        ></path>
      </svg>
      <span className="text-gray-600 font-medium">Loading bookings...</span>
    </div>
  </div>
) : (

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 border rounded-lg overflow-hidden">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Username</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Phone</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Day</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Route</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Payment Type</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Status</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Created At</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {bookings.map((booking) => (
                  <tr key={booking.id}>
                    <td className="px-6 py-4 text-sm text-gray-800">{booking.username}</td>
                    <td className="px-6 py-4 text-sm text-gray-800">{booking.phone}</td>
                    <td className="px-6 py-4 text-sm text-gray-800">{booking.day}</td>
                    <td className="px-6 py-4 text-sm text-gray-800">
                      {booking.Schedules?.Routes
                        ? `${booking.Schedules.Routes.From_city} → ${booking.Schedules.Routes.To_city}`
                        : 'N/A'}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-800">{booking.Type_payment}</td>
                    <td className="px-6 py-4 text-sm text-gray-800 capitalize">{booking.status}</td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {new Date(booking.created_at).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                      })}
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <div className="flex gap-2">
                        <Link
                          to={`/Dashboard/BookingIndex/${booking.id}`}
                          onClick={() => handleEdit(booking.id)}
                          className="text-green-600 hover:text-green-800"
                          title="Edit"
                        >
                          <Pencil size={18} />
                        </Link>
                        <button
                          onClick={() => handleDelete(booking.id)}
                          className="text-red-600 hover:text-red-800"
                          title="Delete"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {bookings.length === 0 && (
                  <tr>
                    <td colSpan="8" className="px-6 py-4 text-center text-sm text-gray-500">
                      No bookings found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookingIndex;
