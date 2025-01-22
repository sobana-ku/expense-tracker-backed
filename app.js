const express = require('express');
const mongoose = require("mongoose");
const app = express()
app.use(express.json());
const{v4:uuidv4} =require('uuid');
mongoose.connect("mongodb://localhost:27017/expense").then(()=>{
  console.log("Connected to mongoDB");
});
const expenseSchema = new mongoose.Schema({
  id:{type: String, required: true,unique:true},
  title:{type: String, required: true},
  amount:{type: String, required: true}
})
const Expense =mongoose.model("Expense",expenseSchema);

 app.get('/api/expenses' , (req,res)=>{
     res.status(200).json(expenses);
 });


app.get('/api/expenses' , async(req,res)=> {
   const expense = await Expense.findOne({id});
   if(!expense){
    res.status(404).json({message:"No expense found"});
   }
    res.status(200).json(expense);
});


// get - parameter(used for getting single data,only one data is sent) -> '/:' , query(to get multiple data,multiple data is sent)-> '?'
app.get('/api/expenses/:id' ,async (req,res)=>{
    const {id} = req.params;//destructuring
    // console.log(id)
    const expense = await Expense.findOne({id});
    if(!expense){
        res.status(404).json({message:"Not found"});
    }
    res.status(200).json(expense);
});
app.post("/api/expenses",async(req,res)=>{
  const{title,amount}=req.body;
  if(!title || !amount){
    res.status(400).json({message:"Please provide both title and amount"})
  }
  const newExpense = new Expense({
    id:uuidv4(),
    title,
    amount
  })
  newExpense.savedExpense =await newExpense.save()
  res.status(201).json(savedExpense)
});

app.delete("/api/expenses/:id",async(req,res) =>{
  const {id} = req.params;
  try{
    const deletedExpense = await Expense.findOneAndDelete({id})
    if(!deletedExpense){
      res.status(404).json({message:"Expense not found"})
    return
  }
  res.status(200).json({message:"Deleted Successfully"});
}catch(error){
  res.status(500).json({message:"Internal Server Error"});
}
});
app.put("/api/expenses/:id",async(req,res) =>{
  const {id} = req.params;
  try{
    const putExpense = await Expense.findOneAndUpdated({id})
    if(!putExpense){
      res.status(404).json({message:"Expense not found"})
    return
  }
  res.status(200).json({message:"Added Successfully"});
}catch(error){
  res.status(500).json({message:"Internal Server Error"});
}
});

app.listen(5000,()=>{
    console.log("server is running");
});




