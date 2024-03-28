<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c"       uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>

    
<jsp:include page="/WEB-INF/jsp/camspot_m/inc/top.jsp" flush="false"/>
<script type="text/javascript" src="/js/intra/mobile/m_board.js?v=${today}"/></script>
<style>
	#searchBtn {
		width: 40px;
		font-size: 0;
		background: url(/images/camspot_m/ico-search.png) no-repeat center center;
		background-size: contain;
		border : none
	}
	#searchDiv {
		width: 100%;
		padding: 20px;
		background: #fff;
		display: flex;
		border-radius: 10px;
	}
</style>
    <!-- baord {-->
    <div id="baord_page" class="sub">
        <input type="hidden" id="boardId" value="">
        <input type="hidden" id="boardType" value="">
    
    	<!-- content {-->
    	<div id="content">
    		
            <!-- 탭메뉴 {-->
            <div class="sTabmenu">
                <a href="/m/board.do?boardId=40&boardType=normal" class="boardTab t1" boardType="normal" boardId="40">공지사항</a>
                <a href="/m/board.do?boardId=41&boardType=normal" class="boardTab t2" boardType="normal" boardId="41">업무보고</a>
                <a href="/m/board.do?boardType=watch" class="boardTab t3" boardType="watch">함께보아요</a>
            </div>
            <!--} 탭메뉴 -->
            
            <!-- 검색폼 {-->
            <div class="searchBox mt20">
            	<font class="txt type28">전체 <b class="fcol_sky" id="totalCnt">50</b>건</font>
                <div id="searchDiv">
                	<input type="text" placeholder="검색어를 입력하세요." id="searchContent" onkeypress="if(window.event.keyCode==13){mBl.movePage()}"/>
                	<input type="button" id="searchBtn" onclick="mBl.movePage()"/>
                </div>
            </div>
            <!--} 검색폼 --> 
               		
            <!-- 리스트 {-->
            <div class="blistBox mt20" id="articleList">

            </div>
            <!--} 리스트 -->
    		
            <!-- 페이징 {-->
            <div class="pageBox pagination mt40">

            </div>
            <!--} 페이징 -->
            
<%--        	<div class="btBox mt40"><a href="/m/board_write.do">글쓰기</a></div>--%>
            
    	</div>   
    	<!--} content -->
                
    </div>
    <!--} baord -->
    



<script type="text/javascript">
	mBl.fn_defaultScript(JSON.parse('${params}'));
</script>

    
<jsp:include page="/WEB-INF/jsp/camspot_m/inc/bottom.jsp" flush="false"/>
