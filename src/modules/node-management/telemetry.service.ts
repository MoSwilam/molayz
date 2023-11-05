// import { Injectable, NotFoundException } from '@nestjs/common';
// import { InjectModel } from '@nestjs/mongoose';
// import { FilterQuery, Model, QueryOptions } from 'mongoose';
// import { NodesDocument, NodeEntity } from './nodes.schema';
// import { TelemetryDataDto } from './telemetry.types';

// @Injectable()
// export class TelemetryService {
//   constructor(
//     @InjectModel(NodeEntity.name)
//     private telemetryModel: Model<NodesDocument>
//   ) {}

//   async getByIdOrThrowError(id) {
//     // Utils.rLog(id);
//     const telemetryData = await this.telemetryModel.findById(id);
//     if (!telemetryData) throw new NotFoundException();
//     return telemetryData;
//   }

//   async create(payload: TelemetryDataDto): Promise<NodesDocument> {
//     // Utils.rLog(payload);
//     const doc = new this.telemetryModel(payload);
//     return await doc.save();
//   }

//   async findAll() {
//     const telemetryData = await this.telemetryModel.find();
//     if (!telemetryData) throw new NotFoundException();
//     return telemetryData;
//   }

//   async findPaginate(
//     query: FilterQuery<NodesDocument>,
//     fields: QueryOptions<NodesDocument>
//   ): Promise<NodesDocument[]> {
//     const telemetryData = await this.telemetryModel.find(query, fields, { skip: 10, limit: 5 });
//     return telemetryData;
//   }

//   async findOne(id: string) {
//     return await this.getByIdOrThrowError(id);
//   }

//   update(id: number, updateTelemetryDto: any) {
//     return `This action updates a #${id} telemetry`;
//   }

//   remove(id: number) {
//     return `This action removes a #${id} telemetry`;
//   }
// }
