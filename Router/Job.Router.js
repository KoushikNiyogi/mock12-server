const express = require("express");
const jobRouter = express.Router();
const JobModel = require("../Models/Job.model")

jobRouter.post("/post",async (req,res)=>{

   try {
    let newJob = new JobModel(req.body);
    await newJob.save()
    res.status(200).send({msg: "New Job has been added"})
   } catch (error) {
    console.log(error);
    res.status(200).send({msg: "New Job has been added"})
   }
})

jobRouter.get("/get",async (req,res)=>{
    let {page} = req.body;
    console.log(req.params);
    try {
     let Total_products =  await JobModel.find({});
     let productCount =  Total_products.length;

     let produtsPage = await JobModel.find({}).limit(10).skip((page-1)*10);
     res.status(200).send({data: {produtsPage,productCount}})
    } catch (error) {
     console.log(error);
     res.status(400).send({msg: "There was some problem"})
    }
 })

 jobRouter.get("/getbyrole",async (req,res)=>{
    let {role,page} = req.params;
    try {
     

     let produtsPage = await JobModel.find({role}).limit(10).skip((page-1)*10);
     let productCount =  produtsPage.length;
     res.status(200).send({data: {produtsPage,productCount}})
    } catch (error) {
     console.log(error);
     res.status(400).send({msg: "There was some problem"})
    }
 })
 

 jobRouter.get("/getbysort",async (req,res)=>{
    let {sort,page} = req.params;
    try {
     

     let produtsPage = await JobModel.find({}).limit(10).skip((page-1)*10).sort({postedAt:sort});
     let productCount =  produtsPage.length;
     res.status(200).send({data: {produtsPage,productCount}})
    } catch (error) {
     console.log(error);
     res.status(400).send({msg: "There was some problem"})
    }
 })

 jobRouter.get("/getbysearch",async (req,res)=>{
    let {search,page} = req.params;
    try {
    

     let produtsPage = await JobModel.find({language : {$regex : search}}).limit(10).skip((page-1)*10);
     let productCount =  produtsPage.length;
     res.status(200).send({data: {produtsPage,productCount}})
    } catch (error) {
     console.log(error);
     res.status(400).send({msg: "There was some problem"})
    }
 })


module.exports = jobRouter;