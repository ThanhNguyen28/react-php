import { Link } from "react-router-dom"
function Footer() {
    return ( 
        <div className="container-fluid bg-secondary text-dark mt-5 pt-5">
          <div className="row px-xl-5 pt-5">
            <div className="col-lg-4 col-md-12 mb-5 pr-3 pr-xl-5">
              <Link to="/home" className="text-decoration-none">
                <h1 className="mb-4 display-5 font-weight-semi-bold">
                  <span className="text-primary font-weight-bold border border-white px-3 mr-1">LOGO</span>Shoes</h1>
              </Link>
              <p>Chúc mừng bạn đến shop chúng tôi. Shop cung cấp Shoes cao cấp.</p>
              <p className="mb-2"><i className="fa fa-map-marker-alt text-primary mr-3" />Số 34/5, Nguyễn Huệ, TP. Vĩnh Long</p>
              <p className="mb-2"><i className="fa fa-envelope text-primary mr-3" />phucnguyen3920@gmail.com</p>
              <p className="mb-0"><i className="fa fa-phone-alt text-primary mr-3" />090 797 5485</p>
            </div>
            <div className="col-lg-8 col-md-12">
              <div className="row">
                <div className="col-md-4 mb-5">
                  <h5 className="font-weight-bold text-dark mb-4">Shoes Links</h5>
                  <div className="d-flex flex-column justify-content-start">
                    <Link className="text-dark mb-2" to="/">
                      <i className="fa fa-angle-right mr-2" />Home
                    </Link>
                    <Link className="text-dark mb-2" to="/home/shop">
                      <i className="fa fa-angle-right mr-2" />Shoes
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
     );
}

export default Footer;