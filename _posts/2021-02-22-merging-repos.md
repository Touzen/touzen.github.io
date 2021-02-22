---
layout: post
title: Merging repositories
---
Sometimes you run into the unfortunate situation where you receive a code base without its Git history. It may even be the case that you don't even know such a history exists. And so, you run `git init` and start tinkering.

Later, you learn that, in fact, a repo exists! So now you need to find a way to incorporate your changes into the old repo. You resist the impulse to simply clone the new repo and create a big overwriting commit. You are a sophisticated software developer, and you want to include your impeccable commit messages in the newly discovered repo.

1. Add the newly discovered repo as a remote: `git add remote [some-name] [url-to-repo]`
2. Fetch the git history of the new remote: `git fetch [some-name]`
3. Rebase your history on top of the new remote: `git rebase [some-name]/master`
4. Fix all the conflicts
5. SUCCESS

Now pat yourself on the back for wasting your time doing The Right Thing ™ and write a blog post about it.
