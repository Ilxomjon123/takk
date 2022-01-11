<template>
  <div>
    <section id="hero-rectangle">
      <div class="container grid grid-cols-1 md:grid-cols-2">
        <div class="grid">
          <div class="md:ml-16 my-auto">
            <h1
              class="text-3xl md:text-4xl font-bold lg:text-6xl text-center lg:text-left mb-10"
            >The all you need app for your coffee craving.</h1>
            <div class="flex">
              <router-link to="/">
                <img
                  src="@/assets/images/App Store badge US.png"
                  alt="App Store badge"
                />
              </router-link>
              <router-link to="/" class="md:ml-16">
                <img
                  src="@/assets/images/Google Play Badge.png"
                  alt="Google Play Badge"
                />
              </router-link>
            </div>
          </div>
        </div>
        <div class="grid">
          <img
            class="-mt-12"
            src="/src/assets/images/Phone mockups.png"
            alt="Phone mockups"
          />
        </div>
      </div>
    </section>
  </div>
</template>

<script>import { defineComponent } from "vue";

export default defineComponent({

});
</script>

<style scoped>
#hero-rectangle .container {
  background-color: #d1f2f8;
  background-image: url("/src/assets/images/mask_group_16.png");
  background-repeat: no-repeat;
  background-size: cover;
  box-shadow: 0 0 15px #45cbeb4d;
  border-radius: 50px;
  min-height: 45rem;
}
</style>
