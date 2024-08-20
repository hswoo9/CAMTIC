let amt1 = 0;
let amt2 = 0;
let amt3 = 0;
let amt4 = 0;

var purcMngAppList = {

    global : {
        dropDownDataSource : "",
        searchAjaxData : "",
        saveAjaxData : "",
        clmArr : [],
    },

    fn_defaultScript : function(){
        purcMngAppList.global.dropDownDataSource = [];
        customKendo.fn_dropDownList("searchDept", purcMngAppList.global.dropDownDataSource, "text", "value");
        // $("#searchDept").data("kendoDropDownList").bind("change", purcMngAppList.gridReload);

        purcMngAppList.global.dropDownDataSource = [
            { text: "문서번호", value: "A" },
            { text: "목적", value: "B" },
            { text: "품명", value: "C" },
            { text: "업체명", value: "D" },
            { text: "구매요청자", value: "E" },
            { text: "구매청구자", value: "F" },
        ]

        customKendo.fn_dropDownList("searchKeyword", purcMngAppList.global.dropDownDataSource, "text", "value");
        customKendo.fn_textBox(["searchValue"]);

        purcMngAppList.global.dropDownDataSource = [
            { text: "발주대기", value: "1" },
            { text: "검수대기", value: "2" },
            { text: "검수완료", value: "3" },
            { text: "지출문서 작성중", value: "4" },
            { text: "지출대기", value: "5" },
            { text: "지출완료", value: "6" },
        ]

        $("#busnClass").kendoDropDownList({
            dataTextField: "text",
            dataValueField: "value",
            dataSource: [
                {text: "전체", value: ""},
                {text: "법인운영", value: "C"},
                {text: "R&D", value: "R"},
                {text: "비R&D", value: "S"},
                {text: "엔지니어링", value: "D"},
                {text: "기타/용역", value: "V"},
            ],
        });

        customKendo.fn_dropDownList("inspectStat", purcMngAppList.global.dropDownDataSource, "text", "value");
        $("#inspectStat").data("kendoDropDownList").bind("change", purcMngAppList.gridReload);
        $("#busnClass").data("kendoDropDownList").bind("change", purcMngAppList.gridReload);
        // $("#searchKeyword").data("kendoDropDownList").bind("change", purcMngAppList.gridReload);

        customKendo.fn_datePicker("expDe", "depth", "yyyy-MM-dd", new Date());
        customKendo.fn_datePicker("strDt", '', "yyyy-MM-dd", new Date(new Date().setMonth(new Date().getMonth() - 2)));
        customKendo.fn_datePicker("endDt", '', "yyyy-MM-dd", new Date(new Date().setMonth(new Date().getMonth() + 1)));

        $("#strDt").change(function (){
            if($("#strDt").val() > $("#endDt").val()){
                $("#endDt").val($("#strDt").val());
            }
        });
        $("#endDt").change(function (){
            if($("#strDt").val() > $("#endDt").val()){
                $("#strDt").val($("#endDt").val());
            }
        });

        purcMngAppList.mainGrid();
        purcMngAppList.hiddenGrid();
    },

    mainGrid : function(){
        purcMngAppList.global.searchAjaxData = {
            empSeq : $("#myEmpSeq").val(),
            searchDept : $("#searchDept").val(),
            searchKeyword : $("#searchKeyword").val(),
            searchValue : $("#searchValue").val(),
            inspectStat : $("#inspectStat").data("kendoDropDownList").value(),
            busnClass : $("#busnClass").val(),
            strDt : $("#strDt").val(),
            endDt : $("#endDt").val()
        }
        if($("#monCheck").is(":checked")){
            purcMngAppList.global.searchAjaxData.monCheck = "Y";
        }

        $("#mainGrid").kendoGrid({
            dataSource: customKendo.fn_gridDataSource2("/purc/getMngPurcAppList", purcMngAppList.global.searchAjaxData),
            sortable: true,
            selectable: "row",
            height: 525,
            pageable: {
                refresh: true,
                pageSizes : [ 10, 20, 50, "ALL" ],
                buttonCount: 5
            },
            resizable : true,
            noRecords: {
                template: "데이터가 존재하지 않습니다."
            },
            toolbar: [
                {
                    name: 'button',
                    template: function(){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="purcMngAppList.fn_claimExpDateChangeModal()">' +
                            '	<span class="k-button-text">지급예정일 변경</span>' +
                            '</button>';
                    }
                }, {
                    name: 'button',
                    template: function(){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="purcMngAppList.fn_purcBasicSettings()">' +
                            '	<span class="k-button-text">지급설정</span>' +
                            '</button>';
                    }
                }, {
                    name: 'button',
                    template: function(){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="purcMngAppList.fn_appUserPaySetting(0)">' +
                            '	<span class="k-button-text">다건지출요청</span>' +
                            '</button>';
                    }
                }, {
                    name: 'button',
                    template: function(){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="purcMngAppList.fn_excelDownload()">' +
                            '	<span class="k-icon k-i-file-excel k-button-icon"></span>' +
                            '	<span class="k-button-text">엑셀다운로드</span>' +
                            '</button>';
                    }
                }, {
                    name: 'button',
                    template: function(){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="purcMngAppList.gridReload()">' +
                            '	<span class="k-button-text">조회</span>' +
                            '</button>';
                    }
                }
            ],
            dataBound: purcMngAppList.onDataBound,
            columns: [
                {
                    headerTemplate: '<input type="checkbox" id="checkAll" name="checkAll" onclick="fn_checkAll(\'checkAll\', \'clm\');"/>',
                    width: 30,
                    template : function (e){
                        console.log(e)
                        var amt = (Number(e.TOT_AMT) - Number(e.EXNP_AMT));
                        if(amt == 0){
                            return "";
                        } else {
                            return "<input type='checkbox' id='clm"+e.CLAIM_SN+"' name='clm' class='clm' setting='"+e.SETTING+"' value='"+e.CLAIM_SN+"' crm-sn='"+e.CRM_SN+"' bsDt='"+e.EXP_DE+"'/>";
                        }
                    }
                }, {
                    title: "번호",
                    width: 50,
                    template: "#= --record #"
                }, {
                    title: "요청부서",
                    field: "DEPT_NAME",
                    width: 180,
                }, {
                    field: "PURC_TYPE",
                    title: "구매구분",
                    width: 80,
                    template: function(e){
                        var result = "";

                        if(e.PURC_TYPE == 'D'){
                            result = "엔지니어링";
                        } else if(e.PURC_TYPE == 'R'){
                            result = "R&D";
                        } else if(e.PURC_TYPE == 'S'){
                            result = "비R&D";
                        } else if(e.PURC_TYPE == 'V'){
                            result = "기타/용역";
                        } else {
                            result = "법인운영";
                        }

                        return result
                    }
                }, {
                    title: "프로젝트명",
                    field: "PJT_NM",
                    width: 200,
                    template : function (e) {
                        if(e.PJT_NM == "") {
                            return "법인운영";
                        } else {
                            return e.PJT_NM;
                        }
                    }
                }, {
                    title: "제목",
                    field: "CLAIM_TITLE",
                    width: 200,
                    template : function (e) {
                        return '<div style="font-weight: bold; text-align: left; cursor: pointer" onclick="purcMngAppList.fn_reqClaiming(' + e.CLAIM_SN + ', '+e.PURC_SN+')">' + e.CLAIM_TITLE + '</div>'
                    }
                }, {
                    field: "CRM_NM",
                    title: "업체명",
                    width: 120
                }, {
                    field: "DOC_NO",
                    title: "문서번호",
                    width: 120
                }, {
                    field: "GOODS_DT",
                    title: "납품예정일",
                    width: 80
                }, {
                    field: "ORDER_DT",
                    title: "발주일",
                    width: 80
                }, {
                    field: "EXP_DE",
                    title: "지급예정일",
                    width: 80
                }
                // , {
                //     field: "EXNP_DE",
                //     title: "지출예정일",
                //     width: 100
                // }
                , {
                    field: "PAYMENT_METHOD",
                    title: "비용지급방식",
                    width: 80,
                    template: function(e){
                        let paymentMethod = "";
                        if(e.PAYMENT_METHOD == "A"){
                            paymentMethod = "계좌이체";
                        }else if(e.PAYMENT_METHOD == "I"){
                            paymentMethod = "인터넷구매";
                        }else if(e.PAYMENT_METHOD == "C"){
                            paymentMethod = "현장결제";
                        }
                        return paymentMethod;
                    },
                    footerTemplate: "합계"
                }, {
                    field: "TOT_AMT",
                    title: "금액",
                    width: 80,
                    template: function(e){
                        amt1 += Number(e.TOT_AMT);
                        return '<div style="text-align: right">'+comma(e.TOT_AMT)+'</div>';
                    },
                    footerTemplate: function(){
                        return "<div style='text-align: right'>"+comma(amt1)+"</div>";
                    }
                }, {
                    field: "REQ_AMT",
                    title: "지출요청액",
                    width: 80,
                    template: function(e){
                        amt2 += Number(e.REQ_AMT);
                        return '<div style="text-align: right">'+comma(e.REQ_AMT)+'</div>';
                    },
                    footerTemplate: function(){
                        return "<div style='text-align: right'>"+comma(amt2)+"</div>";
                    }
                }, {
                    field: "EXNP_AMT",
                    title: "지출액",
                    width: 80,
                    template: function(e){
                        amt3 += Number(e.EXNP_AMT);
                        return '<div style="text-align: right">'+comma(e.EXNP_AMT)+'</div>';
                    },
                    footerTemplate: function(){
                        return "<div style='text-align: right'>"+comma(amt3)+"</div>";
                    }
                }, {
                    field: "NON_EXNP_AMT",
                    title: "미지급액",
                    width: 80,
                    template: function(e){
                        amt4 += Number(e.TOT_AMT) - Number(e.EXNP_AMT);
                        return '<div style="text-align: right">'+comma(Number(e.TOT_AMT) - Number(e.EXNP_AMT))+'</div>';
                    },
                    footerTemplate: function(){
                        return "<div style='text-align: right'>"+comma(amt4)+"</div>";
                    }
                }, {
                    field: "SETTING",
                    title: "지급설정",
                    width: 80,
                    template : function(e){
                        var stat = "미설정"

                        if(e.SETTING != 0 && e.SETTING_YN == "Y"){
                            stat = "설정완료";
                        }
                        return stat;
                    }
                }, {
                    field: "REQ_STAT",
                    title: "지출요청",
                    width: 90,
                    template : function(e){
                        var amt = (Number(e.TOT_AMT) - Number(e.EXNP_AMT));
                        if(amt == 0){
                            return "";
                        } else {
                            return '<button type="button" class="k-button k-button-solid-base" onClick="purcMngAppList.fn_appUserPaySetting('+e.CLAIM_SN+', '+e.SETTING+')">지출요청</button>';
                        }
                    }
                },
                // , {
                //     title: "첨부",
                //     width: 60,
                //     template : function(e) {
                //         return '<button type="button" class="k-button k-button-solid-base" onClick="purcMngAppList.fn_regPayAttPop('+e.PURC_SN+', '+e.CLAIM_SN+')">첨부</button>';
                //     }
                // }
                {
                    field: "STAT",
                    title: "상태",
                    width: 100,
                    template: function (e) {
                        var stat = "지급설정대기";

                        if(e.SETTING != 0 && e.SETTING_YN == "Y"){
                            stat = "지급설정완료";
                        }
                        if(e.REQ_AMT != 0){
                            stat = "지출요청중";
                        }
                        if(e.TOT_AMT == e.EXNP_AMT){
                            stat = "지출완료";
                        }

                        return stat;
                    }
                }
            ],
            dataBinding: function () {
                record = fn_getRowNum(this, 2);
            }
        }).data("kendoGrid");
    },

    hiddenGrid : function(){
        purcMngAppList.global.searchAjaxData = {
            empSeq : $("#myEmpSeq").val(),
            searchDept : $("#searchDept").val(),
            searchKeyword : $("#searchKeyword").val(),
            searchValue : $("#searchValue").val(),
            inspectStat : $("#inspectStat").data("kendoDropDownList").value(),
            busnClass : $("#busnClass").val(),
            strDt : $("#strDt").val(),
            endDt : $("#endDt").val(),
        }
        if($("#monCheck").is(":checked")){
            purcMngAppList.global.searchAjaxData.monCheck = "Y";
        }

        $("#hiddenGrid").kendoGrid({
            dataSource: customKendo.fn_gridDataSource2("/purc/getMngPurcAppListExcel", purcMngAppList.global.searchAjaxData, 99999),
            sortable: true,
            selectable: "row",
            height: 525,
            pageable: {
                refresh: true,
                pageSizes : [ 10, 20, 50, "ALL" ],
                buttonCount: 5
            },
            noRecords: {
                template: "데이터가 존재하지 않습니다."
            },
            columns: [
                {
                    title: "번호",
                    width: 40,
                    template: "#= --record #"
                }, {
                    title: "요청부서",
                    field: "DEPT_NAME",
                    width: 120,
                }, {
                    title: "구매구분",
                    width: 60,
                    field: "PURC_NAME"
                }, {
                    title: "제목",
                    field: "CLAIM_TITLE"
                }, {
                    field: "CRM_NM",
                    title: "업체명",
                    width: 100
                }, {
                    field: "DOC_NO",
                    title: "문서번호",
                    width: 100
                }, {
                    field: "ORDER_DT",
                    title: "발주일",
                    width: 70
                }, {
                    field: "EXP_DE",
                    title: "지급예정일",
                    width: 70
                }
                // , {
                //     field: "EXNP_DE",
                //     title: "지출예정일",
                //     width: 100
                // }
                , {
                    title: "비용지급방식",
                    width: 62,
                    field: "PAYMENT_METHOD_NM"
                }, {
                    title: "금액",
                    width: 62,
                    field : "TOT_AMT"
                }, {
                    title: "지출요청액",
                    width: 62,
                    field: "REQ_AMT"
                }, {
                    title: "지출액",
                    width: 62,
                    field: "EXNP_AMT"
                }, {
                    title: "미지급액",
                    width: 62,
                    field: "NOT_AMT"
                }, {
                    title: "지급설정",
                    width: 60,
                    field: "SETTING_NM"
                },
                // , {
                //     title: "첨부",
                //     width: 60,
                //     template : function(e) {
                //         return '<button type="button" class="k-button k-button-solid-base" onClick="purcMngAppList.fn_regPayAttPop('+e.PURC_SN+', '+e.CLAIM_SN+')">첨부</button>';
                //     }
                // }
                {
                    title: "상태",
                    width: 70,
                    field: "STATUS_NM"
                }
            ]
        }).data("kendoGrid");
    },

    onDataBound : function(){
        amt1 = 0;
        amt2 = 0;
        amt3 = 0;
        amt4 = 0;
    },

    gridReload : function(){
        $("#mainGrid").data("kendoGrid").destroy();
        $("#hiddenGrid").data("kendoGrid").destroy();

        purcMngAppList.mainGrid();
        purcMngAppList.hiddenGrid();
    },

    fn_reqRegPopup : function(key, stat){
        var url = "/purc/pop/regPurcReqPop.do";
        if(key != null && key != ""){
            url = "/purc/pop/regPurcReqPop.do?purcSn=" + key + "&stat=" + stat;
        }
        var name = "blank";
        var option = "width = 1820, height = 820, top = 100, left = 400, location = no";
        var popup = window.open(url, name, option);
    },

    fn_reqClaiming : function(key, subKey){
        var url = "/purc/pop/reqClaiming.do";

        if(key != null && key != ""){
            url = "/purc/pop/reqClaiming.do?claimSn=" + key;

            if(subKey != null && subKey != "" && subKey != "undefined"){
                url += "&purcSn=" + subKey;
            }
        }

        var name = "blank";
        var option = "width = 1690, height = 840, top = 100, left = 400, location = no";
        var popup = window.open(url, name, option);
    },

    fn_checkAll : function(){

        if($("#checkAll").is(":checked")){
            $("input[name='clm']").prop("checked", true);
        } else {
            $("input[name='clm']").prop("checked", false);
        }
    },


    fn_regPayAttPop : function (key, exnpKey){
        var url = "/purc/pop/regPurcPayAppFilePop.do?purcSn=" + key + "&claimSn=" + exnpKey;
        var name = "_blank";
        var option = "width = 850, height = 400, top = 200, left = 350, location = no";
        var popup = window.open(url, name, option);
    },


    fn_appUserPaySetting : function (clmSn, e){
        purcMngAppList.global.clmList = [];
        var flag = true;
        var flag2= true;
        var crmSn = null;

        if(clmSn == 0){
            $("input[name='clm']:checked").each(function(){
                if($(this).attr("setting") == 0){
                    flag = false;
                }
                if (crmSn === null) {
                    crmSn = $(this).attr("crm-sn");
                } else {
                    if (crmSn !== $(this).attr("crm-sn")) {
                        flag2 = false;
                    }
                }
                purcMngAppList.global.clmList.push($(this).val());
            });
        } else {
            if(e == 0){
                flag = false;
            }
            purcMngAppList.global.clmList.push(clmSn);
        }

        if(!flag){
            alert("지급설정이 완료되지 않았습니다.");
            return;
        }

        if(!flag2){
            alert("같은 업체일 경우에만 다건지출요청이 가능합니다.");
            return;
        }

        if(purcMngAppList.global.clmList.length == 0){
            alert("선택된 값이 없습니다.");
            return;
        }

        var url = "/purc/pop/appUserPaySetting.do";
        var name = "_blank";
        var option = "width = 1375, height = 640, top = 200, left = 350, location = no";
        var popup = window.open(url, name, option);

    },

    fn_purcBasicSettings : function(){
        purcMngAppList.global.clmList = [];

        $("input[name='clm']:checked").each(function(){
            purcMngAppList.global.clmList.push($(this).val());
        });

        if(purcMngAppList.global.clmList.length == 0){
            alert("선택된 값이 없습니다.");
            return;
        }

        var url = "/purc/pop/purcBasicSettings.do";
        var name = "_blank";
        var option = "width = 850, height = 400, top = 200, left = 350, location = no";
        var popup = window.open(url, name, option);
    },

    fn_callPayApp: function (purcSn, claimSn, amt, setting){

        if(setting == 0){
            alert("지급설정이 완료되지 않았습니다.");
            return;
        }


        if(!confirm("금액 : " + comma(amt) + " 원을 지출요청하시겠습니까?")){
            return;
        }

        var itemArr = new Array();
        var itemParameters = {
            purcSn : purcSn,
            claimSn : claimSn,
            reqAmt : amt
        }

        itemArr.push(itemParameters);

        var formData = new FormData();
        formData.append("itemArray", JSON.stringify(itemArr));

        $.ajax({
            url : "/purc/setPayAppPurcReq",
            data : formData,
            dataType : "json",
            type : "post",
            contentType: false,
            processData: false,
            enctype : 'multipart/form-data',
            async: false,
            success : function(rs){
                if(rs.code == 200){
                    alert("요청되었습니다.");

                    $("#mainGrid").data("kendoGrid").dataSource.read();
                }
            }
        });
    },

    fn_claimExpDateChangeModal : function(){
        purcMngAppList.global.clmList = [];

        var idx = 0;
        $("input[name='clm']:checked").each(function(){
            purcMngAppList.global.clmList.push($(this).val());

            if(idx == 0){
                $("#expDe").val($(this).attr("bsdt"));
            }

            idx++;
        });

        if(purcMngAppList.global.clmList.length == 0){
            alert("선택된 값이 없습니다.");
            return;
        }

        var dialog = $("#changeDialog").data("kendoWindow");

        dialog.center();
        dialog.open();
    },

    fn_changeExpDe : function(){
        let claimSnArr = "";
        for(let i=0; i < purcMngAppList.global.clmList.length; i++){
            claimSnArr += "," + purcMngAppList.global.clmList[i];
        }

        $.ajax({
            url : "/purc/updClaimExpDe",
            data :{
                claimSnArr : claimSnArr.substring(1),
                expDe : $("#expDe").val()
            },
            type : "post",
            dataType : "json",
            success : function(rs){
                console.log(rs);
                if(rs.code == 200){
                    alert("변경되었습니다.");
                    purcMngAppList.gridReload();
                    $("#changeDialog").data("kendoWindow").close();
                }
            }
        });
    },


    fn_excelDownload : function (){
        var grid = $("#hiddenGrid").data("kendoGrid");
        grid.bind("excelExport", function(e) {
            e.workbook.fileName = "구매지급관리 목록.xlsx";
        });
        grid.saveAsExcel();
    }

}