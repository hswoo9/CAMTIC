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
                    <th class="text-center th-color">연도선택</th>
                    <td colspan="6">
                        <input type="text" id="pjtYear" style="width: 150px;">
                    </td>
                </tr>
                <tr>
                    <th class="text-center th-color">사업구분</th>
                    <td>
                        <input type="text" id="busnClass" style="width: 150px;">
                    </td>
                    <th class="text-center th-color">진행단계</th>
                    <td>
                        <input type="text" id="busnSubClass" style="width: 150px;">
                    </td>
                    <th class="text-center th-color">PM</th>
                    <td>
                        <input type="text" id="empName" style="width: 150px;">
                    </td>
                </tr>
                <tr>
                    <th class="text-center th-color">대상부서</th>
                    <td>
                        <div onclick="fn_deptSelect();">
                            <input type="text" id="deptName" style="width: 90%;">
                            <span class='k-icon k-i-search k-button-icon' style="cursor: pointer"></span>
                            <input type="hidden" id="deptSeq" name="deptSeq" />
                        </div>
                    </td>
                    <th class="text-center th-color">검색</th>
                    <td colspan="4">
                        <input type="text" id="searchValue" style="width: 150px;">
                        <input type="text" id="searchValue2" style="width: 150px;">
                        <input type="text" id="searchText" onkeypress="if(event.keyCode==13){ recordTotal.mainGrid(); }" style="width: 200px;">
                    </td>
                </tr>
            </table>

            <div id="mainGrid"></div>
        </div>
    </div>
</div><!-- col-md-9 -->

<script>

    $(function(){
        fn_defaultScript()



    });

    function fn_defaultScript(){
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
            columns: [
                {
                    headerTemplate: '<input type="checkbox" id="checkAll" name="checkAll"/>',
                    width: 30,
                    template : function(e){
                        // if(e.TYPE == "반제(지출)"){
                        if(e.RE_STAT == "N"){
                            return '<input type="checkbox" name="check" value="'+e.EXNP_SN+'"/>';
                        } else {
                            return '';
                        }
                        // } else {
                        //     return '';
                        // }
                    }
                }, {
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
                            return e.TYPE;
                        }
                    }
                }, {
                    title: "증빙유형",
                    width: 80,
                    field: "EVID_TYPE_TEXT",
                }, {
                    title: "프로젝트 명",
                    field: "PJT_NM",
                    width: 200,
                }, {
                    title: "예산비목",
                    field: "BUDGET_NM_EX",
                    width: 200,
                    template: function(e){
                        return e.BUDGET_NM_EX.replaceAll("/", "-");
                    }
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
                    template: function(e){
                        console.log(e);
                        return '<div style="cursor: pointer; font-weight: bold" onclick="exnpReList.fn_reqRegPopup('+e.EXNP_SN+', \''+e.PAY_APP_SN+'\')">'+e.EXNP_BRIEFS+'</div>';
                    }
                }, {
                    title: "지출금액",
                    width: 80,
                    template: function(e){
                        var cost = e.TOT_COST;
                        return '<div style="text-align: right">'+comma(cost)+'</div>';

                        // if(e.RE_STAT == "Y"){
                        //     return '<div style="text-align: right">'+comma(cost)+'</div>';
                        // } else {
                        //     return '<div style="text-align: right">'+0+'</div>';
                        // }
                    }
                }, {
                    title: "결의일자",
                    width: 80,
                    field: "R_DT",
                }, {
                    title: "작성자",
                    field: "REG_EMP_NAME",
                    width: 80
                }, {
                    title: "상태",
                    width: 60,
                    template: function(e){
                        if(e.RE_STAT == "N"){
                            return "미승인"
                        } else {
                            return "승인"
                        }
                    }
                }, {
                    title: "첨부",
                    width: 60,
                    template: function(e){
                        // if(e.RE_STAT == "N"){
                        //     return ""
                        // } else {
                        return '<button type="button" class="k-button k-button-solid-base" onclick="exnpReList.fn_regPayAttPop('+e.PAY_APP_SN+', '+e.EXNP_SN+')">첨부</button>';
                        // }
                    }
                }
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
            empSeq: $("#myEmpSeq").val(),
            startDt: $("#startDt").val(),
            endDt: $("#endDt").val(),
            searchStatus: $("#searchStatus").val(),
            searchKeyword: $("#searchKeyword").val(),
            searchValue: $("#searchValue").val()
        }

        mainGrid("/pay/getExnpReList", searchAjaxData);
    }

    function fn_reqRegPopup (key, paySn){
        url = "/payApp/pop/regExnpRePop.do?payAppSn=" + paySn + "&exnpSn=" + key;
        var name = "blank";
        var option = "width = 1700, height = 820, top = 100, left = 400, location = no";
        window.open(url, name, option);
    }

</script>
