using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ecomercefull.Models.Abstract;

namespace ecomercefull.Models
{
   public class Order : CommonProp
    {
        public DateTime OrderDate { get; set; }
        public int UserId { get; set; }
        public User User { get; set; }
        public string ShippingAddress { get; set; }
        public ICollection<OrderDetail> OrderDetails { get; set; }
    }
}