const config = require('./config/index');
const { sequelize } = require('./config/database');

console.log('Testing database connection...');
console.log('DB Config:', {
  host: config.DB_HOST,
  port: config.DB_PORT,
  database: config.DB_NAME,
  user: config.DB_USER,
});

async function test() {
  try {
    console.log('\nConnecting to database...');
    await sequelize.authenticate();
    console.log('✓ Database connection successful');
    
    console.log('\nSyncing models...');
    await sequelize.sync({ alter: true });
    console.log('✓ Models synced');
    
    console.log('\n✅ All tests passed!');
    process.exit(0);
  } catch (err) {
    console.error('\n❌ Test failed:', err.message);
    console.error(err);
    process.exit(1);
  }
}

test();
