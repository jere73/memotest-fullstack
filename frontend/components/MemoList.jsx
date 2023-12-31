import { useQuery, gql, useMutation } from '@apollo/client';
import { Box, List, ListItem, ListItemText, Button } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import RecyclingIcon from '@mui/icons-material/Recycling';
import { STARTED_STATE } from '@/constants/constants';

const QUERY = gql`
	query memos {
		memos {
			gameSessions {
				number_of_pairs
				retries
				state
				score
			}
			id
			name
			images {
				url
			}
		}
	}
`;

const CREATE_GAME_SESSION = gql`
	mutation CreateSession(
		$number_of_pairs: Int!
		$retries: Int!
		$state: StateField!
		$memo: CreateGameSessionBelongsTo!
	) {
		createGameSession(
			input: {
				number_of_pairs: $number_of_pairs
				retries: $retries
				state: $state
				memo: $memo
			}
		) {
			id
			number_of_pairs
			retries
			state
			score
			memo {
				id
			}
		}
	}
`;

const MemoList = ({ playpage }) => {
	const [memos, setMemos] = useState([]);
	const router = useRouter();
	const [memosLocalStorage, setMemosLocalStorage] = useLocalStorage(
		'memos',
		[]
	);
	const [memoSelected, setMemoSelected] = useLocalStorage(
		'memo_selected',
		{}
	);
	const [gameSessionLocalStorage, setGameSessionLocalStorage] =
		useLocalStorage('game_session', {});
	const { loading, data } = useQuery(QUERY, {
		onCompleted: () => {
			const fixedMemos = data.memos.map((memo) => {
				const highestValue = getHighestValue(memo.gameSessions);
				return { ...memo, high_score: highestValue };
			});

			setMemos(fixedMemos);
			setMemosLocalStorage(fixedMemos);
		},
	});
	const [createSession] = useMutation(CREATE_GAME_SESSION);
	const [gameStarted, setGameStarted] = useState(false);

	useEffect(() => {
		if (
			gameSessionLocalStorage &&
			gameSessionLocalStorage.state === STARTED_STATE
		) {
			setGameStarted(true);
		}
	});

	const getHighestValue = (gameSessionArray) => {
		return gameSessionArray.reduce((maxValue, object) => {
			if (object.score > maxValue) {
				return object.score;
			} else {
				return maxValue;
			}
		}, 0);
	};

	if (loading) return 'Loading...';

	const handleStartNewGameButtonClick = (id) => {
		const memoSelected = memosLocalStorage.filter((memo) => {
			return memo.id === id;
		})[0];

		setMemoSelected(memoSelected);

		createSession({
			variables: {
				number_of_pairs: memoSelected.images.length * 2,
				retries: 0,
				state: STARTED_STATE,
				memo: { connect: memoSelected.id },
			},
			onCompleted: (data) => {
				const gameSessionObject = {
					...data.createGameSession,
					new: true,
				};
				setGameSessionLocalStorage(gameSessionObject);
				router.push(`${playpage}/${id}`);
			},
		});
	};

	const handleContinueGameButtonClick = (id) => {
		const memoSelected = memosLocalStorage.filter((memo) => {
			return memo.id === id;
		})[0];

		setMemoSelected(memoSelected);
		router.push(`${playpage}/${id}`);
	};

	return (
		<Box sx={{ width: '100%', maxWidth: 600, bgcolor: 'background.paper' }}>
			<List>
				{memos.map((memo) => (
					<ListItem key={memo.id} className="my-10">
						<ListItemText
							primary={memo.name}
							secondary={`Highest score: ${memo.high_score}`}
						/>
						{gameStarted &&
						gameSessionLocalStorage.memo.id == memo.id ? (
							<Button
								onClick={() =>
									handleContinueGameButtonClick(memo.id)
								}
								variant="contained"
								endIcon={<RecyclingIcon />}
								color="warning"
							>
								Continue
							</Button>
						) : (
							<Button
								onClick={() =>
									handleStartNewGameButtonClick(memo.id)
								}
								variant="contained"
								endIcon={<SendIcon />}
								color="secondary"
							>
								Start New Game
							</Button>
						)}
					</ListItem>
				))}
			</List>
		</Box>
	);
};

export default MemoList;
