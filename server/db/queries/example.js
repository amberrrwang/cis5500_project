const db = require('../index');

//Here are the folder for all the queries related to different service
exports.getHealthTime = async () => {
  const result = await db.query('SELECT NOW()');
  return result.rows[0].now;
};