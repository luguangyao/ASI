<template>
  <div>
    <a-card :bordered="false">
      <a-collapse>
        <a-collapse-panel key="1" header="价格概览">
          <div ref="brokenLineCardRoot" class="brokenLineCardRoot"> <svg ref="brokenLineCardtTargetSVG"></svg> </div>
          <!-- <div v-for="item,index in planedata" :key="index">
            <h4>方案{{index}}</h4>
            <h5 v-for="it,ind in item" :key="ind">
              第{{ind+1}}站:{{it}}
            </h5>
          </div> -->
        </a-collapse-panel>
      </a-collapse>
    </a-card>
  </div>
</template>
<script>
  import fastD3 from '@/visible/fastD3';
  export default {
    name: "BrokenLineCard",
    props: {
      planedata: []
    },
    data () {
      return {
        chart: null,
      }
    },
    methods: {
      cData () {
        if (this.chart) {
          this.chart.cData(this.formData());
        }
      },
      formData() {
        let data = [];
        let i = 0;
        for (let plan of this.planedata) {
          i++;
          let sum = 0;
          let pos = '';
          for (let o of plan) {
            sum += +o.price;
            pos += o.flightid;
          }
          pos;
          data.push({
            name: `plan${i}`,
            value: +sum,
          });
        }
        return data;
      }
    },
    mounted() {
      let that = this;

      const makeChart = () =>{
        // 处理数据
        let data = that.formData();
        // 处理结构
        let linesP = {
          ...fastD3.linesDefault
        };
        linesP.xOffset = 0.05;
        linesP.yOffset = 0.05;
        linesP.widthPercent = 0.9;
        linesP.heightPercent = 0.9;
        linesP.lineColor = 'rgba(200, 200, 200, 200)'
        linesP.fontSize = 7;
        linesP.lineHeight = 10;
        this.chart = fastD3.lines(data, linesP);
      }

      function wait() {
        if (that.$refs.brokenLineCardtTargetSVG) {
          let root = that.$refs.brokenLineCardRoot;
          let svg = that.$refs.brokenLineCardtTargetSVG;
          fastD3.SVG(svg, root.offsetWidth, root.offsetHeight);
          makeChart();
        } else {
          setTimeout(wait, 1000);
        }
      }
      this.$nextTick(wait);
    }
  };
</script>
<style scoped>
  .brokenLineCardRoot {
    width: 100%;
    height: 50vh;
  }

  svg {
    width: 100%;
    height: 50vh;
  }
</style>