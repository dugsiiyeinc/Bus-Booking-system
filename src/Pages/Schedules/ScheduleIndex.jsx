import React, { useState, useEffect } from 'react';
import supabase from '../../Lib/supabase';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom'
import { Pencil, Trash2 } from 'lucide-react'

const ScheduleIndex = () => {
  const [schedules, setSchedules] = useState([]);

  useEffect(() => {
    fetchSchedules();
  }, []);

  const fetchSchedules = async () => {
    const { data, error } = await supabase
      .from('Schedules')
      .select('*, Buses(name, plate_number), Routes(  From_city,    To_city)')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching schedules:', error);
      toast.error('Failed to fetch schedules');
    } else {
      setSchedules(data);
    }
  };

  const handleEdit=()=>{

  }
  const handleDelete = async (id) => {
    const { error } = await supabase
      .from('Schedules')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting schedule:', error);
      toast.error('Failed to delete schedule');
    } else {
      // Remove the deleted schedule from the state
      setSchedules(schedules.filter(schedule => schedule.id !== id));
      toast.success('Schedule deleted successfully');
    }
  };

  console.log("Shedulessss",schedules)

  return (
    <div className="container max-w-6xl mx-auto mt-10">
      <div className="p-6 bg-white rounded-xl shadow-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold text-gray-800">Schedules</h2>
          <a
            href="/Dashboard/ScheduleCreate"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition"
          >
            Add New
          </a>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 border rounded-lg overflow-hidden">
            <thead className="bg-gray-100">
              <tr>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">ID</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Bus</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Plate_Number</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Route</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Departure Time</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Days</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Price ($)</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Created At</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Created_At</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {schedules.map((schedule,index) => (
                <tr key={schedule.id}>
                    <td className="px-6 py-4 text-sm text-gray-800">{index+1}</td>
                  <td className="px-6 py-4 text-sm text-gray-800">{schedule.Buses.name}</td>
                  <td className="px-6 py-4 text-sm text-gray-800">{schedule.Buses.plate_number}</td>
                  <td className="px-6 py-4 text-sm text-gray-800">
                    {schedule.Routes.From_city} - {schedule.Routes.To_city}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-800">
  {(schedule.departure_time)}
</td>

                  <td className="px-6 py-4 text-sm text-gray-800">
                    {Array.isArray(schedule.days_of_week) ? schedule.days_of_week.join(", ") : 'N/A'}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-800">${schedule.price.toFixed(2)}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {new Date(schedule.created_at).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700 flex gap-3">
                <Link to={`/Dashboard/ScheduleCreate/${schedule.id}`} onClick={() => handleEdit(schedule.id)} className="text-blue-600 hover:text-blue-800 transition cursor:pointer" title="Edit">
                  <Pencil size={18} />
                </Link>
                <button onClick={() => handleDelete(schedule.id)} className="text-red-600 hover:text-red-800 transition cursor:pointer" title="Delete">
                  <Trash2 size={18} />
                </button>
              </td>
                </tr>
              ))}
              {schedules.length === 0 && (
                <tr>
                  <td colSpan="6" className="text-center py-4 text-gray-500">No schedules found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ScheduleIndex;
