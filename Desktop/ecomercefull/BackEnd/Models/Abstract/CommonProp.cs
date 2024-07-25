using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ecomercefull.Models.Abstract
{
    public abstract class CommonProp
    {
        public int Id { get; set; }
        public string? Name { get; set; }
        public string? Description { get; set; }
        public bool IsStatus { get; set; }
        public bool IsDeleted { get; set; }
    }
}