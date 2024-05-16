import { existsSync } from "node:fs";
import { resolve } from "node:path";
import { copyTemplate } from "../utils/index.mjs";

/**
 * 复制.vscode配置
 *
 * 使用方式：tools --vscode
 * @param {object} argv - {@link https://google.github.io/zx/api#argv argv}
 * @param {true} argv.vscode
 */
const execVsCode = async (argv) => {
  const { vscode } = argv;
  if (vscode) {
    const extPath = resolve(process.cwd(), ".vscode/extensions.json");
    const setPath = resolve(process.cwd(), ".vscode/settings.json");
    if (!existsSync(extPath)) {
      // 复制模板中的.vscode：详见utils/
      copyTemplate(".vscode/extensions.json", extPath);
    } else {
      console.log(chalk.red(".vscode/extensions.json已存在"));
    }
    if (!existsSync(setPath)) {
      copyTemplate(".vscode/settings.json", setPath);
    } else {
      console.log(chalk.red(".vscode/settings.json已存在"));
    }
  }
};

export default execVsCode;
