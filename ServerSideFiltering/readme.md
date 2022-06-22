## Filtering Data Source from server side

This example was do with a local SQL server DataBase Source. 
For this to work right it is necessary create a data base  in your local SQL Server, whose name for this example will be `NorthwindTraders` 


In case you do not have SQL Server installed, you can download form the following link:  https://www.microsoft.com/es-es/sql-server/sql-server-downloads


After the database was created we must implement the model and data for this we will execute the script **sample-model.sql** and **sample-data.sql** in that order, remember to check that they are being inserted in the table `NorthwindTraders`. The scripts can be downloaded from the following link: https://www.dofactory.com/sql/download-sample-database


In this example the DB login is done with SQL Server credentials instead of Windows Authentication mode.  
    The credentials used are:
        User: Reveal
        Password: Reveal

If you do not know how to enable this option follow the instructions in the following link: https://docs.microsoft.com/en-us/sql/relational-databases/security/authentication-access/create-a-login?view=sql-server-ver16


In case you want to use an already existing database we indicate below where which elements should be modified:
    To change the host, name and description of the database we must modify **index.html** on client side.
    To change the credential for conect to data base we must modify **AuthenticationProvider.cs** from server side
    To change the filters we must modify **ServerSideFiltering.cs** from server side.
