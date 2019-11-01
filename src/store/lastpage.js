// 这是一个专门用来存储需要记录的索引或id的状态机,只能存储number值
export default {
  namespaced: true,
  state: {
    categoryId:0,//当前用户在首页选中的栏目id
    categoryIndex:0,//当前用户在首页选中的栏目索引(为了激活产品页面左侧栏的)
    // 设置为1时地址选中也跳转回确认订单页
    addressReturn:0,//记录地址页面返回是要跳转到确认订单页面还是用户页面
    currentOrderAddress:{},//当前这个订单选中的服务地址
  },
  getters:{
    
  },
  mutations:{
    //   传递一个需要修改的值
    setCategoryId(state,value){
      state.categoryId = value
    },
    //   传递一个需要修改的值
    setCategoryIndex(state,value){
      state.categoryIndex = value
    },
    //   传递一个需要修改的值
    setAddressReturn(state,value){
      state.addressReturn = value
    },
    //   传递一个需要修改的值
    setCurrentOrderAddress(state,value){
      state.currentOrderAddress = value
    },
    //   清空当前保存的所有记录
    clearRecord(state){
      state.categoryId = 0;
      state.categoryIndex = 0
      state.addressReturn = 0;
      state.currentOrderAddress = {}
    }
  },
  actions: {
    
  }
}