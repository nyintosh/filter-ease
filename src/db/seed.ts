// Seeds the Vectorize index through the Cloudflare CLI. Run `cf auth login` first.
import { execFileSync } from 'node:child_process';
import { mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

import { PRODUCT_COLORS, PRODUCT_SIZES } from '@/lib';

import { INDEX, PRODUCTS, toVector } from '.';

const dir = mkdtempSync(join(tmpdir(), 'filter-ease-seed-'));
const file = join(dir, 'products.ndjson');

try {
	writeFileSync(
		file,
		PRODUCTS.map((product) =>
			JSON.stringify({
				id: product.id,
				values: toVector(
					PRODUCT_COLORS.indexOf(product.color),
					PRODUCT_SIZES.indexOf(product.size),
					product.price,
				),
				metadata: product,
			}),
		).join('\n'),
	);
	execFileSync('cf', ['vectorize', 'upsert', INDEX, '--file', file], {
		stdio: 'inherit',
	});
} finally {
	rmSync(dir, { recursive: true, force: true });
}
