using Microsoft.AspNetCore.Mvc;
using Stripe;
using System.Threading.Tasks;

namespace ecommercefull.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PaymentsController : ControllerBase
    {
        public PaymentsController()
        {
            // Stripe API anahtarınızı burada ayarlayın
            StripeConfiguration.ApiKey = "sk_test_51PkWrJIWauXDMvpOW1Gr4MjkYd7u3BDEVJCyWaeFnIyeN2IzFIsxi7kDQhVCGmP8qFrNR9mxIQcrpeUjIsjnfC7b005ZCloNEK";
        }

        [HttpPost("charge")]
        public async Task<IActionResult> Charge([FromBody] PaymentRequest request)
        {
            // Request ve gerekli alanların null olup olmadığını kontrol edin
            if (request == null || string.IsNullOrEmpty(request.Token) || request.Amount <= 0)
            {
                return BadRequest(new { error = "Invalid payment request or missing parameters." });
            }

            try
            {
                // Ödeme miktarının minimum ve maksimum sınırlarını kontrol edin
                if (request.Amount < 50 || request.Amount > 1000000) // Örnek limitler
                {
                    return BadRequest(new { error = "Invalid amount. The amount must be between 50 and 1000000 cents." });
                }

                var options = new ChargeCreateOptions
                {
                    Amount = request.Amount,
                    Currency = "usd",
                    Description = "Example charge",
                    Source = request.Token, // Stripe token'ı frontend'den alınır
                };

                var service = new ChargeService();
                Charge charge = await service.CreateAsync(options);

                // Ödeme başarılıysa, başarı mesajı döndürülür
                return Ok(new { charge.Id, charge.Status });
            }
            catch (StripeException e)
            {
                // Ödeme başarısızsa, hata mesajı döndürülür
                return BadRequest(new { error = e.StripeError.Message });
            }
        }
    }

    public class PaymentRequest
    {
        public string Token { get; set; }
        public int Amount { get; set; } // Ödeme miktarı (cent cinsinden)
    }
}
