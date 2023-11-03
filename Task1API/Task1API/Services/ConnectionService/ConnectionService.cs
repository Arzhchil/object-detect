using System.Collections.Generic;
using Task1API.Controllers;
using Task1API.Interface;

namespace Task1API.Services.ConnectionService
{
    public class ConnectionService
    {
        /// <summary>
        /// создание сервисов
        /// </summary>
        /// <param name="builder"></param>
        public static void ConnectService(WebApplicationBuilder builder)
        {
            builder.Services.AddTransient<ITest, TestService>();
        }
    }
}
