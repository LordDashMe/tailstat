# Windows

## /bin/bash^M: bad interpreter: No such file or directory

- This error will appear when you run the TailStat bash scripts; to avoid it, run the following commands in Git Bash:

  ```sh
  $ git config core.eol lf
  $ git config core.autocrlf false
  $ git rm -rf --cached .
  $ git reset --hard HEAD
  ```