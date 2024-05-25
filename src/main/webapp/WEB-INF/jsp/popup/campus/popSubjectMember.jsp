<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix = "fmt" uri = "http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<jsp:useBean id="today" class="java.util.Date" />
<jsp:include page="/WEB-INF/jsp/template/common2.jsp" flush="true"></jsp:include>
<link rel="stylesheet" href="/css/quirk.css">
<link rel="stylesheet" href="/css/style.css">
<script type="text/javascript" src="/js/intra/campus/campus.js?v=${toDate}"></script>
<script type="text/javascript" src="/js/intra/campus/study/studyJournalPop.js?v=${toDate}"></script>
<body class="font-opensans" style="background-color:#fff;">

<input type="hidden" id="pk" value="${params.studyInfoSn}"/>
<input type="hidden" id="ojtType" value="${params.ojtType}" />

<div class="table-responsive">
    <div class="card-header pop-header">
        <h3 class="card-title title_NM">
                <span style="">
                    <c:if test="${params.ojtType != '4'}">
                        학습자
                    </c:if>
                    <c:if test="${params.ojtType == '4'}">
                        지도자
                    </c:if>
                    선택
                </span>
        </h3>
    </div>
    <div id="mainGrid">

    </div>


</div>

<script>
    mainGrid();

    function mainGrid () {
        let dataSource = new kendo.data.DataSource({
            serverPaging: false,
            transport: {
                read : {
                    url: '/campus/getStudyUserList',
                    dataType: "json",
                    type: "post",
                    async: false
                },
                parameterMap: function(data) {
                    data.pk = $("#pk").val();
                    data.studyClassSn = $("#ojtType").val();
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
            pageSize: 10
        });

        $("#mainGrid").kendoGrid({
            dataSource: dataSource,
            sortable: true,
            scrollable: true,
            selectable: "row",
            height: 508,
            pageable : {
                refresh : true,
                pageSizes : [ 10, 20, 50, "ALL" ],
                buttonCount : 5
            },
            toolbar : [
                {
                    name : 'button',
                    template : function (e){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="fn_studyMemSelect()">' +
                            '	<span class="k-button-text">선택</span>' +
                            '</button>';
                    }
                }
            ],
            noRecords: {
                template: "데이터가 존재하지 않습니다."
            },
            columns: [
                {
                    headerTemplate: '<input type="checkbox" id="checkAll" name="checkAll" onclick="fn_checkAll(\'checkAll\', \'userPk\');"/>',
                    template : "<input type='checkbox' id='userPk#=STUDY_EMP_SEQ#' name='userPk' class='userPk' value='#=STUDY_EMP_SEQ#'/>",
                    width: 50
                }, {
                    title: "부서",
                    template : function (e){
                        return e.STUDY_DEPT_NAME + " " + e.STUDY_TEAM_NAME
                    }
                }, {
                    title: "직위",
                    template : function (e){
                        if(e.STUDY_DUTY_NAME != null && e.STUDY_DUTY_NAME != ""){
                            return e.STUDY_DUTY_NAME;
                        } else {
                            return e.STUDY_POSITION_NAME;
                        }
                    }
                }, {
                    field: "STUDY_EMP_NAME",
                    title: "이름",
                }
            ]
        }).data("kendoGrid");
    }

    function fn_studyMemSelect(th){

        var grid = $("#mainGrid").data("kendoGrid");
        var rows = grid.tbody.find("tr");

        var flag = false;
        var empSeq = "";
        var empName = "";
        rows.each(function(e){
            var dataItem = grid.dataItem($(this));
            if($(this).find(".userPk").prop("checked")){
                flag = true;
                empSeq += dataItem.STUDY_EMP_SEQ + ",";
                empName += dataItem.STUDY_EMP_NAME + ",";
            }
        });

        empSeq = empSeq.substring(0, empSeq.length - 1);
        empName = empName.substring(0, empName.length - 1);



        if(!flag){
            alert("학습자를 선택해주세요.");
        } else {

            if($("#ojtType").val() == "4"){
                opener.parent.$("#readerUserName").val(empName);
                opener.parent.$("#readerUserSeq").val(empSeq);
            } else {
                opener.parent.$("#studyUserName").val(empName);
                opener.parent.$("#studyUserSeq").val(empSeq);
            }

            window.close();
        }

    }
</script>
</body>
