globalThis._importMeta_=globalThis._importMeta_||{url:"file:///_entry.js",env:process.env};import 'node-fetch-native/polyfill';
import { Server as Server$1 } from 'node:http';
import { Server } from 'node:https';
import destr from 'destr';
import { defineEventHandler, handleCacheHeaders, createEvent, eventHandler, setHeaders, sendRedirect, proxyRequest, getRequestHeader, getRequestHeaders, setResponseHeader, createError, lazyEventHandler, createApp, createRouter as createRouter$1, toNodeListener, fetchWithEvent } from 'h3';
import { createFetch as createFetch$1, Headers } from 'ofetch';
import { createCall, createFetch } from 'unenv/runtime/fetch/index';
import { createHooks } from 'hookable';
import { snakeCase } from 'scule';
import { hash } from 'ohash';
import { parseURL, withoutBase, joinURL, withQuery, withLeadingSlash, withoutTrailingSlash } from 'ufo';
import { createStorage } from 'unstorage';
import defu from 'defu';
import { toRouteMatcher, createRouter } from 'radix3';
import { promises } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'pathe';
import { createIPX, createIPXMiddleware } from 'ipx';

const _runtimeConfig = {"app":{"baseURL":"/","buildAssetsDir":"/_nuxt/","cdnURL":""},"nitro":{"envPrefix":"NUXT_","routeRules":{"/__nuxt_error":{"cache":false},"/_nuxt/**":{"headers":{"cache-control":"public, max-age=2592000, immutable"}}}},"public":{},"ipx":{"dir":"","maxAge":"","domains":[],"sharp":{},"alias":{}}};
const ENV_PREFIX = "NITRO_";
const ENV_PREFIX_ALT = _runtimeConfig.nitro.envPrefix ?? process.env.NITRO_ENV_PREFIX ?? "_";
const getEnv = (key) => {
  const envKey = snakeCase(key).toUpperCase();
  return destr(
    process.env[ENV_PREFIX + envKey] ?? process.env[ENV_PREFIX_ALT + envKey]
  );
};
function isObject(input) {
  return typeof input === "object" && !Array.isArray(input);
}
function overrideConfig(obj, parentKey = "") {
  for (const key in obj) {
    const subKey = parentKey ? `${parentKey}_${key}` : key;
    const envValue = getEnv(subKey);
    if (isObject(obj[key])) {
      if (isObject(envValue)) {
        obj[key] = { ...obj[key], ...envValue };
      }
      overrideConfig(obj[key], subKey);
    } else {
      obj[key] = envValue ?? obj[key];
    }
  }
}
overrideConfig(_runtimeConfig);
const config$1 = deepFreeze(_runtimeConfig);
const useRuntimeConfig = () => config$1;
function deepFreeze(object) {
  const propNames = Object.getOwnPropertyNames(object);
  for (const name of propNames) {
    const value = object[name];
    if (value && typeof value === "object") {
      deepFreeze(value);
    }
  }
  return Object.freeze(object);
}

const _assets = {

};

function normalizeKey(key) {
  if (!key) {
    return "";
  }
  return key.split("?")[0].replace(/[/\\]/g, ":").replace(/:+/g, ":").replace(/^:|:$/g, "");
}

const assets$1 = {
  getKeys() {
    return Promise.resolve(Object.keys(_assets))
  },
  hasItem (id) {
    id = normalizeKey(id);
    return Promise.resolve(id in _assets)
  },
  getItem (id) {
    id = normalizeKey(id);
    return Promise.resolve(_assets[id] ? _assets[id].import() : null)
  },
  getMeta (id) {
    id = normalizeKey(id);
    return Promise.resolve(_assets[id] ? _assets[id].meta : {})
  }
};

const storage = createStorage({});

const useStorage = () => storage;

storage.mount('/assets', assets$1);

