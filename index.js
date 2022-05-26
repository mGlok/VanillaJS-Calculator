'use strict';

const numbers = document.querySelectorAll('.numbers')
const operators = document.querySelectorAll('.operator')
const clearEntry = document.querySelectorAll('.clear-entry')
const clear = document.querySelectorAll('clear')
const remove = document.querySelectorAll('.delete')
const equal = document.querySelectorAll('.equal')
const previousResult = document.querySelector('.previous-operand')
const currentResult = document.querySelector('.current-operand')

let currentOperand = ''
let previousOperand = ''
let operation = undefined

const calculate = () => {
    let operand
    if (!previousOperand || !currentOperand) {
        return
    }

    const previous = parseFloat(previousOperand)
    const current = parseFloat(currentOperand)

    if (isNaN(previous || current)) {
        return
    }

    switch (operand) {
        case '+':
            operand = previous + current
            break;
        case '-':
            operand = previous - current
            break;
        case '×':
            operand = previous * current
            break;
        case '÷':
            operand = previous / current
            break;
        case '√':
            operand = Math.pow(previous, 1 / current)
            break;
        case '%':
            operand = previous / 100 * current
            break;
        case 'x²':
            operand = Math.pow(previous, current)
            break;
        default:
            return;
    }
    currentOperand = operand
    operation = undefined
    previousOperand = ''
}


const chooseOperand = (operator) => {
    if (currentOperand === '') {
        return
    }
    operation = operator
    previousOperand = currentOperand
    currentOperand = ''
}

const updateResult = () => {
    currentResult.innerText = currentOperand
    operation != null ? previousResult.innerText = previousOperand + operation : previousResult.innerText = ''
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

const clearResult = () => {
    currentOperand = ''
    previousOperand = ''
    operation = undefined
}

numbers.forEach((number) => {
    number.addEventListener('click', () => {
        addNumber(number.innerText)
        updateResult()
    })
})

remove.addEventListener('click', () => {
    removeNumber()
    updateResult()
})

operators.forEach((operator) => {
    operator.addEventListener('click', () => {
        chooseOperand(operator.innerText)
        updateResult()
    })
});

equal.addEventListener('click', () => {
    calculate()
    updateResult()
})
clearEntry.addEventListener('click',()=>{
    clearResult()
    updateResult()
})