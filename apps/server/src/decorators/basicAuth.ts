import { FastifyError, FastifyInstance, FastifyLoggerInstance, FastifyReply, FastifyRequest, FastifyTypeProviderDefault } from 'fastify';
import UserModel from '../shared/user/model';
import { compare } from 'bcrypt';
import fp from 'fastify-plugin';
import { IncomingMessage, Server, ServerResponse } from 'http';

type LoginBody = {
  user: string;
  password: string;
};

function token2UserNPasswd(token: string): LoginBody {
  const buffToken = Buffer.from(token);
  const stringToken = buffToken.toString('utf8');
  const [user, password] = stringToken.split(':');
  return { user, password };
}

function validatePassword(pwdValidate: string, pwdSaved: string): Promise<boolean> {
  return compare(pwdValidate, pwdSaved);
}

async function validateUserNPasswd(token: string, hostname: string, reply: FastifyReply, fastifyInstance: FastifyInstance<Server, IncomingMessage, ServerResponse, FastifyLoggerInstance, FastifyTypeProviderDefault>) {
  const { user, password } = token2UserNPasswd(token);
  const loginUser = await UserModel.findOne({ email: user }).exec();
  // if (user === null || (user !== loginUser?.email && password !== loginUser?.password)) {
  //   reply
  //     .status(401)
  //     .headers({ 'www-authenticate': 'Basic', realm: hostname })
  //     .send({ message: 'Unauthorized user' });
  // }
  try {
    if (loginUser) {
      const validPwd = await validatePassword(password, loginUser?.password);
      if (validPwd) {
        return;
      }
    } else {
      reply
        .status(401)
        .headers({ 'www-authenticate': 'Basic', realm: fastifyInstance.server.address})
        .send({ message: 'Unauthorized user' });
    }
  } catch (e) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    reply.log.error(`${e.message} validateUserNPasswd`);
    reply.status(500).send({ message: 'Unknown error' });
  }
}

export default fp(async( fastify, opts ) => {
  fastify.decorate('basicAuth', 
    async function basicAuthDecorator(
      req: FastifyRequest,
      reply: FastifyReply,
      done: (err?: FastifyError) => void,
    ) {
      if (typeof req.headers.authorization === 'undefined') {
        req.log.info('no authorization header');
        reply
          .headers({ 'www-authenticate': 'Basic', realm: req.hostname })
          .status(401)
          .send({ message: 'Unauthorized user' });
      }
      await validateUserNPasswd(req.headers.authorization as string, req.hostname, reply, fastify);
      done()
    })
})
