import React from 'react';

// 재사용 되는 코드 컴포넌트화 하기
// 한 파일에 여러개의 컴포넌트를 선언해도 괜찮다.
function User({ user }){
    return(
        <div>
            <b>{user.username}</b> <span>({user.email})</span>
        </div>
    )
}

function UserList (){
    const users = [
        {
            id: 1,
            username: 'velopert',
            email: 'public.velopert@gmail.com'
        },
        {
            id: 2,
            username: 'lemon',
            email: 'lemon.velopert@gmail.com'
        },
        {
            id: 3,
            username: 'jooyoung',
            email: 'jooyoung.velopert@gmail.com'
        },
        
    ]

    // 배열이 고정적이라면 상관없지만 배열의 인덱스를 하나하나 조회하면서 렌더링하는 방법은 동적인 배열을 렌더링 하지 못합니다.
    // 동적인 배열 렌더링은 내장함수인 map()을 사용
    // 배열안의 각 원소를 변환하여 새로운 배열로 만들어준다.
    // 리액트에서 동적인 배열을 랜더링해야 할 때는 map()을 사용해 일반 데이터 배열을 리액트 엘리먼트로 이루어진 배열로 변환해주면 된다.
    return (
        <div>
            {/* 
                <User user={users[0]} />
                <User user={users[1]} />
                <User user={users[2]} /> 
            */}
            { users.map(user => (
                <User user={user} key={user.id} />
            ))}
            {/* 리액트에서 배열을 랜더링 할 때는 key라는 props를 설정해야됨
                key값은 각 원소들마다 가지고있는 고유의 값으로 해야한다.
                지금은 id 값이 고유하니 id값으롷 하자
            */}

            {/* 만약 배열의 원소안에 고유한 값이 없다면 map() 콟백함수 두번째 파라미터 index를 key로 사용하면 된다. */}
            {/* {users.map((user, index) => (
                <User user={user} key={index} />
            ))} */}

        </div>
    )
}

// 정리
// Map을 이용한 렌더링
// * arr.map(i=>)의 현태로 하위 컴포넌트에게 값 전달

// Map에서 Key가 필요한 이유
// * Map에 key 값이없다면 중간에 바뀌었을 때 그 하위 값들이 전부 변하기 때문이다. key값을 이용해 중간의 값을 추가하게 된다.

export default UserList;