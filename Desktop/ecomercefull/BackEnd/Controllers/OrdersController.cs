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
            return await _context.Orders
                .Include(o => o.OrderItems)
                .ToListAsync();
        }

        // GET: api/Orders/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Order>> GetOrder(int id)
        {
            var order = await _context.Orders
                .Include(o => o.OrderItems)
                .FirstOrDefaultAsync(o => o.Id == id);

            if (order == null)
            {
                return NotFound();
            }

            return order;
        }

        // PUT: api/Orders/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutOrder(int id, [FromBody] Order updatedOrder)
        {
            if (id != updatedOrder.Id)
            {
                return BadRequest();
            }

            _context.Entry(updatedOrder).State = EntityState.Modified;

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

        // PATCH: api/Orders/5/updateStatus
        [HttpPatch("{id}/updateStatus")]
        public async Task<IActionResult> UpdateOrderStatus(int id, [FromBody] OrderStatusUpdateDto updateDto)
        {
            var order = await _context.Orders.FindAsync(id);
            if (order == null)
            {
                return NotFound();
            }

            // Sadece orderStatus alanını güncelle
            if (!string.IsNullOrEmpty(updateDto.OrderStatus))
            {
                order.OrderStatus = updateDto.OrderStatus;
            }

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
            foreach (var item in order.OrderItems)
            {
                var product = await _context.Products
                    .Where(p => p.Id == item.ProductId)
                    .FirstOrDefaultAsync();

                if (product != null)
                {
                    item.ProductName = product.Name;
                    item.Description = product.Description;
                }
                else
                {
                    // Ürün bulunamazsa varsayılan değerler ata veya hata ver
                    item.ProductName = "Unknown Product";
                    item.Description = "No Description";
                }
            }

            _context.Orders.Add(order);

            try
            {
                await _context.SaveChangesAsync();
                return CreatedAtAction("GetOrder", new { id = order.Id }, order);
            }
            catch (Exception ex)
            {
                // Hata loglama
                Console.WriteLine($"Error in PostOrder: {ex.Message}");
                return BadRequest(new { message = ex.Message });
            }
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

        // GET: api/Orders/track/{trackingId}
        [HttpGet("track/{trackingId}")]
        public async Task<ActionResult<Order>> GetOrderByTrackingId(string trackingId)
        {
            var order = await _context.Orders
                .Include(o => o.OrderItems)
                .FirstOrDefaultAsync(o => o.TrackingId == trackingId);

            if (order == null)
            {
                return NotFound();
            }

            return order;
        }

        private bool OrderExists(int id)
        {
            return _context.Orders.Any(e => e.Id == id);
        }

        // DTO Class
        public class OrderStatusUpdateDto
        {
            public string OrderStatus { get; set; }
        }
    }
}
