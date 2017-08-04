<template lang="html">
    <q-layout>
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
    </q-layout>
</template>

<script>
export default {
}
</script>

<style lang="css">
</style>
