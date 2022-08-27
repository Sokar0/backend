import 'dotenv/config';
//import fs from 'fs';
//import path from 'path';
import Fastify, { FastifyInstance } from 'fastify';
import middiePlugin from '@fastify/middie';
// import * as httpsRedirect from 'fastify-https-redirect';
import frameguard from 'frameguard';
import xXssProtection from 'x-xss-protection';
import cors from '@fastify/cors';
import fastify_swagger from '@fastify/swagger';

// import { Http2SecureServer, Http2ServerRequest, Http2ServerResponse } from 'http2';

import { UserController } from './api/User/controller'

// let server: FastifyInstance | FastifyInstance<Http2SecureServer, Http2ServerRequest, Http2ServerResponse>;

let server: FastifyInstance;
server = Fastify({
  logger: true,
});

// if (process.env.NODE_ENV == 'local'){
//   server = Fastify({
//     logger: true,
//   });
// }
// else {
//   server = Fastify({
//     logger: true,
//     http2: true,
//     https: {
//       allowHTTP1: true,
//       //key: fs.readFileSync(path.resolve(__dirname, './yourSSL.key')),
//       //cert: fs.readFileSync(path.resolve(__dirname, './yourSSL.cert')),
//     },
//   });
//   server.register(httpsRedirect,{httpPort:3123, httpsPort:10443});
// }

async function start() {
  try {
    // Register middleware handler.
    await server.register(middiePlugin);

    await server.register(cors, {
      origin: process.env.ALLOWED_ORIGINS,
      methods: ['GET', 'PUT', 'PATCH', 'POST', 'DELETE']
    });

    // Add middleware.
    server.use(frameguard());
    server.use(xXssProtection());

    await server.register(fastify_swagger, {
      routePrefix: '/docs',
      swagger: {
        info: {
          title: 'CPS/MS_Template Documentation',
          description: 'Endpoints for Template Microservice',
          version: '1.0.0'
        },
        externalDocs: {
          url: 'https://swagger.io',
          description: 'Find more info here'
        },
        schemes: ['http', 'https'],
        consumes: ['application/json'],
        produces: ['application/json'],
        securityDefinitions: {
          apiKey: {
            type: 'apiKey',
            name: 'apiKey',
            in: 'header'
          }
        }
      },
      uiConfig: {
        docExpansion: 'full',
        deepLinking: false
      },
      uiHooks: {
        onRequest: function (_request, _reply, next) { next() },
        preHandler: function (_request, _reply, next) { next() }
      },
      staticCSP: true,
      transformStaticCSP: (header) => header,
      exposeRoute: true
    });

    // Register routes for UserController
    new UserController(server).registerAllRoutes();

    // Executes Swagger
    server.ready(err => {
      if (err) {
        throw err;
      }
      server.swagger();
    });

    // Start server.
    const port: number = (process.env.NODE_ENV == 'local' ? Number(process.env.HTTP_PORT) : Number(process.env.HTTPS_PORT));
    const address = await server.listen({
      port: port,
      host: '::',
    })
    console.log(`Listening on ${address}`);
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
}

start();
