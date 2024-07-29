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
    public class CategoriesController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public CategoriesController(ApplicationDbContext context)
        {
            _context = context;
        }

        // Tüm kategorileri getirir.
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Category>>> GetCategories()
        {
            return await _context.Categories.ToListAsync();
        }

        // Belirli bir kategori getirir.
        [HttpGet("{id}")]
        public async Task<ActionResult<Category>> GetCategory(int id)
        {
            var category = await _context.Categories.FindAsync(id);

            if (category == null)
            {
                return NotFound();
            }

            return category;
        }

        // Belirli bir kategoriyi günceller.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutCategory(int id, Category category)
        {
           

            var existingCategory = await _context.Categories.FindAsync(id);
            if (existingCategory == null)
            {
                return NotFound();
            }

            existingCategory.Name = category.Name;
            existingCategory.Description = category.Description;
            existingCategory.ImageUrl = category.ImageUrl;
            existingCategory.IsStatus = category.IsStatus;

            _context.Update(existingCategory);

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CategoryExists(id))
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

        // Yeni bir kategori oluşturur.
        [HttpPost]
        public async Task<ActionResult<Category>> PostCategory(Category category)
        {
            _context.Categories.Add(category);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetCategory", new { id = category.Id }, category);
        }

        // Belirli bir kategoriyi siler.
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCategory(int id)
        {
            var category = await _context.Categories.FindAsync(id);
            if (category == null || category.IsDeleted)
            {
                return NotFound();
            }
            var hasStockProducts = await _context.Products.AnyAsync(p => p.CategoryId == id && p.Stock > 0);
            if (hasStockProducts)
            {
                return BadRequest("Bu kategoriye ait stoğu olan ürünler var. Kategoriyi silemezsiniz.");
            }

            category.IsDeleted = true;
            _context.Categories.Update(category);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        // Kategorilerin toplam sayısını döndürür.
        [HttpGet("total")]
        public async Task<ActionResult<int>> GetTotalCategories()
        {
            int totalCategories = await _context.Categories.CountAsync();
            return Ok(totalCategories);
        }

        private bool CategoryExists(int id)
        {
            return _context.Categories.Any(e => e.Id == id);
        }
    }
}
