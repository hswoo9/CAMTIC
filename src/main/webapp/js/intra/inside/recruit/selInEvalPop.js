var selInEvalPop = {
    global : {
        searchAjaxData : "",
        saveAjaxData : "",
    },

    init : function(){
        customKendo.fn_textBox(["searchName", "searchComp"])
        selInEvalPop.gridReload();
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
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="selInEvalPop.gridReload()">' +
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
                    headerTemplate: '<input type="checkbox" id="checkAll" name="checkAll"/>',
                    template : function(e){
                        var chk = "";
                        if(e.CHK > 0){
                            chk = "checked";
                        }

                        return "<input type='checkbox' id='eval_" + e.RECRUIT_COMMISSIONER_INFO_SN + "' name='evalChk' value='" + e.RECRUIT_COMMISSIONER_INFO_SN + "' " + chk + "/>"
                    },
                    width: 50
                }, {
                    field: "ROW_NUM",
                    title: "연번",
                    width: 50
                }, {
                    field: "NAME",
                    title: "성명"
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
                    }
                }, {
                    field: "BELONG",
                    title: "기관(소속)"
                }, {
                    field: "DUTY_POSITION",
                    title: "직급(직책)"
                }, {
                    field: "TEL_NUM",
                    title: "휴대폰"
                }, {
                    field: "BMK",
                    title: "비고"
                }
            ]
        }).data("kendoGrid");

        $("#checkAll").click(function(){
            if($(this).is(":checked")) $("input[name=evalChk]").prop("checked", true);
            else $("input[name=evalChk]").prop("checked", false);
        });
    },

    gridReload : function() {
        selInEvalPop.global.searchAjaxData = {
            searchName : $("#searchName").val(),
            searchComp : $("#searchComp").val(),
            recruitInfoSn : $("#recruitInfoSn").val(),
        }

        selInEvalPop.mainGrid("/inside/getCommissionerList", selInEvalPop.global.searchAjaxData);
    },

    setInEvalLogin : function(e){
        if($("input[name='evalChk']:checked").length == 0){
            alert("선발할 평가위원을 선택해주세요.");
            return;
        }

        if(confirm("선택한 평가위원을 선발하시겠습니까?")){
            var recruitCommissionerInfoSn = "";
            $.each($("input[name='evalChk']:checked"), function(i, e){
                recruitCommissionerInfoSn += "," + $(this).val()
            })

            selInEvalPop.global.saveAjaxData = {
                recruitCommissionerInfoSn : recruitCommissionerInfoSn.substring(1),
                recruitInfoSn : $("#recruitInfoSn").val(),
                empSeq : $("#empSeq").val()
            }

            var result = customKendo.fn_customAjax("/inside/setEvalSelection.do", selInEvalPop.global.saveAjaxData);
            if(result.flag){
                alert("선택한 면접평가위원이 선발되었습니다.\n중복 평가위원 [" + result.duplicationTxt + "]");
            }
        }
    }
}
