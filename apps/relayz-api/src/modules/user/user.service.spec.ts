import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';

import { UserService } from './user.service';
import { NodeService } from '../node-management/nodes.service';
import { WalletService } from '../wallet/wallet.service';
import { UserDocument, UserEntity } from './user.schema';
import { Model } from 'mongoose';
import { NotFoundException } from '@nestjs/common';

class NodeServiceMock {
  getNodes: jest.Mock<any, any> = jest.fn();
}

class WalletServiceMock {
  getWallets: jest.Mock<any, any> = jest.fn();
}

describe('UserService', () => {
  let service: UserService;
  let userModel: Model<UserDocument>;
  // let nodesService: NodeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: NodeService,
          useClass: NodeServiceMock
        },
        {
          provide: WalletService,
          useClass: WalletServiceMock
        },
        {
          provide: getModelToken(UserEntity.name),
          useValue: {
            new: jest.fn(),
            constructor: jest.fn(),
            find: jest.fn(),
            findById: jest.fn(),
            create: jest.fn(),
            findByIdAndUpdate: jest.fn(),
            exec: jest.fn(),
            save: jest.fn(),
            findOne: jest.fn(),
            findOneAndUpdate: jest.fn(),
            deleteOne: jest.fn()
          }
        }
      ]
    }).compile();

    service = module.get<UserService>(UserService);
    userModel = module.get<Model<UserDocument>>(getModelToken(UserEntity.name));
    // nodesService = module.get<NodeService>(NodeService);
  });

  describe('Create new user or return it back if it exist', () => {
    it('should return an existing user', async () => {
      const existingUser = {
        _id: '123456789',
        accountId: 'accountId'
      };

      const updatePayload = {
        referredBy: 'newReferredBy',
        publicKey: 'newPublicKey',
        loginType: 'newLoginType'
      };

      const loginDto = {
        accountId: existingUser.accountId,
        publicKey: updatePayload.publicKey,
        loginType: updatePayload.loginType,
        referredBy: updatePayload.referredBy
      };

      const expectedUserAfterUpdate = {
        ...existingUser,
        ...updatePayload,
        createdAt: new Date(),
        updatedAt: new Date()
      };

      // Arrange
      jest.spyOn(userModel, 'findOne').mockResolvedValueOnce(existingUser);
      jest.spyOn(userModel, 'findByIdAndUpdate').mockResolvedValueOnce(expectedUserAfterUpdate);

      // Act
      const result = await service.getOrCreateUser(loginDto);

      // Assert
      expect(result).toEqual(expectedUserAfterUpdate);
      expect(userModel.findOne).toHaveBeenCalledWith({ accountId: loginDto.accountId });
      expect(userModel.findByIdAndUpdate).toHaveBeenCalled();
      expect(userModel.create).not.toHaveBeenCalled();
    });

    it('should create and return a new user', async () => {
      // Arrange
      const mockCreateUserDto = {
        accountId: 'accountId',
        publicKey: 'publicKey',
        nickName: 'nickName',
        loginType: 'loginType',
        referredBy: 'referredBy'
      };

      const newUser = { ...mockCreateUserDto, _id: 'newId' };

      jest.spyOn(userModel, 'findOne').mockResolvedValueOnce(null);
      jest.spyOn(userModel, 'create').mockResolvedValueOnce(newUser as never);

      // Act
      const result = await service.getOrCreateUser(mockCreateUserDto);

      // Assert
      expect(result).toEqual(newUser);
      expect(userModel.findOne).toHaveBeenCalledWith({ accountId: mockCreateUserDto.accountId });
      expect(userModel.findByIdAndUpdate).not.toHaveBeenCalled();
      expect(userModel.create).toHaveBeenCalledWith(mockCreateUserDto);
    });
  });

  describe('getUserByAccountId', () => {
    it('should find a user by login account id', async () => {
      // Arrange
      const loginAccId = 'testLoginAccId';
      const expectedUser = {
        _id: '123',
        accountId: loginAccId,
        publicKey: 'publicKey',
        nickName: 'nickName',
        loginType: 'loginType',
        referredBy: 'referredBy',
        nodeDbId: 'nodeDbId',
        nodeId: 'nodeId',
        createdAt: new Date(),
        updatedAt: new Date()
      };
      jest.spyOn(userModel, 'findOne').mockResolvedValueOnce(expectedUser);

      // Act
      const result = await service.findByLoginAccId(loginAccId);

      // Assert
      expect(result).toEqual(expectedUser);
      expect(userModel.findOne).toHaveBeenCalledWith({ accountId: loginAccId });
    });

    it('should throw a NotFoundException if user is not found', async () => {
      // Arrange
      const loginAccId = 'testLoginAccId';
      jest.spyOn(userModel, 'findOne').mockResolvedValueOnce(null);

      // Act & Assert
      await expect(service.findByLoginAccId(loginAccId)).rejects.toThrow(NotFoundException);
    });
  });

  describe('getAllUsersReferredByLoginAccountId', () => {
    it('should return all users referred by a given login account id', async () => {
      // Arrange
      const loginAccId = 'testLoginAccId';
      const expectedUser = {
        _id: '123',
        accountId: 'accountId',
        publicKey: 'publicKey',
        nickName: 'nickName',
        loginType: 'loginType',
        referredBy: loginAccId,
        nodeDbId: 'nodeDbId',
        nodeId: 'nodeId',
        createdAt: new Date(),
        updatedAt: new Date()
      };
      const expectedUsers = [expectedUser];
      jest.spyOn(userModel, 'findOne').mockResolvedValueOnce(expectedUser);
      jest.spyOn(userModel, 'find').mockResolvedValueOnce(expectedUsers);

      // Act
      const result = await service.getAllUsersReferredByLoginAccountId(loginAccId);

      // Assert
      expect(result).toEqual(expectedUsers);
      expect(userModel.findOne).toHaveBeenCalledWith({ accountId: loginAccId });
      expect(userModel.find).toHaveBeenCalledWith({ referredBy: loginAccId });
    });

    it('should throw a NotFoundException if user with given login account id is not found', async () => {
      // Arrange
      const loginAccId = 'testLoginAccId';
      jest.spyOn(userModel, 'findOne').mockResolvedValueOnce(null);

      // Act & Assert
      await expect(service.getAllUsersReferredByLoginAccountId(loginAccId)).rejects.toThrow(
        NotFoundException
      );
    });
  });

  afterAll(() => {
    console.log('**************** User service tests completed! ****************');
  });
});
