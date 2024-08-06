using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace ecomercefull.Models
{
    public class OrderItem
    {
        public int Id { get; set; } // Order Item ID
        public int OrderId { get; set; } // İlişkili Sipariş ID'si
        public int ProductId { get; set; } // Ürün ID
        public string ProductName { get; set; } // Ürün adı
        public string Description { get; set; } // Ürün açıklaması
        public int Quantity { get; set; } // Ürün adedi
        public double Price { get; set; } // Ürün fiyatı
    }
}
