import React from 'react';
import Card from './common/Card';
import { Status, UserCardProps } from '../types/users';

const UserCard: React.FC<UserCardProps> = ({ user }) => {
    const PlayerCardContent = () => {
        return (
            <>
                <p><b>User Name:</b> {user.username}</p>
                <p><b>Status:</b> {user.status}</p>
            </>
        )
    }
  return (
    <Card 
        customClass = {`${user.status === Status['On Vacation'] && 'disable-card'}`}
        title={`${user.first_name} ${user.last_name}`}
        content={PlayerCardContent()}
    />
  );
};

export default UserCard;