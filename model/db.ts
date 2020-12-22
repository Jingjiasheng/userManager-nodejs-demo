var mongoose = require("mongoose");

//创建数据库连接
mongoose.connect(
  "mongodb://127.0.0.1:27017/test",
  { useUnifiedTopology: true },
  (err, result) => {
    if (err) {
      console.log(err);
      return;
    }
    console.log("mongodb 数据库连接成功：" + result);
  }
);

module.exports = mongoose;
