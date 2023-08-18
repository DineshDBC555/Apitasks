const express = require('express');
const router = express.Router();
const connection = require('../db');

// Create a new task
router.post('/', (req, res) => {
    try {
        const { title, description } = req.body;
  if (!title) {
    return res.status(400).json({ error: 'Title is required' });
  }
  if (!description) {
    return res.status(400).json({ error: 'Description is required' });
  }
  const query = 'INSERT INTO tasks (title, description) VALUES (?, ?)';
  connection.query(query, [title, description], (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: true,message:'Internal Server Error' });
    } else {
      res.status(201).json({ error: false,message:'Details Saved Successfully'  });
    }
  });
    } catch (error) {
        res.status(500).json({ error: true,message: error.message || 'Internal Server Error' });
    }
  
});

// Retrieve all tasks
router.get('/', (req, res) => {
    try {
        const query = 'SELECT * FROM tasks';
  connection.query(query, (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      res.status(200).json(results);
    }
  });
    } catch (error) {
        res.status(500).json({ error: true,message: error.message || 'Internal Server Error' });
    }
  
});

// Update a task
router.put('/:id', (req, res) => {
  try {
    const taskId = req.params.id;
    const { title, description } = req.body;
   
    if (!title) {
        return res.status(400).json({ error: 'Title is required' });
      }
      if (!description) {
        return res.status(400).json({ error: 'Description is required' });
      }
    const query = 'UPDATE tasks SET title = ?, description = ? WHERE id = ?';
    connection.query(query, [title, description, taskId], (err, results) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: true, message: 'Internal Server Error' });
      } else {
        res.status(200).json({error:false,message:  'Details Updated Successfully' });
      }
    });
  } catch (error) {
    res.status(500).json({ error: true,message: error.message || 'Internal Server Error' });
    
  }
 
});

// Delete a task
router.delete('/:id', (req, res) => {
    try {
        const taskId = req.params.id;

  const query = 'DELETE FROM tasks WHERE id = ?';
  connection.query(query, [taskId], (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      res.status(200).send({error:false,message:'Deleted Successfully.!'});
    }
  });
    } catch (error) {
    res.status(500).json({ error: true,message: error.message || 'Internal Server Error' });
        
    }
  
});

module.exports = router;
