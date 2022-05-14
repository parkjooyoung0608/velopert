# velopert
벨로퍼트 강의 뿌시기 👊🏻👊🏻

# 모던 자바스크립트
## 카운터
* UI 만들기 : HTML
* DOM 선택하기 : `document.getElementById('id값')`
* DOM 내장기능
  - `.innerText` : 내용
  - `.offsetTop` : top 위치
  - `.id` : id

Event 설정하기
버튼 클릭하면 숫자값을 올리거나 내리기
- `.onclick` 이벤트 사용
- `parseInt()`함수 사용 : 문자열을 숫가로 반환해주는 함수 

## 모달
**모달** : 기존의 내용을 가리고 나타나는 메시지 박스

모달을 열고 닫는 기능 구현<br>
display 스타일 사용

html 해당 태그<br>
`display: none;` 으로 해당 엘리먼트 숨김

index.js<br>
onclick 이벤트 사용 : modal 의 `style.dispaly="flex" or "none"` 변경
