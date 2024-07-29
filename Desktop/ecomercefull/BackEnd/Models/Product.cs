using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;
using ecomercefull.Models.Abstract;

namespace ecomercefull.Models
{
    public class Product : CommonProp
    {
        [Range(0, int.MaxValue, ErrorMessage = "Stock must be a positive value/ Stok pozitif bir değer olmalıdır")]
        public int Stock { get; set; }

        [Range(0, double.MaxValue, ErrorMessage = "Price must be a positive value/ Fiyat pozitif bir değer olmalıdır")]
        public double Price { get; set; }
        public string? ImageUrl { get; set; }
        public int CategoryId { get; set; }
        [JsonIgnore] // Serileştirme sırasında döngüsel referanslardan kaçınmak için eklenmiştir
        public Category? Category { get; set; }

    }
}