using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Task1API.Interface;
using Task1API.Models;

namespace Task1API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TestController : ControllerBase
    {
        private readonly ITest _test;
        public TestController(ITest test)
        {
            _test = test;
        }

        [HttpPost("/postTest")]
        public ActionResult<List<TestModel>> PostTest()
        {
            try
            {
                var models = _test.TestData();
                return models;
            }
            catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("/getTest")]
        public ActionResult<int> GetTest(int value)
        {
            try
            {
                return 3 * value;
            }
            catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
