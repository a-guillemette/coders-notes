import { createServer, Server, ServerOptions } from "restify";

const port = 8426;
const serverOptions: ServerOptions = {

};

export const server: Server = createServer(serverOptions);

server.get('hello/:name', (req, res, next) => {
    res.send(200, 'Hello ' + req.params.name);
    next();
});

server.listen(port, () => {
    console.log('\r\n');
    console.log('%s listening at %s\r\n', server.name, server.url);
});