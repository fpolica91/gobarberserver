import path from 'path';
import crypto from 'crypto';
import multer, { StorageEngine } from 'multer';

/**
 * @destination __dirname provides access to our files
 * @__dirname , '..' -> to exit config folder
 * @tmp is created outside of src folder
 * '..' to exit src folder, and @tmp is the folder where we have the files
 * @diskStorage takes 2 parameteres destination and @filename
 * file name is a function that takes request, file and a callback
 * we use @crypto to hash image so no 2 images have the same name
 * and we return callback which takes 2 parameters error, filename
 */

const tempFolder = path.resolve(__dirname, '..', '..', 'tmp');

interface IUploadConfig {
  driver: 's3' | 'disk',
  tempFolder: string;
  uploadsFolder: string;
  multer: {
    storage: StorageEngine
  }
  config: {
    disk: {}
  }
}


export default {
  driver: process.env.STORAGE_DRIVER,
  tempFolder,
  uploadsFolder: path.resolve(tempFolder, 'uploads'),
  directory: path.resolve(__dirname, '..', '..', 'tmp'),
  multer: {
    storage: multer.diskStorage({
      destination: tempFolder,
      filename(request, file, callback) {
        const fileHash = crypto.randomBytes(10).toString('hex');
        const fileName = `${fileHash}-${file.originalname}`;
        return callback(null, fileName);
      }
    })
  },
  config: {
    disk: {}
  }

} as IUploadConfig
