
var sqlite = require("sqlite3");
var db = new sqlite.Database("saraldb",(err)=>{
    if (err){
        console.log(err);
    }else{
        db.run("create table if not exists courses (id integer Primary key autoincrement, name text, description text)");
        console.log("database make successfully"); 

        db.run("create table if not exists exercise (id integer Primary key autoincrement, name text, description text, courses_id integer)");
        console.log("successfully");
    }
})