/**
 * 在控制台输出当前项目的贡献者名单
 *
 * 使用方式：tools -a
 * @param {object} argv - {@link https://google.github.io/zx/api#argv argv}
 * @param {true} argv.a
 */
const execContributors = async (argv) => {
  const { a } = argv;
  if (a) {
    const authors = new Set();
    // git获取提交记录中author
    const { stdout: logs } = await $`git log --pretty=format:"%an"`.quiet();
    // author去重
    (logs || "")
      .split("\n")
      .forEach((item) => item && authors.add(item.trim()));

    console.log([...authors]);
  }
};

export default execContributors;
