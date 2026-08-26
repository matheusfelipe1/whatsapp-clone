let counter = 0;

/** Simple unique id generator, good enough for local/mock data. */
export function generateId(prefix: string = 'id'): string {
  counter += 1;
  return `${prefix}-${Date.now()}-${counter}`;
}
