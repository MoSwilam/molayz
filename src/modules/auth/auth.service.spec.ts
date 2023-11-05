import { Test, TestingModule } from '@nestjs/testing';
import { NodeService } from '../node-management/nodes.service';
import { WalletService } from '../wallet/wallet.service';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { UserService } from '../user/user.service';
import { BadRequestException, NotFoundException } from '@nestjs/common';

class NodeServiceMock {
  // getNodesByOwnerId: jest.Mock<any, any> = jest.fn();
  getNodesByOwnerId: jest.Mock<any, any> = jest.fn();
}

class WalletServiceMock {
  getWallets: jest.Mock<any, any> = jest.fn();
}

class ConfigServiceMock {
  get = jest.fn();
  // async getWallets() {}
}

class UserServiceMock {
  getUserByAccountId: jest.Mock<any, any> = jest.fn();
  getOrCreateUser: jest.Mock<any, any> = jest.fn();
  getUserByAccountIdTemp: jest.Mock<any, any> = jest.fn();
}

class JwtServiceMock {
  sign: jest.Mock<any, any> = jest.fn();
}

describe('AuthService', () => {
  let service: AuthService;
  let nodesService: NodeService;
  let userService: UserService;
  let jwtService: JwtService;
  let configService: ConfigService;
  // let nodesService: NodeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: JwtService,
          useClass: JwtServiceMock
        },
        {
          provide: ConfigService,
          useClass: ConfigServiceMock
        },
        {
          provide: UserService,
          useClass: UserServiceMock
        },
        {
          provide: NodeService,
          useClass: NodeServiceMock
        },
        {
          provide: WalletService,
          useClass: WalletServiceMock
        }
      ]
    }).compile();

    service = module.get<AuthService>(AuthService);
    nodesService = module.get<NodeService>(NodeService);
    userService = module.get<UserService>(UserService);
    jwtService = module.get<JwtService>(JwtService);
    configService = module.get<ConfigService>(ConfigService);
  });

  beforeEach(() => {
    jest.spyOn(service, 'getNearValidKeys').mockResolvedValueOnce({ keys: [1, 2] } as any);
    jest.spyOn(configService, 'get').mockReturnValue('mockAgentSecret');
    jest.spyOn(jwtService, 'sign').mockReturnValue('mockToken');
  });

  describe('Auth service defined', () => {
    it('should be defined', () => {
      expect(service).toBeDefined();
    });
  });

  describe('nearLogin', () => {
    const mockLoginDto = {
      referredBy: 'mosw.testnet',
      publicKey: 'ed25519:Cts774oKPZJduM4KacsXFJBiPRbTy86H3ms6dZvvvSy',
      nearWalletId: 'mohamed.testnet',
      loginType: 'near',
      name: 'moswilam'
    };

    const mockFullUser = {
      id: '123456',
      ...mockLoginDto,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    it('should throw an error if no node or user with found with the provided referredBy field', async () => {
      jest.spyOn(nodesService, 'getNodesByOwnerId').mockResolvedValueOnce(null);
      jest.spyOn(userService, 'getUserByAccountId').mockResolvedValueOnce(null);

      await expect(service.nearLogin(mockLoginDto)).rejects.toThrowError(NotFoundException);

      expect(nodesService.getNodesByOwnerId).toHaveBeenCalledWith(mockLoginDto.referredBy);
      expect(userService.getUserByAccountId).toHaveBeenCalledWith(mockLoginDto.referredBy);
    });

    it('should establish near connection get valid keys ', async () => {
      jest.spyOn(userService, 'getUserByAccountId').mockResolvedValueOnce(mockFullUser as any);
      jest.spyOn(userService, 'getOrCreateUser').mockResolvedValueOnce(mockFullUser as any);

      await service.nearLogin(mockLoginDto);

      expect(service.getNearValidKeys).toHaveBeenCalledWith(
        mockLoginDto.nearWalletId,
        mockLoginDto.publicKey
      );
    });

    it('should create a new user if no user found with the provided accountId', async () => {
      // const loginDto = { name, referredBy, accountId: nearWalletId, publicKey, loginType, relayzContractId: contractId };
      jest.spyOn(nodesService, 'getNodesByOwnerId').mockResolvedValueOnce(null);
      jest.spyOn(userService, 'getUserByAccountId').mockResolvedValueOnce(mockFullUser as any);
      jest.spyOn(userService, 'getOrCreateUser').mockResolvedValueOnce(mockFullUser as any);

      const result = await service.nearLogin(mockLoginDto);

      const x = {
        name: mockFullUser.name,
        referredBy: mockLoginDto.referredBy,
        accountId: 'mohamed.testnet',
        publicKey: 'ed25519:Cts774oKPZJduM4KacsXFJBiPRbTy86H3ms6dZvvvSy',
        loginType: 'near',
        relayzContractId: 'dev-relayz-node.testnet'
      };

      //expect(userService.getOrCreateUser).toHaveBeenCalledWith(mockLoginDto);
      expect(nodesService.getNodesByOwnerId).toHaveBeenCalledWith(mockLoginDto.referredBy);
      expect(userService.getUserByAccountId).toHaveBeenCalledWith(mockLoginDto.referredBy);
      expect(userService.getOrCreateUser).toHaveBeenCalledWith(x);
      expect(result).toEqual({ token: 'mockToken', userId: mockFullUser.id });
    });

    it('Login and return a token and userId', async () => {
      jest.spyOn(nodesService, 'getNodesByOwnerId').mockResolvedValueOnce(null);
      jest.spyOn(userService, 'getUserByAccountId').mockResolvedValueOnce(mockFullUser as any);
      jest.spyOn(userService, 'getOrCreateUser').mockResolvedValueOnce(mockFullUser as any);

      const result = await service.nearLogin(mockLoginDto);

      expect(configService.get).toHaveBeenCalledWith('agentSecret');
      expect(result).toEqual({ token: 'mockToken', userId: mockFullUser.id });
      expect(nodesService.getNodesByOwnerId).toHaveBeenCalledWith(mockLoginDto.referredBy);
      expect(userService.getUserByAccountId).toHaveBeenCalledWith(mockLoginDto.referredBy);
      expect(jwtService.sign).toHaveBeenCalledWith(
        expect.objectContaining({
          userId: mockFullUser.id,
          accountId: mockLoginDto.nearWalletId,
          publicKey: mockLoginDto.publicKey,
          validKey: expect.anything(),
          exp: expect.any(Number)
        }),
        expect.objectContaining({ secret: 'mockAgentSecret' })
      );
    });
  });

  describe('AgentLogin', () => {
    const mockLoginAgentDto = {
      accountId: 'mosw.testnet',
      nodeId: 'some-node-id'
    };

    const mockUser = {
      id: '123456',
      ...mockLoginAgentDto,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    it('throw error if user is not registered since node registration is disabled', async () => {
      jest.spyOn(userService, 'getUserByAccountId').mockResolvedValueOnce(undefined);

      await expect(service.loginAgent(mockLoginAgentDto)).toBeFalsy();
      expect(userService.getUserByAccountId).toHaveBeenCalledWith(mockLoginAgentDto.accountId);
      expect(configService.get).not.toHaveBeenCalled();
      expect(jwtService.sign).not.toHaveBeenCalled();
    });

    it('should create and return a token if the user is registered', async () => {
      jest.spyOn(userService, 'getUserByAccountId').mockResolvedValueOnce(mockUser as any);

      const result = await service.loginAgent(mockLoginAgentDto);

      expect(userService.getUserByAccountId).toHaveBeenCalledWith(mockLoginAgentDto.accountId);
      expect(configService.get).toHaveBeenCalledWith('agentSecret');

      expect(jwtService.sign).toHaveBeenCalledWith(
        expect.objectContaining({
          userId: mockUser.id,
          nodeId: mockLoginAgentDto.nodeId,
          exp: expect.any(Number)
        }),
        expect.objectContaining({ secret: 'mockAgentSecret' })
      );
      expect(result).toEqual({ token: 'mockToken' });
    });
  });

  afterAll(() => {
    console.log('**************** Auth service tests completed! ****************');
  });
});
