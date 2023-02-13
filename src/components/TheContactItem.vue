<script>
import { mapGetters } from "vuex";
export default {
  props: {
    contacts_data: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  data() {
    return {};
  },

  computed: {
    ...mapGetters(["CONTACTS"]),
  },

  methods: {
    deleteContact() {
      this.$emit("deleteContact", this.contacts_data);
    },
    editContact() {
      this.$emit("editContact", this.contacts_data);
    },
  },
};
</script>

<template>
  <div class="the-contact-item">
    <p class="the-contact-item__name">{{ contacts_data.name }}</p>
    <p class="the-contact-item__create">{{ contacts_data.email }}</p>
    <p class="the-contact-item__number-phone">
      {{ contacts_data.numberPhone }}
    </p>
    <router-link :to="{ name: 'contact-editor' }">
      <button class="the-contact-item__editor btn" @click="editContact">
        Edit
      </button>
    </router-link>
    <button class="the-contact-item__delete btn" @click="deleteContact">
      Delete
    </button>
  </div>
</template>

<style lang="scss">
@import "../assets/styles/styles.scss";
.the-contact-item {
  flex-basis: 25%;
  box-shadow: 0 0 8px 0;
  padding: $padding * 2;
  margin-bottom: $margin * 2;
  &__data {
    margin: $margin;
  }
  &__editor {
    background: rgb(58, 58, 252);
    color: #ffffff;
    border: solid 1px #aeaeae;
  }
  &__delete {
    background: rgb(58, 58, 252);
    color: #ffffff;
    border: solid 1px #aeaeae;
  }
  .btn {
    margin: $margin * 0.5;
    width: 125px;
    height: 35px;
  }
  p {
    margin: $margin;
  }
}
.the-contact-item__name,
.the-contact-item__number-phone {
  font-weight: bolder;
}
</style>
