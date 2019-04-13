$(function () {
  'use strict'
  function copy(obj) {
    return Object.assign({},obj);
  }

  var vue = new Vue({
    el:'#main',
    data:{
      list:[],
      last_id:0,
      current:{},
    },
    methods:{
      merge:function () {
        var is_update,id;
        is_update = id = this.current.id;
        if(is_update){
          var index = this.find_index(item);
            Vue.set(this.list,index,copy(this.current));

        }else{
          var current = this.current;
          if(!current.title && current.title !== 0) return;
          var todo = copy(this.current);//拷贝input提交的东西
          this.last_id++;
          ms.set('last_id',this.last_id);
          this.list.push(todo);
        }
        ms.set('list',this.list);
        this.reset_current();

      },
      remove:function (id) {
        var index = this.find_index(id);
        this.list.splice(index,1);
        ms.set('list',this.list);
      },
      set_current:function (todo) {
        this.current = copy(todo);
      },
      reset_current:function () {
        this.current={};
      },
      find_index:function (id) {
        return this.list.findIndex(function (item) {
          return item.id == id;
        });
      },


    },
    mounted:function () {
      var me = this;
      this.list = ms.get('list') || this.list;
      this.last_id = ms.get('last_id') || this.last_id;
    },
    watch:{
      list:{
        deep:true,
        handler:function (n,o) {
          if(n){
            ms.set('list',n);
          }else{
            ms.set('list',[]);
          }
        }
      }
    }
  })
})




//();
