<template>
  <q-page class="flex justify-center">
    <div class="column">
      <h5 class="text">Setting</h5>
      <div id="setting-page-container" class="q-pa-md">
        <h5 class="text">Personal Setting</h5>
        <div class="row items-center">
          <!-- Profile picture -->
          <div class="col-sm-grow row q-mr-md">
            <div class="profile-pic-container">
              <q-img
                contain
                :ratio="1"
                :src="settingUser.picture"
                class="profile-pic"
              />
            </div>
            <div class="dropzone flex justify-center items-center">
              <p class="upload-text">
                {{
                  isUploadingPersonalPicture
                    ? "Uploading..."
                    : "Change Profile Picture"
                }}
              </p>
              <input
                class="file-upload"
                type="file"
                accept="image/png, image/jpeg"
                @change="upload($event.target.files, false)"
              />
            </div>
          </div>
          <div class="col-sm">
            <!-- Name -->
            <div class="row items-center">
              <div class="col-3">Name <span class="required">*</span></div>
              <!-- First name -->
              <div class="col-4">
                <q-input
                  stack-label
                  v-model="settingUser.firstname"
                  label="First Name"
                  lazy-rules
                  no-error-icon
                  :rules="[
                    val =>
                      (val !== null && val.length > 1) ||
                      'Please type your first name',
                    val => val.length < 15 || 'First name is too long'
                  ]"
                >
                  <template v-slot:prepend>
                    <q-icon name="mdi-account-box-outline" />
                  </template>
                </q-input>
              </div>
              <q-space />
              <!-- Last name -->
              <div class="col-4">
                <q-input
                  stack-label
                  v-model="settingUser.lastname"
                  label="Last Name"
                  lazy-rules
                  no-error-icon
                  :rules="[
                    val =>
                      (val !== null && val.length > 1) ||
                      'Please type your last name',
                    val => val.length < 15 || 'Last name is too long'
                  ]"
                >
                  <template v-slot:prepend>
                    <q-icon name="mdi-account-box-outline" />
                  </template>
                </q-input>
              </div>
            </div>

            <!-- Old password -->
            <div class="row items-center">
              <div class="col-3">Old Password</div>
              <!-- First name -->
              <div class="col">
                <q-input
                  stack-label
                  v-model="settingUser.oldPassword"
                  label="Old Password"
                  ref="password"
                  lazy-rules
                  no-error-icon
                  :type="isPwdOld ? 'password' : 'text'"
                  :rules="[
                    val =>
                      (val !== null && val.length > 1) ||
                      'Please type your first name'
                  ]"
                >
                  <template v-slot:prepend>
                    <div class="row items-center all-pointer-events">
                      <q-icon name="o_lock" />
                    </div>
                  </template>
                  <template v-slot:append>
                    <q-icon
                      :name="isPwdOld ? 'visibility_off' : 'visibility'"
                      class="cursor-pointer"
                      @click="isPwdOld = !isPwdOld"
                    />
                  </template>
                </q-input>
              </div>
            </div>

            <!-- New password -->
            <div class="row items-center">
              <div class="col-3">New password</div>
              <!-- New password -->
              <div class="col-4">
                <q-input
                  stack-label
                  v-model="settingUser.newPassword"
                  label="Password"
                  ref="newPassword"
                  lazy-rules
                  no-error-icon
                  :type="isPwdNew ? 'password' : 'text'"
                  :rules="[val => val !== null && val.length > 7]"
                  :error="!isPasswordMatch1"
                  error-message="Passwords must match"
                >
                  <template v-slot:prepend>
                    <div class="row items-center all-pointer-events">
                      <q-icon name="o_lock" />

                      <q-tooltip
                        content-class="bg-grey-8"
                        anchor="top left"
                        self="bottom left"
                        :offset="[0, 8]"
                        >Password should be longer than 8 characters</q-tooltip
                      >
                    </div>
                  </template>
                  <template v-slot:append>
                    <q-icon
                      :name="isPwdNew ? 'visibility_off' : 'visibility'"
                      class="cursor-pointer"
                      @click="isPwdNew = !isPwdNew"
                    />
                  </template>
                </q-input>
              </div>

              <q-space />
              <!-- Confirm new password -->
              <div class="col-4">
                <q-input
                  stack-label
                  v-model="settingUser.confirmNewPassword"
                  label="Confirm password"
                  ref="newPasswordConfirm"
                  lazy-rules
                  no-error-icon
                  :type="isPwdNewConfirm ? 'password' : 'text'"
                  :rules="[val => val !== null && val.length > 7]"
                  :error="!isPasswordMatch2"
                  error-message="Passwords must match"
                >
                  <template v-slot:prepend>
                    <div class="row items-center all-pointer-events">
                      <q-icon name="o_lock" />

                      <q-tooltip
                        content-class="bg-grey-8"
                        anchor="top left"
                        self="bottom left"
                        :offset="[0, 8]"
                        >Password should be longer than 8 characters</q-tooltip
                      >
                    </div>
                  </template>
                  <template v-slot:append>
                    <q-icon
                      :name="isPwdNewConfirm ? 'visibility_off' : 'visibility'"
                      class="cursor-pointer"
                      @click="isPwdNewConfirm = !isPwdNewConfirm"
                    />
                  </template>
                </q-input>
              </div>
            </div>
          </div>
        </div>
        <div v-if="user.role == 'Coach'">
          <h5 class="text q-py-md">Club Setting</h5>
          <div class="row">
            <!-- Club picture -->
            <div class="col-sm-grow row q-mr-md">
              <q-img
                contain
                :ratio="1"
                :src="settingUser.clubPicture"
                class="profile-pic"
              ></q-img>
              <div class="dropzone flex justify-center items-center">
                <p class="upload-text">
                  {{
                    isUploadingClubPicture
                      ? "Uploading..."
                      : "Change Club Picture"
                  }}
                </p>
                <input
                  class="file-upload"
                  type="file"
                  accept="image/png, image/jpeg"
                  @change="upload($event.target.files, true)"
                />
              </div>
            </div>
            <div class="col">
              <!-- Club name -->
              <div class="row items-center">
                <div class="col-3">
                  Club Name <span class="required">*</span>
                </div>
                <div class="col">
                  <q-input
                    stack-label
                    v-model="settingUser.club"
                    label="Club Name"
                    lazy-rules
                    no-error-icon
                    :rules="[
                      val =>
                        (val !== null && val.length > 1) ||
                        'Please type your club name',
                      val => val.length < 15 || 'Club name is too long'
                    ]"
                  >
                    <template v-slot:prepend>
                      <q-icon name="fas fa-futbol" />
                    </template>
                  </q-input>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="flex flex-center save-container">
          <!-- Submit button -->
          <q-btn
            color="secondary"
            text-color="white"
            class="no-border-radius shadow-7"
            @click="saveProfile"
            icon="save"
            label="Save"
            :loading="isLoading"
            :disable="!isPasswordMatch1 || !isPasswordMatch2"
          />
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import axios from "axios";