const defaultCacheOptions = {
  name: "_",
  base: "/cache",
  swr: true,
  maxAge: 1
};
function defineCachedFunction(fn, opts) {
  opts = { ...defaultCacheOptions, ...opts };
  const pending = {};
  const group = opts.group || "nitro";
  const name = opts.name || fn.name || "_";
  const integrity = hash([opts.integrity, fn, opts]);
  const validate = opts.validate || (() => true);
  async function get(key, resolver, shouldInvalidateCache) {
    const cacheKey = [opts.base, group, name, key + ".json"].filter(Boolean).join(":").replace(/:\/$/, ":index");
    const entry = await useStorage().getItem(cacheKey) || {};
    const ttl = (opts.maxAge ?? opts.maxAge ?? 0) * 1e3;
    if (ttl) {
      entry.expires = Date.now() + ttl;
    }
    const expired = shouldInvalidateCache || entry.integrity !== integrity || ttl && Date.now() - (entry.mtime || 0) > ttl || !validate(entry);
    const _resolve = async () => {
      const isPending = pending[key];
      if (!isPending) {
        if (entry.value !== void 0 && (opts.staleMaxAge || 0) >= 0) {
          entry.value = void 0;
          entry.integrity = void 0;
          entry.mtime = void 0;
          entry.expires = void 0;
        }
        pending[key] = Promise.resolve(resolver());
      }
      entry.value = await pending[key];
      if (!isPending) {
        entry.mtime = Date.now();
        entry.integrity = integrity;
        delete pending[key];
        if (validate(entry)) {
          useStorage().setItem(cacheKey, entry).catch((error) => console.error("[nitro] [cache]", error));
        }
      }
    };
    const _resolvePromise = expired ? _resolve() : Promise.resolve();
    if (opts.swr && entry.value) {
      _resolvePromise.catch(console.error);
      return entry;
    }
    return _resolvePromise.then(() => entry);
  }
  return async (...args) => {
    const shouldBypassCache = opts.shouldBypassCache?.(...args);
    if (shouldBypassCache) {
      return fn(...args);
    }
    const key = await (opts.getKey || getKey)(...args);
    const shouldInvalidateCache = opts.shouldInvalidateCache?.(...args);
    const entry = await get(key, () => fn(...args), shouldInvalidateCache);
    let value = entry.value;
    if (opts.transform) {
      value = await opts.transform(entry, ...args) || value;
    }
    return value;
  };
}
const cachedFunction = defineCachedFunction;
function getKey(...args) {
  return args.length > 0 ? hash(args, {}) : "";
}
function escapeKey(key) {
  return key.replace(/[^\dA-Za-z]/g, "");
}
function defineCachedEventHandler(handler, opts = defaultCacheOptions) {
  const _opts = {
    ...opts,
    getKey: async (event) => {
      const key = await opts.getKey?.(event);
      if (key) {
        return escapeKey(key);
      }
      const url = event.node.req.originalUrl || event.node.req.url;
      const friendlyName = escapeKey(decodeURI(parseURL(url).pathname)).slice(
        0,
        16
      );
      const urlHash = hash(url);
      return `${friendlyName}.${urlHash}`;
    },
    validate: (entry) => {
      if (entry.value.code >= 400) {
        return false;
      }
      if (entry.value.body === void 0) {
        return false;
      }
      return true;
    },
    group: opts.group || "nitro/handlers",
    integrity: [opts.integrity, handler]
  };
  const _cachedHandler = cachedFunction(
    async (incomingEvent) => {
      const reqProxy = cloneWithProxy(incomingEvent.node.req, { headers: {} });
      const resHeaders = {};
      let _resSendBody;
      const resProxy = cloneWithProxy(incomingEvent.node.res, {
        statusCode: 200,
        getHeader(name) {
          return resHeaders[name];
        },
        setHeader(name, value) {
          resHeaders[name] = value;
          return this;
        },
        getHeaderNames() {
          return Object.keys(resHeaders);
        },
        hasHeader(name) {
          return name in resHeaders;
        },
        removeHeader(name) {
          delete resHeaders[name];
        },
        getHeaders() {
          return resHeaders;
        },
        end(chunk, arg2, arg3) {
          if (typeof chunk === "string") {
            _resSendBody = chunk;
          }
          if (typeof arg2 === "function") {
            arg2();
          }
          if (typeof arg3 === "function") {
            arg3();
          }
          return this;
        },
        write(chunk, arg2, arg3) {
          if (typeof chunk === "string") {
            _resSendBody = chunk;
          }
          if (typeof arg2 === "function") {
            arg2();
          }
          if (typeof arg3 === "function") {
            arg3();
          }
          return this;
        },
        writeHead(statusCode, headers2) {
          this.statusCode = statusCode;
          if (headers2) {
            for (const header in headers2) {
              this.setHeader(header, headers2[header]);
            }
          }
          return this;
        }
      });
      const event = createEvent(reqProxy, resProxy);
      event.context = incomingEvent.context;
      const body = await handler(event) || _resSendBody;
      const headers = event.node.res.getHeaders();
      headers.etag = headers.Etag || headers.etag || `W/"${hash(body)}"`;
      headers["last-modified"] = headers["Last-Modified"] || headers["last-modified"] || (/* @__PURE__ */ new Date()).toUTCString();
      const cacheControl = [];
      if (opts.swr) {
        if (opts.maxAge) {
          cacheControl.push(`s-maxage=${opts.maxAge}`);
        }
        if (opts.staleMaxAge) {
          cacheControl.push(`stale-while-revalidate=${opts.staleMaxAge}`);
        } else {
          cacheControl.push("stale-while-revalidate");
        }
      } else if (opts.maxAge) {
        cacheControl.push(`max-age=${opts.maxAge}`);
      }
      if (cacheControl.length > 0) {
        headers["cache-control"] = cacheControl.join(", ");
      }
      const cacheEntry = {
        code: event.node.res.statusCode,
        headers,
        body
      };
      return cacheEntry;
    },
    _opts
  );
  return defineEventHandler(async (event) => {
    if (opts.headersOnly) {
      if (handleCacheHeaders(event, { maxAge: opts.maxAge })) {
        return;
      }
      return handler(event);
    }
    const response = await _cachedHandler(event);
    if (event.node.res.headersSent || event.node.res.writableEnded) {
      return response.body;
    }
    if (handleCacheHeaders(event, {
      modifiedTime: new Date(response.headers["last-modified"]),
      etag: response.headers.etag,
      maxAge: opts.maxAge
    })) {
      return;
    }
    event.node.res.statusCode = response.code;
    for (const name in response.headers) {
      event.node.res.setHeader(name, response.headers[name]);
    }
    return response.body;
  });
}
function cloneWithProxy(obj, overrides) {
  return new Proxy(obj, {
    get(target, property, receiver) {
      if (property in overrides) {
        return overrides[property];
      }
      return Reflect.get(target, property, receiver);
    },
    set(target, property, value, receiver) {
      if (property in overrides) {
        overrides[property] = value;
        return true;
      }
      return Reflect.set(target, property, value, receiver);
    }
  });
}
const cachedEventHandler = defineCachedEventHandler;

