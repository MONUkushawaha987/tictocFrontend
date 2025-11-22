import React from 'react'

export default function Square({ value, onClick }){
  return (
    <button onClick={onClick} className="w-20 h-20 md:w-24 md:h-24 flex items-center justify-center text-4xl font-bold border rounded hover:bg-gray-100">
      {value}
    </button>
  )
}
