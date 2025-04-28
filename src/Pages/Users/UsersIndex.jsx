import React, { useState, useEffect } from 'react';
import supabase from '../../Lib/supabase'; // Adjust the import path for your Supabase client
import { Pencil, Trash2 } from 'lucide-react'
import { Link } from 'react-router-dom'
import toast from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';

const UsersIndex = () => {
  const [users, setUsers] = useState([]);

  // Fetch users data from Supabase
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const { data, error } = await supabase
      .from('users') // Assuming the table is called 'users'
      .select('role,id, username, created_at') // Adjust the fields as necessary
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching users:', error);
    } else {
      setUsers(data);
    }
  };

  const handleDelete= async(id)=>{

  }

  const handleEdit=async()=>{

  }
  console.log("userssssssssssssssssssssss",users)

  return (
    <div className="container max-w-6xl mx-auto mt-10">
      <div className="p-6 bg-white rounded-xl shadow-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold text-gray-800">Users</h2>
         
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 border rounded-lg overflow-hidden">
            <thead className="bg-gray-100">
              <tr>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">ID</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Role</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Username</th>
               
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Created At</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {users.map((user,index) => (
                <tr key={user.id}>
                  <td className="px-6 py-4 text-2xl text-gray-800">{index+1}</td>
                  <td className="px-6 py-4 text-2xl  text-gray-800">{user.role}</td>
                  <td className="px-6 py-4 text-2xl  text-gray-800">{user.username}</td>
                  
                  <td className="px-6 py-4 text-2xl  text-gray-500">
                    {new Date(user.created_at).toLocaleDateString()}
                  </td>

                  <td className="px-6 py-4 text-sm text-gray-700 flex gap-3">
                                 <Link
                                  to={`/Dashboard/Users/${user.id}`} onClick={() => handleEdit(user.id)} className="text-blue-600 hover:text-blue-800 transition cursor:pointer" title="Edit">
                                   <Pencil size={18} />
                                 </Link>
                                 <button onClick={() => handleDelete(user.id)} className="text-red-600 hover:text-red-800 transition cursor:pointer" title="Delete">
                                   <Trash2 size={18} />
                                 </button>
                               </td>
                </tr>
              ))}
              {users.length === 0 && (
                <tr>
                  <td colSpan="4" className="text-center py-4 text-gray-500">No users found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UsersIndex;
