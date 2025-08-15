import { _ as _sfc_main$2 } from './nav-a3e48da3.mjs';
import { _ as __nuxt_component_0 } from './nuxt-link-660753fe.mjs';
import { useSSRContext, defineComponent, ref, unref, withCtx, createVNode } from 'vue';
import { _ as _export_sfc } from './server.mjs';
import { ssrRenderList, ssrRenderAttr, ssrInterpolate, ssrRenderComponent } from 'vue/server-renderer';
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
  __name: "cardProvider",
  __ssrInlineRender: true,
  setup(__props) {
    const provider = ref([]);
    ref("adm");
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[--><div class="flex justify-center mt-20"><div class="block w-5/6 mx-28 p-6 bg-white border border-gray-200 rounded-lg shadow"><p class="text-5xl mb-6 font-medium text-gray-900"> \u0E15\u0E31\u0E49\u0E07\u0E04\u0E48\u0E32\u0E23\u0E30\u0E1A\u0E1A </p><div><label for="provider" class="block mb-2 text-2xl font-medium text-gray-900 dark:text-white"> \u0E40\u0E1B\u0E25\u0E35\u0E48\u0E22\u0E19\u0E0A\u0E37\u0E48\u0E2D\u0E1C\u0E39\u0E49\u0E40\u0E1B\u0E34\u0E14\u0E1A\u0E23\u0E34\u0E01\u0E32\u0E23</label><select id="provider" class="bg-gray-50 border border-gray-300 text-gray-900 text-2xl rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"><option selected>\u0E40\u0E25\u0E37\u0E2D\u0E01\u0E1C\u0E39\u0E49\u0E43\u0E2B\u0E49\u0E1A\u0E23\u0E34\u0E01\u0E32\u0E23</option><!--[-->`);
      ssrRenderList(unref(provider), (item) => {
        _push(`<option${ssrRenderAttr("value", item.username)}>${ssrInterpolate(item.username)}</option>`);
      });
      _push(`<!--]--></select></div></div></div><div class="flex justify-center"><button type="button" class="text-white mt-20 items-center bg-palette-bt-green disabled:bg-palette-bt-gray border-2 border-black hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-normal rounded-lg text-6xl px-14 py-7 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"> \u0E1A\u0E31\u0E19\u0E17\u0E36\u0E01 </button></div><!--]-->`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/cardProvider.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  const _component_Nav = _sfc_main$2;
  const _component_NuxtLink = __nuxt_component_0;
  const _component_CardProvider = _sfc_main$1;
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
  _push(ssrRenderComponent(_component_CardProvider, null, null, _parent));
  _push(`<!--]-->`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/setting.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const setting = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);

export { setting as default };
//# sourceMappingURL=setting-b06b6ba8.mjs.map
