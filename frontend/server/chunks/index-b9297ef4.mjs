import { p as publicAssetsURL } from './renderer.mjs';
import { _ as _sfc_main$3 } from './nav-a3e48da3.mjs';
import { useSSRContext, defineComponent, ref, reactive, unref, mergeProps } from 'vue';
import { b as useRouter, a as useNuxtApp, u as useState, _ as _export_sfc } from './server.mjs';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderAttr, ssrInterpolate } from 'vue/server-renderer';
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
import 'ufo';
import 'unstorage';
import 'defu';
import 'radix3';
import 'node:fs';
import 'node:url';
import 'pathe';
import 'ipx';
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

const _imports_0 = "" + publicAssetsURL("imgs/Public_Health.png");
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "logo",
  __ssrInlineRender: true,
  setup(__props) {
    reactive(useState("hospitalState"));
    const hospital = ref({
      hoscode: "",
      hosname: "",
      address: "",
      road: "",
      mu: "",
      provname: "",
      distname: "",
      subdistname: ""
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[--><div class="flex justify-center mt-20"><div class="flex items-center"><img${ssrRenderAttr("src", _imports_0)} class="h-32 mr-5" alt="Flowbite Logo"><span class="text-white self-center text-4xl font-medium whitespace-nowrap dark:text-white">${ssrInterpolate(unref(hospital).hosname)}</span></div></div><div class="flex justify-center mt-5"><span class="text-white text-3xl font-medium dark:text-white">${ssrInterpolate(unref(hospital).address ? unref(hospital).address : "")} ${ssrInterpolate(unref(hospital).mu ? "\u0E2B\u0E21\u0E39\u0E48 " + unref(hospital).mu : "")} ${ssrInterpolate(unref(hospital).subdistname ? " \u0E15\u0E33\u0E1A\u0E25" + unref(hospital).subdistname : "")} ${ssrInterpolate(unref(hospital).distname ? " \u0E2D\u0E33\u0E40\u0E20\u0E2D" + unref(hospital).distname : "")} ${ssrInterpolate(unref(hospital).provname ? " \u0E08\u0E31\u0E07\u0E2B\u0E27\u0E31\u0E14" + unref(hospital).provname : "")}</span></div><!--]-->`);
    };
  }
});
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/logo.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const _sfc_main$1 = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex items-center w-100 h-70 md:w-50 md:h-70" }, _attrs))}><div class="box"><div class="card"></div></div></div>`);
}
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/card.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_2 = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["ssrRender", _sfc_ssrRender]]);
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    useRouter();
    useNuxtApp();
    const loading = ref(false);
    reactive(useState("personState"));
    reactive(
      useState("personContectState")
    );
    reactive(
      useState("personImageState")
    );
    reactive(useState("patientInfo"));
    reactive(useState("patientClaim"));
    reactive(useState("visitState"));
    ref({
      cid: "",
      prename: "",
      fname: "",
      lname: "",
      gender: "",
      dob: "",
      issue_date: "",
      expire_date: "",
      address: {
        hid: "",
        mu: "",
        subdistrict: "",
        district: "",
        province: ""
      },
      image: ""
    });
    ref({
      pcucodeperson: "",
      hcode: 0,
      prename: "",
      fname: "",
      lname: "",
      birth: "",
      sex: "",
      idcard: "",
      hnomoi: "",
      mumoi: "",
      subdistcodemoi: "",
      distcodemoi: "",
      provcodemoi: "",
      telephoneperson: ""
    });
    ref({
      pcucodeperson: "",
      pid: 0,
      photo: ""
    });
    ref({
      cid: "",
      hno: "",
      mu: "",
      subdistcode: "",
      distcode: "",
      provcode: "",
      pid: 0
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Nav = _sfc_main$3;
      const _component_Logo = _sfc_main$2;
      const _component_card = __nuxt_component_2;
      if (unref(loading)) {
        _push(`<div${ssrRenderAttrs(mergeProps({
          role: "status",
          class: "flex h-screen"
        }, _attrs))}><div class="m-auto"><svg aria-hidden="true" class="w-40 h-40 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"></path><path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"></path></svg><span class="sr-only">Loading...</span></div></div>`);
      } else {
        _push(`<div${ssrRenderAttrs(_attrs)}>`);
        _push(ssrRenderComponent(_component_Nav, null, null, _parent));
        _push(ssrRenderComponent(_component_Logo, null, null, _parent));
        _push(`<div class="justify-center grid grid-cols-1"><h1 class="text-5xl text-center mt-28 text-white"> \u0E01\u0E23\u0E38\u0E13\u0E32\u0E40\u0E2A\u0E35\u0E22\u0E1A\u0E1A\u0E31\u0E15\u0E23\u0E1B\u0E23\u0E30\u0E0A\u0E32\u0E0A\u0E19\u0E01\u0E48\u0E2D\u0E19\u0E22\u0E37\u0E19\u0E22\u0E31\u0E19\u0E15\u0E31\u0E27\u0E15\u0E19 </h1>`);
        _push(ssrRenderComponent(_component_card, null, null, _parent));
        _push(`</div><div class="flex items-center justify-center"><button type="button" class="flex flex-col items-center justify-center text-black mt-40 w-full bg-yellow-400 border-2 border-black hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-normal rounded-lg text-6xl mx-20 px-12 py-7 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"><svg class="w-14 h-14" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3.656 12.115a3 3 0 0 1 5.682-.015M13 5h3m-3 3h3m-3 3h3M2 1h16a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1Zm6.5 4.5a2 2 0 1 1-4 0 2 2 0 0 1 4 0Z"></path></svg> \u0E22\u0E37\u0E19\u0E22\u0E31\u0E19\u0E15\u0E31\u0E27\u0E15\u0E19 </button></div><div class="grid grid-cols-2 gap-4"><div class="flex justify-center"><button type="button" class="text-white mt-5 items-center w-full bg-palette-bt-green border-2 border-black hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-normal rounded-lg text-3xl ml-20 py-7 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"> \u0E40\u0E1B\u0E34\u0E14\u0E1A\u0E23\u0E34\u0E01\u0E32\u0E23\u0E42\u0E14\u0E22\u0E44\u0E21\u0E48\u0E22\u0E37\u0E19\u0E22\u0E31\u0E19\u0E15\u0E31\u0E27\u0E15\u0E19 </button></div><div class="flex justify-center"><button type="button" class="text-white mt-5 items-center w-full bg-palette-bt-green border-2 border-black hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-normal rounded-lg text-3xl mr-20 py-7 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"> \u0E40\u0E0A\u0E47\u0E04\u0E2A\u0E34\u0E17\u0E18\u0E34\u0E23\u0E31\u0E01\u0E29\u0E32\u0E1E\u0E22\u0E32\u0E1A\u0E32\u0E25 </button></div></div><div class="flex justify-center"><button type="button" class="text-white mt-5 inline-flex items-center justify-center w-full bg-palette-bt-green border-2 border-black hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-normal rounded-lg text-6xl mx-20 px-14 py-7 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"><svg class="w-10 h-10 mr-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20"><path d="M5 20h10a1 1 0 0 0 1-1v-5H4v5a1 1 0 0 0 1 1Z"></path><path d="M18 7H2a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2v-3a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v3a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2Zm-1-2V2a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v3h14Z"></path></svg> \u0E1E\u0E34\u0E21\u0E1E\u0E4C\u0E1A\u0E31\u0E15\u0E23\u0E04\u0E34\u0E27 </button></div><div class="flex justify-center"><button type="button" class="text-white mt-5 items-center w-full bg-red-600 border-2 border-black font-normal rounded-lg text-4xl mx-20 px-14 py-7 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"> \u0E1B\u0E34\u0E14\u0E2A\u0E34\u0E17\u0E18\u0E34(\u0E22\u0E37\u0E19\u0E22\u0E31\u0E19\u0E15\u0E31\u0E27\u0E15\u0E19) </button></div></div>`);
      }
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-b9297ef4.mjs.map
