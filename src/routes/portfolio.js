const express = require('express');
const router = express.Router();
const Portfolio = require('../models/Portfolio');
const auth = require('../middleware/auth');

// Get all portfolio items
router.get('/', async (req, res) => {
  try {
    const items = await Portfolio.find().sort('order');
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create a new portfolio item (protected)
router.post('/', auth, async (req, res) => {
  const portfolio = new Portfolio(req.body);
  try {
    const newPortfolio = await portfolio.save();
    res.status(201).json(newPortfolio);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update a portfolio item (protected)
router.put('/:id', auth, async (req, res) => {
  try {
    const portfolio = await Portfolio.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!portfolio) {
      return res.status(404).json({ message: 'Portfolio item not found' });
    }
    res.json(portfolio);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete a portfolio item (protected)
router.delete('/:id', auth, async (req, res) => {
  try {
    const portfolio = await Portfolio.findByIdAndDelete(req.params.id);
    if (!portfolio) {
      return res.status(404).json({ message: 'Portfolio item not found' });
    }
    res.json({ message: 'Portfolio item deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update portfolio order (protected)
router.put('/order/bulk', auth, async (req, res) => {
  try {
    const updates = req.body.map((item, index) => ({
      updateOne: {
        filter: { _id: item.id },
        update: { $set: { order: index } }
      }
    }));
    
    await Portfolio.bulkWrite(updates);
    const updatedItems = await Portfolio.find().sort('order');
    res.json(updatedItems);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router; 