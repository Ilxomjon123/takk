<script setup>
import cash from 'cash-dom';
import { onMounted } from 'vue';

onMounted(() => {
  if (!localStorage.getItem('interested-in')) showProgrammaticallyShowModal();
});

// Show modal
function showProgrammaticallyShowModal() {
  cash('#entry-modal').modal('show');
}

function gotoLoginPage() {
  window.location.href = '/login';
}
</script>

<template>
  <div class="scroll-smooth">
    <section id="hero-rectangle">
      <div
        class="
          container
          grid grid-cols-1
          md:grid-cols-2
          px-5
          2xl:px-16
          py-10
          2xl:py-32
        "
      >
        <div class="my-auto">
          <h1 class="mb-5 lg:mb-10">
            The all you need app for your
            <span class="colored-underline1 whitespace-nowrap"
              >coffee shop.</span
            >
          </h1>
          <button
            type="button"
            class="btn-primary hidden md:inline-block"
            @click="gotoLoginPage"
          >
            Sign Up
          </button>
        </div>
        <div class="mt-16 lg:mt-0 2xl:max-w-fit 2xl:ml-auto">
          <img
            class
            src="@/assets/images/Hero_coffee_img.png"
            alt="Hero image"
          />
          <button
            type="button"
            class="btn-primary md:hidden mt-16"
            @click="gotoLoginPage"
          >
            Sign Up
          </button>
        </div>
      </div>
    </section>
    <section id="preordering-rectangle" class="mt-6 lg:mt-10 2xl:mt-12">
      <div
        class="
          rectangle
          container
          grid grid-cols-1
          md:grid-cols-2
          bg-theme-34
          p-5
          lg:p-10
        "
      >
        <div class="grid">
          <img
            class="m-auto"
            src="@/assets/images/preordering-img.png"
            alt="Preordering image"
          />
        </div>
        <div class="grid">
          <div class="md:mx-5 my-auto">
            <h2
              class="
                title1
                md:text-center
                lg:text-left
                mt-10
                lg:mt-0
                mb-5
                lg:mb-10
              "
            >
              Preordering
            </h2>
            <p class="body1 mb-5">
              Accept preorders from customers for pickup.
            </p>
            <p class="body2">
              *Customers not waiting in line means happier customers.
            </p>
          </div>
        </div>
      </div>
    </section>
    <section id="delivery-rectangle" class="mt-6 lg:mt-10 2xl:mt-12">
      <div
        class="
          rectangle
          container
          grid grid-cols-1
          md:grid-cols-2
          bg-theme-33
          p-5
          lg:p-10
        "
      >
        <div class="grid">
          <div class="md:ml-16 my-auto">
            <h2
              class="
                title1
                md:text-center
                lg:text-left
                mt-10
                lg:mt-0
                mb-5
                lg:mb-10
              "
            >
              Delivery
            </h2>
            <p class="body1">
              Deliver orders over certain $ value, if the customer is located
              within pre-defined radius.
            </p>
          </div>
        </div>
        <div class="grid order-first md:order-last">
          <img
            class="m-auto"
            src="@/assets/images/delivery_img.png"
            alt="Deliver image"
          />
        </div>
      </div>
    </section>
    <section id="loyalty-stamps-rectangle" class="mt-6 lg:mt-10 2xl:mt-12">
      <div
        class="
          rectangle
          container
          grid grid-cols-1
          md:grid-cols-2
          bg-theme-34
          p-5
          lg:p-10
        "
      >
        <div class="grid">
          <img
            class="m-auto"
            src="@/assets/images/loyalty_stamps_img.png"
            alt="Loyalty Stamps image"
          />
        </div>
        <div class="grid">
          <div class="md:mx-5 my-auto">
            <h2
              class="
                title1
                md:text-center
                lg:text-left
                mt-10
                lg:mt-0
                mb-5
                lg:mb-10
              "
            >
              Loyalty Stamps
            </h2>
            <p class="body1 mb-5">
              No need to fuss about with printing loyalty cards.
            </p>
            <p class="body2">
              *Customers earn a point for pre-defined category of purchases.
            </p>
          </div>
        </div>
      </div>
    </section>
    <section id="self-checkout-rectangle" class="mt-6 lg:mt-10 2xl:mt-12">
      <div
        class="
          rectangle
          container
          grid grid-cols-1
          md:grid-cols-2
          bg-theme-33
          p-5
          lg:p-10
        "
      >
        <div class="grid">
          <div class="md:ml-16 my-auto">
            <h2
              class="
                title1
                md:text-center
                lg:text-left
                mt-10
                lg:mt-0
                mb-5
                lg:mb-10
              "
            >
              Self Checkout
            </h2>
            <p class="body1">
              Let the customers order and pay themselves, instead of waiting for
              the single cashier who is overwhelmed.
            </p>
          </div>
        </div>
        <div class="grid order-first md:order-last">
          <img
            class="m-auto"
            src="@/assets/images/self_checkout.png"
            alt="Deliver image"
          />
        </div>
      </div>
    </section>
    <section id="analytics-rectangle" class="mt-6 lg:mt-10 2xl:mt-12">
      <div
        class="
          rectangle
          container
          grid grid-cols-1
          md:grid-cols-2
          bg-theme-34
          p-5
          lg:p-10
        "
      >
        <div class="grid">
          <img
            class="m-auto"
            src="@/assets/images/analytics_img.png"
            alt="Loyalty Stamps image"
          />
        </div>
        <div class="grid">
          <div class="md:mx-5 my-auto">
            <h2
              class="
                title1
                md:text-center
                lg:text-left
                mt-10
                lg:mt-0
                mb-5
                lg:mb-10
              "
            >
              Analytics
              <span class="body2">*coming up</span>
            </h2>
            <p class="body1 mb-5">
              Know what your customers want. Do relevant promotions to increase
              sales.
            </p>
          </div>
        </div>
      </div>
    </section>
    <section id="fees-rectangle" class="mt-6 lg:mt-10 2xl:mt-12">
      <div class="container grid md:bg-theme-33 px-5 lg:px-10">
        <div class="grid justify-center">
          <h2
            class="
              text-4xl
              lg:text-6xl
              font-bold
              md:font-extrabold
              my-7
              2xl:my-14
              md:text-center
            "
          >
            <span class="colored-underline2"
              >Our fees are low, and straightforward.</span
            >
          </h2>
        </div>
        <div class="">
          <!-- <div class="box lg:col-start-3 lg:col-span-8 2xl:px-32 2xl:py-10 px-16 py-5">
            <h1 class="text-3xl md:text-5xl lg:text-6xl 2xl:text-7xl text-center font-medium mb-10">Only Pay for Results
            </h1>
            <p>Regular use of Takk is free of charge for independent coffeeshops.</p>
            <p>We charge 3% of the sales, if payment is made through prepaid Takk Budget (guaranteed return customer).
            </p>
            <p>The regular card processing fees (the latest is 2.9%+30cent) still apply on each transaction and are
              passed on to payment processors.</p>
            <br />
            <button type="button" class="btn-primary w-full" @click="gotoLoginPage">Sign Up</button>
          </div> -->
          <div class="container p-10 bg-theme-2 rounded-md mt-8 mb-24">
            <div class="intro-y flex items-center">
              <!-- BEGIN: Pricing Layout -->
              <div class="intro-y box flex flex-col lg:flex-row w-full">
                <div
                  class="
                    intro-y
                    border-b border-t
                    lg:border-b-0 lg:border-t-0
                    flex-1
                    p-5
                    lg:border-l lg:border-r
                    border-gray-200
                    dark:border-dark-5
                  "
                >
                  <CreditCardIcon
                    class="
                      block
                      w-12
                      h-12
                      text-theme-1
                      dark:text-theme-10
                      mx-auto
                    "
                  />
                  <div class="text-xl font-medium text-center mt-10">
                    Standard Plan
                  </div>
                  <!-- <div class="text-gray-700 dark:text-gray-600 text-center mt-5">
                1 Domain
                <span class="mx-1">•</span> 10 Users
                <span class="mx-1">•</span> 20 Copies
              </div>-->
                  <div
                    class="
                      text-gray-600
                      dark:text-gray-400
                      px-10
                      text-center text-base
                      mx-auto
                      mt-5
                      min-h-[80px]
                    "
                  >
                    No risk, 6 months free use of the Takk platform (order
                    accepting system and mobile app). After trial period, 1% of
                    sales. Plus credit card fees (2.9%+30c) passed on to payment
                    processing companies.
                  </div>
                  <div class="mt-auto">
                    <div class="flex justify-center">
                      <div class="relative text-5xl font-semibold mt-8 mx-auto">
                        <span
                          class="
                            absolute
                            text-2xl
                            top-0
                            left-0
                            text-gray-600
                            -ml-4
                          "
                          >$</span
                        >
                        0
                      </div>
                    </div>
                    <div class="mt-auto">
                      <RouterLink
                        to="/dashboard/tariffs"
                        class="
                          btn btn-rounded-primary
                          py-3
                          px-4
                          block
                          mx-auto
                          mt-8
                        "
                        >PURCHASE NOW</RouterLink
                      >
                      <!-- <a href="javascript:;" data-toggle="modal" data-target="#squareup-modal-preview"
                    class="btn btn-rounded-primary py-3 px-4 block mx-auto mt-8">PURCHASE NOW</a> -->
                    </div>
                  </div>
                </div>
                <div
                  class="
                    intro-y
                    border-b border-t
                    lg:border-b-0 lg:border-t-0
                    flex-1
                    p-5
                    lg:border-l lg:border-r
                    border-gray-200
                    dark:border-dark-5
                  "
                >
                  <BriefcaseIcon
                    class="
                      block
                      w-12
                      h-12
                      text-theme-1
                      dark:text-theme-10
                      mx-auto
                    "
                  />
                  <div class="text-xl font-medium text-center mt-10">
                    Proprietary Plan
                  </div>
                  <div
                    class="
                      text-gray-600
                      dark:text-gray-400
                      px-10
                      text-center text-base
                      mx-auto
                      mt-5
                      min-h-[80px]
                    "
                  >
                    Same as Standard plan, plus you will have your custom mobile
                    application with your own logo for $49 per month.
                  </div>
                  <div class="mt-auto">
                    <div class="flex justify-center">
                      <div class="relative text-5xl font-semibold mt-8 mx-auto">
                        <span
                          class="
                            absolute
                            text-2xl
                            top-0
                            left-0
                            text-gray-600
                            -ml-4
                          "
                          >$</span
                        >
                        49
                      </div>
                    </div>
                    <div class="mt-auto">
                      <RouterLink
                        to="/dashboard/tariffs"
                        class="
                          btn btn-rounded-primary
                          py-3
                          px-4
                          block
                          mx-auto
                          mt-8
                        "
                        >PURCHASE NOW</RouterLink
                      >
                    </div>
                  </div>
                </div>
              </div>
              <!-- END: Pricing Layout -->
            </div>
          </div>
          <div class="hidden md:flex justify-center mx-auto w-full">
            <a href="https://apps.apple.com/us/app/kaffe-landskap/id1469010325" target="blank">
              <img
                class="mr-12 w-[240px] h-[80px]"
                src="@/assets/images/App_Store_badge_US.png"
                alt="App Store badge"
              />
            </a>
            <a href="https://play.google.com/store/apps/details?id=com.takk.cafe" target="blank">
              <img
                class="ml-12 w-[240px] h-[80px]"
                src="@/assets/images/Google_Play_Badge.png"
                alt="Google_Play_Badge"
              />
            </a>
          </div>
          <div class="flex md:hidden justify-between">
            <a href="https://apps.apple.com/us/app/kaffe-landskap/id1469010325" target="blank">
              <img
                class="w-11/12"
                src="@/assets/images/App_Store_badge_US.png"
                alt="App Store badge"
              />
            </a>
            <a href="https://play.google.com/store/apps/details?id=com.takk.cafe" target="blank">
              <img
                class="w-11/12 ml-auto"
                src="@/assets/images/Google_Play_Badge.png"
                alt="Google_Play_Badge"
              />
            </a>
          </div>
          <div class="flex lg:justify-center lg:my-10">
            <button type="button" class="btn-primary" @click="gotoLoginPage">
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped lang="scss">
$mobile: 425px;

