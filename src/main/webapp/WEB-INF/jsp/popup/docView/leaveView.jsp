<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix = "fmt" uri = "http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<jsp:useBean id="today" class="java.util.Date" />
<jsp:include page="/WEB-INF/jsp/template/common2.jsp" flush="true"></jsp:include>

<body class="font-opensans" style="background-color:#fff;">

<input type="hidden" id="empSeq" name="empSeq" value="${loginVO.uniqId}">

<div style="padding:0;">
    <div class="table-responsive">
        <input type="hidden" id="menuCd" name="menuCd" value="${menuCd}">
        <div class="card-header pop-header">
            <h3 class="card-title title_NM"><span style="position: relative; top: 3px;" id="pjtTitle">휴직신청서 선택</span>
            </h3>
        </div>
        <div>
            <div id="popMainGrid" style="margin:20px 0;"></div>
        </div>

    </div>
</div>
<script type="text/javascript">
    $(function(){
        let dataSource = new kendo.data.DataSource({
            serverPaging: false,
            transport: {
                read: {
                    url: "/customDoc/getLeaveList",
                    dataType: "json",
                    type: "post"
                },
                parameterMap: function(data){

                    data.empSeq = $("#empSeq").val();
                    data.deptSeq = $("#deptSeq").val();
                    data.deptName = $("#deptName").val();
                    data.empName = $("#empName").val();

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

        var mainGrid = $("#popMainGrid").kendoGrid({
            dataSource : dataSource,
            height : 359,
            sortable: true,
            scrollable: true,
            pageable: {
                refresh: true,
                pageSize : 5,
                pageSizes: [10, 20, 30, 50, "ALL"],
                buttonCount: 5
            },
            noRecords: {
                template: "데이터가 존재하지 않습니다."
            },
            persistSelection : true,
            columns : [
                {
                    field : "DOC_NO",
                    title : "문서번호",
                    width : 150,
                    template : function (e){
                        // if(e.DOC_NO != null){
                        //     return e.DOC_NO
                        // }else{
                        return "-"
                        // }
                    }
                }, {
                    field : "STR_DE",
                    title : "신청 시작일",
                    width : 150
                }, {
                    field : "END_DE",
                    title : "신청 종료일",
                    width : 150
                }, {
                    field : "LEAVE_CONT",
                    title : "휴직사유",
                    width : 600
                }, {
                    field : "ETC",
                    title : "기타사항",
                    width : 200
                }, {
                    title : "수정",
                    template: function(e){
                        return '<button type="button" class="k-button k-button-md k-button-solid k-button-solid-info" onclick="fn_popLeaveView('+e.LEAVE_SN+', '+e.STR_DE+', '+e.END_DE+')">' +
                            '	<span class="k-button-text">선택</span>' +
                            '</button>';
                    },
                    width: 80
                }
            ]
        }).data("kendoGrid");
    });

    function fn_selectLeave(key, de1, de2){
        opener.parent.selectLeave(key, de1, de2);
        window.close();
    }

</script>
</body>
</html>