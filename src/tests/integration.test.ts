import {afterAll, beforeEach, describe, expect, it} from "vitest";
import prisma from "@/lib/prisma";

describe('integration tests', ()=> {
  beforeEach(async ()=> {
    await prisma.$transaction([
      prisma.item.deleteMany({}),
      prisma.profile.deleteMany({}),
      prisma.photo.deleteMany({}),
      prisma.user.deleteMany({})
    ])
  })

  afterAll(async ()=> {
    await prisma.$disconnect();
  })

  describe('when user created', ()=> {
    it('update the db', async ()=> {
      const userData = {
        email: 'me@home.com',
        name: 'Me'
      };

      await prisma.user.create({
        data: userData
      })

      const found = await prisma.user.findFirst({
        where: {
          email: userData.email
        }
      })

      expect(found).toEqual(expect.objectContaining({
        id: expect.any(Number),
        ...userData,
      }));
    })
  })

  describe('when photo created', ()=> {
    it('update the db', async ()=> {
      const userData = {
        email: 'me@home.com',
        name: 'Me'
      };

      const user = await prisma.user.create({
        data: userData
      })
      const item = await prisma.item.create({
        data: {
          title: 'awesome',
          author: {
            connect: {
              id: user.id
            },
          }
        }
      })

      const photoData = {
        location: 'https://i.imgur.com/4YmhODN.jpeg',
        author: {
          connect: {
            email: 'me@home.com'
          }
        },
        item: {
          connect: {
            id: item.id
          }
        }
      };

      await prisma.photo.create({
        data: photoData,
      })

      const found = await prisma.user.findFirst({
        where: {
          email: userData.email
        }
      })

      expect(found).toEqual(expect.objectContaining({
        id: expect.any(Number),
        ...userData,
      }));
    })
  })
})
