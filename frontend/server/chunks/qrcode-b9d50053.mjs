import { defineComponent, reactive, ref, mergeProps, unref, useSSRContext } from 'vue';
import { u as useState } from './server.mjs';
import { ssrRenderAttrs, ssrRenderAttr } from 'vue/server-renderer';
import { useQRCode } from '@vueuse/integrations/useQRCode';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "qrcode",
  __ssrInlineRender: true,
  setup(__props) {
    var _a;
    const visitState = reactive(useState("visitState"));
    ref("");
    const qrcode = useQRCode((_a = visitState.value.visitno) == null ? void 0 : _a.toString());
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex justify-center mt-5" }, _attrs))}><img${ssrRenderAttr("src", unref(qrcode))} alt="QR Code" width="500"></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/qrcode.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as _ };
//# sourceMappingURL=qrcode-b9d50053.mjs.map
