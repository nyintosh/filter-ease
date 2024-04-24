import { Index } from '@upstash/vector';

type Product = {
	id: string;
	imageUrl: string;
	name: string;
	color: 'white' | 'baige' | 'blue' | 'green' | 'purple';
	size: 'S' | 'M' | 'L';
	price: number;
};

export const db = new Index<Product>();
