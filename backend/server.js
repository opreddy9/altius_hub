const express= require('express');
const connectDB = require('./config/db');
const registerRouter = require('./routes/register')
const login=require('./routes/login');
const cors = require('cors');
const app=express();
app.use(cors());
connectDB();
app.use(express.json({extended:false}));
app.get('/',(req,res)=> res.send('API running'));
app.use('/api', registerRouter)
app.use('/api/login',login);
// app.use('/api/users',require('./routes/api/users'));
const PORT=process.env.PORT || 5000;
app.listen(PORT,()=> console.log(`server started on port ${PORT}`));