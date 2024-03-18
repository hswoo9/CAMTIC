<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix = "fmt" uri = "http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<jsp:useBean id="today" class="java.util.Date" />
<jsp:include page="/WEB-INF/jsp/template/common2.jsp" flush="true"></jsp:include>

<style>
    .k-window  div.k-window-content {overflow: hidden;}
</style>
<body class="font-opensans" style="background-color:#fff;">
<script type="text/javascript" src="<c:url value='/js/intra/cam_project/unRnd/lecture.js?v=${today}'/>"></script>
<script type="text/javascript" src="<c:url value='/js/intra/cam_project/unRnd/lecturePopup.js?v=${today}'/>"></script>
<script type="text/javascript" src="<c:url value='/js/intra/cam_project/unRnd/lectureReq.js?v=${today}'/>"></script>

<input type="hidden" id="regEmpSeq" value="${loginVO.uniqId}"/>
<input type="hidden" id="regEmpName" value="${loginVO.name}"/>
<input type="hidden" id="regDeptSeq" value="${loginVO.deptId}"/>
<input type="hidden" id="regDeptName" value="${loginVO.deptNm}"/>
<input type="hidden" id="regTeamSeq" value="${loginVO.teamId}"/>
<input type="hidden" id="regTeamName" value="${loginVO.teamNm}"/>
<input type="hidden" id="regPositionCode" value="${loginVO.positionCode}"/>
<input type="hidden" id="regPositionName" value="${loginVO.positionNm}"/>
<input type="hidden" id="regDutyCode" value="${loginVO.dutyCode}"/>
<input type="hidden" id="regDutyName" value="${loginVO.dutyNm}"/>
<input type="hidden" id="regGradeCode" value="${loginVO.gradeCode}"/>
<input type="hidden" id="regGradeName" value="${loginVO.gradeNm}"/>
<input type="hidden" id="pjtSn" value="${params.pjtSn}"/>
<input type="hidden" id="pk" value="${params.pk}"/>
<input type="hidden" id="mode" value="${params.mode}"/>
<input type="hidden" id="type" name="type" />


