<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix = "fmt" uri = "http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<jsp:useBean id="today" class="java.util.Date" />
<jsp:include page="/WEB-INF/jsp/template/common2.jsp" flush="true"></jsp:include>
<link rel="stylesheet" href="/css/quirk.css">
<link rel="stylesheet" href="/css/style.css">

<style>
    .searchTable > thead > tr > th, .searchTable > tfoot > tr > th {
        background-color: #00397f96;
        color: white;
        text-align: center;
    }
</style>

<input type="hidden" id="bsYear" value="${params.bsYear}"/>

<body class="font-opensans" style="background-color:#fff;">
<div class="col-lg-12 pop_sign_wrap" style="width:100%;padding: 0px">
    <div class="table-responsive">
        <div class="card-header pop-header" style="text-align: center">
            <h3 class="card-title title_NM">
                2025년도 인사평가 대상 설정
            </h3>
        </div>

        <div class="panel-body">
            <input type="text" id="bsYMD" style="width: 10%" value=""/>
            <button type="button" id="searchBtn" class="k-button k-button-solid-base" style="font-size: 11px;">검색</button>

            <div style="float:right; font-weight: bold">
                평가대상 : <span id="totEvalMem" style="color: red;">0</span> 명
                <button type="button" class="k-button k-button-solid-base" style="font-size: 11px; font-weight: unset">목록저장</button>
                <button type="button" class="k-button k-button-solid-info" style="font-size: 11px;">평가대상 설정 완료</button>
            </div>
        </div>

        <div class="panel-body">
            <div id="mainGrid"></div>
        </div>
    </div>
</div><!-- col-md-9 -->

<script>
    $(function () {

        customKendo.fn_datePicker("bsYMD", '', "yyyy-MM-dd", new Date($("#bsYear").val()+"-12-31"));

        requestEvaluationMainGrid();
    });

    function requestEvaluationMainGrid () {
        let dataSource = new kendo.data.DataSource({
            serverPaging: false,
            transport: {
                read : {
                    url : '/evaluation/getRequestEvaluationMemberTot',
                    dataType : "json",
                    type : "post"
                },
                parameterMap: function(data) {
                    data.empSeq = $("#empSeq").val();
                    data.bsYMD = $("#bsYMD").val() + "-12-31";
                    return data;
                }
            },
            schema : {
                data: function (data) {
                    return data.list;
                },
                total: function (data) {
                    return data.list.length;
                },
            },
            pageSize: 10,
        });

        $("#mainGrid").kendoGrid({
            dataSource: dataSource,
            sortable: true,
            scrollable: true,
            selectable: "row",
            height: 508,
            pageable : {
                refresh : true,
                pageSizes : [ 10, 20, 30, 50, 100 ],
                buttonCount : 5
            },
            noRecords: {
                template: "데이터가 존재하지 않습니다."
            },
            columns: [
                {
                    headerTemplate: '<input type="checkbox" id="checkAll" name="checkAll" onclick="fn_checkAll(\'checkAll\', \'empPk\');"/>',
                    template : "<input type='checkbox' id='empPk#=EMP_SEQ#' name='empPk' class='empPk' value='#=EMP_SEQ#'/>",
                    width: 50
                }, {
                    field: "",
                    title: "부서",
                    width: 120
                }, {
                    field: "",
                    title: "팀",
                    width: 120
                }, {
                    title: "성명",
                    width: 80,

                }, {
                    title: "직위",
                    width: 100,
                    field: "",
                }, {
                    field: "",
                    title: "학습시간",
                    width: 120
                }, {
                    field: "",
                    title: "2차 평가자",
                    width: 120
                }, {
                    field: "",
                    title: "직군",
                    width: 120,

                }, {
                    field: "",
                    title: "비고",
                    width: 50,

                }
            ]
        }).data("kendoGrid");
    }
</script>
</body>
