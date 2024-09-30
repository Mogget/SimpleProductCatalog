namespace ProductCatalog.Models
{
    public class ProductManager
    {
        public List<Product> Products { get; set; } = new List<Product>();

        public IResult Add(Product product)
        {
            product.Id = Products.Count() == 0 ? 1 : Products.Max(x => x.Id) + 1;
            product.Modified = DateTime.Now;
            if (this.Products.Any(x => x.Code == product.Code))
            {
                return Results.ValidationProblem(new Dictionary<string, string[]>() { { nameof(product.Code), new string[] { "Code exists" } } });
            }
            this.Products.Add(product);
            return Results.Ok();
        }

        public IResult Update(Product product)
        {
            if (this.Products.Any(x => x.Code == product.Code && x.Id != product.Id))
            {
                return Results.ValidationProblem(new Dictionary<string, string[]>() { { nameof(product.Code), new string[] { "Code exists" } } });
            }

            var editProduct = this.Products.FirstOrDefault(x => x.Id == product.Id);
            if (editProduct != null)
            {
                return Results.ValidationProblem(new Dictionary<string, string[]>() { { nameof(product), new string[] { "Product not exists" } } });
            }
            if (editProduct.Modified == product.Modified)
            {
                editProduct.Code = product.Code;
                editProduct.Name = product.Name;
                editProduct.Description = product.Description;
                editProduct.Price = product.Price;
                editProduct.Modified = DateTime.Now;
            }
            else
            {
                return Results.ValidationProblem(new Dictionary<string, string[]>() { { nameof(product), new string[] { "Product was modified" } } });
            }
            return Results.Ok();
        }

        public IResult Delete(int id)
        {
            this.Products.RemoveAll(x => x.Id == id);
            return Results.Ok();
        }
    }
}
