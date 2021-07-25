import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import i18n from './i18n'

import { Button,PageHeader,Descriptions,Menu,Icon,Switch,Statistic ,Row ,Col ,Carousel,message,FormModel,Input,Select,DatePicker,Tooltip,
Layout,Divider,Card,Space,Slider,Dropdown,Collapse,Timeline
} from 'ant-design-vue';

Vue.config.productionTip = false
Vue.component(Button.name, Button)
Vue.component(Button.Group.name, Button.Group)
Vue.component(PageHeader.name,PageHeader)
Vue.component(Descriptions.name,Descriptions)
Vue.component(Icon.name,Icon)

Vue.component(Menu.name,Menu )
Vue.component(Menu.Item.name, Menu.Item)
Vue.component(Menu.SubMenu.name, Menu.SubMenu)
Vue.component(Switch.name,Switch)
Vue.component(Statistic.name,Statistic )
Vue.component(Row.name,Row )
Vue.component(Col.name,Col )
Vue.component(Carousel.name,Carousel)
Vue.component(FormModel.name,FormModel)
Vue.component(FormModel.Item.name,FormModel.Item)
Vue.component(Input.name,Input)
Vue.component(Input.Password.name,Input.Password)
Vue.component(Input.Group.name,Input.Group)
Vue.component(Select.name,Select )
Vue.component(Select.Option.name,Select.Option )
Vue.component(DatePicker.name,DatePicker)
Vue.component(DatePicker.RangePicker.name,DatePicker.RangePicker)
Vue.component(Tooltip.name,Tooltip)
Vue.component(Layout.name,Layout)
Vue.component(Layout.Sider.name,Layout.Sider)
Vue.component(Layout.Content.name,Layout.Content)
Vue.component(Layout.Footer.name,Layout.Footer)
Vue.component(Divider.name,Divider)
Vue.component(Card.name,Card)
Vue.component(Card.Meta.name,Card.Meta)
Vue.component(Space.name,Space)
Vue.component(Slider.name,Slider)
Vue.component(Dropdown.name,Dropdown)
Vue.component(Collapse.name,Collapse)
Vue.component(Collapse.Panel.name,Collapse.Panel)
Vue.component(Timeline.name,Timeline)
Vue.component(Timeline.Item.name,Timeline.Item)

Vue.prototype.$message = message;
new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
