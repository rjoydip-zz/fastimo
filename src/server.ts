import * as fastify from "fastify";

const server = fastify();

export async function App(port: number = 3000) {
  try {
    return server.listen(port);
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
}
