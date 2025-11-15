const { glob } = require("glob");
const path = require("path");
const { sep } = path;

/**
 * middleware loader
 * @param {object} app  Koa 实例
 *
 * 加载所有 middleware， 可通过 'app.middleware.${目录}.${文件}' 访问
 * 
 * eg:
 * app/middleware
      |
      | -- custom-module
              |
              | -- custom-middleware.js
    => app.middleware.customModule.customModuleware
 *
 */

module.exports = (app) => {
  //读取 app/middleware/**/**.js 下所有的文件
  const middlewarePath = path.resolve(app.businessPath, `.${sep}middleware`);
  const fileList = glob.sync(
    path.resolve(middlewarePath, `.${sep}**${sep}**.js`)
  );

  //遍历所有文件目录，把内容加载到 app.middleware 下
  const middlewares = {};
  fileList.forEach((file) => {
    //提取文件名称
    let name = path.resolve(file);

    //截取路径 app/middleware/custom-module/custom-middleware.js => custom-module/custom-middleware.js
    name = name.substring(
      name.lastIndexOf(`middleware${sep}`) + `middleware${sep}`.length,
      name.lastIndexOf(".")
    );

    //把 '-' 统一改为驼峰式，custom-module/custom-middleware => customModule/customModuleware
    name = name.replace(/[_-][a-z]/gi, (s) => s.substring(1).toUpperCase());

    //挂载 middlewares 到内存 app 对象中
    let tempMiddleware = middlewares;
    const names = name.split(sep);
    for (let i = 0, len = names.length; i < len; i++) {
      if (i === len - 1) {
        tempMiddleware[names[i]] = require(path.resolve(file))(app); //require Return: exported module content 返回的都是函数
      } else {
        if (!tempMiddleware[names[i]]) {
          tempMiddleware[names[i]] = {}; //tempMiddleware[app] ->tempMiddleware[app][middlewares]->...
        }
        tempMiddleware = tempMiddleware[name[i]];
      }
    }
  });
  app.middlewares = middlewares;
};
