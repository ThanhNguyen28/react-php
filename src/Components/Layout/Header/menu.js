import { useSelector, useDispatch } from "react-redux"
import { Link } from "react-router-dom"
import {useEffect} from "react"
import * as ACTIONS from "../../../store/actions/index"
import {getApi} from "../../../Api/api"
function Menu() {
  const trademark= useSelector((state) => state.trademark);
  const dispatch = useDispatch();
/* ======================== Loading trademark lần đầu return ======================== */
  useEffect(() => {
    getApi("trademark/index").then(function (response) {
      dispatch(ACTIONS.getTrademark(response.data))
    })
  },[dispatch]) /* Load lai khi thuc hien dispatch */
    return ( 
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark" style={styles.nav}>
        <div className="container">
          {/* <Link className="navbar-brand" to="/home">Home</Link> */}
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav">
            <li className="nav-item" style={styles.navitem}>
                <Link to="/" className="nav-link active" aria-current="page" style={styles.navlink}>Home</Link>
            </li>
            <li className="nav-item" style={styles.navitem}>
                <Link to="/home/shop" className="nav-link active" aria-current="page" style={styles.navlink}>Shoes</Link>
            </li>
            <li className="nav-item dropdown" style={styles.navitem}>
               <Link to="/home/trademark" className="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Trademark
               </Link>
               <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                 { trademark && 
                    trademark.map((item,index)=>{
                      return (
                      <li key={index}>
                          <Link to={`/home/trademark/${item.id}`}
                            className="dropdown-item" 
                            style={styles.dropdownItem}>{item.name}</Link>
                      </li>
                      )
                    })
                 }
               </ul>
            </li>
            </div>
          </div>
        </div>
      </nav>
    );
}

export default Menu;

const styles = {
  nav:{
    position: 'relative',
    opacity: "0.8",
    backgroundColor: "black",
    borderRadius:"5px",
    fontFamily:"Times New Roman",
    fontSize: "20px",
    zIndex: "1",
  },
  navlink :{
    paddingLeft: "10px"
  },
  navitem:{
    margin: "5px"
  },
  dropdownItem: {
    zIndex: "1",
    color: "red",
  }

}