<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix = "fmt" uri = "http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<jsp:useBean id="today" class="java.util.Date" />
<jsp:include page="/WEB-INF/jsp/template/common2.jsp" flush="true"></jsp:include>
<style>
    .subTitSt {
        font-weight: 600;
        text-align: left;
        font-size: 13px;
    }

    #histDiv {
        font-size: 12px;
        display: flex;
        flex-direction: column;
        gap: 2rem;
    }
    .histListDiv{
        border-bottom: 1px solid #e5e7ee;
        position: relative;
        left: 0;
        top: 0;
        z-index: 200;
        background: #fff;
        transition: 0.3s;
        height: 40px;
        overflow: hidden;
    }

    .codeIdCla{
        z-index: 350;
    }
    .histListUl{
        padding: 10px;
        background: #f3f3f3;
        color: #000;
        font-weight: normal;
    }

    .histListUl li{
        position: relative;
    }

    .histListUl li ul{
        position: absolute;
        left: 0;
        top: 100%;
        width: 100%;
        padding-top: 18px;
        font-size: 1.5rem;
        z-index: 300;
        line-height: 3.5rem;
    }
    ul, li {
        list-style: none;
    }
    .histTitleSpan {
        font-weight: bold;
    }
</style>
<body class="font-opensans" style="background-color:#fff;">
<input type="hidden" id="empSeq" name="empSeq" value="${loginVO.uniqId}" />
<div style="padding:0;">
    <div class="table-responsive">
        <div class="card-header pop-header">
            <h3 class="card-title title_NM"><span style="position: relative; top: 3px;" id="pjtTitle">이력 조회</span></h3>
            <div class="btn-st popButton">
                <button type="button" class="k-button k-button-solid-error" style="margin-right:5px;" onclick="window.close()">닫기</button>
            </div>
        </div>

        <div style="padding: 20px 30px;">
            <div style="display:flex; justify-content: space-between;">
                <div class="subTitSt">· 고객 기본정보</div>
            </div>

            <table class="popTable table table-bordered mb-0">
                <colgroup>
                    <col width="15%">
                    <col width="35%">
                    <col width="15%">
                    <col width="35%">
                </colgroup>
                <thead>
                <tr>
                    <th scope="row" class="text-center th-color">고객명</th>
                    <td>
                        ${rs.CRM_NM}
                    </td>
                    <th scope="row" class="text-center th-color">
                        <span class="red-star">*</span>대표자
                    </th>
                    <td>
                        ${rs.CRM_CEO}
                    </td>
                </tr>
                <tr>
                    <th scope="row" class="text-center th-color">
                        <span class="red-star">*</span>사업자 번호
                    </th>
                    <td>
                        ${rs.CRM_NO}
                    </td>
                    <th scope="row" class="text-center th-color">
                        <span class="red-star">*</span>설립일
                    </th>
                    <td>
                        ${rs.CRM_EST_NO}
                    </td>
                </tr>
                <tr>
                    <th scope="row" class="text-center th-color">
                        <span class="red-star">*</span>[우편번호] 주소
                    </th>
                    <td colspan="3">
                        <c:choose>
                            <c:when test="${rs.POST eq '' or rs.POST eq null}">
                                ${rs.ADDR}
                            </c:when>
                            <c:otherwise>
                                [${rs.POST}] ${rs.ADDR}
                            </c:otherwise>
                        </c:choose>
                    </td>
                </tr>
                <tr>
                    <th scope="row" class="text-center th-color">
                        <span class="red-star">*</span>전화번호
                    </th>
                    <td>
                        ${rs.TEL_NUM}
                    </td>
                    <th scope="row" class="text-center th-color">
                        <span class="red-star">*</span>팩스번호
                    </th>
                    <td>
                        ${rs.FAX}
                    </td>
                </tr>

                </thead>
            </table>

            <div style="display:flex; justify-content: space-between;" class="mt-20">
                <div class="subTitSt">· 분야별 거래내역</div>
            </div>
            <div id="histDiv" class="mt-20">
                <div class="histListDiv">
                    <ul class="histListUl">
                        <li>
                            <span class="histTitleSpan" style="cursor: pointer">연구개발</span>
                            <table class="childrenTable popTable table table-bordered mb-0">
                                <thead>
                                <tr>
                                    <th scope="row" class="text-center th-color">연번</th>
                                    <th scope="row" class="text-center th-color">과제구분</th>
                                    <th scope="row" class="text-center th-color">건명</th>
                                    <th scope="row" class="text-center th-color">연구 기간</th>
                                    <th scope="row" class="text-center th-color">총 연구비</th>
                                    <th scope="row" class="text-center th-color">위탁 연구비(천원)</th>
                                    <th scope="row" class="text-center th-color">담당자</th>
                                </tr>
                                </thead>
                            </table>
                        </li>
                    </ul>
                </div>
                <div class="histListDiv">
                    <ul class="histListUl">
                        <li>
                            <span class="histTitleSpan" style="cursor: pointer">개발사업</span>
                            <table class="childrenTable popTable table table-bordered mb-0">
                                <thead>
                                <tr>
                                    <th scope="row" class="text-center th-color">연번</th>
                                    <th scope="row" class="text-center th-color">개발명</th>
                                    <th scope="row" class="text-center th-color">수주일</th>
                                    <th scope="row" class="text-center th-color">수주금액</th>
                                    <th scope="row" class="text-center th-color">PM</th>
                                </tr>
                                </thead>
                            </table>
                        </li>
                    </ul>
                </div>
                <div class="histListDiv">
                    <ul class="histListUl">
                        <li>
                            <span class="histTitleSpan" style="cursor: pointer">교육훈련</span>
                            <table class="childrenTable popTable table table-bordered mb-0">
                                <thead>
                                <tr>
                                    <th scope="row" class="text-center th-color">연번</th>
                                    <th scope="row" class="text-center th-color">과목</th>
                                    <th scope="row" class="text-center th-color">기간</th>
                                    <th scope="row" class="text-center th-color">직원명</th>
                                    <th scope="row" class="text-center th-color">부서명</th>
                                    <th scope="row" class="text-center th-color">직책</th>
                                    <th scope="row" class="text-center th-color">수강료(계산서)</th>
                                </tr>
                                </thead>
                            </table>
                        </li>
                    </ul>
                </div>
                <div class="histListDiv">
                    <ul class="histListUl">
                        <li>
                            <span class="histTitleSpan" style="cursor: pointer">구매</span>
                            <table class="childrenTable popTable table table-bordered mb-0">
                                <thead>
                                <tr>
                                    <th scope="row" class="text-center th-color">연번</th>
                                    <th scope="row" class="text-center th-color">문서번호</th>
                                    <th scope="row" class="text-center th-color">구분</th>
                                    <th scope="row" class="text-center th-color">구매일</th>
                                    <th scope="row" class="text-center th-color">건명</th>
                                    <th scope="row" class="text-center th-color">담당자</th>
                                    <th scope="row" class="text-center th-color">금액</th>
                                </tr>
                                </thead>
                            </table>
                        </li>
                    </ul>
                </div>
            </div>

            <div style="display:flex; justify-content: space-between;" class="mt-20">
                <div class="subTitSt">· 관계이력</div>
            </div>
            <div class="histListDiv mt-20">
                <ul class="histListUl">
                    <li>
                        <span class="histTitleSpan" style="cursor: pointer">관계이력</span>
                        <table class="childrenTable popTable table table-bordered mb-0 text-center">
                            <thead>
                            <tr>
                                <th scope="row" class="text-center th-color">순번</th>
                                <th scope="row" class="text-center th-color">팀명</th>
                                <th scope="row" class="text-center th-color">등록자</th>
                                <th scope="row" class="text-center th-color">컨텍포인트</th>
                                <th scope="row" class="text-center th-color">상담일시</th>
                                <th scope="row" class="text-center th-color">입력구분</th>
                            </tr>
                            <c:forEach items="${rs.crmHist}" var="item" varStatus="status">
                                <tr>
                                    <td>${status.index +1}</td>
                                    <td>${item.DEPT_NAME}</td>
                                    <td>${item.EMP_NAME_KR}</td>
                                    <td>
                                            ${item.CRM_MEM_NM}
                                    </td>
                                    <td>${item.START_DATETIME}</td>
                                    <td>${item.CRM_HIST_OBJ}</td>
                                </tr>
                                <tr>
                                    <%-- TODO. 관심분야 코드 생성 후 삽입 --%>
                                    <td></td>
                                    <td colspan="5"></td>
                                </tr>
                                <tr>
                                    <td colspan="6">
                                        ${item.CRM_REL_CONT}
                                    </td>
                                </tr>
                            </c:forEach>
                            </thead>
                        </table>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</div>
<script>
    $(".histTitleSpan").click(function(){
        // height: 70px
        var baseHeight = 40;

        if($(this).hasClass("active")){
            $(this).closest(".histListDiv").css("height", baseHeight);
            $(this).removeClass("active");
        }else{
            $(this).addClass("active");
            $(this).closest(".histListDiv").css("height", baseHeight + $(this).closest(".histListDiv").find(".childrenTable").height() + 10)
        }
    })
</script>
</body>
</html>