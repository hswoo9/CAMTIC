<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix = "fmt" uri = "http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<jsp:useBean id="today" class="java.util.Date" />
<jsp:include page="/WEB-INF/jsp/template/common2.jsp" flush="true"></jsp:include>
<link rel="stylesheet" href="/css/quirk.css">
<link rel="stylesheet" href="/css/style.css">
<script type="text/javascript" src="/js/intra/campus/campus.js?v=${toDate}"></script>
<script type="text/javascript" src="/js/intra/campus/study/propagResultPop.js?v=${toDate}"/></script>

<body class="font-opensans" style="background-color:#fff;">

<form id="studyDraftFrm" method="post">
    <input type="hidden" id="pk" name="pk" value="${params.pk}"/>
    <input type="hidden" id="menuCd" name="menuCd" value="propagRes">
    <input type="hidden" id="type" name="type" value="drafting">
    <input type="hidden" id="nowUrl" name="nowUrl" />
</form>

<input type="hidden" id="regEmpSeq" value="${loginVO.uniqId}"/>
<input type="hidden" id="regEmpName" value="${loginVO.name}"/>

<input type="hidden" id="resultMode" value="${params.mode}" />

<div class="table-responsive">
    <div class="card-header pop-header">
        <h3 class="card-title title_NM">
            <span style="">
                전파학습 결과보고서
            </span>
        </h3>
        <div class="btn-st popButton">
            <span id="propagResBtnBox">

            </span>
            <input type="button" id="cancelBtn" style="margin-right:5px;" class="k-button k-button-solid-error" value="닫기" onclick="window.close();"/>
        </div>
    </div>

    <div class="card-header" style="padding-top:15px;">
        <div class="col-lg-6" style="margin:0 auto;">
            <div class="table-responsive">
                <div class="popupTitleSt">지도자</div>
            </div>
            <div id="mainGrid"></div>
        </div>
        <div class="col-lg-6" style="margin:0 auto;">
            <div class="table-responsive">
                <div class="popupTitleSt">학습자</div>
            </div>
            <div id="subGrid"></div>
        </div>
    </div>
</div>

<div class="table-responsive" id="main2">
    <div class="card-header pop-header">
        <h3 class="card-title title_NM">
                <span style="">
                    학습개요
                </span>
        </h3>
        <div class="btn-st popButton">

        </div>
    </div>
    <div class="card-header" style="padding-top:15px;">
        <div class="col-lg-12" style="margin:0 auto;">
            <form id="" style="";>
                <table class="popTable table table-bordered mb-0">
                    <colgroup>
                        <col width="20%">
                        <col width="80%">
                    </colgroup>
                    <thead>
                    <tr>
                        <th>학습주제</th>
                        <td id="propagNameTd"></td>
                    </tr>
                    <tr>
                        <th>학습기간</th>
                        <td id="propagDtTd"></td>
                    </tr>
                    <tr>
                        <th>학습장소</th>
                        <td id="propagLocationTd"></td>
                    </tr>
                    <tr>
                        <th>학습내용</th>
                        <td id="propagContentTd"></td>
                    </tr>
                    <tr>
                        <th>소요비용</th>
                        <td id="propagAmtTd"></td>
                    </tr>
                    <tr>
                        <th>비용내역</th>
                        <td id="propagAmtTextTd"></td>
                    </tr>
                    <tr>
                        <th>작성일</th>
                        <td id="regDateTd"></td>
                    </tr>
                    </thead>
                </table>
            </form>
        </div>
    </div>
</div>

<div id="propagGrid" class="table-responsive" style="margin-top: 15px;">
    <div class="card-header pop-header" style="margin-bottom: 15px;">
        <h3 class="card-title title_NM">
                <span style="">
                    학습일지
                </span>
        </h3>
        <div class="btn-st popButton">

        </div>
    </div>
    <div id="mainGrid3" style=""></div>
</div>

<c:if test="${params.mode eq 'mng'}">
<div class="table-responsive" id="main3">
    <div class="card-header pop-header">
        <h3 class="card-title title_NM">
                <span style="">
                    인정시간
                </span>
        </h3>
        <div class="btn-st popButton">

        </div>
    </div>
    <div class="card-header" style="padding-top:15px;">
        <div class="col-lg-12" style="margin:0 auto;">
            <form id="d" style="";>
                <table class="popTable table table-bordered mb-0">
                    <colgroup>
                        <col width="10%">
                        <col width="20%">
                        <col width="20%">
                        <col width="20%">
                        <col width="30%">
                    </colgroup>
                    <thead id="table">
                    <tr>
                        <th>순번</th>
                        <th>일 시</th>
                        <th>지도자 인정시간</th>
                        <th>학습자 인정시간</th>
                        <th>학습자</th>
                    </tr>
                    </thead>
                </table>
            </form>
        </div>
    </div>
</div>
</c:if>

