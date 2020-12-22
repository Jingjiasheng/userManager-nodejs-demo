# NodeJs开发指南

## 项目初始化

### 命令

> 当前文件夹执行命令 `cnpm init`即可

## Express使用

### 安装

> `cnpm i express –save`

### 引入

> `var express = require("express");`
>
> 实例化：
>
> `var app = express();`

### 使用

#### 基本请求处理

> 处理首页请求示例：
>
> ```javascript
> app.get("/", function (req, res) {
> res.send("Hello World");
> });
> ```
>
> 设置端口监听启动服务示例：
>
> ```javascript
> app.listen(3000, (err) => {
>   err ? console.log(err) : console.log("服务已启动！");
> });
> ```

#### 静态资源过滤

> ```javascript
> //配置静态资源过滤
> app.use(express.static(path.join(__dirname, "./static")));
> ```

#### 自定义控制台日志处理中间件

> ```javascript
> //配置日志处理
> app.use((req, res, next) => {
>   console.log(
>     `时间：${sd.format(new Date(), "YYYY-MM-DD HH:mm")}请求地址：${req.url}`
>   );
>   next();
> });
> ```

#### 错误处理页面

> **注意：错误处理页面位于所有请求的最后面，当所有请求无法匹配时最后执行**
>
> ```javascript
> //处理错误页面
> app.use((req, res, next) => {
>   res.status(404).send("默认4.4错误页面");
> });
> ```

## fs文件操作

### 引入模块

> `var fs = require("fs");`

### 加载html文件示例

> ```javascript
> router.get("/", (req, res) => {
>   fs.readFile("./view/login.html", (err, data) => {
>     if (err) {
>       console.log(err);
>       return;
>     }
>     res.writeHead(200, { "Content-Type": "text/html;charset=UTF-8" });
>     res.end(data);
>   });
> });
> ```

## Router使用

### 安装

> `cnpm i router --save`

### 引入

> **注意：需要使用express实例化**
>
> `var router = express.Router();`

### 使用

> 引入外部封装好的路由模块
>
> `var UserLogin = require("./routers/login.ts");`
>
> 将路由模块与相应的请求路径进行绑定
>
> `app.use("/login", UserLogin);`

>  外部路由封装【login.js】
>
> ```javascript
> var express = require("express");
> var fs = require("fs");
> var bodyParser = require("body-parser");
> var multer = require("multer");
> var path = require("path");
> var fileTool=require('../model/tools.ts')
> var router = express.Router();
> var app = express();
> var urlencodedParser = bodyParser.urlencoded({ extended: false });
> 
> 
> 
> router.get("/", (req, res) => {
>   fs.readFile("./view/login.html", (err, data) => {
>     if (err) {
>       console.log(err);
>       return;
>     }
>     res.writeHead(200, { "Content-Type": "text/html;charset=UTF-8" });
>     res.end(data);
>   });
> });
> 
> //多文件上传处理[后面maxCount代表的是文件的数量]
> var cpUpload = fileTool.multer.fields([
>   { name: "fileName1", maxCount: 1 },
>   { name: "fileName2", maxCount: 1 },
> ]);
> 
> router.post("/doLogin", urlencodedParser, fileTool.multer().single('pic'), (req, res) => {
>   console.log(req.body, req.file);
>   res.cookie("username", req.body.username, { maxAge: 1000 * 30 });
>   req.session.password = req.body.password;
>   res.end(req.body.username);
> });
> //暴露路由
> module.exports = router;
> 
> ```

## body-parser使用

### 安装

> `cnpm i body-parser --save`

### 引入

> `var bodyParser = require("body-parser");`

### 配置

> `var urlencodedParser = bodyParser.urlencoded({ extended: false });`

### 使用

> 示例：
>
> ```javascript
> router.post("/doLogin", urlencodedParser, fileTool.multer().single('pic'), (req, res) => {
>   console.log(req.body, req.file);
>   res.cookie("username", req.body.username, { maxAge: 1000 * 30 });
>   req.session.password = req.body.password;
>   res.end(req.body.username);
> });
> ```
>
> **注意：**专门处理post请求表单参数取值
>
> `post`请求需要加入参数`urlencodedParser`
>
> 取值的时候直接使用`req.body.username`即可取出`username`

### 另附get请求取值

> `req.query.username`即可取出里面的参数值

## cookie使用

### 安装

> `cnpm i cookie-parser --save`

### 引入

> `var cookieParser = require("cookie-parser");`

### 使用

> 主程序所有请求之前设置中间件，全局均可使用
>
> `app.use(cookieParser());`
>
> 设置cookie
>
> `res.cookie("username", req.body.username, { maxAge: 1000 * 30 });`
>
> 获取cookie中的值
>
> `req.cookies.username`

