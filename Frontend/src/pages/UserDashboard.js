import React, { useState, useEffect } from 'react';
import { useAuth } from '../services/auth';
import api from '../services/api';

const UserDashboard = () => {
  const [stores, setStores] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('stores');
  const [passwordData, setPasswordData] = useState({ currentPassword: '', newPassword: '' });
  const { logout } = useAuth();

  useEffect(() => {
    loadStores();
  }, []);

  const loadStores = async () => {
    try {
      const response = await api.getAllStores();
      setStores(response.data);
    } catch (error) {
      console.error('Failed to load stores:', error);
    }
  };

  const searchStores = async () => {
    try {
      const params = {};
      if (searchTerm) {
        params.name = searchTerm;
        params.address = searchTerm;
      }
      const response = await api.getAllStores(params);
      setStores(response.data);
    } catch (error) {
      console.error('Search failed:', error);
    }
  };

  const submitRating = async (storeId, rating) => {
    try {
      await api.submitRating({ storeId, rating });
      loadStores(); // Reload to show updated rating
      alert('Rating submitted successfully');
    } catch (error) {
      alert(error.response?.data?.error || 'Failed to submit rating');
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

  const filteredStores = stores.filter(store => 
    store.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    store.address.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="user-container">
      <div className="user-header">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h1 style={{ margin: '0 0 5px 0', fontSize: '28px' }}>🛍️ User Dashboard</h1>
            <p style={{ margin: 0, opacity: 0.9 }}>Role: Customer</p>
          </div>
          <button onClick={logout} className="btn-danger">
            Logout
          </button>
        </div>
      </div>

      <div className="user-tabs">
        <button 
          onClick={() => setActiveTab('stores')} 
          className={`user-tab ${activeTab === 'stores' ? 'active' : ''}`}
        >
          🏪 Browse Stores
        </button>
        <button 
          onClick={() => setActiveTab('password')} 
          className={`user-tab ${activeTab === 'password' ? 'active' : ''}`}
        >
          🔒 Update Password
        </button>
      </div>

      {activeTab === 'stores' && (
        <div>
          <h2 style={{ marginBottom: '25px', color: '#2c3e50' }}>🏪 All Stores</h2>
          <div className="filters-container">
            <div className="filters-row">
              <input
                className="form-input"
                type="text"
                placeholder="🔍 Search by name or address..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{ flex: 1 }}
              />
              <button onClick={searchStores} className="btn-secondary">
                🔍 Search
              </button>
            </div>
          </div>

          <div style={{ display: 'grid', gap: '20px' }}>
            {filteredStores.map(store => (
              <div key={store.id} className="store-card">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '15px' }}>
                  <div>
                    <h3 style={{ margin: '0 0 8px 0', color: '#2c3e50', fontSize: '20px' }}>🏪 {store.name}</h3>
                    <p style={{ margin: '0 0 5px 0', color: '#7f8c8d' }}>📍 {store.address}</p>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '24px', color: '#f39c12' }}>
                      {store.averageRating ? '★'.repeat(Math.round(parseFloat(store.averageRating))) + '☆'.repeat(5 - Math.round(parseFloat(store.averageRating))) : '☆☆☆☆☆'}
                    </div>
                    <small style={{ color: '#95a5a6' }}>
                      {store.averageRating ? `${parseFloat(store.averageRating).toFixed(1)}/5` : 'No ratings'}
                    </small>
                  </div>
                </div>
                
                <div style={{ padding: '15px', background: '#f8f9fa', borderRadius: '10px', marginBottom: '15px' }}>
                  <p style={{ margin: '0 0 5px 0', fontSize: '14px', color: '#2c3e50' }}>
                    <strong>Your Rating:</strong> 
                    <span style={{ color: store.userRating ? '#27ae60' : '#e74c3c', marginLeft: '8px' }}>
                      {store.userRating ? `${store.userRating}/5 ★` : 'Not rated yet'}
                    </span>
                  </p>
                </div>
                
                <div>
                  <label style={{ display: 'block', marginBottom: '10px', color: '#2c3e50', fontWeight: '500' }}>Rate this store:</label>
                  <div className="rating-buttons">
                    {[1, 2, 3, 4, 5].map(rating => (
                      <button
                        key={rating}
                        onClick={() => submitRating(store.id, rating)}
                        className={`rating-btn ${store.userRating === rating ? 'active' : ''}`}
                      >
                        {rating}★
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'password' && (
        <div>
          <h2 style={{ marginBottom: '25px', color: '#2c3e50' }}>🔒 Update Password</h2>
          <div className="form-container">
          <form onSubmit={updatePassword}>
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
            <button type="submit" className="btn-secondary" style={{ width: '100%' }}>
              🔒 Update Password
            </button>
          </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserDashboard;