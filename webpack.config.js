const path=require('path');
const HWP=require('html-webpack-plugin');

module.exports={
   entry:{
       app:"./src/js/index.js",
       login:"./src/js/login.js",
       signup:"./src/js/signup.js",
       home:"./src/js/home.js"
   },
  
    output:{
        path:path.resolve(__dirname,'dist'),
        filename:'js/[name].bundle.js'
    },
    
     module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
    devServer:{
        contentBase:'./dist'
    },
    plugins:[
        new HWP({
            filename:'index.html',
            template:'./src/index.html',
            chunks:['app']
        }),
        new HWP({
            filename:'signin.html',
            template:'./src/signin.html',
            chunks:['login']
        }),
        new HWP({
            filename:'signup.html',
            template:'./src/signup.html',
            chunks:['signup']
        }),
        new HWP({
            filename:'home.html',
            template:'./src/home.html',
            chunks:['home']
        }),
       
       

        
    ]


};