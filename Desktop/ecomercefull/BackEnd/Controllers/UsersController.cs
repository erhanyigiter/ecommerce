using ecomercefull.DataAccesLayer;
using ecomercefull.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

[ApiController]
[Route("api/[controller]")]
public class UsersController : ControllerBase
{
    private readonly ApplicationDbContext _context;

    public UsersController(ApplicationDbContext context)
    {
        _context = context;
    }

    // GET: api/Users
    [HttpGet]
    public async Task<ActionResult<IEnumerable<User>>> GetUsers()
    {
        if (_context.Users == null)
        {
            return Problem("Entity set 'ApplicationDbContext.Users'  is null.");
        }
        return await _context.Users.ToListAsync();
    }

    // GET: api/Users/5
    [HttpGet("{id}")]
    public async Task<ActionResult<User>> GetUser(int id)
    {
        if (_context.Users == null)
        {
            return NotFound();
        }
        var user = await _context.Users.FindAsync(id);

        if (user == null)
        {
            return NotFound();
        }

        return user;
    }

    // PUT: api/Users/5
    [HttpPut("{id}")]
    public async Task<IActionResult> PutUser(int id, User user)
    {

        _context.Entry(user).State = EntityState.Modified;

        try
        {
            await _context.SaveChangesAsync();
        }
        catch (DbUpdateConcurrencyException)
        {
            if (!UserExists(id))
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

    // POST: api/Users
    [HttpPost]
    public async Task<ActionResult<User>> PostUser(User user)
    {
        if (_context.Users == null)
        {
            return Problem("Entity set 'ApplicationDbContext.Users'  is null.");
        }
        _context.Users.Add(user);
        await _context.SaveChangesAsync();

        return CreatedAtAction("GetUser", new { id = user.Id }, user);
    }

    // DELETE: api/Users/5
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteUser(int id)
    {
        if (_context.Users == null)
        {
            return NotFound();
        }
        var user = await _context.Users.FindAsync(id);
        if (user == null)
        {
            return NotFound();
        }

        _context.Users.Remove(user);
        await _context.SaveChangesAsync();

        return NoContent();
    }

    // Kullanıcıların toplam sayısını döndürür.
    // GET: api/Users/total
    [HttpGet("total")]
    public async Task<ActionResult<int>> GetTotalUsers()
    {
        // Veri tabanındaki kullanıcıların sayısını asenkron olarak sayar.
        int totalUsers = await _context.Users.CountAsync();
        // Toplam kullanıcı sayısını döner.
        return Ok(totalUsers);
    }

    private bool UserExists(int id)
    {
        return (_context.Users?.Any(e => e.Id == id)).GetValueOrDefault();
    }
}
