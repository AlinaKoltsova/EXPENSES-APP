const LIMIT = 100000;
const CURRENCY = ' руб.';
const STATUSINLIMIT = 'все хорошо';
const STATUSOUTLIMIT = 'все плохо';
const STATUSOUTLIMIT_CLASSNAME = 'limit-status_red';
const STATUSLIMIT_CLASSNAME = 'limit-status';

const inputExpensesNode = document.getElementById ('js-expenseInput');
const buttonExpensesNode = document.getElementById ('js-addExpenseBtn');
const espenseHistoryNode = document.getElementById ('js-expensesHistory');
const sumExpensesTotalNode = document.getElementById ('js-sumValue');
const expenseLimitNode = document.getElementById ('js-limitValue');
const expenseLimitStatusNode = document.getElementById ('js-statusValue');
const resetButtonNode = document.getElementById ('js-resetBtn');

let expenses = [];
init (expenses);

function init (expenses) {

    expenseLimitNode.innerText = `${LIMIT}${CURRENCY}`;
    expenseLimitStatusNode.innerText = STATUSINLIMIT;
    sumExpensesTotalNode.innerText = `${0}${CURRENCY}`;
    expenseLimitStatusNode.classList.add (STATUSLIMIT_CLASSNAME);
};

buttonExpensesNode.addEventListener('click', function () {

    const expense = getExpensefromuser();

    if (!expense) {
        return;
    }

    if (expense < 0) {
        alert("Введите положительное число.");
        return;
    }

    trackExpenses (expense);
    render (expenses);
});

resetButtonNode.addEventListener('click', function () {

    expenses.length = 0;
    init ();
    espenseHistoryNode.innerHTML = '';
});

function getExpensefromuser () {

    if (!inputExpensesNode.value) {
        return null;
    }
    const expense = parseInt (inputExpensesNode.value);
    clearInput ();
    return expense;
};

function trackExpenses (expense) {

    expenses.push (expense);
};

function calculateExpanses (expenses) {

    let sumTotal = 0;

    expenses.forEach(element => {
        sumTotal += element;
    });

    return sumTotal;
};

function renderHistory (expenses) {

    let expensesListHtml ='';

    expenses.forEach(element => {
        expensesListHtml += `<li>${element}${CURRENCY}</li>`;
    });

    espenseHistoryNode.innerHTML = `<ol>${expensesListHtml} </ol>`;
};

function renderStatusExpenses (sumTotal) {

    if (sumTotal<= LIMIT) {

        expenseLimitStatusNode.innerText = STATUSINLIMIT;
     } else {

        expenseLimitStatusNode.innerText = `${STATUSOUTLIMIT} (${LIMIT - sumTotal} руб.)`;
        expenseLimitStatusNode.classList.add (STATUSOUTLIMIT_CLASSNAME);
     }
};

function renderSumTotal (sumTotal) {

    sumExpensesTotalNode.innerText = `${sumTotal}${CURRENCY}`;
};

function render (expenses) {

    const sumTotal = calculateExpanses (expenses);

    renderSumTotal (sumTotal);
    renderHistory (expenses);
    renderStatusExpenses (sumTotal);
};

function clearInput () {

    inputExpensesNode.value = '';
};

