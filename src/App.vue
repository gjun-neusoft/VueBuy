<template>
  <div>
  <input type="text" v-model="text">
  <input type="text" v-model="price">
  <button @click="addGood">添加</button>
    <ul>
      <li v-for="(good,index) in goods" :key="good.text">
        {{good.text}}
        {{good.price}}
        <button @click="addCart(index)">添加到购物车</button>
      </li>
      
    </ul>
    <Cart :name="name"></Cart>
  </div>
</template>
<script>
import axios from 'axios'
import Cart from './components/Cart'
  export default{
    name: "app",
    components: {
      Cart
    },
    data(){
      return {
        name: '小实验',
        showName: true,
        goods: [],
        text: '',
        price: 0,
        cart: [

        ]
      }
    },
    async created(){
      try{
        const res = await axios.get('/api/goods')
        this.goods = res.data.list
      }catch(e){
        console.log(e)
      }

      // axios.get('/api/goods').then(res=>{
      //   this.goods = res.data.list
      // })
    },
    methods:{
      addGood(){
        this.goods.push({
          text: this.text,
          price: this.price
        })
      },
      addCart(i){
        const good = this.goods[i]
        this.$bus.$emit('addCart',good)
      }
    }
  }
</script>
<style>
  #demo {
    color: red;
  }
</style>
