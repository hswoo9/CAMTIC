<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c"       uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>

    
<jsp:include page="/WEB-INF/jsp/camspot_m/inc/top.jsp" flush="false"/>

    <!-- payment {-->
    <div id="payment_page" class="sub">
    
    	<!-- content {-->
    	<div id="content">
        
            <!-- 버튼모음 {-->
            <div class="btWrap disF">
            	<a href="javascript:history.back()" class="back"><img src="/images/camspot_m/ico-back.png" /></a>
                <span class="pbtBox disF">
                	<a href="#" class="txt type26">결재</a>
                	<a href="#" class="txt type26">반려</a>
                	<a href="#" class="txt type26">의견보기</a>
                </span>
            </div>
            <!--} 버튼모음 -->
            
            <!-- 뷰 {-->
            <div class="PviewBox mt20">
            	<font class="txt type28"><b>문서정보</b></font>
                <div class="content_output mt10">
                	<a href="#" class="file"><img src="/images/camspot_m/ico-document.png" />[휴일근로신청서] 경영지원팀24-국민</a>
                </div>
                
            	<font class="txt type28 mt40"><b>첨부파일</b></font>
                <div class="content_output mt10">
                	<a href="#" class="file"><img src="/images/camspot_m/ico-file.png" />영수증1.jpg</a>
                	<a href="#" class="file"><img src="/images/camspot_m/ico-file.png" />영수증2.jpg</a>
                	
                </div>
                
                <div class="pop_sign_wrap">
                    <div id="approvalDocView" class="pop_wrap_dir" style="padding:0 20px">
                        <input type="hidden" id="docId" name="docId" value="">
                        <input type="hidden" id="menuCd" name="menuCd" value="">
                        <input type="hidden" id="approveRouteId" name="approveRouteId" value="">
                        <input type="hidden" id="subApproval" name="subApproval" value="">

                        <div style="display:flex; justify-content: space-between; margin:10px 10px 10px;">
                            <font class="txt type28 mt40"><b>본문</b></font>
                        </div>

                        <div id="hwpApproveContent" style="height: 100%;border: 1px solid lightgray;"></div>

                    </div>
                </div>

            </div>
            <!--} 뷰 -->
    		
        	
            
    	</div>   
    	<!--} content -->
                
    </div>
    <!--} payment -->
    
<script type="text/javascript">
	$('.m2', $('#menu')).addClass('active');
</script>

<jsp:include page="/WEB-INF/jsp/camspot_m/inc/bottom.jsp" flush="false"/>
