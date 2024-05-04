import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import { QueryProvider } from '@/providers';

import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
	title: 'Filter Ease',
	description: 'Filter products with ease',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang='en'>
			<QueryProvider>
				<body className={inter.className}>{children}</body>
			</QueryProvider>
		</html>
	);
}
