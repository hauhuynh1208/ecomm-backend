import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Items } from 'src/database/entities/items.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ItemsService {
  constructor(
    @InjectRepository(Items) private itemsRepository: Repository<Items>,
  ) {}

  async getItems(): Promise<Record<string, any>> {
    return await this.itemsRepository
      .find()
      .then((resp) => {
        return { code: 200, content: resp };
      })
      .catch((err) => {
        console.log(err);
        return { code: 400, content: { msg: 'Invalid request' } };
      });
  }

  async addItem(item): Promise<Record<string, any>> {
    let isOk = true;
    const result = await this.itemsRepository.save(item).catch((error) => {
      isOk = false;
      console.log(error);
    });
    if (isOk) {
      return { code: 201, content: result };
    } else {
      return { code: 400, content: { msg: 'Invalid request' } };
    }
  }
}
