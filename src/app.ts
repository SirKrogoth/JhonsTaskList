import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import router from './routers/router';

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(router);

export default app;