const express=require("express")
const app=express()
const {v4:uuidv4}=require("uuid")
const methodOverride=require("method-override")

const path=require("path");


app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"))

app.use(express.static(path.join(__dirname,"public")));
app.use(methodOverride("_method"))


app.use(express.urlencoded({extended:true}));


const PORT=5000;

let posts=[
    {
        id:uuidv4(),
        username:"shree",
        content:"punkedpoo"
    },
    {
        id:uuidv4(),
        username:"dinchakpooja",
        content:"party dene hey bhai"
    }
    ,
    {
        id:uuidv4(),
        username:"putin",
        content:"i am going to destroy the world with nukes"
    },
    { id:uuidv4(),username: "goku", content: "I am the greatest Super Saiyan in the Dragon Ball universe." },
    { id:uuidv4(),username: "vegeta", content: "I will surpass my limits and become stronger." },
    { id:uuidv4(),username: "piccolo", content: "I'm a Namekian warrior." },
    { id:uuidv4(),username: "bulma", content: "I'm a brilliant scientist and inventor." },
    { id:uuidv4(),username: "krillin", content: "I'm the son of Goku and Chi-Chi." },
    { id:uuidv4(),username: "gohan", content: "I come from the future to save the world." },
    { id:uuidv4(),username: "trunks", content: "I'm a bio-engineered android." },
    { id:uuidv4(),username: "cell", content: "I'm the tyrant ruler of the universe." },
    { id:uuidv4(),username: "frieza", content: "I'm the God of Destruction." },
    { id:uuidv4(),username: "beerus", content: "I'm the Prince of all Saiyans!" }
]


app.get("/posts",(req,res)=>{
    console.log("we got a get requeest!");
    res.render("index.ejs",{posts})
})


app.get("/posts/new",(req,res)=>{
    console.log("we got a get request for a new post!");
    res.render("new.ejs")
})

app.get("/posts/:id",(req,res)=>{
    const { id}=req.params;
console.log(`we got the get with id request id:${id}`);
    const post=posts.find((p)=>id===p.id)
    console.log(`got the post ${post}`);
    res.render("show.ejs",{post})
})

app.get("/posts/:id/edit",(req,res)=>{
    const { id}=req.params;

    const post=posts.find((p)=>id===p.id)
    
    res.render("edit.ejs",{post})
})


app.patch("/posts/:id",(req,res)=>{
    const { id}=req.params;
    const newcontent=req.body.content;
    const post=posts.find((p)=>id===p.id)
console.log(`patch call ${post}`);
    post.content=newcontent;
    
    res.redirect("/posts")
})


app.delete("/posts/:id",(req,res)=>{
    const { id}=req.params;
    
    const newPost=posts.filter((p)=>id!==p.id)
console.log(`delete  call for id ${id }`);
    posts=newPost;
    
    res.redirect("/posts")
})

app.post("/posts",(req,res)=>{
    const {username,content}=req.body;
    const id=uuidv4();
    posts.push({id,username,content});
    res.redirect("/posts")
    console.log(posts);
})










app.listen(PORT,()=>{
    console.log(`SERVER STARTED ${PORT}`)
})