const express = require('express');
require('dotenv').config();
const app = express();
const PORT = process.env.PORT || 5000;
const router = require('./routes/route')

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(morgan('dev'));


app.use('/api', router);

process.on('uncaughtException', (err) => {
  console.error('UNCAUGHT EXCEPTION! server Shutting down...');
  console.error(err.stack);
  process.exit(1); 
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

