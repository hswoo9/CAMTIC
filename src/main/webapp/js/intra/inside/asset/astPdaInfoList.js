var now = new Date();

var astPdaInfoList = {

    global : {
        searchAjaxData : "",
        dropDownDataSource : "",
        saveAjaxData : "",

    },

    fnDefaultScript : function(){
        astPdaInfoList.dataSet();

        astPdaInfoList.gridReload();

    },

    gridReload : function(){
        astPdaInfoList.global.searchAjaxData = {
            startDate : $("#startDate").val(),
            endDate : $("#endDate").val(),
            originAssetPlace : $("#originAssetPlace").val(),
            newAssetPlace : $("#newAssetPlace").val(),
            workType : $("#workType").val(),
            inspectionType : $("#inspectionType").val(),
            placeModType : $("#placeModType").val(),
            astStsCode : $("#astStsCode").val(),
            astStsCodeModType : $("#astStsCodeModType").val(),
            searchType : $("#searchType").val(),
            searchContent : $("#searchContent").val(),
        }

        astPdaInfoList.mainGrid("/asset/getAstPdaInfoList.do",  astPdaInfoList.global.searchAjaxData);
    },

    mainGrid : function(url, params) {
        var record = 0;

        $("#mainGrid").kendoGrid({
            dataSource: customKendo.fn_gridDataSource3(url,params),
            scrollable: true,
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
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="astPdaInfoList.gridReload()">' +
                            '	<span class="k-button-text">조회</span>' +
                            '</button>';
                    }
                }, {
                    name : 'button',
                    template : function (e){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="">' +
                            '	<span class="k-button-text">위치이동</span>' +
                            '</button>';
                    }
                }, {
                    name: 'excel',
                    text: '엑셀다운로드'
                }
            ],
            noRecords: {
                template: "데이터가 존재하지 않습니다."
            },
            dataBound : astPdaInfoList.onDataBound,
            columns: [
                {
                    headerTemplate: '<input type="checkbox" id="checkAll" name="checkAll"/>',
                    template : "<input type='checkbox' id='apiChk#=AST_PDA_INFO_SN#' name='apiChk' value='#=AST_PDA_INFO_SN#'/>",
                    width: 50
                }, {
                    title: "순번",
                    width: 50,
                    template : function(e){
                        return $("#mainGrid").data("kendoGrid").dataSource.total() - record++
                    }
                }, {
                    field: "AST_NO",
                    title: "자산 번호",
                    width : 100
                }, {
                    field: "PURC_DATE",
                    title: "구입 일자",
                    width : 100
                }, {
                    field: "AST_NAME",
                    title: "자산명"
                }, {
                    field: "ORIGIN_AST_PLACE",
                    title: "기존위치"
                }, {
                    field: "NEW_AST_PLACE",
                    title: "신규위치"
                }, {
                    field: "INSIDE_DT_CODE_NM",
                    title: "자산상태",
                    template : function(e){
                        if(e.ORIGIN_STS_CODE != e.NEW_AST_STS_CODE && e.NEW_AST_STS_CODE != null){
                            return e.NEW_STS_NAME;
                        }else{
                            return e.ORIGIN_STS_NAME
                        }
                    }
                }, {
                    field: "ACTIVE_DATE",
                    title: "적용일",
                    width : 100
                }, {
                    field: "INSPECTION_TYPE",
                    title: "재물조사",
                    template : function(e){
                        if(e.INSPECTION_TYPE == "1"){
                            return "실시";
                        }else{
                            return "미실시";
                        }
                    },
                    width : 100
                }, {
                    field: "AST_NO",
                    title: "바코드",
                    width : 100
                }
            ]
        }).data("kendoGrid");

        $("#checkAll").click(function(){
            if($(this).is(":checked")) $("input[name=apiChk]").prop("checked", true);
            else $("input[name=apiChk]").prop("checked", false);
        });
    },

    onDataBound : function(){
        var grid = this;
        grid.tbody.find("tr").dblclick(function (e) {
            var dataItem = grid.dataItem($(this));
            astPdaInfoList.viewAssetPop(dataItem.AST_PDA_INFO_SN);
        });
    },

    viewAssetPop : function(astPdaInfoSn) {
        var url = "/inside/viewAssetPop.do?astPdaInfoSn=" + astPdaInfoSn;
        var name = "viewAssetPop";
        var option = "width = 950, height = 620, top = 100, left = 200, location = no, _blank"
        var popup = window.open(url, name, option);
    },

    dataSet : function() {
        $("#startDate").kendoDatePicker({
            depth: "month",
            start: "month",
            culture : "ko-KR",
            format : "yyyy-MM-dd",
            value : new Date(now.setMonth(now.getMonth() - 1))
        });

        $("#endDate").kendoDatePicker({
            depth: "month",
            start: "month",
            culture : "ko-KR",
            format : "yyyy-MM-dd",
            value : new Date()
        });


        astPdaInfoList.global.dropDownDataSource = customKendo.fn_customAjax("/asset/getAssetPlaceList", {});
        customKendo.fn_dropDownList("originAssetPlace", astPdaInfoList.global.dropDownDataSource.rs, "AST_PLACE_NAME","AST_PLACE_SN");
        astPdaInfoList.global.dropDownDataSource.rs.shift();
        customKendo.fn_dropDownList("newAssetPlace", astPdaInfoList.global.dropDownDataSource.rs, "AST_PLACE_NAME","AST_PLACE_SN");

        $("#workType").kendoDropDownList({
            dataTextField: "text",
            dataValueField: "value",
            dataSource: [
                { text: "전체", value: "" },
                { text: "2022 정기 재물조사", value: "1" },
                { text: "미지정", value: "2" }
            ],
            index: 0
        });

        astPdaInfoList.global.searchAjaxData     = {
            insideMdCode : "03"
        }
        astPdaInfoList.global.dropDownDataSource = customKendo.fn_customAjax("/inside/getInsideCodeList.do", astPdaInfoList.global.searchAjaxData);
        customKendo.fn_dropDownList("astStsCode", astPdaInfoList.global.dropDownDataSource.rs, "INSIDE_DT_CODE_NM","INSIDE_DT_CODE");

        $("#inspectionType").kendoDropDownList({
            dataTextField: "text",
            dataValueField: "value",
            dataSource: [
                { text: "전체", value: "" },
                { text: "실시", value: "1" },
                { text: "미실시", value: "2" }
            ],
            index: 0
        });

        $("#placeModType").kendoDropDownList({
            dataTextField: "text",
            dataValueField: "value",
            dataSource: [
                { text: "전체", value: "" },
                { text: "변경", value: "1" },
                { text: "미변경", value: "2" }
            ],
            index: 0
        });


        $("#astStsCodeModType").kendoDropDownList({
            dataTextField: "text",
            dataValueField: "value",
            dataSource: [
                { text: "전체", value: "" },
                { text: "변경", value: "1" },
                { text: "미변경", value: "2" }
            ],
            index: 0
        });

        $("#searchType").kendoDropDownList({
            dataTextField: "text",
            dataValueField: "value",
            dataSource: [
                { text: "자산명", value: "assetName" },
                { text: "자산호", value: "assetCode" },
                { text: "모델", value: "modelName" }
            ],
            index: 0
        });

        customKendo.fn_textBox(["searchContent"])
    },

    getAssetList : function(){
        if(confirm("PDA 연동목록이 초기화됩니다.\n\n진행하시겠습니까?")){
            astPdaInfoList.global.saveAjaxData = {
                empSeq : $("#empSeq").val()
            }
            var result = customKendo.fn_customAjax("/asset/getAssetListToPdaList.do", astPdaInfoList.global.saveAjaxData);
            if(result.flag){
                alert("자산리스트 가져오기 작업이 완료되었습니다.");
                astPdaInfoList.gridReload();
            }else{
                alert("자산리스트 가져오기 작업 중 오류가 발생했습니다.");
            }
        }
    },

    setAssetUploadAll : function(){
        if(confirm("재물조사 내역을 업로드 하시겠습니까?\n\n반영 항목은 위치, 자산상태, 재물조사 유무 입니다.")){
            var result = customKendo.fn_customAjax("/asset/setAssetInspectionUpload.do", {
                regEmpSeq : $("#empSeq").val(),
                regEmpName : $("#empName").val(),
                empSeq : $("#empSeq").val(),
            });

            if(result.flag){
                alert("재물조사 업데이트가 완료되었습니다.");
            }
        }
    }
}
