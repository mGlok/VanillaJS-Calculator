'use strict';

const numbers = document.querySelectorAll('.numbers')
const operators = document.querySelectorAll('.operator')
const clearEntry = document.querySelector('.clear-entry')
const remove = document.querySelector('.delete')
const equal = document.querySelector('.equal')
const previousResult = document.querySelector('.previous-operand')
const currentResult = document.querySelector('.current-operand')

let currentOperand = ''
let operation = undefined
let previousOperand = ''

const calculate = () => {
    let operand
    if (!previousOperand || !currentOperand) {
        return
    }

    const previous = parseFloat(previousOperand)
    const current = parseFloat(currentOperand)

    if (isNaN(previous) || isNaN(current)) {
        return
    }

    switch (operation) {
        case '+':
            operand = previous + current
            break
        case '-':
            operand = previous - current
            break
        case '×':
            operand = previous * current
            break
        case '÷':
            if (current === 0) {
                clearResult()
                return
            } else {
                operand = previous / current
            }
            break
        case 'x²':
            operand = Math.pow(previous, current)
            break
        case '√':
            operand = Math.pow(previous, 1 / current)
            break
        case '%':
            operand = previous / 100 * current
            break
        default:
            return
    }
    currentOperand = operand
    operation = undefined
    previousOperand = ''
}


const chooseOperand = (operator) => {
    if (currentOperand === '') {
        return
    }
    if (previousOperand !== '') {
        const previous = previousResult.innerText
        if (currentOperand.toString() === '0' && previous[previous.length - 1] === '÷') {
            clearResult()
            return
        }
        calculate()
    }
    operation = operator
    previousOperand = currentOperand
    currentOperand = ''
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

const updateResult = () => {
    currentResult.innerText = currentOperand
    operation != null ? previousResult.innerText = previousOperand + operation : previousResult.innerText = ''
}

const clearResult = () => {
    currentOperand = ''
    operation = undefined
    previousOperand = ''
}

numbers.forEach((number) => {
    number.addEventListener('click', () => {
        addNumber(number.innerText)
        updateResult()
    })
})

operators.forEach((operator) => {
    operator.addEventListener('click', () => {
        chooseOperand(operator.innerText)
        updateResult()
    })
})

equal.addEventListener('click', () => {
    calculate()
    updateResult()
})

remove.addEventListener('click', () => {
    removeNumber()
    updateResult()
})

clearEntry.addEventListener('click', () => {
    clearResult()
    updateResult()
})