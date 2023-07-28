import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { AuthDocument, AuthModel } from './auth.model';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(AuthModel.name) private authModel: Model<AuthDocument>,
  ) {}
}
