<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<jsp:useBean id="today" class="java.util.Date" />
<jsp:include page="/WEB-INF/jsp/template/common2.jsp" flush="true"></jsp:include>

<script type="text/javascript" src="<c:url value='/js/intra/cam_project/commonProject.js?v=${today}'/>"></script>
<script type="text/javascript" src="<c:url value='/js/intra/cam_mng/budgetView.js?v=${today}'/>"></script>
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

<input type="hidden" id="pjtSn" value="${params.pjtSn}" />
<input type="hidden" id="bsYm" value="${params.bsYm}" />
<input type="hidden" id="reqType" value="${params.reqType}" />

<input type="hidden" id="payAppType" value="${params.payAppType}" />
<div>
    <div class="card-header pop-header">
        <h3 class="card-title title_NM">
                <span style="position: relative; top: 3px;">
                    법인계좌 관리
                </span>
        </h3>
        <div id="purcBtnDiv" class="btn-st popButton">
            <button type="button" class="k-button k-button-solid-error" onclick="window.close()">닫기</button>
        </div>
    </div>

    <div id="mainGrid" style="margin:20px 0;"></div>
</div>

<script>

    mainGrid();

    function mainGrid(){
        let dataSource = new kendo.data.DataSource({
            serverPaging: false,
            transport: {
                read: {
                    url: "/account/getAccountList.do",
                    dataType: "json",
                    type: "post"
                },
                parameterMap: function(data){
                    data.userKind = $('#userKind').val();
                    data.empNameKr = $("#kindContent").val();
                    data.kindContent = $("#kindContent").val();
                    data.userGender = $("#userGender").val();
                    data.deptComp = $("#deptComp").val();
                    data.deptTeam = $("#deptTeam").val();
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
            pageSize: 10
        });

        $("#mainGrid").kendoGrid({
            dataSource: dataSource,
            sortable: true,
            scrollable: true,
            selectable: "row",
            height: 472,
            pageable: {
                refresh: true,
                pageSizes: [ 10, 20, 30, 50, 100 ],
                buttonCount: 5
            },
            noRecords: {
                template: "데이터가 존재하지 않습니다."
            },
            // toolbar: [
            //     {
            //         name: 'button',
            //         template: function (e) {
            //             return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="srm.accountGridReload()">' +
            //                 '	<span class="k-button-text">조회</span>' +
            //                 '</button>';
            //         }
            //     }, {
            //         name: 'button',
            //         template: function (e) {
            //             return '<button type="button" class="k-button k-button-md k-button-solid k-button-solid-info" onclick="srm.fn_regAccountToPop()">' +
            //                 '	<span class="k-button-text">추가</span>' +
            //                 '</button>';
            //         }
            //     },
            // ],
            columns: [
                {
                    field: "BANK_NAME",
                    title: "은행명",
                    width : 100
                }, {
                    field: "PAY_ACCOUNT",
                    title: "지급계좌",
                    width : 100
                }, {
                    field: "DEPOSITOR",
                    title: "예금주",
                    width : 100
                }, {
                    field: "ACCOUNT_NAME",
                    title: "계좌별칭",
                    width : 100
                }, {
                    title: "",
                    width : 30,
                    template: function(e){
                        return '<button type="button" class="k-button k-button-md k-button-solid k-button-solid-base" onclick="fn_reqRegPopup('+e.ACCOUNT_TO_SN+')">' +
                            '	<span class="k-button-text">선택</span>' +
                            '</button>';
                    }
                }

            ]
        }).data("kendoGrid");
    }


    function fn_reqRegPopup(acKey){
        var key = $("#pjtSn").val();
        var url = "/payApp/pop/regPayAppPop.do";
        if(key != null && key != ""){
            url = "/payApp/pop/regPayAppPop.do?pjtSn=" + key + "&bsYm=" + $("#bsYm").val() + "&reqType=partRate";
        }
        var name = "_blank";
        var option = "width = 1700, height = 820, top = 100, left = 400, location = no"
        var popup = window.open(url, name, option);

        window.close();
    }
</script>