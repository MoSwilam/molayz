import { getModelToken } from '@nestjs/mongoose';
import { Test } from '@nestjs/testing';
import { Model } from 'mongoose';
import { NodeEntity } from '../nodes.schema';
import { createMock } from '@golevelup/ts-jest';
import { CliLibService } from '../../cli-lib/cli-lib.service';
import { NodeService } from '../nodes.service';

const telemetryData = {
  _id: '63e660b1fe9b4ba8893d8716',
  ip: '123456',
  ipV4RemoteLogin: '10.14.18.67',
  cpu: {
    brand: 'Core™ i7-9750H',
    cores: 12,
    speed: '2.6 GHz'
  },
  memory: {
    totalmem: '16.0 GB',
    freemem: '556.5 MB'
  },
  nodeOs: {
    osVersion:
      'Darwin Kernel Version 22.1.0: Sun Oct  9 20:14:54 PDT 2022; root:xnu-8792.41.9~2/RELEASE_X86_64',
    uptime: '22:49:20',
    arch: 'x64'
  },
  createdAt: '2023-02-10T15:20:17.918+00:00',
  updatedAt: '2023-02-10T15:20:17.918+00:00'
};

describe('NodeManagement Service', () => {
  // let telemetryController: TelemetryController;
  let nodesService: NodeService;
  let cliLibService: CliLibService;

  let model: Model<NodeEntity>;

  class TelemetryEntity {
    save = jest.fn().mockResolvedValue(telemetryData);
    static find = jest.fn().mockResolvedValue([telemetryData]);
    static findOne = jest.fn().mockResolvedValue(telemetryData);
    static findOneAndUpdate = jest.fn().mockResolvedValue(telemetryData);
    static deleteOne = jest.fn().mockResolvedValue(true);
  }

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        NodeService,
        {
          provide: getModelToken(NodeEntity.name),
          useValue: TelemetryEntity
        },
        {
          provide: CliLibService,
          useValue: createMock<CliLibService>()
        }
      ]
    }).compile();

    nodesService = moduleRef.get<NodeService>(NodeService);
    model = moduleRef.get<Model<NodeEntity>>(getModelToken(NodeEntity.name));
  });

  it('should be defined', async () => {
    expect(nodesService).toBeDefined();
  });
});
