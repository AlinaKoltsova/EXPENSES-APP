const expenses = []; 

const inputExpensesNode = document.querySelector ('.js-expense-input');
const buttonExpensesNode = document.querySelector ('.js-expense-btn');

buttonExpensesNode.addEventListener('click', function () {

    const expense = inputExpensesNode.value;

    expenses.push (expense);

    console.log (expenses);

});