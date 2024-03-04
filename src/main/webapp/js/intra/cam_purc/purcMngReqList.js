var purcMngReqList = {

    global : {
        dropDownDataSource : "",
        searchAjaxData : "",
        saveAjaxData : ""
    },

    fn_defaultScript : function(){
        purcMngReqList.global.dropDownDataSource = [];
        customKendo.fn_dropDownList("searchDept", purcMngReqList.global.dropDownDataSource, "text", "value");
        // $("#searchDept").data("kendoDropDownList").bind("change", purcMngReqList.gridReload);

        purcMngReqList.global.dropDownDataSource = [
            { text: "문서번호", value: "DOC_NO" },
            { text: "목적", value: "PURC_REQ_PURPOSE" },
            { text: "품명", value: "PURC_ITEM_NAME" },
        ]

        customKendo.fn_dropDownList("searchKeyword", purcMngReqList.global.dropDownDataSource, "text", "value");
        customKendo.fn_textBox(["searchValue"]);

        purcMngReqList.global.dropDownDataSource = [
            { text: "검수 미작성", value: "1" },
            { text: "검수 작성 및 미승인", value: "2" },
            { text: "검수 작성 및 승인", value: "3" }
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

        customKendo.fn_dropDownList("inspectStat", purcMngReqList.global.dropDownDataSource, "text", "value");
        $("#inspectStat").data("kendoDropDownList").bind("change", purcMngReqList.gridReload);
        $("#busnClass").data("kendoDropDownList").bind("change", purcMngReqList.gridReload);
        // $("#searchKeyword").data("kendoDropDownList").bind("change", purcMngReqList.gridReload);
        purcMngReqList.gridReload();
    },

    mainGrid : function(url, params){
        $("#mainGrid").kendoGrid({
            dataSource: customKendo.fn_gridDataSource2(url, params),
            sortable: true,
            selectable: "row",
            pageable: {
                refresh: true,
                pageSizes: [10, 20, 50, 100],
                buttonCount: 5
            },
            noRecords: {
                template: "데이터가 존재하지 않습니다."
            },
            toolbar: [
                {
                    name: 'button',
                    template: function(){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="purcMngReqList.gridReload()">' +
                            '	<span class="k-button-text">조회</span>' +
                            '</button>';
                    }
                }],
            columns: [
                {
                    title: "번호",
                    width: 50,
                    template: "#= --record #"
                }, {
                    title: "문서번호",
                    field: "DOC_NO",
                    width: 180,
                }, {
                    field: "PURC_REQ_DATE",
                    title: "요청일",
                    width: 120,
                    template : function(e){
                        return e.PURC_REQ_DATE.replaceAll(". ", "-");
                    }
                }, {
                    title: "요청자",
                    field: "EMP_NAME_KR",
                    width: 100
                }, {
                    title: "목적",
                    field: "PURC_REQ_PURPOSE",
                    template : function(e){
                        return '<div style="text-align: left"><a onclick="purcMngReqList.fn_reqRegPopup(' + e.PURC_SN + ', \'v\')"> ' + e.PURC_REQ_PURPOSE + '</a></div>'
                    }
                }, {
                    title: "구매",
                    width: 100,
                    template : function(e){
                        return e.CP_CNT + "건 / " + '<span style="color:red;">'+e.RP_CNT+'</span>' + "건"
                    }
                }, {
                    title: "외주",
                    width: 100
                }
                // , {
                //     title: "상태",
                //     width: 150,
                //     template: function (e){
                //         if(e.MC_STATUS != null && e.MC_STATUS != ""){
                //             if(e.MC_STATUS == 100){
                //                 return '<a onclick="approveDocView(\''+e.MC_DOC_ID+'\', \''+e.MC_APPRO_KEY+'\', \''+e.MC_DOC_MENU_CD+'\')" style="font-weight: bold ">구매청구완료(결재완료)</a>';
                //             }else if(e.MC_STATUS > 0){
                //                 return '<a onclick="approveDocView(\''+e.MC_DOC_ID+'\', \''+e.MC_APPRO_KEY+'\', \''+e.MC_DOC_MENU_CD+'\')" style="font-weight: bold ">구매청구완료(결재중)</a>';
                //             }else if(e.MC_STATUS == 0){
                //                 return "청구작업중";
                //             }
                //         }else{
                //             return "미작성";
                //         }
                //     }
                // }
                // , {
                //     title: "검수여부",
                //     width: 90,
                //     template: function (e){
                //         if(e.INSPECT_YN == "Y"){
                //             if(e.INSPECT_STATUS != "100"){
                //                 return "검수완료";
                //             }else{
                //                 return "검수승인완료";
                //             }
                //         }else{
                //             return "검수미작성";
                //         }
                //     }
                // }
            ],
            dataBinding: function(){
                record = fn_getRowNum(this, 2);
            }
        }).data("kendoGrid");
    },

    gridReload : function(){
        purcMngReqList.global.searchAjaxData = {
            empSeq : $("#myEmpSeq").val(),
            searchDept : $("#searchDept").val(),
            searchKeyword : $("#searchKeyword").val(),
            searchValue : $("#searchValue").val(),
            inspectStat : $("#inspectStat").data("kendoDropDownList").value(),
            busnClass : $("#busnClass").val()
        }

        purcMngReqList.mainGrid("/purc/getMngReqPurcList", purcMngReqList.global.searchAjaxData);
    },

    fn_reqRegPopup : function(key, stat){
        var url = "/purc/pop/regPurcReqPop.do";
        if(key != null && key != ""){
            url = "/purc/pop/regPurcReqPop.do?purcSn=" + key + "&stat=" + stat;
        }
        url += "&vType=M";
        var name = "blank";
        var option = "width = 1690, height = 820, top = 100, left = 400, location = no";
        var popup = window.open(url, name, option);
    },

    fn_reqClaiming : function(){
        var url = "/purc/pop/reqClaiming.do";

        var name = "_blank";
        var option = "width = 1500, height = 840, top = 100, left = 400, location = no";
        var popup = window.open(url, name, option);
    },

}