namespace RevealSdk.Server.Business
{
    public class Sale
    {
        internal Product Product { get; set; } = new Product();

        internal Seller Seller { get; set; } = new Seller();

        public string SalesPerson
        {
            get { return Seller.Name; }
            set { Seller.Name = value; }
        }

        public DateTime Date { get; set; }

        public string City
        {
            get { return Seller.City; }
            set { Seller.City = value; }
        }

        public string ProductName
        {
            get { return Product.Name; }
            set { Product.Name = value; }
        }

        internal double Value { get; set; }

        internal string Quarter { get; set; } = string.Empty;

        public int NumberOfUnits { get; set; }

        public double UnitPrice
        {
            get { return Product.UnitPrice; }
            set { Product.UnitPrice = value; }
        }

        public int AmountOfSale
        {
            get { return (int)UnitPrice * NumberOfUnits; }
            set { Product.UnitPrice = value / NumberOfUnits; }
        }
    }
}
