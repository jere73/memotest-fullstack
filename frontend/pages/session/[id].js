import { useLocalStorage } from '@/hooks/useLocalStorage';
import { useEffect, useState } from 'react';
import Board from '@/components/Board/Board';

export default function Page() {
	const [shuffledMemoBlocks, setShuffledMemoBlocks] = useState([]);
	const [selectedMemoBlock, setSelectedMemoBlock] = useState(null);
	const [animating, setAnimating] = useState(false);
	const [retries, setRetries] = useState(0);
	const [memoSelected, setMemoSelected] = useLocalStorage(
		'memo_selected',
		{}
	);

	useEffect(() => {
		const imageArray = memoSelected.images.map((image, i) => image.url);

		const shuffledImagesArray = shuffleArray([
			...imageArray,
			...imageArray,
		]);

		setShuffledMemoBlocks(
			shuffledImagesArray.map((image, i) => ({
				index: i,
				image,
				flipped: false,
			}))
		);
	}, []);

	function shuffleArray(array) {
		const shuffledArray = [...array];

		function compareRandom() {
			return Math.random() - 0.5;
		}

		shuffledArray.sort(compareRandom);

		return shuffledArray;
	}

	const handleMemoClick = (memoBlock) => {
		const flippedMemoBlock = { ...memoBlock, flipped: true };
		let shuffledMemoBlocksCopy = [...shuffledMemoBlocks];
		shuffledMemoBlocksCopy.splice(memoBlock.index, 1, flippedMemoBlock);
		setShuffledMemoBlocks(shuffledMemoBlocksCopy);

		if (selectedMemoBlock === null) {
			setSelectedMemoBlock(memoBlock);
		} else if (selectedMemoBlock.image === memoBlock.image) {
			setSelectedMemoBlock(null);
			setRetries(retries + 1);
		} else {
			setAnimating(true);
			setRetries(retries + 1);
			setTimeout(() => {
				shuffledMemoBlocksCopy.splice(memoBlock.index, 1, memoBlock);
				shuffledMemoBlocksCopy.splice(
					selectedMemoBlock.index,
					1,
					selectedMemoBlock
				);
				setShuffledMemoBlocks(shuffledMemoBlocksCopy);
				setSelectedMemoBlock(null);
				setAnimating(false);
			}, 1000);
		}
	};

	return (
		<>
			<Board
				memoBlocks={shuffledMemoBlocks}
				animating={animating}
				handleMemoClick={handleMemoClick}
				retries={retries}
			/>
		</>
	);
}
