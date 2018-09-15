<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<div class="contact_wrap">
	<div class="contact_container">
		<div class="contact_header">
			<h1>Contact me</h1>
		</div>		
		<div class="contact_body">
			<form:form modelAttribute="contact" id="mailFrm" action="/ajax/mail/send.otw" method="post">
				<div class="row">
					<p class="explain">If you have any question about me, don't hesitate to contact</p>
				</div>
				<div class="row">
					<form:input type="text" path="name" placeholder="Your Name"/>
				</div>
				<div class="row">
					<form:input type="text" path="email" placeholder="Your e-mail"/>
				</div>
				<div class="row">
					<form:input type="text" path="subject" placeholder="subject"/>
				</div>
				<div class="row">
					<form:textarea  placeholder="Message" path="context"></form:textarea>
				</div>
			</form:form>
			
		</div>
		<div class="contact_footer">
			<a href="javascript:;" id="mailSend" class="btn">Send</a>
		</div>
	</div>
</div>