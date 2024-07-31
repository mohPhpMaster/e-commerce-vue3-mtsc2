<template>
  <div class="alert alert-success" role="alert" id="message">
    Payment successful
  </div>
</template>

<script>
import axios from '../../plugins/axios';

export default {
    name:'PaymentSuccess',
    props:[],
    data() {
    return {
      token: null,
      sessionId:null
    }
  },
  methods:{
    saveOrder() {
      axios.post("order/add/?token="+this.token+"&sessionId="+this.sessionId)
              .then(()=>{
                //window.location.href = '/order'
                //document.getElementById("message").innerHTML = "order placed";
                this.$router.push({ name: 'OrderHistory'})
                //router.push()
              }).catch((error)=>{
        console.error(error);
      })
    }
  },
  mounted(){
    this.token = localStorage.getItem("token");
    this.sessionId = localStorage.getItem("sessionId");
    this.saveOrder()
  }
}
</script>
