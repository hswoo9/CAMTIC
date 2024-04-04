<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>

<jsp:useBean id="today" class="java.util.Date" />
<jsp:include page="/WEB-INF/jsp/template/common2.jsp" flush="true"></jsp:include>

<script type="text/javascript" src="<c:url value='/js/intra/cam_project/commonProject.js?v=${today}'/>"></script>
<script type="text/javascript" src="<c:url value='/js/intra/cam_mng/g20Callback.js?v=${today}'/>"></script>

<script type="text/javascript" src="<c:url value='/js/intra/common/kendoSettings.js?v=${today}'/>"></script>


<style>
    .k-footer-template td:nth-child(4) {
        overflow: visible;
        white-space: nowrap;
        text-align: right;
    }

    .k-footer-template td:nth-child(1),
    .k-footer-template td:nth-child(2),
    .k-footer-template td:nth-child(3),
    .k-footer-template td:nth-child(4) {
        border-width: 0;
    }
</style>


<input type="hidden" id="regEmpSeq" value="${loginVO.uniqId}"/>
<input type="hidden" id="cardToSn" name="cardToSn" value="${params.cardToSn}"/>

<input type="hidden" id="pmEmpSeq" value="${pjtInfo.PM_EMP_SEQ}" />
<input type="hidden" id="pm" value="${pjtInfo.PM}" />

<form id="meetingDraftFrm" method="post">
    <input type="hidden" id="menuCd" name="menuCd" value="meeting">
    <input type="hidden" id="type" name="type" value="drafting">
    <input type="hidden" id="nowUrl" name="nowUrl" />
    <input type="hidden" id="metSn" name="metSn" value="${params.metSn}"/>
</form>

