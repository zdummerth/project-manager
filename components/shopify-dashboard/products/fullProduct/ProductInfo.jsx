import Price from 'components/products/Price'

function ProductInfo({ title, descriptionHtml, price }) {
  console.log(price)
  return (
    <div>
      <h1>
        {title}
      </h1>
      <div
        dangerouslySetInnerHTML={{ __html: descriptionHtml }}
      />
      <div>
        <Price price={price} />
      </div>
    </div>
  )
}

export default ProductInfo
