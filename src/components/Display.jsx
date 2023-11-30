/* eslint-disable react/prop-types */
import '../styles/Display.css'

export default function Display ({ input, operation }) {

  return (
    <div className='display'>
      <p id="operation">{operation}</p>
      <p id="display">{input}</p>
    </div>
  )
}