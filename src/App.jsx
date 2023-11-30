import './App.css'
import { useState } from 'react'
import { evaluate } from 'mathjs'
import Button from './components/Button'
import Display from './components/Display'
import Clear from './components/Clear'

function App() {
  const [operation, setOperation] = useState(0)
  const [input, setInput] = useState(0)

  const add = (e, value) => {
    if(input === 0) {
      if(isNaN(value)) {
        if(value === '.') {
          setInput(input + value)
          setOperation(operation + value)
        } else {
          alert('Introduce primero un valor')
        }
      } else if (value === '0') {
        setInput(0)
        setOperation(0)
      } else {
        setInput(value)
        setOperation(value)
      }
    } else if (operation.includes('=')) {
      if(!isNaN(value)) {
        setInput(value)
        setOperation(value)
      } else if (value === '.') {
        setInput('0.')
        setOperation('0.')
      } else {
        setInput(input + value)
        setOperation(operation.split('=')[1].trimStart() + value)
      }
    } else {
      if(isNaN(value)){
        if(value === '.') {
          e.target.setAttribute('disabled', '')
          if(isNaN(input)) {
            setInput(0 + value)
            setOperation(operation + 0 + value)
          } else {
            setInput(input + value)
            setOperation(operation + value)
          }
        } else {
          setInput(value)
          if(isNaN(operation[operation.length - 1])) {
            if(operation[operation.length - 1] !== '-' && value === '-') {
              setOperation(operation + value)
            } else if (isNaN(operation[operation.length - 2]) && value !== '-') {
              const newString = operation.slice(0, operation.length-2)
              setOperation(newString + value)
            } else {
              const newString = operation.slice(0, operation.length-1)
              setOperation(newString + value)
            }
          } else {
            setOperation(operation + value)
          }
          document.querySelector('#decimal').removeAttribute('disabled')
        }
      } else {
        if(isNaN(input)) {
          setInput(value)
        } else {
          setInput(input + value)
        }
        setOperation(operation + value)
      }
    }
  }

  const calcRes = () => {
    if(operation) {
      const res = evaluate(operation)
      setOperation(`${operation} = ${res}`)
      setInput(res)
      document.querySelector('#decimal').removeAttribute('disabled')
    }
  }

  const handleClear = () => {
    setInput(0)
    setOperation(0)
    document.querySelector('#decimal').removeAttribute('disabled')
  }

  return (
    <div id='calculator'>
      <Display input={input} operation={operation} />
      <div id="board">
        <table>
          <tbody>
          <tr>
            <Clear id='clear' colSpan='2' handleClick={handleClear}>AC</Clear>
            <Button id='divide' handleClick={add}>/</Button>
            <Button id='multiply' handleClick={add}>*</Button>
          </tr>
          <tr>
            <Button id='seven' handleClick={add}>7</Button>
            <Button id='eight' handleClick={add}>8</Button>
            <Button id='nine' handleClick={add}>9</Button>
            <Button id='subtract' handleClick={add}>-</Button>
          </tr>
          <tr>
            <Button id='four' handleClick={add}>4</Button>
            <Button id='five' handleClick={add}>5</Button>
            <Button id='six' handleClick={add}>6</Button>
            <Button id='add' handleClick={add}>+</Button>
          </tr>
          <tr>
            <Button id='one' handleClick={add}>1</Button>
            <Button id='two' handleClick={add}>2</Button>
            <Button id='three' handleClick={add}>3</Button>
            <Button id='equals' rowSpan='2' handleClick={calcRes}>=</Button>
          </tr>
          <tr>
            <Button id='zero' colSpan='2' handleClick={add}>0</Button>
            <Button id='decimal' handleClick={add}>.</Button>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default App
