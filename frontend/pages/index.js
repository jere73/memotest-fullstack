import Image from 'next/image';
import { Inter } from 'next/font/google';
import MemoList from '@/components/MemoList';
import Typography from '@mui/material/Typography';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
	return (
		<main
			className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
		>
			<div className="relative flex place-items-center before:absolute before:h-[300px] before:w-[480px]">
				<Image
					className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert"
					src="/ht-logo.svg"
					alt="ht Logo"
					width={180}
					height={37}
					priority
				/>
			</div>
			<Typography variant="h1" gutterBottom>
				 <span className='text-violet-700'>HEYTUTOR</span> - MEMOTEST 
			</Typography>
			<MemoList playpage={'/session'}/>
			<div className="mb-32 grid text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-4 lg:text-left"></div>
		</main>
	);
}
