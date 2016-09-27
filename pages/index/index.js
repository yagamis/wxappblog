//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    userInfo: {},
    categories:[],
    posts:[],
    hidden: true,
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
 

  onLoad: function () {
    console.log('onLoad')
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function(userInfo){
      //更新数据
      
      that.setData({
        userInfo:userInfo
      })
    });
    this.showLoading()
    wx.request({
      url: 'http://www.xiaoboswift.com/api/get_category_index/',
      success: (res) => {
        this.setData({
          categories: res.data.categories,
          hidden: true
        })
       
      }
    })

  },
  showLoading: function() {
    this.setData({
      hidden: false
    })
  },

   loadCatelist: function(e)  {
     this.showLoading()
       wx.request({
        url: 'http://www.xiaoboswift.com/api/get_category_posts',
        data: {
          id: e.target.dataset.id
        },
        success: (res) => {   
        
          this.setData({
            posts: res.data.posts,
            hidden: true
          })   
        }
      })
    },

})
