import React from 'react';

function User({ user }){
    return (
        <div>
            <b>{user.username}</b><span>({user.email})</span>
        </div>
    )
}

const UserList = () => {
    const users=[
        {
            id: 1,
            username: 'velopert',
            email: 'mirkduddl@naver.com'
        },
        {
            id: 2,
            username: 'peddrtz',
            email: 'rdddl@naver.com'
        },
        {
            id: 3,
            username: 'opert',
            email: 'irkdl@naver.com'
        },
    ]
    return (
        <div>
            {users.map(user=>(
                <User user={user} />
            ))}
        </div>
    );
};

export default UserList;