> **设置cookie时第三个参数中的可选参数说明**
>
> `domain`: 域名
>
>   `expires`： 过期时间（秒），在设置的某个时间点后该 Cookie 就会失效，如 expires=Wednesday, 09-Nov-99 23:12:40 GMT
>
>   `maxAge`： 最大失效时间（毫秒），设置在多少后失效
>
>   `secure`： 当 secure 值为 true 时，cookie 在 HTTP 中是无效，在 HTTPS 中才有效
>
>   `path`： 表示 cookie 影响到的路，如 path=/。如果路径不能匹配时，浏览器则不发送这个Cookie
>
>   `httpOnly`：是微软对COOKIE做的扩展。如果在COOKIE中设置了“httpOnly”属性，则通过程序（JS脚本、applet等）将无法读取到COOKIE信息，防止XSS攻击产生
>
>   `signed`：表示是否签名cookie, 设为true 会对这个cookie 签名，这样就需要用res.signedCookies而不是res.cookies访问它。被篡改的签名cookie 会被服务器拒绝，并且cookie 值会重置为它的原始值

## session使用

### 安装session模块

> `cnpm i express-session --save`

### 引入

> **注意：session需要与cookie配套使用，使用前必须引入cookie相关模块**
>
> `var session = require("express-session");`

### 使用

> 主程序引入之后全局可使用
>
> 设置session
>
> `req.session.password='123456'`
>
> 获取session中的值
>
> `req.session.password`



## multer组件使用

### 安装

> `npm install --save multer`

### 引入

> `var multer  = require('multer')`

### 添加配置

> 配置实例：
>
> ```javascript
> var multer = require("multer");
> var path = require("path");
> var sd = require('silly-datetime')
> var mkdirp=require('mkdirp')
> 
> let tools={
>     multer() {
> 
>       //定义上传文件的存放目录
>       var storage = multer.diskStorage({
>         destination: async function (req, file, cb) {
>           //按照时间戳进行文件的分组存放
>           let dir = path.join(
>             "./static/upload",
>             sd.format(new Date(), "YYYYMMDD")
>           );
>           await mkdirp(dir);
>           cb(null, dir);
>         },
> 
>         //定义上传文件的名称
>         filename: function (req, file, cb) {
>           //获取文件的后缀名
>           let extname = path.extname(file.originalname);
>           //根据时间戳重命名文件名
>           cb(null, +Date.now() + "-" + file.originalname + extname);
>         },
>       });
>       var upload = multer({ storage: storage });
>       return upload;
>     }
> }
> 
> module.exports=tools
> ```

### 使用

> 引入自定义文件上传模块
>
> `var fileTool=require('../model/tools.ts')`
>
> 在获取上传文件的表单处理方法中添加参数`fileTool.multer.single('fileName')`
>
> ```javascript
> router.post("/doLogin", urlencodedParser, fileTool.multer().single('pic'), (req, res) => {
>   console.log(req.body, req.file);
>   res.cookie("username", req.body.username, { maxAge: 1000 * 30 });
>   req.session.password = req.body.password;
>   res.end(req.body.username);
> });
> ```

### 多文件上传 添加配置

> 定义上传文件数组
>
> ```javascript
> //多文件上传处理[后面maxCount代表的是文件的数量]
> var cpUpload = fileTool.multer.fields([
>   { name: "fileName1", maxCount: 1 },
>   { name: "fileName2", maxCount: 1 },
> ]);
> ```
>
> 更改请求参数设置
>
> ```javascript
> router.post("/doLogin", urlencodedParser, cpUpload, (req, res) => {
>   console.log(req.body, req.file);
>   res.cookie("username", req.body.username, { maxAge: 1000 * 30 });
>   req.session.password = req.body.password;
>   res.end(req.body.username);
> });
> ```

## mongoose使用

### 安装

> ` cnpm install mongoose --save`

### 引入

> `const mongoose = require('mongoose');`

### 初始化数据库连接

> ```javascript
> //创建数据库连接
> mongoose.connect(
>   "mongodb://127.0.0.1:27017/test",
>   { useUnifiedTopology: true },
>   (err, result) => {
>     if (err) {
>       console.log(err);
>       return;
>     }
>     console.log("mongodb 数据库连接成功：" + result);
>   }
> );
> ```

### 数据库连接封装模板

> ```javascript
> var mongoose = require("mongoose");
> 
> //创建数据库连接
> mongoose.connect(
>   "mongodb://127.0.0.1:27017/test",
>   { useUnifiedTopology: true },
>   (err, result) => {
>     if (err) {
>       console.log(err);
>       return;
>     }
>     console.log("mongodb 数据库连接成功：" + result);
>   }
> );
> 
> module.exports = mongoose;
> 
> ```

