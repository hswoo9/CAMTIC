<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c"       uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>

    
<jsp:include page="/WEB-INF/jsp/camspot_m/inc/top.jsp" flush="false"/>
<script type="text/javascript" src="/js/intra/mobile/m_boardView.js?v=${today}"/></script>
    <!-- baord {-->
    <div id="baord_page" class="sub">
        <input type="hidden" id="boardId" value="${params.boardId}">
        <input type="hidden" id="boardArticleId" value="${params.boardArticleId}">
    	<!-- content {-->
    	<div id="content">
        
            <!-- 탭메뉴 {-->
            <div class="sTabmenu">
            	<a href="/m/board.do" class="boardTab t1" boardId="40">공지사항</a>
            	<a href="#" class="boardTab t2" boardId="41">업무보고</a>
            	<a href="#" class="boardTab t3">함께보아요</a>
            </div>
            <!--} 탭메뉴 -->
                        
            <!-- 뷰 {-->
            <div class="PviewBox mt20">
            
            	<div class="titBox">
                	<font class="txt type28 tit" id="articleTitle"></font>
                	<font class="txt type18 mt10">
                        <i>작성자 : <b id="articleRegEmpName"></b></i>
                        <i>작성일 : <b id="articleRegDate"></b></i>
                        <i>조회수 : <b id="articleViewCount"></b></i>
                    </font>
                </div>
                    
                    
                
                <div class="content_output mt40" id="articleContentDiv">

                </div>
                
                
            	<font class="txt type28 mt40 fileBox"><b>첨부파일</b></font>
                <div class="content_output mt10" id="fileDiv">

                	<a href="#" class="file"><img src="/images/camspot_m/ico-file.png" />영수증2.jpg</a>
                	
                </div>
            </div>
            <!--} 뷰 -->
    		
        	
            
    	</div>   
    	<!--} content -->
                
    </div>
    <!--} baord -->
    
<script type="text/javascript">
    // $('.m5', $('#menu')).addClass('active');
    // $('.t1', $('.sTabmenu')).addClass('active');
    mBv.fn_defaultScript();
</script>


<jsp:include page="/WEB-INF/jsp/camspot_m/inc/bottom.jsp" flush="false"/>
