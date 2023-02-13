import { createRouter, createWebHistory } from 'vue-router'
import TheContacts from '../components/TheContacts.vue'
import TheContactItem from '../components/TheContactItem.vue'
import TheContactAdd from '../components/TheContactAdd.vue'
import TheContactEditor from '../components/TheContactEditor.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'contacts',
      component: TheContacts,
      props:true
    },
    {
      path: '/contact-item',
      name: 'contact-item',
      component: TheContactItem,
      props:true
    },
    {
      path: '/contact-add',
      name: 'contact-add',
      component: TheContactAdd,
    },
    {
      path: '/contact-editor',
      name: 'contact-editor',
      component: TheContactEditor,
      props: true
    }
  ]
})

export default router
