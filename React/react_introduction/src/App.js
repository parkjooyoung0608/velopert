import React, { useRef, useReducer, useMemo, useCallback } from 'react';
import UserList from './UserList';
import CreateUser from './CreateUser';
import useInputs from './hooks/useInputs';

function countActiveUsers(users){
  console.log('활성 사용자 수를 세는중...');
  return users.filter(user => user.active).length;
}

const initialState = {
  users: [
    {
      id: 1,
      username: 'velopert',
      email: 'public.velopert@gmail.com',
      active: true
    },
    {
      id: 2,
      username: 'lemon',
      email: 'lemon.velopert@gmail.com',
      active: false
    },
    {
      id: 3,
      username: 'jooyoung',
      email: 'jooyoung.velopert@gmail.com',
      active: false
    },
  ]
}

function reducer(state, action) {
  switch(action.type){
    case 'CREATE_USER':
      return {
          users: state.users.concat(action.user)
        };
    case 'TOGGLE_USER':
      return {
        users: state.users.map( user => 
          user.id === action.id ? {...user, active: !user.active} : user
        )
      };
    case 'REMOVE_USER':
      return { 
        users: state.users.filter(user => user.id !== action.id)
      };
    default:
      return state;
  }
}

// UserDispatch 라는 이름으로 내보내줍니다.
export const UserDispatch = React.createContext(null);
// 나중에 사용하고 싶을 때 불러서 사용할 수 있습니다.

function App() {
  const [{ username, email }, onChange, reset] = useInputs ({
    username: '',
    email: ''
  })
  const [state, dispatch] = useReducer(reducer, initialState);
  const nextId = useRef(4);

  const { users } = state;

  const onCreate = useCallback(()=>{
    dispatch({
      type: 'CREATE_USER',
      user: {
        id: nextId.current,
        username,
        email
      }
    });
    reset();
    nextId.current += 1;
  }, [username, email]);

  const onToggle = useCallback(id => {
    dispatch({
      type: 'TOGGLE_USER',
      id
    })
  }, []);

  const onRemove = useCallback(id => {
    dispatch({
      type: 'REMOVE_USER',
      id
    });
  }, []);

  const count = useMemo( () => countActiveUsers(users), [users] )
  return (
    // UserDispatch Context를 만들어서 어디서든지 dispatch 를 꺼내 쓸 수 있도록 준비
    <UserDispatch.Provider value={dispatch}>
      <CreateUser
        username={username} 
        email={email}
        onChange={onChange}
        onCreate={onCreate}
      />
      <UserList users={users} />
      <div>활성사용자 수 : {count}</div>
    </UserDispatch.Provider>
  )
}

export default App;