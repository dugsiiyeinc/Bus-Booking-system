import React from 'react'

const simpletable = () => {
  return (
    <div>
      
      <div className='container max-w-6xl mx-auto mt-10'>
     <div className="p-6 bg-white rounded-xl shadow-md">
    <div className="flex justify-between items-center mb-4">
      <h2 className="text-2xl font-semibold text-gray-800">Buses</h2>
      <a
        href="/buses/new"
        className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition"
      >
        Add New
      </a>
    </div>
  
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200 border rounded-lg overflow-hidden">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Name</th>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Plate Number</th>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Total Seats</th>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Created At</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {/* Example static row – replace with dynamic map() in React */}
          <tr>
            <td className="px-6 py-4 text-sm text-gray-800">Luxury Express</td>
            <td className="px-6 py-4 text-sm text-gray-800">SOM-12345</td>
            <td className="px-6 py-4 text-sm text-gray-800">45</td>
            <td className="px-6 py-4 text-sm text-gray-500">Apr 21, 2025</td>
          </tr>
          {/* Add more rows here */}
        </tbody>
      </table>
    </div>
  </div>
  </div>
    </div>
  )
}

export default simpletable
