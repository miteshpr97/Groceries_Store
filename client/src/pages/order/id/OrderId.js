import 'bootstrap/dist/css/bootstrap.css';
import Logo from "../../../../src/shared/assets/logo.png"

import styles from './orderId.module.css';
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../../../components/loading/Loading";
import Order from '../../../shared/assets/tracking/order.png';
import { fetchOrder } from "../../../actions/orders";






const OrderId = () => {

    const { id } = useParams();
    const order = useSelector(state => state.orders.fetched);
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const onSuccess = () => {
            setLoading(false);
        }

        const onError = (e) => {
            console.log("order")
            setLoading(false);
            navigate('/404')
        }

        if (order && order.order_id === id)
            onSuccess();
        else
            dispatch(fetchOrder(id, onSuccess, onError))

    }, [dispatch, id, navigate, order]);

    const capitalizeFirst = (m) => {
        return m.charAt(0).toUpperCase() + m.slice(1).toLowerCase();
    }

    const getProgress = () => {
        switch (order?.status) {
            case 'PROCESSING':
                return 50;
            case 'FULFILLED':
                return 100;
            default:
                return 5
        }
    }



    if (loading)
        return <Loading />

    return (
        <div className={styles['wrapper']}>
            <div className={'heading'}>
                <h1>Track Order</h1>
            </div>
            <div className={styles['sub']}>
                Order <span>#{order.order_id}</span>
            </div>
            <div className={styles['full-progress']}>
                <div className={styles['progress']} style={{ width: getProgress() + '%' }}>
                    <img className={styles['img']}
                        style={{ transform: order.status === 'CANCELLED' ? 'scaleX(-1)' : '' }} src={Order}
                        alt={'Order'} />
                </div>
            </div>
            <div className={styles['status']}>
                <span className={styles['update']}>Order Update:</span> Your order has
                been {capitalizeFirst(order.status)}.
            </div>
            {order.status === 'FULFILLED' &&
                <Link className={styles['shipping']} to={`/shipping/${order.order_id}`}>Track Shipping</Link>}

            {/* 
            <button>

                <Link to="/invoice/:id">Click me</Link>
            </button> */}

            <div className="App container mt-5">
                <div id="divToPrint" className="m-3">
                    <div class="row d-flex justify-content-center">
                        <div class="col-md-8">
                            <div class="card">
                                <div class="d-flex justify-content-center flex-row p-2">
                                    <div class="d-flex  flex-column"> <span class="font-weight-bold fs-1"> Invoice</span> <br /> <span class="fs-5 3h">#{order.order_id}</span></div>

                                </div>

                                <hr />
                                <div class="table-responsive p-2">
                                    <table class="table table-borderless">
                                        <tbody>
                                            <tr class="add">
                                                <td> Bill To</td>
                                                <img src={Logo} alt={'Rabbit'} />

                                            </tr>
                                            <tr class="content">
                                                <td class="font-weight-bold">{order.name.first} {order.name.last} <br /> {order.address.area} {order.address.city} {order.address.country} <br /> {order.phone_number} <br /> {order.email}   </td>

                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <hr />
                                <div class="products p-2">
                                    <table class="table table-borderless">
                                        <tbody>
                                            <tr class="add">
                                                <td>Product name</td>
                                                <td>quantity</td>
                                                {/* <td>Price</td>
                                                <td class="text-center">Total</td> */}
                                            </tr>

                                            {/* <tr class="content">
                                                <td>Website Redesign</td>
                                                <td>{order.products.quantity}</td>

                                            </tr> */}
                                            {/* <tr class="content">
                                                <td>Logo & Identity</td>
                                                <td>{order.products.quantity}</td>

                                            </tr> */}
                                            
                                                {order.products.map((product, index) => (
                                                   
                                                    <tr key={index}>
                                                        <p> {product.name}</p> 
                                                        <p>{product.quantity}</p>                                                            
                                                    </tr>

                                                    
                                                ))}





                                                {/* <td>{order.products.quantity}</td> */}

                                           
                                        </tbody>
                                    </table>
                                </div>
                                <hr />
                                <div class="products p-2">
                                    <table class="table table-borderless">
                                        <tbody>
                                            <tr class="add">
                                                <td></td>
                                                <td>Total</td>

                                                <td class="text-center">{order.total}</td>
                                            </tr>
                                            {/* <tr class="content">
                                                <td></td>
                                                <td>$40,000</td>
                                                <td>2,500</td>
                                                <td class="text-center">$42,500</td>
                                            </tr> */}
                                        </tbody>
                                    </table>
                                </div>
                                <hr />
                                {/* <div class="address p-2">
                                    <table class="table table-borderless">
                                        <tbody>
                                            <tr class="add">
                                                <td>Bank Details</td>
                                            </tr>
                                            <tr class="content">
                                                <td> Bank Name : ADS BANK <br /> Swift Code : 00220022 <br /> Account Holder : Jassa Pepper <br /> Account Number : 6953PO789 <br /> </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div> */}
                            </div>
                        </div>
                    </div>
                </div>


            </div>

        </div>


    );
}







export default OrderId;

