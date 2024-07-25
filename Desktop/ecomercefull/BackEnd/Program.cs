using ecomercefull.DataAccesLayer;
using Microsoft.EntityFrameworkCore;

internal class Program
{
    private static void Main(string[] args)
    {
        var builder = WebApplication.CreateBuilder(args);

        // Add services to the container.
        var connectionString = builder.Configuration.GetConnectionString("DefaultConnection")
                            ?? throw new InvalidOperationException("Connection string 'DefaultConnection' not found.");

        builder.Services.AddDbContext<ApplicationDbContext>(options =>
            options.UseSqlServer(connectionString)
        );
        
        builder.Services.AddDatabaseDeveloperPageExceptionFilter();
        builder.Services.AddEndpointsApiExplorer();
        builder.Services.AddSwaggerGen();
        
        builder.Services.AddControllers(); // Controllerları ekliyoruz

        builder.Services.AddCors(options =>
        {
            options.AddDefaultPolicy(policy =>
            {
                  policy.WithOrigins ("*")// her testte url değiştirmemek için * verdik
                      .AllowAnyHeader()
                      .AllowAnyMethod();
            });
        });

        var app = builder.Build();

        // Configure the HTTP request pipeline.
        if (app.Environment.IsDevelopment())
        {
            app.UseSwagger();
            app.UseSwaggerUI();
        }

        app.UseHttpsRedirection();
        app.UseCors(); // CORS'u etkinleştiriyoruz
        app.UseRouting();
        app.UseAuthorization();

        app.MapControllers(); // Controller endpointlerini haritalıyoruz

        app.Run();
    }
}
