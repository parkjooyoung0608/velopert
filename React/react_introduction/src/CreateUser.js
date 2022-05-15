import React from 'react';

// 배열에 새로운 항목을 추가하는 방법
// 1. input 두개오 button 하나로 이루어진 CreateUser.js 컴포넌트 만들기
// CreateUser 컴포넌트의 상태관리는 부모 컴포넌트인 App에서 하고, input 값 및 이벤트로 등록할 함수들을 props로 넘겨받아서 사용한다.
function CreateUser({ username, email, onChange, onCreate }){
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

export default CreateUser;