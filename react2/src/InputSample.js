import React, {useState, useRef} from 'react';

const InputSample = () => {
    const [inputs, setInpets] = useState({
        name: '',
        nickname: '',
    });

    const {name, nickname} = inputs;


    const onChange = (e) => {
        // input 이 onChange 발생하면 키값에 대한 value를 뽑아야한다.
        const {value, name} = e.target; // target의 name과 value 추출
        setInpets({
            ...inputs,
            [name]:value
        })
    }

    const nameInput = useRef();
    const onReset = () => {
        setInpets({
            name: '',
            nickname:''
        })
        nameInput.current.focus();
    }

    return (
        <div>
            <input 
                name="name" 
                placeholder='이름' 
                onChange={onChange} 
                value={name}
                ref={nameInput}
            />
            <input name="nickname" placeholder='닉네임' onChange={onChange} value={nickname}></input>
            <button onClick={onReset}>초기화</button>
            <div>
                <b>값: </b>
                {name} ({nickname})
            </div>
        </div>
    );
};

export default InputSample;