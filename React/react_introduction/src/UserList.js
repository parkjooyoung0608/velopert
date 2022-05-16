import React, { useEffect } from 'react';

function User({ user, onRemove, onToggle }) {
  // useEffect : 마운트 언마운트
  useEffect(() => {
    // console.log(user);
    // deps 파라미터를 생략한다면, 컴포넌트가 리렌더링 될 때마다 호출
  })

  return (
    <div>
      <b
        style={{
          cursor: 'pointer',
          color: user.active ? 'green' : 'black'
        }}
        onClick={()=>{onToggle(user.id)}}
      >{user.username}</b> <span>({user.email})</span>
      <button onClick={() => onRemove(user.id)}>삭제</button>
    </div>
  );
}

function UserList({ users, onRemove, onToggle }) {
  return (
    <div>
      {users.map(user => (
        <User 
          user={user} 
          key={user.id} 
          onRemove={onRemove}
          onToggle={onToggle}
        />
      ))}
    </div>
  );
}

export default UserList;