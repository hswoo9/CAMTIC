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
        <div class="panel-body">
            <div style="width: 100%; overflow: auto;">
                <table class="detailTb table table-bordered" style="margin-bottom: 0px; text-align: center;  white-space:nowrap; width: auto" id="detailTb">
                    <thead>
                    <colgroup>
                        <col width="12%">
                        <col width="10%">
                        <col width="5%">
                        <col width="5%">
                        <col width="5%">
                        <col width="5%">
                        <col width="5%">
                        <col width="5%">
                        <col width="5%">
                        <col width="5%">
                        <col width="5%">
                        <col width="5%">
                        <col width="5%">
                        <col width="5%">
                        <col width="5%">
                        <col width="5%">
                        <col width="5%">
                        <col width="5%">
                    </colgroup>
                    </thead>
                    <tbody>
                    <tr style="background-color: #f0f6ff;">
                        <th rowspan="2" style="text-align: center;">구분</th>
                        <th rowspan="2" style="text-align: center;">팀명</th>
                        <th rowspan="2" style="text-align: center;">1월</th>
                        <th rowspan="2" style="text-align: center;">2월</th>
                        <th rowspan="2" style="text-align: center;">3월</th>
                        <th rowspan="2" style="text-align: center;">4월</th>
                        <th rowspan="2" style="text-align: center;">5월</th>
                        <th rowspan="2" style="text-align: center;">6월</th>
                        <th rowspan="2" style="text-align: center;">7월</th>
                        <th rowspan="2" style="text-align: center;">8월</th>
                        <th rowspan="2" style="text-align: center;">9월</th>
                        <th rowspan="2" style="text-align: center;">10월</th>
                        <th rowspan="2" style="text-align: center;">11월</th>
                        <th rowspan="2" style="text-align: center;">12월</th>
                        <th style="text-align: center;">팀직접비용</th>
                        <th colspan="2" style="text-align: center;">부서공통비</th>
                        <th rowspan="2" style="text-align: center;">경비합계</th>
                    </tr>
                    <tr style="background-color: #f0f6ff;">
                        <th style="text-align: center;">합계</th>
                        <th style="text-align: center;">배분비율</th>
                        <th style="text-align: center;">배분금액</th>
                    </tr>
                    <c:forEach var="l" items="${list}" varStatus="status">
                        <tr style="background-color: white;" class="dept_${l.parent_dept_seq}">
                            <c:if test="${l.row_num eq 1}">
                                <td style="text-align: center;background-color: #f0fde9;" name="dept" rowspan="${l.row_cnt}">${l.parent_dept_name}</td>
                            </c:if>
                            <td style="text-align: center;" id="team_${l.dept_seq}" name="team">${l.dept_name}</td>
                            <td style="text-align: right;" id="mon1_${l.dept_seq}" name="mon1">0</td>
                            <td style="text-align: right;" id="mon2_${l.dept_seq}" name="mon2">0</td>
                            <td style="text-align: right;" id="mon3_${l.dept_seq}" name="mon3">0</td>
                            <td style="text-align: right;" id="mon4_${l.dept_seq}" name="mon4">0</td>
                            <td style="text-align: right;" id="mon5_${l.dept_seq}" name="mon5">0</td>
                            <td style="text-align: right;" id="mon6_${l.dept_seq}" name="mon6">0</td>
                            <td style="text-align: right;" id="mon7_${l.dept_seq}" name="mon7">0</td>
                            <td style="text-align: right;" id="mon8_${l.dept_seq}" name="mon8">0</td>
                            <td style="text-align: right;" id="mon9_${l.dept_seq}" name="mon9">0</td>
                            <td style="text-align: right;" id="mon10_${l.dept_seq}" name="mon10">0</td>
                            <td style="text-align: right;" id="mon11_${l.dept_seq}" name="mon11">0</td>
                            <td style="text-align: right;" id="mon12_${l.dept_seq}" name="mon12">0</td>
                            <td style="text-align: right;" id="deptDirect_${l.dept_seq}" name="deptDirect">0</td>
                            <td style="text-align: right;" id="deptDistPer_${l.dept_seq}" name="deptDistPer">0</td>
                            <td style="text-align: right;" id="deptDistTot_${l.dept_seq}" name="deptDistTot">0</td>
                            <td style="text-align: right;" id="totExpense_${l.dept_seq}" name="totExpense">0</td>
                        </tr>
                        <c:if test="${l.row_num eq l.row_cnt}">
                            <tr style="background-color: #fff8df;" class="deptTotalTr" id="deptTotal_${l.parent_dept_seq}">
                                <td style="text-align: center;" name="deptTotal" colspan="2">${l.parent_dept_name} 소계</td>
                                <td style="text-align: right;" id="deptTotalMon1_${l.dept_seq}" name="deptTotalMon1">0</td>
                                <td style="text-align: right;" id="deptTotalMon2_${l.dept_seq}" name="deptTotalMon2">0</td>
                                <td style="text-align: right;" id="deptTotalMon3_${l.dept_seq}" name="deptTotalMon3">0</td>
                                <td style="text-align: right;" id="deptTotalMon4_${l.dept_seq}" name="deptTotalMon4">0</td>
                                <td style="text-align: right;" id="deptTotalMon5_${l.dept_seq}" name="deptTotalMon5">0</td>
                                <td style="text-align: right;" id="deptTotalMon6_${l.dept_seq}" name="deptTotalMon6">0</td>
                                <td style="text-align: right;" id="deptTotalMon7_${l.dept_seq}" name="deptTotalMon7">0</td>
                                <td style="text-align: right;" id="deptTotalMon8_${l.dept_seq}" name="deptTotalMon8">0</td>
                                <td style="text-align: right;" id="deptTotalMon9_${l.dept_seq}" name="deptTotalMon9">0</td>
                                <td style="text-align: right;" id="deptTotalMon10_${l.dept_seq}" name="deptTotalMon10">0</td>
                                <td style="text-align: right;" id="deptTotalMon11_${l.dept_seq}" name="deptTotalMon11">0</td>
                                <td style="text-align: right;" id="deptTotalMon12_${l.dept_seq}" name="deptTotalMon12">0</td>
                                <td style="text-align: right;" id="deptTotalDirect_${l.dept_seq}" name="deptTotalDirect">0</td>
                                <td style="text-align: right;" id="deptTotalDistPer_${l.dept_seq}" name="deptTotalDistPer">100%</td>
                                <td style="text-align: right;" id="deptTotalDistTot_${l.dept_seq}" name="deptTotalDistTot">0</td>
                                <td style="text-align: right;" id="deptTotalExpense_${l.dept_seq}" name="deptTotalExpense">0</td>
                            </tr>
                        </c:if>
                    </c:forEach>
                    <tr class="totalTr" style="background-color: #f0f6ff;">
                        <th colspan="2" style="text-align: center;">총계</th>
                        <th style="text-align: right;" id="totalMon1"></th>
                        <th style="text-align: right;" id="totalMon2"></th>
                        <th style="text-align: right;" id="totalMon3"></th>
                        <th style="text-align: right;" id="totalMon4"></th>
                        <th style="text-align: right;" id="totalMon5"></th>
                        <th style="text-align: right;" id="totalMon6"></th>
                        <th style="text-align: right;" id="totalMon7"></th>
                        <th style="text-align: right;" id="totalMon8"></th>
                        <th style="text-align: right;" id="totalMon9"></th>
                        <th style="text-align: right;" id="totalMon10"></th>
                        <th style="text-align: right;" id="totalMon11"></th>
                        <th style="text-align: right;" id="totalMon12"></th>
                        <th style="text-align: right;" id="totalDirect"></th>
                        <th style="text-align: right;" id="totalDistPer"></th>
                        <th style="text-align: right;" id="totalDistTot"></th>
                        <th style="text-align: right;" id="totalExpense"></th>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</div><!-- col-md-9 -->

