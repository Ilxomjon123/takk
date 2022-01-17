<template>
  <div>
    <section id="hero-rectangle">
      <div class="container grid grid-cols-1 md:grid-cols-2 px-5 py-10">
        <div class="grid">
          <div class="md:ml-16 my-auto">
            <h1 class="text-5xl lg:text-6xl font-bold mb-5 lg:mb-10">
              The all you need app for your
              <span
                class="colored-underline1 whitespace-nowrap"
              >coffee shop.</span>
            </h1>
            <button
              type="button"
              class="btn-primary hidden md:inline-block"
            >Sign Up</button>
          </div>
        </div>
        <div class="grid mt-16 lg:mt-0">
          <img
            class="m-auto"
            src="@/assets/images/Hero coffee img.png"
            alt="Hero image"
          />
          <button type="button" class="btn-primary md:hidden mt-16">Sign Up</button>
        </div>
      </div>
    </section>
    <section id="preordering-rectangle" class="mt-6 lg:mt-10">
      <div
        class="rectangle container grid grid-cols-1 md:grid-cols-2 bg-theme-34 p-5 lg:p-10"
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
              class="text-4xl font-bold lg:text-7xl md:text-center lg:text-left mt-10 lg:mt-0 mb-5 lg:mb-10"
            >Preordering</h2>
            <p
              class="text-2xl md:text-3xl lg:text-5xl mb-5"
            >Accept preorders from customers for pickup.</p>
            <p
              class="text-lg md:text-2xl lg:text-4xl italic leading-tight"
            >*Customers not waiting in line means happier customers.</p>
          </div>
        </div>
      </div>
    </section>
    <section id="delivery-rectangle" class="mt-6 lg:mt-10">
      <div
        class="rectangle container grid grid-cols-1 md:grid-cols-2 bg-theme-33 p-5 lg:p-10"
      >
        <div class="grid">
          <div class="md:ml-16 my-auto">
            <h2
              class="text-4xl font-bold lg:text-7xl md:text-center lg:text-left mt-10 lg:mt-0 mb-5 lg:mb-10"
            >Delivery</h2>
            <p
              class="text-2xl md:text-3xl lg:text-5xl"
            >Deliver orders over certain $ value, if the customer is located within pre-defined radius.</p>
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
    <section id="loyalty-stamps-rectangle" class="mt-6 lg:mt-10">
      <div
        class="rectangle container grid grid-cols-1 md:grid-cols-2 bg-theme-34 p-5 lg:p-10"
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
              class="text-4xl font-bold lg:text-7xl md:text-center lg:text-left mt-10 lg:mt-0 mb-5 lg:mb-10"
            >Loyalty Stamps</h2>
            <p
              class="text-2xl md:text-3xl lg:text-5xl mb-5"
            >No need to fuss about with printing loyalty cards.</p>
            <p
              class="text-xl md:text-2xl lg:text-4xl italic leading-tight"
            >*Customers earn a point for pre-defined category of purchases.</p>
          </div>
        </div>
      </div>
    </section>
    <section id="self-checkout-rectangle" class="mt-6 lg:mt-10">
      <div
        class="rectangle container grid grid-cols-1 md:grid-cols-2 bg-theme-33 p-5 lg:p-10"
      >
        <div class="grid">
          <div class="md:ml-16 my-auto">
            <h2
              class="text-4xl font-bold lg:text-7xl md:text-center lg:text-left mt-10 lg:mt-0 mb-5 lg:mb-10"
            >Self Checkout</h2>
            <p
              class="text-2xl md:text-3xl lg:text-5xl"
            >Let the customers order and pay themselves, instead of waiting for the single cashier who is overwhelmed.</p>
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
    <section id="analytics-rectangle" class="mt-6 lg:mt-10">
      <div
        class="rectangle container grid grid-cols-1 md:grid-cols-2 bg-theme-34 p-5 lg:p-10"
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
              class="text-4xl font-bold lg:text-7xl md:text-center lg:text-left mt-10 lg:mt-0 mb-5 lg:mb-10"
            >
              Analytics
              <span
                class="text-xl md:text-2xl lg:text-4xl italic font-medium"
              >*coming up</span>
            </h2>
            <p
              class="text-2xl md:text-3xl lg:text-5xl mb-5"
            >Know what your customers want. Do relevant promotions to increase sales.</p>
          </div>
        </div>
      </div>
    </section>
    <section id="fees-rectangle" class="mt-6 lg:mt-10">
      <div class="container grid md:bg-theme-33 px-5 lg:px-10 py-16 lg:py-32">
        <div class="grid md:my-16 justify-center">
          <h2
            class="text-5xl lg:text-6xl font-bold md:font-extrabold mb-10 md:text-center"
          >
            <span
              class="colored-underline2"
            >Our fees are low, and straightforward.</span>
          </h2>
        </div>
        <div class="grid lg:grid-cols-12 lg:mb-16 justify-center">
          <div class="box lg:col-start-3 lg:col-span-8 p-4 lg:p-16 xl:px-36">
            <h1
              class="text-4xl md:text-5xl lg:text-7xl text-center font-medium mb-10"
            >Only Pay for Results</h1>
            <p
              class="text-center text-2xl md:text-3xl lg:text-4xl xl:text-5xl mb-5 font-normal"
            >Regular use of Takk is free of charge for independent coffeeshops.</p>
            <p
              class="text-center text-2xl md:text-3xl lg:text-4xl xl:text-5xl mb-5 font-normal"
            >We charge 3% of the sales, if payment is made through prepaid Takk Budget (guaranteed return customer).</p>
            <p
              class="text-center text-2xl md:text-3xl lg:text-4xl xl:text-5xl mb-5 font-normal"
            >The regular card processing fees (the latest is 2.9%+30cent) still apply on each transaction and are passed on to payment processors.</p>
            <br />
            <button type="button" class="btn-primary w-full">Sign Up</button>
          </div>
        </div>
      </div>
    </section>
  </div>

  <!-- Modal -->
  <div
    id="entry-modal"
    class="modal w-full h-full"
    tabindex="-1"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-xl min-w-fit">
      <div class="modal-content rounded-3xl md:rounded-large">
        <div class="modal-body md:p-10">
          <div class="grid md:grid-cols-2 md:gap-10 auto-cols-auto">
            <div
              class="grid justify-center text-center box md:p-10 mb-10 md:mb-0 h-72 md:h-auto rounded-3xl md:rounded-large"
            >
              <button class @click="goto('/')">
                <img
                  class="mx-auto w-28 md:w-auto"
                  src="@/assets/images/Icon metro-shop.svg"
                  alt="For Coffee Shops Icon"
                />
                <h1
                  class="text-2xl md:text-4xl font-bold mt-10 whitespace-nowrap"
                >For Coffee Shops</h1>
              </button>
            </div>
            <div
              class="grid justify-center text-center box md:p-10 h-72 md:h-auto rounded-3xl md:rounded-large"
            >
              <button class @click="goto('/for-customers')">
                <img
                  class="mx-auto w-1/2"
                  src="@/assets/images/Group 2557.svg"
                  alt="For Costumers Icon"
                />
                <h1
                  class="text-2xl md:text-4xl font-bold mt-10 whitespace-nowrap"
                >For Costumers</h1>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import cash from 'cash-dom'
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter()

