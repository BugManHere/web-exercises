<template>
  <div class="solve-sudoku">
    <!-- 可删 -->
    <span>
      <p>这里写题解</p>
      <p>尽量只在这个文件做改动</p>
      <p>文件位置src/solve/sudoku.vue</p>
    </span>

    <!-- 数独框架设计  start -->
    <div class="page-main">
      <div class="page-container">
        <div v-for="(item,indexRow) in 9" :key="indexRow.id" class="container-block-row">{{array[indexRow]}}
          <div class="container-block-cols">
            <div v-for="(item,indexCol) in 8" :key="indexCol.id" class="container-block-col">
            </div>
          </div>
        </div>

        <!-- <div v-for="(item) in array" :key="item.id" class="container-block">
          {{item}}
          <div v-for="(item) in array" :key="item.id" class="container-block">
            {{item}}
          </div>
        </div> -->
      </div>

      <!-- 按钮 -->
      <div class="page-footer">
        <div v-text="`生成`" @click="randomArray" ></div>
      </div>
    </div>
    <!-- 数独框架设计  end -->

  </div>
</template>

<script>
export default {
  data() {
    return {
      randomData:'',
      array:[],
    }
  },
  
  mounted() {

  },
  methods: {
    // 初始化数组
    randomInit() {
      var arr=[];
      for (var i=0;i<9;i++){
        arr[i]=[];
        for(var j=0;j<9;j++){
          arr[i][j]=0;
        }
      }
    },

    // 产生随机数
    makeRandom(){
      for(var i=0;i<9;i++){
        this.array.push(Math.floor(Math.random()*9+1));
        console.log("随机数",this.array);
      }
      
    },


    // 点击生成 9*9 的随机数组
    randomArray() {
      // this.makeRandom();
      var msgRow = document.querySelectorAll(".container-block-row");
      // var msgClos = document.querySelectorAll(".container-block-cols");
      var msgClo = document.querySelectorAll(".container-block-col");
      console.log('节点',msgRow);
      console.log('节点列',msgClo);
      for(var i=0;i<72;i++){
        console.log("列内容：",Math.floor(Math.random()*9+1));
        msgClo[i].innerHTML=Math.floor(Math.random()*9+1);
        // for(var j=0;j<9;j++){
        //   // msgClos[i].msgClo
        // }
      }
      for(var v=0;v<9;v++){
        // var domData=new Array;
        // console.log("行内容：",Math.floor(Math.random()*9+1));
        // msgRow[v].innerHTML=Math.floor(Math.random()*9+1);
        // this.array[i]=Math.floor(Math.random()*9+1);
        this.array.push(Math.floor(Math.random()*9+1));
        // console.log("随机数",this.array[i]);
      }
      console.log("数组是：",this.array)
    },

    
    createShuDuArr () {
      let arr = [], finArr = [];
      for(let i = 1; i < 10; i ++) {
        arr.push(i)
      }
      finArr = new Array(9).fill(arr);
      return finArr.flat();
    }
  },
};

</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
}
.solve-sudoku {
  height: 100%;
  width: auto;
  font-size: 48px;
  .page-main {
    position: relative;
    height: 100%;
    width: 100%;
    .page-container {
      display: flex;
      height: 100%;
      // width: 100%;
      .container-block-row {
        // display: none;
        // position: absolute;
        // position: relative;

        width: 140px;
        height:140px;
        border: 1px solid black;
        line-height: 150px;
        // transform: translate(-50%,-50%);
        // text-align: center;
        .container-block-cols{
          position: absolute;
          top:140px;
          width: 140px;
          height:1150px;
          // border: 1px solid red;
          .container-block-col {
            // position: absolute;
            // top:150px;
            width: 140px;
            height:140px;
            border: 1px solid black;
          }
        }
      }
    }

    // “生成”按钮
    .page-footer{
      position: absolute;
      top: 1500px;
      left: 50%;
      background-color: #bbb;
      width: 200px;
      height: 100px;
      line-height: 100px;
    }
  }

}
</style>
