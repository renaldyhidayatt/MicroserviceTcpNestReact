import { CreateCategoryDto, UpdateCategoryDto } from '@myexperiment/domain';
import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CloudinaryService } from 'libs/infrastructure/src/lib/cloudinary/service';

@Injectable()
export class CategoryService {
  constructor(
    @Inject('CATEGORY_SERVICE') private categoryClient: ClientProxy,
    private cloudinaryService: CloudinaryService
  ) {}

  async findAll() {
    return this.categoryClient.send({ cmd: 'get_categories' }, {});
  }

  async findById(id: number) {
    return this.categoryClient.send({ cmd: 'get_category' }, id);
  }

  async findBySlug(slug: string) {
    return this.categoryClient.send({ cmd: 'get_slug_category' }, slug);
  }

  async createCategory(dto: CreateCategoryDto, file: Express.Multer.File) {
    const uploadResult = await this.cloudinaryService.uploadFile(file);

    dto.file = uploadResult.secure_url;

    return this.categoryClient.send({ cmd: 'create_category' }, dto);
  }

  async updateCategory(
    id: number,
    dto: UpdateCategoryDto,
    file: Express.Multer.File
  ) {
    if (isNaN(id) || !Number.isInteger(Number(id))) {
      throw new BadRequestException('Invalid ID. ID must be an integer.');
    }

    const uploadResult = await this.cloudinaryService.uploadFile(file);

    dto.file = uploadResult.secure_url;

    return this.categoryClient.send(
      { cmd: 'update_category' },
      { id, updateCategoryDto: dto }
    );
  }

  async deleteCategory(id: number) {
    return this.categoryClient.send({ cmd: 'delete_category' }, id);
  }
}
