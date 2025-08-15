import { _ as _sfc_main$2 } from './nav-a3e48da3.mjs';
import { _ as __nuxt_component_0 } from './nuxt-link-660753fe.mjs';
import { useSSRContext, defineComponent, reactive, ref, unref, withCtx, createVNode } from 'vue';
import { _ as _export_sfc, u as useState, b as useRouter } from './server.mjs';
import { ssrInterpolate, ssrRenderComponent } from 'vue/server-renderer';
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

const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "cardRight",
  __ssrInlineRender: true,
  setup(__props) {
    const patientClaim = reactive(useState("patientClaim"));
    useRouter();
    ref("");
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<!--[--><div class="flex justify-center mt-20"><div class="block w-5/6 mx-28 p-6 bg-white border border-gray-200 rounded-lg shadow"><p class="text-5xl mb-3 font-medium text-gray-900"> \u0E2B\u0E21\u0E32\u0E22\u0E40\u0E25\u0E02\u0E1A\u0E31\u0E15\u0E23\u0E1B\u0E23\u0E30\u0E0A\u0E32\u0E0A\u0E19: ${ssrInterpolate(unref(patientClaim).pid)}</p><p class="text-5xl mb-3 font-medium text-gray-900"> \u0E0A\u0E37\u0E48\u0E2D: ${ssrInterpolate(unref(patientClaim).titleName + unref(patientClaim).fname + " " + unref(patientClaim).lname)}</p><p class="text-5xl mb-3 font-medium text-gray-900"> \u0E2D\u0E32\u0E22\u0E38: ${ssrInterpolate(unref(patientClaim).age)}</p><p class="text-3xl mb-3 font-medium text-gray-900"> \u0E2A\u0E34\u0E17\u0E18\u0E34\u0E2B\u0E25\u0E31\u0E01: ${ssrInterpolate(unref(patientClaim).mainInscl || null)}</p><p class="text-3xl mb-3 font-medium text-gray-900"> \u0E2A\u0E34\u0E17\u0E18\u0E34\u0E23\u0E2D\u0E07: ${ssrInterpolate(unref(patientClaim).subInscl || null)}</p></div></div><div class="flex justify-center gap-4"><button type="button" class="text-white mt-20 items-center bg-palette-bt-green border-2 border-black hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-normal rounded-lg text-6xl px-14 py-7 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 disabled:bg-gray-300 disabled:text-gray-900"> \u0E1E\u0E34\u0E21\u0E1E\u0E4C </button>`);
      _push(ssrRenderComponent(_component_NuxtLink, { to: "/" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<button type="button" class="text-white mt-20 items-center bg-orange-400 border-2 border-black hover:bg-blue-800 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-normal rounded-lg text-6xl px-14 py-7 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 disabled:bg-gray-300 disabled:text-gray-900"${_scopeId}> \u0E2B\u0E19\u0E49\u0E32\u0E41\u0E23\u0E01 </button>`);
          } else {
            return [
              createVNode("button", {
                type: "button",
                class: "text-white mt-20 items-center bg-orange-400 border-2 border-black hover:bg-blue-800 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-normal rounded-lg text-6xl px-14 py-7 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 disabled:bg-gray-300 disabled:text-gray-900"
              }, " \u0E2B\u0E19\u0E49\u0E32\u0E41\u0E23\u0E01 ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><!--]-->`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/cardRight.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  const _component_Nav = _sfc_main$2;
  const _component_NuxtLink = __nuxt_component_0;
  const _component_CardRight = _sfc_main$1;
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
  _push(ssrRenderComponent(_component_CardRight, null, null, _parent));
  _push(`<!--]-->`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/right.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const right = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);

export { right as default };
//# sourceMappingURL=right-ad788ce7.mjs.map
