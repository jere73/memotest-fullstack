import React from 'react';
import MemoBlock from './MemoBlock';
import { Card, Container, Typography } from '@mui/material';

const Board = ({ memoBlocks, animating, handleMemoClick, retries }) => {
	return (
		<div>
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
			</div>
			<Container maxWidth="sm">
				<Card>
					<Typography
						variant="h5"
						gutterBottom
						className="text-center uppercase py-2"
					>
						Retries
					</Typography>
					<Typography
						variant="h2"
						gutterBottom
						className="text-center uppercase font-bold"
					>
						{retries}
					</Typography>
				</Card>
			</Container>
		</div>
	);
};

export default Board;
