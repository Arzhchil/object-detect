using Microsoft.AspNetCore.Mvc;
using Task1API.Interface;
using Task1API.Models;

namespace Task1API.Services
{
    public class PostTestService : IPostTest
    {
        public ActionResult<TestPostModel> Request(TestPostModel model)
        {
            TestPostModel req = new TestPostModel()
            {
                value = 3 * model.value
            };
            return req;
        }
    }
}
