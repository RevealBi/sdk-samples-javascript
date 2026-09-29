package com.server.reveal;

import io.revealbi.core.IRVUserContext;
import io.revealbi.core.RVUserContext;
import io.revealbi.servlet.IRVServletUserContextProvider;

import jakarta.servlet.http.HttpServletRequest;
import java.util.HashMap;

public class UserContextProvider implements IRVServletUserContextProvider {
    @Override
    public IRVUserContext getUserContext(HttpServletRequest request) {
        // this can be used to store values coming from the request.
        var props = new HashMap<String, Object>();

        //get the sales-person-id header set on the client
        var salesPersonId = request.getHeader("x-sales-person-id");

        //add the sales-person-id property
        props.put("sales-person-id", salesPersonId);

        return new RVUserContext("user identifier", props);
    }
}
