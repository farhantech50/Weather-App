const express = require("express");
const app = express();

app.listen(process.env.PORT || 3000);

const wRoute= require("./controller/weather");

app.use(express.urlencoded({extended:true}));
app.use('/',wRoute);


app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.set("view engine","ejs");
