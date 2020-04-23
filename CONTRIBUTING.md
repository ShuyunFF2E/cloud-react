## 贡献指南

1. 功能性开发：one component，one feature，one commit。
2. 修复 issue: one issue，one commit，便于代码 review 和出问题后追踪，撤销。
3. 开发一半要提交怎么办？直接`commit`，但是请不要`push`，等到完成开发完成之后`amend commit`。
4. 开发了一半，`commit`了，手贱也`push`了，怎么办？那么请了解一下`git rebase`合并下您的`commit`记录，然后`git push --force`了解下。谨记，这个只限于你自己的分支。不要在多个人同时使用的分支上使用`force push`。
5. 提交代码的时候`message`要足够清晰，并且选用最适合这个`message`的`emoji`（github 开源项目流行做法）。了解一下[https://gitmoji.carloscuesta.me/](https://gitmoji.carloscuesta.me/)。
