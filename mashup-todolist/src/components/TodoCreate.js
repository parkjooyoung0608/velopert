import React, {useState} from 'react';
import styled, {css} from 'styled-components';
import { MdAdd } from 'react-icons/md';

// 새로운 항목을 등록하는 컴포넌트
// react-icons 의 MdAdd 를 사용
// useState 를 사용하여 토글 할 수 있는 open 값을 관리하며, 이 값이 true 일 때에는 아이콘을 45도 돌려서 X 모양이 보여지게 한 후, 버튼 색상을 빨간색으로 바꿔줍니다. 그리고, 할 일을 입력 할 수 있는 폼도 보여줍니다.
const CircleButton = styled.button`
  background: #38d9a9;
  &:hover {
    background: #63e6be;
  }
  &:active {
    background: #20c997;
  }

  z-index: 5;
  cursor: pointer;
  width: 80px;
  height: 80px;
  display: block;
  align-items: center;
  justify-content: center;
  font-size: 60px;
  position: absolute;
  left: 50%;
  bottom: 0px;
  transform: translate(-50%, 50%);
  color: white;
  border-radius: 50%;
  border: none;
  outline: none;
  display: flex;
  align-items: center;
  justify-content: center;

  transition: 0.125s all ease-in;
  ${props =>
    props.open &&
    css`
      background: #ff6b6b;
      &:hover {
        background: #ff8787;
      }
      &:active {
        background: #fa5252;
      }
      transform: translate(-50%, 50%) rotate(45deg);
    `}
`;

const InsertFormPositioner = styled.div`
  width: 100%;
  bottom: 0;
  left: 0;
  position: absolute;
`;

const InsertForm = styled.form`
  background: #f8f9fa;
  padding-left: 32px;
  padding-top: 32px;
  padding-right: 32px;
  padding-bottom: 72px;

  border-bottom-left-radius: 16px;
  border-bottom-right-radius: 16px;
  border-top: 1px solid #e9ecef;
`;

const Input = styled.input`
  padding: 12px;
  border-radius: 4px;
  border: 1px solid #dee2e6;
  width: 100%;
  outline: none;
  font-size: 18px;
  box-sizing: border-box;
`;

const TodoCreate = () => {
    const [open, setOpen] = useState(false);

    const onToggle = () => setOpen(!open);

    return (
        <>
          {open && (
              <InsertFormPositioner>
                  <InsertForm>
                      <Input autoFocus placeholder='할 일을 입력 후, Enter를 누르세요' />
                  </InsertForm>
              </InsertFormPositioner>
          )}
            <CircleButton onClick={onToggle} open={open}>
                <MdAdd />
            </CircleButton>  
        </>
    );
};

export default TodoCreate;