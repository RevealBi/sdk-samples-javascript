using Reveal.Sdk;
using Reveal.Sdk.Data;
using Reveal.Sdk.Data.Rest;


namespace RevealSdk.Server
{
    internal class DataSourceProvider : IRVDataSourceProvider
    {
        public Task<RVDataSourceItem> ChangeDataSourceItemAsync(IRVUserContext userContext, string dashboardId, RVDataSourceItem dataSourceItem)
        {
            if (dataSourceItem is RVLocalFileDataSourceItem localDsi)
            {
                if (localDsi.Id == "NorthwindTraders")
                {
                    localDsi.Uri = "local:/Northwind Traders Corp Sales.xlsx";
                }
            }
            return Task.FromResult(dataSourceItem);
        }

        public Task<RVDashboardDataSource> ChangeDataSourceAsync(IRVUserContext userContext, RVDashboardDataSource dataSource)
        {
            if (dataSource is RVRESTDataSource restDs)
            {
                if (restDs.Id == "OrdersByCustomer")
                {
                    restDs.Id = "OrdersbyCustomer";
                    restDs.Title = "Rest : Orders by Customer";
                    restDs.Subtitle = "Azure Web API";
                    restDs.Url = $"https://northwindcloud.azurewebsites.net/api/customer_orders/" + userContext.UserId;
                    restDs.UseAnonymousAuthentication = true;
                }

                if (restDs.Id == "OrdersByCountry")
                {
                    restDs.Id = "OrdersByCountry";
                    restDs.Title = "Rest : Orders By Country";
                    restDs.Subtitle = "Excel2Json Fixed JSON File";
                    restDs.Url = $"https://excel2json.io/api/share/2d14c082-f49d-4e33-6a1c-08da3961564a";
                    restDs.UseAnonymousAuthentication = true;
                }

                if ((restDs.Id == "Customers"))
                {
                    restDs.Id = "Customers";
                    restDs.Title = "Rest: Customers";
                    restDs.Subtitle = "Azure Web API";
                    restDs.Url = $"https://northwindcloud.azurewebsites.net/api/customers";
                    restDs.UseAnonymousAuthentication = true;
                }

                if (restDs.Id == "TraderViewDashboard")
                {
                    restDs.Id = "TraderViewDashboard";
                    restDs.Title = "Rest : Trader View Dashboard";
                    restDs.Subtitle = "Excel2Json Fixed JSON File";
                    restDs.Url = $"https://excel2json.io/api/share/df6cf48c-8cf9-404d-4a6c-08db39d60f55";
                    restDs.UseAnonymousAuthentication = true;
                }
            }
            return Task.FromResult(dataSource);
        }
    }
}