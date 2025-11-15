<!DOCTYPE html>
<html>
  <head>
    <title>{{ name }}</title>
    <link href="/static/normalize.css" rel="stylesheet" />
    <link href="/static/logo.png" rel="icon" type="image/x-icon" />
  </head>
  <body style="color: red">
    <h1>page1</h1>
    <input id="env" value="{{ env }}" />
    <input id="options" value="{{ options }}" />
    <button type="button" onclick="handleClick()">发送请求</button>
  </body>

  <script src="https://cdn.bootcss.com/axios/0.18.0/axios.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/js-md5@0.8.3/src/md5.min.js"></script>
  <script type="text/javascript">
    try {
      window.env = document.getElementById("env").value;
      window.options = JSON.parse(document.getElementById("options").value);
    } catch (e) {
      console.error(e);
    }
    const handleClick = () => {
      const signKey = "dkdfs255dfdfa15dfa1dfd5fd2";
      const st = Date.now();
      axios.request({
        method: "get",
        url: "/api/project/list",
        params: { proj_key: "test" },
        headers: { s_t: st, s_sign: md5(`${signKey}_${st}`) },
      });
    };
  </script>
</html>
