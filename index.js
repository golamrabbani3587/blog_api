const Express = require('express');
const bodyParser = require('body-parser');
const Mongoose = require('mongoose');   

const PostModel = require('./models/postModel')
Mongoose.connect('mongodb+srv://rrrr:CzfOFNVpDbrrMCVy@cluster0.nbrodly.mongodb.net/?retryWrites=true&w=majority').then(res=>{
    console.log('Connection successful');
})



const app = Express()
app.use(bodyParser.json());




app.post('/blog', async (req, res) => {
    try {
        console.log("hello", req.body);
        const PostModels = new PostModel(req.body)
       const savedData = await PostModels.save();
      res.status(201).json(savedData);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
})

app.get('/', (req, res)=>{
  res.send('App is running');
})

app.get('/blog', async (req, res) => {
    try {
       const blogData = await PostModel.find();
  
      res.status(201).json(blogData);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
})

app.get('/blog/:id', async (req, res) => {
    try {
       const blogData = await PostModel.findById(req.params.id);
  
      res.status(201).json(blogData);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
})

app.get('/blog/:id', async (req, res) => {
    try {
       const blogData = await PostModel.findById(req.params.id);
  
      res.status(201).json(blogData);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
})


app.post('/blog', (req, res)=>{
    console.log('post');
})

const port = process.env.PROD_PORT || 9540;

app.listen(port, ()=>{
    console.log("App is running on port 3000");
})