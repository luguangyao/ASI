<template>
  <div >
    <div v-if="!this.planedata||this.planedata.length==0">
      <a-empty></a-empty>
      <a-divider><router-link to="/other/flight">{{$t('m.searchFlight')}}</router-link></a-divider>
    </div>
    <div v-else>
    <a-card :bordered="false" >
      <div slot="title" style="padding: 0px; maring: 0px" class="title">
        <h4><strong>{{$t('m.bestFlight')}}</strong></h4>
        <h6 style="color: grey">{{$t('m.bestFlightSub')}}</h6>
      </div>
      <a-dropdown slot="extra">
        <a-menu slot="overlay" >
          <a-menu-item key="1" @click="sort(1)"> {{$t('m.sortbyprice')}} </a-menu-item>
          <a-menu-item key="2" @click="sort(2)"> {{$t('m.sortbytransfertimes')}} </a-menu-item>
          <a-menu-item key="3" @click="sort(3)"> {{$t('m.sortbytime')}} </a-menu-item>
        </a-menu>
        <a-button type="primary"> {{$t('m.sortBy')}} <a-icon type="swap" :rotate="90" /> </a-button>
      </a-dropdown>

     
      <div>
        <a-collapse  expandIconPosition="right" style="padding:0px">
          <a-collapse-panel v-for="item,index in planedata" :key="index"  >
            <template slot="header" >
              <div class="titleleft" >
                <div class="flighticon">
                  <img :src="getFlightIcon()" alt="">
                </div>
                <div style="width:40%">
                  <h4>{{item[0].dtime}} -- {{item[item.length-1].atime}}</h4>
                  <h6>{{item[0].airline}}</h6>
                </div>
                <div style="width:140px">
                  <h6>{{$t('m.totaltime')}}: <a-icon type="clock-circle" /> {{getTimedel(item[0].dtime,item[item.length-1].atime)}}</h6>
                  <h5>{{$t('m.totalprice')}}: <a-icon type="money-collect" /> {{getPrice(item)}} </h5>
                </div>
                <div >
                  <h2 class='direct'>{{item.length==1?$t('m.direct'):$t('m.nonDirect')}}</h2>
                </div>
              </div>
            </template>
            
            <a-card class="card" :bordered="false">
              <a-card-grid :style="'width:33.333%;text-align:center;height:'+(180*item.length+50)+'px'" >
                <div >
                <a-timeline >
                  <a-timeline-item v-for="it,index in item" :key="index" style="padding:0px" >
                    <a-icon slot="dot" type="history" style="font-size: 16px;" />
                    <div >
                      <h4><strong>{{it.departure}}————{{it.airline}} {{it.dtime}} </strong></h4>
                      <h6> {{$t('m.time')}}: <a-icon type="clock-circle" /> {{getTimedel(it.dtime,it.atime)}}  
                          <a-icon type="ant-design"  :style="{ color: 'blue' }"/> {{it.airline}}</h6>
                      <h6> {{$t('m.price')}}: <a-icon type="money-collect " :style="{ color: 'blue' }" /> ￥{{it.price}}</h6>
                    </div>
                  </a-timeline-item>
                  <a-timeline-item style="padding-bottom:0px">
                    <a-icon slot="dot" type="environment" style="font-size: 16px; color:red" />
                    <div >
                      <h4><strong>{{item[item.length-1].destination}}————{{item[item.length-1].airline}} {{item[item.length-1].atime}}</strong></h4>
                    </div>
                  </a-timeline-item>
                </a-timeline>
                  <h4 style="display:inline; color:grey">{{$t('m.filghtid')}} : </h4>
                  <h5 style="display:inline; color:grey"  v-for="it,index in item" :key="index" ><a-icon type="star" theme="filled" :style="{ color: 'red' }" />{{it.flightid}} , </h5>
                </div>
              </a-card-grid >
              <a-card-grid :style="'width:33.333%;height:'+(180*item.length+50)+'px'" >
                <div >
                  <a-descriptions :column="2" v-for="it,index in item" :key="index"  >
                    <a-descriptions-item  class="desitem" >
                        <span class="desitemLabel" slot="label">{{$t('m.model')}}</span>
                        <span class="desitem">{{it.model}}</span>
                    </a-descriptions-item>
                    <a-descriptions-item >
                        <span class="desitemLabel" slot="label">{{$t('m.sales')}}</span>
                        <span class="desitem">{{it.sales}}</span>
                    </a-descriptions-item>
                    <a-descriptions-item  class="desitem">
                        <span class="desitemLabel" slot="label">{{$t('m.seat')}}</span>
                        <span class="desitem">{{it.seatall}}</span>
                    </a-descriptions-item>
                    <a-descriptions-item  class="desitem">
                        <span class="desitemLabel" slot="label">{{$t('m.price')}}</span>
                        <span class="desitem">{{it.price}}</span>
                    </a-descriptions-item>
                    <a-descriptions-item :span="2">
                        <span class="desitemLabel" slot="label">{{$t('m.flightruntime')}}</span>
                        <span class="desitem">{{moment(it.dtime,"HH:mm:ss")}}</span>
                    </a-descriptions-item>
                    <a-descriptions-item :span="2">
                        <span class="desitemLabel" slot="label">{{$t('m.flgihtstartstoptime')}}</span>
                        <span class="desitem">{{moment(it.distime)}}</span>
                    </a-descriptions-item>
                   <a-descriptions-item :span="2" v-if="index!=item.length-1">
                        <span class="desitem">————————————————————————————</span>
                    </a-descriptions-item>
                  </a-descriptions>   
                  
                </div>
              </a-card-grid>
              <a-card-grid :style="'width:33.333%;text-align:center;height:'+(180*item.length+50)+'px'">
                <div class="buyticket">
                  <div>
                    <img src="~@/common/images/buyTicket.png" alt="" class="buyticket" > 
                  </div>
                  <div class="buyticketcontent">
                    <h3>{{$t('m.recommend')}}</h3>
                    <a-rate :disabled="true" :defaultValue="index<2?5:index<3?4:index<5?3:2"></a-rate>
                    <div style="margin-top:20px">
                      <a-button type="primary" @click="gotoPay(item)" size="large" style="box-shadow: blueviolet 0px 0px 10px;">{{$t('m.buyTicket')}}<a-icon type="shopping-cart"  /></a-button>
                    </div>
                  </div>
                </div>
              </a-card-grid>
            </a-card>
          </a-collapse-panel>
        </a-collapse>
      </div>
    </a-card>
    </div>
  </div>
