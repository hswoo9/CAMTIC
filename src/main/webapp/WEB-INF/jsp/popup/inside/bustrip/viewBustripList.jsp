<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix = "fmt" uri = "http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<jsp:useBean id="today" class="java.util.Date" />
<jsp:include page="/WEB-INF/jsp/template/common2.jsp" flush="true"></jsp:include>

<body class="font-opensans" style="background-color:#fff;">

<%--<script type="text/javascript" src="/js/intra/inside/bustrip/bustripList.js?v=${today}"/></script>--%>
<script type="text/javascript" src="/js/intra/inside/bustrip/bustrip.js?v=${today}"/></script>

<div style="padding:0;">
    <div class="table-responsive">
        <input type="hidden" id="menuCd" name="menuCd" value="${menuCd}">
        <div class="card-header pop-header">
            <h3 class="card-title title_NM"><span style="position: relative; top: 3px;" id="pjtTitle">출장 정보</span>
            </h3>

        </div>
        <div>
            <table class="searchTable table table-bordered mb-0">
                <colgroup>
                    <col width="10%">
                    <col width="25%">
                    <col width="10%">
                    <col width="10%">
                    <col width="25%">
                    <col width="10%">
                </colgroup>
                <tr>
                    <th class="text-center th-color">출장 기간</th>
                    <td colspan="2">
                        <input type="text" id="start_date" style="width: 150px;">
                        ~
                        <input type="text" id="end_date" style="width: 150px;">
                    </td>
                    <th class="text-center th-color">출장지</th>
                    <td colspan="2">
                        <input type="text" id="visitLoc" style="width: 300px;" onkeypress="if(window.event.keyCode==13){popMainGrid()}">
                    </td>
                </tr>
            </table>
            <div id="popMainGrid" style="margin:20px 0;"></div>
        </div>

    </div>
</div>
<script type="text/javascript">

    customKendo.fn_datePicker("start_date", 'month', "yyyy-MM-dd", new Date(bustrip.global.year, bustrip.global.month, 1));
    customKendo.fn_datePicker("end_date", 'month', "yyyy-MM-dd", new Date(bustrip.global.year, bustrip.global.afMonth, 0));
    customKendo.fn_textBox(["visitLoc"]);

    popMainGrid();
    function popMainGrid(){
        let dataSource = new kendo.data.DataSource({
            serverPaging: false,
            transport: {
                read: {
                    url: "/bustrip/getPopBustripList",
                    dataType: "json",
                    type: "post"
                },
                parameterMap: function(data){
                    data.startDate = $("#start_date").val();
                    data.endDate = $("#end_date").val();
                    data.projectCd = $("#pjt_cd").val();
                    data.busnName = $("#busnName").val();
                    data.empSeq = $("#regEmpSeq").val();
                    data.visitLoc = $("#visitLoc").val();
                    return data;
                }
            },
            schema: {
                data: function(data){
                    return data.list;
                },
                total: function(data){
                    return data.list.length;
                },
            },
            pageSize: 10,
        });

        $("#popMainGrid").kendoGrid({
            dataSource: dataSource,
            sortable: true,
            scrollable: true,
            selectable: "row",
            height: 480,
            pageable: {
                refresh: true,
                pageSizes: [ 10, 20, 30, 50, 100 ],
                buttonCount: 5
            },
            noRecords: {
                template: "데이터가 존재하지 않습니다."
            },
            // dataBound: bustripList.onDataBound,
            toolbar: [
                {
                    name: 'button',
                    template: function(){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="popGridReload()">' +
                            '	<span class="k-button-text">조회</span>' +
                            '</button>';
                    }
                }],
            columns: [
                {
                    title: "사업명",
                    width: 200,
                    template: function(row){
                        var busnName = "";
                        var project = "";
                        if(row.BUSN_NAME != "" && row.BUSN_NAME != null && row.BUSN_NAME != undefined){
                            busnName = row.BUSN_NAME;
                        }

                        if(row.PROJECT_CD != "" && row.PROJECT_CD != null){
                            project = "(" + row.PROJECT + ") ";
                        }
                        return  project + busnName;
                    }
                }, {
                    field: "EMP_NAME",
                    title: "출장자",
                    width: 80
                }, {
                    title: "출장지 (경유지)",
                    template: function(row){
                        if(row.VISIT_LOC_SUB != ""){
                            return row.VISIT_CRM + " (" + row.VISIT_LOC_SUB+")";
                        }else{
                            return row.VISIT_CRM;
                        }
                    },
                    width: 160
                }, {
                    title: "출발일시",
                    template: function(row){
                        return row.TRIP_DAY_FR + " " + row.TRIP_TIME_FR;
                    },
                    width: 100
                }, {
                    title: "복귀일시",
                    template: function(row){
                        return row.TRIP_DAY_TO + " " + row.TRIP_TIME_TO;
                    },
                    width: 100
                }, {
                    field: "CAR_CLASS_NAME",
                    title: "차량",
                    width: 80
                }, {
                    title: "",
                    template: function(row){
                        console.log(row)
                        var busnName = "";
                        var project = "";
                        if(row.BUSN_NAME != "" && row.BUSN_NAME != null && row.BUSN_NAME != undefined){
                            busnName = row.BUSN_NAME;
                        }

                        if(row.PROJECT_CD != "" && row.PROJECT_CD != null){
                            project = "(" + row.PROJECT + ") ";
                        }
                        var title =  project + busnName + " 출장지 : " +  row.VISIT_CRM;
                        if(row.VISIT_LOC_SUB != ""){
                            title += " (" + row.VISIT_LOC_SUB+")";
                        }
                        var result = row.RESULT.replaceAll("\r\n", "<br>");
                        return '<button type="button" class="k-button k-button-md k-button-solid k-button-solid-info" onclick="fn_selBustripInfo(\''+row.HR_BIZ_REQ_RESULT_ID+'\', \''+title+'\', \''+result+'\', \''+ row.HR_BIZ_REQ_ID +'\');">선택</button>';
                    },
                    width: 60
                }
            ]
        }).data("kendoGrid");
    }

     function fn_selBustripInfo(d, title, result, f){
        opener.parent.$("#contEtc").val(result.replaceAll("<br>", "\r\n"));
        opener.parent.$("#bustripReq").val(title)
        opener.parent.$("#hrBizReqResultId").val(d);
        opener.parent.$("#hrBizReqId").val(f);
        window.close();
    }
</script>
</body>
</html>