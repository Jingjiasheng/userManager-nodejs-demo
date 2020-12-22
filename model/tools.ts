var multer = require("multer");
var path = require("path");
var sd = require('silly-datetime')
var mkdirp=require('mkdirp')

let tools={
    multer() {

      //定义上传文件的存放目录
      var storage = multer.diskStorage({
        destination: async function (req, file, cb) {
          //按照时间戳进行文件的分组存放
          let dir = path.join(
            "./static/upload",
            sd.format(new Date(), "YYYYMMDD")
          );

          await mkdirp(dir);

          cb(null, dir);
        },

        //定义上传文件的名称
        filename: function (req, file, cb) {
          //获取文件的后缀名
          let extname = path.extname(file.originalname);
          //根据时间戳重命名文件名
          cb(null, +Date.now() + "-" + file.originalname + extname);
        },
      });
      var upload = multer({ storage: storage });
      return upload;
    }
}

module.exports=tools
