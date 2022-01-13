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
    <section>
      <div class="container md:flex md:gap-10">
        <div class="box p-5 md:p-10 md:basis-1/2 grid">
          <img class src="@/assets/images/skip_the_line_img.svg" alt="image" />
          <h1
            class="text-3xl md:text-5xl font-bold mt-auto"
          >Skip the line and order your coffee drink for pick up through the Takk app.</h1>
        </div>
        <div class="box p-5 md:p-10 md:basis-1/2 grid">
          <img class src="@/assets/images/rewards_img.svg" alt="image" />
          <h1
            class="text-3xl md:text-5xl font-bold mt-auto"
          >Support your local café and get rewarded with loyalty cashback on your orders.</h1>
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

.box {
  /* box-shadow: inset 0px 3px 6px #00000029; */
  border: 5px solid #b2e2ed;
  border-radius: 50px;
  /* padding: 2.5rem; */
}
</style>
