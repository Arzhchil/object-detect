using Task1API.Interface;
using Task1API.Models;

namespace Task1API.Services
{
    public class TestService : ITest
    {
        private static List<TestModel> models = new List<TestModel>()
        {
            new TestModel()
            {
                firstName = "Danila",
                middleName = "Sergeevich"
            },
            new TestModel() 
            {
                firstName = "Arzhan",
                middleName = "Alexandrovich"
            }
        };
        /// <summary>
        /// test service
        /// </summary>
        /// <returns></returns>
        public List<TestModel> TestData()
        {
            return models;
        }
    }
}
