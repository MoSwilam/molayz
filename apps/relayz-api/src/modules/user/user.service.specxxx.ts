// import { Test, TestingModule } from '@nestjs/testing';
// import { MongooseModule } from '@nestjs/mongoose';
// import { UserSchema } from './user.schema';
// import { getModelToken } from '@nestjs/mongoose';
// import { closeInMongodConnection, rootMongooseTestModule } from '../../shared/test-utils/mongo/MongooseTestModule';

// import { UserService } from './user.service';
// import { UserModule } from './user.module';

// describe('UserService', () => {
//   let service: UserService;

//   class UserModel {
//     constructor(private data) {}
//     save = jest.fn()// .mockResolvedValue(this.data);
//     static find = jest.fn()// .mockResolvedValue([telemetryData]);
//     static findOne = jest.fn()// .mockResolvedValue(telemetryData);
//     static findOneAndUpdate = jest.fn()// .mockResolvedValue(telemetryData);
//     static deleteOne = jest.fn()// .mockResolvedValue(true);
//   }

//   beforeEach(async () => {
//     const module: TestingModule = await Test.createTestingModule({
//       imports: [
//         rootMongooseTestModule(),
//         MongooseModule.forFeature([{ name: 'users', schema: UserSchema }]),
//       ],
//       providers: [
//         UserService,
//         {
//           provide: getModelToken('User'),
//           useClass: UserModel
//         }
//       ],
//     }).compile();

//     service = module.get<UserService>(UserService);
//   });

//   it('should be defined', () => {
//     expect(service).toBeDefined();
//   });

//   afterAll(async () => {
//     await closeInMongodConnection();
//   });
// });
