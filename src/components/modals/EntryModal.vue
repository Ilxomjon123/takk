<template>
  <div
    id="entry-modal"
    class="modal w-full h-full"
    tabindex="-1"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-xl min-w-fit">
      <div class="modal-content rounded-3xl md:rounded-large">
        <div class="modal-body md:p-10">
          <h1
            class="text-2xl md:text-4xl font-bold text-center mb-5"
          >I am interested in info for:</h1>
          <div class="grid md:grid-cols-2 md:gap-10 auto-cols-auto">
            <div
              class="box grid justify-center text-center md:p-10 mb-10 md:mb-0 h-72 md:h-auto rounded-3xl md:rounded-large"
            >
              <button class @click="goto('/')">
                <img
                  class="mx-auto md:w-auto"
                  src="@/assets/images/Icon metro-shop.svg"
                  alt="For Coffee Shops Icon"
                />
                <h1
                  class="text-2xl md:text-4xl font-bold mt-10 whitespace-nowrap"
                >Coffee Shops</h1>
              </button>
            </div>
            <div
              class="box grid justify-center text-center md:p-10 h-72 md:h-auto rounded-3xl md:rounded-large"
            >
              <button @click="goto('/for-customers')">
                <img
                  class="mx-auto"
                  src="@/assets/images/Group 2557.svg"
                  alt="For Costumers Icon"
                />
                <h1
                  class="text-2xl md:text-4xl font-bold mt-10 whitespace-nowrap"
                >Costumer</h1>
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
import { useRouter } from 'vue-router';

const router = useRouter()

function goto(path) {
  cash("#entry-modal").modal("hide");
  router.push(path)
}

</script>

<style lang="scss">
#entry-modal .modal-content {
  background-image: url("@/assets/images/mask_group_16.png");
  background-repeat: no-repeat;
  background-size: cover;
  box-shadow: 0 0 15px #45cbeb4d;
}

#entry-modal .box {
  box-shadow: 0px 10px 15px #00000029;
  background-color: #fafeff;
  &:hover {
    box-shadow: inset 0px 10px 15px #00000029;
  }
  & img {
    height: 183px;
  }
}
</style>

