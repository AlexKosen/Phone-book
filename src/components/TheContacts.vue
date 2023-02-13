<script>
import TheContactItem from "./TheContactItem.vue";
import TheContactEditorVue from "./TheContactEditor.vue";
import { mapActions, mapGetters } from "vuex";

export default {
  components: {
    TheContactItem,
    TheContactEditorVue,
  },
  data() {
    return {
      pageNumber: 1,
      BtnNextPage: false,
      BtnPrevPage: true,
      btnPagination: true,
      btnPaginationForFilter: "",
      search: "",
      showBtnbackToContact: false,
      sortAscending: "ask",
      sortDescending: "desc",
    };
  },

  computed: {
    ...mapGetters(["CONTACTS"]),
    showBtnPrevPage() {
      if (this.pageNumber <= 1) {
        return (this.BtnPrevPage = true);
      }
    },
    showBtnNextPage() {
      if (this.CONTACTS.length < 10) {
        return (this.BtnNextPage = true);
      }
    },
    showHiddenMessage() {
      if (this.CONTACTS.length == 0) {
        return true;
      }
    },
  },

  methods: {
    ...mapActions([
      "GET_CONTACTS_FROM_API",
      "GET_CONTACTS_FROM_API_PAGINATION",
      "DELETE_CONTACT_FROM_API",
      "ADD_TO_CONTACT_EDIT",
      "GET_SEARCH_CONTACTS_FROM_API",
      "SORT_BY_DATE_ADDED_FROM_API",
    ]),
    deleteContact(data) {
      this.DELETE_CONTACT_FROM_API(data);
      this.showBtnbackToContact = false;
    },

    editContact(data) {
      this.ADD_TO_CONTACT_EDIT(data);
      this.showBtnbackToContact = false;
    },
    nextPage() {
      if (this.btnPaginationForFilter === "sortByDateAddedNew") {
        this.pageNumber++;
        this.SORT_BY_DATE_ADDED_FROM_API({
          page: this.pageNumber,
          sort: this.sortDescending,
        });
      } else if (this.btnPaginationForFilter === "sortByDateAddedOld") {
        this.pageNumber++;
        this.SORT_BY_DATE_ADDED_FROM_API({
          page: this.pageNumber,
          sort: this.sortAscending,
        });
      } else {
        this.pageNumber++;
        this.GET_CONTACTS_FROM_API_PAGINATION(this.pageNumber);
      }
    },

    previousPage() {
      if (this.btnPaginationForFilter === "sortByDateAddedNew") {
        this.pageNumber--;
        this.SORT_BY_DATE_ADDED_FROM_API({
          page: this.pageNumber,
          sort: this.sortDescending,
        });
      } else if (this.btnPaginationForFilter === "sortByDateAddedOld") {
        this.pageNumber--;
        this.SORT_BY_DATE_ADDED_FROM_API({
          page: this.pageNumber,
          sort: this.sortAscending,
        });
      } else {
        this.pageNumber--;
        this.GET_CONTACTS_FROM_API_PAGINATION(this.pageNumber);
      }
    },
    getSearchContact() {
      if (this.search.length >= 2) {
        this.GET_SEARCH_CONTACTS_FROM_API(this.search);
        this.showBtnbackToContact = true;
        this.btnPagination = false;
        this.search = "";
      } else {
        this.search = "";
        alert("Please, enter your contact correctly");
      }
    },
    backToContact() {
      this.pageNumber = 1;
      this.showBtnbackToContact = false;
      this.GET_CONTACTS_FROM_API();
      this.btnPagination = true;
      this.btnPaginationForFilter = "";
    },
    sortByDateAddedNew() {
      this.pageNumber = 1;
      this.btnPagination = true;
      this.SORT_BY_DATE_ADDED_FROM_API({
        page: this.pageNumber,
        sort: this.sortDescending,
      });
      this.showBtnbackToContact = true;
      this.btnPaginationForFilter = "";
      this.btnPaginationForFilter = "sortByDateAddedNew";
    },
    sortByDateAddedOld() {
      this.pageNumber = 1;
      this.btnPagination = true;
      this.SORT_BY_DATE_ADDED_FROM_API({
        page: this.pageNumber,
        sort: this.sortAscending,
      });
      this.showBtnbackToContact = true;
      this.btnPaginationForFilter = "";
      this.btnPaginationForFilter = "sortByDateAddedOld";
    },
  },
  mounted() {
    this.GET_CONTACTS_FROM_API();
  },
};
</script>

