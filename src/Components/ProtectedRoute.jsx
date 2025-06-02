import React, { useEffect, useState } from 'react';
import { useAuth } from '../Context/AuthContext';
import { Navigate } from 'react-router-dom';
import supabase from '../Lib/supabase';

const ProtectedRoute = ({ children, redirectTo = "/Signin", requireAdmin = false }) => {
  const { IsLoggedIn, isloading, profile } = useAuth();
  const id = profile?.session?.user?.id;
  const [role, setRole] = useState(null);
  const [checkingRole, setCheckingRole] = useState(requireAdmin); // Only fetch if required

  console.log("before login",checkingRole);

  useEffect(() => {
    const fetchRole = async () => {
      if (!requireAdmin || !id) return;
      setCheckingRole(true);
      const { data, error } = await supabase
        .from('users')
        .select('role')
        .eq('id', id)
        .single();

      if (!error && data) {
        setRole(data.role);
      }

      setCheckingRole(false);
    };

    fetchRole();
  }, [id, requireAdmin]);


  console.log("after login",checkingRole);

  if (isloading || checkingRole) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  if (!IsLoggedIn) {
    return <Navigate to={redirectTo} replace />;
  }

  if (requireAdmin && role !== 'admin') {
    return <Navigate to="/UnAuthenticated" replace />;
  }

  console.log("checkionjrjrjrj",checkingRole)

  return children;
};

export default ProtectedRoute;
