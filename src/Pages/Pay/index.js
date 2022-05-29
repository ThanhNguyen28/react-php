import React, { useEffect,useState } from 'react';
import {useSelector} from 'react-redux'
import {postApi} from '../../Api/api'
import {formatPrice} from '../../hooks/index'
function Pay() {

    const cart= useSelector((state) => state.cart);
    const [carts, setCarts] = useState([]);
    const [total, setTotal] = useState(0);
    const [inputs, setInputs] = useState({});
/* ================================= tính tổng đơn hàng ================================= */
    useEffect(()=>{
      var sum = 0
      cart.forEach(element => {
          element.product.discount > 0 ?
          sum = Number(sum) + (element.quantity*element.product.discount) :
          sum = Number(sum) + (element.quantity*element.product.price)
          return sum    
      });
      setTotal(sum)
    },[cart])
/* ================================= load cart ================================= */
    useEffect(() => {
        setCarts(cart)
    }, [cart]);
/* ================================= lấy giá trị input đưa vào setInputs ================================= */
    const onChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({...values, [name]: value}))
    }
/* ================================= Submit ================================= */
    const handleSubmit = (event) => {
        event.preventDefault();
        var curDate = new Date();
        var date = curDate.getFullYear() + "-" + (curDate.getMonth() + 1) + "-" + curDate.getDate()
        if(carts && carts.length > 0) {       
        var customer = {name:inputs.name,phone:inputs.phone,address:inputs.address,email:inputs.email,status:0}
        postApi("customer/create",customer).then(res => {

            var order = {customer_id:res.data,total_money:total,date:date,status:0}
            postApi("order/create",order).then(res => {

                carts.forEach((item) => {
                    var order_detail={order_id:res.data,
                        product_id:item.product.id,
                        price:item.product.discount ? item.product.discount : item.product.price,
                        quantity:item.quantity,
                        date:date,
                        note:item.size,
                        status:0}
                    postApi("order-detail/create",order_detail)
                    return order_detail
                });
            })
        })
        localStorage.removeItem('CART');
           alert("Đặt hàng thành công")
        }else{
            alert("Đặt hàng thất bại")
        }
    }
/* ================================= Submit ================================= */
    return ( 
    <div className="container" style={styles.container}>
        <div className="row" style={styles.row}>
            <div className="col-lg-6">
                <div className="mb-12">
                    <h4 className="font-weight-semi-bold mb-4">Passenger information</h4>
                    <div className="row">
                        <form onSubmit={(event)=>handleSubmit(event)}>
                        <div className="col-md-12 form-group">
                            <label>Name</label>
                            <input className="form-control" 
                              type="text" 
                              onChange={(event)=>onChange(event)} 
                              name="name" 
                              placeholder="Enter name" required/>
                        </div>
                        <div className="col-md-12 form-group">
                            <label>E-mail</label>
                            <input className="form-control" 
                              type="email" name="email" 
                              onChange={(event)=>onChange(event)} 
                              placeholder="...@email.com" required/>
                        </div>
                        <div className="col-md-12 form-group">
                            <label>Phone</label>
                            <input className="form-control" 
                               type="number" name="phone" 
                               onChange={(event)=>onChange(event)} 
                               placeholder="+84" required/>
                        </div>
                        <div className="col-md-12 form-group">
                            <label>Address</label>
                            <input className="form-control" 
                               type="text" name="address" 
                               onChange={(event)=>onChange(event)} 
                               placeholder="Enter address" required/>
                        </div>
                        <div className="col-md-12 form-group">
                            <button type="submit" className="btn btn-lg btn-block btn-primary font-weight-bold my-3 py-3">
                                Place Order
                            </button>
                        </div>
                        </form>
                    </div>
                </div>
            </div>
            <div className="col-lg-6">
                <div className="card border-secondary mb-5">
                    <div className="card-header bg-secondary border-0">
                        <h4 className="font-weight-semi-bold m-0">Order Total</h4>
                    </div>
                    <div className="card-body">
                        <h5 className="font-weight-medium mb-3">Products</h5>
                    { carts && carts.length > 0 &&
                      carts.map((item,index)=>{
                        return (
                        <div className="d-flex justify-content-between" key={index}>
                            <p>{item.product.name}</p>
                            <p>{item.quantity} - { item.product.discount > 0 ? formatPrice.format(item.product.discount): formatPrice.format(item.product.price)}</p>
                        </div>
                        )
                      })
                    }
                    </div>
                    <div className="card-footer border-secondary bg-transparent">
                        <div className="d-flex justify-content-between mt-2">
                            <h5 className="font-weight-bold">Total</h5>
                            <h5 className="font-weight-bold">{formatPrice.format(total)}</h5>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    );
}

export default Pay;
const styles={
    container:{
      fontFamily:"Times New Roman",
      fontSize: "20px",
    },
    row:{
      marginTop: "10px"
    },
  }