using RevealSdk.Server.Business;

namespace RevealSdk.Server.Data
{
    public class SalesDataGenerator
    {
        private static string[] _products = new string[4] { "Apple", "Grape", "Orage", "Banana" };
        private static string[] _sellerNames = new string[8] { "Ellen Adams", "Lisa Andrews", "William Fox", "Walter Harp", "Jessica Oxley", "Misty Shock", "Chris Meyer", "Jay Calvin" };
        private static string[] _cities = new string[6] { "Tokyo", "Shanghai", "Beijing", "Singapore", "New York", "Seoul" };
        private static readonly Random Random = new Random();
        public static List<Sale> GenerateSales(int numberOfSales)
        {
            List<Sale> sales = new List<Sale>();

            for (double i = 0; i < numberOfSales; i++)
            {
                Sale sale = new Sale
                {
                    Quarter = "Q " + i,
                    Value = GetRandomPrice(),
                    Date = GetRandomDate(),
                    Product = GerRandomProduct(),
                    NumberOfUnits = GetRandomNumUnits(),
                    Seller = GetRandomSeller()
                };
                sales.Add(sale);
            }
            return sales;
        }

        private static Seller GetRandomSeller()
        {
            return new Seller
            {
                City = GetRandomCity(),
                Name = GetRandomSellerName()
            };
        }

        private static string GetRandomSellerName()
        {
            Random a = new Random(Random.Next());
            int length = _sellerNames.Length;
            int RandomMaxLength = a.Next(length) % 2 == 0 ? a.Next(length) : length;
            return _sellerNames[a.Next(RandomMaxLength)];
        }

        private static string GetRandomCity()
        {
            Random a = new Random(Random.Next());
            int length = _cities.Length;
            int RandomMaxLength = a.Next(length) % 2 == 0 ? a.Next(length) : length;
            return _cities[a.Next(RandomMaxLength)];
        }

        private static int GetRandomNumUnits()
        {
            Random a = new Random(Random.Next());
            return a.Next(1, 100);
        }

        private static Product GerRandomProduct()
        {
            return new Product
            {
                Name = GetRandomProductName(),
                UnitPrice = GetRandomPrice()
            };
        }

        private static double GetRandomPrice()
        {
            Random a = new Random(Random.Next());
            return a.NextDouble() * 1000;
        }

        private static string GetRandomProductName()
        {
            Random a = new Random(Random.Next());
            int length = _products.Length;
            int RandomMaxLength = a.Next(length) % 2 == 0 ? a.Next(length) : length;
            return _products[a.Next(RandomMaxLength)];
        }

        private static DateTime GetRandomDate()
        {
            Random a = new Random(Random.Next());
            int day = a.Next(1, 28);
            int month = a.Next(1, 13);
            int year = a.Next(2016, 2020);

            return new DateTime(year, month, day);
        }
    }
}