<div>
    <div class="card-header pop-header">
        <h3 class="card-title title_NM">
            <span style="position: relative; top: 3px;" id="cardToTitle">
                사전승인신청서 작성
            </span>
        </h3>
        <div id="purcBtnDiv" class="btn-st popButton" style="font-size: 12px;">
            <span id="meetingBtnBox">

            </span>
            <button type="button" class="k-button k-button-solid-info" id="saveBtn" onclick="fn_save()">등록</button>
            <button type="button" class="k-button k-button-solid-error" onclick="window.close()">닫기</button>
        </div>
    </div>

    <div class="" style="padding: 10px">
        <table class="popTable table table-bordered mb-0">
            <colgroup>
                <col width="20%">
                <col width="30%">
                <col width="20%">
                <col width="30%">
            </colgroup>
            <thead>
            <tr>
                <th scope="row" class="text-center th-color">
                    <span class="red-star">*</span>사업명
                </th>
                <td colspan="3">
                    <input type="text" id="pjtNm" disabled name="pjtNm" style="width: 85%" value="${pjtInfo.BS_TITLE}" />
                    <button type="button" id="pjtBtn" class="k-button k-button-solid-base" onclick="fn_projectPop()">검색</button>
                    <input type="hidden" id="pjtSn" name="pjtSn" value="${pjtInfo.PJT_SN}"/>
                    <input type="hidden" id="pjtCd" name="pjtCd" value="${pjtInfo.PJT_CD}"/>
                </td>
            </tr>
            <tr>
                <th scope="row" class="text-center th-color">
                    <span class="red-star">*</span>과제명
                </th>
                <td colspan="3">
                    <input type="text" id="pjtSubNm" name="pjtSubNm" disabled value="${pjtInfo.PJT_NM}"/>
                </td>
            </tr>
            <tr>
                <th scope="row" class="text-center th-color">
                    <span class="red-star">*</span>과제기간
                </th>
                <td colspan="3">
                    <fmt:formatDate var="strDt" value="${pjtInfo.STR_DT}" pattern="yyyy-MM-dd"/>
                    <fmt:formatDate var="endDt" value="${pjtInfo.END_DT}" pattern="yyyy-MM-dd"/>

                    <input type="text" value="${strDt}" id="pjtStrDe" name="pjtStrDe" style="width: 20%" disabled/> ~ <input type="text" value="${endDt}" style="width: 20%" id="pjtEndDe" disabled name="pjtEndDe"/>

                    <input type="hidden" id="strDt" value="${strDt}" />
                    <input type="hidden" id="endDt" value="${endDt}" />
                </td>
            </tr>
            <tr>
                <th scope="row" class="text-center th-color">
                    <span class="red-star">*</span>회의일시
                </th>
                <td colspan="3">
                    <input type="text" id="metDe" value="" style="width: 20%;">
                    <input type="text" id="metStrTime" style="width: 10%"> ~ <input type="text" id="metEndTime" style="width: 10%">
                </td>
            </tr>
            <tr>
                <th scope="row" class="text-center th-color">
                    <span class="red-star">*</span>장소
                </th>
                <td colspan="3">
                    <input type="text" id="metLoc" value="" style="width: 90%;">
                </td>
            </tr>
            <tr>
                <th scope="row" class="text-center th-color">
                    <span class="red-star">*</span>목적
                </th>
                <td colspan="3">
                    <input type="text" id="metObj" style="width: 90%;">
                </td>
            </tr>
            <tr>
                <th scope="row" class="text-center th-color">
                    <span class="red-star">*</span>내용
                </th>
                <td colspan="3">
                    <textarea id="metCont" style="width: 90%;"></textarea>
                </td>
            </tr>

            <tr>
                <th scope="row" class="text-center th-color">
                    <span class="red-star"></span>참석자(내부직원)
                </th>
                <td colspan="3">
                    <input type="text" disabled id="empName" style="width: 85%;">
                    <input type="hidden" id="empSeq" style="width: 85%;">
                    <button type="button" id="userSearchBtn" onclick="userSearch()" class="k-button k-button-solid-base">검색</button>
                </td>
            </tr>

            <tr>
                <th scope="row" class="text-center th-color">
                    <span class="red-star"></span>참석자(외부인원)
                </th>
                <td colspan="3">
                    <input id="externalName" disabled name="bustripAdd" readonly style="width: 85%;">
                    <button type="button" id="exAddBtn" class="k-button k-button-solid-base" onclick="addExternalWorkforcePop();">검색</button>
                    <div id="externalList">
                        <input type="hidden" id="externalBelong" name="externalEmpSeq" value="">
                        <input type="hidden" id="externalSpot" name="companionDeptSeq" value="">
                        <input type="hidden" id="externalEtc" name="companionDeptSeq" value="">
                    </div>
                </td>
            </tr>
            </thead>
        </table>
    </div>
</div>

