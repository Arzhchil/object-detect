using Task1API.Interface;

namespace Task1API.Services
{
    public class PostTestService : IPostTest
    {
        public int Request(int value)
        {
            return 3 * value;
        }
    }
}
