import {Link} from 'react-router-dom'
import {useState,useEffect} from 'react'
import { useNavigate  } from "react-router-dom"
function Nav() {
  const [items, setItems] = useState();
  let navigate = useNavigate();
  useEffect(() => {
    const items = JSON.parse(localStorage.getItem('LOGIN'))
    if(items){
      setItems(items)
    }
  }, []);
  const handleLogout = () => {
    localStorage.removeItem('LOGIN');
    navigate("/admin/login", { replace: true });
  } 
  return ( 
  <nav className="navbar navbar-expand-lg navbar-light bg-light" style={styles.nav}>
    <div className="container-fluid">
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon" />
      </button>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          <li className="nav-item" style={styles.navitem}>
            <Link to="/admin"  className="nav-link active" aria-current="page" style={styles.navlink}>Home</Link>
          </li>
          <li className="nav-item" style={styles.navitem}>
            <Link to="/admin/trademark"  className="nav-link" style={styles.navlink}>Trademark</Link>
          </li>
          <li className="nav-item" style={styles.navitem}>
            <Link to="/admin/size"  className="nav-link" style={styles.navlink}>Size</Link>
          </li>
          <li className="nav-item" style={styles.navitem}>
            <Link to="/admin/product"  className="nav-link" style={styles.navlink}>Product</Link>
          </li>
          <li className="nav-item" style={styles.navitem}>
            <Link to="/admin/user"  className="nav-link" style={styles.navlink}>User</Link>
          </li>
          <li className="nav-item" style={styles.navitem}>
            <Link to="/admin/order"  className="nav-link" style={styles.navlink}>Order</Link>
          </li>
        </ul>
        <div>
            <h6 className="rounded-circle">{items && items.name}</h6>
            <button className="btn btn-outline-dark" onClick={()=>handleLogout()}>Logout</button>
        </div>
      </div>
    </div>
  </nav>
);
}

export default Nav;

const styles = {
  nav:{
    position: 'relative',
    opacity: "0.8",
    backgroundColor: '#0602F7',
    borderRadius:"10px",
    fontFamily:"Times New Roman",
    fontSize: "20px",
   
  },
  navlink :{
    paddingLeft: "10px",
    textAlign:'center',
    color:'#000000',
  },
  navitem:{
    margin: "5px"
  },
  dropdownItem: {
    zIndex: "1",
    color: "red",
  }

}