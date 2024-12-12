<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix = "fmt" uri = "http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<jsp:useBean id="today" class="java.util.Date" />
<jsp:include page="/WEB-INF/jsp/template/common2.jsp" flush="true"></jsp:include>
<link rel="stylesheet" href="/css/quirk.css">
<link rel="stylesheet" href="/css/style.css">
<script type="text/javascript" src="/js/intra/campus/campus.js?v=${today}"></script>
<script type="text/javascript" src="/js/intra/campus/studyReqPop.js?v=${today}"></script>
<body class="font-opensans" style="background-color:#fff;">
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
<input type="hidden" id="pk" value="${params.pk}"/>
<input type="hidden" id="suerSelType" value="0">
<div class="table-responsive">
    <div class="card-header pop-header">
        <h3 class="card-title title_NM">
                <span id="studyReqTitle">
                    학습조 신청서 작성
                </span>
        </h3>
        <div class="btn-st popButton">
            <input type="button" class="k-button k-button-solid-info" value="저장" onclick="studyReq.saveBtn();"/>
            <input type="reset" style="margin-right:5px;" class="k-button k-button-solid-error" value="취소" onclick="window.close();"/>
        </div>
    </div>
    <form id="studyReqForm">
        <table class="table table-bordered mt20" id="studyReqTable">
            <colgroup>
                <col width="260px">
                <col width="740px">
            </colgroup>
            <thead>
            <tr>
                <th><span class="red-star">*</span>구분</th>
                <td>
                    <input type="text" id="studyClass" style="width: 800px">
                </td>
            </tr>
            <tr>
                <th id="titleCol"><span class="red-star">*</span>학습조명</th>
                <td>
                    <input type="text" id="studyName" style="width: 800px">
                </td>
            </tr>
            <tr class="propag ojt" style="display: none">
                <th><span class="red-star">*</span>지 도 자</th>
                <td>
                    <input type="text" id="readerUserName" style="width: 600px">
                    <input type="hidden" id="readerUserSeq">
                    <input type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" value="지도자 선택" onclick="$('#suerSelType').val('2'); fn_userMultiSelectPop()"/>
                </td>
            </tr>
            <tr>
                <th><span class="red-star">*</span>학 습 자</th>
                <td>
                    <input type="text" id="studyUserName" style="width: 600px">
                    <input type="hidden" id="studyUserSeq">
                    <input type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" value="학습자 선택" onclick="$('#suerSelType').val('1'); fn_userMultiSelectPop()"/>
                </td>
            </tr>
            <tr>
                <th id="subjectDe"><span class="red-star">*</span>학습기간</th>
                <td>
                    <div style="float: left"><input type="text" id="startDt" style="width: 30%"> ~ <input type="text" id="endDt" style="width: 30%"></div>

                    <div class="study" style="float: left; display: none">
                        &nbsp<input type="text" id="dateVal" style="width: 200px"> ex)매주 목요일 오후5시
                    </div>

                    <div class="propag" style="float: left; display: none">
                        &nbsp매회 학습시간 <input type="text" id="startTime" style="width: 15%"> ~ <input type="text" id="endTime" style="width: 15%"> (총 <input type="text" id="eduTerm" style="width: 50px" oninput="onlyNumber(this)">회 <input type="text" id="eduTime" style="width: 50px" oninput="onlyNumber()">시간)
                    </div>
                </td>
            </tr>
            <tr>
                <th id="subjectLoc"><span class="red-star">*</span>학습장소</th>
                <td>
                    <input type="text" id="studyLocation" style="width: 800px">
                </td>
            </tr>
            <tr class="subjectObj">
                <th><span class="red-star">*</span>학습목표</th>
                <td>
                    <textarea type="text" id="studyObject" style="width: 800px; height: 100px"></textarea>
                </td>
            </tr>
            <tr class="notOjt">
                <th id="subjectCont"><span class="red-star">*</span>학습내용</th>
                <td>
                    <textarea type="text" id="studyContent" style="width: 800px; height: 100px"></textarea>
                </td>
            </tr>
            <tr>
                <th>소요비용</th>
                <td>
                    <input type="text" id="studyMoney" oninput="onlyNumber(this)" onkeyup="fn_inputNumberFormat(this)" style="width: 150px" value="0"> 원
                </td>
            </tr>
            <tr>
                <th id="subjectStudyMoney">산출내역</th>
                <td>
                    <textarea id="studyMoneyVal" style="width: 800px; height: 100px"></textarea>
                </td>
            </tr>
            <tr class="study" style="">
                <th>첨부서류</th>
                <td>
                    <label for="fileList" class="k-button k-button-solid-base">파일첨부</label>
                    <input type="file" id="fileList" name="fileList" onchange="studyReq.fileChange()" style="display: none" multiple>
                    <ul id="ulSetFileName" style="padding-left: 20px;"></ul>
                    <ul id="ulFileName" style="padding-left: 20px;"></ul>
                </td>
            </tr>
            <tr>
                <th>신청날짜</th>
                <td>
                    <input type="text" id="regDate" style="width: 15%">
                </td>
            </tr>
        </table>
    </form>
