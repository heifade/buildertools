let styles = require("./css/app.less");


let div = document.createElement("div");
div.innerHTML = "您好，欢迎使用 buildertools 工具！";
div.className = styles.app;
document.body.appendChild(div);