'use client';

import { useAuth } from '@/context/AuthContext';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function DashboardPage() {
  const { user, isLoading, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/auth/login');
    }
  }, [user, isLoading, router]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="border-4 border-dashed border-gray-200 rounded-lg p-4">
            <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
            
            {user && (
              <div className="mt-4">
                <div className="bg-white shadow rounded-lg p-6">
                  <div className="flex items-center">
                    <img
                      className="h-16 w-16 rounded-full"
                      src={user.image}
                      alt={user.firstName}
                    />
                    <div className="ml-4">
                      <h2 className="text-xl font-bold">
                        {user.firstName} {user.lastName}
                      </h2>
                      <p className="text-gray-600">{user.email}</p>
                    </div>
                  </div>
                  
                  <div className="mt-6">
                    <button
                      onClick={logout}
                      className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 