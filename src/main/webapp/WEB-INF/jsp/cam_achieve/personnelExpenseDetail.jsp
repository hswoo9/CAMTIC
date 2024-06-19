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
            <h4 class="panel-title">세부데이터(인건비)</h4>
            <div class="title-road">캠어취브 > 캠어취브 &gt; 운영비 > 세부데이터(인건비)</div>
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
                        <input type="text" id="year" style="width: 150px;">
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
            <div>
                <table class="detailTb table table-bordered" style="margin-bottom: 0px; text-align: center; overflow: auto" id="detailTb">
                    <tr>
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
                    <tr>
                        <th style="text-align: center;">팀원</th>
                        <th style="text-align: center;">팀장</th>
                    </tr>
                    <c:forEach var="l" items="${list}" varStatus="status">
                        <tr style="background-color: white">
                            <td style="text-align: center;">${l.PARENT_DEPT_NAME}</td>
                            <td style="text-align: center;" id="${l.dept_seq}">${l.dept_name}</td>
                            <td style="text-align: center;" id="${l.dept_seq}_mon1" class="mon1"></td>
                            <td style="text-align: center;" id="${l.dept_seq}_mon2" class="mon2"></td>
                            <td style="text-align: center;" id="${l.dept_seq}_mon3" class="mon3"></td>
                            <td style="text-align: center;" id="${l.dept_seq}_mon4" class="mon4"></td>
                            <td style="text-align: center;" id="${l.dept_seq}_mon5" class="mon5"></td>
                            <td style="text-align: center;" id="${l.dept_seq}_mon6" class="mon6"></td>
                            <td style="text-align: center;" id="${l.dept_seq}_mon7" class="mon7"></td>
                            <td style="text-align: center;" id="${l.dept_seq}_mon8" class="mon8"></td>
                            <td style="text-align: center;" id="${l.dept_seq}_mon9" class="mon9"></td>
                            <td style="text-align: center;" id="${l.dept_seq}_mon10" class="mon10"></td>
                            <td style="text-align: center;" id="${l.dept_seq}_mon11" class="mon11"></td>
                            <td style="text-align: center;" id="${l.dept_seq}_mon12" class="mon12"></td>
                            <td style="text-align: center;" id="" class=""></td>
                            <td style="text-align: center;" id="" class=""></td>
                            <td style="text-align: center;" id="" class=""></td>
                            <td style="text-align: center;" id="" class=""></td>
                        </tr>
                    </c:forEach>
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
                        if(e.DUTY_CODE != ""){
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
                    title: "월급여",
                    width: 120,
                    field: "SUP_PAY",
                    template: function(e){
                        return '<div style="text-align: right;">'+ comma(e.SUP_PAY) +'</div>'
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

        // $("#mainGrid").data("kendoGrid").one("dataBound", function(e){
        //     var grid = e.sender;
        //     var pageSizesDdl = $(grid.pager.element).find("[data-role='dropdownlist']").data("kendoDropDownList");
        //     pageSizesDdl.bind("change", function(ev){
        //         $("#hiddenGrid").data("kendoGrid").dataSource.pageSize(ev.sender.value());
        //     });
        // });
    }

    function gridReload(){
        var searchAjaxData = {
            searchKeyWord : $("#searchKeyWord").val(),
            searchValue : $("#searchValue").val(),
            baseYear : $("#year").val()
        }

        mainGrid("/salaryManage/getPayRollLedgerList.do", searchAjaxData);
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

        var result = customKendo.fn_customAjax("/cam_achieve/getDeptPayrollList", data);
        var rs = result.list;

        console.log("rs", rs);
    }

</script>
