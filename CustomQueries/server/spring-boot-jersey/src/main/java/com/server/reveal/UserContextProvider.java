package com.server.reveal;

import com.infragistics.reveal.sdk.api.IRVUserContext;
import com.infragistics.reveal.sdk.base.RVUserContext;
import com.infragistics.reveal.sdk.rest.RVContainerRequestAwareUserContextProvider;

import javax.ws.rs.container.ContainerRequestContext;
import java.util.HashMap;

public class UserContextProvider extends RVContainerRequestAwareUserContextProvider {
    @Override
    public IRVUserContext getUserContext(ContainerRequestContext requestContext) {
        // this can be used to store values coming from the request.
        var props = new HashMap<String, Object>();

        //get the sales-person-id header set on the client
        var salesPersonId = requestContext.getHeaders().getFirst("x-sales-person-id");

        //add the sales-person-id property
        props.put("sales-person-id", salesPersonId);

        return new RVUserContext("user identifier", props);
    }
}
