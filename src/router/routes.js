const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "/",
        name: "history",
        component: () => import("pages/History.vue"),
        meta: { auth: true },
      },
      {
        path: "/create-kvo",
        name: "creating-kvo",
        component: () => import("pages/CreatingKVO.vue"),
        meta: { auth: true },
      },
      {
        path: "/create-lpab",
        name: "creating-lpab",
        component: () => import("pages/CreatingLPAB.vue"),
        meta: { auth: true },
      },

      {
        path: "/messages",
        name: "messages",
        component: () => import("pages/Messages.vue"),
        meta: { auth: true },
      },
    ],
  },

  {
    path: "/detail",
    component: () => import("layouts/MessageLayout.vue"),
    meta: { auth: true },
    children: [
      {
        path: "kvo/:id",
        name: "detail-kvo",
        component: () => import("pages/DetailKVO.vue"),
        meta: { auth: true },
      },
      {
        path: "lpab/:id",
        name: "detail-lpab",
        component: () => import("pages/DetailLpab.vue"),
        meta: { auth: true },
      },
    ],
  },

  {
    path: "/auth",
    component: () => import("layouts/AuthLayout.vue"),
    children: [
      {
        path: "",
        name: "auth",
        component: () => import("pages/Auth.vue"),
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/Error404.vue"),
  },
];

export default routes;
