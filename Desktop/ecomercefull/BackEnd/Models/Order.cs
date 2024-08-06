using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace ecomercefull.Models
{
    public class Order
    {
        public int Id { get; set; } // Sipariş ID
        public DateTime OrderDate { get; set; } = DateTime.Now; // Sipariş tarihi
        public string ShippingAddress { get; set; } // Kargo adresi
        public string PaymentMethod { get; set; } // Ödeme yöntemi
        public string PaymentStatus { get; set; } // Ödeme durumu
        public string OrderStatus { get; set; } // Sipariş durumu
        public string TrackingId { get; set; } // Takip numarası
        public ICollection<OrderItem> OrderItems { get; set; } = new List<OrderItem>(); // Sipariş detayları
    }
}
