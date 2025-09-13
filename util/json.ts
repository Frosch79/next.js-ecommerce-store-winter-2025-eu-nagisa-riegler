import sjson from 'secure-json-parse';
import type { ProductCount } from '../app/products/[productId]/action';

export function perseJson(json: string) {
  if (!json) return undefined;
  try {
    return sjson(json) as ProductCount[];
  } catch {
    return undefined;
  }
}
