import { BadRequestError, NotFoundError } from '@y-celestial/service';
import { inject, injectable } from 'inversify';
import { TagAccess } from 'src/access/TagAccess';
import {
  GetTagResponse,
  PostTagRequest,
  PostTagResponse,
  PutTagRequest,
  PutTagResponse,
} from 'src/model/api/Tag';
import { Tag } from 'src/model/entity/Tag';
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
    try {
      const tag = new TagEntity();
      tag.name = data.name;
      tag.userId = this.cognitoUserId;

      return await this.tagAccess.save(tag);
    } catch (e) {
      const err = e as Error;
      if (
        err.message ===
        'duplicate key value violates unique constraint "tag_name_user_id_key"'
      )
        throw new BadRequestError('conflict');
      throw e;
    }
  }

  public async getTagOfUser(): Promise<GetTagResponse> {
    return await this.tagAccess.findMany({
      where: { userId: this.cognitoUserId },
    });
  }

  public async reviseTag(
    id: string,
    data: PutTagRequest
  ): Promise<PutTagResponse> {
    try {
      const oldTag = await this.tagAccess.findById(id);

      if (oldTag === null) throw new NotFoundError();

      const newTag: Tag = {
        ...oldTag,
        name: data.name,
      };

      return await this.tagAccess.save(newTag);
    } catch (e) {
      const err = e as Error;
      if (
        err.message ===
        'duplicate key value violates unique constraint "tag_name_user_id_key"'
      )
        throw new BadRequestError('conflict');
      if (err.name === 'QueryFailedError') throw new NotFoundError();
      throw e;
    }
  }
}
