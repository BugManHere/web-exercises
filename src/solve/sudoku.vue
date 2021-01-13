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
        <div v-for="(item,indexRow) in 9" :key="indexRow.id" class="container-block-row">
          <div v-for="(item,indexCol) in 9" :key="indexCol.id" class="container-block-col">
          </div>
        </div>
      </div>

      <!-- 生成-按钮 -->
      <div class="page-footer">
        <div v-text="`生成`" @click="randomArray" ></div>
        <div v-text="`简单`" @click="simpleType" ></div>
        <div v-text="`中等`" @click="midType" ></div>
        <div v-text="`困难`" @click="hardType" ></div>
      </div>
    </div>
    <!-- 数独框架设计  end -->

  </div>
</template>

<script>
export default {
  data() {
    return {
      simpleType_to_data: 20, // 简单模式挖空-20个格子
      midType_to_data: 40, // 中等模式挖空-40个格子
      hardType_to_data: 60 // 困难模式挖空-60个格子
    }
  },
  
  mounted() {
  },

  methods: {
    // 初始化数组
    generateArr() {
      var arr = [];
      for (var i = 0;i < 9;i++){
        arr[i] = [];
        for(var j = 0;j < 9;j++){
          arr[i][j] = 0;
        }
      }
      return arr;
    },

    // 产生随机数
    generateRandom() {
      return Math.floor(Math.random()*9 + 1);
    },

    // 检查-行-是否满足要求
    checkRow(arr,row){
      for (var j=0;j<8;j++){
        if(arr[row][j]==0){
          continue;
        }
        for(var k=j+1;k<9;k++){
          if(arr[row][j]==arr[row][k]){
            return false;
          }
        }
      }
      return true;
    },

    // 检查-列-是否满足要求
    checkCol(arr,col){
      for(var j=0;j<8;j++){
        if(arr[j][col]==0){
          continue;
        }
        for(var k=j+1;k<9;k++){
          if(arr[j][col]==arr[k][col]){
            return false;
          }
        }
      }
      return true;
    },

    // 检查-宫-是否满足要求
    checkNine(arr,row,col){
      // 获得左上角的坐标
      var j = Math.floor(row / 3)*3;
      var k = Math.floor(col / 3)*3;
      // 循环比较
      for(var i = 0;i < 8;i++){
        if(arr[j + Math.floor(i/3)][k+i%3] == 0){
          continue;
        }
        for(var m = i+1;m < 9;m++){
          if(arr[j + Math.floor(i/3)][k + Math.round(i%3)]==arr[j + Math.floor(m/3)][k + Math.round(m % 3)]){
            return false;
          }
        }
      }
      return true;
    },

    // 检查是否满足-行-列-宫 是否同时满足要求
    isCorret(arr,row,col){
      return (this.checkRow(arr,row)&&this.checkCol(arr,col)&&this.checkNine(arr,row,col));
    },

    // 得到满足条件的数组，并渲染
    generateShuDu(){
      var arr=this.generateArr();
      for(var i = 0;i < 9;i++){
        var time = 0;
        for(var j = 0;j < 9;j++){
          arr[i][j] = time==9?0:this.generateRandom();
          if(arr[i][j]==0) {
            if(j > 0){
              j-=2;
              continue;
            }else{
              i--;
              j = 8;
              continue;
            }
          }
          if(this.isCorret(arr,i,j)){
            time = 0;
          }else{
            time++;
            j--;
          }
        }
      }
      var result ='';
      for(i = 0;i < 9;i++){
        for(j = 0;j < 9;j++){
          result+=arr[i][j];
          var blockId = "block_"+i+"_"+j;
          console.log("id",blockId);
          document.querySelector("#"+blockId).innerHTML = arr[i][j];
        }
        result+="\n";
      }
      console.log(result);
    },

    // 点击-选择不同的模式
    Type(num){
      var randomObj_all = [];
      var length = 0; // 退出循环的标志位
      while(length < num) {
        var randomObj = {};
        var Row = this.generateRandom()-1;
        var Col = this.generateRandom()-1;
        randomObj.x = Row;
        randomObj.y = Col;
        console.log('生成的随机坐标对象', randomObj);
        var repeat = false; // 暂时表示没有重复
        
        // console.log('前length',length);
        // 查重
        for(var i = 0;i<length;i++){
          var obj = randomObj_all[i];
          // console.log('数组里的数据obj:',obj);
          if(obj.x == randomObj.x && obj.y == randomObj.y) {
            repeat = true;
          }
        }

        if(!repeat) {
          randomObj_all.push(randomObj);
          console.log('存储的对象：',randomObj);
          length ++ ;
          // console.log('后length',length);
        } else {
          continue;
        }
      }
      console.log('数组的数据：',randomObj_all);
      for(var ele=0;ele<randomObj_all.length;ele++){
        var id_x=randomObj_all[ele].x;
        var id_y=randomObj_all[ele].y;
        var randomId="block_"+id_x+"_"+id_y;
        console.log('拿到的id:',randomId);
        document.querySelector("#"+randomId).innerHTML='';
      }
    },

    // 点击【简单】-模式
    simpleType(){
      this.Type(this.simpleType_to_data);
    },

    // 点击【中等】-模式
    midType(){
      this.Type(this.midType_to_data);
    },

    // 点击【困难】-模式
    hardType(){
      this.Type(this.hardType_to_data);
    },



    // 点击生成 9*9 的随机数组
    randomArray() {
      var msgRow = document.querySelectorAll(".container-block-row");
      var msgClo = document.querySelectorAll(".container-block-col");
      console.log('节点', msgRow);
      console.log('节点列', msgClo);
      for(var i = 0,j = 0,k = 0;i < 81;i++,j++) {
        // 给每个格子设置不同的id
        if(i!=0 && i%9==0){
          k++;
          j = 0;
        }
        var stingId = "block_" + k + "_" + j;
        console.log('拼接字符串', stingId);
        msgClo[i].setAttribute('id', stingId);
      }
      console.log(msgClo[0], msgClo[1], msgClo[2]);

      // 调用函数-将随机数渲染至界面中
      this.generateShuDu();
    },
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
      // position: absolute;
      // display: flex;
      // height: 100%;
      // width: 100%;

      // 行-样式
      .container-block-row {
        display: flex;
        // width: 140px;
        height:120px;
        // border: 1px solid black;
        line-height: 150px;
        // transform: translate(-50%,-50%);
        // text-align: center;

        // 列-样式
        // .container-block-cols{
        //   position: absolute;
        //   top:140px;
        //   width: 140px;
        //   height:1150px;
          // border: 1px solid red;
          .container-block-col {
            display: flex;
            justify-content: center;
            align-items: center;

            // position: absolute;
            // top:150px;
            width: 100%;
            height:100%;
            border: 1px solid black;
          }
        // }
      }
    }

    // “生成”按钮
    .page-footer{
      display: flex;
      position: absolute;
      top: 1150px;
      // // left: 50%;
      // background-color: #bbb;
      // width: 200px;
      // height: 100px;
      // line-height: 100px;
      margin: auto;
      div {
        // top: 50px;
        // left: 50%;
        background-color: #bbb;
        width: 200px;
        height: 100px;
        margin-left: 130px;
        line-height: 100px;
        &:hover {
          cursor: pointer;
        }
      }
    }

  }

}
</style>
