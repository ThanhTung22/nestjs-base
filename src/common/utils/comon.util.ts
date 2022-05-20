import { v4 as uuid4 } from 'uuid';

export function uuid(): string {
  return uuid4();
}

export function getString(value: string): string {
  return value.replace(/\\n/g, '\n');
}

export function getNumber(value: string): number {
  try {
    return Number(value);
  } catch {
    throw new Error(value + ' is not a number');
  }
}

export function getBoolean(value: string): boolean {
  try {
    return Boolean(JSON.parse(value));
  } catch {
    throw new Error(value + ' is not a boolean');
  }
}
