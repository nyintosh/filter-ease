import { Index } from '@upstash/vector';

export type Product = {
	id: string;
	imageUrl: string;
	name: string;
	color: 'white' | 'beige' | 'blue' | 'green' | 'purple';
	size: 'S' | 'M' | 'L';
	price: number;
};

export const db = new Index<Product>();
