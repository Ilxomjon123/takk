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
    <section class="pt-10">
      <div class="container md:flex md:gap-10">
        <div class="box p-5 md:p-10 md:basis-1/2 grid">
          <img
            class="mb-10"
            src="@/assets/images/skip_the_line_img.svg"
            alt="image"
          />
          <h1
            class="text-3xl md:text-5xl font-bold mt-auto"
          >Skip the line and order your coffee drink for pick up through the Takk app.</h1>
        </div>
        <div class="box p-5 md:p-10 md:basis-1/2 grid">
          <img class="mb-10" src="@/assets/images/rewards_img.svg" alt="image" />
          <h1
            class="text-3xl md:text-5xl font-bold mt-auto"
          >Support your local café and get rewarded with loyalty cashback on your orders.</h1>
        </div>
      </div>
    </section>
    <section class="pt-10">
      <div class="container md:flex md:gap-10">
        <div class="box p-5 md:p-10 md:basis-1/2 grid">
          <img class="mb-10" src="@/assets/images/budget_img.svg" alt="image" />
          <h1
            class="text-3xl md:text-5xl font-bold mt-auto"
          >Set a budget for your spendings and auto refill your balance as needed.</h1>
        </div>
        <div class="box p-5 md:p-10 md:basis-1/2 grid">
          <img class="mb-10" src="@/assets/images/delivery_img.svg" alt="image" />
          <h1
            class="text-3xl md:text-5xl font-bold mt-auto"
          >Local food deliveries at participating coffee shops.</h1>
        </div>
      </div>
    </section>
    <section id="available-rectangle" class="pt-10">
      <div class="container pt-10">
        <div class="apps">
          <div class="flex flex-col text-center">
            <h1 class="text-3xl md:text-5xl font-black">Available on</h1>
            <h1
              class="text-3xl md:text-5xl font-bold mt-5"
            >App Store & Google Play</h1>
          </div>
          <div class="flex justify-center pt-20">
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
        <img
          src="@/assets/images/Phone mockups - Available on rect.png"
          alt="Phone mockups - Available on rect"
        />
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
  /* @apply bg-theme-33; */
  background-color: #fafeff;
}

.box h1 {
  line-height: 1.5;
}

#available-rectangle .container {
  background-image: url("@/assets/images/mask_group_16.png");
  background-repeat: no-repeat;
  background-size: cover;
  /* box-shadow: 0 0 10px 1px #e8f6f9; */
  box-shadow: 0 0 15px #45cbeb4d;
  border-radius: 50px;
  min-height: 45rem;
  background-color: #fafeff;
  box-shadow: 0px 0px 15px #8080804d;
}

/* #available-rectangle .apps {
  background-image: url("@/assets/images/Phone mockups - Available on rect.png");
  background-repeat: no-repeat;
  background-position: bottom;
} */
</style>
