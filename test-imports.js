// Quick test to check if all modules load without errors
console.log('Testing imports...');

try {
  require('./config/index');
  console.log('✓ config/index');
  
  require('./models/user.model');
  console.log('✓ models/user.model');
  
  require('./models/user_permission.model');
  console.log('✓ models/user_permission.model');
  
  require('./middleware/auth.middleware');
  console.log('✓ middleware/auth.middleware');
  
  require('./middleware/role.middleware');
  console.log('✓ middleware/role.middleware');
  
  require('./middleware/permission.middleware');
  console.log('✓ middleware/permission.middleware');
  
  require('./middleware/error.middleware');
  console.log('✓ middleware/error.middleware');
  
  require('./controllers/auth.controller');
  console.log('✓ controllers/auth.controller');
  
  require('./controllers/user.controller');
  console.log('✓ controllers/user.controller');
  
  require('./controllers/permissions.controller');
  console.log('✓ controllers/permissions.controller');
  
  require('./router/auth.routes');
  console.log('✓ router/auth.routes');
  
  require('./router/user.routes');
  console.log('✓ router/user.routes');
  
  require('./router/permissions.routes');
  console.log('✓ router/permissions.routes');
  
  require('./router/sales.routes');
  console.log('✓ router/sales.routes');
  
  require('./router/reports.routes');
  console.log('✓ router/reports.routes');
  
  require('./router/routes');
  console.log('✓ router/routes');
  
  console.log('\n✅ All imports successful!');
  process.exit(0);
} catch (err) {
  console.error('\n❌ Import failed:', err.message);
  console.error(err.stack);
  process.exit(1);
}
