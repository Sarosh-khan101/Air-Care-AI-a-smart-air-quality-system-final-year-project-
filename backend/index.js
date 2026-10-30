require("dotenv").config();
const express =require("express");
const app=express();
const fetch =(...args) =>
   import ('node-fetch').then(({default:fetch}) => fetch(...args));
const axios= require("axios");
const cors = require("cors");;
const PORT = process.env.PORT || 5000;
const mysql = require('mysql2');
const path=require("path");
const methodOverride=require("method-override");
const session = require("express-session");
const API_key = process.env.API_key.trim();
const CAPI_key = process.env.CAPI_key.trim();


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.set("view engine","ejs");
app.set("views", path.join(__dirname,"/views"));
app.use(express.static(path.join(__dirname, "..")));
app.use(express.static("public"));
app.use(express.static(path.join(__dirname,"public")));
app.use(methodOverride("_method"));
app.use(session({
  secret: "mysecretkey",
  resave: false,
  saveUninitialized: false
}));

// ------------------------------------------------------------------------------------
// city route

app.get("/api/aqi/:city", async(req,res)=>{
   const city =req.params.city;

   try{
      const response =await axios.get(`https://api.waqi.info/feed/${city}/?token=${API_key}`);
      const data = response.data;
      if(data.status==="ok"){
         res.json({
city:data.data.city.name,
aqi:data.data.aqi,
         });
      }else{
         res.status(404).json({error:"City not found"});
      }
   }catch(error){
      console.error("Error details:", error.response ? error.response.data: error.message);
        res.status(500).json({error: "Error in fetching AQI data"});
   }
});

app.get("/", (req,res)=>{
   res.send("server is running successfully");
})

// ----------------------------------------------------------------------------------------------------

const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${CAPI_key}`;

app.post("/chat", async (req, res) => {
  try {
    const userMessage = req.body.message;

    const response = await fetch(GEMINI_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [
          {
            parts: [{ text: userMessage }]
          }
        ]
      })
    });
    const data = await response.json();
    const botReply =
      data?.candidates?.[0]?.content?.parts?.[0]?.text ||
      "Sorry, I didn't understand.";

    res.json({ reply: botReply });

  } catch (err) {
    console.error(err);
    res.json({ reply: "Error connecting to Gemini API" });
  }
});

// ----------------------------------------------------------------------------------------------------



const db =  mysql.createConnection({
 host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  database: process.env.DB_NAME || 'fy_project',
  password: process.env.DB_PASSWORD || 'MSKsql786@$',
  port: process.env.DB_PORT || 3306
})

db.connect((err)=>{
  if (err) {
    console.log("Database connection failed",err);
    process.exit(1);
  }
  console.log("Connected to MySQL database");
});

app.post("/signup",(req,res)=>{
  console.log('body====> :', req.body);
  const {full_name, e_mail, password, phone_number, date_of_birth, city, age} = req.body;

  const sql ="INSERT INTO userinfo (full_name,  e_mail, password, phone_number, date_of_birth, city, age) VALUES (?,?,?,?,?,?,?)";
   db.query(sql, [full_name,  e_mail, password, phone_number, date_of_birth, city, age],(err,result)=>{
    if(err){
      console.log("DB error :",err);
      res.json({message: "Database error"});
      return;
    }
    
    res.json({message:"User registered successfullly"});
   }
  );
});

// -----------------------------------------------------------
app.get("/signup", (req,res)=>{
  res.sendFile(path.join(__dirname, "../signup.html"))
})

app.get("/signin", (req,res)=>{
  res.render("signin.ejs", {err: null});
})

app.post("/signin", async (req,res)=>{
  const {email, password} = req.body;
  const query = "SELECT * FROM userinfo WHERE e_mail = ?";
  db.query(query, [email], (err,result)=>{
    if(err){
      console.log("DB error",err);
      return res.send("db error");
    }
    if(result.length===0){
      return res.render("signin", {err: "User does not exist"});
    }
    if(result[0].password!==password){
      return res.render("signin", {err: "Wrong password"});
    }

     req.session.userEmail = email;
     
     res.redirect("/index.html");
  });
});

// --------------------------------------------------------
app.get("/delete-account", (req, res)=>{

  res.render("delete", {err: null});
})

app.delete("/delete-account", async(req, res)=>{
  const email=req.session.userEmail;

  if(!email){
    return res.redirect("signup.html");
  } 
  const query ="DELETE FROM userinfo WHERE e_mail = ?";
  db.query(query, [email], (err, result)=>{
    if(err){
      console.log("Data Base error");
      res.render("/delete", {err:"Data Base error while deleting account"});
    }
    if(result.affectedRows === 0){
      return res.render("delete", {err: "User not found"});
    }
      req.session.destroy(()=>{
        res.redirect("/");
      })
  })
})

// ------------------------------------------------------------
app.get("/rate", async(req,res)=>{
     res.render("rating");
})

app.post("/rate", async(req,res)=>{
  const email= req.session.userEmail;
  const {rating ,review} = req.body;

  if(!email){
    return res.redirect("signup.html");
  }
  const query = "INSERT INTO ratings(user_email, rating, review) VALUES (?,?,?)";
  db.query(query,[email,rating,review], (err,result)=>{
    if(err){
      console.log("Database error",err);
      return res.redirect("index.html")
    }
    res.redirect("index.html");
  })

})

// ------------------------------------------------------------
app.listen(PORT,()=>{
   console.log(`server is listening on port ${PORT}`);
});




