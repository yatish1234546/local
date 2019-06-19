<template lang="html">
<v-container grid-list-xs,sm,md,lg,xl>
    <v-layout>
        <v-flex>
            <form-wizard @on-complete="onComplete" color="#00b894" step-size="lg">
                <span class="header" slot="title">New Floor Plan</span>
                <tab-content title="Initiate New Plan" icon="fas fa-database" class="tab-content">
                    <v-flex xs12 sm12 class="ma-2">
                        <span class="title secondary--text" >Pull Schedule</span>
                    </v-flex>
                    <v-layout class="tab-data-details">
                        <v-flex xs2 sm2 style="margin-top:20px">
                            <span class="title" >Upload Excel Sheet</span>
                        </v-flex>
                        <v-flex xs3 sm3>
                            <v-text-field style="height:20px; padding:0px" outline></v-text-field>
                        </v-flex>
                        <v-flex xs5 sm5 style="margin-left:10px; margin-top:10px">
                            <v-btn color="basic" @click="$refs.inputUpload.click()">Browse</v-btn>
                            <v-btn color="info" @click="$refs.inputUpload.click()">Upload</v-btn>
                            <input v-show="false" ref="inputUpload" type="file" @change="fileUpload" >
                        </v-flex>
                    </v-layout>
                    <v-layout>
                        <v-flex xs2 sm2>
                            <span class="text">OR</span>
                        </v-flex>
                    </v-layout>
                    <v-layout style="margin-left:0px">
                        <v-flex xs2 sm2>
                            <v-btn color="info">Auto Discover</v-btn>
                        </v-flex>
                    </v-layout>
                </tab-content>
                <tab-content title="Upload Floor Plans" icon="fas fa-compress" :before-change="beforeTabSwitch">
                    My second tab content
                </tab-content>
                <tab-content title="Location and Cluster Mappings" icon="fas fa-map-marker-alt">
                    Yuhuuu! This seems pretty damn simple
                </tab-content>
                <tab-content title="Preview and Finish" icon="far fa-eye">
                    Yuhuuu! This seems pretty damn simple
                </tab-content>
            </form-wizard>
        </v-flex>
    </v-layout>
</v-container>
</template>

<script>
import { FormWizard, TabContent } from "vue-form-wizard";
import "vue-form-wizard/dist/vue-form-wizard.min.css";
export default {
  name: "commissioning-view",
  components: {
    FormWizard,
    TabContent
  },
  data() {
    return {
      loadFloorPlan: false
    };
  },
  methods: {
    onComplete() {
      alert("Yay. Done!");
    },
    fileUpload(event) {
      console.log(event);
    },
    beforeTabSwitch() {
      this.$router.push({
        path: "floor"
      });
      return true;
    }
  }
};
</script>

<style lang="css" scoped>
.header {
  font-size: 28px;
}

.text {
  font-size: 20px;
  margin-left: 10px;
}

.tab-content {
  border-top: 0.5px solid grey;
}

.tab-data-details {
  margin-top: 20px;
  margin-left: 10px;
}
</style>
