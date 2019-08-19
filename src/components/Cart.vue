<template>
    <div>
        {{name}}购物车
        
        <table>
            <tr>
                <th></th>
                <th>名称</th>
                <th>单价</th>
                <th>数量</th>
                <th>价格</th>
            </tr>
            <!--<tr v-for="(c,index) in cart" :key="c.text" :style="{color: c.active? 'red': 'black'}">-->
            <tr v-for="(c,index) in cart" :key="c.text" :class="{active: c.active? 'active':''}">
                <td><input type="checkbox" v-model="c.active"></td>
                <td>{{c.text}}</td>
                <td>{{c.price}}</td>
                <td><button @click="minus(index)">-</button>{{c.count}}<button @click="add(index)">+</button></td>
                <td>{{c.price * c.count}}</td>
            </tr>
            <tr>
                <td>{{activeCount}}/{{count}}</td>
                <td>{{total}}</td>
            </tr>
        </table>
    </div>
</template>
<script>
export default {
    // props: ['name','cart'],
    props: {
        name:{
            type:String,
            required: true
        }
    },
    data(){
        return {
            cart:[]
        }
    },
    watch:{
        //深层监听
        cart: {
            handler(){
                this.setLocal()
            },
            deep:true
        }
        //浅层监听
        // cart(){
        //     this.setLocal()
        // }
    },
    computed:{
        count(){
            return this.cart.length
        },
        activeCount(){
            return this.cart.filter(v=>v.active).length
        },
        total(){
            return this.cart.reduce((sum,v)=>{
                if(v.active){
                    return sum + v.price * v.count
                }
                return sum
                
            },0)

            // let num = 0
            // this.cart.forEach(v=>{
            //     if(v.active){
            //         num += v.price * v.count
            //     }
            // })
            // return num
        }
    },
    created(){
        this.cart = JSON.parse(window.localStorage.getItem('cart')) || []
        this.$bus.$on('addCart', good=>{
            const ret = this.cart.find(v=>v.text == good.text)
            if(ret){
                ret.count += 1;
            }else{
                this.cart.push({
                    ...good,
                    active: true,
                    count: 1
                })
            }
        })
    },
    methods:{
        add(i){
            this.cart[i].count += 1
        },
        minus(i){
            if(this.cart[i].count>1){
                this.cart[i].count -= 1
            }else{
                this.remove(i)
            }
        },
        remove(i){
            if(window.confirm(`是否删除${this.cart[i].text}商品?`)){
                this.cart.splice(i, 1)
            }
        },
        setLocal(){
            window.localStorage.setItem('cart', JSON.stringify(this.cart))
        }
    }
}
</script>
<style>
    tr.active{
        color:red;
        font-weight: bold;
    }
</style>