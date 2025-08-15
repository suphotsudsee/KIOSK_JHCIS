import { p as publicAssetsURL } from './renderer.mjs';
import { u as useState, a as useNuxtApp, b as useRouter, p as parseSize } from './server.mjs';
import { defineComponent, reactive, mergeProps, unref, useSSRContext, ref, computed, h } from 'vue';
import { u as useHead } from './composables-efde4aa1.mjs';
import { ssrRenderAttrs, ssrRenderAttr, ssrInterpolate, ssrRenderComponent } from 'vue/server-renderer';

const useImage = () => {
  return useNuxtApp().$img;
};
const baseImageProps = {
  src: { type: String, required: true },
  format: { type: String, default: void 0 },
  quality: { type: [Number, String], default: void 0 },
  background: { type: String, default: void 0 },
  fit: { type: String, default: void 0 },
  modifiers: { type: Object, default: void 0 },
  preset: { type: String, default: void 0 },
  provider: { type: String, default: void 0 },
  sizes: { type: [Object, String], default: void 0 },
  preload: { type: Boolean, default: void 0 },
  width: { type: [String, Number], default: void 0 },
  height: { type: [String, Number], default: void 0 },
  alt: { type: String, default: void 0 },
  referrerpolicy: { type: String, default: void 0 },
  usemap: { type: String, default: void 0 },
  longdesc: { type: String, default: void 0 },
  ismap: { type: Boolean, default: void 0 },
  loading: { type: String, default: void 0 },
  crossorigin: {
    type: [Boolean, String],
    default: void 0,
    validator: (val) => ["anonymous", "use-credentials", "", true, false].includes(val)
  },
  decoding: {
    type: String,
    default: void 0,
    validator: (val) => ["async", "auto", "sync"].includes(val)
  }
};
const useBaseImage = (props) => {
  const options = computed(() => {
    return {
      provider: props.provider,
      preset: props.preset
    };
  });
  const attrs = computed(() => {
    return {
      width: parseSize(props.width),
      height: parseSize(props.height),
      alt: props.alt,
      referrerpolicy: props.referrerpolicy,
      usemap: props.usemap,
      longdesc: props.longdesc,
      ismap: props.ismap,
      crossorigin: props.crossorigin === true ? "anonymous" : props.crossorigin || void 0,
      loading: props.loading,
      decoding: props.decoding
    };
  });
  const modifiers = computed(() => {
    return {
      ...props.modifiers,
      width: parseSize(props.width),
      height: parseSize(props.height),
      format: props.format,
      quality: props.quality,
      background: props.background,
      fit: props.fit
    };
  });
  return {
    options,
    attrs,
    modifiers
  };
};
const imgProps = {
  ...baseImageProps,
  placeholder: { type: [Boolean, String, Number, Array], default: void 0 }
};
const __nuxt_component_0 = /* @__PURE__ */ defineComponent({
  name: "NuxtImg",
  props: imgProps,
  emits: ["load"],
  setup: (props, ctx) => {
    const $img = useImage();
    const _base = useBaseImage(props);
    const placeholderLoaded = ref(false);
    const sizes = computed(() => $img.getSizes(props.src, {
      ..._base.options.value,
      sizes: props.sizes,
      modifiers: {
        ..._base.modifiers.value,
        width: parseSize(props.width),
        height: parseSize(props.height)
      }
    }));
    const attrs = computed(() => {
      const attrs2 = { ..._base.attrs.value, "data-nuxt-img": "" };
      if (props.sizes) {
        attrs2.sizes = sizes.value.sizes;
        attrs2.srcset = sizes.value.srcset;
      }
      return attrs2;
    });
    const placeholder = computed(() => {
      let placeholder2 = props.placeholder;
      if (placeholder2 === "") {
        placeholder2 = true;
      }
      if (!placeholder2 || placeholderLoaded.value) {
        return false;
      }
      if (typeof placeholder2 === "string") {
        return placeholder2;
      }
      const size = Array.isArray(placeholder2) ? placeholder2 : typeof placeholder2 === "number" ? [placeholder2, placeholder2] : [10, 10];
      return $img(props.src, {
        ..._base.modifiers.value,
        width: size[0],
        height: size[1],
        quality: size[2] || 50
      }, _base.options.value);
    });
    const mainSrc = computed(
      () => props.sizes ? sizes.value.src : $img(props.src, _base.modifiers.value, _base.options.value)
    );
    const src = computed(() => placeholder.value ? placeholder.value : mainSrc.value);
    if (props.preload) {
      const isResponsive = Object.values(sizes.value).every((v) => v);
      useHead({
        link: [{
          rel: "preload",
          as: "image",
          ...!isResponsive ? { href: src.value } : {
            href: sizes.value.src,
            imagesizes: sizes.value.sizes,
            imagesrcset: sizes.value.srcset
          }
        }]
      });
    }
    const imgEl = ref();
    return () => h("img", {
      ref: imgEl,
      key: src.value,
      src: src.value,
      ...attrs.value,
      ...ctx.attrs
    });
  }
});
const _imports_0 = "" + publicAssetsURL("imgs/card_blank.png");
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "cardId",
  __ssrInlineRender: true,
  setup(__props) {
    const patient = reactive(useState("patientInfo"));
    const { $dayjs } = useNuxtApp();
    useRouter();
    const cidFormat = (cid) => {
      if (cid.length === 13) {
        const result1 = cid.substring(0, 1);
        const result2 = cid.substring(5, 1);
        const result3 = cid.substring(10, 5);
        const result4 = cid.substring(12, 10);
        const result5 = cid.substring(13, 12);
        return result1 + " " + result2 + " " + result3 + " " + result4 + " " + result5;
      } else {
        return null;
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_nuxt_img = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex justify-center mt-40" }, _attrs))}><div class="relative"><img${ssrRenderAttr("src", _imports_0)} width="850"><p class="absolute text-4xl top-16 left-96">${ssrInterpolate(cidFormat(unref(patient).cid))}</p><p class="absolute text-4xl top-32 left-96">${ssrInterpolate(unref(patient).prename + unref(patient).fname)}</p><p class="absolute text-4xl top-48 left-96">${ssrInterpolate(unref(patient).lname)}</p><p class="absolute text-4xl top-64 right-40 mt-5">${ssrInterpolate(unref($dayjs)(unref(patient).dob).format("D MMMM BBBB"))}</p><p class="absolute text-3xl bottom-28 left-28">${ssrInterpolate(unref(patient).address.hid + " \u0E2B\u0E21\u0E39\u0E48\u0E17\u0E35\u0E48 " + unref(patient).address.mu + " " + unref(patient).address.subdistrict)}</p><p class="absolute text-3xl bottom-16 left-28">${ssrInterpolate(unref(patient).address.district + " " + unref(patient).address.province)}</p>`);
      _push(ssrRenderComponent(_component_nuxt_img, {
        src: unref(patient).image,
        width: "150",
        class: "absolute text-3xl bottom-8 right-5 rounded-lg"
      }, null, _parent));
      _push(`</div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/cardId.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as _ };
//# sourceMappingURL=cardId-4a2cb6ab.mjs.map
