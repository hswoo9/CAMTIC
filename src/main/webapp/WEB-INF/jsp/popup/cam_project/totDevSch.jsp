<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix = "fmt" uri = "http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<jsp:useBean id="today" class="java.util.Date" />
<jsp:include page="/WEB-INF/jsp/template/common2.jsp" flush="true"></jsp:include>

<body class="font-opensans" style="background-color:#fff;">
<script type="text/javascript" src="/js/intra/cam_project/commonProject.js?v=${today}"/></script>
<input type="hidden" id="pjtSn" value="${params.pjtSn}" />
<input type="hidden" id="empSeq" value="${loginVO.uniqId}" />
<div style="padding:0;">
    <div class="table-responsive">
        <input type="hidden" id="menuCd" name="menuCd" value="${menuCd}">
        <div class="card-header pop-header">
            <h3 class="card-title title_NM"><span style="position: relative; top: 3px;" id="pjtTitle">과제일정 일괄등록</span>
            </h3>
            <button type="button" id="saveBtn" style="float: right; top:5px" class="k-button k-button-solid-base" onclick="save()">추가</button>
        </div>

        <div id="popMainGrid"></div>
    </div>
</div>
<script type="text/javascript">

    $(function (){
        popMainGrid();


    });

    function popMainGrid() {
        let dataSource = new kendo.data.DataSource({
            serverPaging: false,
            transport: {
                read: {
                    url: "/project/selLgCode",
                    dataType: "json",
                    type: "post"
                },
                parameterMap: function(data){
                    data.grpSn = "PJT_SCH";
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
            pageSize: 100,
        });

        $("#popMainGrid").kendoGrid({
            dataSource: dataSource,
            sortable: true,
            scrollable: true,
            selectable: "row",
            height: 480,
            pageable: {
                refresh: true,
                buttonCount: 5
            },
            noRecords: {
                template: "데이터가 존재하지 않습니다."
            },
            dataBound : function (e){
                $(".schStrDe").kendoDatePicker({
                    start: "decade",
                    depth: "decade",
                    culture : "ko-KR",
                    format : "yyyy-MM-dd",
                    value : new Date()
                });
            },
            columns: [
                {
                    headerTemplate: '<input type="checkbox" id="checkAll" name="checkAll"/>',
                    template : function(e){
                        var chk = "";
                        if(e.CHK > 0){
                            chk = "checked";
                        }

                        return "<input type='checkbox' id='devSch_" + e.LG_CD + "' name='devSchChk' value='" + e.RECRUIT_COMMISSIONER_INFO_SN + "' " + chk + "/>"
                    },
                    width: 50
                }, {
                    template: "#= ++record #",
                    title: "번호",
                    width : 80
                }, {
                    field: "LG_CD",
                    title: "코드번호",
                    width: 80
                }, {
                    title: "업무내용",
                    field: "LG_CD_NM",
                    width: 150
                }, {
                    title: "예정일",
                    width: 180,
                    template : function(e){

                        return '<input type="text" id="schStrDe_' + e.LG_CD + '" class="schStrDe" name="schStrDe" style="width: 80%; text-align: left">'
                    }
                }
            ],

            dataBinding: function() {
                record = (this.dataSource.page() -1) * this.dataSource.pageSize();
            }
        }).data("kendoGrid");



        $("#checkAll").click(function(){
            if($(this).is(":checked")) $("input[name=devSchChk]").prop("checked", true);
            else $("input[name=devSchChk]").prop("checked", false);
        });


    }

    function save(){
        if(!confirm("추가하시겠습니까?")){
            return;
        }
        var grid = $("#popMainGrid").data("kendoGrid");

        grid.tbody.find("tr").each(function(){
            var dataItem = grid.dataItem($(this));
            if($(this).find("input:checkbox").is(":checked")){
                var data = {
                    pjtSn : $("#pjtSn").val(),
                    devSchNm : dataItem.LG_CD_NM,
                    schStrDe : $(this).find("input:text").val(),
                    devSchCd : dataItem.LG_CD,
                    empSeq : $("#empSeq").val()
                }

                $.ajax({
                    url : "/projectRnd/setDevSchData",
                    data : data,
                    type : "post",
                    async: false,
                    dataType : "json",
                    success : function (rs){
                        if(rs.code == 200){
                            opener.parent.rndDS.gridReload();

                            window.close();
                        }
                    }
                })
            }
        });
    }
</script>
</body>
</html>