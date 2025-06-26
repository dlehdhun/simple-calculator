const exprForm = document.getElementById("calc-form")
    .addEventListener("submit", function (e) {
        e.preventDefault(); // html로 못가게 막음

        const exprInput = document.getElementById("expression");
        const userText = exprInput.value.trim();

        if (userText === "exit") {
            alert("종료");
        } else if (userText === ""){
            alert("값이 없습니다.");
        } else {
            main(userText);
        }
    });

function main(userText) {
    const sliceText = parseExpr(userText);
    const slicenumText = tokenize(sliceText);
    const postfix = calcPriority(slicenumText);
    const [result] = basic_ari(postfix);
    printMessage(result);
}

// 문자열 파싱
function parseExpr(tokens) {
    const sliceText = tokens.match(/\d+|[+\-*/()]/g);
    return sliceText;
}

// 숫자인 문자를 숫자로 바꾸기
function tokenize(sliceText) {
    return sliceText.map(a => isNaN(a) ? a : Number(a));
}

// 우선순위 계산하기 (후위표기식)
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

// 후위표기식 하나씩 분리해서 ari로 보내기
function basic_ari(ans) {
    const stack = [];

    for (let token of ans) {
        if (typeof token === 'number') {
            stack.push(token)
        } else {
            let a = stack.pop();
            let b = stack.pop();
            stack.push(ari(a, b, token));
        }
    }
    return stack;
}

// 계산하기
function ari(a, b, token) {
    switch (token) {
        case "+":
            return (a + b);
        case "-":
            return (b - a);
        case "*":
            return (a * b);
        case "/":
            const num = b / a;
            return Number.isInteger(num) ? num : Number(num.toFixed(2));
    }
}

// 출력하기
function printMessage(result) {
    const results = document.getElementById("result");
    results.innerText = `결과: ${result}`;
}
