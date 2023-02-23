const express = require('express');
const router = express.Router();
const Covid = require('../models/covid');

// Total recovered cases
// Total recovered cases
router.get('/totalRecovered', async (req, res) => {
    try {
      const result = await Covid.aggregate([
        { $group: { _id: 'total', recovered: { $sum: '$recovered' } } },
        { $project: { _id: 0 } },
      ]);
      res.status(200).json({ data: result[0] });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });
  

// Total active cases
router.get('/totalActive', async (req, res) => {
  try {
    const result = await Covid.aggregate([
      {
        $group: {
          _id: 'total',
          active: {
            $sum: { $subtract: ['$infected', '$recovered'] },
          },
        },
      },
      { $project: { _id: 0 } },
    ]);
    res.status(200).json({ data: result[0] });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Total deaths
router.get('/totalDeath', async (req, res) => {
  try {
    const result = await Covid.aggregate([
      { $group: { _id: 'total', death: { $sum: '$death' } } },
      { $project: { _id: 0 } },
    ]);
    res.status(200).json({ data: result[0] });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Hotspot states
router.get('/hotspotStates', async (req, res) => {
  try {
    const result = await Covid.aggregate([
      {
        $addFields: {
          rate: {
            $round: [
              {
                $divide: [
                  { $subtract: ['$infected', '$recovered'] },
                  '$infected',
                ],
              },
              5,
            ],
          },
        },
      },
      { $match: { rate: { $gt: 0.1 } } },
      { $project: { _id: 0, state: 1, rate: 1 } },
    ]);
    res.status(200).json({ data: result });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Healthy states
router.get('/healthyStates', async (req, res) => {
  try {
    const result = await Covid.aggregate([
      {
        $addFields: {
          mortality: {
            $round: [{ $divide: ['$death', '$infected'] }, 5],
          },
        },
      },
      { $match: { mortality: { $lt: 0.005 } } },
      { $project: { _id: 0, state: 1, mortality: 1 } },
    ]);
    res.status(200).json({ data: result });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
