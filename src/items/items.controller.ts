import { Controller, Post, Body, Res, Req, Get } from '@nestjs/common';
import { ItemsService } from './items.service';
import { ItemDTO } from './dto/items.dto';
import { validate } from 'class-validator';

@Controller('items')
export class ItemsController {
  constructor(private itemService: ItemsService) {}

  @Get()
  async getItems(@Res() res) {
    const result = await this.itemService.getItems();
    res.status(result.code).json(result.content);
  }

  @Post()
  async createItem(@Body() body, @Res() res) {
    let isOk = false;
    const item = new ItemDTO();
    item.description = body.description;
    item.name = body.name;
    item.quantity = body.quantity;
    await validate(item).then((errors) => {
      if (errors.length > 0) {
        console.log(errors);
      } else {
        isOk = true;
      }
    });
    if (isOk) {
      const result = await this.itemService.addItem(item);
      res.status(result.code).json(result.content);
    } else {
      res.status(400).json({ msg: 'Invalid request' });
    }
  }
}
