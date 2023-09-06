import { useQuery, gql } from '@apollo/client';
import {
	Box,
	Grid,
	Typography,
	Demo,
	List,
	ListItem,
	ListItemText,
	ListItemAvatar,
	IconButton,
	Avatar,
	ListItemButton,
	Button,
	Divider,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import FolderIcon from '@mui/icons-material/Folder';
import SendIcon from '@mui/icons-material/Send';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useLocalStorage } from '@/hooks/useLocalStorage';

const QUERY = gql`
	query memos {
		memos {
			gameSessions {
				number_of_pairs
				retries
				state
			}
			id
			name
			images {
				url
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
	const { loading, data } = useQuery(QUERY, {
		onCompleted: () => {
			setMemos(data.memos);
			setMemosLocalStorage(data.memos);
		},
	});

	if (loading) return 'Loading...';

	const handleButtonClick = (id) => {
		const memoSelected = memosLocalStorage.filter((memo) => {
			return memo.id === id;
		})[0];
		setMemoSelected(memoSelected);
		router.push(`/session/${id}`);
	};

	return (
		<Box sx={{ width: '100%', maxWidth: 600, bgcolor: 'background.paper' }}>
			<List>
				{memos.map((memo) => (
					<ListItem key={memo.id} className="my-10">
						<ListItemText primary={memo.name} />
						<Button
							onClick={() => handleButtonClick(memo.id)}
							variant="contained"
							endIcon={<SendIcon />}
						>
							Let's play
						</Button>
					</ListItem>
				))}
			</List>
		</Box>
	);
};

export default MemoList;
