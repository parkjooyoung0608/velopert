import React, {useContext} from 'react';
import { UserDispatch } from './App';

const User = React.memo( function User({ user }) {
    const dispatch = useContext(UserDispatch);
    
    return (
    <div>
      <b
        style={{
          cursor: 'pointer',
          color: user.active ? 'green' : 'black'
        }}
        onClick={ () => {
          dispatch({ type: 'TOGGLE_USER', id: user.id });
        }}
      >
        {user.username}
      </b> 
      <span>({user.email})</span>
      <button onClick={() => {
        dispatch({ type: 'REMOVE_USER', id: user.id });
      }}>삭제</button>
    </div>
  );
});

// UserList의 경우 onToogle과 onRemove를 전달하기 위한 중간다리 역할만 하고 있다.
// UserList를 직접 사용하는 일도 없다.
// 지금 같이 특정 함수를 특정 컴포넌트를 거쳐 원하는 컴포넌트에 전달하는 작업은 리액트 개발을 하다보면 자주 발생할 수 있는 작업이다.
// 그럴 땐 리액트의 Context API와 이전 섹션 dispatch를 함께 사용하면 해결할 수 있다.
function UserList({ users }) {
  return (
    <div>
      {users.map(user => (
        <User 
          user={user} 
          key={user.id} 
        />
      ))}
    </div>
  );
}

export default React.memo(UserList);