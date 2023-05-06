export interface Loader<T> {
  load(url: string): Promise<T>;
}
