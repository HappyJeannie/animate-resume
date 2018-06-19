# animate-resume

实现的主要思路是：
* 简历全部内容包括样式文本全部准备好
* 文本以定时器的方式，每隔 100ms 在 body 的 pre 中和 head 的 style 标签中打印输出
* 为使页面效果更佳平缓，给所有标签加上 transition 过度效果