#!/usr/bin/env node

import "zx/globals";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";
import init from "../src/index.mjs";
import { getConfigYaml } from "../src/utils/index.mjs";

// 获取tools项目根目录
$.toolsRootPath = resolve(dirname(fileURLToPath(import.meta.url)), "..");
// 获取tools项目模板文件地址
$.toolsTemplatePath = resolve($.toolsRootPath, "src", "templates");

// 注入全局配置文件
await getConfigYaml();

init(argv);
