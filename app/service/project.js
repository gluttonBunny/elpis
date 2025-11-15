module.exports = (app) => {
  const BaseService = require("./base")(app);
  return class ProjectService extends BaseService {
    async getList() {
      return [
        {
          name: "project1",
          desc: "project 1 description",
        },
        {
          name: "project2",
          desc: "project 2 description",
        },
        {
          name: "project3",
          desc: "project 3 description",
        },
      ];
    }
  };
};
