# AutoTask

## 使用说明

> 目前还没UI, 所以暂时使用控制台

### 全局变量

> 除`gs`和`keylol`外，其他变量直接使用`const website = new Website();`
> 1. 创建对象`const website = new Freeanywhere();`(`gs`和`keylol`对象已创建，不需要这一步)
> 2. 做任务： `website.doTask();`/`gs.doTask();`
> 3. 取消做任务： `website.undoTask();`/`gs.doTask();`
> 4. 验证任务： `website.undoTask();`(部分网站支持)

- Freeanywhere
- Indiedb
- Keyhub
- Givekey
- GiveeClub
- OpiumPulses
- gs
- keylol

## todo

- [ ] 变量名重构
- [ ] 变量初始化
- [ ] 任务历史
- [x] 白名单
- [ ] 函数注释
- [ ] 不同阶段注册函数
- [x] 需要登录
- [ ] 任务识别修改
- [ ] 传链接
- [ ] steam更换地区
- [x] 任务完成提示
- [ ] 任务处理
- [x] 保存任务去重
- [ ] 剩余key检测
- [ ] 功能模板
- [ ] 剩余key检测不报错
- [ ] 验证不用存储tasks
- [ ] 获取任务信息优化，不重复获取

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