export default {
  name: "Setting",
  data() {
    return {
      settingUser: {
        firstname: "",
        lastname: "",
        club: "",
        oldPassword: "",
        newPassword: "",
        confirmNewPassword: "",
        picture: "",
        clubPicture: ""
      },
      isPwdOld: true,
      isPwdNew: true,
      isPwdNewConfirm: true,
      isPasswordMatch1: true,
      isPasswordMatch2: true,
      isLoading: false,
      isUploadingPersonalPicture: false,
      isUploadingClubPicture: false
    };
  },
  created() {
    this.settingUser.firstname = this.user.firstname;
    this.settingUser.lastname = this.user.lastname;
    this.settingUser.picture = this.user.picture;

    // Get club data for coach role user
    if (this.user.role == "Coach") {
      this.settingUser.club = this.user.club;
      this.getClub(this.user.club).then(
        data => (this.settingUser.clubPicture = data.picture)
      );
    }
  },
  computed: {
    ...mapGetters("user", ["user"])
  },
  watch: {
    "settingUser.newPassword"(val) {
      if (val.length > 7) {
        if (val !== this.$refs.newPasswordConfirm.value)
          this.isPasswordMatch2 = false;
        else {
          this.isPasswordMatch2 = true;
          this.isPasswordMatch1 = true;
        }
      }
    },
    "settingUser.confirmNewPassword"(val) {
      if (val.length > 7) {
        if (val !== this.$refs.newPassword.value) this.isPasswordMatch1 = false;
        else {
          this.isPasswordMatch1 = true;
          this.isPasswordMatch2 = true;
        }
      }
    }
  },
  methods: {
    ...mapActions("setting", ["getSignedUrl", "updateProfile", "getClub"]),
    ...mapActions("user", ["updateUser"]),
    // Called when chose a file
    upload(files, isClub) {
      if (files.length == 0) return;
      if (!isClub) this.isUploadingPersonalPicture = true;
      else this.isUploadingClubPicture = true;

      let file = files[0];

      this.getSignedUrl({ fileName: file.name, fileType: file.type }).then(
        data => {
          this.uploadToS3(
            data.signedUrl,
            data.fileName,
            file.type,
            file,
            isClub
          );
        }
      );

      this.file = null;
    },
    // Upload photo to S3 using presigned URL
    async uploadToS3(url, newFileName, contentType, file, isClub) {
      try {
        const data = await axios({
          method: "PUT",
          url: url,
          headers: { "Content-Type": contentType },
          data: file
        });

        if (!isClub) {
          this.isUploadingPersonalPicture = false;
          this.settingUser.picture = newFileName;
        } else {
          this.isUploadingClubPicture = false;
          this.settingUser.clubPicture = newFileName;
        }
      } catch (e) {
        console.log(e);
      }
    },
    // Save profile to database
    saveProfile() {
      this.isLoading = true;

      this.updateProfile({
        firstname: this.settingUser.firstname,
        lastname: this.settingUser.lastname,
        picture: this.settingUser.picture,
        oldPassword: this.settingUser.oldPassword,
        newPassword: this.settingUser.newPassword,
        clubPicture: this.settingUser.clubPicture,
        clubName: this.settingUser.club
      }).then(data => {
        if (data == "Done") {
          this.showNotification(true);
          this.updateUser({
            firstname: this.settingUser.firstname,
            lastname: this.settingUser.lastname,
            picture: this.settingUser.picture
          });
        } else this.showNotification(false, data);

        this.isLoading = false;
      });
    },
    // Show success or error notification
    showNotification(isSuccess, message) {
      this.$q.notify({
        message: isSuccess
          ? "Changes saved"
          : `Error while saving your profile: ${message}`,
        color: isSuccess ? "positive" : "negative",
        icon: isSuccess ? "done" : "o_new_releases",
        actions: [
          {
            label: "Dismiss",
            color: "white",
            handler: () => {
              /* ... */
            }
          }
        ]
      });
    }
  }
};
</script>

