using Reveal.Sdk;

namespace RevealSdk.Server.SDK
{
    public class ServerSideFiltering : IRVObjectFilter
    {
        public Task<bool> Filter(IRVUserContext userContext, RVDashboardDataSource dataSource) // this is a filter that goes through all base of date on the server
        {
            var allowedList = new List<String>() { "NorthwindTraders" }; //here we indicate a list of databases with which we want to work

            if (dataSource != null)
            {
                if (dataSource is RVSqlServerDataSource) // we consult if it is a SQL DB
                {
                    RVSqlServerDataSource SqlDataSource = (RVSqlServerDataSource)dataSource;  // we cast the generic data source to SQL to be able to access its attributes
                    if (allowedList.Contains(SqlDataSource.Database)) return Task.FromResult(true); //if the name of database is includes in de allowed list return true
                }
            }
            return Task.FromResult(false); 
        }

        public Task<bool> Filter(IRVUserContext userContext, RVDataSourceItem dataSourceItem) // this is a filter that goes through all element on DB allowed
        {
            var excludedsList = new List<String>() { "Customer", "Supplier" }; // here we indicate a list of tables which we want to block

            if (dataSourceItem != null)
            {
                if (dataSourceItem is RVSqlServerDataSourceItem) // we consult if it is a SQL DB item
                {
                    RVSqlServerDataSourceItem SqlDataSourceItem = (RVSqlServerDataSourceItem)dataSourceItem;  // we cast the generic data source item to SQL item to be able to access its attributes
                    if (excludedsList.Contains(SqlDataSourceItem.Table)) return Task.FromResult(false); //if the name of table is excludeds list return false
                }
            }
            return Task.FromResult(true);
        }
    }
}
