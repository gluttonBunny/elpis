module.exports = (app, router) => {
  const { view: ViewController } = app.controller;

  // 用户输入 http://ip:port/view/page1 能渲染出对应的页面
  router.get("/view/:page", ViewController.renderPage.bind(ViewController));
};
