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
            
            <!-- 검색폼 {-->
            <div class="searchBox mt20">
            	<font class="txt type28">전체 <b class="fcol_sky">50</b>건</font>
                <form>
                	<input type="text" placeholder="검색어를 입력하세요." />
                	<input type="submit" />
                </form>
            </div>
            <!--} 검색폼 --> 
               		
            <!-- 리스트 {-->
            <div class="blistBox mt20">
            	<a href="/m/board_view.do">
                	<font class="txt type28 tit">2024년 캠틱종합기술원 재직자 교육훈련일정 안내 _ 2023.11.14</font>
                	<font class="txt type24"><i>관리자</i><i>2023-11-30</i><i>410</i><i><img src="/images/camspot_m/ico-lfile.png" /></i></font>
                </a>
            	<a href="#">
                	<font class="txt type28 tit">2024년 캠틱종합기술원 재직자 교육훈련일정 안내 _ 2023.11.14</font>
                	<font class="txt type24"><i>관리자</i><i>2023-11-30</i><i>410</i><i><img src="/images/camspot_m/ico-lfile.png" /></i></font>
                </a>
            	<a href="#">
                	<font class="txt type28 tit">2024년 캠틱종합기술원 재직자 교육훈련일정 안내 _ 2023.11.14</font>
                	<font class="txt type24"><i>관리자</i><i>2023-11-30</i><i>410</i><i><img src="/images/camspot_m/ico-lfile.png" /></i></font>
                </a>
            	<a href="#">
                	<font class="txt type28 tit">2024년 캠틱종합기술원 재직자 교육훈련일정 안내 _ 2023.11.14</font>
                	<font class="txt type24"><i>관리자</i><i>2023-11-30</i><i>410</i><i><img src="/images/camspot_m/ico-lfile.png" /></i></font>
                </a>
            	<a href="#">
                	<font class="txt type28 tit">2024년 캠틱종합기술원 재직자 교육훈련일정 안내 _ 2023.11.14</font>
                	<font class="txt type24"><i>관리자</i><i>2023-11-30</i><i>410</i><i><img src="/images/camspot_m/ico-lfile.png" /></i></font>
                </a>
            	<a href="#">
                	<font class="txt type28 tit">2024년 캠틱종합기술원 재직자 교육훈련일정 안내 _ 2023.11.14</font>
                	<font class="txt type24"><i>관리자</i><i>2023-11-30</i><i>410</i><i><img src="/images/camspot_m/ico-lfile.png" /></i></font>
                </a>
            	<a href="#">
                	<font class="txt type28 tit">2024년 캠틱종합기술원 재직자 교육훈련일정 안내 _ 2023.11.14</font>
                	<font class="txt type24"><i>관리자</i><i>2023-11-30</i><i>410</i><i><img src="/images/camspot_m/ico-lfile.png" /></i></font>
                </a>
            	<a href="#">
                	<font class="txt type28 tit">2024년 캠틱종합기술원 재직자 교육훈련일정 안내 _ 2023.11.14</font>
                	<font class="txt type24"><i>관리자</i><i>2023-11-30</i><i>410</i><i><img src="/images/camspot_m/ico-lfile.png" /></i></font>
                </a>
            	<a href="#">
                	<font class="txt type28 tit">2024년 캠틱종합기술원 재직자 교육훈련일정 안내 _ 2023.11.14</font>
                	<font class="txt type24"><i>관리자</i><i>2023-11-30</i><i>410</i><i><img src="/images/camspot_m/ico-lfile.png" /></i></font>
                </a>
            	<a href="#">
                	<font class="txt type28 tit">2024년 캠틱종합기술원 재직자 교육훈련일정 안내 _ 2023.11.14</font>
                	<font class="txt type24"><i>관리자</i><i>2023-11-30</i><i>410</i><i><img src="/images/camspot_m/ico-lfile.png" /></i></font>
                </a>
            </div>
            <!--} 리스트 -->
    		
            <!-- 페이징 {-->
            <div class="pageBox mt40">
                <a href="#none" class="arr prev">prev</a>
                <b>1</b>
                <a href="#none">2</a>
                <a href="#none">3</a>
                <a href="#none">4</a>
                <a href="#none">5</a>
                <a href="#none" class="arr next">next</a>
            </div>
            <!--} 페이징 -->
            
<%--        	<div class="btBox mt40"><a href="/m/board_write.do">글쓰기</a></div>--%>
            
    	</div>   
    	<!--} content -->
                
    </div>
    <!--} baord -->
    



<script type="text/javascript">
	$('.m5', $('#menu')).addClass('active');
	$('.t1', $('.sTabmenu')).addClass('active');
</script>

    
<jsp:include page="/WEB-INF/jsp/camspot_m/inc/bottom.jsp" flush="false"/>
