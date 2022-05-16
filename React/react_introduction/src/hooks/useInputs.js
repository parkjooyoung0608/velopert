// 커스텀 Hooks를 만들 때에는 보통 이렇게 use라는 키워드로 시작하는 파일을 만들고 그 안에 함수를 작성한다.
// 커스텀 Hooks를 만드는 방법
// 그냥 이 안에서 useState, useEffect, useReducer, useCallback등 hooks를 사용해 원하는 기능을 구현해주고, 컴포넌트에서 사용하고 싶은 값들을 반환해주면 된다.

import { useState, useCallback } from 'react';

function useInputs(initialFrom){
    const [form, setForm] = useState(initialFrom);
    // change
    const onChange = useCallback(e=>{
        const {name, value} = e.target;
        setForm( form => ( {...form, [name]: value } ));
    }, []);

    const reset = useCallback( () => setForm(initialFrom), [initialFrom] );
    return [form, onChange, reset];
}

export default useInputs;