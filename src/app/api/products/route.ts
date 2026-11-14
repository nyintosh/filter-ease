import { NextRequest } from 'next/server';

import { PRODUCTS } from '@/db';
import { productFilterSchema } from '@/lib';

const MAX_RESULTS = 12;

export const POST = async (req: NextRequest) => {
	const body = await req.json().catch(() => null);
	const parsed = productFilterSchema.safeParse(body?.filter);

	if (!parsed.success) {
		return Response.json({ error: 'Invalid filter' }, { status: 400 });
	}

	const {
		sort,
		color,
		size,
		price: [min, max],
	} = parsed.data;

	const products = PRODUCTS.filter(
		(product) =>
			color.includes(product.color) &&
			size.includes(product.size) &&
			product.price >= min &&
			product.price <= max,
	);

	if (sort !== 'none') {
		products.sort((a, b) =>
			sort === 'price-asc' ? a.price - b.price : b.price - a.price,
		);
	}

	return Response.json(products.slice(0, MAX_RESULTS));
};
