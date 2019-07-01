var express = require("express");
var sqlite = require("sqlite3");
var app = express();
var create_db = require("./create_db");

app.use(express.json());

// list of allcourses
app.get("/allcourses", (req, res)=>{
    let db = new sqlite.Database('saraldb',(err)=>{
    if (err){
        console.log(err);
    }else{
        db.all("select * from courses", (err,data)=>{
            if (err){
                console.log(err);
            }else{
                console.log("success")
                return res.send(data);
            }
        })
    }
})
})

// create new course
app.post('/allcourses',(req,res)=>{
  
        var name = req.body.name;
        var description = req.body.description;
        // var id = req.body.id;
        let db = new sqlite.Database('saraldb',(err)=>{
            if (err){
                console.log(err);
            }else{
                db.run('insert into courses (name,description) values(" '+name+' "," '+description+'")');
                db.close();
                return res.send('successfully')
            }
        })
})

// get course details by id
app.get('/allcourses/:id', (req, res)=>{
    let id = req.params.id;
    let db = new sqlite.Database('saraldb', (err)=>{
        if (err){
            console.log(err);
        }else{
            db.all('select * from courses where id="'+id+'";', (err, data)=>{
                if (err){
                    console.log(err);
                }else{
                    return res.send(data);
                    console.log("database successfull");
                }
            })
        }
    })
})

// edit a course by id
app.put("/allcourses/:id", (req, res)=>{
    var name = req.body.name;
    var description = req.body.description;
    var id = req.params.id
    let db = new sqlite.Database('saraldb', (err)=>{
        if (err){
            console.log({"ErrMsg": "check your json file"});
        }else{
            db.run('update exercise set name ="'+name+'",description="'+description+'" where id ="'+id+'"');
            db.close();
            return res.send('Successful');
        }
    })
})

// get exercises of a course
app.get("/allcourses/:id/exercise", (req, res)=>{
    let id = req.params.id
    // console.log(id)
    let db = new sqlite.Database('saraldb', (err)=>{
        if (err){
            console.log({"ErrMsg": "pls check your json file"})
        }else{
            db.all('select * from exercise', (err, data)=>{
                if (err){
                    console.log("Error");
                }else{
                    var list_allcourses = [];
                    for (var i of data){
                        // console.log(i);
                        if (i.courses_id == id){
                            list_allcourses.push(i);
                        }
                    }
                    return res.send(list_allcourses);
                    console.log("successful")
                }
            });
        }
    })
})

// create exercise of course
app.post('/allcourses/:id/exercise', (req, res)=>{
    var name = req.body.name;
    var description = req.body.description;
    var id = req.params.id;
    let db = new sqlite.Database('saraldb', (err)=>{
        if (err){
            console.log("err");
        }else{
            db.run('insert into exercise (name, description, courses_id) values ("'+name+' "," '+description+' "," '+id+' ")');
            db.close();
            return res.send("successfull")
        }
    })
})        

// get exercise by Id
app.get('/allcourses/:id/exercise/:Id', (req, res)=>{
    let Id = req.params.Id;
    console.log(Id);
    // console.log(id);
    // let courses_id = req.body.courses_id;
    let db = new sqlite.Database('saraldb', (err)=>{
        if (err){
            console.log("err");
        }else{
            db.all('select * from exercise where id="'+Id+'";', (err, data)=>{
                if (err){
                    console.log("err");
                }else{
                    // console.log(data);
                    return res.send(data);
                    console.log("database successfull");
                }
            })
        }
    })
})

//  Delete method by id for allcourses
app.delete("/allcourses/:id", (req, res) =>{
    var delete_id = req.params.id;
    console.log(delete_id);
    let db = new sqlite.Database("saraldb", (err) =>{
        if (err){
            console.log(err);
        }else{
              db.all("DELETE from courses where id = '"+delete_id+"' ",(err)=>{
                if (err){
                    console.log(err);
                }else{
                    console.log("Delete successfully.......");
                    res.send("delete");
                }
            })
        }
    })
})

// get method for exercise
app.get("/exercise", (req, res) =>{
    let db = new sqlite.Database('saraldb',(err) =>{
        if (err){
            console.log(err);
        }else{
            db.all("SELECT * from exercise",(err, data) =>{
                if (err){
                    console.log(err);
                }else{
                    console.log("get method successfully done.....");
                    res.send(data);
                }
            });
        }
    })
})

// get method for exercise by id
app.get("/exercise/:id",(req, res) =>{
    let exercise_id = req.params.id;
    let db = new sqlite.Database('saraldb',(err) =>{
        if (err){
            console.log(err);
        }else{
            db.all("SELECT * FROM exercise where id = '"+exercise_id+"' ",(err, data) =>{
                if (err){
                    console.log(err);
                }else{
                    console.log("exercise get successfully by id...!");
                    res.send(data);
                }
            })
        }
    })
})

// delete method by id for exercise
app.delete("/exercise/:id", (req, res) =>{
    let delete_id = req.params.id;
    let db = new sqlite.Database('saraldb', (err) =>{
        if (err){
            console.log(err);
        }else{
            db.all("DELETE from exercise where id = '"+delete_id+"' ",(err) =>{
                if (err){
                    console.log(err);
                }else{
                    console.log("done");
                    res.send("delete method done successfully.....");
                }
            });
            
        }
    })
})

var server = app.listen(3031, function(){
    var host = server.address().address;
    var port = server.address().port;
    console.log(host, port);
});
