import React from 'react';
import MemoBlock from './MemoBlock';

const Board = ({ memoBlocks, animating, handleMemoClick, retries }) => {
	return (
		<div className="board">
			{memoBlocks.map((memoBlock, index) => {
				return (
					<MemoBlock
						key={index}
						memoBlock={memoBlock}
						animating={animating}
						handleMemoClick={handleMemoClick}
					/>
				);
			})}
			<h3>Retries {retries}</h3>
		</div>
	);
};

export default Board;
