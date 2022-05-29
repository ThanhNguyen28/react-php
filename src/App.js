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
