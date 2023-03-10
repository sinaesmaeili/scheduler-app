import express from 'express';
import fs from 'fs';
import path from 'path';

const router = express.Router();
const scheduleFile = path.join(__dirname, '../data/schedule.json');

// POST request for updating schedule JSON within server directory
function saveSchedule(req, res) {
  try {
    fs.writeFileSync(scheduleFile, JSON.stringify(req.body));
    res.json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error saving schedule data' });
  }
}

// GET request for retrieving schedule JSON and sending back to client
function getSchedule(req, res) {
  try {
    let data = fs.readFileSync(scheduleFile);
    res.json(JSON.parse(data));
  } catch (error) {
    console.error(error);
    fs.writeFileSync(scheduleFile, JSON.stringify({}));
    res.status(500).json({ error: 'Error reading data' });
  }
}

router.post('/save', saveSchedule);
router.get('/get', getSchedule);

export default router;