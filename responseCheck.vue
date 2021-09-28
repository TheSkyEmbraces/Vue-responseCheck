<template>
  <div>
    <div id="screen" v-bind:class="state" v-on:click="onClickScreen">
      {{ message }}
    </div>
    <template v-if="result.length">
      <div>평균 시간 : {{average}} ms</div>
      <button v-on:click="onReset">Reset</button>
    </template>
  </div>
</template>

<script>
  let startTime = 0;
  let endTime = 0;
  let timeOut = null;
  export default {
    data() {
      return {
        result: [],
        state: "waiting",
        message: "클릭해서 시작하세요!",
      };
    },

    //컴퓨티드는 성능에 직접적인 영향을 미침
    computed:{
      average(){
        return this.result.reduce((a,c) => a + c, 0) / this.result.length || 0
      }
    },
    methods: {
      onReset() {
        this.result = []
      },
      onClickScreen() {
        if (this.state === "waiting") {
          this.state = "ready";
          this.message = "초록색이 되면 클릭하세요!"
          timeOut = setTimeout(() => {
            this.state = "now";
            this.message = "지금 클릭 하세요!!";
            startTime = new Date();
          }, Math.floor(Math.random() * 1000) + 2000);
        } else if (this.state === "ready") {
          clearTimeout(timeOut);
          this.state = "waiting";
          this.message = "너무 빨리 누르셨습니다. 초록색이 된 후에 클릭하세요"
        } else if (this.state === "now") {
          endTime = new Date();
          this.state = "waiting";
          this.message = "잘하셨습니다! 다시 시작하시려면 클릭해서 시작하세요"
          this.result.push(endTime - startTime);
        }
      },
    },
  };
</script>

<style scoped>
  #screen {
    width: 300px;
    height: 300px;
    text-align: center;
    user-select: none;
  }

  #screen.waiting {
    background-color: aqua;
  }

  #screen.ready {
    background-color: red;
    color: #fff;
  }

  #screen.now {
    background-color: greenyellow;
  }
</style>