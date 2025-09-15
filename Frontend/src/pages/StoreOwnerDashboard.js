import React, { useState, useEffect } from 'react';
import { useAuth } from '../services/auth';
import api from '../services/api';

const StoreOwnerDashboard = () => {
  const [storeData, setStoreData] = useState(null);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [passwordData, setPasswordData] = useState({ currentPassword: '', newPassword: '' });
  const { logout } = useAuth();

  useEffect(() => {
    loadStoreData();
  }, []);

  const loadStoreData = async () => {
    try {
      const response = await api.getStoreRatings();
      setStoreData(response.data);
    } catch (error) {
      console.error('Failed to load store data:', error);
    }
  };

  const updatePassword = async (e) => {
    e.preventDefault();
    try {
      await api.updatePassword(passwordData);
      setPasswordData({ currentPassword: '', newPassword: '' });
      alert('Password updated successfully');
    } catch (error) {
      alert(error.response?.data?.error || 'Failed to update password');
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <div>
          <h1>Store Owner Dashboard</h1>
          <p style={{ margin: 0, color: '#666' }}>Role: Store Owner</p>
        </div>
        <button onClick={logout} style={{ padding: '10px 20px', backgroundColor: '#dc3545', color: 'white', border: 'none' }}>
          Logout
        </button>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <button 
          onClick={() => setActiveTab('dashboard')} 
          style={{ 
            marginRight: '10px', 
            padding: '10px', 
            backgroundColor: activeTab === 'dashboard' ? '#007bff' : '#f8f9fa',
            color: activeTab === 'dashboard' ? 'white' : 'black',
            border: '1px solid #ddd'
          }}
        >
          Dashboard
        </button>
        <button 
          onClick={() => setActiveTab('password')} 
          style={{ 
            padding: '10px',
            backgroundColor: activeTab === 'password' ? '#007bff' : '#f8f9fa',
            color: activeTab === 'password' ? 'white' : 'black',
            border: '1px solid #ddd'
          }}
        >
          Update Password
        </button>
      </div>

      {activeTab === 'dashboard' && storeData && (
        <div>
          <div style={{ marginBottom: '30px' }}>
            <h2>Store Information</h2>
            <div style={{ padding: '20px', border: '1px solid #ddd', borderRadius: '5px', backgroundColor: '#f8f9fa' }}>
              <h3>{storeData.store.name}</h3>
              <p><strong>Email:</strong> {storeData.store.email}</p>
              <p><strong>Address:</strong> {storeData.store.address}</p>
              <p><strong>Average Rating:</strong> {storeData.averageRating ? `${parseFloat(storeData.averageRating).toFixed(1)}/5` : 'No ratings yet'}</p>
              <p><strong>Total Ratings:</strong> {storeData.ratings.length}</p>
            </div>
          </div>

          <div>
            <h2>Customer Ratings</h2>
            {storeData.ratings.length > 0 ? (
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ backgroundColor: '#f8f9fa' }}>
                    <th style={{ padding: '10px', border: '1px solid #ddd' }}>Customer Name</th>
                    <th style={{ padding: '10px', border: '1px solid #ddd' }}>Email</th>
                    <th style={{ padding: '10px', border: '1px solid #ddd' }}>Rating</th>
                    <th style={{ padding: '10px', border: '1px solid #ddd' }}>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {storeData.ratings.map(rating => (
                    <tr key={rating.id}>
                      <td style={{ padding: '10px', border: '1px solid #ddd' }}>{rating.User.name}</td>
                      <td style={{ padding: '10px', border: '1px solid #ddd' }}>{rating.User.email}</td>
                      <td style={{ padding: '10px', border: '1px solid #ddd' }}>
                        <span style={{ color: '#ffc107', fontSize: '18px' }}>
                          {'★'.repeat(rating.rating)}{'☆'.repeat(5 - rating.rating)}
                        </span>
                        ({rating.rating}/5)
                      </td>
                      <td style={{ padding: '10px', border: '1px solid #ddd' }}>
                        {new Date(rating.createdAt).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p style={{ textAlign: 'center', color: '#666', padding: '40px' }}>
                No ratings received yet.
              </p>
            )}
          </div>
        </div>
      )}

      {activeTab === 'password' && (
        <div>
          <h2>Update Password</h2>
          <form onSubmit={updatePassword} style={{ maxWidth: '400px' }}>
            <div style={{ marginBottom: '15px' }}>
              <input
                type="password"
                placeholder="Current Password"
                value={passwordData.currentPassword}
                onChange={(e) => setPasswordData({...passwordData, currentPassword: e.target.value})}
                required
                style={{ width: '100%', padding: '10px' }}
              />
            </div>
            <div style={{ marginBottom: '15px' }}>
              <input
                type="password"
                placeholder="New Password (8-16 chars, 1 uppercase, 1 special)"
                value={passwordData.newPassword}
                onChange={(e) => setPasswordData({...passwordData, newPassword: e.target.value})}
                required
                style={{ width: '100%', padding: '10px' }}
              />
            </div>
            <button type="submit" style={{ width: '100%', padding: '10px', backgroundColor: '#28a745', color: 'white', border: 'none' }}>
              Update Password
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default StoreOwnerDashboard;