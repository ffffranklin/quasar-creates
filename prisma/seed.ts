import prisma from "@/lib/prisma";

async function main() {
  const admin = await prisma.user.upsert({
    where: { email: 'admin@quasarcreates.com'},
    update: {},
    create: {
      email: 'admin@quasarcreates.com',
      name: 'Admin',
    }
  })

  const adminItems = await prisma.item.create({
    data: {
      title: 'Mindnight Express Bag',
      content: 'It is the mission of QuasarCreates. to design and create products that are innovative in design, are unique, and are driven by high-quality standards; to celebrate the individuality of the Nena Society and the artistry of cultures around the world',
      author: {
        connect: {
          id: admin.id,
        }
      },
      photos: {
        create: {
          location: 'https://i.imgur.com/4YmhODN.jpeg',
          author: {
            connect: {
              id: admin.id
            }
          }
        }
      }
    }
  });
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
