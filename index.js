const LIMIT = 100000;
const CURRENCY = ' руб.';
const STATUSINLIMIT = 'все хорошо';
const STATUSOUTLIMIT = 'все плохо';
const STATUSOUTLIMIT_CLASSNAME = 'limit-status_red';

const inputExpensesNode = document.querySelector ('.js-expense-input');
const buttonExpensesNode = document.querySelector ('.js-expense-btn');
const espenseHistoryNode = document.querySelector ('.js-expenses-history');
const sumExpensesTotalNode = document.querySelector ('.js-sum-total');
const expenseLimitNode = document.querySelector ('.js-limit');
const expenseLimitStatusNode = document.querySelector ('.js-limit-status');

const expenses = [];

init (expenses);

buttonExpensesNode.addEventListener('click', function () {

    const expense = getExpensefromuser();

    if (!expense) {

        return;
    }
    
    trackExpenses (expense);
    render (expenses);
});

function init (expenses) {

    expenseLimitNode.innerText = LIMIT;
    expenseLimitStatusNode.innerText = STATUSINLIMIT;
    
};

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

        expenseLimitStatusNode.innerText = STATUSOUTLIMIT;
        expenseLimitStatusNode.classList.add (STATUSOUTLIMIT_CLASSNAME);
     }
};

function renderSumTotal (sumTotal) {

    sumExpensesTotalNode.innerText = sumTotal;
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