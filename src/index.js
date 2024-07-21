import express from 'express';
import {createServer} from 'node:http';
import {join} from 'node:path'
import {createIoInstance} from './realtimeServer.js';
import router from './routes/index.js';
import cookieParser from 'cookie-parser';
// process.env.DEBUG = "*";
const app = express();
const server = createServer(app);

app.use(cookieParser());
app.use('/',router);
app.use(express.static(join(import.meta.dirname,"public")));

await createIoInstance(server);

const port = process.env.PORT ?? 3000;
const host = '127.0.0.1';

server.listen(port,host,() => {
    console.log(`server at http://${host}:${port}`);
});