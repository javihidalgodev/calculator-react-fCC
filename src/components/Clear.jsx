/* eslint-disable react/prop-types */
export default function Clear ({ id, ...arr }) {
  return (
    <td colSpan={arr.colSpan}>
      <button
        type='button'
        id={id}
        className='button clear'
        onClick={(e)=>{arr.handleClick(e, arr.children)}}>
          {arr.children}
      </button>
    </td>
  )
}