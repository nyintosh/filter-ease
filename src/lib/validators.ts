import { z } from 'zod';

export const PRODUCT_COLORS = [
	'white',
	'beige',
	'blue',
	'green',
	'purple',
] as const;
export const PRODUCT_SIZES = ['S', 'M', 'L'] as const;
export const SORT_OPTIONS = ['none', 'price-asc', 'price-desc'] as const;

export const productFilterSchema = z.object({
	sort: z.enum(SORT_OPTIONS),
	color: z.array(z.enum(PRODUCT_COLORS)),
	size: z.array(z.enum(PRODUCT_SIZES)),
	price: z.tuple([z.number(), z.number()]),
});

export type ProductState = Omit<
	z.infer<typeof productFilterSchema>,
	'price'
> & {
	price: {
		isCustom: boolean;
		range: [number, number];
	};
};
