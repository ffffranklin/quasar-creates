import prisma from "@/lib/prisma";

async function main() {
  const admin = await prisma.user.upsert({
    where: {email: 'admin@quasarcreates.com'},
    update: {},
    create: {
      email: 'admin@quasarcreates.com',
      name: 'Admin',
    }
  })

  const item = ({
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
  const adminItem3 = await prisma.item.create(
    item({
      content:'$900',
      photoLocation: 'https://i.imgur.com/CV8RU6I.jpeg',
    })
  );
  const adminItem1 = await prisma.item.create(
    item({
      content:'$1300',
      photoLocation: 'https://i.imgur.com/5MBW5Mi.jpeg',
    })
  );

  const adminItem2 = await prisma.item.create(
    item({
      content:'$700',
      photoLocation: 'https://i.imgur.com/Ec04lTy.jpeg',
    })
  );


  const adminItem4 = await prisma.item.create(
    item({
      content:'$900',
      photoLocation: 'https://i.imgur.com/a3w58bR.jpeg',
    })
  );
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
