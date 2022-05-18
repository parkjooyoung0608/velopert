import React from 'react';

function User({ user }){
    return (
        <div>
            <b>{user.username}</b><span>({user.email})</span>
        </div>
    )
}

const UserList = ({ users }) => {
    return (
        <div>
            {users.map(user=>(
                <User user={user} />
            ))}
        </div>
    );
};

export default UserList;