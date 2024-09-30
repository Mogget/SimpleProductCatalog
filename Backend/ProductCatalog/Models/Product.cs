using System.ComponentModel.DataAnnotations;

namespace ProductCatalog.Models
{
    public class Product
    {
        public int Id { get; set; }

        [Required(ErrorMessage = "Code is required")]
        public string Code { get; set; } = string.Empty;

        [Required(ErrorMessage = "Name is required")]
        public string Name { get; set; } = string.Empty;

        public string? Description { get; set; }

        [Range(double.Epsilon, double.MaxValue, ErrorMessage = "Price must be grether then 0")]
        public double Price { get; set; }

        public DateTime? Modified { get; set; }
    }
}
