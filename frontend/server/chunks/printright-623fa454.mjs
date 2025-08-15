import { b as useRouter, u as useState } from './server.mjs';
import { defineComponent, reactive, unref, useSSRContext } from 'vue';
import { ssrInterpolate } from 'vue/server-renderer';
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

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "printright",
  __ssrInlineRender: true,
  setup(__props) {
    useRouter();
    const patientClaim = reactive(useState("patientClaim"));
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[--><div class="flex justify-start mx-2"><h2 class="text-sm text-right text-gray-900"> \u0E2B\u0E21\u0E32\u0E22\u0E40\u0E25\u0E02\u0E1A\u0E31\u0E15\u0E23\u0E1B\u0E23\u0E30\u0E0A\u0E32\u0E0A\u0E19: ${ssrInterpolate(unref(patientClaim).pid)}</h2></div><div class="flex justify-start mx-2"><h2 class="text-base text-right text-gray-900"> \u0E0A\u0E37\u0E48\u0E2D: ${ssrInterpolate(unref(patientClaim).titleName + unref(patientClaim).fname + " " + unref(patientClaim).lname)}</h2></div><div class="flex justify-start mx-2"><h2 class="text-base text-right text-gray-900"> \u0E2D\u0E32\u0E22\u0E38: ${ssrInterpolate(unref(patientClaim).age)}</h2></div><div class="flex justify-start mx-2"><h2 class="text-sm text-right text-gray-900"> \u0E2A\u0E34\u0E17\u0E18\u0E34\u0E2B\u0E25\u0E31\u0E01: ${ssrInterpolate(unref(patientClaim).mainInscl || null)}</h2></div><div class="flex justify-start mx-2"><h2 class="text-sm text-right text-gray-900"> \u0E2A\u0E34\u0E17\u0E18\u0E34\u0E23\u0E2D\u0E07: ${ssrInterpolate(unref(patientClaim).subInscl || null)}</h2></div><!--]-->`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/printright.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=printright-623fa454.mjs.map
