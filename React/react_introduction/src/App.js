import React, { useReducer, useMemo } from 'react';
import UserList from './UserList';
import CreateUser from './CreateUser';
import produce from 'immer';
// Immer : 상태 업데이트 할 대, 불변성을 신경쓰지 않으면서 업데이트 (Immer)가 불변성 관리를 대신 해준다.
// 1. Immer 설치 : npm i immer
// 2. import 
// 정말 편한 라이브러리지만 성능적으로는 Immer를 사용하지 않은 코드가 좀 더 빠릅니다.
// 때문에 정말 필요한 곳에만 사용하는걸 권장합니다.

function countActiveUsers(users) {
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
      username: 'tester',
      email: 'tester@example.com',
      active: false
    },
    {
      id: 3,
      username: 'liz',
      email: 'liz@example.com',
      active: false
    }
  ]
};

function reducer(state, action) {
  switch (action.type) {
    case 'CREATE_USER':
      // 3. produce(수정하고싶은 상태, 업데이트를 정의한느 함수(불변성에 대해 알아서 처리해준다.))
      return produce(state, draft => {
        draft.users.push(action.user);
      });
    case 'TOGGLE_USER':
      return produce(state, draft => {
        const user = draft.users.find(user => user.id === action.id);
        user.active = !user.active;
      });
    case 'REMOVE_USER':
      return produce(state, draft => {
        const index = draft.users.findIndex(user => user.id === action.id);
        draft.users.splice(index, 1);
      });
    default:
      return state;
  }
}

// UserDispatch 라는 이름으로 내보내줍니다.
export const UserDispatch = React.createContext(null);

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const { users } = state;

  const count = useMemo(() => countActiveUsers(users), [users]);
  return (
    <UserDispatch.Provider value={dispatch}>
      <CreateUser />
      <UserList users={users} />
      <div>활성사용자 수 : {count}</div>
    </UserDispatch.Provider>
  );
}

export default App;