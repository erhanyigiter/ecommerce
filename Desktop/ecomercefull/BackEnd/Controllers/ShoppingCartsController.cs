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
    public class ShoppingCartsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public ShoppingCartsController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/ShoppingCarts
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ShoppingCart>>> GetShoppingCarts()
        {
            return await _context.ShoppingCarts.Include(sc => sc.Product).ToListAsync();
        }

        // GET: api/ShoppingCarts/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ShoppingCart>> GetShoppingCart(int id)
        {
            var shoppingCart = await _context.ShoppingCarts.Include(sc => sc.Product)
                                                           .FirstOrDefaultAsync(sc => sc.Id == id);

            if (shoppingCart == null)
            {
                return NotFound();
            }

            return shoppingCart;
        }

        // PUT: api/ShoppingCarts/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutShoppingCart(int id, ShoppingCart shoppingCart)
        {

            _context.Entry(shoppingCart).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ShoppingCartExists(id))
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

        // POST: api/ShoppingCarts
        // POST: api/ShoppingCarts
        [HttpPost]
        public async Task<ActionResult<ShoppingCart>> PostShoppingCart(ShoppingCart shoppingCart)
        {
            // Product kontrolü
            if (shoppingCart.Product == null)
            {
                return BadRequest(new { message = "The Product field is required." });
            }

            // Optional: ProductId üzerinden de kontrol yapılabilir
            var product = await _context.Products.FindAsync(shoppingCart.ProductId);
            if (product == null)
            {
                return BadRequest(new { message = "Invalid ProductId" });
            }

            // Product bilgisi veritabanından alındıktan sonra eklenebilir
            shoppingCart.Product = product;

            _context.ShoppingCarts.Add(shoppingCart);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetShoppingCart", new { id = shoppingCart.Id }, shoppingCart);
        }


        // DELETE: api/ShoppingCarts/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteShoppingCart(int id)
        {
            var shoppingCart = await _context.ShoppingCarts.FindAsync(id);
            if (shoppingCart == null)
            {
                return NotFound();
            }

            _context.ShoppingCarts.Remove(shoppingCart);
            await _context.SaveChangesAsync();

            return NoContent();
        }
        // DELETE: api/ShoppingCarts
        [HttpDelete]
        public async Task<IActionResult> ClearShoppingCarts()
        {
            var allCarts = await _context.ShoppingCarts.ToListAsync();
            if (allCarts.Count == 0)
            {
                return NotFound(new { message = "There are no items in the cart to delete." });
            }

            _context.ShoppingCarts.RemoveRange(allCarts);
            await _context.SaveChangesAsync();

            return NoContent();
        }


        private bool ShoppingCartExists(int id)
        {
            return _context.ShoppingCarts.Any(e => e.Id == id);
        }
    }
}
