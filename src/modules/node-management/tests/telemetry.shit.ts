// import { getModelToken } from '@nestjs/mongoose';
// import { Test } from '@nestjs/testing';
// import { Model } from 'mongoose';
// import { TelemetryController } from '../../telemetry/telemetry.controller';
// import { TelemetryService } from '../../telemetry/telemetry.service';
// import { TelemetryDocument } from '../telemetry.schema';
// import { TelemetryDataDto } from '../telemetry.types';

// const telemetryData = {
//   _id: '63e660b1fe9b4ba8893d8716',
//   ip: '123456',
//   ipV4RemoteLogin: "10.14.18.67",
//   cpu: {
//     brand: "Core™ i7-9750H",
//     cores: 12,
//     speed: "2.6 GHz"
//   },
//   memory: {
//     totalmem: "16.0 GB",
//     freemem: "556.5 MB"
//   },
//   nodeOs: {
//     osVersion: "Darwin Kernel Version 22.1.0: Sun Oct  9 20:14:54 PDT 2022; root:xnu-8792.41.9~2/RELEASE_X86_64",
//     uptime: "22:49:20",
//     arch: "x64"
//   },
//   createdAt: '2023-02-10T15:20:17.918+00:00',
//   updatedAt:'2023-02-10T15:20:17.918+00:00'
// }

// describe('Telemetry Service', () => {
//   // let telemetryController: TelemetryController;
//   let telemetryService: TelemetryService;
//   let model: Model<TelemetryDocument>

//   class TelemetryEntity {
//     constructor(private data) {}
//     save = jest.fn().mockResolvedValue(this.data);
//     static find = jest.fn().mockResolvedValue([telemetryData]);
//     static findOne = jest.fn().mockResolvedValue(telemetryData);
//     static findOneAndUpdate = jest.fn().mockResolvedValue(telemetryData);
//     static deleteOne = jest.fn().mockResolvedValue(true);
//   }

//   beforeEach(async () => {
//     const moduleRef = await Test.createTestingModule({
//         providers: [
//           TelemetryService,
//           {
//             provide: getModelToken('telemetry-data'),
//             useValue: TelemetryEntity,
//           }
//         ],
//       }).compile();

//     telemetryService = moduleRef.get<TelemetryService>(TelemetryService);
//     model = moduleRef.get<Model<TelemetryDocument>>(getModelToken('telemetry-data'))
//     // TelemetryController = moduleRef.get<TelemetryController>(TelemetryController);
//   });

//   // const result = ['test'];
//   // jest.spyOn(telemetryService, 'findAll').mockImplementation(() => result);

//   // expect(await TelemetryController.findAll()).toBe(result);

//   it('should be defined', async () => {
//     expect(telemetryService).toBeDefined();
//   });
// });
// });
