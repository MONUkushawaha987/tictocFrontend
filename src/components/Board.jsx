import React from 'react'
import Square from './Square'

export default function Board({ board, onPlay }){
  return (
    <div className="grid grid-cols-3 gap-2">
      {board.map((v,i)=> (
        <Square key={i} value={v} onClick={() => onPlay(i)} />
      ))}
    </div>
  )
}
