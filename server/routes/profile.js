const config = require('../config.json');
const {pool} = require('../db/index');

// GET User Profile (protected)
// Returns user details for the logged-in user
const getProfile = async function (req, res) {
    try {
      const userId = req.user.user_id;
      const query = `
        SELECT user_id, username, email, profile_pic, join_date
        FROM users
        WHERE user_id = $1
      `;
      const { rows } = await pool.query(query, [userId]);
      if (rows.length === 0)
        return res.status(404).json({ message: "User not found" });

      res.json(rows[0]);
    } catch (error) {
      console.error('Error fetching profile:', error);
      res.status(500).json({ message: "Internal server error" });
    }
}

const updatePhoto = async function (req, res) {
    try {
      const userId = req.user.user_id;
      if (!req.file) return res.status(400).json({ message: 'No file uploaded' });
      
      // Construct URL of the uploaded file
      const fileUrl = `http://${config.server_host}:${config.server_port}/uploads/${req.file.filename}`;
      
      // Update user profile with the new photo URL.
      const updateQuery = `
        UPDATE users
        SET profile_pic = $1
        WHERE user_id = $2
        RETURNING user_id, username, email, profile_pic, join_date
      `;
      const { rows } = await pool.query(updateQuery, [fileUrl, userId]);
      if (rows.length === 0)
        return res.status(404).json({ message: "User not found" });
      
      res.json({ message: 'Profile photo updated successfully', user: rows[0] });
    } catch (error) {
      console.error('Error uploading profile photo:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

module.exports = {
    getProfile,
    updatePhoto
  }

