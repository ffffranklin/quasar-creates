import {afterAll, beforeAll, describe, expect, it} from "vitest";
import prisma from "@/lib/prisma";

describe('integration tests', ()=> {
  beforeAll(()=> {})

  afterAll(async ()=> {
    await prisma.$transaction([
      prisma.profile.deleteMany(),
      prisma.photo.deleteMany(),
      prisma.user.deleteMany()
    ])
  })

  it('should work', ()=> {
    expect(true).toEqual(true);
  })
})
