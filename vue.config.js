module.exports = {
    configureWebpack:{
        devServer:{
            //项目启动之前，参数是app
            before(app){
                app.get('/api/goods', function(req, res){
                    res.json({
                        list: [
                            {text: '第1个商品', price: 100},
                            {text: '第2个商品', price: 40},
                            {text: '第3个商品', price: 70},
                            {text: '第4个商品', price: 90},
                            {text: '第5个商品', price: 20},
                            {text: '第6个商品', price: 10}
                          ]
                    })
                })
            }
        }
    }
}