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
let opereration = undefined

const updateResoult = () => {
    currentResoult.innerText = currentOperand
    previousResoult.innerText = previousOperand
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

numbers.forEach((number) => {
    number.addEventListener('click', () => {
        addNumber(number.innerText)
        updateResoult()
    })
})