<template>
  <div>
    <OtherTop :icontype="2">
      <template slot="extraleft">
        <a-steps :current=currstep>
          <a-step>
            <template slot="title"> {{$t('m.checkInfo')}} </template>
            <span slot="description"> {{$t('m.checkrelativeInfo')}} </span>
          </a-step>
          <a-step>
            <template slot="title"> {{$t('m.order')}}  </template>
            <span slot="description"> {{$t('m.chooseOrder')}} </span>
          </a-step>
          <a-step>
            <template slot="title"> {{$t('m.finish')}}  </template>
            <span slot="description"> {{$t('m.finishPay')}} </span>
          </a-step>
        </a-steps>
      </template>
    </OtherTop>
    <div class="main">
      <div class="menuwrapper"><Menu :dtype="2" class="menu" /></div>
      <div class="maincontent">
        <a-card>
          <div>
            <a-tabs v-model="currstep" tabPosition="bottom" size="large">
              <a-tab-pane :key="0" :forceRender="true">
                <PayCheck :data="data" v-show="this.currstep==0"/>
              </a-tab-pane>
              <a-tab-pane :key="1"  :forceRender="true">
                <PayMethod :data="data" :orderedlist="order" v-show="this.currstep==1"/>
              </a-tab-pane>
              <a-tab-pane :key="2" :forceRender="true">
                <PayFinish :order="order" v-show="this.currstep==2"/>
              </a-tab-pane>
          </a-tabs>
          </div>
          <div class="stepcontroll">
            <a-space>
               <a-button size="large" type="primary" @click="()=>{this.currstep=1}" v-show="currstep==0">{{$t('m.nextStep')}}</a-button>
              <a-button size="large" type="primary" @click="()=>{this.currstep=0}" v-show="currstep==1">{{$t('m.lastStep')}}</a-button>
              <a-button size="large" type="primary" @click="()=>{this.currstep=2}" v-show="currstep==1">{{$t('m.gotoOrder')}}</a-button>
              <a-button size="large" type="primary" @click="()=>{this.currstep=1}" v-show="currstep==2">{{$t('m.returnCheck')}}</a-button>
            </a-space>
          </div>
        </a-card>
          
      </div>
    </div>
    <Footer :iconvisable="false"/>
  </div>
</template>
<script>
import OtherTop from "@/components/header/OtherTop";
import Footer from "@/components/footer/Footer";
import Menu from "@/components/header/Menu"
import PayCheck from "@/components/pay/PayCheck"
import PayMethod from "@/components/pay/PayMethod"
import PayFinish from "@/components/pay/PayFinish"

export default {
  name: "Pay",
  data(){
      return{
          data:[],
          currstep:0,
          order:[]
      }
  },
  components: {
    OtherTop,
    Footer,
    Menu,
    PayCheck,
    PayMethod,
    PayFinish
  },
  created(){
    if(this.$route.params.data!=undefined){
      this.data=this.$route.params.data
    }
    if(this.$route.params.order!=undefined){
     
      this.order=[this.$route.params.order]
      console.log(this.order)
      this.currstep=2
    }
  }
};
</script>
<style scoped>
.main {
  display: flex;
  width: 100%;
}
.menuwrapper {
  width: 120px;
  z-index: 100;
}
.menu {
  position: fixed;
}
.maincontent{
    margin: 30px;
    width: 100%;
}
.stepcontroll{
    margin-top: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
}
</style> 