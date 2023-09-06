import React from 'react'
import MemoBlock from '../MemoBlock/MemoBlock'

const Board = ({memoBlocks, animating, handleMemoClick}) => {
  return (
    <div className='board'>
      {
        memoBlocks.map((memoBlock, index) => {
            return <MemoBlock key={index} memoBlock={memoBlock} animating={animating} handleMemoClick={handleMemoClick} />
        })
      }
    </div>
  )
}

export default Board
