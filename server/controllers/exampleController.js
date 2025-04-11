const { getHealthTime } = require('../db/queries/example');

exports.getHealthState = async (req, res) => {
  try {
    const time = await getHealthTime();
    res.json({ status: 'OK', time });
  } catch (err) {
    res.status(500).json({ status: 'ERROR', error: err.message });
  }
};
