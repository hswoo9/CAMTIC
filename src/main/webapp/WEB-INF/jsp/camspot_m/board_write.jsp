<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c"       uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>

    
<jsp:include page="/WEB-INF/jsp/camspot_m/inc/top.jsp" flush="false"/>

    <!-- baord {-->
    <div id="baord_page" class="sub">
    
    	<!-- content {-->
    	<div id="content">
           
            <!-- 탭메뉴 {-->
            <div class="sTabmenu">
            	<a href="/m/board.do" class="t1">공지사항</a>
            	<a href="#" class="t2">업무보고</a>
            	<a href="#" class="t3">함께보아요</a>
            </div>
            <!--} 탭메뉴 -->
            
            <!-- 글쓰기 {-->
            <form>
                <div class="bwriteBox mt20">
                    <span>
                        <font class="txt type28 fP800">제목</font>
                        <input type="text" />
                    </span>
                    <span>
                        <font class="txt type28 fP800">작성자</font>
                        <input type="text" />
                    </span>
                    <span>
                        <font class="txt type28 fP800">첨부파일</font>
                        <i><input type="file" /></i>
                        <i><input type="file" /><a href="#">+</a></i>
                    </span>
                    <span>
                        <font class="txt type28 fP800">상세내용</font>
                        <textarea></textarea>
                    </span>
                    
                    
                </div>
                <div class="btBox mt40"><a href="#">글쓰기</a></div>
            </form>
            <!--} 글쓰기 -->
        
        	
            
    	</div>   
    	<!--} content -->
                
    </div>
    <!--} baord -->
   

<script type="text/javascript">
	$('.m5', $('#menu')).addClass('active');
	$('.t1', $('.sTabmenu')).addClass('active');
</script>

<jsp:include page="/WEB-INF/jsp/camspot_m/inc/bottom.jsp" flush="false"/>
