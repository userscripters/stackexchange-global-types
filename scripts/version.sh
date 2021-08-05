npm run readme &&
    git add . &&
    git commit --amend --no-edit &&
    git tag -f $(git tag --list | tail -n 1 -)
