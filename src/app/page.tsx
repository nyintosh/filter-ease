'use client';

import { useQuery } from '@tanstack/react-query';
import { QueryResult } from '@upstash/vector';
import axios from 'axios';
import {
	ChevronDownIcon,
	FilterIcon,
	SortAscIcon,
	SortDescIcon,
} from 'lucide-react';
import { useState } from 'react';

import { ProductCard, ProductCardSkeleton } from '@/components';
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from '@/components/ui/accordion';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Slider } from '@/components/ui/slider';
import { Product } from '@/db';
import { ProductState, cn } from '@/lib';

const SUBCATEGORIES = [
	{ name: 'T-Shirts', selected: true, href: '#' },
	{ name: 'Hoodies', selected: false, href: '#' },
	{ name: 'Sweatshirts', selected: false, href: '#' },
	{ name: 'Accessories', selected: false, href: '#' },
] as const;

const SORT_OPTIONS = [
	{ name: 'None', value: 'none', icon: null },
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

const COLOR_FILTERS = {
	id: 'color',
	name: 'Color',
	options: [
		{ label: 'White', value: 'white' },
		{ label: 'Beige', value: 'beige' },
		{ label: 'Blue', value: 'blue' },
		{ label: 'Green', value: 'green' },
		{ label: 'Purple', value: 'purple' },
	],
} as const;

const SIZE_FILTERS = {
	id: 'size',
	name: 'Size',
	options: [
		{ label: 'S', value: 'S' },
		{ label: 'M', value: 'M' },
		{ label: 'L', value: 'L' },
	],
} as const;

const PRICE_FILTERS = {
	id: 'price',
	name: 'Price',
	options: [
		{ label: 'Any price range', value: [0, 100] },
		{ label: 'Under $25', value: [0, 25] },
		{ label: '$25 to $75', value: [25, 75] },
		{ label: '$75 to $100', value: [75, 100] },
	],
} as const;

const DEFAULT_FILTER_PRICE_RANGE = [0, 100] as [number, number];

const HomePage = () => {
	const [isSortDialogOpen, setIsSortDialogOpen] = useState(false);

	const [filter, setFilter] = useState<ProductState>({
		sort: 'none',
		color: ['white', 'beige', 'blue', 'green', 'purple'],
		size: ['S', 'M', 'L'],
		price: {
			isCustom: false,
			range: DEFAULT_FILTER_PRICE_RANGE,
		},
	});

	const { isFetching, data: products } = useQuery({
		queryFn: async () => {
			const { data } = await axios.get<QueryResult<Product>[]>(
				'/api/products',
				{ params: filter },
			);

			return data;
		},
		queryKey: ['products', filter],
	});

	const handleArrayFilter = ({
		key,
		value,
	}: {
		key: keyof Omit<typeof filter, 'sort' | 'price'>;
		value: string;
	}) => {
		const isFilterApplied = filter[key].includes(value as never);

		if (isFilterApplied) {
			setFilter((prev) => ({
				...prev,
				[key]: prev[key].filter((v) => v !== value),
			}));
		} else {
			setFilter((prev) => ({
				...prev,
				[key]: [...prev[key], value],
			}));
		}
	};

	const minPrice = Math.min(filter.price.range[0], filter.price.range[1]);
	const maxPrice = Math.max(filter.price.range[0], filter.price.range[1]);

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

			<section className='pb-24 pt-6'>
				<div className='grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4'>
					<div className='hidden lg:block'>
						<ul className='space-y-4 border-b border-gray-200 pb-6 text-sm font-medium text-gray-900'>
							{SUBCATEGORIES.map((category) => (
								<li key={category.name}>
									<button
										className='block disabled:cursor-not-allowed disabled:opacity-60'
										disabled={!category.selected}
									>
										{category.name}
									</button>
								</li>
							))}
						</ul>

						<Accordion className='animate-none' type='multiple'>
							<AccordionItem value='color'>
								<AccordionTrigger className='py-3 text-sm text-gray-400 hover:text-gray-500'>
									<span className='font-medium text-gray-900'>Color</span>
								</AccordionTrigger>
								<AccordionContent className='animate-none pt-2'>
									<ul className='space-y-4'>
										{COLOR_FILTERS.options.map(({ label, value }, idx) => (
											<li key={value} className='flex items-center'>
												<input
													onChange={() =>
														handleArrayFilter({ key: 'color', value })
													}
													id={`${value}-${idx}`}
													className='h-4 w-4 cursor-pointer rounded border-gray-300 text-indigo-600 focus:ring-indigo-500'
													type='checkbox'
													name={COLOR_FILTERS.name}
													checked={filter.color.includes(value)}
												/>

												<label
													className='cursor-pointer select-none pl-2 text-sm text-gray-600'
													htmlFor={`${value}-${idx}`}
												>
													{label}
												</label>
											</li>
										))}
									</ul>
								</AccordionContent>
							</AccordionItem>

							<AccordionItem value='size'>
								<AccordionTrigger className='py-3 text-sm text-gray-400 hover:text-gray-500'>
									<span className='font-medium text-gray-900'>Size</span>
								</AccordionTrigger>
								<AccordionContent className='animate-none pt-2'>
									<ul className='space-y-4'>
										{SIZE_FILTERS.options.map(({ label, value }, idx) => (
											<li key={value} className='flex items-center'>
												<input
													onChange={() =>
														handleArrayFilter({ key: 'size', value })
													}
													id={`${value}-${idx}`}
													className='h-4 w-4 cursor-pointer rounded border-gray-300 text-indigo-600 focus:ring-indigo-500'
													type='checkbox'
													name={COLOR_FILTERS.name}
													checked={filter.size.includes(value)}
												/>

												<label
													className='cursor-pointer select-none pl-2 text-sm text-gray-600'
													htmlFor={`${value}-${idx}`}
												>
													{label}
												</label>
											</li>
										))}
									</ul>
								</AccordionContent>
							</AccordionItem>

							<AccordionItem value='price'>
								<AccordionTrigger className='py-3 text-sm text-gray-400 hover:text-gray-500'>
									<span className='font-medium text-gray-900'>Price</span>
								</AccordionTrigger>
								<AccordionContent className='animate-none pt-2'>
									<ul className='space-y-4'>
										{PRICE_FILTERS.options.map(({ label, value }, idx) => (
											<li key={label} className='flex items-center'>
												<input
													onChange={() =>
														setFilter((prev) => ({
															...prev,
															price: {
																isCustom: false,
																range: value as [number, number],
															},
														}))
													}
													id={`${value}-${idx}`}
													className='h-4 w-4 cursor-pointer rounded border-gray-300 text-indigo-600 focus:ring-indigo-500'
													type='radio'
													name={PRICE_FILTERS.name}
													checked={
														!filter.price.isCustom &&
														filter.price.range[0] === value[0] &&
														filter.price.range[1] === value[1]
													}
												/>

												<label
													className='cursor-pointer select-none pl-2 text-sm text-gray-600'
													htmlFor={`${value}-${idx}`}
												>
													{label}
												</label>
											</li>
										))}

										<li className='flex flex-col justify-center gap-2'>
											<div>
												<input
													onChange={() =>
														setFilter((prev) => ({
															...prev,
															price: {
																isCustom: true,
																range: DEFAULT_FILTER_PRICE_RANGE,
															},
														}))
													}
													id={`price-${PRICE_FILTERS.options.length}`}
													className='h-4 w-4 cursor-pointer rounded border-gray-300 text-indigo-600 focus:ring-indigo-500'
													type='radio'
													name={PRICE_FILTERS.name}
													checked={filter.price.isCustom}
												/>

												<label
													className='cursor-pointer select-none pl-2 text-sm text-gray-600'
													htmlFor={`price-${PRICE_FILTERS.options.length}`}
												>
													Custom
												</label>
											</div>

											<div className='flex justify-between'>
												<p className='font-medium'>Price</p>
												<div>
													$
													{filter.price.isCustom
														? minPrice.toFixed(0)
														: filter.price.range[0].toFixed(0)}{' '}
													- $
													{filter.price.isCustom
														? maxPrice.toFixed(0)
														: filter.price.range[1].toFixed(0)}
												</div>
											</div>

											<Slider
												onValueChange={(value) =>
													setFilter((prev) => ({
														...prev,
														price: {
															isCustom: true,
															range: [value[0], value[1]],
														},
													}))
												}
												className={cn({
													'opacity-50': !filter.price.isCustom,
												})}
												disabled={!filter.price.isCustom}
												min={DEFAULT_FILTER_PRICE_RANGE[0]}
												max={DEFAULT_FILTER_PRICE_RANGE[1]}
												step={5}
												value={filter.price.range}
											/>
										</li>
									</ul>
								</AccordionContent>
							</AccordionItem>
						</Accordion>
					</div>

					<ul className='grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:col-span-3'>
						{isFetching ? (
							[...new Array(3)].map((_, idx) => (
								<ProductCardSkeleton key={idx} />
							))
						) : products?.length === 0 ? (
							<p className='mt-24 grid place-items-center text-sm text-gray-400 sm:col-span-2 lg:col-span-3'>
								No product found.
							</p>
						) : (
							products?.map((product) => (
								<ProductCard key={product.id} product={product.metadata!} />
							))
						)}
					</ul>
				</div>
			</section>
		</main>
	);
};

export default HomePage;
