import execContributors from "./snippets/execContributors.mjs";
import execWatch from "./snippets/execWatch.mjs";
import execGitignore from "./snippets/execGitignore.mjs";
import execVsCode from "./snippets/execVsCode.mjs";
import execToggleGitInfo from "./snippets/execToggleGitInfo.mjs";

const init = (argv) => {
  execWatch(argv);
  execContributors(argv);
  execGitignore(argv);
  execVsCode(argv);
  execToggleGitInfo(argv);
};

export default init;
