package net.overthewindow.com.interceptor;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;

public class ApplicationIntercepter implements HandlerInterceptor{
	private Logger log = LoggerFactory.getLogger(this.getClass());

	@Override
	public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler)
			throws Exception {
		// TODO Auto-generated method stub
		
		String uri = request.getRequestURI();
		log.debug("request uri is '"+uri+"'");
		boolean isMobile = false;
		String[] mobileKeyWords = new String[] {"iPhone", "iPad", "BlackBerry", "Android", "Windows CE", "LG", "MOT", "SAMSUNG", "SonyEricsson"}; 
		String agent = request.getHeader("user-agent");
		if (agent != null) {
			for (int i=0; i<mobileKeyWords.length; i++) {
				if (agent.indexOf(mobileKeyWords[i]) > -1) {
					isMobile = true;
					break;
				}
			}
		}
		
		if(isMobile && !uri.startsWith("/mobile")){
			response.sendRedirect("/mobile/main.otw");
			return false;
		}
		
		return true;
	}

	@Override
	public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler,
			ModelAndView modelAndView) throws Exception {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex)
			throws Exception {
		// TODO Auto-generated method stub
		
	}
	

}
