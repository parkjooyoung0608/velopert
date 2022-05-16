import React from 'react';

// React.memo 
// 컴포넌트 props가 바뀌끼지 않았다면 리렌더링 방지 -> 리렌더링 성능 최적화 
// 컴포넌트에서 리렌더링이 필요한 상황에서만 리렌더링 하도록 설정
// 사용법이 굉장히 쉽다. 그냥 감싸주면된다.
const CreateUser = ({ username, email, onChange, onCreate }) => {
    return(
        <div>
            <input 
                name='username' 
                placeholder='계정명' 
                onChange={onChange} 
                value={username}
            />
            <input 
                name='email' 
                placeholder='이메일' 
                onChange={onChange} 
                value={email}
            />
            <button onClick={onCreate}>등록</button>
        </div>
    )
}

export default React.memo(CreateUser);