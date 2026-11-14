import { PRODUCT_COLORS, PRODUCT_SIZES } from '@/lib';

export type Product = {
	id: string;
	imageUrl: string;
	name: string;
	color: (typeof PRODUCT_COLORS)[number];
	size: (typeof PRODUCT_SIZES)[number];
	price: number;
};

const PRICES = [9.99, 19.99, 29.99, 39.99, 49.99];

// Three shirts in every color and size, with fixed prices.
// Ordered by size first so the unfiltered list shows a mix of shirts.
export const PRODUCTS: Product[] = PRODUCT_SIZES.flatMap((size, s) =>
	[1, 2, 3].flatMap((n) =>
		PRODUCT_COLORS.map((color, c) => ({
			id: `${color}-${size}-${n}`,
			imageUrl: `/images/${color}_${n}.png`,
			name: `${color[0].toUpperCase() + color.slice(1)} shirt ${n}`,
			color,
			size,
			price: PRICES[(n + c * 2 + s) % PRICES.length],
		})),
	),
);
