import React, {useEffect, useRef, useState} from 'react';
import PaymentSuccess from './PaymentSuccess';
import PaymentFailure from './PaymentSuccess';


function PayPalCheckout(props) {
    const paypal = useRef();
    const [transactionStatus, setTransactionStatus] = useState(null);


    useEffect(() => {
        window.paypal
            .Buttons({
                createOrder: (data, actions, err) => {
                    return actions.order.create({
                        intent: "CAPTURE",
                        purchase_units: [
                            {
                                description: "",
                                amount: {
                                    currency_code: "USD",
                                    value: 20.10,
                                    
                                },
                            },
                        ],
                    });
                },
                onApprove: async (data, actions) => {
                    const order = await actions.order.capture();

                    console.log("success", order);
                    setTransactionStatus("success");
                },
                onError: (err) => {
                    console.log(err);
                    setTransactionStatus("failure");
                },
            })
            .render(paypal.current);
    }, []);

    
    if (transactionStatus === "success") {
        return <PaymentSuccess />;
    }
    if (transactionStatus === "failure") {
        return <PaymentFailure />;
    }

  return (
    <div>
        <div ref={paypal}></div>
    </div>
  );
}

export default PayPalCheckout;
