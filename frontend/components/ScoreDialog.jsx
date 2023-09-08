import * as React from 'react';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import Typography from '@mui/material/Typography';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {
	Button,
	DialogContent,
	DialogContentText,
} from '@mui/material';

const ScoreDialog = (props) => {
	const { open, handleClose, score } = props;

	return (
		<Dialog
			open={open}
			onClose={handleClose}
			aria-labelledby="alert-dialog-title"
			aria-describedby="alert-dialog-description"
			PaperProps={{
				style: {
					width: 700
				},
			  }}
		>
			<DialogTitle id="alert-dialog-title" className='text-center'>
				<Typography variant="h3" className='uppercase font-extrabold'>
					You're the <span className='text-violet-700'>winner!</span>
				</Typography>
			</DialogTitle>
			<DialogContent>
				<DialogContentText
					id="alert-dialog-description"
					sx={{ fontSize: 18, textAlign: 'center' }}
				>
					<Typography variant="h4" gutterBottom className='uppercase'>
						Your score is <span className='block font-extrabold'>{score ?? 0}</span>
					</Typography>
				</DialogContentText>
			</DialogContent>
			<Button 
				onClick={handleClose}
				variant="contained"
				color="secondary"
				startIcon={<ArrowBackIcon />}
				>
				Return Home
			</Button>
		</Dialog>
	);
};

export default ScoreDialog;
