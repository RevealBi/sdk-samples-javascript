package com.server.reveal;

import com.infragistics.reveal.sdk.api.IRVUserContext;
import com.infragistics.reveal.sdk.api.IRVUserContextProvider;
import com.infragistics.reveal.sdk.base.RVUserContext;

import java.util.HashMap;

public class UserContextProvider implements IRVUserContextProvider {
    @Override
    public IRVUserContext getUserContext() {
        // this can be used to store values coming from the request.
        var props = new HashMap<String, Object>();

        //add the sales-person-id property
        props.put("sales-person-id", 279);

        return new RVUserContext("user identifier", props);
    }
}
