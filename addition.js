const exprInput = document.getElementById("calc-form")
    .addEventListener("submit", function (e) {
        e.preventDefault(); // html로 못가게 막음

        // input 요소 가져오기
        const exprInput = document.getElementById("expression");
        // 값 읽기
        const userText = exprInput.value.trim();

        if (userText === "exit") {
            alert("종료");
        } else {
            parseExpr(userText);
        }
    });

// 문자, 숫자 분리해주기
function parseExpr(userText) {
    const sliceText = userText.match(/(\d+|\+|\-|\*|\/|\(|\))/g);
    console.log(sliceText);
    tokenize(sliceText);
}

// 출력기능 함수
// function printMessage() {

// }

// 계산하기
// function basic_ari() {

// }

// 숫자를 숫자로 바꾸기
function tokenize(sliceText) {
    const slicenumText = sliceText.map(a => isNaN(a) ? a : Number(a));
    console.log(slicenumText);
    calcPriority(slicenumText);
}

// 우선순위 계산하기
function calcPriority(sliceText) {

}
