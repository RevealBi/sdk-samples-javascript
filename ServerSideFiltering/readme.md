## Filtering Data Source from server side

This example was done with a local SQL Server DataBase Source. In case you do not have SQL Server installed, you can download it from the following link:  https://www.microsoft.com/es-es/sql-server/sql-server-downloads

It is necessary to create a database in your local SQL Server, for this example we will use `Northwind`. The script can be downloaded from following links: 
- Instructions: https://docs.microsoft.com/en-us/dotnet/framework/data/adonet/sql/linq/downloading-sample-databases
- Script: https://github.com/microsoft/sql-server-samples/raw/master/samples/databases/northwind-pubs/instnwnd.sql

In this example the DB login is done with SQL Server credentials instead of Windows Authentication mode.  
The credentials used are: 
- User: Reveal 
- Password: Reveal

If you do not know how to enable this option, follow the instructions in the following link: https://docs.microsoft.com/en-us/sql/relational-databases/security/authentication-access/create-a-login?view=sql-server-ver16

In case you want to use an already existing database, we indicate below which elements should be modified:
- To change the host, name and description of the database we must modify **index.html** on client side.
- To change the credential for connect to database we must modify **AuthenticationProvider.cs** from server side.
- To change the filters we must modify **ServerSideFiltering.cs** from server side.