const atFirstTime = ref(true)

onMounted(() => {
  if (atFirstTime.value === true)
    showProgrammaticallyShowModal();
})

// Show modal
function showProgrammaticallyShowModal() {
  cash("#entry-modal").modal("show");
}

// select page func
function goto(path) {
  atFirstTime.value = false
  cash("#entry-modal").modal("hide");
  router.push(path)
}
</script>

<style scoped lang="scss">
$mobile: 425px;

.btn {
  @apply shadow-md py-3 px-6 transition duration-300 rounded-full font-bold;
}
.btn-primary {
  @apply bg-theme-31 text-white border-0 shadow-lg py-4 px-12 rounded-full font-bold hover:bg-theme-2 hover:text-black text-2xl lg:text-4xl;
}

#hero-rectangle .container {
  background-image: url("@/assets/images/mask_group_16.png");
  background-repeat: no-repeat;
  background-size: cover;
  /* box-shadow: 0 0 10px 1px #e8f6f9; */
  box-shadow: 0 0 15px #45cbeb4d;
  border-radius: 50px;
  @media screen and (max-width: $mobile) {
    border-radius: 20px;
  }
}

#entry-modal .modal-content {
  background-image: url("@/assets/images/mask_group_16.png");
  background-repeat: no-repeat;
  background-size: cover;
  /* box-shadow: 0 0 10px 1px #e8f6f9; */
  box-shadow: 0 0 15px #45cbeb4d;
  /* border-radius: 50px; */
}

#fees-rectangle .container {
  background-image: url("@/assets/images/mask_group_16.png");
  background-repeat: no-repeat;
  background-size: cover;
  box-shadow: 0 0 15px #45cbeb4d;
  border-radius: 50px;
  @media screen and (max-width: $mobile) {
    border-radius: 20px;
  }
}

#fees-rectangle .box {
  box-shadow: 0 10px 15px #00000026;
  background-color: #fff;
  border-radius: 40px;
  @media screen and (max-width: $mobile) {
    background-color: transparent;
    box-shadow: none;
    border-radius: 0;
  }
}

#fees-rectangle .box p {
  color: #525252;
  /* font-size: 40px; */
}
.rectangle {
  border: 5px solid #b2e2ed;
  border-radius: 50px;
  @media screen and (max-width: $mobile) {
    border-radius: 20px;
    min-height: 450px;
  }
}

.colored-underline1 {
  background-image: url("@/assets/images/Hero coffee shop undrline.png");
  background-position: bottom;
  background-repeat: no-repeat;
  background-size: contain;
}

.colored-underline2 {
  background-image: url("@/assets/images/Rectangle Our Fees Sentence underline.png");
  background-position: bottom;
  background-repeat: no-repeat;
  background-size: contain;
}

#entry-modal .box {
  box-shadow: 0 10px 15px #00000025;
  /* border-radius: 50px; */
  background-color: #fafeff;
  /* min-height: 300px;
  max-height: 500px;
  height: 400px; */
}

#entry-modal .box:hover {
  box-shadow: 0 20px 25px #00000075;
}
</style>
