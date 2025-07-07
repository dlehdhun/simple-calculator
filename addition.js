const exprForm = document.getElementById("calc-form")
    .addEventListener("submit", function (e) {
        e.preventDefault(); // 폼 제출 막음

        const exprInput = document.getElementById("expression");
        const userText = exprInput.value.trim();

        if (checkdateInput(userText)) {
            main(userText);
        }
    });

function checkdateInput(userText) {
    if (userText === "exit") {
        alert("종료");
        return false;
    }
    if (userText === "") {
        alert("값이 없습니다.");
        return false;
    }
    const Values = /^[\d+\-*/() ]+$/;
    if (!Values.test(userText)) {
        alert("잘못된 수식입니다. 숫자와 + - * / () 만 사용할 수 있습니다.");
        return false;
    }
    return true;
}

function main(userText) {
    const sliceText = parseExpr(userText);
    const convertedTokens = tokenize(sliceText);
    const postfix = calcPriority(convertedTokens);
    const [result] = evaluatePostfix(postfix);
    showResult(result);
}

// 문자열 파싱 => 숫자/연산자 배열
function parseExpr(tokens) {
    const sliceText = tokens.match(/\d+|[+\-*/()]/g);
    return sliceText;
}

// 숫자 문자열은 숫자로 변환
function tokenize(sliceText) {
    return sliceText.map(a => isNaN(a) ? a : Number(a));
}

// 후위 표기식 변환
function calcPriority(sliceText) {
    const output = [];
    const stack = [];
    const priority = {
        '+': 1,
        '-': 1,
        '*': 2,
        '/': 2,
    };

    for (let token of sliceText) {
        if (typeof token === 'number') {
            output.push(token);
        } else {
            while (
                stack.length > 0 &&
                priority[stack[stack.length - 1]] >= priority[token]
            ) {
                output.push(stack.pop());
            }
            stack.push(token);
        }
    }

    while (stack.length > 0) {
        output.push(stack.pop());
    }

    return output;
}

// 후위 표기식 계산
function evaluatePostfix(ans) {
    const stack = [];

    for (let token of ans) {
        if (typeof token === 'number') {
            stack.push(token)
        } else {
            let left = stack.pop();
            let right = stack.pop();
            stack.push(calculate(left, right, token));
        }
    }
    return stack;
}

// 연산 처리
function calculate(left, right, operator) {
    switch (operator) {
        case "+":
            return (left + right);
        case "-":
            return (right - left);
        case "*":
            return (left * right);
        case "/":
            const num = right / left;
            return Number.isInteger(num) ? num : Number(num.toFixed(2));
    }
}

// 출력하기
function showResult(result) {
    const results = document.getElementById("result");
    results.innerText = `결과: ${result}`;
}
