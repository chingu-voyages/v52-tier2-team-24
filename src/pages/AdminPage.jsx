// pages/AdminPage.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { NavBar } from '../components/NavBar';

const AdminPage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('appointments');

  const handleLogout = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-white">
   
      <NavBar/>

      <div className="p-8">
        <h2 className="text-xl font-medium mb-8">New Appointment Requests</h2>

        <div className="flex flex-wrap gap-6 mb-12">
        {/* New appointments */}
        </div>

        <div className="border-t pt-6">
          <div className="flex gap-8 mb-8">
            <button
              className={`${activeTab === 'appointments' ? 'text-black' : 'text-gray-400'}`}
              onClick={() => setActiveTab('appointments')}
            >
              Appointments
            </button>
            <button
              className={`${activeTab === 'planning' ? 'text-black' : 'text-gray-400'}`}
              onClick={() => setActiveTab('planning')}
            >
              Planning
            </button>
          </div>

          <div className="space-y-6">
           {/* Current Appointments */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;