<style lang="scss" scoped>
#setting-page-container {
  width: 50vw;
  height: 75vh;
  background-color: $accent;
  margin-top: 16px;
}

h5 {
  margin: 0;
}

.profile-pic {
  width: 200px;
  height: 200px;
  position: absolute;
  opacity: 0.5;
}

.dropzone {
  width: 200px;
  height: 200px;
  position: relative;
  border-style: dotted;

  & .upload-text {
    font-weight: bold;
    margin: 0;
  }

  & .file-upload {
    width: 200px;
    height: 200px;
    opacity: 0;
    cursor: pointer;
    position: absolute;
  }
}

.text {
  user-select: none;
}

.required {
  vertical-align: top;
  color: $lose;
}

.save-container {
  position: absolute;
  bottom: 220px;
  left: 0;
  right: 0;
}

@media only screen and (max-width: 1500px) {
  #setting-page-container {
    width: 60vw;
  }
}
@media only screen and (max-width: 1050px) {
  .profile-pic {
    width: 150px;
    height: 150px;
  }
  .dropzone {
    width: 150px;
    height: 150px;

    & .file-upload {
      width: 150px;
      height: 150px;
    }
  }
}
@media only screen and (max-width: 1000px) {
  #setting-page-container {
    width: 70vw;
  }
}
@media only screen and (max-width: 800px) {
  #setting-page-container {
    width: 80vw;
  }
}
@media only screen and (max-width: 700px) {
  #setting-page-container {
    width: 90vw;
  }
}
@media only screen and (max-width: 600px) {
  #setting-page-container {
    width: 100vw;
  }
}
</style>
