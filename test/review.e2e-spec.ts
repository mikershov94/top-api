import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { CreateReviewDto } from 'src/review/dto/create-review.dto';
import { Types, disconnect } from 'mongoose';
import { AuthDto } from '../src/auth/dto/auth.dto';

const productId = new Types.ObjectId();

const testDto: CreateReviewDto = {
  name: 'Тест',
  title: 'Заголовок',
  description: 'Описание тестовое',
  rating: 5,
  productId,
};

const loginDto: AuthDto = {
  login: 'em@test.ru',
  password: 'Qwerty123',
};

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let createdId: string;
  let createdReviewProductId: string;
  let token: string;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    const { body } = await request(app.getHttpServer())
      .post('/auth/login')
      .send(loginDto);

    token = body.access_token;
  });

  it('/review/create (POST) - success', async () => {
    await request(app.getHttpServer())
      .post('/review/create')
      .set('Authorization', 'Bearer' + token)
      .send(testDto)
      .expect(201)
      .then(({ body }: request.Response) => {
        createdId = body._id;
        createdReviewProductId = body.productId;
        console.log(createdReviewProductId);
        expect(createdId).toBeDefined();
        // done();
      });
  });

  // it('/review/create (POST) - fail', () => {
  //   return request(app.getHttpServer())
  //     .post('/review/create')
  //     .send({ ...testDto, rating: 0 })
  //     .set('Authorization', 'Bearer' + token)
  //     .expect(400)
  //     .then(({ body }: request.Response) => {
  //       console.log(body);
  //     });
  // });

  // it('/review/byProduct/:productId (GET) - success', async () => {
  //   await request(app.getHttpServer())
  //     .get('/review/byProduct/' + createdReviewProductId)
  //     .set('Authorization', 'Bearer' + token)
  //     .expect(200)
  //     .then(({ body }: request.Response) => {
  //       expect(body.length).toBe(1);
  //       // done();
  //     });
  // });

  afterAll(async () => {
    await disconnect();
  });
});