</template>
<script>
import moment from 'moment'
export default {
  name: "FlightList",
  props:{
    planedata:[],
  },
  data() {
    return {
      moment:moment,
      flighticon:[ require('@/common/images/flightIcon/dongfang.png'),
      require('@/common/images/flightIcon/huaxia.png'),
      require('@/common/images/flightIcon/kunming.png'),
      require('@/common/images/flightIcon/nanhang.png'),
      require('@/common/images/flightIcon/shenzhen.png'),
      require('@/common/images/flightIcon/sichuan.png'),
      require('@/common/images/flightIcon/xiangpeng.png'),
      require('@/common/images/flightIcon/xibu.png'),
      require('@/common/images/flightIcon/xizang.png'),
      require('@/common/images/flightIcon/zhongguo.png'),
      ]
    };
  },
  methods:{
    getPrice(d){
      let p=0
      d.forEach(element => {
        p+=Number(element.price)
      });
      return p.toFixed(3)
    },
    getTimedel(t1,t2){
      let m1=moment(t1,'HH:mm:ss')
      let m2=moment(t2,'HH:mm:ss')
      let del=moment.utc(m2.diff(m1))
      return del.format('HH:mm:ss')
    },
    gotoPay(item){
      // console.log(item)
      this.$router.push({name:'pay',params:{'data':item}})
    },
    sort(t){
      this.$emit('sortevent',t)
    },
    getFlightIcon(){
      return this.flighticon[Math.floor(Math.random() * this.flighticon.length)]
    }
  },
  components:{

  }
};
</script>
<style scoped>
.title > * {
  padding: 0px;
  margin: 0px;
}
.titleleft{
  display: flex;
  align-content: center;
   align-items: center;
}
.card{
  display: flex;
  align-items: center;
}
.desitemLabel{
  font-size: 12px;
  font-weight: bold;
}
.desitem{
  font-size:13px
}

.buyticket{
  width: 150px;
  height: 150px;
  display: flex;
  align-items: center;
}
.buyticketcontent{
  min-width:200px;
  display: block;
}
.flighticon{
  margin-right: 15px;
  border-radius: 100%;
  padding:2px;
}
.flighticon>img{
  width:35px;
  height:35px
}
.direct{
  background-color: blueviolet;
  padding: 5px;
  color: aliceblue;
  border-radius: 3px;
  box-shadow: blueviolet 0px 0px 5px;
}
</style>