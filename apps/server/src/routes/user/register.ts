import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import { IncomingMessage, Server, ServerResponse } from 'http';
import UserModel from '../../shared/user/model';
import { hash } from 'bcrypt';

function encodePwd(pwdPlain: string): Promise<string> {
  const saltRounds = 6; // level of difficulty of the encription
  return hash(pwdPlain, saltRounds);
}

async function registerPostControlller(req: FastifyRequest, reply: FastifyReply) {
  // @ts-ignore
  const { email, password, username, cellphone, birthDate } = req.body;
  try {
    const hashPwd = await encodePwd(password);
    await UserModel.create({ password: hashPwd, email, username, cellphone, birthDate });
    req.log.info(`User created ${email} successfully ✅`);
    reply.status(200).send({ msg: 'user added' });
  } catch (e) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    req.log.error(`[registerPostController] - ${e.message}`);
    reply.status(500).send({ message: 'Fail registration' });
  }
}

async function registerRoute(
  server: FastifyInstance<Server, IncomingMessage, ServerResponse>,
  options: { prefix: string },
  done: (err?: Error) => void,
) {
  server.route({
    method: 'POST',
    url: '/register',
    handler: registerPostControlller,
  });

  console.log(options);
  // server.post('/api/login', {}, loginController);
  // continue with the next
  done();
}
export default registerRoute;
