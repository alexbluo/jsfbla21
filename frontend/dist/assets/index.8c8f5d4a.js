var E = Object.defineProperty;
var v = Object.getOwnPropertySymbols;
var M = Object.prototype.hasOwnProperty,
  H = Object.prototype.propertyIsEnumerable;
var I = (a, t, r) =>
    t in a
      ? E(a, t, { enumerable: !0, configurable: !0, writable: !0, value: r })
      : (a[t] = r),
  B = (a, t) => {
    for (var r in t || (t = {})) M.call(t, r) && I(a, r, t[r]);
    if (v) for (var r of v(t)) H.call(t, r) && I(a, r, t[r]);
    return a;
  };
import {
  j as R,
  N as L,
  r as s,
  u as U,
  a as x,
  L as N,
  R as F,
  h as _,
  I as S,
  b as G,
  B as Y,
  c as j,
  d as f,
} from "./vendor.9436be2c.js";
const z = function () {
  const t = document.createElement("link").relList;
  if (t && t.supports && t.supports("modulepreload")) return;
  for (const i of document.querySelectorAll('link[rel="modulepreload"]')) o(i);
  new MutationObserver((i) => {
    for (const n of i)
      if (n.type === "childList")
        for (const l of n.addedNodes)
          l.tagName === "LINK" && l.rel === "modulepreload" && o(l);
  }).observe(document, { childList: !0, subtree: !0 });
  function r(i) {
    const n = {};
    return (
      i.integrity && (n.integrity = i.integrity),
      i.referrerpolicy && (n.referrerPolicy = i.referrerpolicy),
      i.crossorigin === "use-credentials"
        ? (n.credentials = "include")
        : i.crossorigin === "anonymous"
        ? (n.credentials = "omit")
        : (n.credentials = "same-origin"),
      n
    );
  }
  function o(i) {
    if (i.ep) return;
    i.ep = !0;
    const n = r(i);
    fetch(i.href, n);
  }
};
z();
const e = R.exports.jsx,
  A = R.exports.jsxs;
function p(a) {
  return e("a", {
    className: "bl-container",
    href: a.link,
    children: e("button", {
      className: `ButtonLink ${a.detail ? "ButtonLink--style-details" : null}`,
      children: a.children,
    }),
  });
}
function C(a) {
  return e("li", {
    className: "inline",
    children: e(L, {
      className:
        "mx-3 text-white text-xl hover:duration-200 hover:ease-in hover:text-gold",
      to: a.path,
      children: a.children,
    }),
  });
}
function D() {
  return e("nav", {
    className:
      "fixed left-0 top-0 z-10 flex flex-row-reverse h-12 w-full bg-red",
    children: A("ul", {
      className: "flex self-center",
      children: [
        e(C, { path: "/attractions", children: "Attractions" }),
        e(C, { path: "/map", children: "Map" }),
        e(C, { path: "/help", children: "Help" }),
      ],
    }),
  });
}
var P = "/assets/noImage.696a83ed.png";
function w(a, t) {
  return a.filters.find((r) => r.type === t).val;
}
function W() {
  const a = s.exports.useRef(!0),
    [t, r] = s.exports.useState(null),
    o = U().id;
  s.exports.useEffect(
    () => () => {
      a.current = !1;
    },
    []
  ),
    s.exports.useEffect(async () => {
      const n = await x.get(`/api/attractions/${o}`);
      a.current && r(n.data);
    }, [o]);
  function i() {
    return {
      __html: `<ul class="absolute max-w-[20%] max-h-[70%] ml-8 overflow-auto"><li>${t.amenities.join(
        "</li><li>"
      )}</li></ul>`,
    };
  }
  return A("div", {
    className: "container px-[8%] pt-8 pb-16",
    children: [
      e(D, {}),
      t &&
        A("div", {
          children: [
            e("h1", {
              className: "text-4xl mb-4",
              children: t.attraction_name,
            }),
            A("div", {
              className: "grid grid-cols-3 grid-rows-2",
              children: [
                A("div", {
                  className: "px-[8%] py-[4%] bg-gold",
                  children: [
                    e("h2", {
                      className: "text-2xl mb-2",
                      children: "Description",
                    }),
                    t.description,
                  ],
                }),
                A("div", {
                  className: "px-[8%] py-[4%] text-red",
                  children: [
                    e("h2", {
                      className: "text-2xl mb-2",
                      children: "Website & Contact",
                    }),
                    A("div", {
                      className:
                        "grid grid-cols-2 gap-0 items-center bg-white text-center",
                      children: [
                        t.website_link &&
                          e(p, {
                            link: t.website_link,
                            detail: !0,
                            children: "Website",
                          }),
                        t.mailto_link &&
                          e(p, {
                            link: t.mailto_link,
                            detail: !0,
                            children: "Email",
                          }),
                        t.phone_number &&
                          A(p, {
                            link: `tel:${t.phone_number}`,
                            detail: !0,
                            children: ["Phone", e("br", {}), t.phone_number],
                          }),
                        t.fax &&
                          A(p, {
                            link: `tel:${t.fax}`,
                            detail: !0,
                            children: ["Fax", e("br", {}), t.fax],
                          }),
                      ],
                    }),
                  ],
                }),
                e("img", {
                  className: "w-[100%] aspect-square object-fill",
                  src: t.attraction_image.includes("data")
                    ? P
                    : t.attraction_image,
                  alt: "",
                }),
                A("div", {
                  className: "px-[8%] py-[4%] text-red",
                  children: [
                    e("h2", {
                      className: "text-2xl mb-2",
                      children: "Amenities",
                    }),
                    t.amenities
                      ? e("div", { dangerouslySetInnerHTML: i() })
                      : e("p", { children: "No amenities listed" }),
                  ],
                }),
                A("div", {
                  className: "px-[8%] py-[4%] bg-gold",
                  children: [
                    e("h2", {
                      className: "text-2xl mb-2",
                      children: "Location",
                    }),
                    t.address,
                    e("br", {}),
                    w(t, "city"),
                    ", ",
                    t.state,
                    "\xA0",
                    t.zip,
                    e("br", {}),
                    e("a", {
                      className:
                        "text-white hover:text-red decoration-red decoration-4 underline underline-offset-4 duration-200 ease-in",
                      href: t.directions_link,
                      children: "Directions",
                    }),
                  ],
                }),
                A("div", {
                  className: "px-[8%] py-[4%] text-red",
                  children: [
                    e("h2", { className: "text-2xl mb-2", children: "Region" }),
                    e("h3", {
                      className: "text-lg mb-2",
                      children: w(t, "region") && w(t, "region"),
                    }),
                    t.region_image &&
                      e("img", { src: t.region_image, alt: "" }),
                  ],
                }),
              ],
            }),
          ],
        }),
    ],
  });
}
var K =
  "data:image/png;base64,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";
