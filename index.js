const express = require('express')
const app = express()
const port = 3000
const morgan = require('morgan')
const exphbs  = require('express-handlebars');
const path = require('path')
const cookies = require('cookie-parser')
const router = require('./src/routes/index')
const mongoose = require('mongoose');

async function connect() {
  try {
      await mongoose.connect('mongodb://localhost:27017/mita_shop', {
          useNewUrlParser: true,
      });
      console.log('connect success');
  } catch (error) {
      console.log('connect failure!!!');
  }
}

connect();


app.use(cookies());
app.use(express.urlencoded({extended: true}));
app.engine('.hbs', exphbs({extname: '.hbs',
 helpers: {
    multi: function (num1,num2) { return num1*num2; },
    plus: function (num1,num2) { return num1+num2;}
}}));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, '/src/resourses/views'))
app.use(express.static(path.join(__dirname,'/src/public')))
console.log(__dirname);

app.use(morgan('combined'))
router(app)



app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}/home`)
})