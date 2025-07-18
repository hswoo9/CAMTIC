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
            <h4 class="panel-title">세부데이터(사대보험)</h4>
            <div class="title-road">캠어취브 > 캠어취브 &gt; 운영비 > 세부데이터(사대보험)</div>
            <div id="startView" style="padding: 10px 0 0 0; border-top: 2px solid #dfdfdf;"></div>
        </div>
        <div class="panel-body">

            <table class="searchTable table table-bordered mb-0">
                <colgroup>
                    <col width="10%">
                    <col>
                    <col width="10%">
                </colgroup>
                <tr>
                    <th class="text-center th-color">연도선택</th>
                    <td>
                        <input type="text" id="year" style="width: 30%;">
                    </td>
                    <th class="text-center th-color">검색</th>
                    <td>
                        <input type="text" id="searchKeyWord" style="width: 150px;">
                        <input type="text" id="searchValue" onkeypress="if(event.keyCode==13){ gridReload(); }" style="width: 200px;">
                    </td>
                </tr>
            </table>

            <div id="mainGrid"></div>
        </div>
        <div class="panel-body">
            <div style="width: 100%; overflow: auto;">
                <table class="detailTb table table-bordered" style="margin-bottom: 0px; text-align: center;  white-space:nowrap; width: auto" id="detailTb">
                    <thead>
                    <colgroup>
                        <col width="12%">
                        <col width="15%">
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
                        <th colspan="2" style="text-align: center;">누적</th>
                        <th rowspan="2" style="text-align: center;">부서장비용<br>배분비율</th>
                        <th rowspan="2" style="text-align: center;">인건비합계</th>
                    </tr>
                    <tr style="background-color: #f0f6ff;">
                        <th style="text-align: center;">팀원</th>
                        <th style="text-align: center;">팀장</th>
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
                            <td style="text-align: right;" id="user_${l.dept_seq}" name="user">0</td>
                            <td style="text-align: right;" id="mng_${l.dept_seq}" name="mng">0</td>
                            <td style="text-align: right;" id="deptPer_${l.dept_seq}" name="deptPer">0</td>
                            <td style="text-align: right;" id="tot_${l.dept_seq}" name="totalPay">0</td>
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
                                <td style="text-align: right;" id="deptTotalUser_${l.dept_seq}" name="deptTotalUser">0</td>
                                <td style="text-align: right;" id="deptTotalMng_${l.dept_seq}" name="deptTotalMng">0</td>
                                <td style="text-align: right;" id="deptTotalDeptPer_${l.dept_seq}" name="deptTotalDeptPer">100%</td>
                                <td style="text-align: right;" id="deptTotalPayroll_${l.dept_seq}" name="deptTotalPayroll">0</td>
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
                        <th style="text-align: right;" id="totalUser"></th>
                        <th style="text-align: right;" id="totalMng"></th>
                        <th style="text-align: right;"></th>
                        <th style="text-align: right;" id="totalPayroll"></th>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</div><!-- col-md-9 -->

