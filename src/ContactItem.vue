<script setup>
const contact = defineModel({required: true, default: {name: ""}})
const emit = defineEmits(['save'])

</script>
<template>
    <form @submit.prevent.stop="emit('save', contact)">
        <span v-if="contact?.id">#{{ contact.id }}</span>
        <input v-model="contact.name"/>
        <button>Save</button>
    </form>
</template>
<style scoped>
</style>
