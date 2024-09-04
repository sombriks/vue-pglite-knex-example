<script setup>
import ContactItem from "./ContactItem.vue";
import {onMounted, ref, watch} from "vue";
import {db} from "./database.js";

const contacts = ref([])
const contact = ref({name: ''})
const q = ref('')

const list = async () => {
    contacts.value = await db('contacts').whereILike('name',`%${q.value}%`)
}

const doInsert = async (c) => {
    await db('contacts').insert({name:c.name})
    contact.value = {name:''}
    await list()
}

const doUpdate = async (c) => {
    const {name, id} = c
    const updated = new Date()
    await db('contacts').update({name,updated}).where({id})
    contact.value = {name:''}
    await list()
}

const doDel = async (c) => {
    await db('contacts').del().where({id:c.id})
    await list()
}

onMounted(() => list())
watch(q, () => list())
</script>
<template>
    <h1>Contacts</h1>
    <input v-model="q" placeholder="search"/>
    <contact-item v-model="contact" @save="doInsert"></contact-item>
    <contact-item v-for="contact in contacts" :key="contact.id" 
    :model-value="contact" @save="doUpdate" @del="doDel"></contact-item>
</template>
<style scoped>
</style>
