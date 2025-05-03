import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Pencil, Trash2 } from 'lucide-react'
import supabase from '../../Lib/supabase'
import toast, { Toaster } from 'react-hot-toast'
import { useAuth } from '../../Context/AuthContext'
const BusIndex = () => {
  const [buses, setBuses] = useState([])
  const {user,profile}= useAuth();
  console.log("userrr",user)

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


  const handleEdit = (busId) => {
    console.log('Editing bus with ID:', busId)

  }

  // Handle Delete Action
  const handleDelete = async (busId) => {
    const { error } = await supabase.from('Buses').delete().eq('id', busId)
    if (error) {
      console.error('Error deleting bus:', error)
      toast.error(` Error deleting bus${error}`, {
        position: "top-right", 


      })
    } else {
   
      toast.success("Bus deleted successfully!", {
        position: "top-right", 


      })
      fetchBuses()
    }
  }

  return (
    
    <div className="container mx-auto max-w-8xl mt-10 px-4">
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
  
      {user ? (
        buses.length > 0 ? (
          <div className="w-full overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 border rounded-lg overflow-hidden">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-3 text-left text-xs md:text-sm font-medium text-gray-600">ID</th>
                <th className="px-6 py-3 text-left text-xs md:text-sm font-medium text-gray-600">Name</th>
                <th className="px-6 py-3 text-left text-xs md:text-sm font-medium text-gray-600">Plate Number</th>
                <th className="px-6 py-3 text-left text-xs md:text-sm font-medium text-gray-600">Total Seats</th>
                <th className="px-6 py-3 text-left text-xs md:text-sm font-medium text-gray-600">Created At</th>
                <th className="px-6 py-3 text-left text-xs md:text-sm font-medium text-gray-600">Updated At</th>
                <th className="px-6 py-3 text-left text-xs md:text-sm font-medium text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {buses.map((bus, index) => (
                <tr key={bus.id}>
                  <td className="px-6 py-4 text-xs md:text-sm text-gray-800">{index + 1}</td>
                  <td className="px-6 py-4 text-sm md:text-base text-gray-800">{bus.name}</td>
                  <td className="px-6 py-4 text-sm md:text-base text-gray-800">{bus.plate_number}</td>
                  <td className="px-6 py-4 text-sm md:text-base text-gray-800">{bus.TotalSeats}</td>
                  <td className="px-6 py-4 text-xs md:text-sm text-gray-500">{new Date(bus.created_at).toLocaleDateString()}</td>
                  <td className="px-6 py-4 text-xs md:text-sm text-gray-500">{new Date(bus.updated_at).toLocaleDateString()}</td>
                  <td className="px-6 py-4 text-sm text-gray-700 flex gap-3">
                    <Link
                      to={`/Dashboard/BusesCreate/${bus.id}`}
                      onClick={() => handleEdit(bus.id)}
                      className="text-blue-600 hover:text-blue-800 transition"
                    >
                      <Pencil size={18} />
                    </Link>
                    <button
                      onClick={() => handleDelete(bus.id)}
                      className="text-red-600 hover:text-red-800 transition"
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        ) : (
          <div className="text-center py-10 text-gray-500">
            No buses available
          </div>
        )
      ) : (
        <div className="text-center py-10">
          <h1 className="text-lg text-gray-600 mb-2">You need to sign in to view the buses</h1>
          <Link to="/signin" className="text-blue-600 hover:text-blue-800 transition">
            Sign In
          </Link>
        </div>
      )}
    </div>
  </div>
  
  
  
  )
}

export default BusIndex
