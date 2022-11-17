using Reveal.Sdk;
using RevealSdk.Server.Business;
using RevealSdk.Server.Data;

namespace RevealSdk.Server.Reveal
{
    public class MyInMemoryDataProvider: IRVDataProvider
    {
        RVInMemoryData<Sale> _salesInMemoryData = new RVInMemoryData<Sale>(SalesDataGenerator.GenerateSales(10000));

        public Task<IRVInMemoryData> GetData(IRVUserContext userContext, RVInMemoryDataSourceItem dataSourceItem)
        {
            if (dataSourceItem.DatasetId == "SalesRecords")
            {
                return Task.FromResult<IRVInMemoryData>(_salesInMemoryData);
            }
            else
            {
                throw new Exception("Invalid datasetId");
            }
        }
    }
}
