import Boom from '@hapi/boom'
import Hapi from '@hapi/hapi'
import { CreateUserInput } from '../utils/types'

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
                path: '/users/getBySpotifyId/{spotifyId}',
                handler: getUserBySpotifyIdHandler
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
            }
        })
        return h.response(newUser).code(200)
    } catch (err) {
        console.log(err)
        return Boom.badImplementation('failed to create user')
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

export default userPlugin