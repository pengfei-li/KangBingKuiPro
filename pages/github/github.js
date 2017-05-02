// pages/github/github.js
let tools = require('../../utils/tools');
let URL = 'https://api.github.com/search/repositories?q=user:BingKui+stars:>0&sort=stars';
Page({
  data:{
    githubData:[]
  },
  onShow:function(){
    // 页面显示
    let _ = this;
    tools.loading('加载中...');
    tools.query(URL,{},(data)=>{
      _.setData({githubData:data.items});
      tools.loadingEnd();
    });
  }
})