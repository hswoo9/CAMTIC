<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c"       uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>

<jsp:useBean id="today" class="java.util.Date" />

<script type="text/javascript" src="<c:url value='/js/intra/common/kendoSettings.js'/>"></script>

<input type="hidden" id="myDeptSeq" name="myDeptSeq" value="${loginVO.orgnztId}">
<input type="hidden" id="myEmpSeq" name="myEmpSeq" value="${loginVO.uniqId}">

<style>
    .k-grid-content td {
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }
</style>
<div class="mainCard">
    <div class="panel">
        <div class="panel-heading">
        </div>
        <div style="padding-left : 20px; padding-right: 20px;">
            <h4 class="panel-title">세부데이터(경비)</h4>
            <div class="title-road">캠어취브 > 캠어취브 &gt; 운영비 > 세부데이터(경비)</div>
            <div id="startView" style="padding: 10px 0 0 0; border-top: 2px solid #dfdfdf;"></div>
        </div>
        <div class="panel-body">

            <table class="searchTable table table-bordered mb-0">
                <colgroup>
                    <col width="10%">
                    <col width="25%">
                    <col width="10%">
                    <col width="20%">
                    <col width="10%">
                    <col width="25%">
                </colgroup>
                <tr>
                    <th class="text-center th-color">날짜</th>
                    <td>
                        <input type="text" id="startDt" style="width: 150px;"> ~ <input type="text" id="endDt" style="width: 150px;">
                    </td>
                    <th class="text-center th-color">사업장</th>
                    <td>
                        <input type="text" id="busnCd" style="width: 100%;">
                    </td>
                    <th class="text-center th-color">팀명</th>
                    <td>
                        <input type="text" id="team" style="width: 150px;">
                    </td>
                </tr>
                <tr>
                    <th class="text-center th-color">구분</th>
                    <td>
                        <input type="text" id="rmStat" style="width: 50%;">
                    </td>
                    <th class="text-center th-color">검색</th>
                    <td colspan="4">
                        <input type="text" id="searchValue" style="width: 150px;">
                        <input type="text" id="searchText" onkeypress="if(event.keyCode==13){ gridReload(); }" style="width: 200px;">
                    </td>
                </tr>
            </table>

            <div id="mainGrid"></div>

            <div id="subGrid"></div>
        </div>
    </div>
</div><!-- col-md-9 -->