.btn-primary {
  @apply bg-theme-31 text-white border-0 shadow-lg py-4 px-12 rounded-full font-bold hover:bg-theme-2 hover:text-black text-2xl lg:text-3xl 2xl:text-3xl 2xl:px-24 2xl:py-8;
}

#hero-rectangle .container {
  background-image: url('@/assets/images/mask_group_16.png');
  background-repeat: no-repeat;
  background-size: cover;
  /* box-shadow: 0 0 10px 1px #e8f6f9; */
  box-shadow: 0 0 15px #45cbeb4d;
  border-radius: 50px;

  @media screen and (max-width: $mobile) {
    border-radius: 20px;
  }

  & h1 {
    @apply text-4xl lg:text-6xl font-extrabold;

    @media screen and (min-width: 1536px) {
      font-size: 5rem;
    }
  }
}

#fees-rectangle .container {
  background-image: url('@/assets/images/mask_group_16.png');
  background-repeat: no-repeat;
  background-size: cover;
  box-shadow: 0 0 15px #45cbeb4d;
  border-radius: 50px;

  @media screen and (max-width: $mobile) {
    border-radius: 20px;
  }

  & .box {
    box-shadow: 0 10px 15px #00000026;
    background-color: #fff;
    border-radius: 40px;

    @media screen and (max-width: $mobile) {
      background-color: transparent;
      box-shadow: none;
      border-radius: 0;
    }

    & p {
      color: #525252 !important;
      @apply text-center text-2xl md:text-3xl lg:text-4xl mb-5 font-light;

      @media screen and (min-width: 1536px) {
        font-size: 2.5rem;
        line-height: 1.2;
      }
    }
  }
}

