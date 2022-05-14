import React from 'react';
import Hello from './Hello';
import Wrapper from './Wrapper';
import './App.css'

function App() {
  const name = 'react';
  const style = {
    backgroundColor:'black',
    color: 'aqua',
    fontSize: 24,
    padding: 24, // 기본단위
    padding: '1rem' // 다른 단위 사용 시 문자열로 설정
  }
  return (
    <div>
      {/* 컴포넌트는 일종의 UI 조각, 쉽게 재사용 가능 */}
      <Wrapper>
        <Hello name="react" color="red"/>
        <Hello color="red"/>
        <Hello />  
      </Wrapper>

      <div style={style}>{name}</div>
      <div className="gray-box"></div>
    </div>
  );
}

export default App;
