<template lang="html">
  <v-container fluid grid-list-xl>
    <v-layout row wrap>
      <v-flex xs12 sm4 md4 lg4 xl4 grow>
        <v-layout row wrap>
          <v-flex xs12>
            <v-card color="grey lighten-4">
              <v-toolbar flat>
                <span class="title secondary--text">Users Summary</span>
              </v-toolbar>
              <v-divider></v-divider>
              <v-card-text>
                <div class="mb-4 body-1">Total: {{ userStats.total }}</div>
                <div v-for="(count, role) in userStats.rolesCount" v-bind:key="role">
                  <div class="mb-2 body-1">{{ role }} : {{ count }}</div>
                </div>
              </v-card-text>
              <v-card-actions>
                <div style="cursor:pointer" @click="downloadUserData()">
                  <v-icon small>fas fa-file-export</v-icon> Download current user data (Excel)
                </div>
              </v-card-actions>
            </v-card>
          </v-flex>
          <v-flex xs12>
            <v-card color="grey lighten-4">
              <v-card-title>
                <span class="title secondary--text">{{ formTitle }}</span>
              </v-card-title>
              <v-divider></v-divider>
              <v-card-text>
                <v-form ref="form" v-model="valid" lazy-validation>
                  <v-layout row wrap>
                    <v-flex xs12 sm6 md6>
                      <v-text-field
                        v-model="editedItem.firstName"
                        label="First Name"
                        :rules="firstNameRules"
                      >
                      </v-text-field>
                    </v-flex>
                    <v-flex xs12 sm6 md6>
                      <v-text-field
                        v-model="editedItem.lastName"
                        label="Last Name"
                        :rules="lastNameRules"
                      >
                      </v-text-field>
                    </v-flex>
                    <v-flex xs12 sm12 md12>
                      <v-text-field
                        v-model="editedItem.userName"
                        label="Username"
                        :rules="userNameRules"
                      >
                      </v-text-field>
                    </v-flex>
                    <v-flex xs12 sm6 md6>
                      <v-text-field
                        v-model="editedItem.email"
                        label="Email"
                        :rules="emailRules"
                      ></v-text-field>
                    </v-flex>
                    <v-flex xs12 sm6 md6>
                      <v-text-field
                        v-model="editedItem.phone"
                        label="Phone"
                        :rules="[v => !v || 'Phone is required']"
                      ></v-text-field>
                    </v-flex>
                    <v-flex xs12 sm12 md12>
                      <v-select
                        v-model="editedItem.roles"
                        :items="roles"
                        attach
                        chips
                        label="Roles"
                        multiple
                        :rules="[v => !v || 'Roles is required']"
                      ></v-select>
                    </v-flex>
                    <v-flex xs12 sm12 md12>
                      <v-btn color="accent" @click="cancel" v-if="operation !== 'new'"
                        >Cancel</v-btn
                      >
                      <v-btn color="accent" @click="reset" v-if="operation === 'new'">Reset</v-btn>
                      <v-btn color="secondary" @click="save">Save</v-btn>
                    </v-flex>
                  </v-layout>
                </v-form>
              </v-card-text>
            </v-card>
          </v-flex>
        </v-layout>
      </v-flex>
      <v-flex xs12 sm8 md8 lg8 xl8>
        <v-card color="grey lighten-4">
          <v-card-title> <span class="title secondary--text">Users</span> </v-card-title>
          <v-divider></v-divider>
          <v-data-table
            light
            :headers="headers"
            :items="users"
            :expand="expand"
            item-key="email"
            class="custom"
            :rows-per-page-items="rowsPerPageItems"
            :pagination.sync="pagination"
          >
            <template v-slot:items="props">
              <tr @click="props.expanded = !props.expanded" >
                <td class="text-xs-left">{{ props.item.firstName }}</td>
                <td class="text-xs-left">{{ props.item.lastName }}</td>
                <td class="text-xs-left">{{ props.item.userName }}</td>
                <td class="text-xs-left">{{ props.item.email }}</td>
                <td class="justify-center layout px-0">
                  <v-icon small class="mr-2" @click="editItem(props.item)">edit</v-icon>
                  <v-icon
                    small
                    class="mr-2"
                    @click="setItemForDeletion(props.item)"
                    v-if="allowModification(props.item)"
                  >
                    delete
                  </v-icon>
                  <v-icon small class="mr-2" @click="resetEmail(props.item)">fas-key</v-icon>
                </td>
              </tr>
            </template>
            <template v-slot:expand="props">
              <v-card flat>
                <v-card-text>
                  Phone: {{ props.item.phone }} <br/>
                  Roles: {{ stringifyRoles(props.item.roles) }} <br />
                  Created Date: {{ props.item.createdDate }} <br />
                  Last Login: {{ props.item.lastLoggedInDate }} <br />
                </v-card-text>
              </v-card>
            </template>
          </v-data-table>
        </v-card>
      </v-flex>
    </v-layout>
    <v-dialog v-model="confirmUserDeletionDialog" width="500">
      <v-card>
        <v-card-title class="headline grey lighten-2" primary-title>
          Confirm Deletion
        </v-card-title>
        <v-card-text>
          Are you sure you want to delete this user? User account will be deavtivated and archived
          in the System?
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" flat @click="confirmUserDeletionDialog = false">
            No
          </v-btn>
          <v-btn color="primary" flat @click="deleteItem">
            Yes
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import MutationTypes from '@/state/mutation-types';

