<script setup>
</script>

<template>
  <div class="wrapper">
    <main>
        <router-link to="/sp1"><h3>SP1</h3></router-link>
        <router-link to="/sp2"><h3>SP2</h3></router-link>
        <router-link to="/sp3"><h3>SP3</h3></router-link>
        <router-link to="/sp4"><h3>SP4</h3></router-link>
    </main>
  </div>
</template>


<style scoped>
  .wrapper{
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: #333;
    background: radial-gradient(#271530  0%, #000000 70%);
    display: flex;
    justify-content: center;
    align-items: center;
    main{
      display: flex;
      justify-content: center;
      align-items: center;
      flex-wrap: wrap;
      width: 60%;
      height: 50%;
      margin: 0 auto;
      @media (max-width:1366px) {
        width: 96%;
      }
      /* border: 1px dashed #fff; */
      a{
        margin: 5px;
        text-decoration: none;
        color: #fff;
        display: block;
        width: 200px;
        height: 200px;
        border: 1px solid #9928cd;
        background: #00000090;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 32px;
        border-radius: 1rem;
        text-align: center;
        transition: .3s;
        @media (max-width: 991px) {
          width: 150px;
          height: 150px;
        }

        &:hover{
          box-shadow: 0 0 10px #9928cd;
        }

        span.memo{
          font-size: 12px;
        }
      }
      /* border: 1px dashed #aaa; */
    }
  }
</style>