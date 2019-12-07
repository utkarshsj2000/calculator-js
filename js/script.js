class Calculator{
    constructor(previousDisplay, currentDisplay){
        this.previousDisplay = previousDisplay
        this.currentDisplay = currentDisplay
        this.clear()
    }
    
    clear(){                    //clears the number on pressing AC
            this.previousOperand = ''
            this.currentOperand = ''
            this.operation = undefined
    }

    delete(){                   // deletes the number in current display section on pressing DEL
            this.currentOperand = this.currentOperand.toString().slice(0, -1)
    }

    appendNum(number){        //adds number on next to previous number without adding it to previus one
            if(number === '.' && this.currentOperand.includes('.')) return
            this.currentOperand = this.currentOperand.toString() + number.toString()
    }

    chooseOperator(operation){       //use the arthmetic operations
        if(this.currentOperand ===  '') return
        if(this.currentOperand !==  ''){
            this.calc()
        }
            this.operation = operation
            this.previousOperand = this.currentOperand
            this.currentOperand = ''
    }

    calc(){             //perform the arthmetic operations on number
            let compute
            const prev = parseFloat(this.previousOperand)
            const current = parseFloat(this.currentOperand)
            if( isNaN(prev) || isNaN(current)) return
            switch (this.operation) {
                case '+':
                    compute = prev + current
                    break
                case '-':
                    compute = prev - current
                    break
                case 'x':
                    compute = prev * current
                    break
                case '÷':
                    compute = prev / current
                    break
                default :
                    return
            }
            this.currentOperand = compute
            this.operation = undefined
            this.previousOperand = ''
    }
    getDisplayNumber(number){
        const stringNum = number.toString()
        const intDigits = parseFloat(stringNum.split('.')[0])
        const decDigits = stringNum.split('.')[1]
        let intDisplay
        if(isNaN(intDigits)){
            intDisplay = ''
        } else {
            intDisplay = intDigits.toLocaleString('en', {
                maximumFractionDigits:0  })
        }
        if (decDigits != null){
            return `${intDisplay}.${decDigits}`
        } else {
            return intDisplay
        }
    }

    updateDisplay(){        //display the answers on current display screen
            this.currentDisplay.innerText = this.getDisplayNumber(this.currentOperand)
            if (this.operation != null){
            this.previousDisplay.innerText = `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`
            }
            else {
                this.previousDisplay.innerText = ' '
            }
    }
}

const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operation]')
const equalButton = document.querySelector('[data-equals]')
const deleteButton = document.querySelector('[data-delete]')
const clearButton = document.querySelector('[data-all-clear]')
const previousDisplay = document.querySelector('[data-previous-operand]')
const currentDisplay = document.querySelector('[data-current-operand]')

const calculator = new Calculator( previousDisplay, currentDisplay)


numberButtons.forEach(button =>{
    button.addEventListener('click', () => {
        calculator.appendNum(button.innerText)
        calculator.updateDisplay()
    })
})
    operationButtons.forEach(button =>{
        button.addEventListener('click', () => {
            calculator.chooseOperator(button.innerText)
            calculator.updateDisplay()
        })
    })
    equalButton.addEventListener('click', button => {
        calculator.calc()
        calculator.updateDisplay()
    })

    clearButton.addEventListener('click', button =>{
        calculator.clear()
        calculator.updateDisplay()
    })
    deleteButton.addEventListener('click', button =>{
        calculator.delete()
        calculator.updateDisplay()
    })
