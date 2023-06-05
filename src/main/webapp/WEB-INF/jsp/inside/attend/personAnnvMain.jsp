<%--
  Created by IntelliJ IDEA.
  User: user
  Date: 2023-03-13
  Time: 오후 2:10
  To change this template use File | Settings | File Templates.
--%>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c"       uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<jsp:useBean id="today" class="java.util.Date" />
<jsp:include page="/WEB-INF/jsp/template/common.jsp" flush="false"/>
<script type="text/javascript" src="/js/intra/inside/attend/personAnnvMain.js?v=${toDate}"/></script>

<input type="hidden" id="empSeq" value="${loginVO.uniqId}"/>
<input type="hidden" id="deptSeq" value="${loginVO.orgnztId}"/>
<input type="hidden" id="deptName" value="${loginVO.orgnztNm}"/>

<div class="col-md-10 col-lg-10 dash-left">
    <div class="panel">
        <div class="panel-heading">
            <h4 class="panel-title">개인연차현황</h4>
            <div class="title-road">근태관리 &gt; 개인연차현황</div>
        </div>

        <div class="panel-body">
            <div id="startView" style="padding: 10px 0 0 0; border-top: 2px solid #dfdfdf;"></div>

            <div>
                <div style="margin:20px 0;">
                    <div class="table-responsive">
                        <table class="table table-bordered">
                            <colgroup>
                                <col width="5%" >
                                <col width="5%" >
                                <col width="5%" >
                                <col width="5%" >
                                <col width="5%" >
                                <col width="5%" >
                                <col width="5%" >
                                <col width="5%" >
                                <col width="5%" >
                                <col width="5%" >
                                <col width="5%" >
                                <col width="5%" >
                                <col width="5%" >
                            </colgroup>
                            <thead>
                                <tr>
                                    <th rowspan="2">귀속년도</th>
                                    <th colspan="2">연차 적용 기간</th>
                                    <th colspan="5">부여 (A)</th>
                                    <th colspan="3">소진 (B)</th>
                                    <th rowspan="2">잔여연차 (A-B)</th>
                                    <th rowspan="2">변경이력</th>
                                </tr>
                                <tr>
                                    <th>시작일자</th>
                                    <th>종료일자</th>
                                    <th>기본</th>
                                    <th>기본 조정</th>
                                    <th>가산 일수</th>
                                    <th>이월</th>
                                    <th>소계</th>
                                    <th>사용</th>
                                    <th>사용 조정</th>
                                    <th>소계</th>
                                </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td style="text-align: center;">2023</td>
                                <td style="text-align: center;">0일</td>
                                <td style="text-align: center;">0일</td>
                                <td style="text-align: center;">0일</td>
                                <td style="text-align: center;">0일</td>
                                <td style="text-align: center;">0일</td>
                                <td style="text-align: center;">0일</td>
                                <td style="text-align: center;">0일</td>
                                <td style="text-align: center;">0일</td>
                                <td style="text-align: center;">0일</td>
                                <td style="text-align: center;">0일</td>
                                <td style="text-align: center;">0일</td>
                                <td style="text-align: center;">[보기]</td>
                            </tr>
                            </tbody>
                        </table>
                    </div><!-- table-responsive -->
                </div>
            </div>
        </div>
        <div class="panel-body">
            <div id="mainGrid"></div>
        </div>
    </div>
</div>
</div><!-- col-md-9 -->

<jsp:include page="/WEB-INF/jsp/template/footer.jsp" flush="false"/>
<script type="text/javascript">
    personAnnvMain.mainGrid();
</script>