const config = useRuntimeConfig();
const _routeRulesMatcher = toRouteMatcher(
  createRouter({ routes: config.nitro.routeRules })
);
function createRouteRulesHandler() {
  return eventHandler((event) => {
    const routeRules = getRouteRules(event);
    if (routeRules.headers) {
      setHeaders(event, routeRules.headers);
    }
    if (routeRules.redirect) {
      return sendRedirect(
        event,
        routeRules.redirect.to,
        routeRules.redirect.statusCode
      );
    }
    if (routeRules.proxy) {
      let target = routeRules.proxy.to;
      if (target.endsWith("/**")) {
        let targetPath = event.path;
        const strpBase = routeRules.proxy._proxyStripBase;
        if (strpBase) {
          targetPath = withoutBase(targetPath, strpBase);
        }
        target = joinURL(target.slice(0, -3), targetPath);
      }
      return proxyRequest(event, target, {
        fetch: $fetch.raw,
        ...routeRules.proxy
      });
    }
  });
}
function getRouteRules(event) {
  event.context._nitro = event.context._nitro || {};
  if (!event.context._nitro.routeRules) {
    const path = new URL(event.node.req.url, "http://localhost").pathname;
    event.context._nitro.routeRules = getRouteRulesForPath(
      withoutBase(path, useRuntimeConfig().app.baseURL)
    );
  }
  return event.context._nitro.routeRules;
}
function getRouteRulesForPath(path) {
  return defu({}, ..._routeRulesMatcher.matchAll(path).reverse());
}

const plugins = [
  
];

function hasReqHeader(event, name, includes) {
  const value = getRequestHeader(event, name);
  return value && typeof value === "string" && value.toLowerCase().includes(includes);
}
function isJsonRequest(event) {
  return hasReqHeader(event, "accept", "application/json") || hasReqHeader(event, "user-agent", "curl/") || hasReqHeader(event, "user-agent", "httpie/") || hasReqHeader(event, "sec-fetch-mode", "cors") || event.path.startsWith("/api/") || event.path.endsWith(".json");
}
function normalizeError(error) {
  const cwd = typeof process.cwd === "function" ? process.cwd() : "/";
  const stack = (error.stack || "").split("\n").splice(1).filter((line) => line.includes("at ")).map((line) => {
    const text = line.replace(cwd + "/", "./").replace("webpack:/", "").replace("file://", "").trim();
    return {
      text,
      internal: line.includes("node_modules") && !line.includes(".cache") || line.includes("internal") || line.includes("new Promise")
    };
  });
  const statusCode = error.statusCode || 500;
  const statusMessage = error.statusMessage ?? (statusCode === 404 ? "Not Found" : "");
  const message = error.message || error.toString();
  return {
    stack,
    statusCode,
    statusMessage,
    message
  };
}

const errorHandler = (async function errorhandler(error, event) {
  const { stack, statusCode, statusMessage, message } = normalizeError(error);
  const errorObject = {
    url: event.node.req.url,
    statusCode,
    statusMessage,
    message,
    stack: "",
    data: error.data
  };
  event.node.res.statusCode = errorObject.statusCode !== 200 && errorObject.statusCode || 500;
  if (errorObject.statusMessage) {
    event.node.res.statusMessage = errorObject.statusMessage;
  }
  if (error.unhandled || error.fatal) {
    const tags = [
      "[nuxt]",
      "[request error]",
      error.unhandled && "[unhandled]",
      error.fatal && "[fatal]",
      Number(errorObject.statusCode) !== 200 && `[${errorObject.statusCode}]`
    ].filter(Boolean).join(" ");
    console.error(tags, errorObject.message + "\n" + stack.map((l) => "  " + l.text).join("  \n"));
  }
  if (isJsonRequest(event)) {
    event.node.res.setHeader("Content-Type", "application/json");
    event.node.res.end(JSON.stringify(errorObject));
    return;
  }
  const isErrorPage = event.node.req.url?.startsWith("/__nuxt_error");
  const res = !isErrorPage ? await useNitroApp().localFetch(withQuery(joinURL(useRuntimeConfig().app.baseURL, "/__nuxt_error"), errorObject), {
    headers: getRequestHeaders(event),
    redirect: "manual"
  }).catch(() => null) : null;
  if (!res) {
    const { template } = await import('./error-500.mjs');
    event.node.res.setHeader("Content-Type", "text/html;charset=UTF-8");
    event.node.res.end(template(errorObject));
    return;
  }
  for (const [header, value] of res.headers.entries()) {
    setResponseHeader(event, header, value);
  }
  if (res.status && res.status !== 200) {
    event.node.res.statusCode = res.status;
  }
  if (res.statusText) {
    event.node.res.statusMessage = res.statusText;
  }
  event.node.res.end(await res.text());
});

