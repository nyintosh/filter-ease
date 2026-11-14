import { PRODUCT_COLORS, PRODUCT_SIZES } from '@/lib';

export type Product = {
	id: string;
	imageUrl: string;
	name: string;
	color: (typeof PRODUCT_COLORS)[number];
	size: (typeof PRODUCT_SIZES)[number];
	price: number;
};

export const INDEX = 'filter-ease';
// Vectorize indexes need at least 32 dimensions; only the first three are used.
const DIMENSIONS = 32;

export const toVector = (color: number, size: number, price: number) => [
	color,
	size,
	price,
	...Array<number>(DIMENSIONS - 3).fill(0),
];

const PRICES = [9.99, 19.99, 29.99, 39.99, 49.99];

// Three shirts in every color and size, with fixed prices.
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

type QueryResponse = {
	success: boolean;
	result?: { matches: { metadata?: Product }[] };
	errors?: { message: string }[];
};

// Queries the Cloudflare Vectorize index over its REST API.
export const queryProducts = async (query: {
	vector: number[];
	topK: number;
	filter: Record<string, unknown>;
}) => {
	const res = await fetch(
		`https://api.cloudflare.com/client/v4/accounts/${process.env.CLOUDFLARE_ACCOUNT_ID}/vectorize/v2/indexes/${INDEX}/query`,
		{
			method: 'POST',
			headers: {
				'Authorization': `Bearer ${process.env.CLOUDFLARE_API_TOKEN}`,
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ ...query, returnMetadata: 'all' }),
		},
	);
	const json = (await res.json()) as QueryResponse;

	if (!json.success || !json.result) {
		throw new Error(json.errors?.[0]?.message ?? 'Vectorize query failed');
	}

	return json.result.matches.map((match) => match.metadata!);
};
