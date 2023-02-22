import React, { lazy, Suspense } from 'react'
import { RouteObject, Navigate } from 'react-router-dom'
import { HOME_URL } from '@/config/config'
import HomeLayout from '@/layouts/HomeLayout'
import Login from '@/views/login'
import lazyLoad from './utils/lazyLoad'

const NotAuth = lazy(() => import('@/components/errorMessage/403'))
const NotFound = lazy(() => import('@/components/errorMessage/404'))

// 用户管理
const Users = lazy(() => import('@/views/users'))

/** 基本管理*/
// 商品管理
const CommodityManage = lazy(() => import('@/views/basicManage/CommodityManage'))
// 客户管理
const CustomerManage = lazy(() => import('@/views/basicManage/CustomerManage'))
// 供应商管理
const SupplierManage = lazy(() => import('@/views/basicManage/SupplierManage'))

const Page1 = lazy(() => import('@/views/page1'))
const Page2 = lazy(() => import('@/views/page2'))

const routers: RouteObject[] = [
  {
    path: '/',
    element: <Navigate to={HOME_URL} />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/',
    element: <HomeLayout />,
    children: [
      {
        path: HOME_URL,
        element: lazyLoad(Page1),
      },
      {
        path: '/page1',
        element: lazyLoad(Page1),
      },
      {
        path: '/page2',
        element: lazyLoad(Page2),
      },
      {
        path: '/page3',
        element: lazyLoad(Page2),
      },
      {
        path: '/page4',
        element: lazyLoad(Page2),
      },
      {
        path: '/page5',
        element: lazyLoad(Page2),
      },
      {
        path: '/page6',
        element: lazyLoad(Page2),
      },
      {
        path: '/page7',
        element: lazyLoad(Page2),
      },
      {
        path: '/page8',
        element: lazyLoad(Page2),
      },
      {
        path: '/users/index',
        element: lazyLoad(Users),
      },
      {
        path: '/basicManage/commodity',
        element: lazyLoad(CommodityManage),
      },
      {
        path: '/basicManage/customer',
        element: lazyLoad(CustomerManage),
      },
      {
        path: '/basicManage/supplier',
        element: lazyLoad(SupplierManage),
      },
    ],
  },
  {
    path: '/404',
    element: lazyLoad(NotFound),
  },
  {
    path: '/403',
    element: lazyLoad(NotAuth),
  },
  {
    path: '*',
    element: <Navigate to="/404" />,
  },
]

export default routers
