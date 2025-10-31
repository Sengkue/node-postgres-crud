const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const config = require('./config/index');
const routes = require('./router/routes');
const { sequelize } = require('./config/database');
const { notFound, errorHandler } = require('./middleware/error.middleware');

const app = express();
app.use(helmet());
app.use(express.json());
app.use(cors({ origin: config.CORS_ORIGIN }));
app.use(morgan('dev'));

const limiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 100 });
app.use(limiter);

app.get('/health', (req, res) => res.json({ status: 'ok' }));

app.use('/api', routes);

const PORT = config.PORT;

async function start() {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error('Failed to start server:', err);
    process.exit(1);
  }
}

app.use(notFound);
app.use(errorHandler);

start();
