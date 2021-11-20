# AutoTask

## 使用说明

> 目前还没UI, 所以暂时使用控制台

### 安装

https://github.com/HCLonely/auto-task-new/raw/main/dist/auto-task.user.js

### 全局变量website

- 做任务：website.doTask()
- 取消做任务：website.undoTask()
- 验证任务：website.verifyTask()

## todo

- [ ] 变量名重构
- [ ] 变量初始化
- [ ] 任务历史
- [x] 白名单
- [-] 函数注释
- [ ] 不同阶段注册函数
- [x] 需要登录
- [ ] 任务识别修改
- [ ] 传链接
- [ ] steam更换地区优化
- [x] 任务完成提示
- [ ] 任务处理
- [x] 保存任务去重
- [ ] 剩余key检测
- [ ] 功能模板
- [ ] 剩余key检测不报错
- [ ] 验证不用存储tasks
- [ ] 获取任务信息优化，不重复获取
- [ ] bug反馈

### 存储机制

- [x] #auth改GM_value
- [x] token 保存读取
- [x] id转换保存
- [x] 缓存get,set

### 说明

- [ ] reddit使用新版
- [ ] 验证token关注官方帐号
- [ ] 版本转换提醒
- [ ] 不能取消的task
- [ ] 社交账号更新凭证时如果没登录会提示更新失败，登陆后需要重新更新
- [ ] Opquests网站不支持取消任务
- [ ] ins封禁说明
