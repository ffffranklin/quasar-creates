import { afterAll, beforeEach, describe, expect, it } from 'vitest';
import prismaClient from '@/lib/prisma-client';

describe('integration tests', () => {
  beforeEach(async () => {
    await prismaClient.$transaction([
      prismaClient.product.deleteMany({}),
      prismaClient.profile.deleteMany({}),
      prismaClient.photo.deleteMany({}),
      prismaClient.user.deleteMany({}),
    ]);
  });

  afterAll(async () => {
    await prismaClient.$disconnect();
  });

  describe('when user created', () => {
    it.skip('update the db', async () => {
      const userData = {
        email: 'me@home.com',
        name: 'Me',
      };

      await prismaClient.user.create({
        data: userData,
      });

      const found = await prismaClient.user.findFirst({
        where: {
          email: userData.email,
        },
      });

      expect(found).toEqual(
        expect.objectContaining({
          id: expect.any(Number),
          ...userData,
        })
      );
    });
  });

  describe('when photo created', () => {
    it.skip('update the db', async () => {
      const userData = {
        email: 'me@home.com',
        name: 'Me',
      };

      const user = await prismaClient.user.create({
        data: userData,
      });
      const product = await prismaClient.product.create({
        data: {
          title: 'awesome',
          author: {
            connect: {
              id: user.id,
            },
          },
        },
      });

      const photoData = {
        location: 'https://i.imgur.com/4YmhODN.jpeg',
        author: {
          connect: {
            email: 'me@home.com',
          },
        },
        product: {
          connect: {
            id: product.id,
          },
        },
      };

      await prismaClient.photo.create({
        data: photoData,
      });

      const found = await prismaClient.user.findFirst({
        where: {
          email: userData.email,
        },
      });

      expect(found).toEqual(
        expect.objectContaining({
          id: expect.any(Number),
          ...userData,
        })
      );
    });
  });
});
