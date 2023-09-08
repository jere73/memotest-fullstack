import { useLocalStorage } from '@/hooks/useLocalStorage';
import { useEffect, useState } from 'react';
import Board from '@/components/Board';
import { gql, useMutation } from '@apollo/client';
import { useRouter } from 'next/router';
import ScoreDialog from '@/components/ScoreDialog';
import { Container, Typography, Button } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { COMPLETED_STATE } from '@/constants/constants';

const UPDATE_GAME_SESSION = gql`
	mutation UpdateSession(
		$id: ID!
		$retries: Int
		$state: StateField
		$score: Float
	) {
		updateGameSession(
			id: $id
			retries: $retries
			state: $state
			score: $score
		) {
			id
			number_of_pairs
			retries
			state
		}
	}
`;

export default function Page() {
	const router = useRouter();
	const [shuffledMemoBlocks, setShuffledMemoBlocks] = useState([]);
	const [selectedMemoBlock, setSelectedMemoBlock] = useState(null);
	const [animating, setAnimating] = useState(false);
	const [updateSessionMutation] = useMutation(UPDATE_GAME_SESSION);
	const [gameSessionLocalStorage, setGameSessionLocalStorage] =
		useLocalStorage('game_session', {});
	const [memoSelected, setMemoSelected] = useLocalStorage(
		'memo_selected',
		{}
	);
	const [sessionImages, setSessionImages] = useLocalStorage(
		'session_images',
		[]
	);
	const [winner, setWinner] = useState(false);
	const [openScoreDialog, setOpenScoreDialog] = useState(false);

	useEffect(() => {
		if (gameSessionLocalStorage.state === COMPLETED_STATE || winner) {
			setOpenScoreDialog(true);
		}

		if (gameSessionLocalStorage.new) {
			const imageArray = memoSelected.images.map((image, i) => image.url);

			const shuffledImagesArray = shuffleArray([
				...imageArray,
				...imageArray,
			]);

			const shuffledImages = shuffledImagesArray.map((image, i) => ({
				index: i,
				image,
				flipped: false,
			}));

			setShuffledMemoBlocks(shuffledImages);
			setSessionImages(shuffledImages);

			setGameSessionLocalStorage({
				...gameSessionLocalStorage,
				new: false,
			});

			return;
		}

		setShuffledMemoBlocks(sessionImages);
	}, [winner]);

	function shuffleArray(array) {
		const shuffledArray = [...array];

		function compareRandom() {
			return Math.random() - 0.5;
		}

		shuffledArray.sort(compareRandom);

		return shuffledArray;
	}

	const updateRetriesGameSession = () => {
		const updateVariables = {
			id: gameSessionLocalStorage.id,
			retries: gameSessionLocalStorage.retries + 1,
		};

		updateSessionMutation({
			variables: updateVariables,
			onCompleted: () => {
				setGameSessionLocalStorage({
					...gameSessionLocalStorage,
					retries: gameSessionLocalStorage.retries + 1,
				});
			},
		});
	};

	const checkWinner = (images) => {
		const imagesCheck = images.filter((image) => {
			return image.flipped === false;
		});

		if (imagesCheck.length === 0) {
			const scoreCalculated = calculateScore();

			updateSessionMutation({
				variables: {
					id: gameSessionLocalStorage.id,
					state: COMPLETED_STATE,
					score: scoreCalculated,
				},
				onCompleted: () => {
					setGameSessionLocalStorage({
						...gameSessionLocalStorage,
						state: COMPLETED_STATE,
						score: scoreCalculated,
					});
					setWinner(true);
				},
			});
		}
	};

	const calculateScore = () => {
		const finalRetries = gameSessionLocalStorage.retries;
		const finalNumberOfPairs = gameSessionLocalStorage.number_of_pairs;
		const result = (finalNumberOfPairs / finalRetries) * 100;

		return Number(result.toFixed(2));
	};

	const handleScoreDialogClose = () => {
		setOpenScoreDialog(false);
		router.push(`/`);
	};

	const handleMemoClick = (memoBlock) => {
		const flippedMemoBlock = { ...memoBlock, flipped: true };
		let shuffledMemoBlocksCopy = [...shuffledMemoBlocks];
		shuffledMemoBlocksCopy.splice(memoBlock.index, 1, flippedMemoBlock);
		setShuffledMemoBlocks(shuffledMemoBlocksCopy);

		if (selectedMemoBlock === null) {
			setSelectedMemoBlock(memoBlock);
		} else if (selectedMemoBlock.image === memoBlock.image) {
			const selectedMemoblockFlipped = {
				...selectedMemoBlock,
				flipped: true,
			};
			const memoblockFlipped = { ...memoBlock, flipped: true };

			shuffledMemoBlocksCopy.splice(
				memoblockFlipped.index,
				1,
				memoblockFlipped
			);
			shuffledMemoBlocksCopy.splice(
				selectedMemoblockFlipped.index,
				1,
				selectedMemoblockFlipped
			);
			setSessionImages(shuffledMemoBlocksCopy);
			setShuffledMemoBlocks(shuffledMemoBlocksCopy);
			setSelectedMemoBlock(null);
			updateRetriesGameSession();
			checkWinner(shuffledMemoBlocksCopy);
		} else {
			setAnimating(true);
			updateRetriesGameSession();
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

	const handleBackHome = () => {
		router.push(`/`);
	}

	return (
		<div className="py-10">
			<Container className="my-10">
				<Typography variant="h2" gutterBottom className="text-center">
					<span className="text-violet-700 uppercase font-thin">
						{memoSelected.name}
					</span>
				</Typography>
				<Typography variant="h4" gutterBottom className="text-center">
					<span className="uppercase font-thin">Game Board</span>
				</Typography>
			</Container>
			<Board
				memoBlocks={shuffledMemoBlocks}
				animating={animating}
				handleMemoClick={handleMemoClick}
				retries={gameSessionLocalStorage.retries}
			/>
			<Container className='text-center my-10'>
				<Button
					onClick={handleBackHome}
					variant="contained"
					color="secondary"
					startIcon={<ArrowBackIcon />}
				>
					Return Home
				</Button>
			</Container>
			<ScoreDialog
				open={openScoreDialog}
				handleClose={handleScoreDialogClose}
				score={gameSessionLocalStorage.score}
			/>
		</div>
	);
}
