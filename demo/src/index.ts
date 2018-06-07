let styles = require("./css/app.less");
let $ = require("jQuery");

import { Student } from "./modules/Student";

// declare var $: any;

// let div = document.createElement("div");
// div.innerHTML = "您好，欢迎使用 buildertools 工具！";
// div.className = styles.app;
// document.body.appendChild(div);

$(`<div class="${styles.app}">您好，欢迎使用 buildertools 工具！1123</div>`).appendTo(document.body);


console.log(new Student(1, 'aa', 'aa'));