<template>
  <div class="the-contact">
    <router-link :to="{ name: 'contact-add' }">
      <button class="the-contact__link_to_add_user">Add contact</button>
    </router-link>
    <h1>Contacts</h1>
    <div class="the-contact__search-wrapper">
      <input
        class="the-contact__input"
        type="text"
        placeholder="Please, enter name of your contact"
        v-model="search"
      />
      <button class="the-contact__input-btn" @click="getSearchContact">
        Search
      </button>
 
      <div class="the-contact__sort-by-date-add"></div>
      <div v-show="showHiddenMessage">
        <h3>Sorry, nothing found!</h3>
      </div>
      <div>

        <button class="the-contact__sort-up-btn" @click="sortByDateAddedNew">
        Sort newContacts
      </button>
      <button class="the-contact__sort-down-btn" @click="sortByDateAddedOld">
        Sort oldContacts
      </button>
      <button
        class="the-contact__back-to-contact-btn"
        v-if="showBtnbackToContact"
        @click="backToContact"
      >
        Reset sort
      </button>
      </div>
    </div>
    <TheContactItem
      v-for="item in CONTACTS"
      :key="item.id"
      :contacts_data="item"
      :showBtnbackToContact="showBtnbackToContact"
      @deleteContact="deleteContact"
      @editContact="editContact"
    />
    <div class="the-contact__btn-paginations btn" v-show="btnPagination">
      <button
        class="the-contact__btn_previous btn-paginations"
        @click="previousPage"
        :disabled="showBtnPrevPage"
      >
        Previous page
      </button>

      <button
        class="the-contact__btn_next btn-paginations"
        @click="nextPage"
        :disabled="showBtnNextPage"
      >
        Next page
      </button>
    </div>
  </div>
</template>

<style lang="scss">
@import "../assets/styles/styles.scss";
.the-contact {
  &__link_to_add_user {
    position: absolute;
    top: 20px;
    right: 10px;
    background: rgb(58, 58, 252);
    color: #ffffff;
    border: solid 1px #aeaeae;
    width: 125px;
    height: 33px;
  }
  &__search-wrapper {
    margin: $margin * 2;
  }
  &__input {
    margin-right: $margin;
    margin-bottom: $margin*2;
    border: solid 1px #aeaeae;
    height: 33px;
    width: 250px;
    border-radius: $radius;
  }
}
.btn-paginations {
  margin: $margin * 3 $margin;
  width: 125px;
  height: 35px;
  border: solid 1px #aeaeae;
  background: rgb(185, 199, 209);
}
.the-contact__input-btn {
  width: 125px;
  height: 35px;
  border: solid 1px #aeaeae;
  background: rgb(185, 199, 209);
  margin-bottom: $margin*2;
}
.the-contact__back-to-contact-btn {
  width: 125px;
  height: 35px;
  background: rgb(58, 58, 252);
  color: #ffffff;
  border: solid 1px #aeaeae;
  margin: $margin*0.5;
}
.the-contact__sort-up-btn {
  width: 125px;
  height: 35px;
  border: solid 1px #aeaeae;
  background: #9198e7;
  color: #fff;
  margin: $margin*0.5;
}
.the-contact__sort-down-btn {
  width: 125px;
  height: 35px;
  border: solid 1px #aeaeae;
  background: #9198e7;
  color: #fff;
  margin: $margin*0.5;
}
</style>
