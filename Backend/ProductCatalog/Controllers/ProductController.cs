using Microsoft.AspNetCore.Mvc;
using ProductCatalog.Models;

namespace ProductCatalog.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        private readonly ProductManager _productList;
        private readonly ILogger<ProductController> _logger;

        public ProductController(ProductManager productList, ILogger<ProductController> logger)
        {
            _productList = productList;
            _logger = logger;
        }

        [HttpGet]
        public IEnumerable<Product> Get()
        {
            _logger.LogInformation("Get all products");
            return _productList.Products;
        }

        [HttpPut]
        public IResult Put(Product product)
        {
            _logger.LogInformation("Put new product");
            return _productList.Add(product);
        }

        [HttpPost]
        public IResult Post(Product product)
        {
            _logger.LogInformation($"Change product by id: {product.Id}");
            return _productList.Update(product);
        }

        [HttpDelete]
        public IResult Delete(int id)
        {
            _logger.LogInformation($"Delete product product {id}");
            return _productList.Delete(id);
        }
    }
}
