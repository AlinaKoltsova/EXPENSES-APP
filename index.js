//объявление переменных строковых констант
const STATUS_IN_LIMIT = "все хорошо";
const STATUS_OUT_LIMIT = "все плохо";
const CHANGE_LIMIT_TEXT = "Новый лимит";
const STORAGE_LIMIT = "limit";
const STORAGE_EXPENSES = "expenses";

//объявление переменных - ссылок на html элементы 
const inputNode = document.getElementById ("js-expenseInput");
const addButtonNode = document.getElementById ("js-addExpenseBtn");
const categorySelectNode = document.getElementById ("js-categorySelect");
const limitNode = document.getElementById ("js-limitValue");
const sumNode = document.getElementById ("js-sumValue");
const statusNode = document.getElementById ("js-statusValue");
const resetButtonNode = document.getElementById ("js-resetBtn");
const hystoryNode = document.getElementById ("js-expensesHistory");
const changeLimitBtnNode = document.getElementById ("js-changeLimitBtn");


let limit = parseInt(limitNode.innerText);


function initLimit () {

const limitFromStorage = parseInt (localStorage.getItem(STORAGE_LIMIT));

if (!limitFromStorage) {
    return;
} 
limitNode.innerText = localStorage.getItem("limit");
limit = parseInt(limitNode.innerText);

}

initLimit ();
//объявляем массив
const expensesFromStorageString = localStorage.getItem (STORAGE_EXPENSES);
const expensesFromStorage = JSON.parse (expensesFromStorageString);
let expenses = [];

if (Array.isArray (expensesFromStorage)) {
    expenses = expensesFromStorage;
}
render ();

//подсчитываем и возвращаем сумму всех трат
function getTotal () {
    let sum = 0;
    //цикл по массиву объектов, суммируем каждый элемент массива в переменную
    expenses.forEach (function (expense){
        sum += expense.amount;
    })
    return sum;
};

//обьяъвляем блок Всего, Лимит и статус
function renderStatus () {
//создаем переменную, в которую положим конечную сумму, чтобы проверить лимит
    const total = getTotal();
    sumNode.innerText = total;
//проверяем лимит
    if (total<= limit) {
        statusNode.innerText = STATUS_IN_LIMIT;
        statusNode.className = "limit-status";
    } else {
        statusNode.innerText = `${STATUS_OUT_LIMIT} (${limit - total} руб.)`;
        statusNode.className = "limit-status_red"; 
    }
};
//рисуем блок трат сумма - категория
function renderHistory () {
    hystoryNode.innerHTML = "";
//создаем вывовод из массива вместе с категорией с помощью строки
    expenses.forEach (function (expense) {
        const historyitem = document.createElement ("li");
        historyitem.className = "historyOutputStyle";
        historyitem.innerText = `${expense.category} - ${expense.amount} руб.`;
//вставляем следующий ввод в конец вывода в истории
        hystoryNode.appendChild (historyitem);
    })
};


function render () {

    renderStatus ();
    renderHistory ();  
};

//возвращаем введенную пользователем сумму
function getExpenseFromUser () {
    if (inputNode.value<=0)
    {
        alert ("Введи корректное значение в траты");
        return;
    }
    return parseInt(inputNode.value);
};
//возвращаем выбранную категорию
function getSelectedCategory () {
    return categorySelectNode.value;
};

const clearInput = (input) => {
    input.value = "";
};

function saveExpensesToStorage() {
    const sxpensesString = JSON.stringify(expenses);
    localStorage.setItem(STORAGE_EXPENSES, sxpensesString);
};

//функция-обработчик, котоаря будет вызвана при нажатии на кнопку добавить
function addButtonHandler () {
//записываем сумму от пользователя


    const currentAmount = getExpenseFromUser ();
    
    if (!currentAmount) {
        return;
    }

    const currentCategory = getSelectedCategory ();
    if (currentCategory === "Категория") {
        alert ("Выбери категорию");
        return;
    }

    const newExpense = {amount: currentAmount, category:currentCategory};

    expenses.push (newExpense);
    saveExpensesToStorage();
    render ();
    clearInput (inputNode);
};
//функция-обработчик, котоаря будет вызвана при нажатии на сбросить
function clearButtonHandler() {
    expenses = [];
    render (); 
};

function changeLimitHandler () {

const newLimit = prompt(CHANGE_LIMIT_TEXT);
const newLimitValue = parseInt (newLimit);

if (!newLimitValue) {
    alert ("Только цифры и значение больше 0");
    return;
}
if (newLimitValue<=0){
    alert ("Невозможно ввести отрицательное значение");
    return;
}

limitNode.innerText = newLimitValue;
limit = newLimitValue;
localStorage.setItem(STORAGE_LIMIT,newLimitValue);

render ();

};

//привязка функций к кнопкам
addButtonNode.addEventListener ("click",addButtonHandler);
resetButtonNode.addEventListener ("click",clearButtonHandler);
changeLimitBtnNode.addEventListener ("click",changeLimitHandler);

