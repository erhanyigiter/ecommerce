using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.Identity.Client;

namespace ecomercefull.DataAccesLayer
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {

        }
        public DbSet<Models.Product> Products { get; set; } = null!;
        public DbSet<Models.Category> Categories { get; set; } = null!;

        public DbSet<Models.ShoppingCart> ShoppingCarts { get; set; } = null!;
        public DbSet<Models.User> Users { get; set; } = null!;
        public DbSet<Models.Order> Orders { get; set; } = null!;
        public DbSet<Models.OrderItem> OrderItems { get; set; } = null!;

    }
}