/* ================================== HOME ==================================*/

import Home from '../Pages/Home'
import Cart from '../Pages/Cart'
import ProductDetail from '../Pages/ProductDetail'
import Shop from '../Pages/Shop'
import TrademarkID from '../Pages/TrademarkID'
import Pay from '../Pages/Pay'
import HeaderOnly from '../Components/Layout/HeaderOnly'

/* ================================== ADMIN ==================================*/

import Admin from '../PageAdmin/Admin'
import User from '../PageAdmin/User'
import UserCreate from '../PageAdmin/User/create' 
import UserUpdate from '../PageAdmin/User/update'
import Size from '../PageAdmin/Size'  
import Trademark from '../PageAdmin/Trademark' 
import Product from '../PageAdmin/Product'
import ProductCreate from '../PageAdmin/Product/create'
import ProductUpdate from '../PageAdmin/Product/update'
import Login from '../PageAdmin/User/login'
import Order from '../PageAdmin/Order'
import OrderDetail from '../PageAdmin/Order/orderDetail'
import NotFound from '../Components/NotFound'


/* ================================== HOME ==================================*/

const publicRoutes =[
    { path: '/', component: Home },
    { path: '/home/cart', component: Cart ,layout:HeaderOnly},
    { path: '/product-detail/:id', component: ProductDetail,layout:HeaderOnly },
    { path: '/home/shop', component: Shop,layout:HeaderOnly},
    { path: '/home/pay', component: Pay,layout:HeaderOnly},
    { path: '/home/trademark/:id', component: TrademarkID,layout:HeaderOnly},
    { path: '*', component: NotFound,layout:null }
]

/* ================================== ADMIN ==================================*/
const login = localStorage.getItem('LOGIN') ;
var privateRoutes=[]
if(login){
    const items = JSON.parse(localStorage.getItem('LOGIN'))
    items[0].power===1 ?
 privateRoutes =[
    { path: '/admin', component: Admin },
    { path: '/admin/user', component: User },
    { path: '/admin/user/create', component: UserCreate },
    { path: '/admin/user/update/:id', component: UserUpdate },
    { path: '/admin/size', component: Size },
    { path: '/admin/trademark', component: Trademark },
    { path: '/admin/product', component: Product },
    { path: '/admin/product/create', component: ProductCreate },
    { path: '/admin/product/update/:id', component: ProductUpdate },
    { path: '/admin/order', component: Order },
    { path: '/admin/order-detail/:id', component: OrderDetail },
    { path: '/admin/login', component: Login,layout:null }
]
: items[0].power===2 ? 
privateRoutes =[
    { path: '/admin', component: Admin },
    { path: '/admin/product', component: Product },
    { path: '/admin/product/create', component: ProductCreate },
    { path: '/admin/product/update/:id', component: ProductUpdate },
    { path: '/admin/login', component: Login,layout:null },
]
: 
privateRoutes =[
    { path: '/admin/order', component: Order },
    { path: '/admin/order-detail/:id', component: OrderDetail },
    { path: '/admin/login', component: Login,layout:null },
]
}else{
     privateRoutes =[
        { path: '/admin', component: Admin },
        { path: '/admin/login', component: Login,layout:null },
        { path: '*', component: NotFound,layout:null }
    ]
}
export {publicRoutes,privateRoutes}