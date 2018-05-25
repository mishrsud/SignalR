//using Microsoft.Extensions.Logging;
//using Microsoft.Extensions.Logging.Abstractions;
//using System;
//using System.Collections.Generic;
//using System.Text;
//using System.Threading.Tasks;
//using Xunit;

//namespace Microsoft.AspNetCore.SignalR.Common.Tests
//{
//    public class CustomHubLifetimeManagerTests : HubLifeTimeManagerTestsBase<MyHub>
//    {
//        public override HubLifetimeManager<MyHub> GetNewHubLifetimeManager()
//        {
//            return new DefaultHubLifetimeManager<MyHub>(new Logger<DefaultHubLifetimeManager<MyHub>>(NullLoggerFactory.Instance));
//        }

//        [Fact]
//        public async Task SendConnectionAsyncOnNonExistentConnectionNoops()
//        {
//            var manager = GetNewHubLifetimeManager();
//            await manager.SendConnectionAsync("NotARealConnectionId", "Hello", new object[] { "World" }).OrTimeout();
//        }

//        [Fact]
//        public async Task AddGroupOnNonExistentConnectionNoops()
//        {
//            var manager = GetNewHubLifetimeManager();
//            await manager.AddToGroupAsync("NotARealConnectionId", "MyGroup").OrTimeout();
//        }

//        [Fact]
//        public async Task RemoveGroupOnNonExistentConnectionNoops()
//        {
//            var manager = GetNewHubLifetimeManager();
//            await manager.RemoveFromGroupAsync("NotARealConnectionId", "MyGroup").OrTimeout();
//        }
//    }

//    public class MyHub : Hub
//    {

//    }

//}
