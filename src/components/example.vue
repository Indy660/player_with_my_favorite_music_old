<template>
  <section id="product" class="product">
    <div v-if="loading" class="loading">
      <v-progress-circular indeterminate color="#1d1d1b" :size="70" :width="7" />
    </div>
    <template v-else>
      <h1 v-if="!product" style="color: blue">
        {{ $t('catalog.not_found') }}
      </h1>
      <div v-else>
        <div class="container">
          <router-link class="product__btn-main" to="Products">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="8"
              height="14"
              viewBox="0 0 8 14"
              fill="none"
              style="margin-right: 5px"
            >
              <path d="M7 13L1 7.00006L7 1.00007" stroke="#919191" />
            </svg>
            {{ $t('general.back') }}
          </router-link>
          <div class="product__item" :class="{ 'align-center': showBuyBlock, 'sold': showSoldImage }">
            <div class="product__item-pic">
              <img v-if="image" :src="image" class="product__item-pic-img" />
              <div v-if="showSoldImage" class="goods__item-pic-sold elevation-5">
                <span>{{ $t('catalog.spend_success') }}</span>
                <img src="@/assets/img/product/icon-01.png" alt="icon" class="" />
                <img src="@/assets/img/product/icon-02.png" alt="icon" class="" />
                <img src="@/assets/img/product/icon-03.png" alt="icon" class="" />
              </div>
            </div>
            <div class="product__item-content" :class="{ 'with-loader': showLoader }">
              <v-progress-circular v-if="showLoader" indeterminate color="#ff9900" :size="50" :width="5" />
              <template v-else>
                <template v-if="!showBuyBlock">
                  <template v-if="!isService">
                    <div class="product__item-block">
                      <div class="product__item-block-item">
                        <p class="product__item-title">
                          {{ $t('catalog.brand') }}
                        </p>
                        <p class="product__item-main">
                          {{ product.brandName }}
                        </p>
                        <template v-if="product.categoryName">
                          <p class="product__item-title">
                            {{ $t('catalog.category') }}
                          </p>
                          <p class="product__item-text">
                            {{ product.categoryName }}
                          </p>
                        </template>
                        <p class="product__item-title">
                          {{ $t('catalog.model') }}
                        </p>
                        <p class="product__item-text">
                          {{ product.name }}
                        </p>
                      </div>
                      <div class="product__item-block-item">
                        <p class="product__item-title">
                          {{ $t('catalog.price') }}
                        </p>
                        <p class="product__item-main">
                          <span>{{ product.salePrice.toLocaleString('ru') }}</span>
                          <img src="@/assets/img/order/icon-coin.png" alt="icon" class="product__item-main-pic" />
                        </p>
                        <p class="product__item-title">
                          {{ $t('catalog.amount') }}
                        </p>
                        <p class="product__item-text">
                          {{ product.quantityInStock }}
                        </p>
                        <div class="product__item-block-item-nav">
                          <button
                            type="button"
                            class="product__item-btn product__item-btn_lg"
                            @click="checkIfUserCanMakeOrder"
                          >
                            {{ $t('catalog.buy_for_tokens') }}
                          </button>
                          <!-- <p
                              v-else
                              class="text-h6 font-weight-bold mb-0"
                              style="color: #B71C1C;"
                            >
                              {{ $t('catalog.errors.not_enough_tokens') }}
                            </p> -->
                        </div>
                      </div>
                    </div>
                    <p class="product__item-title">
                      {{ $t('catalog.description') }}
                    </p>
                    <div ref="descriptionEl" class="product__item-container" :class="{ active: description.isVisible }">
                      <div v-for="(item, idx) in productDescription" :key="idx">
                        <p v-if="item.length === 1" class="product__item-container-text">
                          {{ item[0] }}
                        </p>
                        <template v-else>
                          <p class="product__item-container-title">
                            {{ item[0] }}
                          </p>
                          <p class="product__item-container-text">
                            {{ item[1] }}
                          </p>
                        </template>
                      </div>
                    </div>
                    <button
                      v-if="description.button"
                      type="button"
                      class="product__item-container-btn"
                      @click="description.isVisible = !description.isVisible"
                    >
                      {{ !description.isVisible ? `${$t('general.yet')}...` : $t('general.hide') }}
                    </button>
                  </template>
                  <template v-else-if="product.productTypeId === 2">
                    <h2 style="max-width: 400px">
                      <span class="text-orange font-weight-bold">
                        {{ productNameFormatted[0] }}
                      </span>
                      <span>
                        {{ productNameFormatted[1] }}
                      </span>
                    </h2>
                    <div style="margin-top: 52px">
                      <div class="d-flex flex-column flex-md-row align-start mb-5">
                        <div style="width: 200px">
                          <p class="product__item-title mb-lg-0">
                            {{ $t('homepage.balance') }}
                          </p>
                          <p class="product__item-main mb-lg-0">
                            <span>{{ userBalance.toLocaleString('ru') }}</span>
                            <img src="@/assets/img/order/icon-coin.png" alt="icon" class="product__item-main-pic" />
                          </p>
                        </div>

                        <div
                          v-if="userDeals && userDeals.length"
                          class="product__status mt-3 mt-md-0 ml-md-10"
                          :class="{ visible: docNumber.isVisible }"
                          @click="docNumber.toggle"
                        >
                          <div class="product__status-main">
                            <p class="product__status-current">
                              {{
                                $t('general.agreement', {
                                  number: docNumber.selected.docNum || '',
                                })
                              }}
                            </p>
                            <div class="product__status-arrow">
                              <svg
                                width="12"
                                height="7"
                                viewBox="0 0 12 7"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                style="transition: 0.4s"
                              >
                                <path d="M1 0.935045L6.0159 6.06494L11.1203 0.935045" stroke="black" />
                              </svg>
                            </div>
                          </div>
                          <div class="product__status-aside" :class="{ visible: docNumber.isVisible }">
                            <span
                              v-for="deal in userDeals"
                              :key="deal.docNum"
                              class="product__status-btn"
                              @click="docNumber.select(deal)"
                            >
                              {{ $t('general.agreement', { number: deal.docNum }) }}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div class="d-flex flex-column flex-md-row align-start">
                        <div style="width: 200px">
                          <p class="product__item-title mb-lg-0">
                            {{ $t('catalog.amount_to_pay') }}
                          </p>
                          <p class="product__item-main mb-lg-0">
                            <span>
                              {{ totalAmount.toLocaleString('ru') }}
                            </span>
                            <img src="@/assets/img/order/icon-coin.png" alt="icon" class="product__item-main-pic" />
                          </p>
                        </div>

                        <div v-if="userBalance" class="mt-3 mt-md-0 ml-md-10" style="width: 200px">
                          <v-slider
                            v-model="filters.priceTo"
                            :max="maxAmount"
                            :min="1"
                            hide-details
                            color="#ff9900"
                            track-color="#1d1d1b"
                            class="mx-xl-2"
                          />
                          <div class="mx-4">
                            <input
                              ref="priceInputRef"
                              class="product__volume-input"
                              type="number"
                              @input="handlePriceInput"
                              @change="handlePriceChange"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div style="margin-top: 52px">
                      <button
                        type="button"
                        class="product__item-btn product__item-btn_lg"
                        @click="checkIfUserCanMakeOrder"
                      >
                        {{ $t('catalog.buy_for_tokens') }}
                      </button>
                      <!-- <p
                          v-else
                          class="text-h6 font-weight-bold mb-0"
                          style="color: #B71C1C;"
                        >
                          {{ $t('catalog.errors.not_enough_tokens') }}
                        </p> -->
                    </div>
                  </template>
                </template>
                <template v-else>
                  <div v-if="!showSoldImage" class="goods__item-block">
                    <div class="goods__item-block-info active">
                      <p class="goods__item-text mb-0">
                        {{ !isService ? $t('catalog.place_order') : $t('catalog.place_order_service') }}
                      </p>
                      <p class="goods__item-alert">
                        {{ product.name }}
                        <span v-if="isService">
                          {{ docNumber.selected.docNum }}
                        </span>
                      </p>
                      <p
                        v-if="!isService"
                        class="goods__item-quantity"
                        v-html="$t('catalog.quantity_in_stock', { number: product.quantityInStock })"
                      ></p>
                      <p class="goods__item-alert" :class="{ 'mt-8': isService }">
                        {{ $t('catalog.attention') }}
                        <br />
                        <i18n path="catalog.charge_warning">
                          <template #tokens>
                            <span class="d-inline-block">
                              {{ !isService ? product.salePrice.toLocaleString('ru') : totalAmount }}
                              <img src="@/assets/img/order/icon-coin.png" />
                            </span>
                          </template>
                        </i18n>
                      </p>
                      <div class="goods__item-bottom">
                        <button type="button" class="goods__item-btn goods__item-btn-buy" @click="buyProduct">
                          {{ $t('catalog.confirm_charge') }}
                        </button>
                        <button type="button" class="goods__item-btn" @click="showBuyBlock = false">
                          {{ $t('catalog.discard') }}
                        </button>
                      </div>
                    </div>
                  </div>
                  <div v-else class="goods__item-block goods__item-block-show">
                    <p class="goods__item-happy">
                      {{ $t('general.success') }}
                    </p>
                    <p class="goods__item-text">
                      {{ $t('catalog.charged') }}
                    </p>
                    <p class="goods__item-cost">
                      <span>
                        {{ !isService ? product.salePrice.toLocaleString('ru') : totalAmount }}
                      </span>
                      &nbsp;
                      <img src="@/assets/img/order/icon-coin.png" />
                    </p>
                    <i18n class="goods__item-alert" path="catalog.track_status" tag="p">
                      <template #link>
                        <router-link to="/orders" style="color: #ff9900; text-decoration: underline">
                          &laquo;{{ $t('orders.short_title') }}&raquo;
                        </router-link>
                      </template>
                    </i18n>
                    <div class="goods__item-bottom">
                      <router-link to="/catalog" class="goods__item-btn goods__item-btn-buy">
                        {{ $t('catalog.see_more_products') }}
                      </router-link>
                      <router-link to="/orders" class="goods__item-btn">
                        {{ $t('general.to_orders') }}
                      </router-link>
                    </div>
                  </div>
                </template>
              </template>
            </div>
          </div>
        </div>

        <related-slider :product="product" />

        <v-dialog v-model="dialog.isVisible" max-width="600">
          <v-card>
            <v-card-title class="flex-column">
              <p class="font-weight-bold mb-0">
                {{ dialog.title }}
              </p>
              <p class="font-weight-bold mb-0">
                {{ dialog.text }}
              </p>
            </v-card-title>

            <v-card-actions class="justify-center">
              <button type="button" class="goods__item-btn goods__item-btn-buy mb-3" @click="dialog.isVisible = false">
                {{ $t('general.got_it') }}
              </button>
            </v-card-actions>
          </v-card>
        </v-dialog>

        <v-dialog v-model="isErrorDialogVisible" max-width="720">
          <v-card>
            <v-card-title class="flex-column goods__error-dialog-title">
              <p class="font-weight-bold mb-0">
                <!--                {{ apiError }}-->
                Это ошибка и тут предположим очень много текста. Сделай хоть что-нибудь с этим!!!
              </p>
              <p class="font-weight-bold mb-0">
                {{ $t('general.try_again') }}
              </p>
            </v-card-title>

            <v-card-actions class="justify-center">
              <button
                type="button"
                class="goods__item-btn goods__item-btn-buy mb-3"
                @click="isErrorDialogVisible = false"
              >
                {{ $t('general.got_it') }}
              </button>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </div>
    </template>
  </section>
