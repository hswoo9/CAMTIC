var now = new Date();

var commissionerManage = {

    global : {
        searchAjaxData : "",
        saveAjaxData : ""
    },

    init : function(){
        customKendo.fn_textBox(["searchId", "searchName", "searchComp"]);
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
                pageSizes: [10, 20, "ALL"],
                buttonCount : 5
            },
            toolbar : [
                {
                    name : 'button',
                    template : function (e){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="commissionerManage.gridReload();">' +
                            '	<span class="k-button-text">조회</span>' +
                            '</button>';
                    }
                }, {
                    name : 'button',
                    template : function (e){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-error" onclick="commissionerManage.setCommissionerDel()">' +
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
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="">' +
                            '	<span class="k-button-text">등록양식 다운로드</span>' +
                            '</button>';
                    }
                }, {
                    name : 'button',
                    template : function (e){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="">' +
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
                    template : "<input type='checkbox' id='comChk#=RECRUIT_COMMISSIONER_INFO_SN#' name='comChk' value='#=RECRUIT_COMMISSIONER_INFO_SN#'/>",
                    width: 50
                }, {
                    title: "순번",
                    template: "#= --record #",
                    width: 80
                }, {
                    field: "ID",
                    title: "아이디",
                    width: 150
                }, {
                    field: "NAME",
                    title: "성명",
                    width: 150
                }, {
                    field: "GENDER",
                    title: "성별",
                    template: function(e){
                        if(e.GENDER != null){
                            if(e.GENDER == "M"){
                                return "남";
                            }else if(e.GENDER == "F"){
                                return "여";
                            }
                        }else{
                            return "-";
                        }
                    },
                    width : 120
                }, {
                    field: "BELONG",
                    title: "기관(소속)",
                    width : 300
                }, {
                    field: "DUTY_POSITION",
                    title: "직급(직책)",
                    width : 150
                }, {
                    field: "TEL_NUM",
                    title: "휴대폰",
                    width : 150
                }, {
                    field: "BMK",
                    title: "비고"
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
            searchId : $("#searchId").val(),
            searchName : $("#searchName").val(),
            searchComp : $("#searchComp").val(),
        }

        commissionerManage.mainGrid("/inside/getCommissionerList", commissionerManage.global.searchAjaxData);
    },

    commissionerReqPop : function() {
        var url = "/Inside/pop/commissionerReqPop.do";
        var name = "recruitReqPop";
        var option = "width=900, height=400, scrollbars=no, top=100, left=200, resizable=no, toolbars=no, menubar=no"
        var popup = window.open(url, name, option);
    },

    setCommissionerDel : function(){
        if($("input[name='comChk']:checked").length == 0){
            alert("삭제할 평가위원을 선택해주세요.");
            return
        }

        if(confirm("선택한 평가위원을 삭제하시겠습니까?")){
            var recruitCommissionerInfoSn = "";

            $.each($("input[name='comChk']:checked"), function(){
                recruitCommissionerInfoSn += "," + $(this).val()
            })

            commissionerManage.global.saveAjaxData = {
                recruitCommissionerInfoSn : recruitCommissionerInfoSn.substring(1),
                empSeq : $("#empSeq").val()
            }

            var result = customKendo.fn_customAjax("/inside/setCommissionerDel", commissionerManage.global.saveAjaxData);
            if(result.flag){
                alert("처리되었습니다.");
                commissionerManage.gridReload();
            }
        }
    }
}
