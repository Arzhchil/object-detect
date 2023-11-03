using Task1API.Interface;
using Task1API.Models;

namespace Task1API.Services
{
    public class PostTestService : IPostTest
    {
        public int Request(TestPostModel model)
        {
            int value = model.value * 3;
            return value;
        }
    }
}
