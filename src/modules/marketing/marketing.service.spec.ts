import { Test, TestingModule } from '@nestjs/testing';
import { MarketingService } from './marketing.service';
import { getModelToken } from '@nestjs/mongoose';
import { MarketingEntity } from './marketing.schema';
import { Model } from 'mongoose';
import * as bcrypt from 'bcryptjs';
import { MarketingStatus } from './marketing.types';
import { NotFoundException, UnauthorizedException } from '@nestjs/common';

const mockMarketingCampaign = {
  secret: 'abc123',
  _id: '123',
  label: 'some label',
  urlToRedirect: 'https://url.com',
  startDate: '2023-04-05T18:49:10.622+00:00',
  expirationdate: '2023-04-05T19:49:10.622+00:00',
  status: MarketingStatus.SUCCESS,
  error: null
};

describe('MarketingService', () => {
  let service: MarketingService;
  let model: Model<MarketingEntity>;

  const marketingArray = [
    {
      secret: 'abc123',
      urlToRedirect: 'https://url1.com',
      startDate: new Date('2023-04-05T18:49:10.622+00:00'),
      expirationdate: new Date('2023-04-05T19:49:10.622+00:00'),
      status: MarketingStatus.SUCCESS,
      error: null
    },
    {
      secret: 'abc123',
      urlToRedirect: 'https://url2.com',
      startDate: new Date('2023-04-05T18:49:10.622+00:00'),
      expirationdate: new Date('2023-04-05T19:49:10.622+00:00'),
      status: MarketingStatus.SUCCESS,
      error: null
    }
  ];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MarketingService,
        {
          provide: getModelToken(MarketingEntity.name),
          useValue: {
            new: jest.fn().mockResolvedValue(mockMarketingCampaign),
            constructor: jest.fn().mockResolvedValue(mockMarketingCampaign),
            find: jest.fn(),
            findById: jest.fn(),
            create: jest.fn(),
            exec: jest.fn()
          }
        }
      ]
    }).compile();

    service = module.get<MarketingService>(MarketingService);
    model = module.get<Model<MarketingEntity>>(getModelToken(MarketingEntity.name));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('test marketing service', () => {
    it('should throw NotFoundException when campaign is not found', async () => {
      const id = 'campaignId';
      jest.spyOn(model, 'findById').mockReturnValueOnce(null);

      await expect(service.getMarketingCampaign({ id, secret: 'secret' })).rejects.toThrow(
        NotFoundException
      );

      expect(model.findById).toHaveBeenCalledWith(id);
    });

    it('Should throw UnauthorizedException when provided secret is invalid', async () => {
      const campaign = mockMarketingCampaign;
      campaign.secret = await bcrypt.hash(mockMarketingCampaign.secret, 10);

      const invalidDto = { id: campaign._id, secret: 'invalid secret' };

      jest.spyOn(model, 'findById').mockResolvedValue(campaign);
      jest.spyOn(bcrypt, 'compare').mockResolvedValue(false);

      await expect(service.getMarketingCampaign(invalidDto)).rejects.toThrow(UnauthorizedException);

      expect(model.findById).toHaveBeenCalledWith(invalidDto.id);
      expect(bcrypt.compare).toHaveBeenCalledWith(invalidDto.secret, campaign.secret);
    });

    it('insert a new campaign', async () => {
      jest.spyOn(model, 'create').mockImplementation(() => Promise.resolve(mockMarketingCampaign));
      const newCampaign = await service.create(mockMarketingCampaign);
      expect(newCampaign).toEqual(mockMarketingCampaign);
    });
  });
});
