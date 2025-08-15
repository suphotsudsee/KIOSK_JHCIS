import { defineComponent, reactive, ref, unref, useSSRContext } from 'vue';
import { u as useState, b as useRouter, a as useNuxtApp } from './server.mjs';
import { ssrInterpolate, ssrRenderAttr } from 'vue/server-renderer';
import { useQRCode } from '@vueuse/integrations/useQRCode';
import 'ofetch';
import 'hookable';
import 'unctx';
import '@unhead/vue';
import '@unhead/dom';
import '@unhead/ssr';
import 'vue-router';
import 'h3';
import 'ufo';
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

const lookup = {
  /**
  * Find a gender by ID.
  *
  * @param {number} id - The ID of the gender to find.
  * @return {Type | null} The found gender, or null if not found.
  */
  title: (code) => {
    var _a;
    return (_a = titles.find((item) => item.titlecode === code)) == null ? void 0 : _a.titlename;
  }
};
const titles = [
  {
    titlecode: "001",
    titlename: "\u0E14.\u0E0A."
  },
  {
    titlecode: "002",
    titlename: "\u0E14.\u0E0D."
  },
  {
    titlecode: "003",
    titlename: "\u0E19\u0E32\u0E22"
  },
  {
    titlecode: "004",
    titlename: "\u0E19.\u0E2A."
  },
  {
    titlecode: "005",
    titlename: "\u0E19\u0E32\u0E07"
  }
];
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "print",
  __ssrInlineRender: true,
  setup(__props) {
    const patientClaim = reactive(useState("patientClaim"));
    reactive(useState("hospitalState"));
    reactive(useState("personState"));
    reactive(useState("patientInfo"));
    const visitState = reactive(useState("visitState"));
    const qrcode = useQRCode(visitState.value.visitno.toString());
    useRouter();
    const { $dayjs } = useNuxtApp();
    const que = ref(0);
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
    const infoVisit = ref();
    const infoPerson = ref();
    ref();
    return (_ctx, _push, _parent, _attrs) => {
      var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k;
      _push(`<!--[--><div class="relative"><div class="absolute right-2 w-16 text-base">\u0E04\u0E34\u0E27\u0E17\u0E35\u0E48</div><div class="absolute top-10 right-2 h-12 w-10 border-2 border-black text-lg text-center text">${ssrInterpolate(unref(que))}</div></div><div class="flex justify-center"><img${ssrRenderAttr("src", unref(qrcode))} alt="QR Code" width="110"></div><div class="flex justify-center"><h2 class="text-xs text-gray-900 dark:text-white">${ssrInterpolate(unref(hospital).hosname)}</h2></div><div class="flex justify-start mx-2 mt-10"><h2 class="text-sm text-right text-gray-900 dark:text-white"> \u0E2B\u0E21\u0E32\u0E22\u0E40\u0E25\u0E02\u0E1A\u0E31\u0E15\u0E23\u0E1B\u0E23\u0E30\u0E0A\u0E32\u0E0A\u0E19: ${ssrInterpolate((_a = unref(infoPerson)) == null ? void 0 : _a.idcard)}</h2></div><div class="flex justify-start mx-2"><h2 class="text-base text-right text-gray-900 dark:text-white"> \u0E0A\u0E37\u0E48\u0E2D: ${ssrInterpolate(("lookup" in _ctx ? _ctx.lookup : unref(lookup)).title((_b = unref(infoPerson)) == null ? void 0 : _b.prename) + "" + ((_c = unref(infoPerson)) == null ? void 0 : _c.fname) + " " + ((_d = unref(infoPerson)) == null ? void 0 : _d.lname))}</h2></div><div class="flex justify-start mx-2"><h2 class="text-basetext-right text-gray-900 dark:text-white"> HN: ${ssrInterpolate((_e = unref(infoPerson)) == null ? void 0 : _e.pid)}</h2></div><div class="flex justify-start mx-2"><h2 class="text-base text-right text-gray-900 dark:text-white"> \u0E27\u0E31\u0E19\u0E23\u0E31\u0E1A\u0E1A\u0E23\u0E34\u0E01\u0E32\u0E23: ${ssrInterpolate(unref($dayjs)((_f = unref(infoVisit)) == null ? void 0 : _f.visitdate).format("D MMMM BBBB"))}</h2></div><div class="flex justify-start mx-2"><h2 class="text-base text-right text-gray-900 dark:text-white"> \u0E40\u0E27\u0E25\u0E32: ${ssrInterpolate(((_g = unref(infoVisit)) == null ? void 0 : _g.datetime_claim) ? unref($dayjs)((_h = unref(infoVisit)) == null ? void 0 : _h.datetime_claim).format("HH:mm:ss \u0E19.") : ((_i = unref(infoVisit)) == null ? void 0 : _i.timestart) + " \u0E19.")}</h2></div><div class="flex justify-start mx-2"><h2 class="text-base text-right text-gray-900 dark:text-white"> ClaimCode: ${ssrInterpolate(((_j = unref(infoVisit)) == null ? void 0 : _j.claimcode_nhso) ? (_k = unref(infoVisit)) == null ? void 0 : _k.claimcode_nhso : "\u0E22\u0E31\u0E07\u0E44\u0E21\u0E48\u0E44\u0E14\u0E49\u0E02\u0E2D Authen Code")}</h2></div><div class="flex justify-start mx-2"><p class="text-sm text-right tracking-tight text-clip overflow-hidden text-gray-900 dark:text-white"> \u0E2A\u0E34\u0E17\u0E18\u0E34\u0E2B\u0E25\u0E31\u0E01: ${ssrInterpolate(unref(patientClaim) ? unref(patientClaim).mainInscl : null)}</p></div><div class="flex justify-start mx-2"><p class="text-sm text-right tracking-tight text-clip overflow-hidden text-gray-900 dark:text-white"> \u0E2A\u0E34\u0E17\u0E18\u0E34\u0E23\u0E2D\u0E07 ${ssrInterpolate(unref(patientClaim) ? unref(patientClaim).subInscl : null)}</p></div><!--]-->`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/print.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=print-994ca23c.mjs.map
