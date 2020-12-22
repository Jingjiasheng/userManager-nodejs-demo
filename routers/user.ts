var express = require("express");
var router = express.Router();
var User = require("../model/user.ts");

router.get("/getLoginInfo", function (req, res) {
  res.send(
    `cookie中获取的用户名为：${req.cookies.username}-session中获取到的密码为：${req.session.password}`
  );
});

//执行查询数据的操作
router.get("/", function (req, res) {
  // User.find({}, (err, doc) => {
  //   if (err) {
  //     console.log(err);
  //     return;
  //   }
  //   console.log(doc);
  //   res.send(doc);
  // });
  User.findByUserAge(23, (err, doc) => {
    if (err) {
      console.log(err);
      return;
    }
    console.log(doc);
    res.send(doc);
  });
});

//执行添加数据的操作
router.get("/add", function (req, res) {
  //实例化一个数据模型
  var user = new User({
    name: "家政审",
    age: 22,
    sex: "男",
  });
  //执行实例的save方法
  user.save((err, result) => {
    if (err) {
      console.log(err);
      return;
    }
    console.log("add success" + result);
    res.send("add success" + result);
  });
});

//执行数据的修改
router.get("/edit", function (req, res) {
  User.updateOne(
    { _id: "5fe14e8d00f8035ad023b646" },
    { name: "贾正申" },
    (err, result) => {
      if (err) {
        console.log(err);
        return;
      }
      console.log("update success" + result);
      res.send("update success" + result);
    }
  );
});

//执行数据的删除
router.get("/delete", function (req, res) {
  User.deleteOne({ _id: "5fe14e8d00f8035ad023b646" }, (err, result) => {
    if (err) {
      console.log(err);
      return;
    }
    console.log("delete success" + result);
    res.send("delete success" + result);
  });
});

module.exports = router; //暴露这个 router模块