const assets = {
  "/favicon.ico": {
    "type": "image/vnd.microsoft.icon",
    "etag": "\"10be-n8egyE9tcb7sKGr/pYCaQ4uWqxI\"",
    "mtime": "2023-02-28T16:04:07.000Z",
    "size": 4286,
    "path": "../public/favicon.ico"
  },
  "/pwa-192x192.png": {
    "type": "image/png",
    "etag": "\"17c5-1VhRCBiI3udb9xNrMtqlRolmZrA\"",
    "mtime": "2023-03-16T06:25:58.234Z",
    "size": 6085,
    "path": "../public/pwa-192x192.png"
  },
  "/pwa-512x512.png": {
    "type": "image/png",
    "etag": "\"3b5f-amajeh9gKxJnggElTM2lmlJoSIM\"",
    "mtime": "2023-03-16T06:26:26.363Z",
    "size": 15199,
    "path": "../public/pwa-512x512.png"
  },
  "/css/nuxt-google-fonts.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"535-XgQWYyO2DZVMa8XljGfbWgc4VOE\"",
    "mtime": "2024-10-15T14:24:45.579Z",
    "size": 1333,
    "path": "../public/css/nuxt-google-fonts.css"
  },
  "/fonts/Kanit-400-1.woff2": {
    "type": "font/woff2",
    "etag": "\"33cc-5gFvS1PqQrp+olrSF/RMTt0w75M\"",
    "mtime": "2024-10-15T14:24:45.545Z",
    "size": 13260,
    "path": "../public/fonts/Kanit-400-1.woff2"
  },
  "/fonts/Kanit-400-2.woff2": {
    "type": "font/woff2",
    "etag": "\"298c-CMBBRvFDsuVux4BZQ4o2Dwjg+5E\"",
    "mtime": "2024-10-15T14:24:45.537Z",
    "size": 10636,
    "path": "../public/fonts/Kanit-400-2.woff2"
  },
  "/fonts/Kanit-400-3.woff2": {
    "type": "font/woff2",
    "etag": "\"4d2c-9kYjXKYLBWfRoxth7Zop/nWPoAo\"",
    "mtime": "2024-10-15T14:24:45.552Z",
    "size": 19756,
    "path": "../public/fonts/Kanit-400-3.woff2"
  },
  "/fonts/Kanit-400-4.woff2": {
    "type": "font/woff2",
    "etag": "\"4bbc-Lp4sgLxapfAfdc1Ia6oXafU96l4\"",
    "mtime": "2024-10-15T14:24:45.576Z",
    "size": 19388,
    "path": "../public/fonts/Kanit-400-4.woff2"
  },
  "/imgs/card_blank.png": {
    "type": "image/png",
    "etag": "\"29b62-eq7jHerXXYpiLZJFaNqTO6kkZSA\"",
    "mtime": "2023-03-09T10:04:34.894Z",
    "size": 170850,
    "path": "../public/imgs/card_blank.png"
  },
  "/imgs/dla.png": {
    "type": "image/png",
    "etag": "\"154763-1384iDLa1o/ysa8iENmCdvJ99f0\"",
    "mtime": "2023-08-07T05:17:53.614Z",
    "size": 1394531,
    "path": "../public/imgs/dla.png"
  },
  "/imgs/logo-pwa.png": {
    "type": "image/png",
    "etag": "\"3a01-FC1eKAmw1VQvY9y6ryNpzIMNeHY\"",
    "mtime": "2023-03-16T06:21:11.030Z",
    "size": 14849,
    "path": "../public/imgs/logo-pwa.png"
  },
  "/imgs/Public_Health.png": {
    "type": "image/png",
    "etag": "\"5483f-8igD8kiAAiKjE1jO+pGaH6lTsv8\"",
    "mtime": "2023-08-07T05:17:53.600Z",
    "size": 346175,
    "path": "../public/imgs/Public_Health.png"
  },
  "/imgs/sri-dao.png": {
    "type": "image/png",
    "etag": "\"4116-aj4W6N9nQkmOW/gZ839Aj+Hx7wU\"",
    "mtime": "2023-08-07T05:17:53.617Z",
    "size": 16662,
    "path": "../public/imgs/sri-dao.png"
  },
  "/_nuxt/boxs.300e4f17.png": {
    "type": "image/png",
    "etag": "\"3ddc-eS3PVcMxys+2ZYrw/ibkaWacF9U\"",
    "mtime": "2024-10-15T14:24:59.465Z",
    "size": 15836,
    "path": "../public/_nuxt/boxs.300e4f17.png"
  },
  "/_nuxt/card1.9fc0b216.jpg": {
    "type": "image/jpeg",
    "etag": "\"d648-d67YuX+RiQUPYnxU5eQtlBlE9i8\"",
    "mtime": "2024-10-15T14:24:59.466Z",
    "size": 54856,
    "path": "../public/_nuxt/card1.9fc0b216.jpg"
  },
  "/_nuxt/cardId.vue.df2be853.js": {
    "type": "application/javascript",
    "etag": "\"fac-VMA697KoKsTCFmWYYRv56o7vYtQ\"",
    "mtime": "2024-10-15T14:24:59.480Z",
    "size": 4012,
    "path": "../public/_nuxt/cardId.vue.df2be853.js"
  },
  "/_nuxt/claimtype.15abfba3.js": {
    "type": "application/javascript",
    "etag": "\"1967-1FemSzpw4x6RbyddeF03dHZW5yo\"",
    "mtime": "2024-10-15T14:24:59.480Z",
    "size": 6503,
    "path": "../public/_nuxt/claimtype.15abfba3.js"
  },
  "/_nuxt/composables.002676a1.js": {
    "type": "application/javascript",
    "etag": "\"61-aTjLdcNzjd72SWlFfTyYTahkxbA\"",
    "mtime": "2024-10-15T14:24:59.481Z",
    "size": 97,
    "path": "../public/_nuxt/composables.002676a1.js"
  },
  "/_nuxt/default.9c6828dc.js": {
    "type": "application/javascript",
    "etag": "\"129-EheRjtPrkg6EiJDWCF3JsCN+FyM\"",
    "mtime": "2024-10-15T14:24:59.483Z",
    "size": 297,
    "path": "../public/_nuxt/default.9c6828dc.js"
  },
  "/_nuxt/default.e03e203b.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"2a-AERqkPMmyMoqOmPDC+hGdnN7V6I\"",
    "mtime": "2024-10-15T14:24:59.467Z",
    "size": 42,
    "path": "../public/_nuxt/default.e03e203b.css"
  },
  "/_nuxt/entry.101c387c.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"693a-TdUE3beDQNbk/EMkyGZCGvsS/q8\"",
    "mtime": "2024-10-15T14:24:59.467Z",
    "size": 26938,
    "path": "../public/_nuxt/entry.101c387c.css"
  },
  "/_nuxt/entry.d3560666.js": {
    "type": "application/javascript",
    "etag": "\"26694-lVzefyEBfgvK1ctUqqSHaB8EY68\"",
    "mtime": "2024-10-15T14:24:59.488Z",
    "size": 157332,
    "path": "../public/_nuxt/entry.d3560666.js"
  },
  "/_nuxt/error-404.679e72b2.js": {
    "type": "application/javascript",
    "etag": "\"8f9-U3n5rwlpnijoXSaQlfN/kJJaMt0\"",
    "mtime": "2024-10-15T14:24:59.468Z",
    "size": 2297,
    "path": "../public/_nuxt/error-404.679e72b2.js"
  },
  "/_nuxt/error-404.8bdbaeb8.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"e70-jl7r/kE1FF0H+CLPNh+07RJXuFI\"",
    "mtime": "2024-10-15T14:24:59.466Z",
    "size": 3696,
    "path": "../public/_nuxt/error-404.8bdbaeb8.css"
  },
  "/_nuxt/error-500.80cc239a.js": {
    "type": "application/javascript",
    "etag": "\"77d-KB5RTz909YOPhGDTVwBKcv8Y75k\"",
    "mtime": "2024-10-15T14:24:59.480Z",
    "size": 1917,
    "path": "../public/_nuxt/error-500.80cc239a.js"
  },
  "/_nuxt/error-500.b63a96f5.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"7e0-loEWA9n4Kq4UMBzJyT6hY9SSl00\"",
    "mtime": "2024-10-15T14:24:59.467Z",
    "size": 2016,
    "path": "../public/_nuxt/error-500.b63a96f5.css"
  },
  "/_nuxt/error-component.1bbbba91.js": {
    "type": "application/javascript",
    "etag": "\"4b0-h27nbYKhme/kdP8HtgieMw/JJPo\"",
    "mtime": "2024-10-15T14:24:59.467Z",
    "size": 1200,
    "path": "../public/_nuxt/error-component.1bbbba91.js"
  },
  "/_nuxt/fetch.66222654.js": {
    "type": "application/javascript",
    "etag": "\"2bcc-jC9byFxRVOeQoIieGeJydSNSyJk\"",
    "mtime": "2024-10-15T14:24:59.481Z",
    "size": 11212,
    "path": "../public/_nuxt/fetch.66222654.js"
  },
  "/_nuxt/index.11ffdbe8.js": {
    "type": "application/javascript",
    "etag": "\"3723-49c/cfpHzjKLayL8V837UzGOOSM\"",
    "mtime": "2024-10-15T14:24:59.485Z",
    "size": 14115,
    "path": "../public/_nuxt/index.11ffdbe8.js"
  },
  "/_nuxt/index.33dcb834.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"198-CsrEsVPc1QmJGi9myfKk9h9eEn8\"",
    "mtime": "2024-10-15T14:24:59.467Z",
    "size": 408,
    "path": "../public/_nuxt/index.33dcb834.css"
  },
  "/_nuxt/Kanit-400-1.d03834de.woff2": {
    "type": "font/woff2",
    "etag": "\"33cc-5gFvS1PqQrp+olrSF/RMTt0w75M\"",
    "mtime": "2024-10-15T14:24:59.458Z",
    "size": 13260,
    "path": "../public/_nuxt/Kanit-400-1.d03834de.woff2"
  },
  "/_nuxt/Kanit-400-2.f6f5d378.woff2": {
    "type": "font/woff2",
    "etag": "\"298c-CMBBRvFDsuVux4BZQ4o2Dwjg+5E\"",
    "mtime": "2024-10-15T14:24:59.465Z",
    "size": 10636,
    "path": "../public/_nuxt/Kanit-400-2.f6f5d378.woff2"
  },
  "/_nuxt/Kanit-400-3.27dc380c.woff2": {
    "type": "font/woff2",
    "etag": "\"4d2c-9kYjXKYLBWfRoxth7Zop/nWPoAo\"",
    "mtime": "2024-10-15T14:24:59.465Z",
    "size": 19756,
    "path": "../public/_nuxt/Kanit-400-3.27dc380c.woff2"
  },
  "/_nuxt/Kanit-400-4.ae7b918e.woff2": {
    "type": "font/woff2",
    "etag": "\"4bbc-Lp4sgLxapfAfdc1Ia6oXafU96l4\"",
    "mtime": "2024-10-15T14:24:59.465Z",
    "size": 19388,
    "path": "../public/_nuxt/Kanit-400-4.ae7b918e.woff2"
  },
  "/_nuxt/mobile.518f5a43.js": {
    "type": "application/javascript",
    "etag": "\"23f2-rCB5KZkt6S3/vUhYlKmke4r6mkk\"",
    "mtime": "2024-10-15T14:24:59.480Z",
    "size": 9202,
    "path": "../public/_nuxt/mobile.518f5a43.js"
  },
  "/_nuxt/nav.vue.0f5d62e9.js": {
    "type": "application/javascript",
    "etag": "\"6cd-ibk9GpVHYmqUKIRNna3gH0DTxd8\"",
    "mtime": "2024-10-15T14:24:59.481Z",
    "size": 1741,
    "path": "../public/_nuxt/nav.vue.0f5d62e9.js"
  },
  "/_nuxt/nuxt-link.fdbe223f.js": {
    "type": "application/javascript",
    "etag": "\"f3d-MfZtWo0ONOW9V80AAQQkucnfa50\"",
    "mtime": "2024-10-15T14:24:59.485Z",
    "size": 3901,
    "path": "../public/_nuxt/nuxt-link.fdbe223f.js"
  },
  "/_nuxt/print.be7f8447.js": {
    "type": "application/javascript",
    "etag": "\"cd-exavBUHe4z6xeYVAxKQD9N1fvME\"",
    "mtime": "2024-10-15T14:24:59.481Z",
    "size": 205,
    "path": "../public/_nuxt/print.be7f8447.js"
  },
  "/_nuxt/print.d830f61d.js": {
    "type": "application/javascript",
    "etag": "\"eef-ElQiS6GbTuMgVdQoC3Cqq9EHtDo\"",
    "mtime": "2024-10-15T14:24:59.467Z",
    "size": 3823,
    "path": "../public/_nuxt/print.d830f61d.js"
  },
  "/_nuxt/print.e8c0d8f1.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"44-n8TP3XX+adXRj3zOJ6pPmRtcVjA\"",
    "mtime": "2024-10-15T14:24:59.466Z",
    "size": 68,
    "path": "../public/_nuxt/print.e8c0d8f1.css"
  },
  "/_nuxt/printright.6e878e0f.js": {
    "type": "application/javascript",
    "etag": "\"460-ZHBWQa61UMLKBDmFr+HvACBRpDo\"",
    "mtime": "2024-10-15T14:24:59.485Z",
    "size": 1120,
    "path": "../public/_nuxt/printright.6e878e0f.js"
  },
  "/_nuxt/qrcode.ebb5e7d1.js": {
    "type": "application/javascript",
    "etag": "\"daa-DpKYC6cxemNNNldML/7ZXh9Drto\"",
    "mtime": "2024-10-15T14:24:59.480Z",
    "size": 3498,
    "path": "../public/_nuxt/qrcode.ebb5e7d1.js"
  },
  "/_nuxt/qrcode.vue.11e42e8c.js": {
    "type": "application/javascript",
    "etag": "\"24c-R2HrQzHDT5KAYWdIsJpyMCHVvu4\"",
    "mtime": "2024-10-15T14:24:59.467Z",
    "size": 588,
    "path": "../public/_nuxt/qrcode.vue.11e42e8c.js"
  },
  "/_nuxt/right.4cec1018.js": {
    "type": "application/javascript",
    "etag": "\"ab6-Bu7WgzxX56HkPxsIblUbfXi9rn4\"",
    "mtime": "2024-10-15T14:24:59.469Z",
    "size": 2742,
    "path": "../public/_nuxt/right.4cec1018.js"
  },
  "/_nuxt/search_person.3ee5d6b1.js": {
    "type": "application/javascript",
    "etag": "\"26fd-54lViPHNiAxikZmboQAt5YTPhvM\"",
    "mtime": "2024-10-15T14:24:59.467Z",
    "size": 9981,
    "path": "../public/_nuxt/search_person.3ee5d6b1.js"
  },
  "/_nuxt/setting.88334f4e.js": {
    "type": "application/javascript",
    "etag": "\"d5b-UnoUsmT9+kYlnYTk1O3ziBNtM+E\"",
    "mtime": "2024-10-15T14:24:59.480Z",
    "size": 3419,
    "path": "../public/_nuxt/setting.88334f4e.js"
  },
  "/_nuxt/sweetalert2.all.30a4a880.js": {
    "type": "application/javascript",
    "etag": "\"fbd6-OTOcOANNd+jk7Rsi+u9feDUyeJE\"",
    "mtime": "2024-10-15T14:24:59.487Z",
    "size": 64470,
    "path": "../public/_nuxt/sweetalert2.all.30a4a880.js"
  },
  "/_nuxt/useNhso.fcac39c9.js": {
    "type": "application/javascript",
    "etag": "\"320-TUusrLNBseREg8cBgG2D38LhatM\"",
    "mtime": "2024-10-15T14:24:59.480Z",
    "size": 800,
    "path": "../public/_nuxt/useNhso.fcac39c9.js"
  },
  "/_nuxt/usePatient.fcdb521f.js": {
    "type": "application/javascript",
    "etag": "\"389-cr141JgY6ilBqWFhhgJhDjaDdLI\"",
    "mtime": "2024-10-15T14:24:59.479Z",
    "size": 905,
    "path": "../public/_nuxt/usePatient.fcdb521f.js"
  },
  "/_nuxt/useQRCode.e00aa3fb.js": {
    "type": "application/javascript",
    "etag": "\"6213-7pwaTf7an5y5+yL/mGIrVOGR2HY\"",
    "mtime": "2024-10-15T14:24:59.486Z",
    "size": 25107,
    "path": "../public/_nuxt/useQRCode.e00aa3fb.js"
  },
  "/_nuxt/useTitle.0e1ff419.js": {
    "type": "application/javascript",
    "etag": "\"121-8qJoz4TrN6n+saN0OlEg6sn5nBw\"",
    "mtime": "2024-10-15T14:24:59.468Z",
    "size": 289,
    "path": "../public/_nuxt/useTitle.0e1ff419.js"
  },
  "/_nuxt/useVisit.fb02c9a9.js": {
    "type": "application/javascript",
    "etag": "\"304-58Qhou3gWIhPqB3O+15NIyHDMck\"",
    "mtime": "2024-10-15T14:24:59.472Z",
    "size": 772,
    "path": "../public/_nuxt/useVisit.fb02c9a9.js"
  },
  "/_nuxt/visit.0efaea87.js": {
    "type": "application/javascript",
    "etag": "\"c9f-Wfynjped0wiKajLvWRkzwVaqG4s\"",
    "mtime": "2024-10-15T14:24:59.467Z",
    "size": 3231,
    "path": "../public/_nuxt/visit.0efaea87.js"
  },
  "/_nuxt/_...cid_.c97e839e.js": {
    "type": "application/javascript",
    "etag": "\"11a3-bpDZ/RlJP/VyKfUa0uzrQ+wMiRo\"",
    "mtime": "2024-10-15T14:24:59.480Z",
    "size": 4515,
    "path": "../public/_nuxt/_...cid_.c97e839e.js"
  }
};

