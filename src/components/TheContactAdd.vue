<script>
import { mapActions, mapGetters } from "vuex";

export default {
  data() {
    return {
      user: {
        name: "",
        numberPhone: "",
        email: ""
      },
    };
  },
  methods: {
    ...mapActions(["ADD_CONTACT_FROM_API"]),

    addContact() {
        if (this.user.name && this.user.numberPhone) {
            this.ADD_CONTACT_FROM_API(this.user);
            this.user.name = "";
            this.user.numberPhone = "";
            this.$router.push("/")
        } else {
            alert("Please, correct enter your  number phone or name")
        }
     },
     cancelAdding() {
      this.user.name = "";
      this.user.numberPhone = ""; 
      this.$router.push('/');     
     }
  },
};
</script>

<template>
  <div class="add-contact" ref="add_contact">
    <h2>Add Contact</h2>
    <form class="add-contact__form form-add" action="">
      <div class="form-add__input-field">
        <label for="add-contact__name">Name</label>
        <input
          placeholder="Please, enter new  name (Aaa Aaa)"
          class="form-add__input add-contact__input"
          type="text"
          id="add-contact__name"
          v-model="user.name"
        />
      </div>

      <div class="form-add__input-field">
        <label for="add-contact__phone">Phone</label>
        <input
          placeholder="Please, enter new  phone (000-000-000)"
          class="form-add__input add-contact__input"
          type="text"
          id="add-contact__phone"
          v-model="user.numberPhone"
        />
      </div>
      <div class="form-add__input-field">
        <label for="add-contact__phone">Email</label>
        <input
          placeholder="Please, enter new  email (aa@aa.a)"
          class="form-add__input add-contact__input"
          type="text"
          id="add-contact__phone"
          v-model="user.email"
        />
      </div>

      <div class="form-add__input-field">
        <button
          class="form-add__btn add-contact__btn form-add__btn--cancel"
          @click.prevent="cancelAdding"
        >
          Cancel
        </button>
        <button
          class="form-add__btn add-contact__btn form-add__btn--submit"
          @click.prevent="addContact"
          type="submit"
        >
          Save 
        </button>
      </div>
    </form>
  </div>
</template>

<style lang="scss">
@import "../assets/styles/styles.scss";
.add-contact {
  padding: $padding;
  box-shadow:0 0 8px 0;


  &__input {
    width: 40%;
    margin: $margin;
    height: 33px;
    border-radius: $radius;
    border: solid 1px #aeaeae;
  }
  .form-add__btn {
  margin: $margin;
  width: 120px;
  height: 35px; 
  border: solid 1px #aeaeae;
  background: rgb(34, 34, 253);
  color: #fff
}
}
</style>
