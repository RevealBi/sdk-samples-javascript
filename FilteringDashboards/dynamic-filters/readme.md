# Dynamic Filters in Reveal BI SDK  
A sample project demonstrating how to dynamically pass parameters from your application to the server and generate dashboards using the :contentReference[oaicite:0]{index=0}. This shows how to execute custom queries/functions in your database based on user-context filters, custom headers, and dynamic dashboard creation.

---

## 🎥 Watch the Demo  
[![Dynamic Filters in Reveal BI SDK Demo](https://img.youtube.com/vi/Xht7Xs7svVY/maxresdefault.jpg)](https://youtu.be/Xht7Xs7svVY)

---

## 📌 What This Project Covers  
- How to pass user-context values (like `UserID`) to the server via custom headers (`xHeader1`)  
- Using a `UserContextProvider`, `DataSourceItem`, and `ChangeDataSourceItemAsync` to execute a database function or stored procedure with parameters  
- Dynamically creating dashboards/grids in the server using the Reveal SDK DOM  
- Client side: setting up `setAdditionalHeadersProvider`, listening for variable changes, and refreshing dashboard data with `refreshDashboardData()`  
- Sample scenario: User picks a customer ID, header is updated, server executes `custordersorders(UserID)`, and dashboard refreshes to reflect data for the chosen user  

---

## 🧑‍💻 Getting Started  
1. Clone this repository  
   ```bash
   git clone https://github.com/RevealBi/sdk-samples-javascript/tree/main/FilteringDashboards/dynamic-filters.git

