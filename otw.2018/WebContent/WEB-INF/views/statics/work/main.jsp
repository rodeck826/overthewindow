<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/views/taglibs.jsp" %>
<div class="layer_wrap" >
	<div class="layer_container">
		<div class="layer_body" style="margin-top:10px">
			<div class="sub_header" style="text-align: center;">
				<h1>Timeline</h1>
			</div>
			<div class="row">
				<div class="timeline">
					<div class="time_header">
						<section class="years">2013</section>
						<section class="years">2014</section>
						<section class="years">2015</section>
						<section class="years">2016</section>
						<section class="years">2017</section>
						<section class="years">2018</section>
					</div>
					<div class="time_body"></div>
				</div>
			</div>
			
			<div class="row">
				<div class="poli_header" style="text-align: center;">
					<h1>Freelance Portfolio</h1>
				</div>
				<c:forEach var="item" items="${works }" varStatus="status">
					<div class="polio" >
						<div class="thumb" style="background:url(${item.files[0].filePath }${item.files[0].fileName}) no-repeat center center;background-size: cover;">
							
							<a href="javascript:;" class="prev_btn"><i class="fa fa-chevron-left" aria-hidden="true"></i></a>
							<c:forEach var="img" items="${item.files }">
								<c:if test="${img.fileType eq 'video' }">
									<div class="thum_img">
										<a href="javascript:;" class="play_btn" data-status="stop"><i class="fa fa-play-circle fa-3x" aria-hidden="true"></i></a>
										<video src="${img.filePath }${img.fileName}" ></video>
									</div>
								</c:if>
							</c:forEach>
							<c:forEach var="img" items="${item.files }">
								<c:if test="${img.fileType eq 'images' }">
									<div class="thum_img">
										<a href="javascript:;" class="zoom_btn"><i class="fa fa-search-plus fa-3x" aria-hidden="true"></i></a>
										<img src="${img.filePath }${img.fileName}"/>
									</div>
								</c:if>
							</c:forEach>
							<a href="javascript:;" class="next_btn"><i class="fa fa-chevron-right" ></i></a>
							<!-- <a href="javascript:;" class="poli_close"><i class="fa fa-window-close-o fa-2x" ></i></a> -->
						</div>
						<div class="po_tit">
							<span>${item.title }</span>
						</div>
						<div class="po_ctx">
							<p>${item.contents }</p>
						</div>
						<div class="po_tech">
							<h2>Client</h1>
							<p style="padding-left: 15px;">${item.client}</p>
						</div>
						<div class="po_tech">
							<h2>Technology </h1>
							<ul>${item.tech }</ul>
						</div>
						<div class="po_note">
							<h2>Notes </h1>
							<p style="padding-left: 15px;">${item.note}</p>
						</div>
					</div>
				</c:forEach>
			</div>
		</div>
	</div>
</div>