<script>

    $(function(){
        fn_defaultScript()
    });

    function fn_defaultScript(){
        customKendo.fn_datePicker("year", 'decade', "yyyy", new Date());

        $("#searchKeyWord").kendoDropDownList({
            dataTextField: "text",
            dataValueField: "value",
            dataSource: [
                { text: "전체", value: "" },
                { text: "이름", value: "empName" },
                { text: "부서/팀", value: "deptName" },
            ],
            index: 0,
        });
        customKendo.fn_textBox(["searchValue"])

        gridReload();
        fn_calcReset();

        $("#year").change(function (){
            fn_calcReset();
        });
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
            toolbar: [
                {
                    name: 'button',
                    template: function(){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button k-button-solid-base" onclick="gridReload()">' +
                            '	<span class="k-button-text">조회</span>' +
                            '</button>';
                    },
                }
            ],
            columns: [
                {
                    title: "번호",
                    width: 50,
                    template: "#= --record #"
                }, {
                    title: "부서",
                    width: 120,
                    field: "DEPT_NAME"
                }, {
                    title: "팀",
                    width: 120,
                    field: "DEPT_TEAM_NAME",
                }, {
                    title: "구분",
                    width: 80,
                    field: "",
                    template: function(e){
                        if(e.DUTY_CODE != "" && e.DUTY_CODE != null){
                            return "관리자";
                        } else {
                            return "일반";
                        }
                    }
                }, {
                    title: "성명",
                    width: 120,
                    field: "EMP_NAME",
                }, {
                    title: "해당월",
                    width: 120,
                    field: "BASE_YEAR_MONTH",
                    template: function(e){
                        return e.BASE_YEAR_MONTH.split("-")[1] + "월"
                    }
                }, {
                    title: "사대보험",
                    width: 120,
                    field: "C_TOT_PAY",
                    template: function(e){
                        return '<div style="text-align: right;">'+ comma(e.C_TOT_PAY) +'</div>'
                    }
                },
            ],
            dataBinding: function(){
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
            searchKeyWord : $("#searchKeyWord").val(),
            searchValue : $("#searchValue").val(),
            baseYear : $("#year").val()
        }

        mainGrid("/cam_achieve/getPayRollCompList.do", searchAjaxData);
    }

    function fn_reqRegPopup (key, paySn){
        url = "/payApp/pop/regExnpRePop.do?payAppSn=" + paySn + "&exnpSn=" + key;
        var name = "blank";
        var option = "width = 1700, height = 820, top = 100, left = 400, location = no";
        window.open(url, name, option);
    }

    function fn_calcReset(){
        fn_makeTable();
    }

    function fn_makeTable(){
        var data = {
            baseYear : $("#year").val()
        }

        var result = customKendo.fn_customAjax("/cam_achieve/getDeptPayrollCompDutyList", data);
        var deptList = result.deptList;
        var ls = result.list;
        var dutyLs = result.dutyList;

        for(var i=0; i<ls.length; i++){

            /** 1월 */
            $("td[name='mon1']").each(function() {
                if ($(this).attr("id").split("_")[1] == ls[i].DEPT_SEQ) {
                    if(ls[i].BASE_YEAR_MONTH.split("-")[1] == "01"){
                        $(this).text(comma(ls[i].C_TOT_PAY || 0));
                    }
                }
            });

            /** 2월 */
            $("td[name='mon2']").each(function() {
                if ($(this).attr("id").split("_")[1] == ls[i].DEPT_SEQ) {
                    if(ls[i].BASE_YEAR_MONTH.split("-")[1] == "02"){
                        $(this).text(comma(ls[i].C_TOT_PAY || 0));
                    }
                }
            });

            /** 3월 */
            $("td[name='mon3']").each(function() {
                if ($(this).attr("id").split("_")[1] == ls[i].DEPT_SEQ) {
                    if(ls[i].BASE_YEAR_MONTH.split("-")[1] == "03"){
                        $(this).text(comma(ls[i].C_TOT_PAY || 0));
                    }
                }
            });

            /** 4월 */
            $("td[name='mon4']").each(function() {
                if ($(this).attr("id").split("_")[1] == ls[i].DEPT_SEQ) {
                    if(ls[i].BASE_YEAR_MONTH.split("-")[1] == "04"){
                        $(this).text(comma(ls[i].C_TOT_PAY || 0));
                    }
                }
            });

            /** 5월 */
            $("td[name='mon5']").each(function() {
                if ($(this).attr("id").split("_")[1] == ls[i].DEPT_SEQ) {
                    if(ls[i].BASE_YEAR_MONTH.split("-")[1] == "05"){
                        $(this).text(comma(ls[i].C_TOT_PAY || 0));
                    }
                }
            });

            /** 6월 */
            $("td[name='mon6']").each(function() {
                if ($(this).attr("id").split("_")[1] == ls[i].DEPT_SEQ) {
                    if(ls[i].BASE_YEAR_MONTH.split("-")[1] == "06"){
                        $(this).text(comma(ls[i].C_TOT_PAY || 0));
                    }
                }
            });

            /** 7월 */
            $("td[name='mon7']").each(function() {
                if ($(this).attr("id").split("_")[1] == ls[i].DEPT_SEQ) {
                    if(ls[i].BASE_YEAR_MONTH.split("-")[1] == "07"){
                        $(this).text(comma(ls[i].C_TOT_PAY || 0));
                    }
                }
            });

            /** 8월 */
            $("td[name='mon8']").each(function() {
                if ($(this).attr("id").split("_")[1] == ls[i].DEPT_SEQ) {
                    if(ls[i].BASE_YEAR_MONTH.split("-")[1] == "08"){
                        $(this).text(comma(ls[i].C_TOT_PAY || 0));
                    }
                }
            });

            /** 9월 */
            $("td[name='mon9']").each(function() {
                if ($(this).attr("id").split("_")[1] == ls[i].DEPT_SEQ) {
                    if(ls[i].BASE_YEAR_MONTH.split("-")[1] == "09"){
                        $(this).text(comma(ls[i].C_TOT_PAY || 0));
                    }
                }
            });

            /** 10월 */
            $("td[name='mon10']").each(function() {
                if ($(this).attr("id").split("_")[1] == ls[i].DEPT_SEQ) {
                    if(ls[i].BASE_YEAR_MONTH.split("-")[1] == "10"){
                        $(this).text(comma(ls[i].C_TOT_PAY || 0));
                    }
                }
            });

            /** 11월 */
            $("td[name='mon11']").each(function() {
                if ($(this).attr("id").split("_")[1] == ls[i].DEPT_SEQ) {
                    if(ls[i].BASE_YEAR_MONTH.split("-")[1] == "11"){
                        $(this).text(comma(ls[i].C_TOT_PAY || 0));
                    }
                }
            });

            /** 12월 */
            $("td[name='mon12']").each(function() {
                if ($(this).attr("id").split("_")[1] == ls[i].DEPT_SEQ) {
                    if(ls[i].BASE_YEAR_MONTH.split("-")[1] == "12"){
                        $(this).text(comma(ls[i].C_TOT_PAY || 0));
                    }
                }
            });
        }

        for(var i=0; i<dutyLs.length; i++){
            /** 팀원 */
            $("td[name='user']").each(function() {
                if ($(this).attr("id").split("_")[1] == dutyLs[i].DEPT_SEQ) {
                    if(dutyLs[i].DUTY_TYPE == "USER"){
                        $(this).text(comma(dutyLs[i].C_TOT_PAY || 0));
                    }
                }
            });

            /** 팀장 */
            $("td[name='mng']").each(function() {
                if ($(this).attr("id").split("_")[1] == dutyLs[i].DEPT_SEQ) {
                    if(dutyLs[i].DUTY_TYPE == "MNG"){
                        $(this).text(comma(dutyLs[i].C_TOT_PAY || 0));
                    }
                }
            });
        }

        /** 부서장비용 배분비율 */
        $("td[name='deptPer']").each(function(){
            var teamSeq = $(this).attr("id").split("_")[1];
            var deptSeq = $(this).closest("tr").attr("class").split("_")[1];

            if(teamSeq != deptSeq){

                var userPay = 0;
                var mngPay = 0;
                $.each($(".dept_" + deptSeq), function(i, v){
                    if($(v).find("td[name='team']").attr("id").split("_")[1] != deptSeq){
                        userPay += Number(uncommaN($(v).find("td[name='user']").text()));
                        mngPay += Number(uncommaN($(v).find("td[name='mng']").text()));
                    }
                })

                var tempA = (Number(uncommaN($("#user_" + teamSeq).text())) + Number(uncommaN($("#mng_" + teamSeq).text())));
                var tempB = (userPay + mngPay);
                var deptPer = 0;

                if(tempA == 0 || tempB == 0) {
                    deptPer = 0;
                } else {
                    deptPer = tempA / tempB * 100;
                }

                $(this).text( Math.round(deptPer * 100) / 100 + " %");
            } else {
                $(this).text("-");
            }
        });

        /** 인건비 합계 */
        $("td[name='totalPay']").each(function(){
            var teamSeq = $(this).attr("id").split("_")[1];
            var deptSeq = $(this).closest("tr").attr("class").split("_")[1];

            if(teamSeq != deptSeq){

                var userPay = Number(uncommaN($("#user_" + teamSeq).text()));   // 팀원
                var mngPay = Number(uncommaN($("#mng_" + teamSeq).text()));     // 팀장
                var deptPer = Number(($("#deptPer_" + teamSeq).text().split(" ")[0]));      // 부서장 배분비율
                var headPay = Number(uncommaN($("#mng_" + deptSeq).text().split(" ")[0]));  // 부서장

                var tempA = deptPer * headPay;
                var totPay = 0;

                if(tempA == 0) {
                    totPay = 0 + + userPay + mngPay;
                } else {
                    totPay = (tempA / 100) + userPay + mngPay;
                }
                
                $(this).text( comma(Math.round(totPay)) );
            } else {
                $(this).text("-");
            }
        });

        /** 부서별 소계 */
        let mon1PaySum = 0; let mon2PaySum = 0; let mon3PaySum = 0; let mon4PaySum = 0; let mon5PaySum = 0; let mon6PaySum = 0;
        let mon7PaySum = 0; let mon8PaySum = 0; let mon9PaySum = 0; let mon10PaySum = 0; let mon11PaySum = 0; let mon12PaySum = 0;
        let userPaySum = 0; let mngPaySum = 0; let payrollSum = 0;
        $.each($(".deptTotalTr"), function(i, v){
            let deptSeq = $(this).attr("id").split("_")[1];
            let deptMon1PaySum = 0; let deptMon2PaySum = 0; let deptMon3PaySum = 0; let deptMon4PaySum = 0; let deptMon5PaySum = 0; let deptMon6PaySum = 0;
            let deptMon7PaySum = 0; let deptMon8PaySum = 0; let deptMon9PaySum = 0; let deptMon10PaySum = 0; let deptMon11PaySum = 0; let deptMon12PaySum = 0;
            let deptUserPaySum = 0; let deptMngPaySum = 0; let deptPayrollSum = 0;

            $.each($(".dept_" + deptSeq), function(i, v){
                deptMon1PaySum += Number(uncommaN($(v).find("td[name='mon1']").text()));    deptMon2PaySum += Number(uncommaN($(v).find("td[name='mon2']").text()));
                deptMon3PaySum += Number(uncommaN($(v).find("td[name='mon3']").text()));    deptMon4PaySum += Number(uncommaN($(v).find("td[name='mon4']").text()));
                deptMon5PaySum += Number(uncommaN($(v).find("td[name='mon5']").text()));    deptMon6PaySum += Number(uncommaN($(v).find("td[name='mon6']").text()));
                deptMon7PaySum += Number(uncommaN($(v).find("td[name='mon7']").text()));    deptMon8PaySum += Number(uncommaN($(v).find("td[name='mon8']").text()));
                deptMon9PaySum += Number(uncommaN($(v).find("td[name='mon9']").text()));    deptMon10PaySum += Number(uncommaN($(v).find("td[name='mon10']").text()));
                deptMon11PaySum += Number(uncommaN($(v).find("td[name='mon11']").text()));    deptMon12PaySum += Number(uncommaN($(v).find("td[name='mon12']").text()));
                deptUserPaySum += Number(uncommaN($(v).find("td[name='user']").text()));    deptMngPaySum += Number(uncommaN($(v).find("td[name='mng']").text()));

                if($(v).find("td[name='totalPay']").text() != '-'){
                    deptPayrollSum += Number(uncommaN($(v).find("td[name='totalPay']").text()));
                }
            })

            $(this).find("td[name='deptTotalMon1']").text(comma(deptMon1PaySum));       $(this).find("td[name='deptTotalMon2']").text(comma(deptMon2PaySum));
            $(this).find("td[name='deptTotalMon3']").text(comma(deptMon3PaySum));       $(this).find("td[name='deptTotalMon4']").text(comma(deptMon4PaySum));
            $(this).find("td[name='deptTotalMon5']").text(comma(deptMon5PaySum));       $(this).find("td[name='deptTotalMon6']").text(comma(deptMon6PaySum));
            $(this).find("td[name='deptTotalMon7']").text(comma(deptMon7PaySum));       $(this).find("td[name='deptTotalMon8']").text(comma(deptMon8PaySum));
            $(this).find("td[name='deptTotalMon9']").text(comma(deptMon9PaySum));       $(this).find("td[name='deptTotalMon10']").text(comma(deptMon10PaySum));
            $(this).find("td[name='deptTotalMon11']").text(comma(deptMon11PaySum));       $(this).find("td[name='deptTotalMon12']").text(comma(deptMon12PaySum));
            $(this).find("td[name='deptTotalUser']").text(comma(deptUserPaySum));       $(this).find("td[name='deptTotalMng']").text(comma(deptMngPaySum));
            $(this).find("td[name='deptTotalPayroll']").text(comma(deptPayrollSum));

            mon1PaySum += deptMon1PaySum; mon2PaySum += deptMon2PaySum; mon3PaySum += deptMon3PaySum; mon4PaySum += deptMon4PaySum;
            mon5PaySum += deptMon5PaySum; mon6PaySum += deptMon6PaySum; mon7PaySum += deptMon7PaySum; mon8PaySum += deptMon8PaySum;
            mon9PaySum += deptMon9PaySum; mon10PaySum += deptMon10PaySum; mon11PaySum += deptMon11PaySum; mon12PaySum += deptMon12PaySum;
            userPaySum += deptUserPaySum; mngPaySum += deptMngPaySum; payrollSum += deptPayrollSum;
        });

        /** 총계 */
        $("#totalMon1").text(comma(mon1PaySum));    $("#totalMon2").text(comma(mon2PaySum));    $("#totalMon3").text(comma(mon3PaySum));
        $("#totalMon4").text(comma(mon4PaySum));    $("#totalMon5").text(comma(mon5PaySum));    $("#totalMon6").text(comma(mon6PaySum));
        $("#totalMon7").text(comma(mon7PaySum));    $("#totalMon8").text(comma(mon8PaySum));    $("#totalMon9").text(comma(mon9PaySum));
        $("#totalMon10").text(comma(mon10PaySum));    $("#totalMon11").text(comma(mon11PaySum));    $("#totalMon12").text(comma(mon12PaySum));
        $("#totalUser").text(comma(userPaySum));    $("#totalMng").text(comma(mngPaySum));    $("#totalPayroll").text(comma(payrollSum));

    }

</script>
