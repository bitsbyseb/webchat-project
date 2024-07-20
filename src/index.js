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

server.listen(3000 ?? process.env.PORT,'192.168.0.5',() => {
    console.log(`server at http://192.168.0.5:${process.env.PORT ?? 3000}`);
});