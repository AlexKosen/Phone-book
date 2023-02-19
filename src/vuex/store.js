import { createStore } from "vuex";
import axios from "axios";

export const store = createStore({
  state() {
    return {
      contacts: [],
      contact: [],
    };
  },
  mutations: {
    SET_CONTACT_TO_STATE: (state, contacts) => {
      state.contacts = contacts;
    },
    EDIT_CONTACT: (state, contact) => {
      state.contact = contact;
    },

  },
  actions: {
    GET_CONTACTS_FROM_API({ commit }) {
      axios
        .get(
          "https://63e3b470619fce55d41f7258.mockapi.io/Users?page=1&limit=10&sortBy=name"
        )
        .then((contacts) => {
          commit("SET_CONTACT_TO_STATE", contacts.data);
          return contacts;
        })
        .catch((error) => {
          console.log(error);
          return error;
        });
    },
    GET_CONTACTS_FROM_API_PAGINATION({ commit }, page) {
      axios
        .get(
          `https://63e3b470619fce55d41f7258.mockapi.io/Users?page=${page}&limit=10&sortBy=name`
        )
        .then((contacts) => {
          commit("SET_CONTACT_TO_STATE", contacts.data);
          return contacts;
        })
        .catch((error) => {
          console.log(error);
          return error;
        });
    },
    DELETE_CONTACT_FROM_API({ commit }, index) {
      let result = confirm("Delete your contact details?");
      if (result) {
        axios
          .delete(
            `https://63e3b470619fce55d41f7258.mockapi.io/Users/${index.id}`
          )
          .then((resOne) => {
            if(resOne.status = 200) {alert('Contact successfully deleted!')};
            if(resOne.status = !200) {alert('Contact not deleted!')}
            axios
              .get(
                "https://63e3b470619fce55d41f7258.mockapi.io/Users?page=1&limit=10&sortBy=name"
              )
              .then((contacts) => {
                commit("SET_CONTACT_TO_STATE", contacts.data);
                return contacts;
              })
              .catch((error) => {
                console.log(error);
                return error;
              });
          })
          .catch((error) => {
            console.log(error);
            return error;
          });
      }
    },
    ADD_CONTACT_FROM_API({ commit }, data) {
      axios
        .post("https://63e3b470619fce55d41f7258.mockapi.io/Users", data)
        .then((resOne) => {
          if(resOne.status = 200) {alert('Contact successfully added!')};
          if(resOne.status = !200) {alert('Contact not added!')}
          axios
            .get(
              "https://63e3b470619fce55d41f7258.mockapi.io/Users?page=1&limit=10&sortBy=name"
            )
            .then((contacts) => {
              commit("SET_CONTACT_TO_STATE", contacts.data);
              return contacts;
            })
            .catch((error) => {
              console.log(error);
              return error;
            });
        })
        .catch((error) => {
          console.log(error);
          return error;
        });
    },

    ADD_TO_CONTACT_EDIT({ commit }, contact) {
      commit("EDIT_CONTACT", contact);
    },

    EDIT_CONTACT_FROM_API({ commit }, index) {
      let result = confirm("Correct your contact details?");
      if (result) {
        axios
          .put(
            `https://63e3b470619fce55d41f7258.mockapi.io/Users/${index.id}`,
            index
          )
          .then((resOne) => {
            if(resOne.status = 200) {alert('Contact successfully edited!')};
            if(resOne.status = !200) {alert('Contact not edited!')}
            axios
              .get(
                "https://63e3b470619fce55d41f7258.mockapi.io/Users?page=1&limit=10&sortBy=name"
              )
              .then((contacts) => {
                commit("SET_CONTACT_TO_STATE", contacts.data);
                return contacts;
              })
              .catch((error) => {
                console.log(error);
                return error;
              });
          })
          .catch((error) => {
            console.log(error);
            return error;
          });
      }
    },
    GET_SEARCH_CONTACTS_FROM_API({ commit }, data_search) {
      axios
        .get(
          `https://63e3b470619fce55d41f7258.mockapi.io/Users?name=${data_search}`
        )
        .then((contacts) => {
          commit("SET_CONTACT_TO_STATE", contacts.data);
          return contacts;
        })

        .catch((error) => {
          console.log(error);
          return error;
        });
    },
    SORT_BY_DATE_ADDED_FROM_API({ commit }, data) {
      axios
        .get(
          `https://63e3b470619fce55d41f7258.mockapi.io/Users?page=${data.page}&limit=10&orderby=createdAt&order=${data.sort}`
        )
        .then((contacts) => {
          commit("SET_CONTACT_TO_STATE", contacts.data);
          return contacts;
        })
        .catch((error) => {
          console.log(error);
          return error;
        });
    },
  },
  getters: {
    CONTACTS(state) {
      return state.contacts;
    },

    CONTACT_EDIT(state) {
      return state.contact;
    },
  },
});
