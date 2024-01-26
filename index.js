const expenses = []; 

const inputExpensesNode = document.querySelector ('.js-expense-input');
const buttonExpensesNode = document.querySelector ('.js-expense-btn');
const espenseHistoryNode = document.querySelector ('.js-expenses-history');
const sumExpensesTotal = document.querySelector ('.js-sum-total');


buttonExpensesNode.addEventListener('click', function () {
//получаем значение из поля ввода
    if (!inputExpensesNode.value) {

        return;
    }
    
    const expense = parseInt (inputExpensesNode.value);

    inputExpensesNode.value = '';

//сохраняем значение в поле ввода
    expenses.push (expense);

//выводим список трат

    let expensesListHtml ='';

    expenses.forEach(element => {
        expensesListHtml += `<li>${element}</li>`;
    });
    espenseHistoryNode.innerHTML = `<ol>${expensesListHtml}</ol>`;

    //считаем сумму 

    let sumTotal = 0;
    expenses.forEach(element => {
        sumTotal += element;
    });

    sumExpensesTotal.innerText = sumTotal;
});