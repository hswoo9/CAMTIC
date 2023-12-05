<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c"       uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<% pageContext.setAttribute("br", "\n"); %>
<jsp:include page="/WEB-INF/jsp/template/camtic/common.jsp" flush="false"/>
<script type="text/javascript" src="<c:url value='/js/kendoui/kendo.all.min.js'/>"></script>
<style>
    .txt_zone {padding: 50px 50px 160px 50px; font-size: 17px; color: #252525;}

    /*.__boardView .head {
      border-top: 1px solid #ccc;
    }*/

    .__boardView .con {
        padding: 0px;
    }

    /* 버튼 수정 2023-10-30 김병수 */
    .__btn1 {
        min-width: 85px;
        height: 38px;
        font-size: 15px;
    }

    table th{border-bottom: 1px solid #ddd; background-color: #ddd;}

</style>

<body>
<div id="wrap">
    <jsp:include page="/WEB-INF/jsp/template/camtic/head.jsp" flush="false"/>
    <div id="sub">
        <div class="inner">
            <jsp:include page="/WEB-INF/jsp/template/camtic/lnb.jsp" flush="false"/>
            <div id="content">
                <ul id="navigation">
                    <li><a href="/camtic"><img src="/images/camtic/home_3.png" class="homeImage">홈으로</a></li>
                    <li class="">직원과 함께</li>
                    <li class=""><span>채용공고</span></li>
                </ul>
                <div id="title">
                    <h3><span>채용공고</span></h3>
                </div>

                <div class="__boardView">

                    <div class="head">
                        <h2>${map.RECRUIT_TITLE}</h2>
                        <ul class="info">
                            <li><span>${map.RECRUIT_NUM}</span></li>
                            <li>상태 : ${map.RECRUIT_STATUS_TEXT}</li>
                            <li>작성자 : ${map.REG_EMP_NAME}</li>
                            <li>작성일 : <fmt:formatDate value="${map.REG_DT}" pattern="yyyy-MM-dd" type="date"/></li>
                            <li>조회수 : ${map.RECRUIT_VIEW_COUNT}</li>
                        </ul>
                    </div>

                    <div class="con" >
                        <div class="txt_zone pr_view_content" style="line-height:35px;">
                            <c:if test="${categoryId eq 'photo'}" >
                                <div style="text-align:center">
                                    <c:forEach var="file" items="${fileMap}" varStatus="status">
                                        <img src="${file.file_path}${file.file_uuid}"><br>
                                    </c:forEach>
                                </div>
                            </c:if>

                            <div id="con0">
                                <span>${map.RECRUIT_NUM}</span>
                                <div style="border:1px solid #ddd; text-align:center; padding:20px 0;">
                                    <span style="font-size:20px; line-height:30px;">${map.RECRUIT_DETAIL}</span>
                                </div>
                                <div style="float:right; margin-top:10px;">
                                    <p>${map.UPLOAD_TEXT}</p>
                                    <p style="float:right; margin-top:-9px;">${map.UPLOAD_DT}</p>
                                </div>

                            </div>

                            <div id="con1" style="margin-top:50px;">
                                <h3>모집분야</h3>
                                <table class="table table-bordered mb-0" style="border:1px solid #ddd; text-align:center;margin-top:20px;">
                                    <colgroup>
                                        <col style="width:150px;"/>
                                        <col style="width:150px;"/>
                                        <col style="width:160px;"/>
                                        <col style="width:70px;"/>
                                        <col style="width:100px;"/>
                                        <col style="width:70px;"/>
                                        <col style="width:100px;"/>
                                    </colgroup>
                                    <thead>
                                        <tr>
                                            <th>부서</th>
                                            <th>팀</th>
                                            <th>직무(모집분야)</th>
                                            <th>채용인원</th>
                                            <th>신입/경력(직급)</th>
                                            <th>필요경력</th>
                                            <th>근무형태</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    <c:forEach var="area" items="${map.recruitArea}">
                                        <tr style="border-top:1px solid #ddd;">
                                            <td>${area.DEPT_NAME}</td>
                                            <td>${area.TEAM_NAME}</td>
                                            <td>${area.JOB}</td>
                                            <td>${area.RECRUITMENT}</td>
                                            <td>
                                                <c:choose>
                                                    <c:when test="${area.CAREER_TYPE eq '1'}">신입</c:when>
                                                    <c:when test="${area.CAREER_TYPE eq '2'}">경력</c:when>
                                                    <c:otherwise>신입/경력</c:otherwise>
                                                </c:choose>
                                            </td>
                                            <td>${area.CARRER}</td>
                                            <td>${area.WORK_TYPE}</td>
                                        </tr>
                                    </c:forEach>
                                    </tbody>

                                </table>
                            </div>

                            <div id="con2" style="margin-top:30px;">
                                <h3>응시자격</h3>
                                <table class="table table-bordered mb-0" style="border:1px solid #ddd; text-align:center;margin-top:20px;">
                                    <colgroup>
                                        <col style="width:40%;"/>
                                        <col style="width:60%; border-left:1px solid #ddd;"/>
                                    </colgroup>
                                    <tr>
                                        <th>직무(모집분야)</th>
                                        <th>자격요건</th>
                                    </tr>
                                    <c:forEach var="area" items="${map.recruitArea}">
                                        <tr style="border-top:1px solid #ddd;">
                                            <td>
                                                <c:out escapeXml="false" value="${fn:replace(area.JOB, br, '<br>')}" />
                                            </td>
                                            <td style="text-align:left; padding-left:10px;">
                                                <c:out escapeXml="false" value="${fn:replace(area.QUALIFICATION, br, '<br>')}" />
                                            </td>
                                        </tr>
                                    </c:forEach>
                                </table>
                                <div style="margin-top: 10px;">
                                    <p>
                                        <c:out escapeXml="false" value="${fn:replace(map.ELIGIBILITY_ETC, br, '<br>')}" />
                                    </p>
                                </div>
                            </div>

                            <div id="con3" style="margin-top:30px;">
                                <h3>근무형태</h3>
                                <div style="margin-top: 10px;">
                                    <p>
                                        <c:out escapeXml="false" value="${fn:replace(map.WORK_TYPE, br, '<br>')}" />
                                    </p>
                                </div>
                            </div>

                            <div id="con4" style="margin-top:30px;">
                                <h3>전형방법</h3>
                                <div style="margin-top: 10px;">
                                    <p>
                                        <c:out escapeXml="false" value="${fn:replace(map.ADMISSION, br, '<br>')}" />
                                    </p>
                                </div>
                            </div>

                            <div id="con5" style="margin-top:30px;">
                                <h3>지원서류(온라인 등록)</h3>
                                <div style="margin-top: 10px;">
                                    <p>
                                        <c:out escapeXml="false" value="${fn:replace(map.APPLICATION_DOC, br, '<br>')}" />
                                    </p>
                                </div>
                            </div>

                            <div id="con6" style="margin-top:30px;">
                                <h3>원서접수</h3>
                                <div style="margin-top: 10px;">
                                    <p>
                                        <c:out escapeXml="false" value="${fn:replace(map.RECEIPT_DOCU, br, '<br>')}" />
                                    </p>
                                </div>
                            </div>

                            <div id="con7" style="margin-top:30px;">
                                <h3>기타사항</h3>
                                <div style="margin-top: 10px;">
                                    <p>
                                        <c:out escapeXml="false" value="${fn:replace(map.REMARK, br, '<br>')}" />
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>


                    <div class="con">
                        <table>
                            <c:if test="${map.afterKey ne '' && map.afterKey ne null}">
                                <tr style="border-bottom: 1px solid #ececec;">
                                    <td style="text-align: center; width: 10%; background-color: #f7f7f7;">다음글</td>
                                    <td style="padding: 5px 0 5px 15px;">
                                        <a href="#" onclick="fn_detailBoard('${map.afterKey}')">${map.afterName}</a></td>
                                </tr>
                            </c:if>
                            <c:if test="${map.beforeKey ne '' && map.beforeKey ne null}">
                                <tr style="border-top: 1px solid #ececec;">
                                    <td style="text-align: center; width: 10%; background-color: #f7f7f7;">이전글</td>
                                    <td style="padding: 5px 0 5px 15px;">
                                        <a href="#" onclick="fn_detailBoard('${map.beforeKey}')">${map.beforeName}</a></td>
                                </tr>
                            </c:if>

                        </table>
                    </div>

                </div>

                <div class="__botArea">
                    <div style="text-align: center;">
                        <c:if test="${map.RECRUIT_STATUS_SN == '2'}">
                            <a href="javascript:void(0);" onclick="fn_goRecruit();" class="__btn1 blue" style="width:200px;"><span>온라인 입사지원하기</span></a>
                        </c:if>
                            <a href="javascript:void(0);" onclick="fn_goList();" class="__btn1 blue" style="width:200px;"><span>목록보기</span></a>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <jsp:include page="/WEB-INF/jsp/template/camtic/foot.jsp" flush="false"/>
</div>
</body>
</html>

<input type="hidden" id="recruitInfoSn" value="${map.RECRUIT_INFO_SN}"/>
<script>

    function fileDown(filePath, fileName){
        kendo.saveAs({
            dataURI: "/common/fileDownload.do?filePath=" + filePath + "&fileName=" + encodeURIComponent(fileName),
        });
    }

    function fn_goList(){
        location.href = '/camtic/member/job.do';
    }

    function fn_goRecruit(){
        location.href = '/camtic/member/job_applicationLogin.do';
    }

    //상세보기 이동
    function fn_detailBoard(key){
        location.href="/camtic/pr/pr_view.do?boardArticleId=" + key + "&category=" + categoryId;
    }

    function fn_regist(key){
        if(categoryId == "news"){
            location.href="/camtic/pr/news_register.do?boardArticleId=" + key + "&category=" + categoryId;
        }else{
            location.href="/camtic/pr/pr_register.do?boardArticleId=" + key + "&category=" + categoryId;
        }
    }
</script>