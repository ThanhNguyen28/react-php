import Nav from '../Nav'
function DefaultLayout({children}) {
    return ( 
    <div className='container'>
       <Nav/>
       {children}
    </div> 
    );
}

export default DefaultLayout;