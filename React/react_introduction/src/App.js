import React from 'react';
import Hello from './Hello';
import Wrapper from './Wrapper';
import Counter from './Counter';
import InputSample from './InputSample';
import UserList from './UserList';

import './App.css'

function App() {
  
  const name = 'react';
  const style = {
    backgroundColor:'black',
    color: 'aqua',
    fontSize: 24,
    padding: 24, // 기본단위
    paddingf: '1rem' // 다른 단위 사용 시 문자열로 설정
  }

  return (
    <div>
      {/* 컴포넌트는 일종의 UI 조각, 쉽게 재사용 가능 */}
      <Wrapper>
        {/* isSpecial props 설정 , 
          여기서 true는 자바스크립트 값이기 때문에 {}로 닫기
          true인지 false인지에 따라서 컴포넌트 좌측에 *표시 => 삼항연산자 사용 
        */}
        {/* props 이름만 작성하고 값 설정을 생략하면 true로 설정한 것으로 간주 */}
        <Hello name="react" color="red" isSpecial />
        <Hello color="red"/>
        <Hello />  
      </Wrapper>

      <div style={style}>{name}</div>
      <div className="gray-box"></div>
      
      <hr/>
      <h4>Counter 예제</h4>
      <Counter />

      <hr/>
      {/* 
          input에 입력하는 값이 하단에 나타나고,
          초기화 버튼 누르면 input 값이 비워지도록 구현
       */}
      <h4>Input 상태 관리하기</h4>
      <InputSample />

       <hr/>
       <h4>배열 렌더링하기</h4>
       <UserList />

    </div>
  );
}

export default App;
