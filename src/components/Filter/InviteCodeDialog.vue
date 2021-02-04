<template>
  <q-dialog v-model="isOpen">
    <q-card style="width: 450px">
      <q-card-section>
        <div class="text text-h6">Add new player to {{ club }}</div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <div class="main-container">
          <span class="title text-h8 text"
            >Use this link to register new player to this club</span
          >
          <q-card class="my-card" flat bordered>
            <q-card-section horizontal>
              <span class="col row justify-center code">{{
                Utils.truncate(fullURL, 45)
              }}</span>
              <q-card-actions vertical class="justify-around">
                <q-btn
                  flat
                  size="10px"
                  color="secondary"
                  icon="file_copy"
                  v-on:click="copyCodeClicked"
                >
                  <q-tooltip content-class="bg-grey-8">Copy code</q-tooltip>
                </q-btn>
              </q-card-actions>
            </q-card-section>
          </q-card>
          <div>
            <q-tooltip v-model="showing">Copied to clipboard!</q-tooltip>
          </div>
        </div>
      </q-card-section>

      <q-card-actions align="right" class="bg-white text-primary">
        <q-btn flat label="OK" v-close-popup />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
import { copyToClipboard } from "quasar";
import Utils from "../../boot/utils";

export default {
  name: "InviteCodeDialog",
  props: {
    code: String,
    club: String
  },
  data() {
    return {
      isOpen: true,
      showing: false,
      fullURL: "",
      Utils: Utils
    };
  },
  mounted() {
    this.fullURL = window.location.origin + "/#/?code=" + this.code;
  },
  watch: {
    isOpen(val) {
      if (!val) this.$emit("close");
    }
  },
  methods: {
    copyCodeClicked() {
      if (!this.code) {
        return;
      }
      copyToClipboard(this.fullURL)
        .then(() => {
          this.showing = true;
          setTimeout(
            function() {
              this.showing = false;
            }.bind(this),
            2500
          );
        })
        .catch(() => {
          console.log("Failed copy to clipboard");
        });
    }
  }
};
</script>

<style scoped>
.code {
  align-items: center;
  font-weight: bold;
  font-size: 16px;
}

.text {
  user-select: none;
}

.title {
  font-weight: bold;
  color: gray;
}

.my-card {
  margin-top: 8px;
}

.main-container {
  margin: 10px 0;
}
</style>
