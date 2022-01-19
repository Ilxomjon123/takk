
  <template>
  <div class="container pt-20">
    <div class="intro-y flex items-center">
      <h2
        class="text-xl font-medium mr-auto text-white lg:text-center"
      >My Cabinet</h2>
    </div>
    <div class="container p-10 bg-theme-2 rounded-md mt-8 mb-24">
      <div class="intro-y flex items-center">
        <!-- BEGIN: Pricing Layout -->
        <div class="intro-y box flex flex-col lg:flex-row">
          <div class="intro-y flex-1 px-5 bg-theme-1 text-white">
            <CreditCardIcon
              class="block w-12 h-12 text-theme-2 dark:text-theme-10 mx-auto"
            />
            <div class="text-xl font-medium text-center mt-10">Basic Plan</div>
            <div class="text-gray-700 dark:text-gray-600 text-center mt-5">
              1 Domain
              <span class="mx-1">•</span> 10 Users
              <span class="mx-1">•</span> 20 Copies
            </div>
            <div
              class="text-gray-600 dark:text-gray-400 px-10 text-center mx-auto mt-2"
            >
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry.
            </div>
            <div class="flex justify-center">
              <div class="relative text-5xl font-semibold mt-8 mx-auto">
                <span
                  class="absolute text-2xl top-0 left-0 text-gray-600 -ml-4"
                >$</span>
                35
              </div>
            </div>
            <a
              href="javascript:;"
              data-toggle="modal"
              data-target="#delete-modal-preview"
              class="btn btn-primary py-3 px-4 block mx-auto mt-8 bg-theme-2 text-black px-10"
            >Create</a>
          </div>
          <div
            class="intro-y border-b border-t lg:border-b-0 lg:border-t-0 flex-1 p-5 lg:border-l lg:border-r border-gray-200 dark:border-dark-5"
          >
            <BriefcaseIcon
              class="block w-12 h-12 text-theme-1 dark:text-theme-10 mx-auto"
            />
            <div class="text-xl font-medium text-center mt-10">Business</div>
            <div class="text-gray-700 dark:text-gray-600 text-center mt-5">
              1 Domain
              <span class="mx-1">•</span> 10 Users
              <span class="mx-1">•</span> 20 Copies
            </div>
            <div
              class="text-gray-600 dark:text-gray-400 px-10 text-center mx-auto mt-2"
            >
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry.
            </div>
            <div class="flex justify-center">
              <div class="relative text-5xl font-semibold mt-8 mx-auto">
                <span
                  class="absolute text-2xl top-0 left-0 text-gray-600 -ml-4"
                >$</span>
                60
              </div>
            </div>
            <button
              type="button"
              class="btn btn-rounded-primary py-3 px-4 block mx-auto mt-8"
            >PURCHASE NOW</button>
          </div>
          <div class="intro-y flex-1 px-5">
            <ShoppingBagIcon
              class="block w-12 h-12 text-theme-1 dark:text-theme-10 mx-auto"
            />
            <div class="text-xl font-medium text-center mt-10">Enterprise</div>
            <div class="text-gray-700 dark:text-gray-600 text-center mt-5">
              1 Domain
              <span class="mx-1">•</span> 10 Users
              <span class="mx-1">•</span> 20 Copies
            </div>
            <div
              class="text-gray-600 dark:text-gray-400 px-10 text-center mx-auto mt-2"
            >
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry.
            </div>
            <div class="flex justify-center">
              <div class="relative text-5xl font-semibold mt-8 mx-auto">
                <span
                  class="absolute text-2xl top-0 left-0 text-gray-600 -ml-4"
                >$</span>
                120
              </div>
            </div>
            <button
              type="button"
              class="btn btn-rounded-primary py-3 px-4 block mx-auto mt-8"
            >PURCHASE NOW</button>
          </div>
        </div>
        <!-- END: Pricing Layout -->
      </div>
    </div>
  </div>

  <div id="delete-modal-preview" class="modal" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-body p-0">
          <div class="p-5 text-center">
            <XCircleIcon class="w-16 h-16 text-theme-6 mx-auto mt-3" />
            <div class="text-3xl mt-5">Do you want to integrate with SquareApp</div>
            <div class="text-gray-600 mt-2">
              <!-- <div class="sm:w-auto flex items-center sm:ml-auto mt-3 sm:mt-0">
                <input
                  id="show-example-1"
                  data-target="#basic-button"
                  class="show-code form-check-switch mr-0 ml-3"
                  type="checkbox"
                />
                <label
                  class="form-check-label ml-0 sm:ml-2"
                  for="show-example-1"
                >Do you want to get notifications on SquareApp?</label>
              </div>-->
            </div>
          </div>
          <div class="px-5 pb-8 text-center">
            <button
              data-dismiss="modal"
              class="btn btn-outline-secondary w-24 dark:border-dark-5 dark:text-gray-300 mr-1"
              @click="toCompany"
            >No</button>
            <button type="button" class="btn btn-success w-24">Yes!</button>
          </div>
        </div>
      </div>
    </div>
  </div>
  <ErrorNotification ref="errorNotification" />
</template>

<script>
import { defineComponent } from 'vue'
import CountrySelect from '../../components/selects/CountrySelect.vue'
import DarkModeSwitcher from '@/components/dark-mode-switcher/Main.vue'
import { mapActions } from 'vuex'
import ErrorNotification from '../../components/notifications/ErrorNotification.vue'
export default defineComponent({
  components: { CountrySelect, DarkModeSwitcher, ErrorNotification }
  , methods: {
    ...mapActions(['putStep']),
    async toCompany() {
      const res = await this.putStep(this.$store.state.user.STEP_COMPANY)
      if (res.status) {
        this.$router.push('/entry/company')
      } else {
        this.$refs.errorNotification.show()
      }

    }
  }
})
</script>

<style scoped>
body {
  background-color: blue;
}
</style>