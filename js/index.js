let result = `/*
  * 代码文本
  * 先随便写点代码
*/
  *{
    transition : all 0.5s;
    padding:0px;
    margin:0px;
    box-sizing:border-box;
    color:#fff;
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
  body{
    perspective: 1000px;
    -webkit-perspective: 1000;
  }
  #content{
    position:fixed;
    top:3vh;
    right:1%;
    width:48%;
    height:90vh;
    overflow-y:auto;
    background:rgb(48,48,48);
    transform:rotateY(-10deg);
    transform-origin: right;
    overflow-x:hidden;
  }
  /* 不玩了，来介绍一下我自己 */
  /*  * 我需要一张白纸 */
`;
var result2 = `
  #paper{
    width:100px;
    height:100px;
    border:1px solid #fff;
    padding:10px;
    position:fixed;
    top:3vh;
    left:1%;
    width:48%;
    height:90vh;
    background:rgb(48,48,48);
    transform:rotateY(10deg);
    transform-origin: left;
    overflow-x:hidden;
  }
  /*
    再加点阴影吧
  */
  #content:hover,#paper:hover{
    box-shadow:0 0 10px #fff;
  }
  /*
    来写一些简介吧
  */
`;
var mdText = `
  ## summer
  **********

  ## 教育经历：
  * xxx 大学，本科

  *********
  ## 工作经历：

  * 2014.7 - 2016.3 xxxx 公司
  * 2016.4 - 2017.9 xxxx 公司
  * 2017.10 - today xxx 公司
  
  ********
  ## 项目经历：

  *  MVC
  *  swiper

  *******
  ## 作品展示
  * [博客](https://happyjeannie.github.io/)
  * [github](https://github.com/HappyJeannie)
  * [本页地址](https://github.com/HappyJeannie/animate-resume)
  
  *******
  联系方式：
  * 博客留言，我会尽快回复
  * 欢迎关注[我的知乎](https://www.zhihu.com/people/tu-zhi-16-79/activities)给我留言，哈哈，欢迎点赞比小心心
`;

var finalCss = `
  #paper{
    transform:rotateY(370deg);
  }
`;
var resumeCss = `
  #resume{
    font-family: "Helvetica Neue", Helvetica, sans-serif;
  }
  #resume h2{
    line-height:2;
  } 
  #resume ul li{
    list-style : none;
    line-height:1.8;
  }
`;
function writeCode(dom,preCode,code,isAddStyle,isMd,fn){
  let n = 0;
  let t = setInterval(()=>{
    n++;
    console.log(n)
    dom.innerHTML = Prism.highlight(preCode + code.slice(0,n),Prism.languages.css,'css')
    if(isAddStyle){
      styleTag.innerHTML  = preCode + code.slice(0,n) ;
    }
    if(isMd){
      let mdDom = document.querySelector('#resume');
      mdDom.innerHTML = marked(code);
    }
    dom.scrollTop = 1000000;
    if(n >= code.length){
      n = 0;
      clearInterval(t);
      if(fn){
        fn.call();
      }
    }
  },10)
}
let dom = document.querySelector('#content');
writeCode(dom,'',result,true,false,() => {
  createDom(()=>{
    writeCode(dom,result,result2,true,false,()=>{
      // 开始增加简历里面的内容
      let mdDom = document.querySelector('#markdown');
      writeCode(mdDom,'',mdText,false,true,() =>{
        // markdown 语句写完后，为其增加样式
        writeCode(dom,result+result2,finalCss,true,false,()=>{
          // 旋转完成后 隐藏 markdown 语法，并展示简历内容
          showResult();
          writeCode(dom,result+result2+finalCss,resumeCss,true,false);
        })
      });
    })
  });
})

// 创建 paper 和 markdown 文本
function createDom(fn){
  let paper = document.createElement('div');
  paper.id = 'paper';
  document.body.appendChild(paper);

  let md = document.createElement('pre');
  md.id = 'markdown';
  paper.appendChild(md);

  let mdResult = document.createElement('div');
  mdResult.id = 'resume';
  paper.appendChild(mdResult);

  fn.call();
}

function showResult(){
  document.querySelector('#markdown').style.display = 'none';
  document.querySelector('#resume').style.display = 'block';
}