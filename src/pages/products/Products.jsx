import useFetch from "../../hooks/useFetch";

const Products = () => {
  const { data: jackets, loading, error} = useFetch('https://my-json-server.typicode.com/AngelValentino/racing-spirit-test-api/products');

  return ( 
    <>
      <h1>Jackets</h1> 
      <div style={{display: "grid", gridTemplateColumns: 'repeat(4, 1fr)', gap: "30px"}}>
        { error && <p>error</p> }
        { loading && <div>loading...</div> }
        {jackets && jackets.map((jacket, i) => (
            <div key={jacket.id}>
              <img style={{width: "100%"}} src={jacket.images[0].regular} alt="" />
              <h2>{`${i} - ${jacket.title}`}</h2>
              <p>{jacket.description.slice(0, 100)}...</p>
            </div>
        ))}
      </div>
    </>
  );
}
 
export default Products;