const routes = [
  {
    path: "/dashboard",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "/",
        name: "dashboard",
        component: () => import("pages/Dashboard.vue"),
        meta: { requiresAuth: true } // set "requiresAuth" to true if this route require login
      },
      {
        path: "/profile",
        name: "profile",
        component: () => import("pages/Profile.vue"),
        meta: { requiresAuth: true }
      },
      {
        path: "/filter",
        name: "filter",
        component: () => import("pages/Filter.vue"),
        meta: { requiresAuth: true }
      },
      {
        path: "/compare",
        name: "compare",
        component: () => import("pages/Compare.vue"),
        meta: { requiresAuth: true }
      },
      {
        path: "/community",
        name: "community",
        component: () => import("pages/Community.vue"),
        meta: { requiresAuth: true }
      },
      {
        path: "/setting",
        name: "setting",
        component: () => import("pages/Setting.vue"),
        meta: { requiresAuth: true }
      }
    ]
  },
  {
    path: "/",
    component: () => import("pages/Signin.vue"),
    meta: { requiresAuth: false }
  },
  {
    path: "/newPlayer",
    name: "newPlayer",
    component: () => import("pages/Signin.vue"),
    props: route => ({ name: route.query.code }),
    meta: { requiresAuth: false }
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "*",
    component: () => import("pages/Error404.vue")
  }
];

export default routes;
