var express = require("express");
var path = require("path");
var sd = require("silly-datetime");
var bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");
var session = require("express-session");
var multer = require("multer");
var router = express.Router();
var UserRouter = require("./routers/user.ts");
var UserLogin = require("./routers/login.ts");
var fs = require("fs");
var app = express();

//设置cookie中间件
app.use(cookieParser());

//设置session中间件
app.use(
  session({
    secret: "123445",
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 1000 * 60,
      secure: false, //设置为true的时候表示只有https协议才能访问cookie
    },
  })
);

//配置静态资源过滤
app.use(express.static(path.join(__dirname, "./static")));

//配置日志处理
app.use((req, res, next) => {
  console.log(
    `时间：[${sd.format(new Date(), "YYYY-MM-DD HH:mm")}]       请求地址：[${
      req.url
    }]`
  );
  next();
});

//配置权限处理

//配置路由模块

app.use("/user", UserRouter);

app.use("/login", UserLogin);

//默认首页
app.get("/", function (req, res) {
  res.send("Hello World");
});

//处理错误页面
app.use((req, res, next) => {
  res.status(404).send("默认4.4错误页面");
});

app.listen(3000, (err) => {
  err ? console.log(err) : console.log("服务已启动！");
});