function readAsset (id) {
  const serverDir = dirname(fileURLToPath(globalThis._importMeta_.url));
  return promises.readFile(resolve(serverDir, assets[id].path))
}

const publicAssetBases = {"/_nuxt":{"maxAge":2592000}};

function isPublicAssetURL(id = '') {
  if (assets[id]) {
    return true
  }
  for (const base in publicAssetBases) {
    if (id.startsWith(base)) { return true }
  }
  return false
}

function getAsset (id) {
  return assets[id]
}

const METHODS = /* @__PURE__ */ new Set(["HEAD", "GET"]);
const EncodingMap = { gzip: ".gz", br: ".br" };
const _f4b49z = eventHandler((event) => {
  if (event.node.req.method && !METHODS.has(event.node.req.method)) {
    return;
  }
  let id = decodeURIComponent(
    withLeadingSlash(
      withoutTrailingSlash(parseURL(event.node.req.url).pathname)
    )
  );
  let asset;
  const encodingHeader = String(
    event.node.req.headers["accept-encoding"] || ""
  );
  const encodings = [
    ...encodingHeader.split(",").map((e) => EncodingMap[e.trim()]).filter(Boolean).sort(),
    ""
  ];
  if (encodings.length > 1) {
    event.node.res.setHeader("Vary", "Accept-Encoding");
  }
  for (const encoding of encodings) {
    for (const _id of [id + encoding, joinURL(id, "index.html" + encoding)]) {
      const _asset = getAsset(_id);
      if (_asset) {
        asset = _asset;
        id = _id;
        break;
      }
    }
  }
  if (!asset) {
    if (isPublicAssetURL(id)) {
      event.node.res.removeHeader("cache-control");
      throw createError({
        statusMessage: "Cannot find static asset " + id,
        statusCode: 404
      });
    }
    return;
  }
  const ifNotMatch = event.node.req.headers["if-none-match"] === asset.etag;
  if (ifNotMatch) {
    event.node.res.statusCode = 304;
    event.node.res.end();
    return;
  }
  const ifModifiedSinceH = event.node.req.headers["if-modified-since"];
  if (ifModifiedSinceH && asset.mtime && new Date(ifModifiedSinceH) >= new Date(asset.mtime)) {
    event.node.res.statusCode = 304;
    event.node.res.end();
    return;
  }
  if (asset.type && !event.node.res.getHeader("Content-Type")) {
    event.node.res.setHeader("Content-Type", asset.type);
  }
  if (asset.etag && !event.node.res.getHeader("ETag")) {
    event.node.res.setHeader("ETag", asset.etag);
  }
  if (asset.mtime && !event.node.res.getHeader("Last-Modified")) {
    event.node.res.setHeader("Last-Modified", asset.mtime);
  }
  if (asset.encoding && !event.node.res.getHeader("Content-Encoding")) {
    event.node.res.setHeader("Content-Encoding", asset.encoding);
  }
  if (asset.size > 0 && !event.node.res.getHeader("Content-Length")) {
    event.node.res.setHeader("Content-Length", asset.size);
  }
  return readAsset(id);
});

