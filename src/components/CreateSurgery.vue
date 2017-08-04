<template lang="html">
  <q-layout>
    <div slot="header" class="toolbar">
      <q-toolbar-title :padding="1">
        Lista de Cirurgias {{closedBox}}
      </q-toolbar-title>
      <!--  -->
      <button @click="$refs.modalOwner.open()">
        <i>add_circle</i>
      </button>
    </div>

    <div class="scroll full-width" style="overflow: auto">
      <div>
        <div v-for="(n, key) in list" class="list item-delimiter ">
          <q-collapsible icon="alarm" :label="n.dateTime">
            <div>
              <p class="token">Doutor: {{n.doctor}}</p>
              <p class="token" v-if="n.payment">Pago: Sim</p>
              <p class="token" v-else>Pago: Não</p>
              <button @click="edit(key)">
                    Editar
                  </button>
              <button @click="remove(key)">
                    Remover
                  </button>
            </div>
          </q-collapsible>
        </div>
      </div>
    </div>

    <div slot="footer" class="toolbar">
      <!-- Tabs -->
      <q-tabs :refs="$refs" default-tab="tab-4" class="full-width">
        <q-tab name="tab-1" icon="message">
          Detalhes
        </q-tab>
        <q-tab name="tab-3" icon="alarm">
          Lista
        </q-tab>
        <q-tab name="tab-4" icon="accessibility">
          Próximas
        </q-tab>
      </q-tabs>
    </div>

    <!-- Formulario de Criar e Editar  -->
    <q-modal ref="modalOwner" position="right" class="shadow-24" @close="clear()" :content-css="{padding: '20px'}">
      <strong v-if="!key">Cadastrar Cirurgia</strong>
      <strong v-else>Editar Cirurgia</strong>
      <hr>
      <form @submit.prevent="register($event)" ref="formToReset">
        <div class="floating-label">
          <input required class="full-width" v-model="doctor">
          <label>Doutor</label>
        </div>

        <div class="floating-label">
          <input required class="full-width" v-model="type">
          <label>Tipo Cirurgia</label>
        </div>

        <div class="floating-label">
          <input required class="full-width" v-model="dateTime" v-mask="'##/##/#### ##:##'">
          <label>Data e Hora</label>
        </div>

        <div class="">
          <label>
              <q-checkbox v-model="payment"></q-checkbox>
              Pago
            </label>
        </div>

        <div class="floating-label">
          <input required class="full-width" v-model="price" v-mask="'NNN,NN'">
          <label>Preço</label>
        </div>

        <div class="floating-label">
          <br>
          <button v-if="key" type="submit" class="full-width indigo" ref="submitRegister">
              Editar
            </button>

          <button v-else type="submit" class="full-width indigo" ref="submitRegister">
              Cadastrar
            </button>
        </div>
      </form>
    </q-modal>
  </q-layout>
</template>

<script>
  import Firebase from '../resources/firebase-config'
  import { Dialog } from 'quasar'
  // ActionSheet
  export default {
    data () {
      return {
        doctor: null,
        dateTime: null,
        price: null,
        type: null,
        key: null,
        payment: false,
        list: {}
      }
    },
    computed: {
      closedBox: function () {
        // Fechamento de caixa
      }
    },
    methods: {
      clear () {
        this.doctor = null
        this.dateTime = null
        this.price = null
        this.type = null
        console.log('limpou')
        this.$refs.formToReset.reset()
      },
      register (event) {
        const attribute = { doctor: this.doctor, dateTime: this.dateTime, price: this.price, typeSurgery: this.type, payment: this.payment }

        const btn = this.$refs.submitRegister
        btn.disabled = true

        if (!this.key) {
          btn.innerText = 'Cadastrando...'
          Firebase.FirebaseDatabase.ref('analises').push(attribute)
            .then(msg => {
              this.key = null
              btn.disabled = false
              btn.innerText = 'Cadastro'
              event.target.reset()
              return this.$refs.modalOwner.close()
            })
        }
        else {
          btn.innerText = 'Editando...'
          Firebase.FirebaseDatabase.ref(`analises/${this.key}`).update(attribute)
            .then(msg => {
              this.key = null
              // or this.clear
              event.target.reset()
              btn.disabled = false
              return this.$refs.modalOwner.close()
            })
        }
      },
      edit (key) {
        Firebase.FirebaseDatabase.ref(`analises/${key}`).on('value', snapshot => {
          const data = snapshot.val()
          // pegar o id para passsar a edição
          this.key = key

          this.doctor = data.doctor
          this.dateTime = data.dateTime
          this.price = data.price
          this.type = data.typeSurgery
          this.payment = data.payment
        })
        return this.$refs.modalOwner.open()
      },

      remove (key) {
        Dialog.create({
          title: 'Deletar',
          message: 'Saiba que ao deletar esse dado não pode ser recuperado!',
          buttons: [
            'Não',
            {
              label: 'Sim',
              handler () {
                Firebase.FirebaseDatabase.ref(`analises/${key}`).remove()
              }
            }
          ]
        })
      }
    },
    created () {
      Firebase.FirebaseDatabase.ref('analises').on('value', snapshot => {
        this.list = snapshot.val()
      })
    }
  }

</script>

<style lang="css">

</style>
