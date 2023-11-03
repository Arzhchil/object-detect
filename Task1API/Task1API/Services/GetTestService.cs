using Task1API.Interface;
using Task1API.Models;

namespace Task1API.Services
{
    public class GetTestService : IGetTest
    {
        private static List<TestGetModel> models = new List<TestGetModel>()
        {
            new TestGetModel()
            {
                firstName = "Danila",
                middleName = "Sergeevich"
            },
            new TestGetModel() 
            {
                firstName = "Arzhan",
                middleName = "Alexandrovich"
            }
        };
        /// <summary>
        /// test service
        /// </summary>
        /// <returns></returns>
        public List<TestGetModel> TestData()
        {
            return models;
        }
    }
}
