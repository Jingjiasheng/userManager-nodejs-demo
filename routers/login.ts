var express = require("express");
var fs = require("fs");
var bodyParser = require("body-parser");
var multer = require("multer");
var path = require("path");
var fileTool=require('../model/tools.ts')
var router = express.Router();
var app = express();
var urlencodedParser = bodyParser.urlencoded({ extended: false });


router.get("/", (req, res) => {
  fs.readFile("./view/login.html", (err, data) => {
    if (err) {
      console.log(err);
      return;
    }
    res.writeHead(200, { "Content-Type": "text/html;charset=UTF-8" });
    res.end(data);
  });
});

//多文件上传处理[后面maxCount代表的是文件的数量]
// var cpUpload = fileTool.multer.fields([
//   { name: "fileName1", maxCount: 1 },
//   { name: "fileName2", maxCount: 1 },
// ]);

router.post("/doLogin", urlencodedParser, fileTool.multer().single('pic'), (req, res) => {
  console.log(req.body, req.file);
  res.cookie("username", req.body.username, { maxAge: 1000 * 30 });
  req.session.password = req.body.password;
  res.end(req.body.username);
});

module.exports = router;
