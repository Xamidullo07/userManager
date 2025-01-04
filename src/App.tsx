import React from 'react'
import { UserProvider } from './contexts/UserContext';
import CreateUser from './components/CreateUser';
import UserList from './components/UserList';

function App() {
  return (
    <UserProvider>
      <div className="min-h-screen bg-gray-100 p-6">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold text-center mb-8">User Management System</h1>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1">
              <CreateUser />
            </div>
            <div className="lg:col-span-2">
              <UserList />
            </div>
          </div>
        </div>
      </div>
    </UserProvider>
  );
}

export default App;