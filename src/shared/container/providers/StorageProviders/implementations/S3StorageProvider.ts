import fs from 'fs';
import path from 'path';
import mime from 'mime'
import aws, { S3 } from 'aws-sdk'
import uploadConfig from '@config/upload';
import IStorageProvider from '../models/IStorageProvider';

/**
 * @DiskStorageProvider
 * need to create the functionality of the interaface IStorageProvider
 * @methods will be saveFile and deleteFile
 */

export default class S3StorageProvider implements IStorageProvider {
  private client: S3
  constructor() {
    this.client = new aws.S3({
      region: 'us-east-2'
    })
  }

  public async saveFile(file: string): Promise<string> {
    const originalPath = path.resolve(uploadConfig.tempFolder, file)


    const fileContent = await fs.promises.readFile(originalPath)
    const ContentType = mime.getType(originalPath)
    if (!ContentType) {
      throw new Error('content type not found')
    }



    await this.client.putObject({
      Bucket: 'appgorber',
      Key: file,
      ACL: 'public-read',
      Body: fileContent,
      ContentType,
      ContentDisposition: `inline; fileName=${file}`
    }).promise()

    await fs.promises.unlink(originalPath)
    return file;
  }

  public async deleteFile(file: string): Promise<void> {
    await this.client.deleteObject({
      Bucket: 'appgorber',
      Key: file
    }).promise()
  }
}
