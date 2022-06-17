export const routes = {
  app: {
    cache: "/employee-app/cache",
  },
  profile: {
    url: "/hr/employees",
    detail: "/hr/me/employee",
  },
  tracking: {
    me: "/hr/me/trackings",
    list: "/hr/me/trackings/list",
  },
  branch: {
    url: "/org/brand-branches",
    mac: "/org/branch-to-macs",
  },
  notify: {
    detail: "/hr/me/notification/detail",
    all: "/hr/me/notification/other",
    me: "/hr/me/notification/myself",
  },
};