function q(a) {
  const [t, r] = s.exports.useState(!1);
  return A("div", {
    children: [
      A("h2", {
        className: "mb-2 text-xl text-gold",
        children: [
          a.category.toUpperCase(),
          e("input", {
            className: "w-3 h-3 ml-2",
            type: "image",
            src: K,
            alt: "",
            onClick: () => r(!t),
          }),
        ],
      }),
      e("ul", {
        className: `${
          t ? "block" : "hidden"
        } text-base max-h-48 ml-4 p-0 overflow-y-auto`,
        children: a.children,
      }),
    ],
  });
}
function Z(a) {
  return a.split(" ").join("+");
}
function O(a) {
  const [t, r] = s.exports.useState(!1),
    { queryParam: o, setQueryParam: i } = s.exports.useContext(y);
  return (
    s.exports.useEffect(() => {
      const n = `${Z(a.field)}=${a.category}`;
      i(t ? `${o}&${n}` : o.replace(`&${n}`, ""));
    }, [t]),
    e("li", {
      children: A("label", {
        children: [
          e("input", {
            className: "mr-1",
            type: "checkbox",
            onChange: (n) => r(n.target.checked),
          }),
          a.field,
        ],
      }),
    })
  );
}
const k = ["region", "city", "category", "amenity"];
function X() {
  const a = s.exports.useRef(!0),
    [t, r] = s.exports.useState({}),
    [o, i] = s.exports.useState(!0);
  s.exports.useEffect(
    () => () => {
      a.current = !1;
    },
    []
  ),
    s.exports.useEffect(async () => {
      for (const d of k) l(d);
      async function l(d) {
        const h = await x.get(`/api/filters/${d}`);
        a.current && r((g) => B(B({}, g), h.data));
      }
    }, []),
    s.exports.useEffect(() => {
      const l = Object.keys(t);
      k.every((d) => l.includes(d)) && i(!1);
    }, [t]);
  function n() {
    return (
      !o &&
      Object.entries(t).map(([l, d], h) =>
        e(
          q,
          {
            category: l,
            children: d.map((g, u) => e(O, { category: l, field: g }, u)),
          },
          h
        )
      )
    );
  }
  return e("div", { className: "inline-block w-[27%]", children: n() });
}
function $(a) {
  const t = a.data;
  return A("div", {
    className: "Preview",
    children: [
      e(N, {
        to: `/attractions/${t.attraction_id}`,
        children: e("img", {
          src: t.attraction_image.includes("data") ? P : t.attraction_image,
          alt: "",
        }),
      }),
      e("label", { className: "Preview__city", children: w(t, "city") }),
      e("br", {}),
      e("label", { children: e("b", { children: t.attraction_name }) }),
    ],
  });
}
const y = F.createContext({ queryParam: "", setQueryParam: () => {} });
function T() {
  const a = s.exports.useRef(!0),
    [t, r] = s.exports.useState([]),
    [o, i] = s.exports.useState(0),
    [n, l] = s.exports.useState(""),
    d = { queryParam: n, setQueryParam: l };
  s.exports.useEffect(
    () => () => {
      a.current = !1;
    },
    []
  ),
    s.exports.useEffect(async () => {
      const u = await x.get(`/api/attractions?page=${o}${n}`);
      a.current && r(o === 0 ? u.data : (c) => [...c, ...u.data]);
    }, [o, n]),
    s.exports.useEffect(() => {
      a.current && i(0);
    }, [n]);
  function h() {
    return t.length === 0
      ? e("p", { children: "Nothing Matched!" })
      : e("div", {
          className: "grid grid-cols-2 gap-16",
          children: t.map((u) => e($, { data: u }, u.attraction_id)),
        });
  }
  function g() {
    return (
      t &&
      t.length > 1 &&
      e("button", {
        className: "w-[16%] h-8 mt-8 rounded-md bg-red text-white",
        onClick: () => i((u) => u + 1),
        children: "Load More",
      })
    );
  }
  return A("div", {
    className: "container px-[8%] pt-8 pb-16",
    children: [
      e(D, {}),
      e("h1", { className: "text-4xl mb-4", children: "Attractions" }),
      A("div", {
        className: "flex justify-between",
        children: [
          e(y.Provider, { value: d, children: e(X, {}) }),
          A("div", {
            className: "relative flex flex-col items-center w-[69%]",
            children: [h(), g()],
          }),
        ],
      }),
    ],
  });
}
function Q(a) {
  return e("div", {
    className: `Marker ${a.isCenter && "Marker--center"}`,
    onClick: a.onClick,
  });
}
function V() {
  return A("div", {
    className: "container px-[8%] pt-8 pb-16",
    children: [
      e(D, {}),
      e("h1", { className: "text-4xl mb-4", children: "Help" }),
      e("h2", { children: "FAQ" }),
      A("div", {
        className: "",
        children: [
          e("h3", {
            children:
              "Why are new attractions not appearing when I enter more filters?",
          }),
          e("p", {
            children:
              "New attractions will appear towards the bottom in the order which filters are specified.",
          }),
          e("h3", { children: "What is the white and red marker on the map?" }),
          e("p", {
            children:
              "The white and red marker is your current location while the black and yellow markers are all the attractions within the specified distance.",
          }),
          A("label", {
            children: [
              e(Q, { isCenter: !0 }),
              " Your location",
              e("br", {}),
              e(Q, {}),
              " Attraction near you",
            ],
          }),
          e("h3", {
            children:
              "Why are new attractions not appearing on the map after x distance?",
          }),
          e("p", {
            children:
              "The max distance was set to 500km in order to accommodate for users in the far out regions of Maryland, but most users will likely max out around 250km.",
          }),
          e("h3", { children: "Where is the data collected from?" }),
          A("p", {
            children: [
              "All data was scraped from\xA0",
              e("a", {
                href: "https://www.visitmaryland.org/things-to-do/attractions",
                children: "here",
              }),
              "\xA0using Puppeteer.",
            ],
          }),
          e("h3", { children: "Where can I find the source code?" }),
          A("p", {
            children: [
              "The source code can be found\xA0",
              e("a", {
                href: "https://github.com/alexbluo/jsfbla21",
                children: "here",
              }),
              ". Unfortunately the website is still in development so it isn't possible to host it yourself.",
            ],
          }),
          e("div", {
            className: "HelpPage__contact-button-container",
            children: e(p, {
              link: "mailto:alexluo92823@gmail.com",
              children: "Contact Me",
            }),
          }),
        ],
      }),
    ],
  });
}
function J() {
  return A("div", {
    className: "LandingPage container",
    children: [
      e("h1", { children: "Maryland Attractions Searcher" }),
      e(N, {
        to: "/attractions",
        children: e("button", { children: "Attractions" }),
      }),
      e(N, { to: "/map", children: e("button", { children: "Map" }) }),
      e(N, { to: "/help", children: e("button", { children: "Help" }) }),
    ],
  });
}
function ee() {
  return e("div", {
    className: "container",
    children: e("p", { children: "Error 404: nothing here goofy" }),
  });
}
function te(a) {
  const t = a.data;
  return A("div", {
    className: "Popup",
    children: [
      e("button", {
        className: "Popup__close-button",
        onClick: a.onCloseClick,
        children: "X",
      }),
      e("p", { className: "Popup__title", children: t.attraction_name }),
      A("div", {
        className: "Popup__contents-container",
        children: [
          e("img", {
            className: "Popup__image",
            src: t.attraction_image.includes("data") ? P : t.attraction_image,
            alt: "",
          }),
          t.website_link &&
            e(p, {
              className: "Popup__button",
              link: t.website_link,
              children: "Website",
            }),
          e(p, {
            className: "Popup__button",
            link: t.directions_link,
            children: "Directions",
          }),
          A("div", {
            className: "Popup__text",
            children: [
              A("p", {
                className: "Popup__address",
                children: [
                  t.address,
                  e("br", {}),
                  w(t, "city"),
                  ", ",
                  t.state,
                  "\xA0",
                  t.zip,
                ],
              }),
              e("p", { children: t.description }),
            ],
          }),
        ],
      }),
    ],
  });
}
function ae({ center: a }) {
  const t = s.exports.useRef(!0),
    [r, o] = s.exports.useState(20),
    [i, n] = s.exports.useState(r * 1e3),
    [l, d] = s.exports.useState([]),
    [h, g] = s.exports.useState(null);
  s.exports.useEffect(
    () => () => {
      t.current = !1;
    },
    []
  ),
    s.exports.useEffect(async () => {
      const c = `?lng=${a.lng}&lat=${a.lat}&searchRadius=${i}`,
        m = await x.get(`/api/attractions/near${c}`);
      t.current && d(m.data);
    }, [i]);
  function u(c) {
    let m = c.target.value;
    m > 500 && (m = 500), m < 0 && (m = 0), o(m), n(m * 1e3);
  }
  return A("div", {
    className: "Map",
    children: [
      A("div", {
        className: "GoogleMapReact",
        children: [
          A(_, {
            bootstrapURLKeys: {
              key: "AIzaSyATCG2NwCqH_IUuyZeIJhU9XdwM07TGoog",
            },
            defaultCenter: a,
            defaultZoom: 11,
            children: [
              e(Q, { lat: a.lat, lng: a.lng, isCenter: !0 }),
              l.map((c) =>
                e(
                  Q,
                  {
                    lat: c.coordinates[1],
                    lng: c.coordinates[0],
                    onClick: () => g(c),
                    name: c.attraction_name,
                    address: c.address,
                    city: w(c, "city"),
                    state: c.state,
                    zip: c.zip,
                  },
                  c.attraction_id
                )
              ),
            ],
          }),
          h && e(te, { data: h, onCloseClick: () => g(null) }),
        ],
      }),
      A("div", {
        className: "Map__search",
        children: [
          A("label", {
            children: [
              e("input", {
                type: "number",
                min: 0,
                max: 500,
                value: r,
                onInput: u,
              }),
              "km",
            ],
          }),
          e(S, {
            className: "MapPage__Slider",
            min: 0,
            max: 500,
            value: r,
            onChange: (c) => o(c),
            onAfterChange: () => n(r * 1e3),
            railStyle: { backgroundColor: "var(--flag-gold)", height: 2 },
            trackStyle: {
              backgroundColor: "var(--flag-black)",
              marginTop: -1,
              marginLeft: 1,
              width: 90,
              height: 4,
            },
            handleStyle: {
              height: 14,
              width: 14,
              marginTop: -6,
              borderRadius: "50%",
              borderColor: "var(--flag-black)",
              backgroundColor: "var(--flag-gold)",
            },
          }),
        ],
      }),
    ],
  });
}
const b = { lat: void 0, lng: void 0 };
navigator.geolocation.getCurrentPosition((a) => {
  (b.lat = a.coords.latitude), (b.lng = a.coords.longitude);
});
function Ae() {
  return A("div", {
    className: "container px-[8%] pt-8 pb-16",
    children: [
      e(D, {}),
      e("h1", { className: "text-4xl mb-4", children: "Map" }),
      e(ae, { center: b }),
    ],
  });
}
G.render(
  e(Y, {
    children: A(j, {
      children: [
        e(f, { exact: !0, path: "/", element: e(J, {}) }),
        e(f, { exact: !0, path: "/attractions", element: e(T, {}) }),
        e(f, { exact: !0, path: "/attractions/:id", element: e(W, {}) }),
        e(f, { exact: !0, path: "/map", element: e(Ae, {}) }),
        e(f, { exact: !0, path: "/help", element: e(V, {}) }),
        e(f, { path: "*", element: e(ee, {}) }),
      ],
    }),
  }),
  document.getElementById("root")
);
