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

const MemoList = () => {
	const { data, loading, error } = useQuery(QUERY);
	console.log(data);

	if (loading) return 'Loading...';

	if (error) {
		console.error(error);
		return null;
	}

	const memos = data.memos;

	return (
		<Box sx={{ width: '100%', maxWidth: 760, bgcolor: 'background.paper' }}>
			<List>
				{memos.map((memo) => (
					<ListItem key={memo.id} className="my-10">
						<ListItemText primary={memo.name} className="mr-10" />
						<Button variant="contained" endIcon={<SendIcon />}>
							Let's play
						</Button>
					</ListItem>
				))}
			</List>
		</Box>
	);
};

export default MemoList;