<div style="padding:0;">
    <div class="table-responsive">
        <div class="card-header pop-header">
            <h3 class="card-title title_NM">
                <span id="topTitle" style="position: relative; top: 3px;">
                    교육 단위사업
                </span>
                <c:if test="${params.stat != 'v'}">
                    <span style="position: relative; top: 3px;">작성</span>
                </c:if>
            </h3>
            <div id="purcBtnDiv" class="btn-st popButton">
                <button type="button" class="k-button k-button-solid-base" id="consultantBtn" style="display: none" onclick="lecturePop.consultingTeacherPop('${params.pk}');">컨설턴트관리</button>
                <button type="button" class="k-button k-button-solid-base" id="teacherBtn" style="display: none" onclick="lecturePop.lectureTeacherPop('${params.pk}');">강사관리</button>
                <%--<button type="button" class="k-button k-button-solid-base" id="personBtn" style="display: none" onclick="lecturePop.lecturePersonPop('${params.pk}');">수강신청관리</button>
                <button type="button" class="k-button k-button-solid-base" id="eduBtn" style="display: none" onclick="lecturePop.lectureEduPop('${params.pk}');">이수관리</button>--%>
                <button type="button" class="k-button k-button-solid-base" id="eduBtn" style="display: none" onclick="lecturePop.lectureEduPop('${params.pk}');">수강생관리</button>
               <%-- <button type="button" class="k-button k-button-solid-base" id="payBtn" style="display: none" onclick="lecturePop.lecturePayPop('${params.pk}');">교육비관리</button>--%>
                <button type="button" class="k-button k-button-solid-primary" id="modBtn" style="display: none" onclick="lectureReq.fn_saveBtn();">수정</button>
                <button type="button" class="k-button k-button-solid-info" id="saveBtn" onclick="lectureReq.fn_saveBtn();">저장</button>
                <button type="button" class="k-button k-button-solid-error" onclick="window.close()">닫기</button>
            </div>
        </div>

        <%--<div style="padding: 0 30px;">
            <table class="popTable table table-bordered mb-0">
                <colgroup>
                    <col width="15%">
                    <col width="35%">
                    <col width="15%">
                    <col width="35%">
                </colgroup>
                <tr>
                    <th scope="row" class="text-center th-color" style="background-color: #8fa1c04a"><span class="red-star">*</span>구분</th>
                    <td colspan="3">
                        <input type="text" id="writeClass" style="width: 800px">
                    </td>
                </tr>
            </table>
        </div>--%>

        <div class="lecture" style="padding: 20px 30px;">
            <div id="lecTeacherInfo">
                <table class="popTable table table-bordered mb-20">
                    <colgroup>
                        <col width="50%">
                        <col width="50%">
                    </colgroup>
                    <thead>
                    <tr>
                        <th scope="row" class="text-center th-color">성명</th>
                        <th scope="row" class="text-center th-color">휴대폰번호</th>
                        <%--<td id="lecName"></td>--%>
                        <%--<td id="lecName2"></td>
                        <td id="lecName3"></td>--%>
                    </tr>
                    </thead>
                    <tbody id="tList">
                    <%--<tr>
                        <td id="lecNumP"></td>
                        <td id="lecNumP"></td>
                    </tr>--%>
                    </tbody>


                </table>

                <%--<table class="popTable table table-bordered mb-20">
                    <colgroup>
                        <col width="15%">
                        <col width="28%">
                        <col width="28%">
                        <col width="28%">
                    </colgroup>
                    <thead>
                    <tr>
                        <th scope="row" class="text-center th-color">성명</th>
                        <td id="lecName4"></td>
                        <td id="lecName5"></td>
                        <td id="lecName6"></td>
                    </tr>
                    <tr>
                        <th scope="row" class="text-center th-color">휴대폰 번호</th>
                        <td id="lecNumP4"></td>
                        <td id="lecNumP5"></td>
                        <td id="lecNumP6"></td>
                    </tr>
                    </thead>
                </table>--%>
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
                    <%--<th scope="row" class="text-center th-color"><span class="red-star">*</span>사업구분</th>
                    <td>
                        <input id="projectType" style="width: 370px;">
                    </td>--%>
                    <th scope="row" class="text-center th-color"><span class="red-star">*</span>교육분야</th><%--컨설팅 컨설팅분야--%>
                    <td colspan="3">
                        <input id="fieldType" style="width: 200px;">
                        <input id="fieldType2" style="width: 200px;">
                    </td>
                </tr>
                <%--<tr>
                    <th scope="row" class="text-center th-color"><span class="red-star">*</span>과목명</th>
                    <td>
                        <input id="curriculumType" style="width: 200px;">
                    </td>
                    <th scope="row" class="text-center th-color"><span class="red-star">*</span>과정명</th>
                    <td>
                        <input id="courseType" style="width: 200px;">
                    </td>
                </tr>--%>
                <tr>
                    <th scope="row" class="text-center th-color"><%--<span class="red-star">*</span>--%>강좌명(사업명)</th><%--컨설팅 사업명--%>
                    <td colspan="3">
                        <input id="lectureName" style="width: 800px;">
                    </td>
                </tr>
                <tr>
                    <th scope="row" class="text-center th-color"><span class="red-star">*</span>강좌명(홍보용)</th>
                    <td colspan="3">
                        <input id="lectureNameEx" style="width: 800px;">
                    </td>
                </tr>
                <%--<tr>
                    <th scope="row" class="text-center th-color"><span class="red-star">*</span>주제(CEO)</th>&lt;%&ndash;컨설팅 과제명&ndash;%&gt;
                    <td colspan="3">
                        <input id="title" style="width: 800px;">
                    </td>
                </tr>--%>
                <%--<tr>
                    <th scope="row" class="text-center th-color">과정안내 문구1</th>
                    <td colspan="3">
                        <textarea id="content1" style="width: 800px; height: 100px"></textarea>
                    </td>
                </tr>--%>
                <%--<tr>
                    <th scope="row" class="text-center th-color">과정안내 문구2</th
                    <td colspan="3">
                        <textarea id="content2" style="width: 800px; height: 100px"></textarea>
                    </td>
                </tr>--%>
                <tr>
                    <th scope="row" class="text-center th-color"><span class="red-star">*</span>교육기간</th><%--컨설팅 협약기간--%>
                    <td>
                        <input id="eduStartDt" style="width: 110px;">
                        ~
                        <input id="eduEndDt" style="width: 110px;">
                    </td>
                    <th scope="row" class="text-center th-color"><span class="red-star">*</span>모집기간</th>
                    <td>
                        <input id="recruitStartDt" style="width: 110px;">
                        ~
                        <input id="recruitEndDt" style="width: 110px;">
                    </td>
                </tr>
                <tr>
                    <th scope="row" class="text-center th-color"><span class="red-star">*</span>모집인원</th><%--컨설팅 수혜인원 수--%>
                    <td>
                        <input id="recruitNum" oninput="onlyNumber(this)" onkeyup="fn_inputNumberFormat(this)" style="width: 40px;"> 명
                    </td>
                    <th scope="row" class="text-center th-color"><span class="red-star">*</span>총 교육시간</th> <%--컨설팅 시간--%>
                    <td>
                        총 <input id="eduTime" oninput="onlyNumber(this)" onkeyup="fn_inputNumberFormat(this)" style="width: 40px;" disabled> 시간<%--/
                        <input id="eduTimeEx" style="width: 140px;"> 예) 18:30~22:00--%>
                    </td>
                </tr>
                <tr>
                    <th scope="row" class="text-center th-color"><span class="red-star">*</span>교육장소</th><%--컨설팅 수혜기업명, 수혜기업 담당자--%>
                    <td>
                        <input id="area" style="width: 400px;">
                    </td>
                    <th scope="row" class="text-center th-color"><span class="red-star">*</span>진행상태</th>
                    <td>
                        <input id="status" style="width: 200px;">
                    </td>
                </tr>
                <%--<tr>
                    <th scope="row" class="text-center th-color">교육목표</th>
                    <td colspan="3">
                        <textarea id="goal" style="width: 800px; height: 100px"></textarea>
                    </td>
                </tr>
                <tr>
                    <th scope="row" class="text-center th-color">교육개요</th>
                    <td colspan="3">
                        <textarea id="intro" style="width: 800px; height: 150px"></textarea>
                    </td>
                </tr>
                <tr>
                    <th scope="row" class="text-center th-color">교육대상</th>
                    <td colspan="3">
                        <textarea id="targetUser" style="width: 800px; height: 100px"></textarea>
                    </td>
                </tr>--%>
                <tr>
                    <th scope="row" class="text-center th-color">교육내용<%--(내용)<br>(HTML)--%></th>
                    <td colspan="3">
                        <textarea id="scheduleHtml" style="width: 800px; height: 150px"></textarea>
                    </td>
                </tr>
                <tr>
                    <th scope="row" class="text-center th-color">교육문의 및 안내사항</th>
                    <td colspan="3">
                        <textarea id="prospectus" style="width: 800px; height: 100px"></textarea>
                    </td>
                </tr>
                <%--<tr>
                    <th scope="row" class="text-center th-color">준비물</th>
                    <td colspan="3">
                        <textarea id="materials" style="width: 800px; height: 100px"></textarea>
                    </td>
                </tr>--%>
                <tr>
                    <%--<th scope="row" class="text-center th-color"><span class="red-star">*</span>교육비(교재비)</th>
                    <td>
                        <input id="textbookFee" oninput="onlyNumber(this)" onkeyup="fn_inputNumberFormat(this)" style="width: 80px;" value="0"> 원 (없으면 0원 입력)
                    </td>--%>
                    <th scope="row" class="text-center th-color"><span class="red-star">*</span>운영방법(대상자)</th>
                    <td>
                        <span id="methodType" <%--style="width: 300px;"--%>></span>
                    </td>
                    <th scope="row" class="text-center th-color"><span class="red-star">*</span>대상자(홍보용)</th>
                    <td colspan="2">
                        <input id="methodTypePr">
                    </td>
                </tr>
                <%--<tr>
                    <th scope="row" class="text-center th-color"><span class="red-star">*</span>인증서</th>
                    <td colspan="3">
                        <span id="certType" style="width: 300px;"></span>
                    </td>
                </tr>--%>
                <tr>
                    <th scope="row" class="text-center th-color">실적 이미지</th>
                    <td>
                        <input type="hidden" id="file1Sn" name="file1Sn">
                        <label for="file1" id="file1Label" class="k-button k-button-solid-base">파일첨부</label>
                        <input type="file" id="file1" name="file1" onchange="fileChange(this)" style="display: none">
                        <span id="file1Name"></span>
                    </td>
                    <th scope="row" class="text-center th-color"><span class="red-star">*</span>메인게시여부</th>
                    <td colspan="3">
                        <span id="mainType" style="width: 300px;"></span>
                    </td>
                </tr>
                <tr>
                    <th scope="row" class="text-center th-color">첨부파일 양식</th>
                    <td>
                        <input type="hidden" id="file2Sn" name="file2Sn">
                        <label for="file2" id="file2Label" class="k-button k-button-solid-base">파일첨부</label>
                        <input type="file" id="file2" name="file2" onchange="fileChange2(this)" style="display: none" aria-label="files" multiple>
                        <div style="width:50%; display: inline-flex;">
                            <span id="file2Name"></span>
                        </div>
                    </td>
                    <th scope="row" class="text-center th-color">포스터</th>
                    <td>
                        <input type="hidden" id="file3Sn" name="file3Sn">
                        <label for="file3" id="file3Label" class="k-button k-button-solid-base">파일첨부</label>
                        <input type="file" id="file3" name="file3" onchange="fileChange(this)" style="display: none">
                        <span id="file3Name"></span>
                    </td>
                </tr>
                <%--<tr>
                    <th scope="row" class="text-center th-color">메일첨부1</th>
                    <td colspan="3">
                        <input type="hidden" id="file3Sn" name="file1Sn">
                        <label for="file2" id="file3Label" class="k-button k-button-solid-base">파일첨부</label>
                        <input type="file" id="file3" name="file2" onchange="prp.fileChange(this)" style="display: none">
                        <span id="file3Name"></span>
                    </td>
                </tr>
                <tr>
                    <th scope="row" class="text-center th-color">메일첨부2</th>
                    <td colspan="3">
                        <input type="hidden" id="file4Sn" name="file1Sn">
                        <label for="file2" id="file4Label" class="k-button k-button-solid-base">파일첨부</label>
                        <input type="file" id="file4" name="file2" onchange="prp.fileChange(this)" style="display: none">
                        <span id="file4Name"></span>
                    </td>
                </tr>--%>
                </thead>
            </table>
        </div>


        <div class="consulting" style="padding: 20px 30px; display: none;">
            <div id="conTeacherInfo" style="display: none;">
                <table class="popTable table table-bordered mb-20">
                    <colgroup>
                        <col width="15%">
                        <col width="28%">
                        <col width="28%">
                        <col width="28%">
                    </colgroup>
                    <thead>
                    <tr>
                        <th scope="row" class="text-center th-color">성명</th>
                        <td id="tcName"></td>
                        <td id="tcName2"></td>
                        <td id="tcName3"></td>
                    </tr>
                    <tr>
                        <th scope="row" class="text-center th-color">생년월일</th>
                        <td id="tcBirth"></td>
                        <td id="tcBirth2"></td>
                        <td id="tcBirth3"></td>
                    </tr>
                    <tr>
                        <th scope="row" class="text-center th-color">성별</th>
                        <td id="tcGender"></td>
                        <td id="tcGender2"></td>
                        <td id="tcGender3"></td>
                    </tr>
                    <tr>
                        <th scope="row" class="text-center th-color">전화번호</th>
                        <td id="tcNum"></td>
                        <td id="tcNum2"></td>
                        <td id="tcNum3"></td>
                    </tr>
                    <tr>
                        <th scope="row" class="text-center th-color">휴대폰 번호</th>
                        <td id="tcNumP"></td>
                        <td id="tcNumP2"></td>
                        <td id="tcNumP3"></td>
                    </tr>
                    <tr>
                        <th scope="row" class="text-center th-color">이메일</th>
                        <td id="tcEmail"></td>
                        <td id="tcEmail2"></td>
                        <td id="tcEmail3"></td>
                    </tr>
                    </thead>
                </table>
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
                    <th scope="row" class="text-center th-color"><span class="red-star">*</span>컨설팅분야</th>
                    <td colspan="3">
                        <input id="field" style="width: 200px;">
                        <input id="field2" style="width: 200px;">
                        <input id="field3" style="width: 200px;">
                    </td>
                </tr>
                <tr>
                    <th scope="row" class="text-center th-color"><span class="red-star">*</span>사업명</th>
                    <td colspan="3">
                        <%--<input id="conName" style="width: 800px;">--%>
                        <input id="conProjectType" style="width: 370px;">
                    </td>
                </tr>
                <tr>
                    <th scope="row" class="text-center th-color"><span class="red-star">*</span>과제명</th>
                    <td colspan="3">
                        <input id="conTitle" style="width: 800px;">
                    </td>
                </tr>
                <tr>
                    <th scope="row" class="text-center th-color"><span class="red-star">*</span>세부 프로그램명</th>
                    <td colspan="3">
                        <input id="conDetailTitle" style="width: 800px;">
                    </td>
                </tr>
                <tr>
                    <th scope="row" class="text-center th-color"><span class="red-star">*</span>협약기간</th>
                    <td>
                        <input id="agmStartDt" style="width: 110px;">
                        ~
                        <input id="agmEndDt" style="width: 110px;">
                    </td>
                    <th scope="row" class="text-center th-color"><span class="red-star">*</span>컨설팅 시간</th>
                    <td>
                        <input id="conTime" oninput="onlyNumber(this)" onkeyup="fn_inputNumberFormat(this)" value="" style="width: 40px;" disabled> 시간
                    </td>
                </tr>
                <tr>
                    <th scope="row" class="text-center th-color">수혜기업명</th>
                    <td>
                        <input id="conArea" style="width: 400px;">
                    </td>
                    <th scope="row" class="text-center th-color"><span class="red-star">*</span>컨설팅 비용</th>
                    <td>
                        <input id="conCost" oninput="onlyNumber(this)" onkeyup="fn_inputNumberFormat(this)" style="width: 130px; text-align: right;"> 원
                    </td>
                </tr>
                <tr>
                    <th scope="row" class="text-center th-color"><span class="red-star">*</span>수혜기업 담당자</th>
                    <td>
                        <input id="conPerson" style="width: 200px;">
                    </td>
                    <th scope="row" class="text-center th-color"><span class="red-star">*</span>수혜인원 수</th>
                    <td>
                        <input id="conNum" oninput="onlyNumber(this)" onkeyup="fn_inputNumberFormat(this)" style="width: 40px;"> 명
                    </td>
                </tr>
                <tr>
                    <th scope="row" class="text-center th-color"><span class="red-star">*</span>메인게시여부</th>
                    <td colspan="3">
                        <span id="conMainType" style="width: 300px;"></span>
                    </td>
                </tr>
                </thead>
            </table>
        </div>
    </div>
</div>

<div id="lecReqSelectModal" style="overflow-x: hidden ">
</div>

<script type="text/javascript">
    const currentUrl = window.location.href;
    const urlParams = new URLSearchParams(currentUrl);
    const typeValue = urlParams.get('type');

    $(function(){
        if(typeValue == "lec"){
            $(".consulting").css("display", "none");
            $(".lecture").css("display", "");
            $("#topTitle").text("교육 단위사업");
        }else if(typeValue == "con"){
            $(".consulting").css("display", "");
            $(".lecture").css("display", "none");
            $("#topTitle").text("컨설팅 단위사업");
        }
    });

    function openModalSelect(){
        $("#lecReqSelectModal").data("kendoWindow").open();
    }

    function fileChange(e){
        $(e).next().text($(e)[0].files[0].name);
    }

    function fileChange2(e) {
        const files = $(e)[0].files;
        const fileNames = [];

        for (const file of files) {
            fileNames.push(file.name);
        }

        $("#file2Name").text(fileNames.join(", "));
    }
    
    lectureReq.fn_defaultScript();
</script>
</body>
</html>