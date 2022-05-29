import { useEffect,useState } from 'react';
import {useSelector,useDispatch} from 'react-redux'
import {Link} from 'react-router-dom'
import * as ACTIONS from '../../store/actions/index'
import {formatPrice} from '../../hooks'
import Items from './items';
import Modal from './modal';
function Cart() {
    
    const cart= useSelector((state) => state.cart);
    const dispatch = useDispatch();
    const [carts, setCarts] = useState([]);
    const [total, setTotal] = useState(0);
/* ============================== tính tổng đơn hàng ============================== */
    useEffect(()=>{
      var sum = 0
      cart.forEach(element => {
          sum = Number(sum) + (element.quantity*element.product.price)
          return sum    
      });
      setTotal(sum)
    },[cart])
/* ============================== load cart ============================== */
    useEffect(() => {
        setCarts(cart)
    }, [cart]);
/* ============================== Giảm ============================== */
     const handleReduction = (product,quantity) =>{
        quantity!==1 &&
        dispatch(ACTIONS.updateCart(product,quantity-1))
      }
/* ============================== Tăng ============================== */
    const handleIncrease = (product,quantity) =>{
        quantity < 10 &&
        dispatch(ACTIONS.updateCart(product,quantity+1))
    }
/* ============================== Xóa ============================== */
    const onDeleteItem=(product)=>{
         dispatch(ACTIONS.deleteCart(product))
    }
/* ============================== tính tổng ============================== */
    const showSumPrice=(price,quantity)=>{
        return formatPrice.format(price*quantity)
    }
    const [id, setId] = useState();
    const [product,setProduct]=useState();

    const handleSize = (product,id) => {
        setId(id);
        setProduct(product);
    }
    const handleChangeSize = (size) => {
        dispatch(ACTIONS.updateCartSize(product,size))
    }

    return ( 
    <div className="container" style={styles.container}>
        <div className="row"  style={styles.row}>
            <div className="col-lg-12 table-responsive mb-5">
                <table className="table table-bordered text-center mb-0">
                    <thead className="bg-secondary text-dark">
                      <tr>
                        <th>Name</th>
                        <th>Size</th>
                        <th>Picture</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Total</th>
                        <th>Remove</th>
                      </tr>
                    </thead>
                    <tbody className="align-middle">
                       <Items 
                          carts={carts}
                          handleReduction={handleReduction}
                          handleIncrease={handleIncrease}
                          onDeleteItem={onDeleteItem}
                          showSumPrice={showSumPrice}
                          handleSize={handleSize}
                       />
                    </tbody>
                </table>
                <Modal id={id} handleChangeSize={handleChangeSize}/>
            </div>
            <div className="col-lg-4">
                <div className="card border-secondary mb-5">
                    <div className="card-header bg-secondary border-0">
                        <h4 className="font-weight-semi-bold m-0">Cart Total</h4>
                    </div>
                    <div className="card-body">
                    </div>
                    <div className="card-footer border-secondary bg-transparent">
                        <div className="d-flex justify-content-between mt-2">
                            <h5 className="font-weight-bold">Total</h5>
                            <h5 className="font-weight-bold">{formatPrice.format(total)}</h5>
                        </div>
                        <Link to="/home/pay">
                           <button className="btn btn-block btn-primary my-3 py-3">Payment</button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    </div>
   );
}
export default Cart;
const styles={
    container:{
      fontFamily:"Times New Roman",
      fontSize: "20px",
    },
    row:{
      marginTop: "10px"
    },
  }