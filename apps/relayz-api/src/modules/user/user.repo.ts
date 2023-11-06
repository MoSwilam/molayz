import { AbstractRepository } from "@app/common/database/abstract.repository";
import { Inject, Injectable, Logger } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Mode } from "fs";
import { Model } from "mongoose";
import { UserDocument } from "./user.schema";

@Injectable()
export class UserRepository extends AbstractRepository<UserDocument> {
  protected readonly logger = new Logger(UserRepository.name);

  constructor(
    @InjectModel(UserDocument.name)
    userModel: Model<UserDocument>
  ) {
    super(userModel);
  }
}