import fs from 'fs';
import { S3 } from 'aws-sdk';
import { inject, injectable } from 'inversify';
import { v4 as uuidv4 } from 'uuid';

/**
 * Service class for Image
 */
@injectable()
export class ImageService {
  @inject(S3)
  private readonly s3!: S3;

  public async addImage(file: string) {
    const base64 = file.split('\r\n')[3];
    const buf = Buffer.from(base64, 'base64');
    const id = uuidv4();
    fs.writeFileSync(`/tmp/${id}`, buf);
    await this.s3
      .putObject({
        ACL: 'public-read',
        Bucket: `${process.env.PROJECT}-${process.env.ENVR}-image`,
        Key: id,
        Body: fs.readFileSync(`/tmp/${id}`),
      })
      .promise();

    return {
      url: `https://${process.env.PROJECT}-${process.env.ENVR}-image.s3.ap-southeast-1.amazonaws.com/${id}`,
    };
  }
}
