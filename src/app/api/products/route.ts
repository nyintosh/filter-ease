import { NextRequest, NextResponse } from 'next/server';

import { db } from '@/db';
import { productFilterSchema } from '@/lib';

class Filter {
	private filters: Map<string, string[]> = new Map();

	hasFilter() {
		return this.filters.size > 0;
	}

	add(key: string, operator: string, value: string | number) {
		const filters = this.filters.get(key) || [];

		filters.push(
			`${key} ${operator} ${typeof value === 'number' ? value : `"${value}"`}`,
		);

		this.filters.set(key, filters);
	}

	addRaw(key: string, rawFilter: string) {
		this.filters.set(key, [rawFilter]);
	}

	get() {
		const parts: string[] = [];

		this.filters.forEach((filter) => {
			const groupedValues = filter.join(' OR ');
			parts.push(`(${groupedValues})`);
		});

		return parts.join(' AND ');
	}
}

const AVG = 25; // average product price
const MIN = 0; // minimum product price
const MAX = 50; // maximum product price

export const POST = async (req: NextRequest, res: NextResponse) => {
	try {
		const body = await req.json();
		const { sort, color, size, price } = productFilterSchema.parse(body.filter);

		const filter = new Filter();

		color.forEach((color) => filter.add('color', '=', color));
		size.forEach((size) => filter.add('size', '=', size));
		filter.addRaw('price', `price >= ${price[0]} AND price <= ${price[1]}`);

		const products = await db.query({
			topK: 12,
			vector: [
				0,
				0,
				sort === 'price-desc' ? MAX : sort === 'price-asc' ? MIN : AVG,
			],
			includeMetadata: true,
			filter: filter.hasFilter() ? filter.get() : undefined,
		});

		return new Response(JSON.stringify(products));
	} catch (error) {
		console.error(error);
		return new Response(JSON.stringify({ error: 'Unexpected error occurred' }));
	}
};
