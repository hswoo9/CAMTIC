var selEvalPop = {
    global : {
        dropDownDataSource : "",
        searchAjaxData : "",
        saveAjaxData : "",
    },

    init : function(){
        selEvalPop.global.dropDownDataSource = [
            { text: "내부직원", value: "emp" },
            { text: "평가위원", value: "eval" },
        ]
        $("#searchType").kendoDropDownList({
            dataTextField: "text",
            dataValueField: "value",
            dataSource: selEvalPop.global.dropDownDataSource
        });

        $("#searchType").data("kendoDropDownList").bind("change", function(){
            if($("#tabA").hasClass("k-state-active")){
                selEvalPop.gridReload("mainGrid");
            }else{
                selEvalPop.gridReload("mainGrid2");
            }
        });

        selEvalPop.global.dropDownDataSource = [
            { text: "전체", value: "all" },
            { text: "아이디", value: "LOGIN_ID" },
            { text: "성명", value: "EMP_NAME_KR" },
            { text: "소속", value: "DEPT_NAME" },
        ]
        $("#searchKeyWord").kendoDropDownList({
            dataTextField: "text",
            dataValueField: "value",
            dataSource: selEvalPop.global.dropDownDataSource
        });

        customKendo.fn_textBox(["searchContent"]);

        selEvalPop.global.searchAjaxData = {
            recruitInfoSn : $("#recruitInfoSn").val()
        }
        var result = customKendo.fn_customAjax("/inside/getRecruitAreaList.do", selEvalPop.global.searchAjaxData);
        customKendo.fn_dropDownList("recruitAreaInfoSn", result.recruitArea, "JOB","RECRUIT_AREA_INFO_SN", 2);
        $("#recruitAreaInfoSn").data("kendoDropDownList").bind("change", function(){
            if($("#tabA").hasClass("k-state-active")){
                selEvalPop.gridReload("mainGrid");
            }else{
                selEvalPop.gridReload("mainGrid2");
            }
        });

        $("#recruitAreaInfoSn").data("kendoDropDownList").select(1)

        $("#mainDiv").kendoTabStrip({
            animation:  {
                open: {
                    effects: "fadeIn"
                }
            },
        });

        selEvalPop.gridReload("mainGrid");
        selEvalPop.gridReload("mainGrid2");
    },

    mainGrid : function(url, params, id) {
        $("#" + id).kendoGrid({
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
                        return  '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" style="margin-left: 5px" onclick="selEvalPop.gridReload()">' +
                                '	<span class="k-button-text">조회</span>' +
                                '</button>' +
                            '</div>';
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
                        return "<input type='checkbox' id='eval_" + e.EMP_SEQ + "' name='evalChk' value='" + e.EMP_SEQ + "' " + chk + "/>"
                    },
                    width: 50
                }, {
                    title: "번호",
                    width: 50,
                    template: "#= --record #"
                }, {
                    field: "LOGIN_ID",
                    title: "아이디"
                }, {
                    field: "EMP_NAME_KR",
                    title: "성명"
                }, {
                    field: "GENDER",
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
                    }
                }, {
                    field: "DEPT_NAME",
                    title: "기관(소속)",
                    width : 180
                }, {
                    field: "DUTY_NAME",
                    title: "직위"
                }, {
                    field: "MOBILE_TEL_NUM",
                    title: "휴대폰"
                }, {
                    field: "SIGNIFICANT",
                    title: "비고"
                }
            ],
            dataBinding: function(){
                record = fn_getRowNum(this, 2);
            }
        }).data("kendoGrid");

        $("#checkAll").click(function(){
            if($(this).is(":checked")) $("input[name=evalChk]").prop("checked", true);
            else $("input[name=evalChk]").prop("checked", false);
        });
    },

    gridReload : function(id) {
        console.log('서류/면접직원(위원) 설정 gridReload호출');

        var dutyCode = "";
        $.each($("#" + id + "ChkDiv input[name=dutyCode]:checked"), function(){
            dutyCode += "," + $(this).val()
        })

        selEvalPop.global.searchAjaxData = {
            tempDivision : $("#searchType").val() == "emp" ? "N" : "E",
            searchKeyWord : $("#searchKeyWord").val(),
            searchContent : $("#searchContent").val(),
            recruitInfoSn : $("#recruitInfoSn").val(),
            recruitAreaInfoSn : $("#recruitAreaInfoSn").val(),
            evalType : $("#tabA").hasClass("k-state-active") ? "doc" : "in",
            dutyCode : dutyCode.substr(1)
        }

        //selEvalPop.mainGrid("/inside/getCommissionerList", selEvalPop.global.searchAjaxData, id);

        // id가 주어진 경우 해당 id 값을 사용하고 함수 실행
        if (id) {
            selEvalPop.mainGrid("/inside/getCommissionerList", selEvalPop.global.searchAjaxData, id);
        } else {
            // id가 주어지지 않은 경우 기본값을 사용하고 함수 실행
            selEvalPop.mainGrid("/inside/getCommissionerList", selEvalPop.global.searchAjaxData, "mainGrid");
            selEvalPop.mainGrid("/inside/getCommissionerList", selEvalPop.global.searchAjaxData, "mainGrid2");
        }
    },

    setInEvalLogin : function(e){
        if(!$("#recruitAreaInfoSn").val()){
            alert("채용분야를 선택해주세요.");
            return;
        }else if($("input[name='evalChk']:checked").length == 0){
            alert("선발할 평가위원을 선택해주세요.");
            return;
        }

        if(confirm("선택한 평가위원을 선발하시겠습니까?")){
            var evalEmpSeq = "";
            $.each($("input[name='evalChk']:checked"), function(i, e){
                evalEmpSeq += "," + $(this).val()
            })

            selEvalPop.global.saveAjaxData = {
                evalEmpSeq : evalEmpSeq.substring(1),
                recruitInfoSn : $("#recruitInfoSn").val(),
                recruitAreaInfoSn : $("#recruitAreaInfoSn").val(),
                evalType : $("#tabA").hasClass("k-state-active") ? "doc" : "in",
                empSeq : $("#empSeq").val()
            }

            var result = customKendo.fn_customAjax("/inside/setEvalSelection.do", selEvalPop.global.saveAjaxData);
            if(result.flag){
                if(result.duplicationTxt != ""){
                    alert("선택한 면접평가위원이 선발되었습니다.\n중복 평가위원 [" + result.duplicationTxt + "]");
                }else{
                    alert("선택한 면접평가위원이 선발되었습니다.");
                }
            }
        }
    }
}
