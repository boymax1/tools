import { existsSync } from "node:fs";
import { writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import inquirer from "inquirer";

const rootPath = process.cwd();
const api = "https://api.github.com/gitignore/templates";
const fileName = ".gitignore";

/**
 * 获取.gitignore可选模板类型
 */
const getList = async () => {
  const response = await fetch(api);
  const data = await response.json();
  return data;
};

/**
 * 获取模板文件并生成.gitignore
 */
const getTemplate = async (name) => {
  let msg = "";
  await spinner(`${name}${fileName} 文件拉取中...`, async () => {
    const response = await fetch(`${api}/${name}`);
    const data = await response.json();
    if (data && data.source) {
      await writeFile(resolve(rootPath, fileName), data.source);
    } else {
      msg = data?.message || "not found";
    }
  });
  if (msg) {
    console.log(chalk.red(msg));
  } else {
    console.log(chalk.green(`${fileName} 文件创建成功!`));
  }
};

/** 执行交互式创建.gitignore */
const createGitignore = async (name) => {
  // 文件存在，则直接退出
  if (existsSync(resolve(rootPath, fileName))) {
    console.log(chalk.red(`${fileName}文件已存在!`));
    return;
  }
  if (name) {
    return getTemplate(`${name[0].toUpperCase()}${name.slice(1)}`);
  }
  const choices = await getList();
  const answers = await inquirer.prompt([
    {
      type: "list",
      name: "name",
      message: "Select template name: ",
      choices,
    },
  ]);
  getTemplate(answers.name);
};

/**
 * 交互式创建.gitignore文件
 *
 * 使用方式：tools -g [template_name]
 * @param {object} argv - {@link https://google.github.io/zx/api#argv argv}
 * @param {true} argv.g
 * @param {string|undefined} argv.name - 模板名称
 */
const execGitignore = (argv) => {
  const { g, name } = argv;
  if (g) {
    createGitignore(name);
  }
};

export default execGitignore;
