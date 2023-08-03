import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

async function main() {
    await prisma.user.deleteMany({})


    // const newUser = await prisma.user.create({
    //     data: {
    //         id: 1,
    //         spotifyId: 'spotifyId',
    //         displayName: 'displayName',
    //     }
    // })

    // const historyItem = await prisma.historyItem.create({
    //     data: {
    //         id: 1,
    //         listedAt: new Date(),
    //         title: 'title',
    //         artist: 'artist',
    //         album: 'album',
    //         albumArt: 'albumArt',
    //         uri: 'uri',
    //         duration: 100,
    //         userId: newUser.id
    //     }
    // })

    // console.log(newUser, historyItem)



}

main()
    .catch((err) => {
        console.log(err)
    })
    .finally(() => {
        prisma.$disconnect
    })