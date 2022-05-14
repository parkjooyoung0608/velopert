import React, { useState } from 'react';

function InputSample(){

    const [text, setText] = useState('');

    const onChange = (e) => {
        setText(e.target.value);
    }

    const onReset = () => {
        setText('');
    }

    return (
        <div>
            {/* input 상태를 관리할 때는 value 값을 설정해주는 것도 중요하다. 
            그렇게해야, 상태가 바뀌었을 때 input 내용도 업데이트된다. */}
            <input onChange={onChange} value={text}/>
            <button onClick={onReset}>초기화</button>
            <div>
                <b>값: {text}</b>
            </div>
        </div>
    )
}

export default InputSample;