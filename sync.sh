#!/bin/bash

# 读取 sync.json 并解析其内容
CONFIG_FILE="sync.json"
CHANGES=""

jq -c '.[]' $CONFIG_FILE | while read -r repo; do
  SYNC_URL=$(echo $repo | jq -r '.sync')
  TARGET_PATH=$(echo $repo | jq -r '.path')
  SCRIPTS=$(echo $repo | jq -r '.scripts[]')

  # 进入目标目录
  cd $TARGET_PATH || continue

  # 克隆仓库
  REPO_NAME=$(basename $SYNC_URL .git)
  git clone $SYNC_URL $REPO_NAME

  # 执行脚本
  for SCRIPT in "${SCRIPTS[@]}"; do
    eval $SCRIPT
  done

  # 删除克隆的仓库
  rm -rf $REPO_NAME

  # 记录更改的文件
  CHANGED_FILES=$(git status --porcelain | awk '{print $2}')
  if [ -n "$CHANGED_FILES" ]; then
    CHANGES="--------------------------------\nDate: $(date)\n\nChanges in ${TARGET_PATH}:\n${CHANGED_FILES}\n"
  fi

  # 返回上级目录
  cd - > /dev/null
done

# 添加更改到 git
git add docs/
git config --global user.name 'github-actions[bot]'
git config --global user.email 'github-actions[bot]@users.noreply.github.com'
git commit -m "Update tutorials" || echo "No changes to commit"

# 输出更改的内容到文件
if [ -n "$CHANGES" ]; then
  echo -e $CHANGES >> changes.txt  # 追加到文件中
else
  echo "No changes detected." > changes.txt  # 若没有更改，则写入相应信息
fi
