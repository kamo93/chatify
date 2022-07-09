import Fastify from 'fastify';
import fastifyEnv from '@fastify/env'
import mongoose from 'mongoose';
import registerRoute from './routes/user/register';
import loginRoute from './routes/login';
import basicAuthDecorator from './decorators/basicAuth';

declare module 'fastify' {
  export interface FastifyInstace {
    basicAuth(): void;
    config: {
      MONGO_URL: string;
    };
  }
}

async function connectDB(url) {
  return mongoose.connect(url, {
    dbName: 'CHATIFY',
    authSource: 'admin',
  });
}

// eslint-disable-next-line new-cap
const fastify = Fastify({
  logger: {
    transport:
      process.env.NODE_ENV === 'development'
        ? {
            target: 'pino-pretty',
            options: {
              translateTime: 'HH:MM:ss Z',
              ignore: 'pid,hostname',
            },
          }
        : undefined,
  },
});

// type LoginBody = {
//   user: string;
//   password: string;
// };

// function token2UserNPasswd(token: string): LoginBody {
//   const buffToken = Buffer.from(token);
//   const stringToken = buffToken.toString('utf8');
//   const [user, password] = stringToken.split(':');
//   return { user, password };
// }

// function validatePassword(pwdValidate: string, pwdSaved: string): Promise<boolean> {
//   return compare(pwdValidate, pwdSaved);
// }

// async function validateUserNPasswd(token: string, reply: FastifyReply) {
//   const { user, password } = token2UserNPasswd(token);
//   const loginUser = await UserModel.findOne({ email: user }).exec();
//   try {
//     if (loginUser) {
//       const validPwd = await validatePassword(password, loginUser?.password);
//       if (validPwd) {
//         return;
//       }
//     } else {
//       reply
//         .status(401)
//         .headers({ 'www-authenticate': 'Basic', realm: fastify.server.address() })
//         .send({ message: 'Unauthorized user' });
//     }
//   } catch (e) {
//     // eslint-disable-next-line @typescript-eslint/ban-ts-comment
//     // @ts-ignore
//     reply.log.error(`${e.message} validateUserNPasswd`);
//     reply.status(500).send({ message: 'Unknown error' });
//   }
// }

// async function basicAuthDecorator(
//   req: FastifyRequest,
//   reply: FastifyReply,
//   done: (err?: FastifyError) => void,
// ) {
//   if (typeof req.headers.authorization === 'undefined') {
//     req.log.info('no authorization header');
//     reply
//       .headers({ 'www-authenticate': 'Basic', realm: fastify.server.address() })
//       .status(401)
//       .send({ message: 'Unauthorized user' });
//   }
//   await validateUserNPasswd(req.headers.authorization as string, reply);
//   done();
// }

// // update password
// fastify.put('/api/user/register', async (req, reply) => {
//   const { email, password } = req.body;
//   const filter = { email };
//   const updateValues = { password };
//   await UserModel.findOneAndUpdate(filter, updateValues);
//   req.log.info(`User ${email} update password successfully ✅`);
//   reply.code(200);
//   reply.send({ email, password });
// });
//
const options = {
  dotenv: {
    path: `${__dirname}/.env`,
    debug: true
  }
}

fastify
  .register(fastifyEnv, options)
  .register(basicAuthDecorator)
  .register(loginRoute)
  .register(registerRoute, { prefix: '/api/user' });

async function start() {
  try {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    await connectDB(fastify.config.MONGO_URL);
    fastify.log.info('Connect chatify mongodb instance ✅');
    fastify.log.info('Starting fastify application...');
    await fastify.listen(8080);
  } catch (e) {
    fastify.log.error(e);
  }
}

start();