<script>

    let sumT = 0;
    $(function(){
        fn_defaultScript()



    });

    function fn_defaultScript(){
        customKendo.fn_textBox(["searchText"])
        customKendo.fn_datePicker("startDt", '', "yyyy-MM-dd", new Date(new Date().setMonth(new Date().getMonth() - 2)));
        customKendo.fn_datePicker("endDt", '', "yyyy-MM-dd", new Date());

        $("#startDt").change(function (){
            if($("#startDt").val() > $("#endDt").val()){
                $("#endDt").val($("#startDt").val());
            }
        });

        $("#endDt").change(function (){
            if($("#startDt").val() > $("#endDt").val()){
                $("#startDt").val($("#endDt").val());
            }
        });

        $("#busnCd").kendoDropDownList({
            dataTextField: "text",
            dataValueField: "value",
            dataSource: [
                { text: "전체", value: "" },
                { text: "1000-(사)캠틱종합기술원", value: "1000" },
                { text: "2000-(사)캠틱종합기술원", value: "2000" },
                { text: "3000-(사)캠틱종합기술원", value: "3000" },
                { text: "4000-(사)캠틱종합기술원", value: "4000" },
                { text: "5000-(사)캠틱종합기술원", value: "5000" },
                { text: "6000-(사)캠틱종합기술원", value: "6000" },
                { text: "7000-(사)캠틱종합기술원", value: "7000" }
            ]
        });

        $("#searchValue").kendoDropDownList({
            dataTextField: "text",
            dataValueField: "value",
            dataSource: [
                { text: "전체", value: "" },
                { text: "적요", value: "EXNP_BRIEFS" }
            ]
        });

        var ds = customKendo.fn_customAjax("/dept/getDeptAList", {
            deptLevel : 2
        });

        customKendo.fn_dropDownList("team", ds.rs, "dept_name", "dept_seq","5");

        $("#rmStat").kendoDropDownList({
            dataTextField: "text",
            dataValueField: "value",
            dataSource: [
                { text: "전체", value: "" },
                { text: "비용처리", value: "Y" },
                { text: "비용제외", value: "N" }
            ]
        });

        gridReload();
    }

    function mainGrid (url, params){
        $("#mainGrid").kendoGrid({
            dataSource: customKendo.fn_gridDataSource2(url, params),
            sortable: true,
            selectable: "row",
            height: 525,
            pageable: {
                refresh: true,
                pageSizes: [ 10, 20, 50, "ALL"],
                buttonCount: 5,
            },
            noRecords: {
                template: "데이터가 존재하지 않습니다."
            },
            dataBound: onDataBound,
            columns: [
                {
                    title: "번호",
                    width: 50,
                    template: "#= --record #"
                }, {
                    title: "문서번호",
                    width: 120,
                    field: "DOC_NO"
                }, {
                    title: "지출유형",
                    width: 80,
                    field: "TYPE",
                    template : function(e) {
                        if(e.PAY_APP_TYPE != "1"){
                            if(e.PAY_APP_TYPE == 2){
                                return "여입";
                            } else if(e.PAY_APP_TYPE == 3){
                                return "반납";
                            } else if(e.PAY_APP_TYPE == 4){
                                return "대체";
                            }
                        } else {
                            return '지급';
                        }
                    }
                }, {
                    title: "증빙유형",
                    width: 80,
                    template : function(e){
                        if(e.EVID_TYPE == "1"){
                            return "세금계산서";
                        } else if(e.EVID_TYPE == "2"){
                            return "계산서";
                        } else if(e.EVID_TYPE == "3"){
                            return "신용카드";
                        } else if(e.EVID_TYPE == "4"){
                            return "직원지급";
                        } else if(e.EVID_TYPE == "5"){
                            return "사업소득자";
                        } else if(e.EVID_TYPE == "9"){
                            return "기타소득자";
                        } else {
                            return "기타";
                        }
                    }
                }, {
                    title: "프로젝트 명",
                    field: "PJT_NM",
                    width: 200,
                }, {
                    title: "예산비목",
                    field: "BUDGET_NM",
                    width: 200
                }, {
                    title: "거래처",
                    width: 200,
                    template: function(e){
                        if(e.CRM_CNT > 1){
                            return e.CRM_NM + " 외 " + Number(e.CRM_CNT-1);
                        } else {
                            return e.CRM_NM
                        }
                    }
                }, {
                    title: "적요(제목)",
                    field: "EXNP_BRIEFS",
                    width: 250,
                    footerTemplate: "합계"
                }, {
                    title: "지출금액",
                    width: 80,
                    template: function(e){
                        sumT  += Number(e.TOT_COST || 0);
                        var cost = e.TOT_COST || 0;
                        return '<div style="text-align: right">'+comma(cost)+'</div>';
                    },
                    footerTemplate: function(){
                        return "<div style='text-align: right'>"+fn_numberWithCommas(sumT)+"</div>";
                    }
                }, {
                    title: "결의일자",
                    width: 80,
                    field: "EXNP_DE",
                }, {
                    title: "기타",
                    width: 60,
                    template: function(e){
                        return '<button type="button" id="btnDet" class="k-button k-button-solid-base" onclick="btnDetClick('+e.EXNP_SN+');">상세</button>';
                    }
                }
            ],
            dataBinding: function(){
                record = fn_getRowNum(this, 2);
            }
        }).data("kendoGrid");

        function onDataBound(){
            sumT = 0;
        }


        // $("#checkAll").click(function(){
        //     if($(this).is(":checked")) $("input[name=check]").prop("checked", true);
        //     else $("input[name=check]").prop("checked", false);
        // });

        // $("#mainGrid").data("kendoGrid").one("dataBound", function(e){
        //     var grid = e.sender;
        //     var pageSizesDdl = $(grid.pager.element).find("[data-role='dropdownlist']").data("kendoDropDownList");
        //     pageSizesDdl.bind("change", function(ev){
        //         $("#hiddenGrid").data("kendoGrid").dataSource.pageSize(ev.sender.value());
        //     });
        // });
    }

    function subGrid (url, params) {
        $("#subGrid").kendoGrid({
            dataSource: customKendo.fn_gridDataSource2(url, params),
            sortable: true,
            selectable: "row",
            height: 525,
            toolbar : [
                {
                    name: 'button',
                    template: function (e) {
                        return '<button type="button" class="k-button k-button-md k-button-solid k-button-solid-primary" onclick="fn_rmChange(\'N\', '+e.EXNP_SN+')">' +
                            '	<span class="k-button-text">제외</span>' +
                            '</button>';
                    }
                }, {
                    name: 'button',
                    template: function (e) {
                        return '<button type="button" class="k-button k-button-md k-button-solid k-button-solid-info" onclick="fn_rmChange(\'Y\', '+e.EXNP_SN+')">' +
                            '	<span class="k-button-text">비용</span>' +
                            '</button>';
                    }
                }
            ],
            pageable: {
                refresh: true,
                pageSizes: [10, 20, 50, "ALL"],
                buttonCount: 5,
            },
            noRecords: {
                template: "데이터가 존재하지 않습니다."
            },
            columns: [
                {
                    headerTemplate: '<input type="checkbox" id="checkAll" name="checkAll"/>',
                    width: 30,
                    template: function (e) {
                        return '<input type="checkbox" name="check" value="' + e.EXNP_DET_SN + '"/>';
                    }
                }, {
                    title: "번호",
                    width: 50,
                    template: "#= --record #"
                }, {
                    title: "거래일",
                    width: 120,
                    field: "TR_DE",
                    template : function(e){
                        return e.TR_DE.substr(0, 4) + "-" + e.TR_DE.substr(4, 2) + "-" + e.TR_DE.substr(6, 2);
                    }
                }, {
                    title: "팀",
                    width: 200,
                    field: "TEAM_NAME",
                    template : function(e){
                        if(e.TEAM_NAME == "" || e.TEAM_NAME == null){
                            return '';
                        } else {
                            return e.TEAM_NAME;
                        }
                    }
                }, {
                    title: "예산비목",
                    field: "BUDGET_NM",
                    width: 200
                }, {
                    title: "거래처",
                    width: 200,
                    template: function (e) {
                        if (e.CRM_CNT > 1) {
                            return e.CRM_NM + " 외 " + Number(e.CRM_CNT - 1);
                        } else {
                            return e.CRM_NM
                        }
                    }
                }, {
                    title: "지출금액",
                    width: 80,
                    template: function (e) {
                        var cost = e.TOT_COST;
                        return '<div style="text-align: right">' + comma(cost) + '</div>';
                    }
                }, {
                    title: "결의일자",
                    width: 80,
                    field: "EXNP_DE",
                }, {
                    title: "상태",
                    width: 60,
                    template: function (e) {
                        if (e.RM_Y == "N") {
                            return "제외";
                        } else {
                            return "비용";
                        }
                    }
                }, {
                    title: "팀설정",
                    width: 60,
                    template: function (e) {
                        return '<button type="button" id="btnDet" class="k-button k-button-solid-base" onclick="fn_teamChange(' + e.EXNP_DET_SN + ');">팀 수정</button>';
                    }
                }
            ],
            dataBinding: function () {
                record = fn_getRowNum(this, 2);
            }
        }).data("kendoGrid");

        $("#checkAll").click(function(){
            if($(this).is(":checked")) $("input[name=check]").prop("checked", true);
            else $("input[name=check]").prop("checked", false);
        });
    }

    function gridReload(){
        var searchAjaxData = {
            empSeq: $("#myEmpSeq").val(),
            startDt: $("#startDt").val(),
            endDt: $("#endDt").val(),
            searchStatus: $("#searchStatus").val(),
            searchText: $("#searchText").val(),
            searchKeyword: $("#searchKeyword").val(),
            searchValue: $("#searchValue").val(),
            busnCd : $("#busnCd").data("kendoDropDownList").value(),
            teamSeq : $("#team").data("kendoDropDownList").value(),
            rmStat : $("#rmStat").data("kendoDropDownList").value()
        }

        mainGrid("/cam_achieve/getExnpList", searchAjaxData);
    }

    function fn_reqRegPopup (key, paySn){
        url = "/payApp/pop/regExnpRePop.do?payAppSn=" + paySn + "&exnpSn=" + key;
        var name = "blank";
        var option = "width = 1700, height = 820, top = 100, left = 400, location = no";
        window.open(url, name, option);
    }

    function btnDetClick(key){
        var parameters = {
            exnpSn : key
        }
        subGrid("/cam_achieve/getExnpDetailList", parameters);
    }

    function fn_rmChange(stat, key){

        if(stat == 'Y'){
            if(!confirm('해당 건들을 비용처리 하시겠습니까?')){
                return;
            }
        } else {
            if(!confirm('해당 건들을 제외하시겠습니까?')){
                return;
            }
        }

        var parameters = {
            rmY : stat,
            exnpSn : key
        }

        $("input[name='check']:checked").each(function(){
            var exnpDetSn = $(this).val();
            parameters.exnpDetSn = exnpDetSn;


            customKendo.fn_customAjax("/cam_achieve/updateExnpStatus", parameters);
        });


        $("#subGrid").data("kendoGrid").dataSource.read();

    }

    function fn_teamChange(key){

        url = "/cam_achieve/teamChangePop.do?exnpDetSn=" + key;
        var name = "blank";
        var option = "width = 800, height = 355, top = 100, left = 400, location = no";
        window.open(url, name, option);
    }



</script>
