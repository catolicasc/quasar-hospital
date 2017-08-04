<template lang="html">
  <q-layout>
    <div slot="header" class="toolbar">
      <q-toolbar-title :padding="0">
        Cadastro
      </q-toolbar-title>
    </div>
    <div class="logo">

    </div>
    <div class="login">
      <form class="form-default" @submit.prevent="register()">
        <div class="stacked-label">
          <input class="full-width" v-model="emailRegister">
          <label>E-mail</label>
        </div>

        <div class="stacked-label">
          <input type="password" class="full-width" v-model="passwordRegister">
          <label>Senha</label>

        </div>
        <button type="submit" class="full-width positive" ref="submitRegister">
          Cadastrar
        </button>
      </form>
    </div>

  </q-layout>
</template>

<script>
// import Vuex from 'vuex'
import Firebase from '../resources/firebase-config'

export default {
  data () {
    return {
      emailRegister: null,
      passwordRegister: null
    }
  },
  methods: {
    register () {
      const btn = this.$refs.submitRegister
      btn.disabled = true
      btn.innerText = 'Cadastrando...'

      Firebase.FirebaseAuth.createUserWithEmailAndPassword(this.emailRegister, this.passwordRegister)
        .then(user => {
          Firebase.FirebaseDatabase.ref(`clients/${user.uid}`).update({
            name: this.emailRegister,
            email: this.passwordRegister
          })
          btn.innerText = 'Cadastrar'
        })
        .catch(error => {
          this.registerError = Firebase.getErrorMessage(error.code)
          btn.disabled = false
          btn.innerText = 'Cadastrar'
        })
    }
  }
}
</script>

<style lang="css">
</style>
