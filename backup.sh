#!/bin/bash

# 进入数据目录
cd /home/one/story

# 添加所有变化
/usr/bin/git add .

# 检查是否有内容需要提交，避免产生空 commit
if ! /usr/bin/git diff-index --quiet HEAD --; then
    # 自动以当前时间作为 commit 信息
    /usr/bin/git commit -m "Auto backup: $(date '+%Y-%m-%d %H:%M:%S')"
    # 推送到远程 main 分支
    /usr/bin/git push origin master
fi

