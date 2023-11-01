import Boom from '@hapi/boom'
import Hapi from '@hapi/hapi'
import { CreateHistoryItemInput, CreateUserInput } from '../utils/types'

const userPlugin = {
    name: 'app/users',
    dependencies: ['prisma'],
    register: async function (server: Hapi.Server) {
        server.route([
            {
                method: 'GET',
                path: '/users/get-all',
                handler: getAllUsersHandler
            },
            {
                method: 'POST',
                path: '/users/create',
                handler: createUserHandler
            },
            {
                method: 'GET',
                path: '/users/getById/{userId}',
                handler: getUserByIdHandler
            },
            {
                method: 'GET',
                path: '/users/getBySpotifyId/{spotifyId}',
                handler: getUserBySpotifyIdHandler
            },
            {
                method: 'POST',
                path: '/users/createHistoryItem/{userId}',
                handler: createUserHistoryItemHandler
            },
            {
                method: 'GET',
                path: '/users/getHistoryItems/{userId}',
                handler: getUserHistoryItemsHandler
            }
        ])
    }
}

const getAllUsersHandler = async (request: Hapi.Request, h: Hapi.ResponseToolkit) => {
    const { prisma } = request.server.app

    try {
        const users = await prisma.user.findMany({})
        return h.response(users).code(200)
    } catch (err) {
        console.log(err)
        return Boom.badImplementation('failed to get users')
    }
}

const createUserHandler = async (request: Hapi.Request, h: Hapi.ResponseToolkit) => {
    const { prisma } = request.server.app
    const payload = request.payload as CreateUserInput  

    try {
        const newUser = await prisma.user.create({
            data: {
                spotifyId: payload.spotifyId,
                displayName: payload.displayName,
                playlistId: payload.playlistId,
                profilePicture: payload.profilePicture
            }
        })
        return h.response(newUser).code(200)
    } catch (err) {
        console.log(err)
        return Boom.badImplementation('failed to create user')
    }
}

const getUserByIdHandler = async (request: Hapi.Request, h: Hapi.ResponseToolkit) => {
    const { prisma } = request.server.app
    const id = request.params.userId

    try {
        const user = await prisma.user.findUnique({
            where: {
                id: parseInt(id)
            }
        })

        if (!user) {
            return h.response({ message: 'no user with that id' }).code(200)
        }

        return h.response(user).code(200)
    } catch (err) {
        console.log(err)
        return Boom.badImplementation('failed to get user')
    }
}

const getUserBySpotifyIdHandler = async (request: Hapi.Request, h: Hapi.ResponseToolkit) => {
    const { prisma } = request.server.app
    const spotifyId = request.params.spotifyId

    try {
        const user = await prisma.user.findUnique({
            where: {
                spotifyId: spotifyId
            }
        })

        if (!user) {
            return h.response({ message: 'no user with that id' }).code(200)
        }

        return h.response(user).code(200)
    } catch (err) {
        console.log(err)
        return Boom.badImplementation('failed to get user')
    }
}

const createUserHistoryItemHandler = async (request: Hapi.Request, h: Hapi.ResponseToolkit) => {
    const { prisma } = request.server.app
    const userId = request.params.userId    
    const payload = request.payload as CreateHistoryItemInput

    try {
        const newHistoryItem = await prisma.historyItem.create({
            data: {
                title: payload.title,
                artist: payload.artist,
                album: payload.album,
                albumArt: payload.albumArt,
                uri: payload.uri,
                duration: payload.duration,
                liked: payload.liked,
                user: {
                    connect: {
                        id: parseInt(userId)
                    }
                }
            }
        })
        return h.response(newHistoryItem).code(200)
    } catch (err) {
        console.log(err)
        return Boom.badImplementation('failed to create history item')
    }
}

const getUserHistoryItemsHandler = async (request: Hapi.Request, h: Hapi.ResponseToolkit) => {
    const { prisma } = request.server.app
    const userId = request.params.userId

    try {
        const historyItems = await prisma.historyItem.findMany({
            where: {
                userId: parseInt(userId)
            }
        })
        return h.response(historyItems).code(200)
    } catch (err) {
        console.log(err)
        return Boom.badImplementation('failed to get history items')
    }
}

export default userPlugin