using Microsoft.AspNetCore.Mvc;
using Task1API.Models;
using Task1API.Services;

namespace Task1API.Interface
{
    public interface IPostTest
    {
        public ActionResult<TestPostModel> Request(TestPostModel model);
    }
}
