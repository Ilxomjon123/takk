<template>
  <div>
    <section id="hero-rectangle">
      <div class="container grid grid-cols-1 md:grid-cols-2 px-5 py-10">
        <div class="grid">
          <div class="md:ml-16 my-auto">
            <h1 class="text-5xl font-black lg:text-6xl md:text-center lg:text-left mb-16 md:mb-10 leading-tight">The all
              you need app for your coffee craving.</h1>
            <div class="hidden md:flex">
              <router-link to="/">
                <img class="w-11/12" src="@/assets/images/App_Store_badge_US.png" alt="App Store badge" />
              </router-link>
              <router-link to="/" class="md:ml-16">
                <img class="w-11/12" src="@/assets/images/Google_Play_Badge.png" alt="Google_Play_Badge" />
              </router-link>
            </div>
          </div>
        </div>
        <div class="grid">
          <img class="-mt-10 md:-mt-20" src="@/assets/images/Phone_mockups.png" alt="Phone_mockups" />
          <div class="flex md:hidden justify-between mt-5">
            <router-link to="/">
              <img class="w-11/12" src="@/assets/images/App_Store_badge_US.png" alt="App Store badge" />
            </router-link>
            <router-link to="/">
              <img class="w-11/12 ml-auto" src="@/assets/images/Google_Play_Badge.png" alt="Google_Play_Badge" />
            </router-link>
          </div>
        </div>
      </div>
    </section>
    <section class="mt-6 lg:mt-10">
      <div class="container md:flex md:gap-10">
        <div class="box p-5 md:p-10 md:basis-1/2 grid">
          <img class="mb-10 w-10/12 mx-auto" src="@/assets/images/skip_the_line_img.svg" alt="image" />
          <h1 class="text-3xl md:text-5xl">
            Skip the line and order your coffee drink for pick up through the
            <span class="font-bold">Takk app</span>.
          </h1>
        </div>
        <div class="box p-5 md:p-10 md:basis-1/2 grid mt-6 md:mt-0">
          <img class="w-auto mt-auto mx-auto" src="@/assets/images/rewards_img.svg" alt="image" />
          <h1 class="text-3xl md:text-5xl">Support your local café and get rewarded with loyalty cashback on your
            orders.</h1>
        </div>
      </div>
    </section>
    <section class="mt-6 lg:mt-10">
      <div class="container md:flex md:gap-10">
        <div class="box p-5 md:p-10 md:basis-1/2 grid">
          <div class="row-span-3">
            <img class="object-contain" src="@/assets/images/budget_img.svg" alt="image" />
          </div>
          <div class="row-span-1 xl:pt-10">
            <h1 class="text-3xl md:text-5xl">Set a budget for your spendings and auto refill your balance as needed.
            </h1>
          </div>
        </div>
        <div class="box p-5 md:p-10 md:basis-1/2 grid mt-6 md:mt-0">
          <div class="flex align-middle row-span-3">
            <img class="object-contain" src="@/assets/images/delivery_img.svg" alt="image" />
          </div>
          <div class="row-span-1 xl:pt-10">
            <h1 class="text-3xl md:text-5xl">Local food deliveries at participating coffee shops.</h1>
          </div>
        </div>
      </div>
    </section>
    <section id="available-rectangle" class="mt-6 lg:mt-10">
      <div class="container pt-10">
        <div class="apps">
          <div class="flex flex-col text-center">
            <h1 class="text-3xl md:text-7xl font-black">Available on</h1>
            <h1 class="text-3xl md:text-7xl font-bold mt-5">App Store & Google Play</h1>
          </div>
          <div class="flex flex-col md:flex-row justify-center pt-8 md:pt-16">
            <div class="flex justify-between mt-5">
              <router-link to="/">
                <img class src="@/assets/images/App_Store_badge_US.png" alt="App Store badge" />
              </router-link>
              <router-link to="/" class="md:ml-20">
                <img class="ml-auto" src="@/assets/images/Google_Play_Badge.png" alt="Google_Play_Badge" />
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>import { defineComponent } from "vue";

export default defineComponent({

});
</script>

<style scoped lang="scss">
$mobile: 425px;

#hero-rectangle .container {
  background-color: #d1f2f8;
  background-image: url("@/assets/images/mask_group_16.png");
  background-repeat: no-repeat;
  background-size: cover;
  box-shadow: 0 0 15px #45cbeb4d;
  border-radius: 50px;

  // min-height: 45rem;
  @media screen and (max-width: $mobile) {
    border-radius: 20px;
  }
}

.box {
  /* box-shadow: inset 0px 3px 6px #00000029; */
  border: 5px solid #b2e2ed;
  border-radius: 50px;
  background-color: #fafeff;

  @media screen and (max-width: $mobile) {
    border-radius: 20px;
    min-height: 420px;
  }

  & h1 {
    line-height: 1.5;
  }
}

#available-rectangle .container {
  background-image: url("@/assets/images/Phone_mockups-Available_on_rect.png"),
    url("@/assets/images/mask_group_16.png");
  background-repeat: no-repeat, no-repeat;
  // background-size: cover, ;
  background-position: center bottom;
  box-shadow: 0 0 15px #45cbeb4d;
  border-radius: 50px;
  min-height: 54rem;
  background-color: #fafeff;
  box-shadow: 0px 0px 15px #8080804d;

  @media screen and (max-width: $mobile) {
    border-radius: 20px;
    background-size: 210%;
    min-height: 31rem;
  }
}

.container {
  @media (min-width: 1280px) {
    max-width: 85%;
  }
}
</style>
