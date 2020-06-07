/**
 * @IStorageProvider
 * @methods : saveFile and delete
 * methods used by updateAvatarService
 */
export default interface IStorageProvider {
  saveFile(file: string): Promise<string>;
  deleteFile(file: string): Promise<void>;
}
