## Loading Dashboards from a File in a JavaScript App
In this source, you can change the following line to use an existing cloud-deployed Reveal Server deployment:


In the:  **/LoadingDashboards-File/client/index.html**

Replace the `setBaseUrl` 

from:
`$.ig.RevealSdkSettings.setBaseUrl("https://localhost:7111/");`   

to: 
`$.ig.RevealSdkSettings.setBaseUrl('https://samples.revealbi.io/upmedia-backend/reveal-api/');`

In the `loadDashboard` method, you can change **Sales** to:

- Manufacturing

- Marketing
- Campaigns

This will give you a feel for loading different dashboards.

To learn how to create a Reveal Server with the .NET Core SDK, so you can use this same sample with `localhost` and your own dashboards, watch this video:

https://youtu.be/nYKSOG1dCNc

To watch a video that walks through creating this example of loading a dashboard from a cloud-deployed Reveal Server, click here:

