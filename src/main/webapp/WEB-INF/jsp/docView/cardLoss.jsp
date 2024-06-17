<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c"       uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<jsp:useBean id="today" class="java.util.Date" />
<script type="text/javascript" src="<c:url value='/js/intra/common/kendoSettings.js'/>"></script>
<style>
    a:hover {
        font-weight: bold;
        text-decoration: underline !important;
        cursor: pointer;
    }
</style>

<input type="hidden" id="deptSeq" name="deptSeq" value="${loginVO.orgnztId}">
<input type="hidden" id="empSeq" name="empSeq" value="${loginVO.uniqId}">
<input type="hidden" id="empName" name="empName" value="${loginVO.name}">
<input type="hidden" id="deptName" name="deptName" value="${loginVO.orgnztNm}">

<div class="mainCard">
    <div class="panel">
        <div class="panel-heading">
        </div>
        <div style="padding-left : 20px; padding-right: 20px;">
            <h4 class="panel-title">법인카드 분실 신고서</h4>
            <div class="title-road">캠인사이드 > 양식관리 &gt; 법인카드 분실 신고서</div>
            <div id="startView" style="padding: 10px 0 0 0; border-top: 2px solid #dfdfdf;"></div>
        </div>
        <div class="panel-body">
            <div>
                <div id="mainGrid" style="margin:20px 0;"></div>
            </div>
        </div>
    </div>
</div><!-- col-md-9 -->

<script>

    $(function(){
        let dataSource = new kendo.data.DataSource({
            serverPaging: false,
            transport: {
                read: {
                    url: "/customDoc/getCardLossList",
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

        var mainGrid = $("#mainGrid").kendoGrid({
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
            toolbar: [
                {
                    name: 'button',
                    template: function (e) {
                        return '<button type="button" class="k-button k-button-md k-button-solid k-button-solid-info" onclick="fn_popCardLossView()">' +
                            '	<span class="k-button-text">등록</span>' +
                            '</button>';
                    }
                }, {
                    name: 'button',
                    template: function (e) {
                        return '<button type="button" class="k-button k-button-md k-button-solid k-button-solid-base" onclick="gridReload()">' +
                            '	<span class="k-button-text">조회</span>' +
                            '</button>';
                    }
                }
            ],
            persistSelection : true,
            columns : [
                {
                    field : "DOC_NO",
                    title : "문서번호",
                    width : 150,
                    template : function (e){
                        return e.DOC_NO || "";
                    }
                },{
                    field : "CARD_NO",
                    title : "카드번호",
                    width : 230
                },{
                    field : "REG_DE",
                    title : "신청일자",
                    width : 100
                },{
                    field : "CL_DE",
                    title : "분실일자",
                    width : 100
                }, {
                    field : "CL_LOC",
                    title : "분실장소",
                    width : 250
                }, {
                    field : "CL_ISS",
                    title : "분실사유"
                }, {
                    title : "수정",
                    template: function(e){
                        return '<button type="button" class="k-button k-button-md k-button-solid k-button-solid-primary" onclick="fn_popCardLossView('+e.TP_CL_SN+')">' +
                            '	<span class="k-button-text">수정</span>' +
                            '</button>';
                    },
                    width: 80
                }, {
                    title : "삭제",
                    template: function(e){
                        if(e.STATUS == "10" || e.STATUS == "50" || e.STATUS == "100"){
                            return "-";
                        }else{
                            return '<button type="button" class="k-button k-button-md k-button-solid k-button-solid-error" onclick="fn_delCardLoss('+e.TP_CL_SN+')">' +
                                '	<span class="k-button-text">삭제</span>' +
                                '</button>';
                        }
                    },
                    width: 80
                }]
        }).data("kendoGrid");
    });


    function fn_popCardLossView(key){
        var url = "/customDoc/pop/popCLView.do";

        if(key != null && key != ""){
            url = url + "?key=" + key;
        }
        var name = "_blank";
        var option = "width = 1050, height = 500, top = 200, left = 400, location = no"
        var popup = window.open(url, name, option);
    }


    function gridReload(){
        $("#mainGrid").data("kendoGrid").dataSource.read();
    }

    function fn_delCardLoss(key){
        var rs = customKendo.fn_customAjax("/customDoc/delCardLossData", {tpClSn : key});

        if(rs.code == 200){
            alert("삭제되었습니다.");
            gridReload();
        }
    }
</script>
