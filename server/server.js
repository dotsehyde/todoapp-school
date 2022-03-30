const express = require("express");
const db = require("./db");
const app = express();
const cors = require("cors");

//middleware
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(express.json());

//Get All todos
app.get("/todos", async (req, res) => {
    try {
      var result = await db.query("SELECT * FROM todo");
        res.json(result[0]);   
    } catch (error) {
        console.log(error);
        res.send("Error:", error); 
    }
  
});

//Add Todo
app.post("/addTodo", async (req, res) => {
  try {
      console.log(req.body);
      const { item } = req.body;
      console.log(item);
    await db.query("INSERT INTO todo (item) VALUES(?)", [item]);
    res.send("OK")
  } catch (error) {
    console.log(error);
    res.send("Error:", error);
  }
});
//Delete Todo
app.delete("/deleteTodo/:item", async (req, res) => {
  try {
    const { item } = req.params;
    await db.query("DELETE FROM todo WHERE item = ?", [item]);
  } catch (error) {
      console.log(error);
    res.send("Error:", error);
  }
});

app.listen(7000, () => {
  console.log(`Example app listening at http://localhost:7000`);
});
