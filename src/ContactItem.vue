<script setup>
const contact = defineModel({required: true, default: {name: ""}})
const emit = defineEmits(['save','del'])
</script>
<template>
    <form @submit.prevent.stop="emit('save', contact)">
        <span v-if="contact?.id">#{{ contact.id }}</span>
        <input v-model="contact.name"/>
        <button>Save</button>
        <button type="button" @click="emit('del', contact)">Delete</button>
    </form>
</template>
<style scoped>
</style>
