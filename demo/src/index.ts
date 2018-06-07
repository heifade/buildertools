let styles = require("./css/app.less");
let $ = require("jQuery");

import { Student } from "./modules/Student.ts";

// declare var $: any;

// let div = document.createElement("div");
// div.innerHTML = "您好，欢迎使用 buildertools 工具！";
// div.className = styles.app;
// document.body.appendChild(div);

$(`<div class="${styles.app1}">您好，欢迎使用 buildertools 工具！</div>`).appendTo(document.body);
$(`<div class="${styles.app2}"></div>`).appendTo(document.body);
$(`<div class="${styles.app3}"></div>`).appendTo(document.body);

console.log(new Student(1,'a','a'));