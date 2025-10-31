const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const config = require('./config/index');
const routes = require('./router/routes');
const { sequelize } = require('./config/database');
const { notFound, errorHandler } = require('./middleware/error.middleware');
const logger = require('./utils/logger');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(helmet());
app.use(express.json());
app.use(cors({ origin: config.CORS_ORIGIN }));
// Console access logs (dev friendly)
app.use(morgan('dev'));

// File access logs
const logsDir = path.join(__dirname, 'logs');
fs.mkdirSync(logsDir, { recursive: true });
const accessLogStream = fs.createWriteStream(path.join(logsDir, 'access.log'), { flags: 'a' });
app.use(morgan('combined', { stream: accessLogStream }));

const limiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 100 });
app.use(limiter);

app.get('/health', (req, res) => res.json({ status: 'ok' }));

app.use('/api', routes);

app.use(notFound);
app.use(errorHandler);

const PORT = config.PORT;

async function start() {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    app.listen(PORT, () => {
      logger.info({ port: PORT }, 'Server running');
    });
  } catch (err) {
    logger.error({ err }, 'Failed to start server');
    process.exit(1);
  }
}

start();
