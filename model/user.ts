var mongoose = require("./db.ts");

// 创建映射model
var UserSchema = mongoose.Schema({
  name: {
    //字段类型
    type: String,
    //是否是必填字段
    require: true,
    //存入前消除两端空格
    trim: true,
    //自定义数据校验方法
    validate: function (name) {
      return name.length != 0;
    },
  },
  age: {
    type: Number,
    //数据最大值
    max: 150,
    //数据最小值
    min: 0,
  },
  sex: {
    type: String,
    //使用枚举列出字段值的可选数据
    enum: ["男", "女"],
  },
});

//添加自定义件静态方法【利用年龄获取数据】
UserSchema.statics.findByUserAge = function (userAge, cb) {
  this.find({ age: userAge }, function (err, doc) {
    cb(err, doc);
  });
};

//第一个参数会自动与users表建立关联，所以必须指定第三个参数，第三个参数标识关联的数据库中的表名
var User = mongoose.model("User", UserSchema, "user");

module.exports = User;
