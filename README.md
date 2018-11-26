# admin-cli
English | [简体中文](./README.zh-CN.md)
本admin是采用ant作为ui组件,dva作为数据流,便于快速上手

# 

## Features


## Templates未完待续

```
config目录用于处理各种配置文件
- layout
 - BaseLayout     用于工程基础页面,涉及页面权限,等页面放在此框
 - Exception      用于页面错误的分发
 - UserLayout     用于用户登录等业务的分发
 - StaticLayout   用于无交互,无权限静态页面的分发,后期可扩展
- model       --model使用jsx格式会报错,使用js文件,
 - gobal      页面全局交互使用
 - user       用户信息数据

- route
 - Home         系统首页
   - IndexPage    首页
   - ChartList    首页图标查看全部页面
 -Details       数据详情页面
   - Detail  一级详情页面
 -Demention     地表数据页面
 - Login        用户登录页面相关
   - WeChartLogin        用户登录页面,工程的入口页面
```

## Usage

```bash
$ npm install
$ npm start         # visit http://localhost:8000
```