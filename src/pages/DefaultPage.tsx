import React, { useState } from 'react';
import { SearchBar } from '../components/molecules/SearchBar';
import { fetchUsersByQuery } from '../services/userService';

export const DefaultPage = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [sortAsc, setSortAsc] = useState(true);
  const [filterRole, setFilterRole] = useState('');

  const handleSearch = async (query: string) => {
    try {
      const results = await fetchUsersByQuery(query);
      setUsers(results);
    } catch (error) {
      alert(error);
    }
  };

  const sortedUsers = [...users]
    .filter((user) => (filterRole ? user.role === filterRole : true))
    .sort((a, b) => sortAsc ? a.age - b.age : b.age - a.age);

  return (
    <div>
      <SearchBar onSearch={handleSearch} />
      <div className="filter-sort">
        <select onChange={(e) => setFilterRole(e.target.value)} defaultValue="">
          <option value="">All Roles</option>
          <option value="Admin">Admin</option>
          <option value="User">User</option>
        </select>
        <button onClick={() => setSortAsc(!sortAsc)}>
          Sort Age {sortAsc ? '▲' : '▼'}
        </button>
      </div>
      <div className="user-grid">
        {sortedUsers.map((user) => (
          <div key={user.id} className="user-card">
            <p>{user.firstName} {user.lastName}</p>
            <p>Age: {user.age}</p>
            <p>SSN: {user.ssn}</p>
            <p>Role: {user.role}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
//export default DefaultPage;