const _jl6LCu = lazyEventHandler(() => {
  const ipxOptions = {
    ...useRuntimeConfig().ipx || {},
    dir: fileURLToPath(new URL("../public", globalThis._importMeta_.url))
  };
  const ipx = createIPX(ipxOptions);
  const middleware = createIPXMiddleware(ipx);
  return eventHandler(async (event) => {
    event.req.url = withLeadingSlash(event.context.params._);
    await middleware(event.req, event.res);
  });
});

const _lazy_8EEEYr = () => import('./renderer.mjs').then(function (n) { return n.r; });

const handlers = [
  { route: '', handler: _f4b49z, lazy: false, middleware: true, method: undefined },
  { route: '/__nuxt_error', handler: _lazy_8EEEYr, lazy: true, middleware: false, method: undefined },
  { route: '/_ipx/**', handler: _jl6LCu, lazy: false, middleware: false, method: undefined },
  { route: '/**', handler: _lazy_8EEEYr, lazy: true, middleware: false, method: undefined }
];

function createNitroApp() {
  const config = useRuntimeConfig();
  const hooks = createHooks();
  const h3App = createApp({
    debug: destr(false),
    onError: errorHandler
  });
  const router = createRouter$1();
  h3App.use(createRouteRulesHandler());
  const localCall = createCall(toNodeListener(h3App));
  const localFetch = createFetch(localCall, globalThis.fetch);
  const $fetch = createFetch$1({
    fetch: localFetch,
    Headers,
    defaults: { baseURL: config.app.baseURL }
  });
  globalThis.$fetch = $fetch;
  h3App.use(
    eventHandler((event) => {
      const envContext = event.node.req.__unenv__;
      if (envContext) {
        Object.assign(event.context, envContext);
      }
      event.fetch = (req, init) => fetchWithEvent(event, req, init, { fetch: localFetch });
      event.$fetch = (req, init) => fetchWithEvent(event, req, init, { fetch: $fetch });
    })
  );
  for (const h of handlers) {
    let handler = h.lazy ? lazyEventHandler(h.handler) : h.handler;
    if (h.middleware || !h.route) {
      const middlewareBase = (config.app.baseURL + (h.route || "/")).replace(
        /\/+/g,
        "/"
      );
      h3App.use(middlewareBase, handler);
    } else {
      const routeRules = getRouteRulesForPath(
        h.route.replace(/:\w+|\*\*/g, "_")
      );
      if (routeRules.cache) {
        handler = cachedEventHandler(handler, {
          group: "nitro/routes",
          ...routeRules.cache
        });
      }
      router.use(h.route, handler, h.method);
    }
  }
  h3App.use(config.app.baseURL, router);
  const app = {
    hooks,
    h3App,
    router,
    localCall,
    localFetch
  };
  for (const plugin of plugins) {
    plugin(app);
  }
  return app;
}
const nitroApp = createNitroApp();
const useNitroApp = () => nitroApp;

const cert = process.env.NITRO_SSL_CERT;
const key = process.env.NITRO_SSL_KEY;
const server = cert && key ? new Server({ key, cert }, toNodeListener(nitroApp.h3App)) : new Server$1(toNodeListener(nitroApp.h3App));
const port = destr(process.env.NITRO_PORT || process.env.PORT) || 3e3;
const host = process.env.NITRO_HOST || process.env.HOST;
const s = server.listen(port, host, (err) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  const protocol = cert && key ? "https" : "http";
  const i = s.address();
  const baseURL = (useRuntimeConfig().app.baseURL || "").replace(/\/$/, "");
  const url = `${protocol}://${i.family === "IPv6" ? `[${i.address}]` : i.address}:${i.port}${baseURL}`;
  console.log(`Listening ${url}`);
});
{
  process.on(
    "unhandledRejection",
    (err) => console.error("[nitro] [dev] [unhandledRejection] " + err)
  );
  process.on(
    "uncaughtException",
    (err) => console.error("[nitro] [dev] [uncaughtException] " + err)
  );
}
const nodeServer = {};

export { useRuntimeConfig as a, getRouteRules as g, nodeServer as n, useNitroApp as u };
//# sourceMappingURL=node-server.mjs.map
