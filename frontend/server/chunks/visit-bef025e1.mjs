import { _ as _sfc_main$2 } from './nav-a3e48da3.mjs';
import { _ as __nuxt_component_0 } from './nuxt-link-660753fe.mjs';
import { _ as _sfc_main$3 } from './qrcode-b9d50053.mjs';
import { useSSRContext, defineComponent, reactive, ref, unref, withCtx, createVNode } from 'vue';
import { _ as _export_sfc, u as useState, b as useRouter, a as useNuxtApp } from './server.mjs';
import { ssrInterpolate, ssrRenderComponent } from 'vue/server-renderer';
import 'ufo';
import '@vueuse/integrations/useQRCode';
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
  __name: "cardVisit",
  __ssrInlineRender: true,
  setup(__props) {
    const personState = reactive(useState("personState"));
    useRouter();
    const { $dayjs } = useNuxtApp();
    reactive(useState("visitState"));
    const infoVisit = ref();
    ref();
    ref();
    return (_ctx, _push, _parent, _attrs) => {
      var _a, _b, _c, _d, _e, _f, _g;
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<!--[--><div class="flex justify-center mt-20"><div class="block w-5/6 mx-28 min-h-full p-6 bg-white border border-gray-200 rounded-lg shadow"><p class="text-5xl mb-3 font-medium text-gray-900 dark:text-white"> \u0E2B\u0E21\u0E32\u0E22\u0E40\u0E25\u0E02\u0E1A\u0E31\u0E15\u0E23\u0E1B\u0E23\u0E30\u0E0A\u0E32\u0E0A\u0E19 ${ssrInterpolate(unref(personState).idcard)}</p><p class="text-5xl mb-3 font-medium text-gray-900 dark:text-white"> \u0E0A\u0E37\u0E48\u0E2D: ${ssrInterpolate(unref(personState).titlename + "" + unref(personState).fname + " " + unref(personState).lname)}</p><p class="text-5xl mb-3 font-medium text-gray-900 dark:text-white"> HN : ${ssrInterpolate(unref(personState).pid)}</p><p class="text-5xl mb-3 font-medium text-gray-900 dark:text-white"> VisitNo ${ssrInterpolate((_a = unref(infoVisit)) == null ? void 0 : _a.visitno)}</p><p class="text-5xl mb-3 font-medium text-gray-900 dark:text-white"> \u0E27\u0E31\u0E19\u0E23\u0E31\u0E1A\u0E1A\u0E23\u0E34\u0E01\u0E32\u0E23 ${ssrInterpolate(unref($dayjs)((_b = unref(infoVisit)) == null ? void 0 : _b.visitdate).format("D MMMM BBBB"))}</p><p class="text-5xl mb-3 font-medium text-gray-900 dark:text-white"> \u0E40\u0E27\u0E25\u0E32 ${ssrInterpolate(((_c = unref(infoVisit)) == null ? void 0 : _c.datetime_claim) ? unref($dayjs)((_d = unref(infoVisit)) == null ? void 0 : _d.datetime_claim).format(
        "HH:mm:ss \u0E19."
      ) : ((_e = unref(infoVisit)) == null ? void 0 : _e.timestart) + " \u0E19.")}</p><p class="text-5xl mb-3 font-medium text-gray-900 dark:text-white"> ClaimCode ${ssrInterpolate(((_f = unref(infoVisit)) == null ? void 0 : _f.claimcode_nhso) ? (_g = unref(infoVisit)) == null ? void 0 : _g.claimcode_nhso : "\u0E22\u0E31\u0E07\u0E44\u0E21\u0E48\u0E44\u0E14\u0E49\u0E02\u0E2D Authen Code")}</p></div></div><div class="flex justify-center gap-4"><button type="button" class="text-white mt-20 items-center bg-palette-bt-green border-2 border-black hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-normal rounded-lg text-6xl px-14 py-7 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 disabled:bg-gray-300 disabled:text-gray-900"> \u0E1E\u0E34\u0E21\u0E1E\u0E4C </button>`);
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/cardVisit.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  const _component_Nav = _sfc_main$2;
  const _component_NuxtLink = __nuxt_component_0;
  const _component_Qrcode = _sfc_main$3;
  const _component_CardVisit = _sfc_main$1;
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
  _push(ssrRenderComponent(_component_Qrcode, null, null, _parent));
  _push(ssrRenderComponent(_component_CardVisit, null, null, _parent));
  _push(`<!--]-->`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/visit.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const visit = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);

export { visit as default };
//# sourceMappingURL=visit-bef025e1.mjs.map
