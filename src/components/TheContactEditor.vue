<script>
import { mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {
      user: {
        name: "",
        numberPhone: "",
        id: "",
        email: "",
      },
    };
  },
  computed: {
    ...mapGetters(["CONTACT_EDIT"]),
  },

  methods: {
    ...mapActions(["EDIT_CONTACT_FROM_API"]),

    contact_edit_from_api() {
      this.user.id = this.CONTACT_EDIT.id;
      if (this.user.name.length < 4) {
        alert("Please, enter a Name of at least for letters");
        this.user.name = "";
        return;
      }
      if (this.user.numberPhone.length < 10) {
        alert("Please, enter a valid phone number at least 10 characters");
        this.user.numberPhone = "";
        return;
      } else {
        this.EDIT_CONTACT_FROM_API(this.user);
        this.user.name = "";
        this.user.numberPhone = "";
        this.user.id = "";
        this.$router.push("/");
      }
    },
  },
  mounted() {
    this.user.name = this.CONTACT_EDIT.name;
    this.user.numberPhone = this.CONTACT_EDIT.numberPhone;
    this.user.email = this.CONTACT_EDIT.email;
  }
};
</script>

<template>
  <div class="the-contact-item-editor">
    <div class="add-contact">
      <h2>Edit Contact</h2>
      <form class="add-contact__form form-add" action="">
        <div class="form-add__input-field">
          <h4 for="add-contact__name">Current name</h4>
          <div>{{ CONTACT_EDIT.name }}</div>
          <input
            placeholder="Please, enter new name (Aaa Aaa)"
            class="form-add__input add-contact__input"
            type="text"
            id="add-contact__name"
            v-model="user.name"
          />
        </div>

        <div class="form-add__input-field">
          <h4 for="add-contact__phone">Current phone</h4>
          <div>{{ CONTACT_EDIT.numberPhone }}</div>
          <input
            placeholder="Please, enter new number phone (000-000-000)"
            class="form-add__input add-contact__input"
            type="text"
            id="add-contact__phone"
            v-model="user.numberPhone"
          />
        </div>

        <div class="form-add__input-field">
          <h4 for="add-contact__phone">Current email</h4>
          <div>{{ CONTACT_EDIT.email }}</div>
          <input
            placeholder="Please, enter new email (aa@aa.a)"
            class="form-add__input add-contact__input"
            type="text"
            id="add-contact__phone"
            v-model="user.email"
          />
        </div>

        <div class="form-add__input-field">
          <router-link :to="{ name: 'contacts' }">
            <button
              class="form-add__btn add-contact__btn form-add__btn--cancel"
            >
              Cancel
            </button>
          </router-link>

          <button
            @click.prevent="contact_edit_from_api"
            class="form-add__btn add-contact__btn form-add__btn--submit"
            type="submit"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<style lang="scss">
@import "../assets/styles/styles.scss";

h4 {
  margin: $margin * 0.5;
}
</style>