.rectangle {
  border: 5px solid #b2e2ed;
  border-radius: 50px;

  @media screen and (max-width: $mobile) {
    border-radius: 20px;
    min-height: 450px;
  }

  @media screen and (min-width: 1536px) {
    height: 630px;
  }
}

.colored-underline1 {
  background-image: url('@/assets/images/Hero_coffee_shop_undrline.png');
  background-position: bottom;
  background-repeat: no-repeat;
  background-size: contain;
}

.colored-underline2 {
  background-image: url('@/assets/images/Rectangle_Our_Fees_Sentence_underline.png');
  background-position: bottom;
  background-repeat: no-repeat;
  background-size: contain;
}

.container {
  @media screen and (min-width: 1536px) {
    max-width: 85%;
  }
}

.title1 {
  @apply text-4xl lg:text-5xl font-extrabold;

  @media screen and (min-width: 1536px) {
    font-size: 4rem;
  }
}

.body1 {
  @apply text-2xl md:text-3xl lg:text-5xl;

  @media screen and (min-width: 1536px) {
    font-size: 45px;
    line-height: 1.2;
  }
}

.body2 {
  @apply text-xl md:text-2xl lg:text-3xl italic leading-tight;

  @media screen and (min-width: 1536px) {
    font-size: 33px;
  }
}
</style>
