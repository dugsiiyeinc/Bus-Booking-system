// src/Routes/AdminRoute.js
import { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../Context/AuthContext';
import supabase from '../Lib/supabase';

const AdminRoute = () => {
  const { profile } = useAuth();
  const id = profile?.session?.user?.id;
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRole = async () => {
      if (!id) {
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from('users')
        .select('role')
        .eq('id', id)
        .single();

      if (!error && data) {
        setRole(data.role);
      }
      setLoading(false);
    };

    fetchRole();
  }, [id]);

  if (loading) return <div className="p-4">Loading...</div>;

  if (role !== 'admin') return <Navigate to="/UnAuthenticated" replace />;

  return <Outlet />;
};

export default AdminRoute;