<script>
    let meetingInfo = new Object;
    $(function(){
        customKendo.fn_textBox(["pjtNm", "pjtSubNm", "metObj", "metLoc", "empName", "externalName"]);

        $("#metCont").kendoTextArea({
            rows : 5
        });
        customKendo.fn_datePicker("pjtStrDe", "depth", "yyyy-MM-dd", new Date());
        customKendo.fn_datePicker("pjtEndDe", "depth", "yyyy-MM-dd", new Date());

        if($("#strDt").val() != ""){
            $("#pjtStrDe").val($("#strDt").val());
            $("#pjtEndDe").val($("#endDt").val());
        }

        customKendo.fn_datePicker("metDe", "depth", "yyyy-MM-dd", new Date());

        customKendo.fn_timePicker("metStrTime", '10', "HH:mm", "09:00");
        customKendo.fn_timePicker("metEndTime", '10', "HH:mm", "18:00");

        $("#metStrTime").focusout(function (){
            var time = this.value.substring(0, 2) + ":" + this.value.substring(2, 4);

            if(!this.value.includes(":")){
                $("#metStrTime").val(time)
            }
        });

        $("#metEndTime").change(function (){
            var time = this.value.substring(0, 2) + ":" + this.value.substring(2, 4);

            if(!this.value.includes(":")){
                $("#metEndTime").val(time)
            }
        });

        if($("#metSn").val() != ""){
            setData();
        }

        setBtn();
    });

    function setData(){
        var data = {
            metSn : $("#metSn").val()
        }

        $.ajax({
            url : "/card/getMeetingData",
            data : data,
            type : "post",
            async : false,
            dataType : "json",
            success : function(rs){
                console.log(rs);
                meetingInfo = rs.data;
                $("#pjtNm").val(rs.data.PJT_NM);
                $("#pjtSn").val(rs.data.PJT_SN);
                $("#pjtCd").val(rs.data.PJT_CD);
                $("#pjtSubNm").val(rs.data.PJT_SUB_NM);
                $("#pjtStrDe").val(rs.pjtInfo.PJT_START_DT);
                $("#pjtEndDe").val(rs.pjtInfo.PJT_END_DT);
                $("#metLoc").val(rs.data.MET_LOC);
                $("#metDe").val(rs.data.MET_DE);
                $("#metStrTime").val(rs.data.MET_STR_TIME);
                $("#metEndTime").val(rs.data.MET_END_TIME);
                $("#metObj").val(rs.data.MET_OBJ);
                $("#metCont").val(rs.data.MET_CONT);
                $("#empName").val(rs.data.MET_EMP_NAME);
                $("#empSeq").val(rs.data.MET_EMP_SEQ);


                if(rs.extData.length != 0){
                    var extName = "";
                    var extBelong = "";
                    var extSpot = "";
                    var extEtc = "";

                    for(var i = 0 ; i < rs.extData.length ; i++){
                        extName += rs.extData[i].EXT_NM + ",";
                        extBelong += rs.extData[i].EXT_BELONG + ",";
                        extSpot += rs.extData[i].EXT_SPOT + ",";
                        extEtc += rs.extData[i].EXT_ETC + ",";
                    }
                    $("#externalName").val(extName.substring(0,extName.length-1));
                    $("#externalBelong").val(extBelong.substring(0,extBelong.length-1));
                    $("#externalSpot").val(extSpot.substring(0,extSpot.length-1));
                    $("#externalEtc").val(extEtc.substring(0,extEtc.length-1));
                }
            }
        })
    }

    function setBtn(){
        console.log("meetingInfo", meetingInfo);
        let html = makeApprBtnHtml(meetingInfo, 'meetingDrafting()');
        $("#meetingBtnBox").html(html);

        let status = meetingInfo.STATUS;
        if((status == "10" || status == "20" || status == "50" || status == "100") || $("#mode").val() == "mng"){
            $("#saveBtn").hide();
            fn_kendoUIEnableSet();
        }

        if($("#mode").val() == "mng" && status != "100"){
            $("#meetingBtnBox").hide();
        }
    }

    function fn_kendoUIEnableSet(){
        $("#metDe").data("kendoDatePicker").enable(false);
        $("#metStrTime").data("kendoTimePicker").enable(false);
        $("#metEndTime").data("kendoTimePicker").enable(false);
        $("#metLoc").data("kendoTextBox").enable(false);
        $("#metObj").data("kendoTextBox").enable(false);
        $("#metCont").data("kendoTextArea").enable(false);
        $("#pjtBtn").attr("disabled", "disabled");
        $("#userSearchBtn").attr("disabled", "disabled");
        $("#exAddBtn").attr("disabled", "disabled");
    }

    function meetingDrafting(){
        $("#meetingDraftFrm").one("submit", function() {
            var url = "/cam_manager/pop/meetingApprovalPop.do";
            var name = "_self";
            var option = "width=965, height=900, scrollbars=no, top=100, left=200, resizable=yes, scrollbars = yes, status=no, top=50, left=50"
            var popup = window.open(url, name, option);
            this.action = "/cam_manager/pop/meetingApprovalPop.do";
            this.method = 'POST';
            this.target = '_self';
        }).trigger("submit");
    }

    function userSearch() {
        window.open("/user/pop/userMultiSelectPop.do?type=dev","조직도","width=1365, height=610, scrollbars=no, top=100, left=200, resizable=no, toolbars=no, menubar=no");
    }

    function userDataSet(arr){
        var empSeq = "";
        var empNm = "";
        for(var i = 0 ; i < arr.length ; i++){
            empSeq += arr[i].empSeq + ",";
            empNm += arr[i].empName + ",";
        }
        $("#empName").val(empNm.slice(0, -1));
        $("#empSeq").val(empSeq.slice(0, -1));
    }

    function selectProject(sn, nm, cd, baseYear){
        $("#pjtSn").val(sn);
        $("#pjtNm").val(nm);
        $("#pjtCd").val(cd);

        var rs = customKendo.fn_customAjax("/project/getProjectByPjtCd", {pjtCd : cd});
        $("#pjtSubNm").val(rs.map.BS_TITLE);

        $("#pjtStrDe").val(rs.map.PJT_START_DT);
        $("#pjtEndDe").val(rs.map.PJT_END_DT);
    }

    function fn_projectPop (){
        var url = "/project/pop/g20ProjectView.do?";

        var name = "_blank";
        var option = "width = 1100, height = 450, top = 100, left = 400, location = no"
        var popup = window.open(url, name, option);
    }


    function addExternalWorkforcePop(){
        let url = "/bustrip/pop/addExternalWorkforcePop.do";
        const name = "addExternalWorkforcePop";
        const option = "width = 1000, height = 510, top = 200, left = 300, location = no";
        window.open(url, name, option);
    }

    function externalDataSet(arr){
        var extName = "";
        var extEtc = "";
        var extSpot = "";
        var extBelong = "";
        for(var i = 0 ; i < arr.length ; i++){
            extName += arr[i].name + ",";
            extEtc += arr[i].etc + ",";
            extSpot += arr[i].spot + ",";
            extBelong += arr[i].belong + ",";
        }

        $("#externalName").val(extName.substring(0,extName.length-1));
        $("#externalEtc").val(extEtc.substring(0,extEtc.length-1));
        $("#externalSpot").val(extSpot.substring(0,extSpot.length-1));
        $("#externalBelong").val(extBelong.substring(0,extBelong.length-1));

    }

    function fn_save(){
        // if($("#pjtNm").val() == ""){
        //     alert("프로젝트를 선택해주세요.");
        //     return;
        // }
        //
        // if($("#metLoc").val() == ""){
        //     alert("회의장소를 입력해주세요.");
        //     return;
        // }
        //
        // if($("#metObj").val() == ""){
        //     alert("회의목적을 입력해주세요.");
        //     return;
        // }
        //
        // if($("#metCont").val() == ""){
        //     alert("회의내용을 입력해주세요.");
        //     return;
        // }

        var parameters = {
            cardToSn : $("#cardToSn").val(),
            pjtNm : $("#pjtNm").val(),
            pjtSn : $("#pjtSn").val(),
            pjtCd : $("#pjtCd").val(),
            pmEmpSeq : $("#pmEmpSeq").val(),
            pm : $("#pm").val(),
            pjtSubNm : $("#pjtSubNm").val(),
            metDe : $("#metDe").val(),
            metStrTime : $("#metStrTime").val(),
            metEndTime : $("#metEndTime").val(),
            metLoc : $("#metLoc").val(),
            metObj : $("#metObj").val(),
            metCont : $("#metCont").val(),
            metEmpName : $("#empName").val(),
            metEmpSeq : $("#empSeq").val()
        }

        if($("#metSn").val() != ""){
            parameters.metSn = $("#metSn").val();
        }

        var extArr = [];

        if($("#externalName").val() != ""){
            for(let i=0; i<$("#externalName").val().toString().split(",").length; i++){

                if($("#externalName").val().split(",")[i] != ""){
                    extArr.push({
                        belong : $("#externalBelong").val().split(",")[i] || "",
                        spot : $("#externalSpot").val().split(",")[i] || "",
                        name : $("#externalName").val().split(",")[i] || "",
                        etc : $("#externalEtc").val().split(",")[i] || ""
                    });
                }
            }
        }

        parameters.externalArr = JSON.stringify(extArr);

        $.ajax({
            url : "/card/setMeetingData",
            data : parameters,
            type : "POST",
            dataType : "json",
            success : function (rs){
                if(rs.code == 200){
                    alert("저장되었습니다.");
                }
            }
        })


    }
</script>