<script>
    propagView.init();

    function fn_setSubjectMember(pk){
        var url = "/campus/pop/popSubjectMember.do?studyInfoSn=" + pk;

        var name = "inEvalRegPop";
        var option = "width=800, height=600, scrollbars=no, top=100, left=200, resizable=no, toolbars=no, menubar=no"
        var popup = window.open(url, name, option);
    }

    if($("#resultMode").val() == "mng"){
        $("#apprBtn").css("display", "");

        var studyParam ={
            pk : $("#pk").val()
        }
        var rs = customKendo.fn_customAjax("/campus/getStudyInfoOne", studyParam);
        console.log(rs);
        if(rs.data.ADD_STATUS == "S"){
            $("#apprBtn").css("display", "none");
        }
    }

    if($("#studyResultSn").val() != ""){
        $.ajax({
            url : "/campus/getStudyResultData",
            data : {
                studyResultSn : $("#studyResultSn").val()
            },
            type: "post",
            dataType : "json",
            success :function(rs){
                $("#journalDt").val(rs.data.STUDY_RESULT_DT);
                $("#journalDt").val(rs.data.STUDY_RESULT_DT);
                $("#journalStartTime").val(rs.data.STUDY_RESULT_START_TIME);
                $("#journalEndTime").val(rs.data.STUDY_RESULT_END_TIME);
                $("#studyLocation").val(rs.data.STUDY_RESULT_LOCATE);
                $("#studyUserName").val(rs.data.STUDY_EMP_NAME);
                $("#studyUserSeq").val(rs.data.STUDY_EMP_SEQ);
                $("#studyContent").val(rs.data.STUDY_RESULT_CONTENT);
                $("#studyMoney").val(comma(rs.data.STUDY_RESULT_AMT));
            }
        });

        $("#main2").css("display", "");

        $("#saveBtn").css("display", "none");
        studyUserSetting();
    } else {
        $.ajax({
            url : "/campus/getStudyJournalList",
            data : {
                studyInfoSn : $("#pk").val()
            },
            type: "post",
            dataType : "json",
            success :function(rs){
                var item = rs.list;
                var cost = 0;
                for(var i = 0 ; i < item.length ; i++){
                    cost += Number(item[i].JOURNAL_AMT);
                }

                $("#studyMoney").val(comma(cost));
            }
        });
    }

    function studyUserSetting(){
        let data = {
            pk: $("#pk").val()
        }
        // const result = customKendo.fn_customAjax("/campus/getStudyUserList", data);
        const result = customKendo.fn_customAjax("/campus/getStudyResultList", data);

        studyView.global.studyUserList = result.list;


        let list = studyView.global.studyUserList;

        let html = '';
        html += '<colgroup>';
        html += '<col width="8%"><col width="25%"><col width="20%"><col width="20%"><col width="12%"><col width="12%">';
        html += '</colgroup>';

        html += '<thead>';
        html += '<tr>';
        html += '<th>구분</th>';
        html += '<th>부서명</th>';
        html += '<th>직위</th>';
        html += '<th>성명</th>';
        html += '<th>이수횟수</th>';
        html += '<th>이수시간</th>';
        html += '</tr>';

        for(let i=0; i<list.length; i++){
            html += '<tr>';
            html += '<td style="text-align: center">'+list[i].STUDY_CLASS_TEXT+'</td>';
            html += '<td style="text-align: center">'+list[i].STUDY_DEPT_NAME+' '+list[i].STUDY_TEAM_NAME+'</td>';
            html += '<td style="text-align: center">'+list[i].STUDY_POSITION_NAME+'</td>';
            html += '<td style="text-align: center">'+list[i].STUDY_EMP_NAME+'</td>';
            html += '<td style="text-align: center">'+list[i].STUDY_EMP_CNT+'</td>';
            html += '<td style="text-align: center">'+list[i].STUDY_TIME+'</td>';
            html += '</tr>';
            if(list[i].STUDY_CLASS_TEXT == "조장"){
                studyView.global.mngEmpSeq = list[i].STUDY_EMP_SEQ;
            }
        }
        $("#studyUserTable").html(html);
    }


    function inputNumberFormat (obj){
        obj.value = comma(uncomma(obj.value));
    }

    function comma(str) {
        str = String(str);
        return str.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,');
    }

    function uncomma(str) {
        str = String(str);
        return str.replace(/[^\d]+/g, '');
    }

    function fn_save(){
        var arr = new Array();
        $.each($(".addRow"), function(i, v){
            let data = {
                studyPropagSn : $("#studyPropagSn"+i).val(),
                mng : $("#mng"+i).val(),
                user : $("#user"+i).val()
            }
            arr.push(data);
        });
        let data = {
            arr: JSON.stringify(arr),
            studyInfoSn: $("#pk").val()
        }
        var result = customKendo.fn_customAjax("/campus/setResultPropagUpd", data);
        if(result.flag){
            opener.location.reload();
            $("#studyDraftFrm").one("submit", function() {
                var url = "/Campus/pop/propagResApprovalPop.do";
                var name = "_self";
                var option = "width=965, height=900, scrollbars=no, top=100, left=200, resizable=yes, scrollbars = yes, status=no, top=50, left=50";
                var popup = window.open(url, name, option);
                this.action = "/Campus/pop/propagResApprovalPop.do";
                this.method = 'POST';
                this.target = '_self';
            }).trigger("submit");
        }else{
            alert("데이터 저장 중 오류가 발생하였습니다.");
        }
    }

    function fn_approval(){
        if($("#resultMode").val() == "mng"){
            var data = {
                studyInfoSn : $("#pk").val(),
            }
            $.ajax({
                url : "/campus/setStudyResultSc",
                data : data,
                type : "post",
                dataType: "json",
                success :function(rs){
                    if(rs.code == 200){
                        alert("승인되었습니다.");
                        opener.location.reload();
                        opener.opener.gridReload();
                        window.close();
                    }
                }
            });
        }
    }
</script>
</body>