<script>

    let sumT = 0;
    let sumT2 = 0;
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
            toolbar : [
                {
                    name: 'button',
                    template: function(){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="gridReload()">' +
                            '	<span class="k-button-text">조회</span>' +
                            '</button>';
                    }
                }
            ],
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
        function onDataBound2(){
            sumT2 = 0;
        }

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
            dataBound: onDataBound2,
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
                        if(e.TR_DE.length < 9){
                            return e.TR_DE.substr(0, 4) + "-" + e.TR_DE.substr(4, 2) + "-" + e.TR_DE.substr(6, 2);
                        } else {
                            return e.TR_DE
                        }
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
                        sumT2 += Number(e.TOT_COST || 0);
                        var cost = e.TOT_COST;
                        return '<div style="text-align: right">' + comma(cost) + '</div>';
                    },
                    footerTemplate: function(){
                        return "<div style='text-align: right'>"+fn_numberWithCommas(sumT2)+"</div>";
                    }
                }, {
                    title: "제외금액",
                    width: 160,
                    template: function (e) {
                        return '<div>' +
                                '<input type="text" class="k-input" style="width: 100px; text-align: right;" id="pay_'+ e.EXNP_DET_SN +'" value="'+ comma(e.EXCEPT_PAY) +'" onkeyup="fn_inputNumberFormat(this)" oninput="this.value = this.value.replace(/[^0-9.]/g, \'\').replace(/(\\..*)\\./g, \'$1\');">' +
                                '<button class="k-button k-button-solid-base" style="margin-left: 5px;" onclick="fn_exceptPay(' + e.EXNP_DET_SN + ', '+ e.TOT_COST +');">저장</button>' +
                            '</div>';
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

        fn_makeTable();
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

    function fn_exceptPay(key, totCost){
        var exceptPay = uncommaN($("#pay_" + key).val())
        var totCost = totCost;

        if(exceptPay > totCost) {
            alert("입력값이 지출금액을 초과하였습니다.");
            return;
        }

        $.ajax({
            url: "/cam_achieve/updateExnpExceptPay",
            data: {
                exnpDetSn : key,
                exceptPay : exceptPay
            },
            type: "post",
            dataType: "json",
            async: false,
            success: function(){
                alert("저장되었습니다.");
                $("#subGrid").data("kendoGrid").dataSource.read();
            },
            error: function() {

            }
        });

    }

    function fn_makeTable(){
        var data = {
            startDt : $("#endDt").val().split("-")[0] + "-01-01",
            endDt : $("#endDt").val().split("-")[0] + "-12-31"
        }

        var result = customKendo.fn_customAjax("/cam_achieve/getDeptExnpList", data);
        var ls = result.list;

        for(var i=0; i<ls.length; i++){

            /** 1월 */
            $("td[name='mon1']").each(function() {
                if ($(this).attr("id").split("_")[1] == ls[i].TEAM_SEQ) {
                    if(ls[i].EXNP_DE.split("-")[1] == "01"){
                        $(this).text(comma(ls[i].TOT_COST || 0));
                    }
                }
            });

            /** 2월 */
            $("td[name='mon2']").each(function() {
                if ($(this).attr("id").split("_")[1] == ls[i].TEAM_SEQ) {
                    if(ls[i].EXNP_DE.split("-")[1] == "02"){
                        $(this).text(comma(ls[i].TOT_COST || 0));
                    }
                }
            });

            /** 3월 */
            $("td[name='mon3']").each(function() {
                if ($(this).attr("id").split("_")[1] == ls[i].TEAM_SEQ) {
                    if(ls[i].EXNP_DE.split("-")[1] == "03"){
                        $(this).text(comma(ls[i].TOT_COST || 0));
                    }
                }
            });

            /** 4월 */
            $("td[name='mon4']").each(function() {
                if ($(this).attr("id").split("_")[1] == ls[i].TEAM_SEQ) {
                    if(ls[i].EXNP_DE.split("-")[1] == "04"){
                        $(this).text(comma(ls[i].TOT_COST || 0));
                    }
                }
            });

            /** 5월 */
            $("td[name='mon5']").each(function() {
                if ($(this).attr("id").split("_")[1] == ls[i].TEAM_SEQ) {
                    if(ls[i].EXNP_DE.split("-")[1] == "05"){
                        $(this).text(comma(ls[i].TOT_COST || 0));
                    }
                }
            });

            /** 6월 */
            $("td[name='mon6']").each(function() {
                if ($(this).attr("id").split("_")[1] == ls[i].TEAM_SEQ) {
                    if(ls[i].EXNP_DE.split("-")[1] == "06"){
                        $(this).text(comma(ls[i].TOT_COST || 0));
                    }
                }
            });

            /** 7월 */
            $("td[name='mon7']").each(function() {
                if ($(this).attr("id").split("_")[1] == ls[i].TEAM_SEQ) {
                    if(ls[i].EXNP_DE.split("-")[1] == "07"){
                        $(this).text(comma(ls[i].TOT_COST || 0));
                    }
                }
            });

            /** 8월 */
            $("td[name='mon8']").each(function() {
                if ($(this).attr("id").split("_")[1] == ls[i].TEAM_SEQ) {
                    if(ls[i].EXNP_DE.split("-")[1] == "08"){
                        $(this).text(comma(ls[i].TOT_COST || 0));
                    }
                }
            });

            /** 9월 */
            $("td[name='mon9']").each(function() {
                if ($(this).attr("id").split("_")[1] == ls[i].TEAM_SEQ) {
                    if(ls[i].EXNP_DE.split("-")[1] == "09"){
                        $(this).text(comma(ls[i].TOT_COST || 0));
                    }
                }
            });

            /** 10월 */
            $("td[name='mon10']").each(function() {
                if ($(this).attr("id").split("_")[1] == ls[i].TEAM_SEQ) {
                    if(ls[i].EXNP_DE.split("-")[1] == "10"){
                        $(this).text(comma(ls[i].TOT_COST || 0));
                    }
                }
            });

            /** 11월 */
            $("td[name='mon11']").each(function() {
                if ($(this).attr("id").split("_")[1] == ls[i].TEAM_SEQ) {
                    if(ls[i].EXNP_DE.split("-")[1] == "11"){
                        $(this).text(comma(ls[i].TOT_COST || 0));
                    }
                }
            });

            /** 12월 */
            $("td[name='mon12']").each(function() {
                if ($(this).attr("id").split("_")[1] == ls[i].TEAM_SEQ) {
                    if(ls[i].EXNP_DE.split("-")[1] == "12"){
                        $(this).text(comma(ls[i].TOT_COST || 0));
                    }
                }
            });
        }

        /** 팀직접비용 합계 */
        $("td[name='deptDirect']").each(function(){
            var teamSeq = $(this).attr("id").split("_")[1];
            var deptDirect = 0;
            for(var i=1; i<=12; i++){
                deptDirect += Number(uncommaN($("#mon" + i + "_" + teamSeq).text()));
            }

            $(this).text( comma(deptDirect) );
        });

        /** 부서공통비 배분비율 */
        $("td[name='deptDistPer']").each(function(){
            var teamSeq = $(this).attr("id").split("_")[1];
            var deptSeq = $(this).closest("tr").attr("class").split("_")[1];

            if(teamSeq != deptSeq){

                var deptDirectPay = Number(uncommaN($("#deptDirect" + teamSeq).text()));
                var tempA = (Number(uncommaN($("#deptTotalDirect_" + deptSeq).text())) - Number(uncommaN($("#deptDirect_" + deptSeq).text())));

                var deptDistPer = 0;

                if(deptDirectPay != 0 && tempA != 0) {
                    deptDistPer = deptDirectPay / tempA * 100;
                }

                $(this).text( Math.round(deptDistPer * 100) / 100 + " %");
            } else {
                $(this).text("-");
            }
        });

        /** 부서공통비 배분금액 */
        $("td[name='deptDistTot']").each(function(){
            var teamSeq = $(this).attr("id").split("_")[1];
            var deptSeq = $(this).closest("tr").attr("class").split("_")[1];

            if(teamSeq != deptSeq){

                var deptDirectPay = Number(uncommaN($("#deptDistPer_" + teamSeq).text().split(" %")[0]));
                var deptCommPay = Number(uncommaN($("#deptDirect_" + deptSeq).text()));

                $(this).text( Math.round(deptDirectPay * deptCommPay) );
            } else {
                $(this).text("-");
            }
        });

        /** 경비 합계 */
        $("td[name='totExpense']").each(function(){
            var teamSeq = $(this).attr("id").split("_")[1];
            var deptSeq = $(this).closest("tr").attr("class").split("_")[1];

            if(teamSeq != deptSeq){
                var deptDirect = Number(uncommaN($("#deptDirect_" + teamSeq).text()));      // 팀직접비용 합계
                var deptDistTot = Number(uncommaN($("#deptDistTot_" + teamSeq).text()));    // 배분금액

                $(this).text( comma(deptDirect + deptDistTot) );
            } else {
                $(this).text("-");
            }
        });

        /** 부서별 소계 */
        let mon1PaySum = 0; let mon2PaySum = 0; let mon3PaySum = 0; let mon4PaySum = 0; let mon5PaySum = 0; let mon6PaySum = 0;
        let mon7PaySum = 0; let mon8PaySum = 0; let mon9PaySum = 0; let mon10PaySum = 0; let mon11PaySum = 0; let mon12PaySum = 0;
        let directPaySum = 0; let distPaySum = 0; let expenseSum = 0;
        $.each($(".deptTotalTr"), function(i, v){
            let deptSeq = $(this).attr("id").split("_")[1];
            let deptMon1PaySum = 0; let deptMon2PaySum = 0; let deptMon3PaySum = 0; let deptMon4PaySum = 0; let deptMon5PaySum = 0; let deptMon6PaySum = 0;
            let deptMon7PaySum = 0; let deptMon8PaySum = 0; let deptMon9PaySum = 0; let deptMon10PaySum = 0; let deptMon11PaySum = 0; let deptMon12PaySum = 0;
            let deptDirectPaySum = 0; let deptDistPaySum = 0; let deptExpenseSum = 0;

            $.each($(".dept_" + deptSeq), function(i, v){
                deptMon1PaySum += Number(uncommaN($(v).find("td[name='mon1']").text()));    deptMon2PaySum += Number(uncommaN($(v).find("td[name='mon2']").text()));
                deptMon3PaySum += Number(uncommaN($(v).find("td[name='mon3']").text()));    deptMon4PaySum += Number(uncommaN($(v).find("td[name='mon4']").text()));
                deptMon5PaySum += Number(uncommaN($(v).find("td[name='mon5']").text()));    deptMon6PaySum += Number(uncommaN($(v).find("td[name='mon6']").text()));
                deptMon7PaySum += Number(uncommaN($(v).find("td[name='mon7']").text()));    deptMon8PaySum += Number(uncommaN($(v).find("td[name='mon8']").text()));
                deptMon9PaySum += Number(uncommaN($(v).find("td[name='mon9']").text()));    deptMon10PaySum += Number(uncommaN($(v).find("td[name='mon10']").text()));
                deptMon11PaySum += Number(uncommaN($(v).find("td[name='mon11']").text()));    deptMon12PaySum += Number(uncommaN($(v).find("td[name='mon12']").text()));
                deptDirectPaySum += Number(uncommaN($(v).find("td[name='deptDirect']").text()));

                if($(v).find("td[name='deptDistTot']").text() != '-'){
                    deptDistPaySum += Number(uncommaN($(v).find("td[name='deptDistTot']").text()));
                }

                if($(v).find("td[name='totExpense']").text() != '-'){
                    deptExpenseSum += Number(uncommaN($(v).find("td[name='totExpense']").text()));
                }
            })

            $(this).find("td[name='deptTotalMon1']").text(comma(deptMon1PaySum));       $(this).find("td[name='deptTotalMon2']").text(comma(deptMon2PaySum));
            $(this).find("td[name='deptTotalMon3']").text(comma(deptMon3PaySum));       $(this).find("td[name='deptTotalMon4']").text(comma(deptMon4PaySum));
            $(this).find("td[name='deptTotalMon5']").text(comma(deptMon5PaySum));       $(this).find("td[name='deptTotalMon6']").text(comma(deptMon6PaySum));
            $(this).find("td[name='deptTotalMon7']").text(comma(deptMon7PaySum));       $(this).find("td[name='deptTotalMon8']").text(comma(deptMon8PaySum));
            $(this).find("td[name='deptTotalMon9']").text(comma(deptMon9PaySum));       $(this).find("td[name='deptTotalMon10']").text(comma(deptMon10PaySum));
            $(this).find("td[name='deptTotalMon11']").text(comma(deptMon11PaySum));       $(this).find("td[name='deptTotalMon12']").text(comma(deptMon12PaySum));
            $(this).find("td[name='deptTotalDirect']").text(comma(deptDirectPaySum));       $(this).find("td[name='deptTotalDistTot']").text(comma(deptDistPaySum));
            $(this).find("td[name='deptTotalExpense']").text(comma(deptExpenseSum));

            mon1PaySum += deptMon1PaySum; mon2PaySum += deptMon2PaySum; mon3PaySum += deptMon3PaySum; mon4PaySum += deptMon4PaySum;
            mon5PaySum += deptMon5PaySum; mon6PaySum += deptMon6PaySum; mon7PaySum += deptMon7PaySum; mon8PaySum += deptMon8PaySum;
            mon9PaySum += deptMon9PaySum; mon10PaySum += deptMon10PaySum; mon11PaySum += deptMon11PaySum; mon12PaySum += deptMon12PaySum;
            directPaySum += deptDirectPaySum; distPaySum += deptDistPaySum; expenseSum += deptExpenseSum;
        });

        /** 총계 */
        $("#totalMon1").text(comma(mon1PaySum));    $("#totalMon2").text(comma(mon2PaySum));    $("#totalMon3").text(comma(mon3PaySum));
        $("#totalMon4").text(comma(mon4PaySum));    $("#totalMon5").text(comma(mon5PaySum));    $("#totalMon6").text(comma(mon6PaySum));
        $("#totalMon7").text(comma(mon7PaySum));    $("#totalMon8").text(comma(mon8PaySum));    $("#totalMon9").text(comma(mon9PaySum));
        $("#totalMon10").text(comma(mon10PaySum));    $("#totalMon11").text(comma(mon11PaySum));    $("#totalMon12").text(comma(mon12PaySum));
        $("#totalDirect").text(comma(directPaySum));    $("#totalDistTot").text(comma(distPaySum));    $("#totalExpense").text(comma(expenseSum));
    }


</script>
