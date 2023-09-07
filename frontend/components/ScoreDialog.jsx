import * as React from 'react';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import Typography from '@mui/material/Typography';
import {
	Button,
	DialogContent,
	DialogContentText,
	DialogActions,
} from '@mui/material';

const ScoreDialog = (props) => {
	const { open, handleClose, score } = props;

	return (
		<Dialog
			open={open}
			onClose={handleClose}
			aria-labelledby="alert-dialog-title"
			aria-describedby="alert-dialog-description"
		>
			<DialogTitle id="alert-dialog-title">
				{"You're the winner!"}
			</DialogTitle>
			<DialogContent>
				<DialogContentText
					id="alert-dialog-description"
					sx={{ fontSize: 18, textAlign: 'center' }}
				>
					Your score is {score}
				</DialogContentText>
			</DialogContent>
			<Button onClick={handleClose}>
				Memo Home
			</Button>
		</Dialog>
	);
};

export default ScoreDialog;
