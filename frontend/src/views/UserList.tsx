import React, { useState, useEffect, useMemo } from 'react';
import { fetchUsers, updateUserStatus } from '../services/users.api';
import { Status, User } from '../types/users';
import UserCard from '../components/UserCard';
import SearchBar from '../components/SearchBar';
import MultiSelectCheckbox from '../components/common/MultiSelectCheckbox';
import { usePubContext } from '../store/provider';
import SelectCheckbox from '../components/common/SelectCheckbox';

const UserList: React.FC = () => {
  const [Users, setUsers] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [statuses, setStatuses] = useState<any[]>(['Working', 'Working Remotely', 'On Vacation', 'Business Trip']);
  const pubContext = usePubContext();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const data = await fetchUsers();
      setUsers(data);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  const filteredUsers:User[] = useMemo(() => {
    return Users.filter((user) =>
    
      statuses.includes(user.status) && 
      (user.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.last_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.username.toLowerCase().includes(searchTerm.toLowerCase()) )
    );
  }, [Users, searchTerm, statuses]);

  const handleSelectionChange = (selectedItems: string[]) => {
    setStatuses(selectedItems)
  };

  const handleSelectionStatus = async (selectedStatus: Status) => {
    await updateUserStatus({id: pubContext?.user?.id, status: selectedStatus});
    pubContext.setFields((prevState:any) => ({
      ...prevState,
      user: {
        ...prevState.user,
        status: selectedStatus,
      },
    }));
  };

  return (
    <>
        <div className="user-list">
            <div className="cards-wrapper">
                <div className='filter-row filter-border-row'>
                  <label>Update My Current Status:</label>
                  <SelectCheckbox items={statuses} value={pubContext?.user?.status} onChange={handleSelectionStatus}  />
                </div>
                <h2>List of employees</h2>
                <div className='filter-row'>
                  <SearchBar onSearch={handleSearch} />
                  <MultiSelectCheckbox items={statuses} onChange={handleSelectionChange} />
                </div>
                {filteredUsers.map((user:User, index) => (
                  <UserCard
                      key={index}
                      user={user}
                  />
                ))}
            </div>
        </div>
    </>
  );
};

export default UserList;