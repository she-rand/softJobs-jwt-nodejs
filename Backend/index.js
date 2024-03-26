const express= require('express');
const cors= require('cors');
const userRoute=require('./routes/user.route.js')
const app=express();

app.use(express.json())
app.use(cors());
app.use("/",userRoute);
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
console.log(`Server listening on port http://localhost:${PORT}`);
});