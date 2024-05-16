/**
 * 查看或切换个人/公司git信息
 *
 * 使用方式 - 1：tools --git -p  切换为个人
 *
 * 使用方式 - 2：tools --git -c  切换为公司
 * @param {object} argv - {@link https://google.github.io/zx/api#argv argv}
 * @param {true} argv.git
 * @param {true|undefined} argv.p
 * @param {true|undefined} argv.c
 */
const execToggleGitInfo = async (argv) => {
  const { git, p, c } = argv;
  if (git) {
    let { stdout: name } = await $`git config --global user.name`.quiet();
    let { stdout: email } = await $`git config --global user.email`.quiet();

    name = name.replace(/\s/, "");
    email = email.replace(/\s/, "");

    // 下面p_name、p_email、c_name、c_email是在入口处通过配置文件注入
    if (p && $.p_name && $.p_name !== name) {
      name = $.p_name;
      // 设置个人昵称
      await $`git config --global user.name ${$.p_name}`;
    }
    if (p && $.p_email && $.p_email !== email) {
      email = $.p_email;
      // 设置个人邮箱
      await $`git config --global user.email ${$.p_email}`;
    }
    // 个人与公司不能同时设置
    if (!p && c && $.c_name && $.c_name !== name) {
      name = $.c_name;
      // 设置企业中的昵称
      await $`git config --global user.name ${$.c_name}`;
    }
    if (!p && c && $.c_email && $.c_email !== email) {
      email = $.c_email;
      // 设置企业中的邮箱
      await $`git config --global user.email ${$.c_email}`;
    }

    // 回显昵称/邮箱
    console.log(chalk.green(`当前git信息：\n${name}\n${email}`));
  }
};

export default execToggleGitInfo;
