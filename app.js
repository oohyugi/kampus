'use strict';

const fs = require('fs');
var express = require("express");
var app = express();
let rawdata = fs.readFileSync('kampus.json');

app.listen(3000, () => {
  console.log("Server running on port 3000");
});

app.get("/kampus/:page", (req, res, next) => {

	var listKampus=JSON.parse(rawdata);

	var mPage = req.params.page;

 	res.json(paginate(listKampus,10,mPage));


});

app.get("/kampus/all", (req, res, next) => {

	var listKampus=JSON.parse(rawdata);
 	res.json(listKampus);

});

app.get("/prodi/:id", (req, res, next) => {

	let jsonProdi = fs.readFileSync('prodi.json');
	var listProdi=JSON.parse(jsonProdi);
	var idKampus= req.params.id

	var listProdyByIdKampus = listProdi.filter(function(item){
			return item.universitas_id ==idKampus
	})

 	res.json(listProdyByIdKampus);


});


 
function paginate(array, page_size, page_number) {
 
  return array.slice((page_number - 1) * page_size, page_number * page_size);
}