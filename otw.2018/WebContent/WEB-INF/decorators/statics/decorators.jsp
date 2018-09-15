<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/views/taglibs.jsp" %>
<!DOCTYPE html>
<html lang="en">
	<head>
		<meta http-equiv="X-UA-Compatible" content="IE=edge">
		<meta name="viewport" content="width=device-width,initial-scale=1.0">
		<meta name="google-site-verification" content="HTg4lO2QCp2LXkrEakFNSya2MAi2cFgK_hOb5jg5KAo" />
		<title>Heo - The Traveling developer</title>
		<link rel="stylesheet" type="text/css" href="/statics/css/common.css">
		<link href="https://use.fontawesome.com/releases/v5.0.6/css/all.css" rel="stylesheet">
		
		<script type="text/javascript" src="/statics/js/common.js"></script>
		<script type="text/javascript" src="/statics/js/loading.js"></script>
		<script type="text/javascript" src="/statics/js/otw.selector.js"></script>
		<script type="text/javascript" src="/statics/js/video.js"></script>
		<script type="text/javascript" src="/statics/js/console.fn.js"></script>
		<script type="text/javascript" src="/statics/js/console.js"></script>
		<script type="text/javascript" src="/statics/js/menu.js"></script>
		<script type="text/javascript" src="/statics/js/timeline.js"></script>
		
		<!-- CUSTOM -->
		<sitemesh:write property="head"/>
		<!-- //CUSTOM -->
	</head>
	<body>
		<div class="wrap" style="width:100%;height:100%">
			<header >
				<a href="javascript:;" class="bug" data-open="false">
					<span class="bar"></span>
					<span class="bar"></span>
					<span class="bar"></span>
				</a>
			</header >
			<div class="container">
				<sitemesh:write property="body"/>		
			</div>
			
		</div>
		<aside>
			<div class="nav_box">
				<a href="javascript:;" class="nav_close"><img src="/statics/images/btn_asideclose.png" alt="Close"></a>
				<div class="gnb">
					<ul class="gnb_dept">
						<li><a href="#clear" >HOME</a></li>
						<li><a href="#portfolio">PORTFOLIO</a></li>
						<li><a href="#skills">SKILLS</a></li>
						<li><a href="#contact">CONTACT ME</a></li>
					</ul>
				</div>
				<footer>
					<div class="foot_wrap">
						<a href="https://www.linkedin.com/in/rodeck826/" target="_blank" class="link"><i class="fab fa-linkedin fa-2x"></i></a>
					</div>
					<div class="copy">
						<span>Vanilla JS</span>
					</div>
				</footer>
			</div>
		</aside>	
		<div class="page_wrap"></div>
		<div class="video_wrap">
			<a href="javascript:;" class="btn_page_close"><img src="/statics/images/btn_close_white.png"></a>
			<div class="video_player" data-status="stop">
				<div class="video">
					<video src=""/>
				</div>
				<div class="video_navigator">
					<a href="javascript:;" class="btn_player"><i class="fa fa-play" aria-hidden="true"></i></a>
					<div class="bar">
						<span class="progress"></span>
					</div>
					<span class="time">00:00</span>
				</div>
			</div>
		</div>
		<div class="wating_wrap" >
			<div class="wating_ctx">
				<i class="fa fa-spinner fa-spin fa-3x fa-fw"></i>
				<span class="sr-only">Loading...</span>
			</div>
		</div>
	</body>
</html>