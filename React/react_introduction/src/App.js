import React, { useRef, useState, useMemo, useCallback } from 'react';
import UserList from './UserList';
import CreateUser from './CreateUser';


// useCallback, useMemo, React.memo 는 컴포넌트의 성능을 실제로 개선할 수 있는 상황에서만 해야한다.
// b, button, onClick 으로 설정해준 함ㅅ들을 리렌더링을 막을 수 있는게 아니므로 굳이 할 필요없다.
// React.memo를 사용하는 것은 불필요한 props 비교만 하는 것이기 때문에 실제로 렌더링을 방지할 수 있는 상황이 있는 경우에만 사용한다.

// 성능 최적화를 위해 연산된 값을 useMemo라는 Hook을 사용해 재사용하는 방법을 알아보자
function countActiveUsers(users){
  console.log('활성 사용자 수를 세는중...');
  return users.filter(user => user.active).length;
}

function App() {
  const [Inputs, setInputs] = useState({
    username: '',
    email:'',
  })
  const { username, email } = Inputs;

  const onChange = useCallback(e => {
    const { name, value } = e.target;
    
    setInputs({
      ...Inputs,
      [name]: value
    })
  }, []);

  const [users, setUsers] = useState([
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
  ]);

  const nextId = useRef(4);
  const onCreate = useCallback(() => {
    const user = {
      id: nextId.current,
      username,
      email
    }

    setUsers([...users, user]);
    
    setInputs({
      username:'',
      email:''
    })


    nextId.current += 1;
  }, [username, email]);

  // useCallback 사용하는 이유
  // onCreate, onRemove, onToggle 함수는 컴포넌트가 리렌더링 될 때마다 새로 만들어진다.
  // 한번 만든 함수를 필요할 때만 새로 만들고 재사용하는 것은 여전히 중요하다.
  // props가 바뀌지 않으면 virtual DOM에 새로 렌더링하는 것 조차 하지 않고 컴포넌트의 결과물을 재사용하는 최적화 작업을 할 것이다.
  // 이 작업을 하려면 함수를 재사용하는것은 필수이다. 


  const onRemove = useCallback(id => {
    // user.id가 파라미터로 일치하지 않는 원소만 추출해서 새로운 배열을 만듦
    // = user.id 가 id 인것을 제거함
    setUsers( users.filter(user => user.id !== id) )
  }, []);

  const onToggle = useCallback(id => {
    setUsers(
      users.map(user => 
          user.id === id ? {...user, active: !user.active} : user  
      )
    )
  },[]);

  const count = useMemo( () => countActiveUsers(users), [users] );
  return (
    <>
      <CreateUser 
        username={username}
        email={email}
        onChange={onChange}
        onCreate={onCreate}
      />
      <UserList users={users} onRemove={onRemove} onToggle={onToggle}/>
      <div>활성사용자 수 : {count}</div>
    </>
  )
}

export default App;