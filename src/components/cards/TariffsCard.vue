<script setup>
import { fetchCurrentTariff, updateTariff } from '@/api';
import { onMounted, reactive } from 'vue';

const currentTariff = reactive({});

onMounted(async () => {
  const res = await fetchCurrentTariff();
  Object.assign(currentTariff, res);
});

async function changeTariff(tariff_type) {
  const res = await updateTariff({ tariff_type });
  Object.assign(currentTariff, res);
  // console.log({ res });
}
</script>

<template>
  <div class="rounded-md">
    <div class="flex items-center">
      <div class="box flex flex-col lg:flex-row w-full">
        <div
          class="intro-y border-b border-t lg:border-b-0 lg:border-t-0 flex flex-col flex-1 p-5 lg:border-l lg:border-r border-gray-200 dark:border-dark-5"
        >
          <CreditCardIcon
            class="block w-12 h-12 text-theme-1 dark:text-theme-10 mx-auto"
          />
          <div class="text-xl font-medium text-center mt-10">Standard Plan</div>
          <div
            class="text-gray-600 dark:text-gray-400 px-10 text-center text-base mx-auto mt-5 min-h-[80px]"
          >
            No risk, 6 months free use of the Takk platform (order accepting
            system and mobile app). After trial period, 1% of sales. Plus credit
            card fees (2.9%+30c) passed on to payment processing companies.
          </div>
          <div class="mt-auto">
            <div class="flex justify-center">
              <div class="relative text-5xl font-semibold mt-8 mx-auto">
                <span class="absolute text-2xl top-0 left-0 text-gray-600 -ml-4"
                  >$</span
                >
                0
              </div>
            </div>
            <div class="mt-auto">
              <button
                type="button"
                class="btn btn-rounded-primary py-3 px-4 w-full mx-auto mt-8"
                @click="changeTariff('custom_fee')"
                :disabled="currentTariff.tariff_type === 'custom_fee'"
              >
                {{
                  currentTariff.tariff_type === 'custom_fee'
                    ? "YOU'VE GOT THIS TARIFF"
                    : 'PURCHASE NOW'
                }}
              </button>
              <!-- <a href="javascript:;" data-toggle="modal" data-target="#squareup-modal-preview"
                    class="btn btn-rounded-primary py-3 px-4 block mx-auto mt-8">PURCHASE NOW</a> -->
            </div>
          </div>
        </div>
        <div
          class="intro-y border-b border-t lg:border-b-0 lg:border-t-0 flex flex-col flex-1 p-5 lg:border-l lg:border-r border-gray-200 dark:border-dark-5"
        >
          <BriefcaseIcon
            class="block w-12 h-12 text-theme-1 dark:text-theme-10 mx-auto"
          />
          <div class="text-xl font-medium text-center mt-10">
            Proprietary Plan
          </div>
          <div
            class="text-gray-600 dark:text-gray-400 px-10 text-center text-base mx-auto mt-5 min-h-[80px]"
          >
            Same as Standard plan, plus you will have your custom mobile
            application with your own logo for $49 per month.
          </div>
          <div class="col mt-auto">
            <div class="flex justify-center">
              <div class="relative text-5xl font-semibold mt-8 mx-auto">
                <span class="absolute text-2xl top-0 left-0 text-gray-600 -ml-4"
                  >$</span
                >
                49
              </div>
            </div>
            <div class="mt-auto">
              <button
                type="button"
                class="btn btn-rounded-primary py-3 px-4 w-full mx-auto mt-8"
                @click="changeTariff('subscription')"
                :disabled="currentTariff.tariff_type === 'subscription'"
              >
                {{
                  currentTariff.tariff_type === 'subscription'
                    ? "YOU'VE GOT THIS TARIFF"
                    : 'PURCHASE NOW'
                }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
