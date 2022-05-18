import React, { useReducer, createContext } from 'react';
import { useContext } from 'react/cjs/react.production.min';

const initialTodos = [
    {
        id:1,
        text: '프로젝트 생성하기',
        done: true
    },
    {
        id:2,
        text: '컴포넌트 스타일링하기',
        done: true
    },
    {
        id:3,
        text: 'Context 만들기',
        done: false
    },
    {
        id:4,
        text: '기능 구현하기',
        done: false
    },
]

function todoReducer(state, action){
    switch(action.type){
        case 'CREATE':
            return state.concat(action.todo);
        case 'TOGGLE':
            return state.map(todo => 
                todo.id === action.id ? {...todo, done: !todo.done } : todo
            );
        case 'REMOVE':
            return state.filter(todo => todo.id !== action.id);
        default:
            throw new Error(`Unhandled action type: ${action.type}`);
    }
};

// state와 dispatch 를 Context를 통해서 다른 컴포넌트에서 바로 사용할 수 있게
// Context를 만들어서 state와 dispatch를 함께 넣어주는 대신, 두개의 Context를 만들어서 따로 넣어줄 것
// 이렇게 하며녀 dispatch만 필요한 컴포넌트에서 불필요한 렌더링 방지

const TodoStateContext = createContext();
const TodoDispatchContext = createContext();

// 이제 Context를 사용 할 값을 지정
// Previder 컴포넌트를 렌더링 하고 value를 설정해주면 된다.
// 그리고 props로 받아온 children 값을 내부에 렌더링 한다.
export function TodoProvider({children}){
    const [state, dispatch] = useReducer(todoReducer, initialTodos);
    return (
        <TodoStateContext.Provider value={state}>
            <TodoDispatchContext.Provider value={dispatch}>
                {children}
            </TodoDispatchContext.Provider>
        </TodoStateContext.Provider>
    );
}

export function useTodoState(){
    return useContext(TodoStateContext);
}

export function useTodoDispatch(){
    return useContext(TodoDispatchContext)
}

// 이렇게 하면 다른 컴포넌트에서 state나 dispatch를 사용하고 싶을 때
// improt로 컴포넌트 불러오고
// const state = useStateContext, RodoDispatchContext

// ?? 한 컴포넌트에 여러개의 export를 넣을 수 있나요?
// export function으로 하는 이유는 뭔가요??
