using Reveal.Sdk;
using Reveal.Sdk.Data;
using Reveal.Sdk.Data.Microsoft.SqlServer;

namespace RevealSdk.Server.SDK
{
    public class ServerSideFiltering : IRVObjectFilter
    {
        public Task<bool> Filter(IRVUserContext userContext, RVDashboardDataSource dataSource) // this is a filter that goes through all databases on the server
        {
            var allowedList = new List<string>() { "Northwind" }; //here we indicate a list of databases with which we want to work

            if (dataSource != null)
            {
                if (dataSource is RVSqlServerDataSource dataSQL) // we consult if it is a SQL DB and cast the generic data source to SQL to be able to access its attributes
                {
                    if (allowedList.Contains(dataSQL.Database)) return Task.FromResult(true);
                }
            }
            return Task.FromResult(false); 
        }

        public Task<bool> Filter(IRVUserContext userContext, RVDataSourceItem dataSourceItem) 
        {
            var excludedList = new List<string>() { "Customers", "Suppliers" }; // here we indicate a list of tables which we want to block

            if (dataSourceItem != null)
            {
                if (dataSourceItem is RVSqlServerDataSourceItem dataSQLItem) // we consult if it is a SQL DB item and cast the generic data source item to SQL item to be able to access its attributes
                {
                    if (excludedList.Contains(dataSQLItem.Table)) return Task.FromResult(false); 
                }
            }
            return Task.FromResult(true);
        }
    }
}
