import { createElement } from "react";
import { lazy, type RouteConfig } from "@app/routes";
import { Navigate } from "@moneko/react";

const routers: RouteConfig[] = [
  {
    path: "/",
    root: true,
    element: lazy(() => import(/* webpackChunkName: "layout" */ "@/layout")),
    children: [
      {
        path: "*",
        element: createElement(Navigate, {
          to: "/chat",
          replace: true,
        }),
      },
    ],
  },
];

export default routers;
