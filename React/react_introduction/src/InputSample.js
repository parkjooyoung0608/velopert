import React, { useState, useRef } from 'react';

function InputSample(){
    const [inputs, setInputs] = useState({
        name:'',
        nickname:''
    });

    const nameInput = useRef();

    const { name, nickname } = inputs; // 비구조화 할당을 통해 값 추출
    
    const onChange = (e) => {
        const { value, name } = e.target; // 우선 e.target에서 name과 value를 추출
        setInputs({
            ...inputs, // 기존 input 객체를 복사한 뒤
            [name]: value // name키를 가진 값을 value로 설정
        })
    }

    const onReset = () => {
        setInputs({
            name:'',
            nickname: '',
        })
        nameInput.current.focus();
    }

    return (
        <div>
            {/* input 상태를 관리할 때는 value 값을 설정해주는 것도 중요하다. 
            그렇게해야, 상태가 바뀌었을 때 input 내용도 업데이트된다. */}
            <input 
                name="name" 
                placeholder='이름' 
                onChange={onChange} 
                value={name}
                ref={nameInput} 
            />
            <input 
                name="nickname" 
                placeholder='닉네임' 
                onChange={onChange} 
                value={nickname} 
            />
            <button onClick={onReset}>초기화</button>
            <div>
                <b>값: </b>
                {name} ( {nickname} )
            </div>
        </div>
    )
}


// 정리
// 리액트 상태에서 객체를 수정할 때에는
// inputs[name] = value; (X) 이런식으로 직접 수정은 안된다.
// 새로운 객체를 만들어서 객체에 변화를 주고 이를 상태로 사용해야한다.
// setInputs({
//     ...inputs,
//     [name] : value
// })
// 여기서 사용한 ... 문법은 spread 문법이다. 객체의 내용을 모두 '펼쳐서' 기존 객체를 복사한다.
// 이런 작업을 '불변성을 지킨다' 라고 부른다. 불변성을 지켜줘야만 리액트 컴포넌트에서 상태가 업데이트 되었음을 감지할 수 있고,
// 이에 따라 필요한 리렌더링이 진행된다. 만약 inputs[name]=value 이런식으로 기존 상태를 직접 수정하게 되면 값을 바꿔도 리렌더링 되지 않는다.
// 추가적으로 이랙트에서는 불변성을 지켜줘야만 컴포넌트 업데이트 성능 최적화가 가능하다. 
// !! 지금 기억할 것
// 리액트에서 객체를 업데이트하게 될 때는 기존 객체 직접 수정이 아닌 새로운 객체를 만들어서 새 객체에 변화를 줘야한다.

// 초기화 버튼을 누르면 포커스가 초기화 버튼에 남는다 
// -> 버튼을 클릭했을 때 input에 포커스가 잡히도록

export default InputSample;