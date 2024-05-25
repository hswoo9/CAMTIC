var now = new Date();

var commissionerManage = {

    global : {
        searchAjaxData : "",
        saveAjaxData : ""
    },

    init : function(){
        customKendo.fn_textBox(["loginId", "empNameKr", "deptName"]);
        commissionerManage.gridReload();
    },

    mainGrid : function(url, params) {
        $("#mainGrid").kendoGrid({
            dataSource: customKendo.fn_gridDataSource2(url, params),
            sortable: true,
            scrollable: true,
            selectable: "row",
            height: 508,
            pageable : {
                refresh : true,
                pageSizes : [ 10, 20, 50, "ALL" ],
                buttonCount : 5
            },
            toolbar : [{
                name : 'button',
                template : function (e){
                    return '<button type="button" style="margin-right: auto;" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="commissionerManage.evalManagePop();">' +
                        '	<span class="k-button-text">면접평가표 관리</span>' +
                        '</button>';
                }
                },{
                    name : 'button',
                    template : function (e){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="commissionerManage.gridReload();">' +
                            '	<span class="k-button-text">조회</span>' +
                            '</button>';
                    }
                }, {
                    name : 'button',
                    template : function (e){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-error" onclick="commissionerManage.setCommissionerEmpInfoDel()">' +
                            '	<span class="k-button-text">삭제</span>' +
                            '</button>';
                    }
                }, {
                    name : 'button',
                    template : function (e){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-info" onclick="commissionerManage.commissionerReqPop();">' +
                            '	<span class="k-button-text">등록</span>' +
                            '</button>';
                    }
                }, {
                    name : 'button',
                    template : function (e){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="commissionerManage.setCommissionerPassWdUpd()">' +
                            '	<span class="k-button-text">비밀번호 초기화</span>' +
                            '</button>';
                    }
                }, {
                    name : 'button',
                    template : function (e){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="commissionerManage.evalSetExcelFormDown()">' +
                            '	<span class="k-button-text">등록양식 다운로드</span>' +
                            '</button>';
                    }
                }, {
                    name : 'button',
                    template : function (e){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="commissionerManage.evalExcelUploadPop()">' +
                            '	<span class="k-button-text">등록양식 업로드</span>' +
                            '</button>';
                    }
                }, {
                    name: 'excel',
                    text: '전체위원 다운로드'
                }
            ],
            noRecords: {
                template: "데이터가 존재하지 않습니다."
            },
            columns: [
                {
                    headerTemplate: '<input type="checkbox" id="checkAll" name="checkAll"/>',
                    template : "<input type='checkbox' id='comChk#=EMP_SEQ#' name='comChk' value='#=EMP_SEQ#'/>",
                    width: 50
                }, {
                    title: "순번",
                    template: "#= --record #",
                    width: 80
                }, {
                    field: "LOGIN_ID",
                    title: "아이디",
                    width: 150
                }, {
                    field: "EMP_NAME_KR",
                    title: "성명",
                    width: 150,
                    template : function(e){
                        return '<a style="cursor: pointer;" onclick="commissionerManage.commissionerInfoPop(' + e.EMP_SEQ + ')">' + e.EMP_NAME_KR + '</a>'
                    }
                }, {
                    field: "GENDER_CODE",
                    title: "성별",
                    template: function(e){
                        if(e.GENDER_CODE != null){
                            if(e.GENDER_CODE == "M"){
                                return "남";
                            }else if(e.GENDER_CODE == "F"){
                                return "여";
                            }
                        }else{
                            return "-";
                        }
                    },
                    width : 120
                }, {
                    field: "DEPT_NAME",
                    title: "기관(소속)",
                    width : 300
                }, {
                    field: "POSITION_NAME",
                    title: "직급(직책)",
                    width : 150
                }, {
                    field: "MOBILE_TEL_NUM",
                    title: "휴대폰",
                    width : 150
                }, {
                    field: "SIGNIFICANT",
                    title: "비고"
                }, {
                    title: "평가이력",
                    template : function (e){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="commissionerManage.evalHistoryPop(' + e.EMP_SEQ + ')">' +
                            '	<span class="k-button-text">평가이력</span>' +
                            '</button>';
                    }
                }
            ],
            dataBinding: function(){
                record = fn_getRowNum(this, 2);
            }
        }).data("kendoGrid");

        $("#checkAll").click(function(){
            if($(this).is(":checked")) {
                $("input[name=comChk]").not(".noCheck").prop("checked", true);
            }else{
                $("input[name=comChk]").not(".noCheck").prop("checked", false);
            }
        });
    },

    gridReload : function(){
        commissionerManage.global.searchAjaxData = {
            loginId : $("#loginId").val(),
            empNameKr : $("#empNameKr").val(),
            deptName : $("#deptName").val(),
            tempDivision : "E"
        }

        commissionerManage.mainGrid("/inside/getCommissionerList", commissionerManage.global.searchAjaxData);
    },

    commissionerReqPop : function() {
        var url = "/Inside/pop/commissionerReqPop.do";
        var name = "recruitReqPop";
        var option = "width=900, height=400, scrollbars=no, top=100, left=200, resizable=no, toolbars=no, menubar=no"
        var popup = window.open(url, name, option);
    },

    setCommissionerPassWdUpd : function(){
        if($("input[name='comChk']:checked").length == 0){
            alert("초기화할 평가위원을 선택해주세요.");
            return
        }

        if(confirm("초기화 진행하시겠습니까?")){
            var evalEmpSeq = "";

            $.each($("input[name='comChk']:checked"), function(){
                evalEmpSeq += "," + $(this).val()
            })

            commissionerManage.global.saveAjaxData = {
                evalEmpSeq : evalEmpSeq.substring(1),
                loginPassWd : "kbTRQoI/fSDF8I32kSLeQ/NfBXqYjZYZ9tMThIXJogM=",
                empSeq : $("#empSeq").val()
            }

            var result = customKendo.fn_customAjax("/inside/setCommissionerPassWdUpd.do", commissionerManage.global.saveAjaxData)
            if(result.flag){
                alert("처리되었습니다.");
                commissionerManage.gridReload();
            }
        }
    },

    commissionerInfoPop : function(e) {
        var url = "/inside/pop/commissionerInfoPop.do?empSeq=" + e;
        var name = "recruitReqPop";
        var option = "width=900, height=400, scrollbars=no, top=100, left=200, resizable=no, toolbars=no, menubar=no"
        var popup = window.open(url, name, option);
    },

    setCommissionerEmpInfoDel : function(){
        if($("input[name='comChk']:checked").length == 0){
            alert("삭제할 평가위원을 선택해주세요.");
            return
        }

        if(confirm("선택한 평가위원을 삭제하시겠습니까?")){
            var evalEmpSeq = "";

            $.each($("input[name='comChk']:checked"), function(){
                evalEmpSeq += "," + $(this).val()
            })

            commissionerManage.global.saveAjaxData = {
                evalEmpSeq : evalEmpSeq.substring(1),
                empSeq : $("#empSeq").val()
            }

            var result = customKendo.fn_customAjax("/inside/setCommissionerEmpInfoDel", commissionerManage.global.saveAjaxData);
            if(result.flag){
                alert("처리되었습니다.");
                commissionerManage.gridReload();
            }
        }
    },

    evalSetExcelFormDown : function(){
        kendo.saveAs({
            dataURI: "/inside/evalSetExcelFormDown.do"
        });
    },

    evalExcelUploadPop : function(){
        var url = "/inside/pop/evalExcelUploadPop.do";
        var name = "evalExcelUploadPop";
        var option = "width = 500, height = 180, top = 100, left = 400, location = no"
        var popup = window.open(url, name, option);
    },

    evalHistoryPop : function(e){
        var url = "/inside/pop/evalHistoryPop.do?empSeq=" + e;
        var name = "evalHistoryPop";
        var option = "width=900, height=470, scrollbars=no, top=100, left=200, resizable=no, toolbars=no, menubar=no"
        var popup = window.open(url, name, option);
    },

    evalManagePop : function(e){
        var url = "/inside/inEvalManage.do";
        var name = "inEvalManage";
        var option = "width=1000, height=700, scrollbars=no, top=100, left=200, resizable=no, toolbars=no, menubar=no";
        var popup = window.open(url,name,option);
    }
}
