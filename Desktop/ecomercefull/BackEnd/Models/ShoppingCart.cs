using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ecomercefull.Models
{
    public class ShoppingCart
    {
        public int Id { get; set; }
        public int ProductId { get; set; }
        public Product Product { get; set; }
        public int Quantity { get; set; }
    }
}