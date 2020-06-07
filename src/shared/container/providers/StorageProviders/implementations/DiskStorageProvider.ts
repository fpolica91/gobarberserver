import fs from 'fs';
import path from 'path';
import uploadConfig from '@config/upload';
import IStorageProvider from '../models/IStorageProvider';

/**
 * @DiskStorageProvider
 * need to create the functionality of the interaface IStorageProvider
 * @methods will be saveFile and deleteFile
 */

export default class DiskStorageProvider implements IStorageProvider {
  /**
   *
   * @param file moved from tempfolder to uploads
   */
  public async saveFile(file: string): Promise<string> {
    await fs.promises.rename(
      path.resolve(uploadConfig.tempFolder, file),
      path.resolve(uploadConfig.uploadsFolder, file)
    );
    return file;
  }

  public async deleteFile(file: string): Promise<void> {
    const filePath = path.resolve(uploadConfig.uploadsFolder, file);
    try {
      /**
       * @param stat throws error if not found.
       * @error will be caught on catch
       */
      await fs.promises.stat(filePath);
    } catch {
      return;
    }
    await fs.promises.unlink(filePath);
  }
}
