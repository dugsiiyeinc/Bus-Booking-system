import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Pencil, Trash2 } from 'lucide-react'
import supabase from '../../Lib/supabase'
import toast, { Toaster } from 'react-hot-toast'
const BusIndex = () => {
  const [buses, setBuses] = useState([])

  useEffect(() => {
    fetchBuses()
  }, [])

  // Fetch buses from Supabase
  const fetchBuses = async () => {
    const { data, error } = await supabase.from('Buses').select('*').order('created_at', { ascending: false })
    if (error) {
      console.error('Error fetching buses:', error)
    } else {
      setBuses(data)
    }
  }

  console.log("buses", buses)

  // Handle Edit Action
  const handleEdit = (busId) => {
    console.log('Editing bus with ID:', busId)
    // Redirect or show modal for editing
  }

  // Handle Delete Action
  const handleDelete = async (busId) => {
    const { error } = await supabase.from('Buses').delete().eq('id', busId)
    if (error) {
      console.error('Error deleting bus:', error)
      toast.error(` Error deleting bus${error}`, {
        position: "top-right", // ama "top-right", "bottom-left", iwm


      })
    } else {
      // Refresh buses after delete
      toast.success("Bus deleted successfully!", {
        position: "top-right", // ama "top-right", "bottom-left", iwm


      })
      fetchBuses()
    }
  }

  return (
    <div className="container max-w-6xl mx-auto mt-10">
      <div className="p-6 bg-white rounded-xl shadow-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold text-gray-800">Buses</h2>
          <Link
            to="/Dashboard/BusesCreate"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition"
          >
            Add New
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 border rounded-lg overflow-hidden">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Name</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Plate Number</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Total Seats</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Created At</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {buses.length > 0 ? (
                buses.map((bus) => (
                  <tr key={bus.id}>
                    <td className="px-6 py-4 text-sm text-gray-800">{bus.name}</td>
                    <td className="px-6 py-4 text-sm text-gray-800">{bus.plate_number}</td>
                    <td className="px-6 py-4 text-sm text-gray-800">{bus.TotalSeats}</td>
                    <td className="px-6 py-4 text-sm text-gray-500">{new Date(bus.created_at).toLocaleDateString()}</td>
                    <td className="px-6 py-4 text-sm text-gray-700 flex gap-3">
                      <Link to={`/Dashboard/BusesCreate/${bus.id}`}
                        onClick={() => handleEdit(bus.id)}
                        className="text-blue-600 hover:text-blue-800 transition cursor:pointer"
                        title="Edit"
                      >
                        <Pencil size={18} />
                      </Link>
                      <button
                        onClick={() => handleDelete(bus.id)}
                        className="text-red-600 hover:text-red-800 transition cursor:pointer"
                        title="Delete"
                      >
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="px-6 py-4 text-center text-gray-500">
                    No buses available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default BusIndex
