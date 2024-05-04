import { XIcon } from 'lucide-react';

const EmptyState = () => {
	return (
		<div className='relative col-span-full flex h-80 w-full flex-col items-center justify-center bg-gray-50 p-12 text-center'>
			<XIcon className='size-8 text-red-500' />
			<h3 className='text-xl font-semibold'>No products found</h3>
			<p className='text-sm text-zinc-500'>
				We don&apos;t found any matching result for these filter.
			</p>
		</div>
	);
};

export default EmptyState;
