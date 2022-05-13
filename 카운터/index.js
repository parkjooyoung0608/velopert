// DOM 선택하기
const number = document.getElementById("number")
const increase = document.getElementById("increase")
const decrease = document.getElementById("decrease")

console.log(number.innerText) // 내용
console.log(increase.offsetTop) // top 위치
console.log(decrease.id) // id


// 이벤트 설정하기
// 버튼 클릭 됐을 때 콘솔에 텍스트를 출력하는 이벤트를 설정
increase.onclick = () => {
    const current = parseInt(number.innerText, 10);
    console.log("increase 가 클릭됨")
    number.innerText = current + 1;
}

decrease.onclick = () => {
    const current = parseInt(number.innerText, 10);
    console.log("decrease 가 클릭됨")
    number.innerText = current - 1;

}
// parseInt는 문자열을 숫자로 변환해주는 함수, 두번째 10을 넣어준 것은 10진수로 숫자를 받아오겠다는 의미