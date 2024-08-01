<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix = "fmt" uri = "http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<jsp:useBean id="today" class="java.util.Date" />
<jsp:include page="/WEB-INF/jsp/template/common2.jsp" flush="true"></jsp:include>

<style>
    .k-grid-content td {
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }
</style>
<body class="font-opensans" style="background-color:#fff;">

<input type="hidden" id="empSeq" value="${loginVO.uniqId}" />
<div style="padding:0;">
    <div class="table-responsive">
        <input type="hidden" id="menuCd" name="menuCd" value="${menuCd}">
        <div class="card-header pop-header">
            <h3 class="card-title title_NM">
                <span style="position: relative; top: 3px;" id="pjtTitle">구매신청 목록</span>
            </h3>
        </div>
        <div style="margin: 15px 0;">

        </div>
        <div id="mainGrid">

        </div>
    </div>
</div>
<script type="text/javascript">

    var data = {
        empSeq : $("#empSeq").val(),
        searchKeyword : '',
        searchValue : ''
    }
    mainGrid("/purc/getPurcReqList.do", data);


    function mainGrid(url, params){
        $("#mainGrid").kendoGrid({
            dataSource: customKendo.fn_gridDataSource2(url, params),
            sortable: true,
            selectable: "row",
            height : 375,
            pageable: {
                refresh: true,
                pageSizes : [ 10, 20, 50, "ALL" ],
                buttonCount: 5
            },
            noRecords: {
                template: "데이터가 존재하지 않습니다."
            },
            columns: [
                {
                    title: "문서번호",
                    field: "DOC_NO",
                    width: 180,
                }, {
                    field: "PURC_REQ_DATE",
                    title: "요청일",
                    width: 120,
                }, {
                    title: "요청자",
                    field: "EMP_NAME_KR",
                    width: 100
                }, {
                    title: "목적",
                    field: "PURC_REQ_PURPOSE",
                    template : function(e){
                        return e.PURC_REQ_PURPOSE
                    }
                }, {
                    title: "구매요청서",
                    field: "STATUS",
                    width: 100,
                    template : function(e){
                        var status = "";
                        /** 구매요청서 */
                        if(e.DOC_STATUS == "100"){
                            status = '<button type="button" class="k-button k-button-solid-info" onclick="fn_reqPurcRegPopup(' + e.PURC_SN + ')">구매요청서</button>';
                        } else {
                            status = '<button type="button" class="k-button k-button-solid-base" onclick="fn_reqPurcRegPopup(' + e.PURC_SN + ')">구매요청서</button>';
                        }

                        return status
                    }
                }, {
                    title: "금액",
                    width: 100,
                    template: function(e){
                        return "<div style='text-align: right'>"+comma(e.PURC_ITEM_AMT_SUM)+"</div>";
                    }
                }, {
                    title: "결재상태",
                    width: 100,
                    template : function(e){
                        if(e.APPROVE_STAT_CODE == '0' || e.APPROVE_STAT_CODE == '40' || e.APPROVE_STAT_CODE == '60'){
                            return '작성중';
                        } else if(e.APPROVE_STAT_CODE == '10' || e.APPROVE_STAT_CODE == '20' || e.APPROVE_STAT_CODE == '50') {
                            return '결재중';
                        } else if(e.APPROVE_STAT_CODE == '30') {
                            return '반려';
                        } else if(e.APPROVE_STAT_CODE == '100' || e.APPROVE_STAT_CODE == '101') {
                            return '결재완료';
                        } else {
                            return '-';
                        }
                    }
                }, {
                    width: 80,
                    template: function(e){
                        return '<button type="button" class="k-button k-button-md k-button-solid k-button-solid-base" onclick="fn_selPurc('+e.PURC_SN+', \''+e.PURC_REQ_PURPOSE+'\')">' +
                            '	<span class="k-button-text">선택</span>' +
                            '</button>';
                    }
                }
            ]
        }).data("kendoGrid");
    }

    function fn_reqPurcRegPopup (key){
        var url = "/purc/pop/regPurcReqPop.do";
        if(key != null && key != ""){
            url = "/purc/pop/regPurcReqPop.do?purcSn=" + key;
        }


        var name = "_blank";
        var option = "width = 1820, height = 820, top = 100, left = 600, location = no"
        var popup = window.open(url, name, option);
    }

    function fn_selPurc (key, purcReqPurpose) {
        opener.parent.regCardToPop.fn_selPurc(key, purcReqPurpose);
        window.close();
    }
</script>
</body>
</html>