<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c"       uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>

    
<jsp:include page="/WEB-INF/jsp/camspot_m/inc/top.jsp" flush="false"/>
<script type="text/javascript" src="/js/intra/mobile/m_boardView.js?v=${today}"/></script>
    <!-- baord {-->
    <div id="baord_page" class="sub">
        <input type="hidden" id="boardId" value="${params.boardId}">

        <input type="hidden" id="boardType" value="${params.boardType}">
        <c:choose>
            <c:when test="${params.boardType eq 'watch'}">
                <input type="hidden" id="watchBoardId" value="${params.watchBoardId}">
            </c:when>
            <c:otherwise>
                <input type="hidden" id="boardArticleId" value="${params.boardArticleId}">
            </c:otherwise>
        </c:choose>

    	<!-- content {-->
    	<div id="content">
        
            <!-- 탭메뉴 {-->
            <div class="sTabmenu">
            	<a href="/m/board.do?boardId=40" class="boardTab t1" boardId="40">공지사항</a>
            	<a href="/m/board.do?boardId=41" class="boardTab t2" boardId="41">업무보고</a>
                <a href="/m/board.do?boardType=watch" class="boardTab t3" boardType="watch">함께보아요</a>
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
                

            	<font class="txt type28 mt40 fileBox fileGrid"><b>첨부파일</b></font>
                <div class="content_output mt10 fileGrid" id="fileDiv">
                	<a href="#" class="file"><img src="/images/camspot_m/ico-file.png" />영수증2.jpg</a>
                </div>
            </div>
            <!--} 뷰 -->
    		
        	
            
    	</div>   
    	<!--} content -->
                
    </div>
    <!--} baord -->
    
<script type="text/javascript">
    mBv.fn_defaultScript();
</script>


<jsp:include page="/WEB-INF/jsp/camspot_m/inc/bottom.jsp" flush="false"/>
