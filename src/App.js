import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import { Fragment } from 'react'
import {publicRoutes,privateRoutes} from './routes'
import DefaultLayout from './Components/Layout/DefaultLayout'
import DefaultLayoutAdmin from './Components/LayoutAdmin/DefaultLayout'


function App() {

  return (
    <Router>
      <div className='App'> 
        <Routes>
           {publicRoutes.map((item,index)=>{
             const Page =item.component;
             let Layout = DefaultLayout;
             if(item.layout){
               Layout = item.layout;
             }else if(item.layout===null){
               Layout = Fragment;
             }
             return (<Route 
                        key={index} 
                        path={item.path} 
                        element={
                        <Layout>
                          <Page/> {/* children */}
                        </Layout>
                      } />)
           })}
           {
           privateRoutes.map((item,index)=>{
            const Page =item.component;
            let Layout = DefaultLayoutAdmin;
            if(item.layout){
              Layout = item.layout;
            }else if(item.layout===null){
              Layout = Fragment;
            }
            return (<Route 
                       key={index} 
                       path={item.path} 
                       element={
                       <Layout>
                         <Page/> {/* children */}
                       </Layout>
                     } />)
          })
        }
        </Routes>
      </div>
    </Router> 
  );
}

export default App;

// import {Routes,Route} from 'react-router-dom'

// // import Menu from "./Components/Menu";
// import Admin from './Components/Admin';
// import Product from './Components/Product/product';
// import Trademark from './Components/Trademark/trademark';
// import CreateProduct from './Components/Product/create';
// import TheGroup from './Components/TheGroup/thegroup';
// import Category from './Components/Category/category';
// import User from './Components/User/user';
// import CreateUser from './Components/User/create';
// import UpdateUser from './Components/User/update';
// import Login from './Components/User/login';
// import NotFound from './Components/NotFound';
// import Index from './Page';
// import ProductDetail from './Page/ProductDetail/index';
// import Cart from './Page/Cart'
// import Pay from './Page/Pay'
// import Shop from './Page/Shop'
// const App = () => {
//   // let navigate = useNavigate();
//   return( 
//   <>
//   {/* <Menu/> */}
//   <Routes>
//     <Route path="/admin" element={<Admin />}/>

//     <Route path="/user" element={<User />}/>
//     <Route path="/user/create" element={<CreateUser />}/>
//     <Route path="/user/update/:id" element={<UpdateUser />} />
//     <Route path="/admin/login" element={<Login />}/>

//     <Route path="/trademark" element={<Trademark />}/>
//     <Route path="/thegroup" element={<TheGroup />}/>
//     <Route path="/category" element={<Category />}/>
//     <Route path="/product" element={<Product />}/>
//     <Route path="/product/create" element={<CreateProduct />}/>

//     <Route path='/home' element={<Index/>}/>

//     <Route path="/product-detail/:id" element={<ProductDetail />}/>
//     <Route path="/home/cart" element={<Cart/>}/>
//     <Route path='/home/shop' element={<Shop/>}/>
//     <Route path="/home/pay" element={<Pay/>}/>
//      <Route path="*" element={<NotFound />} /> 
//   </Routes>
//   </>
//   );
// }
// export default App;