<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c"       uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>

    
<jsp:include page="/WEB-INF/jsp/camspot_m/inc/top.jsp" flush="false"/>

    <!-- payment {-->
    <div id="payment_page" class="sub">
    
    	<!-- content {-->
    	<div id="content">

            <!-- 탭메뉴 {-->
            <div class="sTabmenu">
                <a href="/m/payment.do" class="t1">상신문서</a>
                <a href="/m/payment_wait.do" class="t2">대기문서</a>
            </div>
    		
            <!-- 검색폼 {-->
            <div class="searchBox">
            	<font class="txt type28">전체 <b class="fcol_sky">${strLen}</b>건</font>
                <form>
                	<input type="text" placeholder="검색어를 입력하세요." />
                	<input type="submit" />
                </form>
            </div>
            <!--} 검색폼 -->
    		
            <!-- 리스트 {-->
            <div class="blistBox mt40">
                <c:forEach var="item" items="${strList}" varStatus="status">
            	<a href="/m/payment_view.do?docId=${item.DOC_ID}&mod=V&approKey=${item.APPRO_KEY}&menuCd=${item.DOC_MENU_CD}">
                	<font class="txt type28 tit">${item.DOC_TITLE}</font>
                	<font class="txt type24"><i>${item.DOC_NO == null ? "" : item.DOC_NO}</i><i>${item.DRAFT_DT}</i><i>${item.DRAFT_EMP_NAME}</i></font>
                </a>
                </c:forEach>
<%--            	<a href="#">--%>
<%--                	<font class="txt type28 tit">[수입결의서] 테스트팀-관리자</font>--%>
<%--                	<font class="txt type24"><i>경영지원팀 24-5486</i><i>2023-11-30</i><i>기안자</i></font>--%>
<%--                </a>--%>
<%--            	<a href="#">--%>
<%--                	<font class="txt type28 tit">[수입결의서] 테스트팀-관리자</font>--%>
<%--                	<font class="txt type24"><i>경영지원팀 24-5486</i><i>2023-11-30</i><i>기안자</i></font>--%>
<%--                </a>--%>
<%--            	<a href="#">--%>
<%--                	<font class="txt type28 tit">[수입결의서] 테스트팀-관리자</font>--%>
<%--                	<font class="txt type24"><i>경영지원팀 24-5486</i><i>2023-11-30</i><i>기안자</i></font>--%>
<%--                </a>--%>
<%--            	<a href="#">--%>
<%--                	<font class="txt type28 tit">[수입결의서] 테스트팀-관리자</font>--%>
<%--                	<font class="txt type24"><i>경영지원팀 24-5486</i><i>2023-11-30</i><i>기안자</i></font>--%>
<%--                </a>--%>
<%--            	<a href="#">--%>
<%--                	<font class="txt type28 tit">[수입결의서] 테스트팀-관리자</font>--%>
<%--                	<font class="txt type24"><i>경영지원팀 24-5486</i><i>2023-11-30</i><i>기안자</i></font>--%>
<%--                </a>--%>
<%--            	<a href="#">--%>
<%--                	<font class="txt type28 tit">[수입결의서] 테스트팀-관리자</font>--%>
<%--                	<font class="txt type24"><i>경영지원팀 24-5486</i><i>2023-11-30</i><i>기안자</i></font>--%>
<%--                </a>--%>
<%--            	<a href="#">--%>
<%--                	<font class="txt type28 tit">[수입결의서] 테스트팀-관리자</font>--%>
<%--                	<font class="txt type24"><i>경영지원팀 24-5486</i><i>2023-11-30</i><i>기안자</i></font>--%>
<%--                </a>--%>
<%--            	<a href="#">--%>
<%--                	<font class="txt type28 tit">[수입결의서] 테스트팀-관리자</font>--%>
<%--                	<font class="txt type24"><i>경영지원팀 24-5486</i><i>2023-11-30</i><i>기안자</i></font>--%>
<%--                </a>--%>
<%--            	<a href="#">--%>
<%--                	<font class="txt type28 tit">[수입결의서] 테스트팀-관리자</font>--%>
<%--                	<font class="txt type24"><i>경영지원팀 24-5486</i><i>2023-11-30</i><i>기안자</i></font>--%>
<%--                </a>--%>
            </div>
            <!--} 리스트 -->
    		
            <!-- 페이징 {-->
            <!-- 페이징 {-->
            <div class="pageBox mt40">
                <a href="${pageContext.request.contextPath}/m/payment.do?pageNum=${(currentPage-1)}" class="arr prev">prev</a>
                <c:forEach var="i" begin="${startPage }" end="${endPage }">
                    <a href="${pageContext.request.contextPath}/m/payment.do?pageNum=${i}" id="page${i}">${i}</a>
                </c:forEach>
                <a href="${pageContext.request.contextPath}/m/payment.do?pageNum=${(currentPage+1)}" class="arr next">next</a>
            </div>
            <!--} 페이징 -->
            
<%--        	<div class="btBox mt40"><a href="/m/payment_write.do">글쓰기</a></div>--%>
            
    	</div>   
    	<!--} content -->
                
    </div>
    <!--} payment -->
    



<script type="text/javascript">
	$('.m2', $('#menu')).addClass('active');
    $('.t1', $('.sTabmenu')).addClass('active');

    var idx = '${currentPage}';

    if(idx != undefined && idx != null && idx != '') {
        $("#page"+idx).html("<b>"+idx+"</b>");
    } else {
        $("#page1").html("<b>1</b>");
    }
</script>



<jsp:include page="/WEB-INF/jsp/camspot_m/inc/bottom.jsp" flush="false"/>
