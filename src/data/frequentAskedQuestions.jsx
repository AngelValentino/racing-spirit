export const frequentAskedQuestions = {
  delivery: [
    {
      id: '000ccfa6-1e34-4d68-ae3f-97eb2aeff47b',
      title:'Order Processing',
      renderContent() {
        return (
          <>
            <p>
              We sew and dispatch all products in-house ourselves. All orders are expected to ship within 3 business days and are tracked worldwide. We do our best to work as fast as we can, ensuring you receive your order quickly, efficiently, and of the best quality.
            </p>
            <p>Thanks</p>
            <p>Racing Spirit</p>
          </>
        );
      } 
    },
    {
      id: 'f4867d78-7bae-42e0-ae3b-6b0dc0e2ef71',
      title:'UK Orders',
      renderContent() {
        return (
          <>
            <p>
              All UK orders are shipped with Royal Mail. 
              <br />
              Please allow up to 5 working days before contacting us.
            </p>
            <p>
              <strong>
                UK Shipping is Free on orders over £314.
                <br />
                In Orders below £314 Shipping is charged at £3.45 for standard 2-3 day delivery.
              </strong>
            </p>
            <p>
              While most orders are processed the next working day, please allow us 1-3 days to pack and dispatch your order. We always work as fast as we can to get your packages out of our door into your hands.
            </p>
          </>
        );
      } 
    },
    {
      id: '497a7bb0-3d84-4197-8610-21f1eabf0280',
      title:'EU Orders',
      renderContent() {
        return (
          <>
            <p>
              EU Orders should be delivered in 3-9 working days depending on the country.
            </p>
            <p>
              We ship all EU orders via Whistl.
            <br />
              You Should have an email with a tracking number, clicking the number should take you directly to the tracking link. If for some reason it doesn't, you can track your order here
              <br />
              <a className="slide-in-and-back-visible-underline" href="https://web.parcelhub.net/tracking/">https://web.parcelhub.net/tracking/</a>
            </p>
            <p>
              Once in your country Whistl will hand it to a national courier service to deliver to your door, this can also be found on the tracking link above.
            </p>
            <p>
              <strong>We Pre-Pay EU orders import VAT and Duties via our IOSS number. So you will not need to pay anything in the EU.</strong>
            </p>
            <p>
              <strong>
                EU Shipping is Free on orders above €368.
                <br />
                EU ordes below €368 are charged at €9.
              </strong>
            </p>
            <p>
              While most orders are processed the next working day, please allow us 1-3 days to pack and dispatch your order. We always work as fast as we can to get your packages out of our door into your hands.
            </p>
          </>
        );
      } 
    },
    {
      id: 'bbdbaae1-dfde-4377-888b-d5d568b69e9c',
      title:'USA Orders',
      renderContent() {
        return (
          <>
            <p>
              All USA orders are dispatched via Whistl and given to USPS to deliver to your door.
            </p>
            <p>
              Tracking can be found in your dispatch email with a tracking number, click that or track it here
              <br />
              <a className="slide-in-and-back-visible-underline" href="https://web.parcelhub.net/tracking/">https://web.parcelhub.net/tracking/</a>
            </p>
            <p>
              <strong>
                Deliveries usually take 4-9 working days.
                <br />
                You will NOT be charged any import fees for USA.
              </strong>
            </p>
            <p>
              <strong>
                Spend over $400 to get Free Shipping.
                <br />
                Orders up to $400 are charged at $12.
              </strong>
            </p>
            <p>
              While most orders are processed the next working day, please allow us 1-3 days to pack and dispatch your order. We always work as fast as we can to get your packages out of our door into your hands.
            </p>
          </>
        );
      } 
    },
    {
      id: '461bf389-dd57-4e75-a8b2-59844b70e48d',
      title:'Worldwide Orders',
      renderContent() {
        return (
          <>
            <p>
              All orders are dispatched via Landmark Global and given to a national courier to deliver to your door.
            </p>
            <p>
              Tracking can be found in your dispatch email with a tracking number starting with LT, click that or track it <a aria-label="Track your order on landmarkglobal.com." className="slide-in-and-back-visible-underline" href="https://track.landmarkglobal.com/">here</a>.
            </p>
            <p>
              <strong>
                Deliveries usually take 7-20 working days depending on the country.
              </strong>
            </p>
            <p>
              <strong>
                Spend over $400 for free shipping.
                <br />
                Shipping Orders up to $400 are charged at $12.
              </strong>
            </p>
            <p>
              While most orders are processed the next working day, please allow us 1-3 days to pack and dispatch your order. We always work as fast as we can to get your packages out of our door into your hands.
            </p>
          </>
        );
      } 
    },
    {
      id: 'aae6a2e6-32c5-4020-b7c0-8effb4b85e39',
      title:'Import Duties and Fees',
      renderContent() {
        return (
          <>
            <p>
              <strong>We Pre-Pay all EU import VAT and Duties via our IOSS number so you will NOT have any import fees.</strong>
            </p>
            <p>
              USA/ Aus/ EU will not receive any import fees.
            </p>
            <p>
              Although Canada imports are subject to import fees, we find that less than 5% of our customers are actually charged.
            </p>
          </>
        );
      } 
    },
    {
      id: '80221148-5104-4842-932a-6e04227d16ef',
      title:'Where is My Order?',
      renderContent() {
        return (
          <>
            <p>
              Tracking can be found in your dispatch email with a tracking number starting with LT, click that or track it <a aria-label="Track your order on landmarkglobal.com." className="slide-in-and-back-visible-underline" href="https://track.landmarkglobal.com/">here</a>.
              <br />
              If you havent seen an email with the subject line, "it's on its way" please check your spam folder.
              <br />
              If you are still not sure, email <strong>racingSpirit@gmail.com</strong>.
            </p>
          </>
        );
      } 
    },
  ],
  ordersAndPayment: [
    {
      id: '57ad46a6-c375-4288-8f69-7f2ae22ec64a',
      title:'Payment Methods',
      renderContent() {
        return (
          <>
            <p>
              We accept Paypal, Apple Pay, most major credit or debit cards, these include - Visa, Visa electro, Master Card, UK Maestro and American Express.
              <br />
              We also have the option of Clearpay and Klarna where you can pay in instalments or pay later.
            </p>
          </>
        );
      } 
    },
    {
      id: '9259a08b-02b3-482a-baf2-c451a4eacf98',
      title:'Klarna and Clearpay',
      renderContent() {
        return (
          <>
            <p>
              We work with Klarna and Clearpay to give you the option to pay later in installments.
            </p>
            <p>
              See more details at
              <br />
              <a className="slide-in-and-back-visible-underline" href="https://www.klarna.com/">Klarna</a>
              <br />
              <a className="slide-in-and-back-visible-underline" href="https://www.clearpay.com/">Clearpay</a>
            </p>
          </>
        );
      } 
    },
    {
      id: '3983e955-e222-49f4-b30d-df210ee9d427',
      title:'Can I Cancel or Amend my Order?',
      renderContent() {
        return (
          <>
            <p>
              Of course, but be quick to email <strong>racingSpirit@gmail.com</strong>.
              <br />
              We can only make changes before your order is dispatched. If it has already been dispatched, unfortunately, you will need to initiate an exchange or return the item to address the issue.
            </p>
          </>
        );
      } 
    }
  ],
  support: [
    {
      id: '264af105-8197-4006-8421-6dac84133cec',
      title:'Where Is My Order?',
      renderContent() {
        return (
          <>
            <p>
              Tracking can be found in your dispatch email with a tracking number starting with LT, click that or track it <a aria-label="Track your order on landmarkglobal.com." className="slide-in-and-back-visible-underline" href="https://track.landmarkglobal.com/">here</a>.
              <br />
              If you haven't seen an email with the subject line, "it's on its way" please check your spam folder.If your still not sure, email <strong>racingSpirit@gmail.com</strong>.
            </p>
          </>
        );
      }  
    },
    {
      id: '94eda498-e296-404e-8c86-3fd1b24c4832',
      title:'Returns and Exchanges',
      renderContent() {
        return (
          <>
            <p>
              We offer 60 days to exchange or refund anything on your order.
            </p>
            <p>
              Please send your order or item back to us with a note including your order number and whether you would like a refund, or specify the item and size you would like in exchange. We will process your request as soon as possible.
            </p>
            <p>Our returns address is</p>
            <address className="faqs-address">
              High Dive Apparel
              <hr className="address__text-spacing" />
              Unit C
              <hr className="address__text-spacing" />
              5 Harrow Road
              <hr className="address__text-spacing" />
              Hereford
              <hr className="address__text-spacing" />
              HR4 0EH
            </address>
            <p>
              We recommend using a tracked service if you are from outside the UE.
              <br />
              Unfortunately, we cannot provide shipping labels or prepaid shipping labels for returning items to us. As an independent company, unlike ASOS, we are unable to supply this. Return postage costs are your responsibility. If it's a return, we provide a full refund including the original shipping cost. If it's an exchange, we send the new item to you at no extra cost.
              <br />
              Thank you.
            </p>
          </>
        );
      }  
    },
    {
      id: '81796859-b7a6-407b-a1d9-ea283ccbf0aa',
      title:'Problem With My Order',
      renderContent() {
        return (
          <>
            <p>
              We are very sorry to hear this, we ready to help with anything!
            </p>
            <p>
              Email <a className="slide-in-and-back-visible-underline" href="mailto:racingSpirit@gmail.com">racingSpirit@gmail.com</a>
            </p>
            <p>
              and we will resolve anything needed as quickly as possible.
            </p>
          </>
        );
      }  
    },
    {
      id: 'e2c2409b-843f-4455-a5c9-6c00b44ba7a2',
      title:'Get In Touch',
      renderContent() {
        return (
          <>
            <p>
              We are ready to help with anything!
            </p>
            <p>
              Email <a className="slide-in-and-back-visible-underline" href="mailto:racingSpirit@gmail.com">racingSpirit@gmail.com</a>
            </p>
            <p>
              and we will resolve anything needed as quickly as possible.
            </p>
          </>
        );
      }  
    }
  ]
};