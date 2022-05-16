import React, { useRef, useReducer, useMemo, useCallback } from 'react';
import UserList from './UserList';
import CreateUser from './CreateUser';

function countActiveUsers(users){
  console.log('활성 사용자 수를 세는중...');
  return users.filter(user => user.active).length;
}

const initialState = {
  inputs: {
    username:'',
    email:''
  },
  
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

// reducer : 현재상태와 액션 객체를 파라미터로 받아와서 새로운 상태를 반환하는 함수
// CHANGE_INPUT이라는 액션 객체를 사용해 inputs의 상태를 업데이트 했다. 
// reducer 함수에서 새로운 상태를 만들 때에는 불변성을 지켜줭 하기 때문에 spread 연산자를 사용했다.
function reducer(state, action) {
  switch(action.type){ // 업데이트를 위한 정보 , action 객체의 형태는 자유
    case 'CHANGE_INPUT': // 대문자와 _로 구성하는 관습 존재 but 꼭 따라야할 필요 X
      return { // 컴포넌트가 지닐 새로운 상태
        ...state,
        inputs: {
          ...state.inputs,
          [action.name]: action.value 
        }
      };
    case 'CREATE_USER':
        return { // 컴포넌트가 지닐 새로운 상태
          inputs: initialState.inputs,
          users: state.users.concat(action.user)
        };
    case 'TOGGLE_USER':
      return {
        ...state,
        users: state.users.map(user => 
          user.id === action.id ? {...user, active: !user.action} : user  
          )
      };
    case 'REMOVE_USER':
      return { // 컴포넌트가 지닐 새로운 상태
        ...state,
        users: state.users.filter( user => user.id !== action.id )
      }
    default:
      return state;
  }
}

function App() {
  // useReducer 사용법
  const [state, dispatch] = useReducer(reducer, initialState);
  // state : 컴포넌트에서 사용할 수 있는 상태
  // dispatch : 액션을 발생시키는 함수
  // -> 이 함수의 사용법 dispatch( { type:'INCREMENT' } )
  // useReducer 
  // 첫번째 파라미터 : reducer함수
  // 두번째 파라미터 : 초기상태 
  const nextId = useRef(4);

  const { users } = state;
  const { username, email } = state.inputs;

  const onChange = useCallback(e => {
    const { name, value } = e.target; 
    dispatch({ // 액션을 발생시키는 함수
      type: 'CHANGE_INPUT',
      name,
      value
    });
  }, []);

  const onCreate = useCallback(()=>{
    dispatch({
      type: 'CREATE_USER',
      // type 값을 대문자와 _로 구성하는 관습이 존재하기도 하지만 꼭 따라야 할 필요는 없다.
      user: {
        id: nextId.current,
        username,
        email
      }
    });
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
    <>
      <CreateUser
        username={username} 
        email={email}
        onChange={onChange}
        onCreate={onCreate}
      />
      <UserList users={users} onToggle={onToggle} onRemove={onRemove} />
      <div>활성사용자 수 : {count}</div>
    </>
  )
}

export default App;