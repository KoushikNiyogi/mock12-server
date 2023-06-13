const express =  require("express");
const connection = require("./db");
const cors = require("cors");
const jobRouter = require("./Router/Job.Router")
const app = express();
app.use(cors({
    origin : "*"
}));
app.use(express.json());

app.use("/job",jobRouter);



app.listen(process.env.PORT,async ()=>{
    try {
        await connection;
        console.log("connected to db");
    } catch (error) {
        console.log(err);
    }
})