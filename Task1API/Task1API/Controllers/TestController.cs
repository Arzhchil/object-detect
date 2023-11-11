﻿using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Task1API.Interface;
using Task1API.Models;

namespace Task1API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TestController : ControllerBase
    {
        private readonly IGetTest _testGet;
        private readonly IPostTest _testPost;
        public TestController(IGetTest testGet, IPostTest testPost)
        {
            _testGet = testGet;
            _testPost = testPost;
        }

        [HttpGet("/getTest")]
        public ActionResult<List<TestGetModel>> GetTest()
        {
            try
            {
                var models = _testGet.TestData();
                return Ok(models);
            }
            catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("/postTest")]
        public ActionResult<TestPostModel> PostTest(TestPostModel model)
        {
            try
            {
                var req = _testPost.Request(model);
                return Ok(req);
            }
            catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}