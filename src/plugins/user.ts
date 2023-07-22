import Boom from '@hapi/boom'
import Hapi from '@hapi/hapi'

const userPlugin = {
    name: 'app/users',
    dependencies: ['prisma'],
    register: async function (server: Hapi.Server) {
        server.route([
            {
                method: 'GET',
                path: '/users/get-all',
                handler: getAllUsersHandler
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

export default userPlugin