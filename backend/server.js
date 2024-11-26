const express= require('express');
const redis = require('redis');
const taskRoutes = require('./routes/taskRoutes');

//connect to database
const connectDB = require('./config/db');

//profile picture upload
const multer = require('multer');

//routes
const registerRouter = require('./routes/register')
const userRoutes = require('./routes/userRoutes');
const login=require('./routes/login');

const cors = require('cors');
const app=express();
app.use(cors());
connectDB();

app.use(express.json({extended:false}));
app.get('/',(req,res)=> res.send('API running'));
app.use('/api', registerRouter)
app.use('/api/login',login);
app.use('/uploads', express.static('uploads'));
app.use('/api/users', userRoutes);
app.use('/api/tasks', taskRoutes);

// app.use('/api/users',require('./routes/api/users'));
const PORT=process.env.PORT || 5000;
app.listen(PORT,()=> console.log(`server started on port ${PORT}`));

// Redis connection
// const redisClient = redis.createClient();
// redisClient.on('error', (err) => console.log('Redis Client Error', err));
// redisClient.connect().then(() => console.log('Connected to Redis'));

// module.exports = { redisClient };