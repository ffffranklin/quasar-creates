import prismaClient from "@/lib/prisma-client";

async function main() {
  const admin = await prismaClient.user.upsert({
    where: {email: 'admin@quasarcreates.com'},
    update: {},
    create: {
      email: 'admin@quasarcreates.com',
      name: 'Admin',
    }
  })

  const product = ({
    title = 'Mindnight Express Bag',
    content = 'It is the mission of QuasarCreates. to design and create products that are innovative in design, are unique, and are driven by high-quality standards; to celebrate the individuality of the Nena Society and the artistry of cultures around the world',
    photoLocation = 'https://i.imgur.com/4YmhODN.jpeg',
    author = {
      connect: {
        id: admin.id,
      }
    }
  }:{
    title?: string,
    content?: string,
    photoLocation?: string,
    author?: {connect: {id: number}}
  })=> {
    return {
      data: {
        title,
        content,
        author,
        photos: {
          create: {
            location: photoLocation,
            author,
          }
        }
      }
    }
  }
  const adminProduct3 = await prismaClient.product.create(
    product({
      content:'$900',
      photoLocation: 'https://i.imgur.com/CV8RU6I.jpeg',
    })
  );
  const adminProduct1 = await prismaClient.product.create(
    product({
      content:'$1300',
      photoLocation: 'https://i.imgur.com/5MBW5Mi.jpeg',
    })
  );

  const adminProduct2 = await prismaClient.product.create(
    product({
      content:'$700',
      photoLocation: 'https://i.imgur.com/Ec04lTy.jpeg',
    })
  );


  const adminProduct4 = await prismaClient.product.create(
    product({
      content:'$900',
      photoLocation: 'https://i.imgur.com/a3w58bR.jpeg',
    })
  );
}

main()
  .then(async () => {
    await prismaClient.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prismaClient.$disconnect()
    process.exit(1)
  })
