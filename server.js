const fastify = require('fastify')({logger: true});
const dotenv = require("dotenv");
dotenv.config({
    path: './config/env/config.env',
});
const PORT = process.env.PORT;
fastify.register(require('fastify-swagger'), {
    exposeRoute: true,
    routePrefix: '/docs',
    swagger: {
        info: {title: 'fastify-api'}
    }
});
fastify.register(require('./routes/products'));
fastify.get("/", (req, reply) => {
    reply.send({sayHello: "Hello"});
});

const start = async () => {
    try {
        await fastify.listen(PORT);
    } catch (error) {
        fastify.log.error(error);
        process.exit(1);
    }
};
start();