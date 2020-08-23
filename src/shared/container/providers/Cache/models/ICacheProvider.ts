
export default interface ICacheProvider {
  save(key: string, value: string): Promise<void>;
  recover(key: string): Promise<any>;
  invalidate(key: string): Promise<void>;
}