</template>

<script lang="ts">
import { computed, defineComponent, nextTick, onMounted, reactive, ref, watch, watchEffect } from 'vue-demi';
import RelatedSlider from './components/RelatedSlider/index.vue';
import { useDialog, useLoading, usePriceInput } from '@/composition';
import { makeOrder } from '@/api/orders';
import { MakeOrderPayload, Product } from '@/interfaces';

export default defineComponent({
  name: 'Product',
  components: {
    RelatedSlider,
  },
  setup(_props, { root }) {
    const { $store } = root;

    const userBalance = computed(() => {
      return $store.getters.userBalance;
    });

    const productsFetched = $store.getters['catalog/productsFetched'];
    const servicesFetched = $store.getters['catalog/servicesFetched'];

    const product = ref<Product | null>(null);
    const apiError = ref<string | null>(null);

    const userDeals = computed(() => {
      return (
        (root.$store.getters.getUserInfo?.deals ?? [])
          // @ts-ignore
          .filter((deal) => Boolean(deal?.docNum))
      );
    });

    const docNumber = reactive({
      isVisible: false,
      toggle() {
        docNumber.isVisible = !docNumber.isVisible;
      },
      select(type: string) {
        docNumber.selected = type;
      },
      selected: userDeals.value[0] ? userDeals.value[0] : '',
    });

    const isService = computed<boolean>(() => product.value?.productTypeId === 2);

    function findProductById() {
      const productId = parseInt(root.$route.params.id, 10);
      if (!isNaN(productId)) {
        const productById = $store.getters['catalog/getProductById'](productId);
        if (productById) {
          product.value = productById;

          filters.priceTo = 1;
        }
      }
    }

    const { loading, setLoading } = useLoading();

    const breadcrumbs = computed(() => {
      if (!product.value) {
        return [];
      }

      return [
        {
          text: product.value.brandName,
          url: `/catalog/?brand=${product.value.brandName}`,
        },
        {
          text: product.value.name,
          url: '',
        },
      ];
    });

    const productNameFormatted = computed(() => {
      if (!product.value) {
        return [];
      }

      const [firstWord, ...rest] = product.value.name.split(' ');
      return [firstWord, rest.join(' ')];
    });

    const productDescription = computed(() => {
      if (!product.value) {
        return [];
      }

      const result: any = [];
      const paragraphs = product.value.descriptionDetail.split('\n\n');
      for (const p of paragraphs) {
        result.push(p.split('\n'));
      }

      return result;
    });

    const image = computed<string>(() => {
      if (!product.value?.img?.length) {
        return '';
      }

      return product.value.img[0].imgData;
    });

    const showBuyBlock = ref<boolean>(false);
    const showSoldImage = ref<boolean>(false);

    const buyProduct = async () => {
      if (!product.value) {
        return;
      }

      try {
        showLoader.value = true;

        const payload = {
          cardId: $store.getters.physicalUserCardId,
          date: new Date().toISOString(),
          prodId: product.value.id,
          userComment: '',
        } as MakeOrderPayload;

        if (isService.value) {
          payload.volume = filters.priceTo;
          payload.dealId = docNumber.selected.id;
        }

        const order = await makeOrder(payload);

        showSoldImage.value = true;
        if (order) {
          $store.commit('setUserBalance', order.balance);
          await $store.dispatch('orders/fetchOrders');
          await $store.dispatch('fetchAllOperations');
        }
      } catch (error: any) {
        apiError.value = error.response?.data ?? error.message;
        toggleErrorDialog();
        showBuyBlock.value = false;
      } finally {
        showLoader.value = false;
      }
    };

    const { isVisible: isVisibleDialog, toggle: toggleDialog } = useDialog();
    const dialogTitle = ref<string>(`${root.$i18n.t('general.error_occured')}!`);
    const dialogText = ref<string>(`${root.$i18n.t('catalog.errors.you_have_no_card')} ☹️`);

    const checkIfUserCanMakeOrder = () => {
      if (!product.value) {
        dialogText.value = '';
        return;
      }

      if (!$store.getters.physicalUserCardId) {
        toggleDialog();
        return;
      }

      if (userBalance.value <= product.value.salePrice) {
        dialogTitle.value = `${root.$i18n.t('general.error_occured')}!`;
        const diff = product.value.salePrice - userBalance.value;
        dialogText.value = root.$i18n.t('catalog.errors.not_enough_tokens', { diff }) as string;
        toggleDialog();
        return;
      }

      showBuyBlock.value = true;
    };

    const showLoader = ref<boolean>(false);

    const description = reactive({
      button: true,
      isVisible: false,
    });
    const descriptionEl = ref<HTMLElement | null>(null);

    const stopWatcher = watchEffect(() => {
      updateDescription();
    });

    function updateDescription() {
      if (descriptionEl.value) {
        const { height } = descriptionEl.value.getBoundingClientRect();

        description.button = height >= 220;
        description.isVisible = height < 220;

        stopWatcher();
      }
    }

    watch(
      () => root.$route.params.id,
      () => {
        findProductById();
        showBuyBlock.value = false;

        nextTick(() => {
          updateDescription();
        });
      },
    );
    // isVisible: isErrorDialogVisible,
    const { toggle: toggleErrorDialog } = useDialog();
    const isErrorDialogVisible = true;

    const filters = reactive({
      priceTo: product.value?.salePrice,
    });

    const { priceInputRef, handlePriceInput, handlePriceChange } = usePriceInput(filters);

    const maxAmount = computed<number>(() => {
      if (!product.value) {
        return 0;
      }

      return Math.floor(userBalance.value / product.value.salePrice);
    });

    const totalAmount = computed<number>(() => {
      if (!product.value || !filters.priceTo) {
        return 0;
      }

      return product.value.salePrice * filters.priceTo;
    });

    onMounted(async () => {
      findProductById();

      if (!product.value) {
        setLoading(true);

        if (!productsFetched) {
          await $store.dispatch('catalog/fetchProducts');
        }

        if (!servicesFetched) {
          await $store.dispatch('catalog/fetchServices');
        }

        findProductById();
      }

      setLoading(false);
    });

    return {
      breadcrumbs,
      checkIfUserCanMakeOrder,
      image,
      isService,

      loading,
      buyProduct,
      docNumber,
      product,
      productNameFormatted,
      productDescription,
      showBuyBlock,
      showLoader,
      showSoldImage,

      description,
      descriptionEl,

      dialog: reactive({
        isVisible: isVisibleDialog,
        title: dialogTitle,
        text: dialogText,
      }),

      isErrorDialogVisible,
      apiError,

      userBalance,
      userDeals,

      priceInputRef,
      handlePriceInput,
      handlePriceChange,
      filters,

      maxAmount,
      totalAmount,
    };
  },
});
</script>

<style lang="scss" src="./styles/_style.scss"></style>
