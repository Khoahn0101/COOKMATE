const pool = require('./db');

pool.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.error('❌ Connection error:', err);
  } else {
    console.log('✅ Connected! Server time:', res.rows[0]);
  }
  pool.end();
});
