
  <template>
  <!-- <DarkModeSwitcher /> -->
  <div class="container mx-auto grid overflow-hidden">
      <h2 class="py-7 text-2xl text-white">My Cabinet</h2>
      <div class="rounded-lg flex flex-wrap -m-3 bg-white py-10 px-2 h-full">
        <div class="w-full sm:w-1/2 md:w-1/3 flex flex-col p-3">
          <div
            class="bg-theme-1 rounded-lg shadow-lg relative overflow-hidden flex-1 flex flex-col py-8 px-3"
          >
            <h3 class="text-3xl text-white leading-10">
              Run your business with us!
            </h3>
            <p class="py-6 text-gray-300 mb-10"></p>
            <a href="javascript:;" data-toggle="modal" data-target="#delete-modal-preview"
                    class="btn btn-outline-secondary bg-white w-32">Start</a>
            <img
              class="w-1/2 absolute -top-8 right-0"
              src="https://www.niagarainflatables.com/wp-content/uploads/2015/03/girljump.png"
              alt=""
            />
          </div>
        </div>
        <div class="w-full sm:w-1/2 md:w-1/3 flex flex-col p-3">
          <div
            class="bg-white rounded-lg shadow-lg relative overflow-hidden flex-1 flex flex-col py-8 px-3"
          >
            <h3 class="text-3xl text-blue-800 leading-10">
              Download free <br />
              Anrdoid
            </h3>

              <a class="btn btn-primary w-32 mt-auto"
              target="blank"
                href="https://dashboard.in"
              >GO</a>
            <img
              class="w-32 absolute top-2 -right-8 origin-center -rotate-45"
              src="https://pngimage.net/wp-content/uploads/2018/05/android-smartphone-icon-png-8.png"
              alt=""
            />
          </div>
        </div>
        <div class="w-full sm:w-1/2 md:w-1/3 flex flex-col p-3">
          <div
            class="bg-white rounded-lg shadow-lg relative overflow-hidden flex-1 flex flex-col py-8 px-3"
          >
            <h3 class="text-3xl text-blue-800 leading-10">
              Download free <br />
              iOS
            </h3>
            <a class="btn btn-primary w-32 mt-auto"
              target="blank"
                href="https://dashboard.in"
              >GO</a>
            <img
              class="w-60 absolute top-2 -right-8 origin-center -rotate-45"
              src="../../assets/images/iphone.png"
              alt=""
            />
          </div>
        </div>
        <div class="flex items-center justify-center w-full py-10">
          <button class="btn btn-danger" @click="logout">
            Logout
          </button>
        </div>
      </div>
    </div>

    <div id="delete-modal-preview" class="modal" tabindex="-1" aria-hidden="true">
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-body p-0">
            <div class="p-5 text-center">
              <div class="flex justify-center my-3 h-10 mt-3">
                <img src="@/assets/images/Takk_Logo.png" class="mr-3" />
                <img src="@/assets/images/squareup.png" />
              </div>
              <div class="text-3xl mt-5">Do you want to integrate with SquareUp</div>
              <div class="text-base mt-3">Do you already use Square? We can import all your menu and products from
                Square if you like.</div>
              <div class="text-gray-600 mt-2">
                <div class="sm:w-auto flex items-center sm:ml-auto mt-3 sm:mt-0">
                  <input id="show-example-1" data-target="#basic-button" class="show-code form-check-switch mr-0 ml-3"
                    type="checkbox" v-model="is_make_create_order" />
                  <label class="form-check-label ml-0 sm:ml-2" for="show-example-1">Do you want to get notifications on
                    SquareApp?</label>
                </div>
              </div>
            </div>
            <div class="px-5 pb-8 text-center">
              <button data-dismiss="modal"
                class="btn btn-outline-secondary w-24 dark:border-dark-5 dark:text-gray-300 mr-1"
                @click="toCompany">No</button>
              <button type="button" class="btn btn-success w-24" @click="gotoSquareUpSite">Yes!</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  <ErrorNotification ref="errorNotification" />
</template>

<script setup>
import DarkModeSwitcher from '@/components/dark-mode-switcher/Main.vue'
import { useStore } from 'vuex'
import ErrorNotification from '../../components/notifications/ErrorNotification.vue'
import { computed, onMounted, ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const store = useStore();
const router = useRouter();
const route = useRoute();
const getStep = computed(() => store.getters['getStep'])
const errorNotification = ref(null);
let is_make_create_order = true;

onMounted(() => {
  const squareError = route.query?.squareError;
  if (typeof squareError !== 'undefined') {
    store.commit('setErrorNotification');
  }
  const step = getStep.value;
  let path;
  switch (step) {
    case store.state.user.STEP_COMPANY: path = '/entry/company'; break;
    case store.state.user.STEP_CAFE: path = '/entry/cafe'; break;
    case store.state.user.STEP_FINISH: path = '/entry/finish'; break;
    case store.state.user.STEP_DASHBOARD: path = '/dashboard'; break;
    default: path = '/entry';
  }
  router.push(path);
});

async function toCompany() {
  const res = await store.dispatch('putStep', store.state.user.STEP_COMPANY)
  if (res.status) {
    router.go('/entry/company');
    // window.location.reload();
  } else {
    errorNotification.value.show()
  }
}

async function gotoSquareUpSite() {
  const res = await store.dispatch('fetchSquareRedirectUrl', { is_make_create_order });
  // console.log(res);
  if (res.status) {
    location.href = res?.data?.url;
  }
  // const SQUARE_APP_ID = "sandbox-sq0idb-O7t0Iz9KjwN1g1l2IeSjAQ"
  // location.href = `https://connect.squareupsandbox.com/login?redirect=/oauth2/authorize?client_id=${SQUARE_APP_ID}&scope=CUSTOMERS_WRITE+CUSTOMERS_READ`
  // location.href = `https://connect.squareupsandbox.com/oauth2/authorize?client_id=${SQUARE_APP_ID}&scope=CUSTOMERS_WRITE+CUSTOMERS_READ`
}

function logout(){
  store.dispatch('logout');
  window.location.replace('/')
}

</script>
