<template>
  <section class="container">
    <div>
      <logo/>
      <h1 class="title">
        nuxt-jwt
      </h1>
      <h2 class="subtitle">
        Just some tutorial about jwt in nuxt
      </h2>
      <button @click="clickBtn">Send as key</button>
    </div>
  </section>
</template>

<script>
import Logo from '~/components/Logo.vue'
import axios from 'axios'

export default {
  mounted () {
    axios.post('/api/login')
    .then((response) => {
      this.key = response.data.token
  })
  },
  data () {
    return {
      key: undefined
    }
  },
  components: {
    Logo
  },
  methods: {
    clickBtn () {
      if(this.key) {
        axios.post('api/secure', {
          key: this.key
        }).then((response) => {
          console.log(response.data)
        })
      } 
    }
  }
}
</script>

<style>

.container
{
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}
.title
{
  font-family: "Quicksand", "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif; /* 1 */
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}
.subtitle
{
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}
.links
{
  padding-top: 15px;
}
</style>
