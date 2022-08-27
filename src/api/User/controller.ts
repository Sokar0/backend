import {FastifyRequest, FastifyReply, FastifyInstance } from 'fastify';
// import { Http2SecureServer, Http2ServerRequest, Http2ServerResponse } from 'http2';

export class UserController{
  private server: FastifyInstance;

  constructor(server: FastifyInstance){
    this.server = server;
  }

  registerAllRoutes(){
    this.getUsers();
  }

  private getUsers(){
    this.server.get('/', async (_request: FastifyRequest, response: FastifyReply) => {
      const statusCode = 200;
      const body = {
        "Message": "Olá Mundo!",
      };
    
      response.code(statusCode)
      .header('Content-Type', 'application/json; charset=utf-8')
      .send(body);
    })
  }
}


// fastify.get('/', async function (request, reply) {
//   reply.code(200).send({ data: 'home page' })
// })

// fastify.post('/post/:id', async function (request, reply) {
//   const { id } = request.params
//   reply.code(201).send({ data: `${id}` })
// })

// fastify.put('/put/:id', async function (request, reply) {
//   const { id } = request.params
//   reply.code(200).send({ data: `${id}` })
// })

// fastify.delete('/delete/:id', async function (request, reply) {
//   const { id } = request.params
//   reply.code(204).send({ data: `${id}` })
// })