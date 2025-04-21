import React, { useEffect, useState } from 'react'
import supabase from '../../Lib/supabase'
import toast from 'react-hot-toast'
import { Link } from 'react-router-dom'
import { Pencil, Trash2 } from 'lucide-react'

const RouteIndex = () => {
  const [Route, setRoute] = useState([])

  useEffect(() => {
    fetchRoutes()
  }, [])

  const fetchRoutes = async () => {
    const { data, error } = await supabase
      .from('Routes')
      .select('*')
      .order('created_at', { ascending: false })
    if (error) {
      console.error('Error fetching buses:', error)
    } else {
      setRoute(data)
    }
  }

  const handleDelete = async (routeId) => {
    const { error } = await supabase.from('Routes').delete().eq('id', routeId)
    if (error) {
      console.error('Error deleting route:', error)
      toast.error(`Error deleting route: ${error.message}`, {
        position: 'top-right',
      })
    } else {
      toast.success('Route deleted successfully!', {
        position: 'top-right',
      })
      fetchRoutes()
    }
  }

  console.log("Routes",Route)
  const handleEdit=()=>{

  }

  return (
    <div className="container max-w-6xl mx-auto mt-10">
      <div className="p-6 bg-white rounded-xl shadow-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold text-gray-800">Routes</h2>
          <Link to="/Dashboard/RouteCreate"

           
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition"
          >
            Add New
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 border rounded-lg overflow-hidden">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">From City</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">To City</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Created At</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Updated_at</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {Route.map((route) => (
                <tr key={route.id}>
                  <td className="px-6 py-4 text-sm text-gray-800">{route.From_city}</td>
                  <td className="px-6 py-4 text-sm text-gray-800">{route.To_city}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {new Date(route.created_at).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                    })}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {new Date(route.updated_at).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                    })}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700 flex gap-3">
                                 <Link
                                  to={`/Dashboard/RouteCreate/${route.id}`} onClick={() => handleEdit(route.id)} className="text-blue-600 hover:text-blue-800 transition cursor:pointer" title="Edit">
                                   <Pencil size={18} />
                                 </Link>
                                 <button onClick={() => handleDelete(route.id)} className="text-red-600 hover:text-red-800 transition cursor:pointer" title="Delete">
                                   <Trash2 size={18} />
                                 </button>
                               </td>
                </tr>
              ))}
              {Route.length === 0 && (
                <tr>
                  <td colSpan="4" className="text-center py-4 text-gray-500">
                    No routes found.
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

export default RouteIndex
