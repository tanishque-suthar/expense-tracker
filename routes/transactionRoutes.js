const { addIncome, getIncomes, deleteIncome } = require('../controller/incomeController');
const {addExpense,getExpenses,deleteExpense} = require('../controller/expenseController');
const { userVerification } = require('../controller/loginController');

const router = require('express').Router();
router.post('/add-income',userVerification,addIncome)
        .get('/get-incomes',userVerification,getIncomes)
        .delete('/delete-income/:id',userVerification,deleteIncome)

        .post('/add-expense',userVerification,addExpense)
        .get('/get-expenses',userVerification,getExpenses)
        .delete('/delete-expense/:id',userVerification,deleteExpense);
module.exports = router;