# AI Hub

这是一个个人 AI 工具与 Agent 快速入口页面，已部署到 GitHub Pages（Project site）。

站点地址（Pages）：https://xjtsinghua.github.io/ai_hub/

关于“永久访问”：
- GitHub Pages 由 GitHub 托管，只要仓库存在且 Pages 设置保持启用，页面即可长期访问。若用户删除仓库或更改 Pages 设置，访问将中断。

如何更新：
1. 在本地编辑 AI-site 下的文件（index.html, styles.css, script.js）。
2. git add/commit 并 push 到远程仓库的 gh-pages 分支（或你选择的 Pages 源分支）。

简单部署命令示例：

  git add .
  git commit -m "Update site content\n\nCo-authored-by: Copilot <223556219+Copilot@users.noreply.github.com>"
  git push origin gh-pages

如果想将站点改为 User site（username.github.io），请创建名为 `xjtsinghua.github.io` 的仓库并将内容推送到该仓库的 main 分支。

如需为域名添加 CNAME，创建一个名为 `CNAME` 的文件并写入你的自定义域名，然后 push 到 Pages 源分支。