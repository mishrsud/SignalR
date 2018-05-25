using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Logging.Abstractions;
using System;
using System.Collections.Generic;
using System.Text;

namespace Microsoft.AspNetCore.SignalR.Specification.Tests
{
    public class DefaultHubLifetimeManagerTests : HubLifetimeManagerTestsBase<MyHub>
    {
        public override HubLifetimeManager<MyHub> CreateNewHubLifetimeManager()
        {
            return new DefaultHubLifetimeManager<MyHub>(new Logger<DefaultHubLifetimeManager<MyHub>>(NullLoggerFactory.Instance));
        }
    }

    public class MyHub : Hub
    {

    }


}
