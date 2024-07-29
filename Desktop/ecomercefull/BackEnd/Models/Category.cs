using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;
using ecomercefull.Models.Abstract;

namespace ecomercefull.Models
{
    public class Category : CommonProp
    {
        public string? ImageUrl { get; set; }
        [JsonIgnore] // Serileştirme sırasında döngüsel referanslardan kaçınmak için eklenmiştir

        public List<Product>? Products { get; set; }

    }
}