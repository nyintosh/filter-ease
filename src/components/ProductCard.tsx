import { Product } from '@/db';

export const ProductCard = ({ product }: { product: Product }) => {
	return (
		<div className='group'>
			<div className='aspect-h-1 aspect-w-1 w-full rounded-md bg-gray-200 lg:aspect-none group-hover:bg-gray-200/80 lg:h-80'>
				{/* eslint-disable-next-line @next/next/no-img-element */}
				<img
					className='size-full object-contain object-center duration-300 group-hover:translate-y-[calc(5%/2)] group-hover:scale-105'
					src={product.imageUrl}
					alt={`Image of ${product.name}`}
				/>
			</div>

			<div className='mt-4 flex justify-between'>
				<div>
					<h3 className='text-sm text-gray-700'>{product.name}</h3>
					<p className='mt-1 text-sm text-gray-500'>
						Size {product.size.toUpperCase()}
					</p>
				</div>

				<p className='text-sm font-medium text-gray-900'>${product.price}</p>
			</div>
		</div>
	);
};
