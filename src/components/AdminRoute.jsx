import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { base44 } from '@/api/base44Client';

export default function AdminRoute({ children }) {
  const [state, setState] = useState({ loading: true, isAdmin: false });

  useEffect(() => {
    const check = async () => {
      try {
        const user = await base44.auth.me();
        setState({ loading: false, isAdmin: user?.role === 'admin' });
      } catch {
        setState({ loading: false, isAdmin: false });
      }
    };
    check();
  }, []);

  if (state.loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-parchment">
        <div className="w-8 h-8 border-4 border-stone border-t-golden rounded-full animate-spin" />
      </div>
    );
  }

  if (!state.isAdmin) {
    return <Navigate to="/" replace />;
  }

  return children;
}