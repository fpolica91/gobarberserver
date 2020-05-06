import path from 'path';
import crypto from 'crypto';
import multer from 'multer';

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

export default {
  directory: path.resolve(__dirname, '..', '..', 'tmp'),
  storage: multer.diskStorage({
    destination: tempFolder,
    filename(request, file, callback) {
      const fileHash = crypto.randomBytes(10).toString('HEX');
      const fileName = `${fileHash}-${file.originalname}`;
      return callback(null, fileName);
    }
  })
};
