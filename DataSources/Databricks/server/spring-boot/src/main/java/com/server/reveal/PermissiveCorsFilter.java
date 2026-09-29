package com.server.reveal;

import jakarta.servlet.Filter;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.ServletRequest;
import jakarta.servlet.ServletResponse;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.stereotype.Component;

import java.io.IOException;

@Component
public class PermissiveCorsFilter implements Filter {

	@Override
	public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
			throws IOException, ServletException {

		HttpServletResponse httpResponse = (HttpServletResponse) response;
		HttpServletRequest httpRequest = (HttpServletRequest) request;
		String origin = httpRequest.getHeader("Origin");
		String requestedMethod = httpRequest.getHeader("Access-Control-Request-Method");
		String requestedHeaders = httpRequest.getHeader("Access-Control-Request-Headers");

		httpResponse.setHeader("Access-Control-Allow-Origin", origin == null ? "*" : origin);
		httpResponse.setHeader("Vary", "Origin");
		httpResponse.setHeader("Access-Control-Allow-Methods", requestedMethod == null ? "GET, POST, PUT, DELETE, OPTIONS, HEAD" : requestedMethod);
		httpResponse.setHeader("Access-Control-Allow-Headers", requestedHeaders == null ? "X-Requested-With, Authorization, Accept-Version, Content-MD5, CSRF-Token, Content-Type, Cache-Control, Pragma" : requestedHeaders);
		httpResponse.setHeader("Access-Control-Expose-Headers", "*");
		httpResponse.setHeader("Access-Control-Allow-Credentials", "true");
		httpResponse.setHeader("Access-Control-Max-Age", "3600");

		if ("OPTIONS".equalsIgnoreCase(httpRequest.getMethod())) {
			httpResponse.setStatus(HttpServletResponse.SC_NO_CONTENT);
			return;
		}

		chain.doFilter(request, response);
	}
}
