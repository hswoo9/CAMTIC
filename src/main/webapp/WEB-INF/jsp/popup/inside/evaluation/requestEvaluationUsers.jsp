<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix = "fmt" uri = "http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<jsp:useBean id="today" class="java.util.Date" />
<jsp:include page="/WEB-INF/jsp/template/common2.jsp" flush="true"></jsp:include>

<link rel="stylesheet" href="/css/quirk.css">
<link rel="stylesheet" href="/css/style.css">

<style>
    .searchTable > thead > tr > th, .searchTable > tfoot > tr > th {
        background-color: #00397f96;
        color: white;
        text-align: center;
    }
</style>

<input type="hidden" id="bsYear" value="${params.bsYear}"/>
<input type="hidden" id="evalSn" value="${params.pk}"/>

<body class="font-opensans" style="background-color:#fff;">
<div class="col-lg-12 pop_sign_wrap" style="width:100%;padding: 0px">
    <div class="table-responsive">
        <div class="card-header pop-header" style="text-align: center">
            <h3 class="card-title title_NM">
                인사평가 대상 설정
            </h3>
        </div>

        <div class="panel-body">
            <input type="text" id="bsYMD" style="width: 10%" value=""/>
            <button type="button" id="searchBtn" class="k-button k-button-solid-base" onclick="requestEvaluationMainGrid()" style="font-size: 11px;">검색</button>
        </div>

        <div class="panel-body">
            <div id="mainGrid"></div>
        </div>
    </div>
</div><!-- col-md-9 -->

