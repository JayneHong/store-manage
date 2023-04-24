import React, { lazy } from 'react'
import { RouteObject, Navigate } from 'react-router-dom'
import { HOME_URL } from '@/config/config'
import HomeLayout from '@/layouts/HomeLayout'
import Login from '@/views/login'
import lazyLoad from './utils/lazyLoad'

const NotAuth = lazy(() => import('@/components/errorMessage/403'))
const NotFound = lazy(() => import('@/components/errorMessage/404'))

// 用户管理
const Users = lazy(() => import('@/views/system/Users'))
const Roles = lazy(() => import('@/views/system/Roles'))

/** 基本管理*/
// 商品管理
const CommodityManage = lazy(
  () => import('@/views/commodityManage/CommodityManage')
)
// 商品分类
const CommodityClassified = lazy(
  () => import('@/views/commodityManage/CommodityClassified')
)

// 库存管理
const InventoryManage = lazy(
  () => import('@/views/inventoryManage/inventoryManage')
)

// 库存预警
const InventoryWarning = lazy(
  () => import('@/views/inventoryManage/inventoryWarning')
)

// 临期预警
const ExpiredWarning = lazy(
  () => import('@/views/inventoryManage/expiredWarning')
)

// 客户管理
const CustomerManage = lazy(
  () => import('@/views/customerManage/CustomerManage')
)
// 供应商管理
const SupplierManage = lazy(
  () => import('@/views/supplierManage/SupplierManage')
)

// 首页
const Home = lazy(() => import('@/views/home/index'))

//分析
const Visualized = lazy(() => import('@/views/visualized'))

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
        element: lazyLoad(Home),
      },
      {
        path: '/system/users',
        element: lazyLoad(Users),
      },
      {
        path: '/system/roles',
        element: lazyLoad(Roles),
      },
      {
        path: '/commodityManage/commodity',
        element: lazyLoad(CommodityManage),
      },
      {
        path: '/commodityManage/classified',
        element: lazyLoad(CommodityClassified),
      },
      {
        path: '/customerManage/customer',
        element: lazyLoad(CustomerManage),
      },
      {
        path: '/supplierManage/supplier',
        element: lazyLoad(SupplierManage),
      },
      {
        path: '/inventoryManage/inventory',
        element: lazyLoad(InventoryManage),
      },
      {
        path: '/inventoryManage/inventoryWarning',
        element: lazyLoad(InventoryWarning),
      },
      {
        path: '/inventoryManage/expiredWarning',
        element: lazyLoad(ExpiredWarning),
      },
      {
        path: '/visualized/index',
        element: lazyLoad(Visualized),
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
