'use client';

import {
	ChevronDownIcon,
	FilterIcon,
	SortAscIcon,
	SortDescIcon,
} from 'lucide-react';
import { useState } from 'react';

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib';

const SORT_OPTIONS = [
	{
		name: 'None',
		value: 'none',
		icon: null,
	},
	{
		name: 'Price: Low to High',
		value: 'price-asc',
		icon: <SortAscIcon className='mr-1 size-4' />,
	},
	{
		name: 'Price: High to Low',
		value: 'price-desc',
		icon: <SortDescIcon className='mr-1 size-4' />,
	},
] as const;

const HomePage = () => {
	const [isSortDialogOpen, setIsSortDialogOpen] = useState(false);

	const [filter, setFilter] = useState({
		sort: 'none',
	});

	return (
		<main className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
			<div className='flex items-baseline justify-between border-b border-gray-200 pb-6 pt-24'>
				<h1 className='text-4xl font-bold tracking-tight text-gray-900'>
					High-quality cotton selection
				</h1>

				<div className='flex items-center'>
					<DropdownMenu
						onOpenChange={setIsSortDialogOpen}
						open={isSortDialogOpen}
					>
						<DropdownMenuTrigger className='group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900'>
							Sort{' '}
							<ChevronDownIcon className='-mr-1 ml-1 size-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500' />
						</DropdownMenuTrigger>

						<DropdownMenuContent className='space-y-1' align='end'>
							{SORT_OPTIONS.map((option) => (
								<DropdownMenuItem
									key={option.value}
									onClick={() => {
										setFilter((prev) => ({
											...prev,
											sort: option.value,
										}));
									}}
									className={cn('w-full px-4 py-2 text-left text-sm', {
										'bg-gray-100 text-gray-900': option.value === filter.sort,
										'text-gray-500': option.value !== filter.sort,
									})}
								>
									{option.icon} {option.name}
								</DropdownMenuItem>
							))}
						</DropdownMenuContent>
					</DropdownMenu>

					<button
						onClick={() => setIsSortDialogOpen(true)}
						className='-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden'
					>
						<FilterIcon className='size-5' />
					</button>
				</div>
			</div>
		</main>
	);
};

export default HomePage;
