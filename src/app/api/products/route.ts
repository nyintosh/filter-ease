import { NextRequest } from 'next/server';

import { queryProducts, toVector } from '@/db';
import { productFilterSchema } from '@/lib';

const AVG = 25; // average product price
const MIN = 0; // minimum product price
const MAX = 50; // maximum product price
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

	if (!color.length || !size.length) {
		return Response.json([]);
	}

	try {
		// Results come back nearest first, so querying near the lowest or highest price sorts them.
		const products = await queryProducts({
			vector: toVector(
				0,
				0,
				sort === 'price-desc' ? MAX : sort === 'price-asc' ? MIN : AVG,
			),
			topK: MAX_RESULTS,
			filter: {
				color: { $in: color },
				size: { $in: size },
				price: { $gte: min, $lte: max },
			},
		});

		return Response.json(products);
	} catch (error) {
		console.error(error);
		return Response.json(
			{ error: 'Unexpected error occurred' },
			{ status: 500 },
		);
	}
};
