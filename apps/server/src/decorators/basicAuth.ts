import { FastifyError, FastifyReply, FastifyRequest } from 'fastify';
import UserModel from '../shared/user/model';

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

async function validateUserNPasswd(token: string, hostname: string, reply: FastifyReply) {
  const { user, password } = token2UserNPasswd(token);
  const loginUser = await UserModel.findOne({ email: user }).exec();
  if (user === null || (user !== loginUser?.email && password !== loginUser?.password)) {
    reply
      .status(401)
      .headers({ 'www-authenticate': 'Basic', realm: hostname })
      .send({ message: 'Unauthorized user' });
  }
}

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
  await validateUserNPasswd(req.headers.authorization as string, req.hostname, reply);
  done();
}

export default basicAuthDecorator;
