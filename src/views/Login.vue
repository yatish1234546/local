<template lang="html">
  <v-content id="content-Container">
    <v-container fluid fill-height>
      <v-layout align-center justify-end>
        <v-flex xs12 sm12 md4>
          <v-card flat color="grey lighten-4">
            <v-toolbar flat color="primary">
              <v-spacer></v-spacer>
            </v-toolbar>
            <v-card-text>
              <v-form>
                <v-text-field
                  prepend-icon="person"
                  name="username"
                  label="User Name"
                  type="text"
                  v-model="model.username"
                ></v-text-field>
                <v-text-field
                  prepend-icon="lock"
                  name="password"
                  label="Password"
                  id="password"
                  type="password"
                  v-model="model.password"
                ></v-text-field>
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn @click="login" :loading="loading">Login</v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </v-content>
</template>

<script>
import MutationTypes from '@/state/mutation-types';

export default {
  name: 'login-view',
  data: () => ({
    loading: false,
    model: {
      username: 'admin',
      password: 'password',
    },
  }),
  methods: {
    login() {
      this.loading = true;
      this.$store
        .dispatch(MutationTypes.LOGIN, this.model)
        .then(() => {
          this.loading = false;
          this.$router.push(this.$route.query.redirect || '/content/dashboard');
        })
        .catch((e) => {
          this.loading = false;
        });
    },
  },
};
</script>

<style lang="stylus" scoped>
#content-Container
  background-color: #eeeeee
  background-image  url('/img/digital_city.png')
  background-position: left bottom
</style>
