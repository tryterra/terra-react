type Some<T> = T;
type None = null;
export type Option<T> = Some<T> | None;

export function convertToProperIsoFormat(date: Date): string {
  return date.toISOString();
}
