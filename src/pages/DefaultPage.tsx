import React, { useState } from 'react';
import { SearchBar } from '../components/molecules/SearchBar';
import { fetchUsersByQuery } from '../services/userService';

export const DefaultPage = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [filterRole, setFilterRole] = useState('');
  const [sortAsc, setSortAsc] = useState(true);

  const handleSearch = async (query: string) => {
    try {
      const results = await fetchUsersByQuery(query);
      const normalizedResults = Array.isArray(results) ? results : results.users || [results];

      // Assign fake roles for demo
      const withRoles = normalizedResults.map((user: any) => {
        let role = 'User';
        if (user.id % 3 === 0) role = 'Moderator';
        else if (user.id % 2 === 0) role = 'Admin';
        return { ...user, role };
      });

      setUsers(withRoles);
    } catch (error) {
      alert(error);
    }
  };

  const filteredUsers = users
    .filter((user) => (filterRole ? user.role === filterRole : true))
    .sort((a, b) => (sortAsc ? a.age - b.age : b.age - a.age));

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px' }}>
      <SearchBar onSearch={handleSearch} />

      <div className="filter-sort" style={{ margin: '16px 0', display: 'flex', gap: '10px', alignItems: 'center' }}>
        <select
          onChange={(e) => setFilterRole(e.target.value)}
          defaultValue=""
          style={{ padding: '6px 10px', borderRadius: '4px' }}
        >
          <option value="">All Roles</option>
          <option value="Admin">Admin</option>
          <option value="User">User</option>
          <option value="Moderator">Moderator</option>
        </select>
        <button
          onClick={() => setSortAsc(!sortAsc)}
          style={{
            padding: '6px 12px',
            borderRadius: '4px',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            cursor: 'pointer'
          }}
        >
          Sort Age {sortAsc ? '▲' : '▼'}
        </button>
      </div>

      {filteredUsers.length === 0 ? (
        <p style={{ marginTop: '40px', fontStyle: 'italic', color: '#777' }}>No users found.</p>
      ) : (
        <div className="user-grid" style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: '24px',
          maxWidth: '1200px'
        }}>
          {filteredUsers.map((user) => (
            <div key={user.id} className="user-card" style={{
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
              borderRadius: '10px',
              padding: '20px',
              width: '300px',
              backgroundColor: '#fff',
              textAlign: 'center'
            }}>
              <img
                src={user.image}
                alt={`${user.firstName} ${user.lastName}`}
                style={{ width: '100px', height: '100px', borderRadius: '50%', objectFit: 'cover', marginBottom: '10px' }}
              />
              <h3 style={{ margin: '10px 0' }}>{user.firstName} {user.lastName}</h3>
              <p><strong>Username:</strong> {user.username}</p>
              <p><strong>Age:</strong> {user.age}</p>
              <p><strong>Gender:</strong> {user.gender}</p>
              <p><strong>Email:</strong> {user.email}</p>
              <p><strong>Phone:</strong> {user.phone}</p>
              <p><strong>Birth Date:</strong> {user.birthDate}</p>
              <p><strong>SSN:</strong> {user.ssn}</p>
              <p><strong>Role:</strong> {user.role}</p>
              <p style={{ fontSize: '14px', color: '#555' }}>
                <strong>Address:</strong><br />
                {user.address?.address},<br />
                {user.address?.city}, {user.address?.state} - {user.address?.postalCode}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
