module.exports = (app, router) => {
  const { project: projectController } = app.controller;

  // 用户输入 http://ip:port/view/page1 能渲染出对应的页面
  router.get(
    "/api/project/list",
    projectController.getList.bind(projectController)
  );
};