</div>

<script>
    studyReq.init();

    $(function (){
        if($("#pk").val() != ""){
            $.ajax({
                url : "/campus/getStudyInfoOne",
                data : {
                    pk : $("#pk").val()
                },
                type: "post",
                dataType : "json",
                success :function(rs){
                    $("#studyClass").data("kendoDropDownList").value(rs.data.STUDY_CLASS_SN);
                    studyReq.dataSet();
                    $("#studyName").val(rs.data.STUDY_NAME);
                    $("#startDt").val(rs.data.START_DT);
                    $("#endDt").val(rs.data.END_DT);
                    $("#startTime").val(rs.data.START_TIME);
                    $("#endTime").val(rs.data.END_TIME);
                    $("#eduTerm").val(rs.data.EDU_TERM);
                    $("#eduTime").val(rs.data.EDU_TIME);
                    $("#studyLocation").val(rs.data.STUDY_LOCATION);
                    $("#studyObject").val(rs.data.STUDY_OBJECT);
                    $("#studyContent").val(rs.data.STUDY_CONTENT);
                    $("#studyMoney").val(comma(rs.data.STUDY_MONEY));
                    $("#studyMoneyVal").val(rs.data.STUDY_MONEY_VAL);
                    $("#regDate").val(rs.data.regDate);

                    if(rs.data.STUDY_CLASS_SN == 2 || rs.data.STUDY_CLASS_SN == 3) {
                        $.ajax({
                            url: '/campus/getStudyUserList',
                            data: {
                                pk: $("#pk").val(),
                                studyClassSn: 4
                            },
                            type: "post",
                            dataType: "json",
                            success: function (rs) {

                                var studyUserNames = rs.list.map(function (item) {
                                    return item.STUDY_EMP_NAME;
                                }).join(',');

                                var studyUserSeqs = rs.list.map(function (item) {
                                    return item.STUDY_EMP_SEQ;
                                }).join(',');

                                $("#readerUserName").val(studyUserNames);
                                $("#readerUserSeq").val(studyUserSeqs);
                            }
                        })
                        $.ajax({
                            url: '/campus/getStudyUserList',
                            data: {
                                pk: $("#pk").val(),
                                studyClassSn: 5
                            },
                            type: "post",
                            dataType: "json",
                            success: function (rs) {

                                var studyUserNames = rs.list.map(function (item) {
                                    return item.STUDY_EMP_NAME;
                                }).join(',');

                                var studyUserSeqs = rs.list.map(function (item) {
                                    return item.STUDY_EMP_SEQ;
                                }).join(',');

                                $("#studyUserName").val(studyUserNames);
                                $("#studyUserSeq").val(studyUserSeqs);
                            }
                        })
                    }else if(rs.data.STUDY_CLASS_SN == 1){
                        $.ajax({
                            url: '/campus/getStudyUserList',
                            data: {
                                pk: $("#pk").val()
                            },
                            type: "post",
                            dataType: "json",
                            success: function (rs) {

                                var studyUserNames = rs.list.map(function (item) {
                                    return item.STUDY_EMP_NAME;
                                }).join(',');

                                var studyUserSeqs = rs.list.map(function (item) {
                                    return item.STUDY_EMP_SEQ;
                                }).join(',');

                                $("#studyUserName").val(studyUserNames);
                                $("#studyUserSeq").val(studyUserSeqs);
                            }
                        })
                    }
                }
            })

            studyReq.settingTempFileDataInit();
        }
    });
</script>
</body>
