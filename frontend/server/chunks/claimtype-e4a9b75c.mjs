import { _ as _sfc_main$2 } from './nav-a3e48da3.mjs';
import { _ as __nuxt_component_0 } from './nuxt-link-660753fe.mjs';
import { _ as _sfc_main$3 } from './cardId-4a2cb6ab.mjs';
import { useSSRContext, defineComponent, reactive, withCtx, createVNode, ref, unref } from 'vue';
import { u as useState, b as useRouter, a as useNuxtApp } from './server.mjs';
import { ssrRenderComponent, ssrRenderList, ssrRenderAttr, ssrIncludeBooleanAttr, ssrRenderClass, ssrInterpolate } from 'vue/server-renderer';
import 'ufo';
import './renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'h3';
import './node-server.mjs';
import 'node-fetch-native/polyfill';
import 'node:http';
import 'node:https';
import 'destr';
import 'ofetch';
import 'unenv/runtime/fetch/index';
import 'hookable';
import 'scule';
import 'ohash';
import 'unstorage';
import 'defu';
import 'radix3';
import 'node:fs';
import 'node:url';
import 'pathe';
import 'ipx';
import './composables-efde4aa1.mjs';
import 'unctx';
import '@unhead/vue';
import '@unhead/dom';
import '@unhead/ssr';
import 'vue-router';
import 'dayjs';
import 'dayjs/plugin/relativeTime.js';
import 'dayjs/plugin/buddhistEra.js';
import 'dayjs/plugin/timezone.js';
import 'dayjs/plugin/localizedFormat.js';

const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "cardClaimType",
  __ssrInlineRender: true,
  setup(__props) {
    reactive(useState("personState"));
    reactive(useState("patientInfo"));
    useNuxtApp();
    reactive(useState("visitState"));
    useRouter();
    const loading = ref(true);
    const isDisable = ref(true);
    const patientClaim = reactive(useState("patientClaim"));
    const onFocus = ref(false);
    ref();
    ref({
      pid: "",
      claimType: "",
      mobile: "",
      correlationId: "",
      hn: "",
      hcode: ""
    });
    ref({
      pcucode: "",
      pid: "",
      rightcode: null,
      rightno: null,
      hosmain: null,
      hossub: null,
      username: "",
      claimcode_nhso: "",
      claimcode_type: "",
      datetime_claim: ""
    });
    ref();
    return (_ctx, _push, _parent, _attrs) => {
      var _a;
      _push(`<!--[-->`);
      if (unref(loading)) {
        _push(`<div role="status" class="flex"><div class="m-auto"><svg aria-hidden="true" class="w-40 h-40 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"></path><path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"></path></svg><span class="sr-only">Loading...</span></div></div>`);
      } else {
        _push(`<div class="flex justify-center mt-20"><div class="block w-5/6 mx-28 min-h-full p-6 bg-white border border-gray-200 rounded-lg shadow"><div class="grid grid-cols-2 gap-4" role="group"><!--[-->`);
        ssrRenderList((_a = unref(patientClaim)) == null ? void 0 : _a.claimTypes, (claimtype) => {
          _push(`<div>`);
          if (claimtype.claimType === "PG0060001") {
            _push(`<button type="button"${ssrRenderAttr("value", claimtype.claimType)}${ssrIncludeBooleanAttr(unref(onFocus)) ? " autofocus" : ""} class="${ssrRenderClass([{ focused: unref(onFocus), active: unref(onFocus) }, "block w-full h-full p-6 bg-white border border-gray-200 rounded-lg shadow active:bg-yellow-300 focus:bg-yellow-300 hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"])}"><h5 class="mb-2 text-4xl font-bold tracking-tight text-gray-900 dark:text-white">${ssrInterpolate(claimtype.claimType)}</h5><p class="text-3xl text-gray-700 dark:text-gray-400">${ssrInterpolate(claimtype.claimTypeName)}</p></button>`);
          } else {
            _push(`<button type="button"${ssrRenderAttr("value", claimtype.claimType)} class="${ssrRenderClass([{ focus: unref(onFocus), active: unref(onFocus) }, "block w-full h-full p-6 bg-white border border-gray-200 rounded-lg shadow active:bg-yellow-300 focus:bg-yellow-300 hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"])}"><h5 class="mb-2 text-4xl font-bold tracking-tight text-gray-900 dark:text-white">${ssrInterpolate(claimtype.claimType)}</h5><p class="text-3xl text-gray-700 dark:text-gray-400">${ssrInterpolate(claimtype.claimTypeName)}</p></button>`);
          }
          _push(`</div>`);
        });
        _push(`<!--]--></div></div></div>`);
      }
      _push(`<div class="flex justify-center"><button type="button"${ssrIncludeBooleanAttr(unref(isDisable)) ? " disabled" : ""} class="text-white mt-28 items-center bg-palette-bt-green border-2 border-black hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-normal rounded-lg text-6xl px-14 py-7 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 disabled:bg-gray-300 disabled:text-gray-900"> \u0E22\u0E37\u0E19\u0E22\u0E31\u0E19\u0E01\u0E32\u0E23\u0E23\u0E31\u0E1A\u0E1A\u0E23\u0E34\u0E01\u0E32\u0E23 </button></div><!--]-->`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/cardClaimType.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "claimtype",
  __ssrInlineRender: true,
  setup(__props) {
    reactive(useState("patientInfo"));
    useRouter();
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Nav = _sfc_main$2;
      const _component_NuxtLink = __nuxt_component_0;
      const _component_CardId = _sfc_main$3;
      const _component_CardClaimType = _sfc_main$1;
      _push(`<!--[-->`);
      _push(ssrRenderComponent(_component_Nav, null, null, _parent));
      _push(ssrRenderComponent(_component_NuxtLink, { to: "/" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<button type="button" class="m-5 px-10 py-3 text-5xl font-medium text-center opacity-95 text-white bg-palette-bt-gray rounded-lg hover:bg-gray-700 focus:ring-2 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"${_scopeId}> \u0E01\u0E25\u0E31\u0E1A </button>`);
          } else {
            return [
              createVNode("button", {
                type: "button",
                class: "m-5 px-10 py-3 text-5xl font-medium text-center opacity-95 text-white bg-palette-bt-gray rounded-lg hover:bg-gray-700 focus:ring-2 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              }, " \u0E01\u0E25\u0E31\u0E1A ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_CardId, null, null, _parent));
      _push(ssrRenderComponent(_component_CardClaimType, null, null, _parent));
      _push(`<!--]-->`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/claimtype.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=claimtype-e4a9b75c.mjs.map
