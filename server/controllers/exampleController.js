const { getHealthTime } = require('../db/queries/example');

// Here is the controller for the example service
// This is where we will define the routes for each service
// We will use queries in the db/queries folder
exports.getHealthState = async (req, res) => {
  try {
    const time = await getHealthTime();
    res.json({ status: 'OK', time });
  } catch (err) {
    res.status(500).json({ status: 'ERROR', error: err.message });
  }
};
