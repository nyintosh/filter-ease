export const ProductCardSkeleton = () => {
	return (
		<div className='animate-pulse'>
			<div className='aspect-h-1 aspect-w-1 w-full rounded-md bg-gray-200 lg:aspect-none lg:h-80' />

			<div className='mt-4 flex justify-between'>
				<div className='w-1/2 space-y-1'>
					<div className='h-5 w-full rounded-md bg-gray-200' />
					<div className='h-5 w-full rounded-md bg-gray-200' />
				</div>

				<div className='h-5 w-1/4 rounded-md bg-gray-200' />
			</div>
		</div>
	);
};
