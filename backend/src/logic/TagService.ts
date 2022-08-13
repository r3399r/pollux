import { BadRequestError } from '@y-celestial/service';
import { inject, injectable } from 'inversify';
import { TagAccess } from 'src/access/TagAccess';
import {
  GetTagResponse,
  PostTagRequest,
  PostTagResponse,
  PutTagRequest,
} from 'src/model/api/Tag';
import { TagEntity } from 'src/model/entity/TagEntity';
import { cognitoSymbol } from 'src/util/LambdaSetup';

/**
 * Service class for Tag
 */
@injectable()
export class TagService {
  @inject(cognitoSymbol)
  private readonly cognitoUserId!: string;

  @inject(TagAccess)
  private readonly tagAccess!: TagAccess;

  public async cleanup() {
    await this.tagAccess.cleanup();
  }

  public async createTag(data: PostTagRequest): Promise<PostTagResponse> {
    const tag = new TagEntity();
    tag.name = data.name;
    tag.userId = this.cognitoUserId;

    return await this.tagAccess.save(tag);
  }

  public async getTagOfUser(): Promise<GetTagResponse> {
    return await this.tagAccess.findMany({
      where: { userId: this.cognitoUserId },
    });
  }

  public async updateTag(id: string, data: PutTagRequest) {
    const tag = new TagEntity();
    tag.id = id;
    tag.name = data.name;
    tag.userId = this.cognitoUserId;

    const res = await this.tagAccess.update(tag);

    if (res.affected === 0) throw new BadRequestError('nothing happened.');
  }

  public async deleteTag(id: string) {
    const res = await this.tagAccess.hardDeleteById(id);

    if (res.affected === 0) throw new BadRequestError('nothing happened.');
  }
}
