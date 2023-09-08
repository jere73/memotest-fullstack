import React from 'react';

const MemoBlock = ({ memoBlock, animating, handleMemoClick }) => (
	<div
		className="memo-block"
		onClick={() =>
			!memoBlock.flipped && !animating && handleMemoClick(memoBlock)
		}
	>
		<div
			className={`memo-block-inner ${
				memoBlock.flipped && 'memo-block-flipped'
			}`}
		>
			<div className="memo-block-front">
				<div className="h-32 flex items-center justify-center">
					<h1 className="text-4xl font-bold text-amber-200">
						{memoBlock.index + 1}
					</h1>
				</div>
			</div>
			<img className="memo-block-back" src={memoBlock.image} alt="" />
		</div>
	</div>
);

export default MemoBlock;