### 创建数据model

#### 引入数据库连接模块

> `var mongoose = require("./db.ts");`

#### 创建表-数据映射

> ```javascript
> // 创建映射model
> var UserSchema = mongoose.Schema({
>   name: {
>     //字段类型
>     type: String,
>     //是否是必填字段
>     require: true,
>     //存入前消除两端空格
>     trim: true,
>     //自定义数据校验方法
>     validate: function (name) {
>       return name.length != 0;
>     },
>   },
>   age: {
>     type: Number,
>     //数据最大值
>     max: 150,
>     //数据最小值
>     min: 0,
>   },
>   sex: {
>     type: String,
>     //使用枚举列出字段值的可选数据
>     enum: ["男", "女"],
>   },
> });
> ```

[更多字段类型规范](http://mongoosejs.net/docs/validation.html)

#### 添加自定义的查询或其他数据库操作方法

> ```javascript
> //添加自定义件静态方法【利用年龄获取数据】
> UserSchema.statics.findByUserAge = function (userAge, cb) {
>   this.find({ age: userAge }, function (err, doc) {
>     cb(err, doc);
>   });
> };
> ```

#### 进行数据表与模型绑定，创建数据操作对象

> *//第一个参数会自动与users表建立关联，所以必须指定第三个参数，第三个参数标识关联的数据库中的表名*
>
> `var User = mongoose.model("User", UserSchema, "user");`

### model封装示例

> ```javascript
> var mongoose = require("./db.ts");
> 
> // 创建映射model
> var UserSchema = mongoose.Schema({
>   name: {
>     //字段类型
>     type: String,
>     //是否是必填字段
>     require: true,
>     //存入前消除两端空格
>     trim: true,
>     //自定义数据校验方法
>     validate: function (name) {
>       return name.length != 0;
>     },
>   },
>   age: {
>     type: Number,
>     //数据最大值
>     max: 150,
>     //数据最小值
>     min: 0,
>   },
>   sex: {
>     type: String,
>     //使用枚举列出字段值的可选数据
>     enum: ["男", "女"],
>   },
> });
> 
> //添加自定义件静态方法【利用年龄获取数据】
> UserSchema.statics.findByUserAge = function (userAge, cb) {
>   this.find({ age: userAge }, function (err, doc) {
>     cb(err, doc);
>   });
> };
> 
> //第一个参数会自动与users表建立关联，所以必须指定第三个参数，第三个参数标识关联的数据库中的表名
> var User = mongoose.model("User", UserSchema, "user");
> 
> module.exports = User;
> 
> ```

### 使用

#### 引入数据对象模块

> `var User = require("../model/user.ts");`

#### 执行自定义的静态方法

> ```javascript
> //执行查询数据的操作
> router.get("/", function (req, res) {
>   User.findByUserAge(23, (err, doc) => {
>     if (err) {
>       console.log(err);
>       return;
>     }
>     console.log(doc);
>     res.send(doc);
>   });
> });
> ```

#### 执行普通数据查询方法

> ```javascript
> //执行查询数据的操作
> router.get("/", function (req, res) {
>    User.find({}, (err, doc) => {
>       if (err) {
>         console.log(err);
>         return;
>       }
>       console.log(doc);
>       res.send(doc);
>     });
> });
> ```

#### 执行添加数据方法

> ```javascript
> //执行添加数据的操作
> router.get("/add", function (req, res) {
>   //实例化一个数据模型
>   var user = new User({
>     name: "家政审",
>     age: 22,
>     sex: "男",
>   });
>   //执行实例的save方法
>   user.save((err, result) => {
>     if (err) {
>       console.log(err);
>       return;
>     }
>     console.log("add success" + result);
>     res.send("add success" + result);
>   });
> });
> ```

#### 执行数据修改方法

> ```javascript
> //执行数据的修改
> router.get("/edit", function (req, res) {
>   User.updateOne(
>     { _id: "5fe14e8d00f8035ad023b646" },
>     { name: "贾正申" },
>     (err, result) => {
>       if (err) {
>         console.log(err);
>         return;
>       }
>       console.log("update success" + result);
>       res.send("update success" + result);
>     }
>   );
> });
> ```

#### 执行数据删除方法

> ```javascript
> //执行数据的删除
> router.get("/delete", function (req, res) {
>   User.deleteOne({ _id: "5fe14e8d00f8035ad023b646" }, (err, result) => {
>     if (err) {
>       console.log(err);
>       return;
>     }
>     console.log("delete success" + result);
>     res.send("delete success" + result);
>   });
> });
> ```

























































