import { Transform } from 'class-transformer';

export function TransformToIntArray() {
  return Transform(({ value }) => {
    if (typeof value === 'string') {
      return value.split(',').map((v) => Number(v.trim()));
    }

    if (Array.isArray(value)) {
      return value.map((v) => Number(v));
    }

    return [];
  });
}
