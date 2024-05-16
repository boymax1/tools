import { resolve } from "node:path";
import { existsSync, readFileSync } from "node:fs";

/** 获取当前环境包管理工具 */
export const getPackageManager = () => {
  const cwd = process.cwd();
  if (existsSync(resolve(cwd, "pnpm-lock.yaml"))) {
    return "pnpm";
  }
  if (existsSync(resolve(cwd, "yarn.lock"))) {
    return "yarn";
  }

  return "npm";
};

/** 复制模板文件 */
export const copyTemplate = async (name, targetPath) => {
  try {
    await fs.copy(resolve($.toolsTemplatePath, name), targetPath);
    console.log(chalk.green(name + " success!"));
  } catch (err) {
    console.error(err);
  }
};

/** 注入yaml配置文件 */
export const getConfigYaml = () => {
  return new Promise((res) => {
    try {
      const configPath = resolve($.toolsRootPath, "config.yaml");
      if (existsSync(configPath)) {
        const file = readFileSync(configPath, "utf8");
        const info = YAML.parse(file);
        Object.entries(info).forEach(([key, value]) => {
          $[key] = value;
        });
      }
      res(true);
    } catch (error) {
      rej(error);
    }
  });
};
