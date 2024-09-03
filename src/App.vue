<script setup>
import ContactItem from "./ContactItem.vue";
import {onMounted, ref} from "vue";
import {db} from "./database.js";

const contacts = ref([])
const contact = ref({name: ''})
const q = ref('')

const list = async () => {
    const result = await db.query(`select *
                                   from contacts
                                   where nome ilike '%'||$1||'%' `, [q.value])
    contacts.value = result.rows
}

const doInsert = async (c) => {
    await db.query(`insert into contacts (name)
                    values ($1)`, [c.value.name])
    await list()
}

const doUpdate = async (c) => {
    const {name, id} = c.value
    const updated = new Date()
    await db.query(`update contacts set name = $1, updated = $2 where id = $3`,[name, updated, id])
    await list()
}

onMounted(() => list())
</script>
<template>
    <h1>Contacts</h1>
    <contact-item v-model="contact" @save="doInsert"></contact-item>
    <contact-item v-for="contact in contacts" :key="contact.id" :model-value="contact" @save="doUpdate"></contact-item>
</template>
<style scoped>
</style>
