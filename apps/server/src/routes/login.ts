import { FastifyPluginAsync, FastifyReply, FastifyRequest } from 'fastify';

async function loginController(req: FastifyRequest, reply: FastifyReply) {
  reply.status(200).send({ message: 'user authorice' });
}

const loginRoute: FastifyPluginAsync = async (
  fastify,
  options: { prefix: string },
) =>  {
  fastify.route({
    method: 'POST',
    url: '/api/login',
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    onRequest: fastify.basicAuth,
    handler: loginController,
  });

  console.log(options);
  // server.post('/api/login', {}, loginController);
  // continue with the next
}
export default loginRoute;

