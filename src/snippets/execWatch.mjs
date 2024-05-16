import nodemon from "nodemon";
import { getPackageManager } from "../utils/index.mjs";

/**
 * 执行文件/目录的监听，当其变化时重新启动项目：
 *
 * 使用方式：tools -w .env
 * @param {object} argv - {@link https://google.github.io/zx/api#argv argv}
 * @param {true|string|string[]} argv.w
 */
const execWatch = (argv) => {
  const { w } = argv;
  if (w) {
    const watchFiles = { boolean: [".env"], string: [w], object: w }[typeof w];

    // 类似于执行：nodemon -w .env -x 'npm start'
    nodemon(`-w ${watchFiles.join(" -w ")} -x '${getPackageManager()} start'`);
  }
};

export default execWatch;
