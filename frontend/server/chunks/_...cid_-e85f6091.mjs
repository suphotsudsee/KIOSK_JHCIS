import { _ as _sfc_main$1 } from './nav-a3e48da3.mjs';
import { _ as __nuxt_component_0 } from './nuxt-link-660753fe.mjs';
import { defineComponent, ref, withCtx, createVNode, unref, createTextVNode, useSSRContext } from 'vue';
import { d as useRoute, b as useRouter } from './server.mjs';
import { ssrRenderComponent, ssrInterpolate } from 'vue/server-renderer';
import 'ufo';
import 'ofetch';
import 'hookable';
import 'unctx';
import '@unhead/vue';
import '@unhead/dom';
import '@unhead/ssr';
import 'vue-router';
import 'h3';
import 'defu';
import 'dayjs';
import 'dayjs/plugin/relativeTime.js';
import 'dayjs/plugin/buddhistEra.js';
import 'dayjs/plugin/timezone.js';
import 'dayjs/plugin/localizedFormat.js';
import './node-server.mjs';
import 'node-fetch-native/polyfill';
import 'node:http';
import 'node:https';
import 'destr';
import 'unenv/runtime/fetch/index';
import 'scule';
import 'ohash';
import 'unstorage';
import 'radix3';
import 'node:fs';
import 'node:url';
import 'pathe';
import 'ipx';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "[...cid]",
  __ssrInlineRender: true,
  setup(__props) {
    const loading = ref(true);
    useRoute();
    useRouter();
    const claim = ref();
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Nav = _sfc_main$1;
      const _component_NuxtLink = __nuxt_component_0;
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
      if (unref(loading)) {
        _push(`<div role="status" class="flex"><div class="m-auto"><svg aria-hidden="true" class="w-40 h-40 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"></path><path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"></path></svg><span class="sr-only">Loading...</span></div></div>`);
      } else {
        _push(`<div class="flex justify-center mt-20"><div class="block w-5/6 mx-20 min-h-full p-6 bg-white border border-gray-200 rounded-lg shadow"><div class="mb-10"><a class="block mb-2 text-6xl text-center font-medium text-green-900"> \u0E1B\u0E34\u0E14\u0E2A\u0E34\u0E17\u0E18\u0E34\u0E2A\u0E33\u0E40\u0E23\u0E47\u0E08 </a></div><div class="mb-10"><label for="cid" class="block mb-2 text-5xl font-medium text-green-900"> \u0E2B\u0E21\u0E32\u0E22\u0E40\u0E25\u0E02 ClaimCode </label><a class="border border-gray-300 text-gray-900 text-4xl rounded-lg focus:ring-green-600 focus:border-blue-500 block w-full p-2.5">${ssrInterpolate(unref(claim).nhso_authencode_closed)}</a></div><div class="mb-10"><label for="cid" class="block mb-2 text-5xl font-medium text-green-900"> \u0E04\u0E48\u0E32\u0E43\u0E0A\u0E49\u0E08\u0E48\u0E32\u0E22\u0E17\u0E31\u0E49\u0E07\u0E2B\u0E21\u0E14 </label><a class="border border-gray-300 text-gray-900 text-4xl rounded-lg focus:ring-green-600 focus:border-blue-500 block w-full p-2.5">${ssrInterpolate(unref(claim).money_closed_all)} \u0E1A\u0E32\u0E17</a></div><div class="flex justify-center">`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/",
          class: "text-white mt-20 items-center bg-palette-bt-green disabled:bg-palette-bt-gray border-2 border-black hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-normal rounded-lg text-6xl px-14 py-7 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` \u0E01\u0E25\u0E31\u0E1A\u0E44\u0E1B\u0E2B\u0E19\u0E49\u0E32\u0E41\u0E23\u0E01 `);
            } else {
              return [
                createTextVNode(" \u0E01\u0E25\u0E31\u0E1A\u0E44\u0E1B\u0E2B\u0E19\u0E49\u0E32\u0E41\u0E23\u0E01 ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div></div></div>`);
      }
      _push(`<!--]-->`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/closeright/[...cid].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=_...cid_-e85f6091.mjs.map
