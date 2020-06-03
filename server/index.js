import React from "react";
import Router from "koa-router";
import { StaticRouter } from "react-router-dom"; //react的路由换成这个
import { renderToString } from "react-dom/server"; //这个是渲染react组件的
import Koa from "koa";
import KoaStatic from "koa-static";
import fs from "fs";
import path from "path";
import NowPlaying from "../src/component/nowPlaying/index2";

const app = new Koa();
const router = new Router();
router.get("/", async (ctx) => {
  const context = {};
  //把你react App组件内的东西放到这里来！你可以尝试直接返回出结果，就是root内容
  const reactAppString = await renderToString(
          <StaticRouter location={ctx.url} context={context}>
              <NowPlaying />
          </StaticRouter>
  );
  //indexFile先把文件读取出来
  const indexFile = await path
    .resolve(__dirname + "build/index.html")
    .replace("server", "");
  const data = await fs.readFileSync(indexFile, "utf8", function (err, data) {
    return data;
  });
  //替换root内容为之前的reactAppString
  let dataReplaced = await data.replace(
    '<div id="root"></div>',
    `<div id="root">${reactAppString}</div>`
  );
  // console.log(dataReplaced);
  //最后返回出去
  ctx.body = dataReplaced;
});

app.use(router.routes());
app.use(router.allowedMethods());

//static记得一定要写在这里，不然首页会默认导到build/index.html，root内没有内容
app.use(KoaStatic(path.resolve(__dirname + "build").replace("server", "")));
app.listen(8889, () => {
  console.log("ssr starting");
});
