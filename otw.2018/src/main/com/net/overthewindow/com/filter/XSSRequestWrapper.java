/*=================================================================================
 *@Copyright 2017 ovethewindow all rights reserved.
 *@File			:	XSSRequestWrapper.java
 *@FileName		:	XSSRequestWrapper.java
 *@CreateDate	:	2016. 10. 26
 *@author		:	허근민
 =================================================================================*/

package net.overthewindow.com.filter;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletRequestWrapper;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.nhncorp.lucy.security.xss.XssFilter;

/**
 * 크로스사이트스크립팅(XSS) 취약점 제거
 * <p>FileName	:	XSSRequestWrapper.java </p>
 * @author			허근민
 */
public class XSSRequestWrapper extends HttpServletRequestWrapper {

	public Logger log = LoggerFactory.getLogger(getClass());
	
	public XSSRequestWrapper(HttpServletRequest request) {
		super(request);
	}
	
	public String[] getParameterValues(String parameter) {
		
		String[] values = super.getParameterValues(parameter);
		
		if (values == null) {
			return null;
		}
		
		int count = values.length;
		String[] encodedValues = new String[count];
		for (int i = 0; i < count; i++) {
			encodedValues[i] = filter(values[i]);
		}
		
		return encodedValues;
	}

	public String getParameter(String parameter) {
		String value = super.getParameter(parameter);
		if (value == null) {
			return null;
		}
		return filter(value);
	}

	public String getHeader(String name) {
		String value = super.getHeader(name);
		if (value == null) return null;
		return filter(value);
	}
	
	private String filter(String input) {
		if(input == null) {
			return null;
		}
		
		XssFilter filter = XssFilter.getInstance("lucy-xss-superset.xml");
		String clean = filter.doFilter(input);
		
		if(!input.equals(clean)) {
			log.warn("XSS Filter Clean : " + input + " -> " + clean);
		}
		
		return clean;
	}

}
