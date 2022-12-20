const { default: axios } = require("axios");

axios.get("http://localhost:3000/posts")
.then(function(res){
  console.log(res);
})