<script>
    var chkEmpSeqArr = [];

    $(function () {
        if(window.opener.empSeqArr.length == 0){
            chkEmpSeqArr = window.opener.chkEmpSeqArr.map(function(value) {
                return parseInt(value, 10);
            });
        }/*else{
            chkEmpSeqArr = window.opener.empSeqArr.split(',').filter(function(value) {
                return value.trim() !== "";
            }).map(function(value) {
                return parseInt(value, 10);
            });
        }*/
         else {
            chkEmpSeqArr = window.opener.empSeqArr.map(function(value) {
                if (typeof value === 'object' && value !== null && 'empSeq' in value) {
                    return parseInt(value.empSeq, 10);
                } else if (typeof value === 'string') {
                    return parseInt(value, 10);
                }
            }).filter(function(value) {
                return !isNaN(value);
            });
        }

        customKendo.fn_datePicker("bsYMD", '', "yyyy-MM-dd", new Date($("#bsYear").val()+"-12-31"));
        requestEvaluationMainGrid();
        chkCount();
    });

    function chkCount(){
        var checkedCount = $("input[name='empPk']:checked").length;
        $("#chkEvalMem").text(checkedCount);
    }

    function requestEvaluationMainGrid () {
        let dataSource = new kendo.data.DataSource({
            serverPaging: false,
            transport: {
                read : {
                    url : '/evaluation/getRequestEvaluationMemberTot',
                    dataType : "json",
                    type : "post"
                },
                parameterMap: function(data) {
                    data.empSeq = $("#empSeq").val();
                    data.bsYMD = $("#bsYMD").val();
                    data.evalSn = $("#evalSn").val();
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
            pageSize: 1000,
        });

        $("#mainGrid").kendoGrid({
            dataSource: dataSource,
            selectable: "row",
            height: 508,
            noRecords: {
                template: "데이터가 존재하지 않습니다."
            },
            toolbar : [
                {
                    name : 'text',
                    template : function (e){
                        return '평가대상 : <span id="chkEvalMem">0</span> / <span id="totEvalMem" style="color: red;">0</span> 명';
                    }
                }, {
                    name : 'excel',
                    text : '목록저장'
                }, {
                    name : 'button',
                    template : function (e){
                        return '<button type="button" class="k-button k-button-solid-info" style="font-size: 11px;" onclick="fn_sendReqUsers()">평가대상 설정 완료</button>';
                    }
                }
            ],
            excel : {
                fileName : "인사평가 대상 인원.xlsx"
            },
            dataBound : function (e){
                $("#totEvalMem").text(e.sender.dataSource.total());
            },
            columns: [
                {
                    headerTemplate: '<input type="checkbox" id="checkAll" name="checkAll" onclick="fn_checkAll(\'checkAll\', \'empPk\');"/>',
                    template : function(row){
                        if(chkEmpSeqArr.includes(row.EMP_SEQ)){
                            return "<input type='checkbox' id='empPk" + row.EMP_SEQ + "' name='empPk' class='empPk' onclick='chkCount();' value='" + row.EMP_SEQ + "' checked/>";
                        }else{
                            return "<input type='checkbox' id='empPk" + row.EMP_SEQ + "' name='empPk' class='empPk' onclick='chkCount();' value='" + row.EMP_SEQ + "'/>";
                        }
                    },
                    width: 50
                }, {
                    field: "DEPT_NAME_OD",
                    title: "부서",
                    width: 110
                }, {
                    field: "TEAM_NAME",
                    title: "팀",
                    width: 110
                }, {
                    field : "EMP_NAME_KR",
                    title: "성명",
                    width: 80,

                }, {
                    title: "직위",
                    width: 100,
                    field: "DUTY_POSITION_NAME"
                }, {
                    title: "1차 평가자",
                    width: 100,
                    field: "T1",
                    template: function (row){
                        return '<a href="javascript:void(0);" onclick="userSearch(\''+row.EMP_SEQ+'\', 1);" >' +
                            '<span id="t1_'+row.EMP_SEQ+'" style="display: inline-block; width: 100%; height: 100%;">' + row.T1 + '</span>' +
                            '</a>';
                    }
                }, {
                    title: "2차 평가자",
                    width: 100,
                    field: "T2",
                    template: function (row){
                        return '<a href="javascript:void(0);" onclick="userSearch(\''+row.EMP_SEQ+'\', 2);" >' +
                            '<span id="t2_'+row.EMP_SEQ+'" style="display: inline-block; width: 100%; height: 100%;">' + row.T2 + '</span>' +
                            '</a>';
                    }
                }, {
                    title: "직군",
                    width: 100,
                    field: "OCC_NM"

                }, {
                    title: "입사일",
                    width: 100,
                    template: function (row){
                        var joinDay = row.JOIN_DAY;
                        var date = new Date(joinDay);

                        var year = date.getFullYear();
                        var month = ("0" + (date.getMonth() + 1)).slice(-2);
                        var day = ("0" + date.getDate()).slice(-2);

                        return year + "-" + month + "-" + day;
                    }
                },
                {
                    title: "현직경력",
                    width: 100,
                    template: function (row){
                        return row.hire + " 년 " + row.hire_mon + " 개월";
                    }
                },{
                    field: "",
                    title: "당해년도 근속월",
                    width: 100,
                }, {
                    field: "",
                    title: "비고",
                    width: 150,
                    template: function(e){
                        if(e.RMK != null) {
                            return '<input type="text" id="rmk'+e.EMP_SEQ+'" name="rmk" class="rmk" value="' + e.RMK + '" style="width: 100%">' +
                                '<input type="hidden" id="t1seq'+e.EMP_SEQ+'" value="' + e.T1_SEQ + '">' +
                                '<input type="hidden" id="t2seq'+e.EMP_SEQ+'" value="' + e.T2_SEQ + '">';
                        }else{
                            return '<input type="text" id="rmk'+e.EMP_SEQ+'" name="rmk" class="rmk" value=""  style="width: 100%">' +
                                '<input type="hidden" id="t1seq'+e.EMP_SEQ+'"  value="' + e.T1_SEQ + '">' +
                                '<input type="hidden" id="t2seq'+e.EMP_SEQ+'"  value="' + e.T2_SEQ + '">';
                        }
                    },
                }
            ]
        }).data("kendoGrid");
    }

    /*function fn_sendReqUsers(){

        let grid = $("#mainGrid").data("kendoGrid");

        let checked = grid.tbody.find("input[name=empPk]:checked");

        if(checked.length == 0){
            alert("평가대상 인원을 선택하세요.");
            return;
        }

        let empSeqs = "";

        checked.each(function(){
            empSeqs += $(this).val() + ",";
        });



        opener.parent.fn_userMultiSelectPopCallBack(empSeqs);
        window.close();
    }*/

    function fn_sendReqUsers() {
        let grid = $("#mainGrid").data("kendoGrid");

        let checked = grid.tbody.find("input[name=empPk]:checked");

        if (checked.length == 0) {
            alert("평가대상 인원을 선택하세요.");
            return;
        }

        let empSeqsArray = [];

        checked.each(function() {
            let empSeq = $(this).val();
            let rmk = $("#rmk" + empSeq).val();
            let t1seq = $("#t1seq" + empSeq).val();
            let t2seq = $("#t2seq" + empSeq).val();
            let t1Name = $("#t1_"+empSeq).text();
            let t2Name = $("#t2_"+empSeq).text();

            empSeqsArray.push({
                empSeq : empSeq,
                rmk : rmk,
                t1seq : t1seq,
                t2seq : t2seq,
                t1Name : t1Name,
                t2Name : t2Name
            });
        });

        opener.parent.fn_userMultiSelectPopCallBack(empSeqsArray);
        window.close();
    }

    function userSearch(empSeq , eval) {
        if(eval == 1){
            var url = "/common/deptListPop.do?pk="+empSeq+"&type=eval&params=1";
            var name = "deptListPop";
            var option = "width=750, height=650, scrollbars=no, top=100, left=200, resizable=no, toolbars=no, menubar=no"
            var popup = window.open(url, name, option);
        }else if(eval == 2){
            var url = "/common/deptListPop.do?pk="+empSeq+"&type=eval&params=2";
            var name = "deptListPop";
            var option = "width=750, height=650, scrollbars=no, top=100, left=200, resizable=no, toolbars=no, menubar=no"
            var popup = window.open(url, name, option);
        }

    }

    function userSearchCallBack(empSeq , empNameKr, dutyName, pk, status) {

        if(status == 1){  // 1차 평가자
            $("#t1seq"+pk).val(empSeq);
            $("#t1_"+pk).text(empNameKr +" "+dutyName);
            dutyName
        }else if(status == 2){  // 2차 평가자
            $("#t2seq"+pk).val(empSeq);
            $("#t2_"+pk).text(empNameKr +" "+dutyName);
        }
    }
</script>
</body>