export default {
  name: 'users-manager',
  data() {
    return {
      valid: true,
      expand: false,
      newUserDialog: false,
      confirmUserDeletionDialog: false,
      saveLoading: false,
      itemForDeletion: null,
      firstName: '',
      lastName: '',
      login: '',
      email: '',
      userType: 'executive',
      operation: 'new',
      editedItem: {
        id: '',
        firstName: '',
        lastName: '',
        login: '',
        email: '',
        roles: [],
        createdDate: '',
        lastLoggedIn: '',
      },
      firstNameRules: [v => !!v || 'First name is required'],
      lastNameRules: [v => !!v || 'Last name is required'],
      userNameRules: [v => !!v || 'Username is required'],
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+/.test(v) || 'E-mail must be valid',
      ],
      rowsPerPageItems: [10, 20, 30, 40],
      pagination: {
        rowsPerPage: 20,
      },
      headers: [
        {
          text: 'First Name',
          align: 'left',
          sortable: false,
          value: 'firstName',
        },
        {
          text: 'Last Name',
          align: 'left',
          sortable: false,
          value: 'lastName',
        },
        {
          text: 'Username',
          align: 'left',
          sortable: false,
          value: 'username',
        },
        {
          text: 'Email',
          align: 'left',
          sortable: false,
          value: 'email',
        },
        {
          text: 'Change',
          align: 'left',
          sortable: false,
          value: '',
        },
      ],
    };
  },
  mounted() {
    this.$store.dispatch(MutationTypes.RETRIEVE_USERS);
    this.$store.dispatch(MutationTypes.RETRIEVE_ROLES);
  },
  methods: {
    exportUsers() {},
    stringifyRoles(roles) {
      return roles.join(', ');
    },
    resetOperation() {
      this.operation = 'new';
      this.firstName = '';
      this.lastName = '';
      this.login = '';
      this.userType = 'user';
      this.email = '';
      this.editedItem = {};
    },

    close() {
      this.newUserDialog = false;
    },
    cancel() {
      this.resetOperation();
    },
    save() {
      if (this.$refs.form.validate()) {
        this.saveLoading = true;
        if (this.operation === 'new') {
          this.$store
            .dispatch(MutationTypes.CREATE_USER, this.editedItem)
            .then(() => {
              this.newUserDialog = false;
              this.saveLoading = false;
              this.$store.dispatch(MutationTypes.SNACKBAR_SHOW, {
                message: 'User created successfully',
                color: 'success',
              });
              this.resetOperation();
            })
            .catch((e) => {
              this.newUserDialog = false;
              this.saveLoading = false;
            });
        } else {
          this.$store
            .dispatch(MutationTypes.UPDATE_USER_INFO, this.editedItem)
            .then(() => {
              this.newUserDialog = false;
              this.saveLoading = false;
              this.operation = 'new';
              this.$store.dispatch(MutationTypes.SNACKBAR_SHOW, {
                message: 'Update user info successfully',
                color: 'success',
              });
              this.resetOperation();
            })
            .catch((e) => {
              this.operation = 'new';
              this.newUserDialog = false;
              this.saveLoading = false;
            });
        }
      }
    },
    editItem(item) {
      this.operation = 'edit';
      this.editedIndex = this.users.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.newUserDialog = true;
    },
    setItemForDeletion(item) {
      this.itemForDeletion = item;
      this.confirmUserDeletionDialog = true;
    },
    deleteItem() {
      if (this.itemForDeletion) {
        this.$store.dispatch(MutationTypes.DELETE_USER, this.itemForDeletion).then(() => {
          this.confirmUserDeletionDialog = false;
          this.$store.dispatch(MutationTypes.SNACKBAR_SHOW, {
            message: 'User deleted successfully',
            color: 'success',
          });
        });
      } else {
        console.error('Item for deletion is not set');
      }
    },
    allowModification(item) {
      if (item.login !== 'system' && item.login !== 'admin') {
        return true;
      }

      return false;
    },
    downloadUserData() {
      console.log('downloading...');
    },
    reset() {
      this.$refs.form.reset();
      this.$refs.form.resetValidation();
    },
  },

  computed: {
    formTitle() {
      return this.operation === 'new' ? 'New User' : 'Edit User';
    },
    users() {
      return this.$store.getters.users;
    },
    roles() {
      return this.$store.getters.roles;
    },
    userStats() {
      const { users } = this;
      return {
        total: 0,
        rolesCount: {
          'System Admin': 0,
          'Facility Admin': 0,
          'Field Engg.': 0,
          'Support Engg.': 0,
          Executive: 0,
        },
      };
    },
  },
};
</script>

<style lang="css" scoped></style>
