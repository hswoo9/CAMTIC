<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<jsp:useBean id="today" class="java.util.Date" />
<jsp:include page="/WEB-INF/jsp/template/common2.jsp" flush="true"></jsp:include>

<style>

</style>

<input type="hidden" id="empSeq" value="${loginVO.uniqId}"/>
<input type="hidden" id="key" value="${params.key}" />

<input type="hidden" id="type" value="${params.type}"/>

<div>
    <div class="card-header pop-header">
        <h3 class="card-title title_NM">
            <span style="position: relative; top: 3px;">
                예산비목
                <c:if test='${params.type eq "A"}'>
                    [장]
                </c:if>
                <c:if test='${params.type eq "B"}'>
                    [관]
                </c:if>
                <c:if test='${params.type eq "C"}'>
                    [항]
                </c:if>
            </span>
        </h3>
        <div id="purcBtnDiv" class="btn-st popButton" style="font-size: 13px">
            <button type="button" class="k-button k-button-solid-error" onclick="window.close()">닫기</button>
        </div>
    </div>

    <div id="budgetGrid" style="margin:10px 0;"></div>
</div>

<script>
    $(function (){
        budgetGird();
    });


    function budgetGird(){
        var budgetGrid = $("#budgetGrid").data("kendoGrid");

        if(budgetGrid != null){
            budgetGrid.destroy()
        }

        var url = "";
        if($("#type").val() == "A"){
            url = "/common/getJangCodeList";
        } else if ($("#type").val() == "B"){
            url = "/common/getGwanCodeList";
        } else if ($("#type").val() == "C"){
            url = "/common/getHangCodeList";
        }

        let dataSourceA = new kendo.data.DataSource({
            serverPaging: false,
            transport: {
                read: {
                    url: url,
                    dataType: "json",
                    type: "post"
                },
                parameterMap: function(data){
                    data.budgetVal = "A";
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

        $("#budgetGrid").kendoGrid({
            dataSource: dataSourceA,
            sortable: true,
            scrollable: true,
            selectable: "row",
            height: 541,
            pageable: {
                refresh: true,
                pageSizes: [ 10, 20, 30, 50, 100 ],
                buttonCount: 5
            },
            toolbar : [
                {
                    name: 'search'
                }, {
                    name: 'button',
                    template: function(){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="commBgCode.fn_addPop(\'jang\', \'A\');">' +
                            '	<span class="k-button-text">추가</span>' +
                            '</button>';
                    }
                }
            ],
            noRecords: {
                template: "데이터가 존재하지 않습니다."
            },
            columns: [
                {
                    template: "#= ++record #",
                    title: "순번",
                    width: 50
                }, {
                    title: "코드",
                    width: 70,
                    template : function(e){
                        if($("#type").val() == "A"){
                            return e.JANG_CD
                        } else if ($("#type").val() == "B"){
                            return e.GWAN_CD
                        } else if ($("#type").val() == "C"){
                            return e.HANG_CD
                        }
                    }
                }, {
                    title: "분류명",
                    template : function(e){
                        if($("#type").val() == "A"){
                            return e.JANG_NM
                        } else if ($("#type").val() == "B"){
                            return e.GWAN_NM
                        } else if ($("#type").val() == "C"){
                            return e.HANG_NM
                        }
                    }
                }, {
                    title: "",
                    template: function(e){
                        return '<button type="button" class="k-button k-button-solid-base">선택</button>';
                    }
                }
            ],
            dataBinding: function() {
                record = (this.dataSource.page() -1) * this.dataSource.pageSize();
            },
        }).data("kendoGrid");
    }
</script>