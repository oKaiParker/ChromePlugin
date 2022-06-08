
1. 添加background.js, 保存本地数据
service_worker非常特殊，这是一直伴随插件运行的后台脚本，它没有前端页面，不支持dom，所以没法引入jquey和其他js，所有需要保持运行的脚本都要直接写在background.js里，同样他也不支持XMLHttpRequest，因此需要使用fetch来代替xhr请求。
background.js要放在主文件夹根目录，否则在使用过程中会出现 service worker (无效)的提示
