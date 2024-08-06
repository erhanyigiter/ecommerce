using ecomercefull.DataAccesLayer;
using ecomercefull.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ecommercefull.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class OrdersController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public OrdersController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/Orders
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Order>>> GetOrders()
        {
            return await _context.Orders.Include(o => o.OrderDetails).ThenInclude(od => od.Product).ToListAsync();
        }

        // GET: api/Orders/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Order>> GetOrder(int id)
        {
            var order = await _context.Orders.Include(o => o.OrderDetails)
                                             .ThenInclude(od => od.Product)
                                             .FirstOrDefaultAsync(o => o.Id == id);

            if (order == null)
            {
                return NotFound();
            }

            return order;
        }

        // PUT: api/Orders/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutOrder(int id, Order order)
        {
            

            _context.Entry(order).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!OrderExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

// POST: api/Orders
[HttpPost]
public async Task<ActionResult<Order>> PostOrder(Order order)
{
    // OrderDetails içindeki Order ve Product nesnelerini set et
    foreach (var detail in order.OrderDetails)
    {
        detail.Order = order; // Order'ı set et

        // ProductId kullanarak ilgili Product nesnesini veritabanından al
        detail.Product = await _context.Products.FindAsync(detail.ProductId);

        // Product bulunamazsa hata döndür
        if (detail.Product == null)
        {
            return BadRequest($"Product with ID {detail.ProductId} not found.");
        }
    }

    // Order nesnesini veritabanına ekle
    _context.Orders.Add(order);
    await _context.SaveChangesAsync();

    // Yeni oluşturulan order'ın bilgilerini döndür
    return CreatedAtAction("GetOrder", new { id = order.Id }, order);
}





        // DELETE: api/Orders/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteOrder(int id)
        {
            var order = await _context.Orders.FindAsync(id);
            if (order == null)
            {
                return NotFound();
            }

            _context.Orders.Remove(order);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        // GET: api/Orders/total
        [HttpGet("total")]
        public async Task<ActionResult<int>> GetTotalOrders()
        {
            int totalOrders = await _context.Orders.CountAsync();
            return Ok(totalOrders);
        }

        private bool OrderExists(int id)
        {
            return _context.Orders.Any(e => e.Id == id);
        }
    }
}
