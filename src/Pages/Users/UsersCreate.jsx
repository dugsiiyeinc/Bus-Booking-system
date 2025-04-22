import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';
import { getUsersById, updateUsers } from '../../Lib/Users';

const UsersCreate = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [username, setUsername] = useState('');
  const [role, setRole] = useState('');

  useEffect(() => {
    const fetchUser = async () => {
      const user = await getUsersById(id);
      console.log("Fetched user:", user);
      if (user) {
        setUsername(user.username);
        setRole(user.role);
      }
    };

    fetchUser();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!username || !role) {
      toast.error("Username and role are required.");
      return;
    }

    try {
      // Add update logic here when necessary

      let newUser={
        username:username,
        role:role
      }

      await  updateUsers(id,newUser);
        toast.success("succesfully Updated Users")
        navigate('/Dashboard/Users');
    } catch (error) {
      toast.error('Error updating user.');
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-semibold text-center mb-6">Edit User</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Enter username"
          />
        </div>
        <div>
          <label htmlFor="role" className="block text-sm font-medium text-gray-700">Role:</label>
          <select
            id="role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="">Select role</option>
            <option value="admin">Admin</option>
            <option value="user">User</option>
          </select>
        </div>
        <div className="flex justify-center">
          <button
            type="submit"
            className="mt-4 px-6 py-2 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Update User
          </button>
        </div>
      </form>
    </div>
  );
};

export default UsersCreate;
