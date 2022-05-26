'use strict';

const numbers = document.querySelectorAll('.numbers')
const operators = document.querySelectorAll('.operator')
const clearEntry = document.querySelectorAll('.clear-enter')
const clear = document.querySelectorAll('clear')
const remove = document.querySelectorAll('.delete')
const equal = document.querySelectorAll('.equal')
const previousResoult = document.querySelector('.previous-operand')
const currentResoult = document.querySelector('.current-operand')

let currentOperand = ''
let previousOperand = ''
let operation = undefined

const chooseOperand = (operator) => {
    if (currentOperand === '') {
        return
    }
    operation = operator
    previousOperand = currentOperand
    currentOperand = ''
}

const updateResoult = () => {
    currentResoult.innerText = currentOperand
    operation != null ? previousResoult.innerText = previousOperand + operation : previousResoult.innerText = ''
}

const addNumber = (number) => {
    if (number === "•") {
        if (currentOperand.includes('.')) {
            return
        }
        number = '.'
    }
    currentOperand = currentOperand.toString() + number.toString()
}

const removeNumber = () => {
    currentOperand = currentOperand.toString().slice(0, -1)
}

numbers.forEach((number) => {
    number.addEventListener('click', () => {
        addNumber(number.innerText)
        updateResoult()
    })
})

remove.addEventListener('click', () => {
    removeNumber()
    updateResoult()
})

operators.forEach((operator) => {
    operator.addEventListener('click', () => {
        chooseOperand(operator.innerText)
        updateResoult()
    })
})