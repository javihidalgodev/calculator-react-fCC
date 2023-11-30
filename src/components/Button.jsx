/* eslint-disable react/prop-types */
import '../styles/Button.css'

export default function Button ({ id, ...arr }) {
  const isOperator = value => {
    return isNaN(value) && value !== '.' && value !== '='
  }

  return (
    arr.rowSpan || arr.colSpan
      ? (
        arr.rowSpan 
          ? <td rowSpan={arr.rowSpan}><button id={id} className={`button ${isOperator(arr.children) ? 'operator' : ''}`.trimEnd()} onClick={(e)=>{arr.handleClick(e, arr.children)}}>{arr.children}</button></td>
          : <td colSpan={arr.colSpan}><button id={id} className={`button ${isOperator(arr.children) ? 'operator' : ''}`.trimEnd()} onClick={(e)=>{arr.handleClick(e, arr.children)}}>{arr.children}</button></td>
      ) : (
        <td><button id={id} className={`button ${isOperator(arr.children) ? 'operator' : ''}`.trimEnd()} onClick={(e)=>{arr.handleClick(e, arr.children)}}>{arr.children}</button></td>
      )
  )
}