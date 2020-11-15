<template>
  <auth-layout>
    <div class="container">
      <div class="specs">
        <app-logo height="300px" size="lg" />
        <h1 class="title">swupp</h1>
        <h1 class="under">Under Construction</h1>

        <div style="align-items: center" class="row mt-5 flex-align-end">
          <template v-if="!$auth.loggedIn">
            <div class="col-3">
              <button-primary
                to="/login"
                label="Login"
                :is-full-width="true"
                size="lg"
              />
            </div>
            <div class="col-4">
              <button-primary
                to="/register"
                label="Register"
                :is-full-width="true"
                size="lg"
              />
            </div>
            <div class="col-5">
              <button-primary
                to="/new"
                label="New Post"
                :is-full-width="true"
                size="lg"
              />
            </div>
          </template>
          <template v-else>
            <div class="col-4">
              <button-primary
                label="Logout"
                @click.native="$auth.logout()"
                :is-full-width="true"
                size="lg"
              />
            </div>
          </template>
        </div>

        <!-- <div class="contributors mt-5">
        <h3 class="mb-1">Contributors</h3>

        <ul>
          <li v-for="item in contributors" :key="item.id">
            <a target="_blank" :href="item.html_url">
              <img :src="item.avatar_url" :alt="item.login" />

              <p>topzdev</p>
            </a>
          </li>
        </ul>
      </div> -->
      </div>
    </div>
  </auth-layout>
</template>

<script>
export default {
  data() {
    return {
      contributors: [],
    };
  },
  async created() {
    // const response = await fetch(
    //   "https://api.github.com/repos/topzdev/swupp/contributors"
    // );
    // this.contributors = await response.json();
    // console.log("Response...", await response.json());
  },
};
</script>

<style lang="scss">
.specs {
  display: flex;
  margin-top: 30px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  height: 80vh;
}
.contributors {
  margin-top: 30px;
  ul {
    list-style: none;
    display: flex;
    & > * {
      margin-right: 10px;
    }

    li {
      display: flex;
      flex-direction: column;
      img {
        height: 100px;
        width: 100px;
        border-radius: 100%;
      }

      a {
        color: #000;
      }
    }
  }
}
.under {
  color: var(--color-primary);
}

.title {
  display: block;
  font-size: 100px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}
</style>
