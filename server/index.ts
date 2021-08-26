import express from 'express';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import { createServer } from 'http';
import { Server } from 'socket.io';
import getPage from './functions/getPage.js';
import imgMerge from './functions/imgMerge.js';
import createArchive from './functions/createArchive.js';
import cleanup from './functions/cleanup/cleanup.js';
import { defaultConfig } from './config/config.js';
import { v4 as uuidv4 } from 'uuid';
import cors from 'cors';
import { fakeData } from './functions/fakeData.js';

interface IHandshake {
  userToken: string;
}

interface IScrapData {
  data: {
    email: string;
    password: string;
    url: string;
  };
}

const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_BACKUP_ADDRESS,
  })
);

app.use(express.static('../client/build'));

const server = createServer(app);

const io = new Server(server, {
  transports: ['websocket'],
  cors: {
    origin: ['http://localhost:3008', 'http://localhost:3009'],
    methods: ['GET', 'POST'],
  },
  pingInterval: 10000,
  pingTimeout: 120000,
});

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(express.static('../cmoa/build'));
app.use(express.static('./tar'));

io.on('connection', (socket) => {
  let token = '';

  socket.on('handshake', ({ userToken: incomingToken }: IHandshake) => {
    token = incomingToken;

    console.log(`%c connected`, 'color:#66DD44;', incomingToken);

    socket.emit(`event:progress:${incomingToken}`, {
      message: 'Server ready',
      progress: 100,
    });
  });

  socket.on('post:scrap-data', ({ data }: IScrapData) => {
    console.log('got data', `event:start:${token}`, data);

    const { email, password, url } = data;

    defaultConfig.login = email;
    defaultConfig.password = password;
    defaultConfig.url = url;
    defaultConfig.token = token;

    const filename = `${uuidv4()}.tgz`;
    const getArchivePath = `tar/${filename}`;

    socket.emit(`event:start:${token}`);

    (async function () {
      console.log('getPage');

      // const imgArr = await getPage(socket);
      const imgArr = fakeData;

      console.log('imgMerge');
      await imgMerge(imgArr, socket);

      console.log('createArchive');
      await createArchive(filename, socket);

      console.log('cleanup');
      await cleanup(socket);
    })()
      .then(() => {
        console.log('after functions');

        socket.emit(`event:progress:${defaultConfig.token}`, {
          message: 'Cleanup done, generating link...',
          progress: 95,
        });

        socket.emit(`event:link:${defaultConfig.token}`, {
          path: '/' + getArchivePath,
        });

        socket.emit(`event:progress:${defaultConfig.token}`, {
          message: 'All work done',
          progress: 100,
        });

        socket.emit(`event:end:${defaultConfig.token}`);
      })
      .catch((error) => {
        socket.emit(`event:error:${defaultConfig.token}`, {
          message: error.message,
        });
      });

    app.get(`/tar/:file(*)`, (req, res) => {
      const { file } = req.params;

      const fileLocation = path.join(
        __dirname,
        defaultConfig.tarFilePath,
        file
      );

      console.log(fileLocation);
      res.setHeader('Content-Type', 'application/gzip');
      res.sendFile(fileLocation);
    });
  });
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
});

server.listen(defaultConfig.port, () => {
  console.log('listening on', defaultConfig.port);
});
