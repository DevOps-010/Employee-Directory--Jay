const express = require('express');
const cors = require('cors');
const employeeRoutes = require('./routes/employeeRoutes');
const db = require('./models');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/employees', employeeRoutes);

// Database sync and server start
db.sequelize.sync()
  .then(() => {
    console.log('Database synchronized');
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error('Failed to sync database:', err);
  });

module.exports = app;