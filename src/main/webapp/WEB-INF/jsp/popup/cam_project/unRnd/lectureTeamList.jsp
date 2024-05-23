<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix = "fmt" uri = "http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<jsp:useBean id="today" class="java.util.Date" />
<jsp:include page="/WEB-INF/jsp/template/common2.jsp" flush="true"></jsp:include>

<body class="font-opensans" style="background-color:#fff;">

<input type="hidden" id="pjtSn" value="${params.pjtSn}"/>
<input type="hidden" id="purcSn" value="${params.purcSn}" />
<input type="hidden" id="pjtUnitSn" value="${params.pjtUnitSn}"/>
<input type="hidden" id="mode" value="${params.mode}"/>
<input type="hidden" id="type" name="type" />

<div style="padding:0;">
    <div class="table-responsive">
        <div class="card-header pop-header">
            <h3 class="card-title title_NM">
                <span style="position: relative; top: 3px;">
                    단위사업
                </span>
            </h3>
            <div id="lectureTeamBtnDiv" class="btn-st popButton" style="font-size: 13px;">
                <button type="button" class="k-button k-button-solid-error" onclick="window.close()">닫기</button>
            </div>
        </div>

        <div style="padding: 20px 30px;" id="pjtUnitGrid">
            <span style=""> ◎ 단위사업 리스트</span>
            <div id="unitMainGrid" style="margin-top:5px; margin-bottom: 20px;"></div>
        </div>

        <div style="padding: 20px 30px; display: none;" id="pjtUnitCrmGrid">
            <span style=""> ◎ 업체 리스트</span>
            <div id="unitCrmGrid" style="margin-top:5px; margin-bottom: 20px;"></div>
        </div>
    </div>
</div>
<script type="text/javascript">
    unitMainGrid();

    $(function(){
        if($("#pjtUnitSn").val() != ""){
            fn_showCrmList($("#pjtUnitSn").val());
        }
    });

    function unitMainGrid(){
        let unitDataSource = new kendo.data.DataSource({
            serverPaging: false,
            transport: {
                read : {
                    url : "/projectUnRnd/getUnitBusnList",
                    dataType : "json",
                    type : "post"
                },
                parameterMap: function(data){
                    data.pjtSn = $("#pjtSn").val();
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

        $("#unitMainGrid").kendoGrid({
            dataSource: unitDataSource,
            sortable: true,
            scrollable: true,
            selectable: "row",
            height: 489,
            pageable : {
                refresh : true,
                pageSizes : [ 10, 20, 50, "ALL" ],
                buttonCount : 5
            },
            toolbar: [
                {
                    name: 'button',
                    template: function (e) {
                        return '<button type="button" class="k-button k-button-md k-button-solid k-button-solid-base" onclick="unRndLectList.unitGridReload()">' +
                            '	<span class="k-button-text">조회</span>' +
                            '</button>';
                    }
                }

            ],
            noRecords: {
                template: "데이터가 존재하지 않습니다."
            },
            columns: [
                {
                    title: "연번",
                    template: "#= --record #",
                    width: "3%"
                }, {
                    field: "LEC_NM",
                    title: "단위사업명",
                    width: "15%",
                }, {
                    title: "기간",
                    width: "10%",
                    template: function(e){
                        return e.STR_DT + "~" + e.END_DT;
                    }
                }, {
                    title: "사업목적",
                    width: "20%",
                    template: function(e){
                        return e.UNIT_OBJ;
                    }
                }, {
                    title: "업체 수",
                    width: "5%",
                    template: function(e){
                        return e.CRM_CNT;
                    }
                }, {
                    title : "선택",
                    width : "5%",
                    template: function(e){
                        return '<button type="button" class="k-button k-button-md k-button-solid k-button-solid-primary" onclick="fn_showCrmList('+e.PJT_UNIT_SN+')">선택</button>';
                    }
                }
            ],
            dataBinding: function(){
                record = fn_getRowNum(this, 2);
            }
        }).data("kendoGrid");
    }

    function fn_showCrmList(key){
        $("#pjtUnitGrid").css("display", "none");
        $("#pjtUnitCrmGrid").css("display", "");

        let unitCrmDataSource = new kendo.data.DataSource({
            serverPaging: false,
            transport: {
                read : {
                    url : "/projectUnRnd/getPjtUnitCrmList",
                    dataType : "json",
                    type : "post"
                },
                parameterMap: function(data){
                    data.pjtUnitSn = key;
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

        $("#unitCrmGrid").kendoGrid({
            dataSource: unitCrmDataSource,
            sortable: true,
            scrollable: true,
            selectable: "row",
            height: 489,
            pageable : {
                refresh : true,
                pageSizes : [ 10, 20, 50, "ALL" ],
                buttonCount : 5
            },
            noRecords: {
                template: "데이터가 존재하지 않습니다."
            },
            columns: [
                {
                    title: "연번",
                    template: "#= --record #",
                    width: "3%"
                }, {
                    field: "CRM_NM",
                    title: "업체명",
                    width: "30%",
                }, {
                    title: "총 금액",
                    width: "20%",
                    template: function(e){
                        return '<div style="text-align: right">'+comma(e.BUSN_AMT)+'</div>';
                    }
                }, {
                    title: "사용 금액",
                    width: "20%",
                    template: function(e){
                        return '<div style="text-align: right">'+comma(e.SUM_AMT)+'</div>';
                    }
                }, {
                    title: "잔액",
                    width: "20%",
                    template: function(e){
                        return '<div style="text-align: right">'+comma(Number(e.BUSN_AMT) - Number(e.SUM_AMT))+'</div>';
                    }
                }, {
                    title: "선택",
                    width: "10%",
                    template: function(e){
                        if($("#pjtUnitSn").val() == ""){
                            return '<button type="button" class="k-button k-button-md k-button-solid k-button-solid-base" onclick="fn_selectUnitCrm('+e.PJT_UNIT_SN+', \''+e.CRM_NM+'\', \''+e.CRM_SN+'\')">선택</button>';
                        } else {
                            return "";
                        }
                    }
                }
            ],
            dataBinding: function(){
                record = fn_getRowNum(this, 2);
            }
        }).data("kendoGrid");
    }

    function comma(str) {
        str = String(str);
        return str.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,');
    }

    function fn_selectUnitCrm(key, crmNm, crmSn){

        if(!confirm("해당 ["+crmNm+"] 업체를 선택하시겠습니까?")){
            return;
        }

        var data = {
            pjtUnitSn : key,
            purcSn : $("#purcSn").val(),
            crmSn : crmSn
        }

        $.ajax({
            url : "/projectUnRnd/setPurcUnitCrm",
            type : "post",
            data : data,
            dataType : "json",
            success : function(rs){
                if(rs.code == 200){
                    alert("등록되었습니다.");
                    opener.parent.$("#grid2").data("kendoGrid").dataSource.read();

                    window.close();
                }
            }
        });
    }
</script>
</body>
</html>