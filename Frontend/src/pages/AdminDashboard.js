import React, { useState, useEffect } from 'react';
import { useAuth } from '../services/auth';
import api from '../services/api';

const AdminDashboard = () => {
  const [stats, setStats] = useState({});
  const [users, setUsers] = useState([]);
  const [stores, setStores] = useState([]);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [filters, setFilters] = useState({ name: '', email: '', address: '', role: '' });
  const [newUser, setNewUser] = useState({ name: '', email: '', password: '', address: '', role: 'user' });
  const [newStore, setNewStore] = useState({ name: '', email: '', address: '', ownerId: '' });
  const [storeOwners, setStoreOwners] = useState([]);
  const { logout } = useAuth();

  useEffect(() => {
    loadDashboard();
    loadStoreOwners();
  }, []);

  const loadStoreOwners = async () => {
    try {
      const response = await api.getStoreOwners();
      setStoreOwners(response.data);
    } catch (error) {
      console.error('Failed to load store owners:', error);
    }
  };

  const loadDashboard = async () => {
    try {
      const response = await api.getDashboardStats();
      setStats(response.data);
    } catch (error) {
      console.error('Failed to load dashboard:', error);
    }
  };

  const loadUsers = async () => {
    try {
      const response = await api.getUsers(filters);
      setUsers(response.data);
    } catch (error) {
      console.error('Failed to load users:', error);
    }
  };

  const loadStores = async () => {
    try {
      const response = await api.getStores(filters);
      setStores(response.data);
    } catch (error) {
      console.error('Failed to load stores:', error);
    }
  };

  const createUser = async (e) => {
    e.preventDefault();
    try {
      await api.createUser(newUser);
      setNewUser({ name: '', email: '', password: '', address: '', role: 'user' });
      loadUsers();
      alert('User created successfully');
    } catch (error) {
      alert(error.response?.data?.error || 'Failed to create user');
    }
  };

  const createStore = async (e) => {
    e.preventDefault();
    try {
      await api.createStore(newStore);
      setNewStore({ name: '', email: '', address: '', ownerId: '' });
      loadStores();
      alert('Store created successfully');
    } catch (error) {
      alert(error.response?.data?.error || 'Failed to create store');
    }
  };

  return (
    <div className="admin-container">
      <div className="admin-header">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h1 style={{ margin: '0 0 5px 0', fontSize: '28px' }}>Admin Dashboard</h1>
            <p style={{ margin: 0, opacity: 0.9 }}>Role: Administrator</p>
          </div>
          <button onClick={logout} className="btn-danger">
            Logout
          </button>
        </div>
      </div>

      <div className="admin-tabs">
        <button onClick={() => setActiveTab('dashboard')} className={`admin-tab ${activeTab === 'dashboard' ? 'active' : ''}`}>📊 Dashboard</button>
        <button onClick={() => { setActiveTab('users'); loadUsers(); }} className={`admin-tab ${activeTab === 'users' ? 'active' : ''}`}>👥 Users</button>
        <button onClick={() => { setActiveTab('stores'); loadStores(); }} className={`admin-tab ${activeTab === 'stores' ? 'active' : ''}`}>🏪 Stores</button>
        <button onClick={() => setActiveTab('create-user')} className={`admin-tab ${activeTab === 'create-user' ? 'active' : ''}`}>➕ Create User</button>
        <button onClick={() => setActiveTab('create-store')} className={`admin-tab ${activeTab === 'create-store' ? 'active' : ''}`}>🏬 Create Store</button>
      </div>

      {activeTab === 'dashboard' && (
        <div>
          <h2 style={{ marginBottom: '25px', color: '#495057' }}>📊 Dashboard Statistics</h2>
          <div className="stats-grid">
            <div className="stat-card">
              <h3>👥 Total Users</h3>
              <div className="stat-number">{stats.totalUsers || 0}</div>
            </div>
            <div className="stat-card">
              <h3>🏪 Total Stores</h3>
              <div className="stat-number">{stats.totalStores || 0}</div>
            </div>
            <div className="stat-card">
              <h3>⭐ Total Ratings</h3>
              <div className="stat-number">{stats.totalRatings || 0}</div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'users' && (
        <div>
          <h2 style={{ marginBottom: '25px', color: '#495057' }}>👥 Users Management</h2>
          <div className="filters-container">
            <div className="filters-row">
              <input className="form-input" placeholder="Name" value={filters.name} onChange={(e) => setFilters({...filters, name: e.target.value})} />
              <input className="form-input" placeholder="Email" value={filters.email} onChange={(e) => setFilters({...filters, email: e.target.value})} />
              <input className="form-input" placeholder="Address" value={filters.address} onChange={(e) => setFilters({...filters, address: e.target.value})} />
              <select className="form-input" value={filters.role} onChange={(e) => setFilters({...filters, role: e.target.value})}>
                <option value="">All Roles</option>
                <option value="admin">Admin</option>
                <option value="user">User</option>
                <option value="store_owner">Store Owner</option>
              </select>
              <button className="btn-primary" onClick={loadUsers}>🔍 Filter</button>
            </div>
          </div>
          <div className="data-table">
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Address</th>
                  <th>Role</th>
                </tr>
              </thead>
              <tbody>
                {users.map(user => (
                  <tr key={user.id}>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.address}</td>
                    <td><span style={{padding: '4px 8px', borderRadius: '12px', background: user.role === 'admin' ? '#e3f2fd' : user.role === 'store_owner' ? '#f3e5f5' : '#e8f5e8', fontSize: '12px'}}>{user.role}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'stores' && (
        <div>
          <h2>Stores Management</h2>
          <div style={{ marginBottom: '20px', display: 'flex', gap: '10px' }}>
            <input placeholder="Name" value={filters.name} onChange={(e) => setFilters({...filters, name: e.target.value})} />
            <input placeholder="Email" value={filters.email} onChange={(e) => setFilters({...filters, email: e.target.value})} />
            <input placeholder="Address" value={filters.address} onChange={(e) => setFilters({...filters, address: e.target.value})} />
            <button onClick={loadStores}>Filter</button>
          </div>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ backgroundColor: '#f8f9fa' }}>
                <th style={{ padding: '10px', border: '1px solid #ddd' }}>Name</th>
                <th style={{ padding: '10px', border: '1px solid #ddd' }}>Email</th>
                <th style={{ padding: '10px', border: '1px solid #ddd' }}>Address</th>
                <th style={{ padding: '10px', border: '1px solid #ddd' }}>Rating</th>
              </tr>
            </thead>
            <tbody>
              {stores.map(store => (
                <tr key={store.id}>
                  <td style={{ padding: '10px', border: '1px solid #ddd' }}>{store.name}</td>
                  <td style={{ padding: '10px', border: '1px solid #ddd' }}>{store.email}</td>
                  <td style={{ padding: '10px', border: '1px solid #ddd' }}>{store.address}</td>
                  <td style={{ padding: '10px', border: '1px solid #ddd' }}>{store.averageRating || 'No ratings'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {activeTab === 'create-user' && (
        <div>
          <h2 style={{ marginBottom: '25px', color: '#495057' }}>➕ Create New User</h2>
          <div className="form-container">
          <form onSubmit={createUser}>
            <div className="form-group">
              <input
                className="form-input"
                placeholder="Name (20-60 characters)"
                value={newUser.name}
                onChange={(e) => setNewUser({...newUser, name: e.target.value})}
                required
              />
            </div>
            <div style={{ marginBottom: '15px' }}>
              <input
                type="email"
                placeholder="Email"
                value={newUser.email}
                onChange={(e) => setNewUser({...newUser, email: e.target.value})}
                required
                style={{ width: '100%', padding: '10px' }}
              />
            </div>
            <div style={{ marginBottom: '15px' }}>
              <input
                type="password"
                placeholder="Password"
                value={newUser.password}
                onChange={(e) => setNewUser({...newUser, password: e.target.value})}
                required
                style={{ width: '100%', padding: '10px' }}
              />
            </div>
            <div style={{ marginBottom: '15px' }}>
              <textarea
                placeholder="Address"
                value={newUser.address}
                onChange={(e) => setNewUser({...newUser, address: e.target.value})}
                style={{ width: '100%', padding: '10px', height: '80px' }}
              />
            </div>
            <div style={{ marginBottom: '15px' }}>
              <select
                value={newUser.role}
                onChange={(e) => setNewUser({...newUser, role: e.target.value})}
                style={{ width: '100%', padding: '10px' }}
              >
                <option value="user">User</option>
                <option value="admin">Admin</option>
                <option value="store_owner">Store Owner</option>
              </select>
            </div>
            <button type="submit" className="btn-primary" style={{ width: '100%' }}>
              ➕ Create User
            </button>
          </form>
          </div>
        </div>
      )}

      {activeTab === 'create-store' && (
        <div>
          <h2>Create New Store</h2>
          <form onSubmit={createStore} style={{ maxWidth: '400px' }}>
            <div style={{ marginBottom: '15px' }}>
              <input
                placeholder="Store Name (20-60 characters)"
                value={newStore.name}
                onChange={(e) => setNewStore({...newStore, name: e.target.value})}
                required
                style={{ width: '100%', padding: '10px' }}
              />
            </div>
            <div style={{ marginBottom: '15px' }}>
              <input
                type="email"
                placeholder="Store Email"
                value={newStore.email}
                onChange={(e) => setNewStore({...newStore, email: e.target.value})}
                required
                style={{ width: '100%', padding: '10px' }}
              />
            </div>
            <div style={{ marginBottom: '15px' }}>
              <textarea
                placeholder="Store Address"
                value={newStore.address}
                onChange={(e) => setNewStore({...newStore, address: e.target.value})}
                required
                style={{ width: '100%', padding: '10px', height: '80px' }}
              />
            </div>
            <div style={{ marginBottom: '15px' }}>
              <select
                value={newStore.ownerId}
                onChange={(e) => setNewStore({...newStore, ownerId: e.target.value})}
                required
                style={{ width: '100%', padding: '10px' }}
              >
                <option value="">Select Store Owner</option>
                {storeOwners.map(owner => (
                  <option key={owner.id} value={owner.id}>
                    {owner.name} ({owner.email})
                  </option>
                ))}
              </select>
            </div>
            <button type="submit" style={{ width: '100%', padding: '10px', backgroundColor: '#28a745', color: 'white', border: 'none' }}>
              Create Store
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;