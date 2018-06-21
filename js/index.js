let result = `/*
  * 代码文本
  * 先随便写点代码
*/
  *{
    transition : all 0.5s;
    padding:0px;
    margin:0px;
    box-sizing:border-box;
  }
  body{
    background:rgba(63,82,99);
    font-size:16px;
  }
  #content{
    padding:20px;
    border:1px solid #ccc;
  }
  /*
    * 接下来做一些代码高亮的部分
  */
  .token.selector{
    color: #a6e22e;
  }
  .token.punctuation{
    color: #f8f8f2;
  }
  .token.property{
    color: #f92672;
  }
  .token.function{
    color: #e6db74;
  }
  /* 加点 3D 效果 */
  #content{
    transform:rotateY(360deg);
  }
  /* 不玩了，来介绍一下我自己 */
  /*  * 我需要一张白纸 */
              `;
console.log(result.length);
var n = 0;
var t = setInterval(()=>{
  n++;
  console.log(n)
  content.innerHTML  = result.slice(0,n);
  content.innerHTML = Prism.highlight(result.slice(0,n),Prism.languages.css,'css')
  styleTag.innerHTML  = result.slice(0,n);
  if(n >= result.length){
    n = 0;
    clearInterval(t);
    // 添加 text
    fn2();
    fn3(result);
    // 为 paper 添加样式
  }
},20)

function fn2(){
  var paper = document.createElement('div');
  paper.id = 'paper';
  document.body.appendChild(paper);
}

function fn3(preresult){
  var result = `
  #paper{
    width:100px;
    height:100px;
    border:1px solid #fff;
  }
  `;
  var n = 0;
  var t = setInterval(function(){
    n++;
    styleTag.innerHTML = preresult + result.slice(0,n);
    content.innerHTML = Prism.highlight(preresult + result.slice(0,n),Prism.languages.css,'css')
    if(n > result.length){
      clearInterval(t);
    }
  },50)
}