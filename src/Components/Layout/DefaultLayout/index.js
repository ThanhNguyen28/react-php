import Header from '../Header'
import Side from '../Slide'
import Footer from '../Footer'
function DefaultLayout({children}) {
    return ( 
    <div>
       <Header/>
       <Side/>  
        {children}
       <Footer/>
    </div> 
    );
}

export default DefaultLayout;