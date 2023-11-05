import { Module } from '@nestjs/common';
import { NodeService } from './nodes.service';
import { NodesController } from './nodes.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { NodeEntity, NodesSchema } from './nodes.schema';
import { CliLibModule } from '../cli-lib/cli-lib.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: NodeEntity.name, schema: NodesSchema }]),
    CliLibModule
  ],
  controllers: [NodesController],
  providers: [NodeService],
  exports: [NodeService]
})
export class NodesModule {}
