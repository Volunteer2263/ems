var express = require('express');
const connection = require('../database/db');
var router = express.Router();
var app = require('../app');

/* GET home page. */

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' }); 
}); 

// ---- employee registration ----

router.get('/employeeregistration',(req,res,next)=>
{
  res.render("employeeregistration");
});

// ---- admin page ----

router.get('/adminpage',(req,res,next)=>
{  res.render("adminhomepage");
});

// ---- add employee ----

router.get('/addemployee',(req,res,next)=>
{  res.render("employeeregistration");
});
router.post('/saveemployee',(req,res)=>{
  connection.query("insert into employee set ?" ,[req.body],()=>{  })
  connection.query("update employee set status = 'Not approved' where empid = ?",[req.body.empid],()=>{  })
  console.log("data added to the database");
  res.render("employeeregistration");
})

// ---- approve employee ----

router.get('/approveemployee',(req,res,next)=>{ 
  connection.query("select * from employee" ,(error,result,fields)=>{
    console.log("data called successfully")
   res.render("showallemployees",{data:result});
  })
});
router.post('/approvee/:empid',(req,res)=> { 
  connection.query("update employee set status = 'approved' where empid = ?",[req.params.empid],  ()=> {    })
  connection.query("select * from employee" ,(error,result,fields)=>{
  console.log("data called successfully")
  res.render("showallemployees",{data:result});
  console.log("employee approved");
  }) 
})

// ---- Delete Employee Record ----

router.get('/deleteemployee',(req,res,next)=> { 
  connection.query("select * from employee" ,(error,result,fields)=>{
    console.log("data called successfully")
    res.render("deleteemp",{data:result});  })
});
router.post('/deleteemp/:empid', (req,res)=> { 
  connection.query("delete from employee where empid = ? ",[req.params.empid],()=>{
    console.log("row deleted")
  })
  connection.query("select * from employee" ,(error,result,fields)=>{
    console.log("data called successfully")
    res.render("deleteemp",{data:result});
    console.log("employee deleted");
    })
});

// ---- Show All Emplopyee Record ----

router.get('/showallemployees',(req,res,next)=>{
  connection.query("select * from employee" ,(error,result,fields)=>{
    console.log("data called successfully")
   res.render("showall",{data:result});
  })
});

// ---- Search Employee Record ----

router.get('/searchemployee',(req,res,next)=>
{   res.render("searchemp");  }) 
router.post('/searchemployee', (req,res)=> { 
  connection.query("select * from employee where empid = ?",[req.body.empid] ,(error,result)=>{ 
    console.log("row found")
    res.render("showall",{data:result});   })
});

// ----- update employee record ----

router.get('/updateemployeerecord',(req,res,next)=>{
  connection.query("select * from employee" ,(error,result,fields)=>{
  console.log("data called successfully")
  res.render("updateemp",{data:result});  })
})
router.post('/updateemp/:empid', (req,res)=> {  
  connection.query("select * from employee where empid = ?",[req.params.empid] ,(error,result)=>{ 
    console.log("row found")
    res.render("updatedata",{data:result});   })
});
router.post('/updatedata2/:empid', (req,res)=> {  
  connection.query("update employee set ? where empid = ?",[req.body,req.params.empid] ,(err,res,fields)=>{ if (err)
      console.log(err);   })
  connection.query("update employee set status = 'Not approved' where empid = ?",[req.params.empid],()=>{
    console.log("status updated")     })
  connection.query("select * from employee" ,(error,result)=>{ 
    res.render("showall",{data:result});   })
    console.log("row updated")     
}); 

// ------ employee login ------ 

router.get('/employeelogin',(req,res,next)=>
{  res.render("login");  }); 

router.post('/confirmed',(req,res)=>{  
connection.query("select * from employee where empid = ? and password = ? and status = 'approved' ",
[req.body.empid,req.body.password,req.body.status],(error,result,fields)=>
{ if(result.length!=0)
    res.render("emplogin",{data:result})
    else 
      res.send("Insert Valid Credential")       }) 
  console.log("secure login");})

module.exports = router;