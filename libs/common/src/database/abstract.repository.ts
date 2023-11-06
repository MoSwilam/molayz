import { FilterQuery, Model, SchemaTypes, Types, UpdateQuery } from "mongoose";
import { AbstractDocument } from "./abstract.schema";
import { Logger, NotFoundException } from "@nestjs/common";

export abstract class AbstractRepository<TDocument extends AbstractDocument> {
  protected abstract readonly logger: Logger;

  constructor(protected readonly model: Model<TDocument>) {}

  async create(document: Omit<TDocument, '_id'> | any): Promise<TDocument> {
    // const createdDocument = new this.model({
    //   ...document,
    // });

    // return (await createdDocument.save()).toJSON() as TDocument;
    return await this.model.create(document);
  }

  async findOne(filterQuery: FilterQuery<TDocument>): Promise<TDocument> {
    const document = await this.model.findOne(filterQuery).lean<TDocument>(true);

    if(!document) {
      this.logger.warn('Document not found', filterQuery);
      throw new NotFoundException(`Document was not found!`);
    }

    return document;
  }

  async findById(id: string): Promise<TDocument> {
    const document = await this.findOne({ id });

    if(!document) {
      this.logger.warn(`Document by Id: ${id} ot found`);
      throw new NotFoundException(`Document was not found!`);
    }

    return document;
  }

  async findOneAndUpdate(
    filterQuery: FilterQuery<TDocument>,
    update: UpdateQuery<TDocument>
  ): Promise<TDocument> {
    const document = await this.model.findOneAndUpdate(filterQuery, update, { new: true })
    .lean<TDocument>(true);

    if(!document) {
      this.logger.warn('Document not found', filterQuery);
      throw new NotFoundException(`Document was not found!`);
    }

    return document;
  }

  async findByIdAndUpdate(
    id: string,
    update: UpdateQuery<TDocument>
  ) {
    const document = await this.model.findByIdAndUpdate(id, update, { new: true }).lean<TDocument>(true);

    if(!document) {
      this.logger.warn('Document not found', id);
      throw new NotFoundException(`Document was not found!`);
    }

    return document;
  }

  async find(filterQuery: FilterQuery<TDocument>, populate?: string[]): Promise<TDocument[]> {
    return this.model.find(filterQuery).populate(populate || '').lean<TDocument[]>(true);
  }

  async findOneAndDelete(filterQuery: FilterQuery<TDocument>): Promise<TDocument> {
    return this.model.findOneAndDelete(filterQuery).lean<TDocument>(true);
  }
}