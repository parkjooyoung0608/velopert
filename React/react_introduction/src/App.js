import React, { useRef, useState, useMemo, useCallback } from 'react';
import UserList from './UserList';
import CreateUser from './CreateUser';

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

  const onChange = e => {
    const { name, value } = e.target;
    
    setInputs({
      ...Inputs,
      [name]: value
    })
  }

  // 주의할 점
  // 함수 안에 사용하는 상태 혹이 props가 있다면 꼭 deps 배열안에 포함시켜야 된다는 것
  // 만약에 deps 배열 안에 함수에서 사용하는 값을 넣지 않게 된다면, 함수 내에서 해당 값들을 참조할때 가장 최신 값을 참조할것이라고 보장할 수 없다.
  // props로 받아온 함수가 있다면 이 도한 deps에 넣어줘야한다.
  // useMemo를 기반으로 만들어졌다. 다만 함수를 위해 사용할 떄 더욱 편하게 해줄 뿐이다.
  // useCallback을 사용함으로서 바로 이뤄낼 수 있는 눈에 띄는 최적화는 없다.
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
  }, [users, username, email]);

  // useCallback 사용하는 이유
  // onCreate, onRemove, onToggle 함수는 컴포넌트가 리렌더링 될 때마다 새로 만들어진다.
  // 한번 만든 함수를 필요할 때만 새로 만들고 재사용하는 것은 여전히 중요하다.
  // props가 바뀌지 않으면 virtual DOM에 새로 렌더링하는 것 조차 하지 않고 컴포넌트의 결과물을 재사용하는 최적화 작업을 할 것이다.
  // 이 작업을 하려면 함수를 재사용하는것은 필수이다. 


  const onRemove = id => {
    // user.id가 파라미터로 일치하지 않는 원소만 추출해서 새로운 배열을 만듦
    // = user.id 가 id 인것을 제거함
    setUsers( users.filter(user => user.id !== id) )
  }

  const onToggle = id => {
    setUsers(
      users.map(user => 
          user.id === id ? {...user, active: !user.active} : user  
      )
    )
  }

  // 첫번째 파라미터 연산할지 정의하는 함수
  // 두번째 파라미터 deps 배열, 이 배열 안에 내용이 바뀌면 등록한 함수를 호출해서 값 연산
  // 만약에 내용이 바뀌지 않았다면 이전에 연산한 값을 재사용
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