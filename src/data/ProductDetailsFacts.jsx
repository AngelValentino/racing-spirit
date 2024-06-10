export const ProductDetailsFacts = [
  {
    id: '13a9442c-a13c-41d5-8ae0-099aba4394a7',
    title:'description',
    renderContent(description) {
      return (
        <>
          <p className="accordion__details-text accordion__description">{description}</p>
          <img className="accordion__sizes-chart-img" src="https://cdn.shopify.com/s/files/1/0791/8790/2764/files/Screenshot2023-08-05at20.09.32_480x480.png?v=1691262589" alt="" />
        </>
      );
    } 
  }, 
  {
    id: 'f1973843-45a5-4ce6-b005-4be0fedc7392',
    title:'composition',
    renderContent() {
      return (
        <p className="accordion__details-text">Hand-sewn garmet made locally, only with the finest materials and the greatest tailors.</p>
      );
    } 
  }, 
  {
    id: '1f30f67e-488f-462d-acb0-3f2dccb47da1',
    title:'washing care',
    renderContent() {
      return (
        <ul className="accordion__wash-care-list">
          <li>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2">
                <path d="M3.486 7.965Q3.738 7.996 4 8c.79.009 1.539-.178 2-.5c.461-.32 1.21-.507 2-.5c.79-.007 1.539.18 2 .5c.461.322 1.21.509 2 .5c.79.009 1.539-.178 2-.5c.461-.32 1.21-.507 2-.5c.79-.007 1.539.18 2 .5c.461.322 1.21.509 2 .5c.17 0 .339-.014.503-.034" />
                <path d="m3 5l1.721 10.329A2 2 0 0 0 6.694 17h10.612a2 2 0 0 0 1.973-1.671L21 5M5 20h14" />
              </g>
            </svg>
            <p className="accordion__details-text">Washing machine, delicate cycle, maximum 30º</p>
          </li>
          <li>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 19h14m1.986-1.977a2 2 0 0 0-.146-.773L13.74 4a2 2 0 0 0-3.5 0l-.815 1.405M7.937 7.973L3.14 16.25A2 2 0 0 0 4.89 19M3 3l18 18" />
            </svg>
            <p className="accordion__details-text">Do not use bleach</p>
          </li>
          <li>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.048 16.033A9 9 0 0 0 7.954 3.958M5.633 5.64a9 9 0 0 0 12.733 12.723M3 3l18 18" />
            </svg>
            <p className="accordion__details-text">Do not use dryer</p>
          </li>
          <li>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 6h7.459a3 3 0 0 1 2.959 2.507l.577 3.464l.81 4.865A1 1 0 0 1 19.82 18H3a7 7 0 0 1 7-7h9.8M12 15h.01" />
            </svg>
            <p className="accordion__details-text">Ironing at low temperature (maximum 110º)</p>
          </li>
          <li>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2">
                <path d="M3 12a9 9 0 1 0 18 0a9 9 0 1 0-18 0" />
                <path d="M10 16V8h2.5a2.5 2.5 0 1 1 0 5H10" />
              </g>
            </svg>
            <p className="accordion__details-text">Dry clean</p>
          </li>
        </ul>
      );
    } 
  }, 
  {
    id: 'a6a7bfab-b4d3-43a5-b469-d8d944219724',
    title:'shipping information',
    renderContent() {
      return (
        <p className="accordion__details-text">We sew and despatch all products in house ourselves. All orders are expected to ship within 3 business days and are worldwide tracked.</p>
      );
    }
  }, 
  {
    id: '5181735f-5372-4ad6-aa0c-3bce71b96452',
    title:'ask a question',
    renderContent() {
      return (
      <p>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quaerat, perspiciatis?
      </p>
      );
    }
  }
];