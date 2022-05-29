import {url} from '../../Api/api';
import {formatPrice} from '../../hooks'
function Items(props) {
    const cart = props.carts;
    const  handleReduction=props.handleReduction;
    const  handleIncrease=props.handleIncrease;
    const  onDeleteItem=props.onDeleteItem;
    const  showSumPrice=props.showSumPrice;
    const  handleSize=props.handleSize
  return ( 
    cart && cart.length > 0 ? 
    cart.map((item,index)=>{ 
          return(
          <tr key={index}>
              <td className="align-middle">{item.product.name}</td>
              <td className="align-middle">{item.size}
                <button className="btn btn-outline-dark" data-bs-toggle="modal" data-bs-target="#exampleModal"
                    onClick={()=>handleSize(item.product,item.product.id)}>
                    <i className="bi bi-pencil-square"></i>
                </button>
              </td>
              <td className="align-middle">
                  <img src={url+item.product.picture} style={{'width':"50px"}} alt={item.product.picture}/>
              </td>
              <td className="align-middle">{item.product.discount > 0 ? formatPrice.format(item.product.discount) : formatPrice.format(item.product.price)}</td>
              <td className="align-middle">
                  <div className="input-group quantity mx-auto" style={{'width':"100px"}}>
                      <div className="input-group-btn">
                          <button className="btn btn-sm btn-primary btn-minus" 
                             onClick={()=>handleReduction(item.product,item.quantity)}>
                          <i className="fa fa-minus"></i>
                          </button>
                      </div>
                      <input type="text" disabled 
                          className="form-control form-control-sm bg-secondary text-center" 
                          value={item.quantity}/>
                      <div className="input-group-btn">
                          <button className="btn btn-sm btn-primary btn-plus" 
                             onClick={()=>handleIncrease(item.product,item.quantity)}>
                              <i className="fa fa-plus"></i>
                          </button>
                      </div>
                  </div>
              </td>
              <td className="align-middle">{showSumPrice(item.product.price,item.quantity)}
              </td>
              <td className="align-middle">
                  <button className="btn btn-sm btn-primary" onClick={()=>onDeleteItem(item.product)}>
                      <i className="fa fa-times"></i>
                  </button>
              </td>
          </tr>
            )
          }):<tr><td colSpan={7} style={{'textAlign':'center',"color":'red'}}>Cart hollow</td></tr>
   );
}

export default Items;