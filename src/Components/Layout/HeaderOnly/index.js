import Header from '../Header'
import Footer from '../Footer'
function HeaderOnly({children}) {
    return ( 
    <div>
       <Header/>
        {children}
       <Footer/>
    </div> 
    );
}

export default HeaderOnly;