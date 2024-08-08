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
        $("#mainGrid").kendoGrid({
            dataSource: customKendo.fn_gridDataSource3(url,params),
            scrollable: true,
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
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="astPdaInfoList.gridReload()">' +
                            '	<span class="k-button-text">조회</span>' +
                            '</button>';
                    }
                }, {
                    name : 'button',
                    template : function (e){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="astPdaInfoList.setPlaceChkAll()">' +
                            '	<span class="k-button-text">위치이동</span>' +
                            '</button>';
                    }
                }, {
                    name : 'button',
                    template : function (e){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="astPdaInfoList.updInspectionType(\'1\')">' +
                            '	<span class="k-button-text">재물조사실시</span>' +
                            '</button>';
                    }
                }, {
                    name : 'button',
                    template : function (e){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="astPdaInfoList.updInspectionType(\'2\')">' +
                            '	<span class="k-button-text">재물조사미실시</span>' +
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
                    template: "#= --record #",
                    title: "순번",
                    width: 50,
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
            ],
            dataBinding: function(){
                record = fn_getRowNum(this, 2);
            }
        }).data("kendoGrid");

        $("#checkAll").click(function(){
            if($(this).is(":checked")) $("input[name=apiChk]").prop("checked", true);
            else $("input[name=apiChk]").prop("checked", false);
        });
    },

    setPlaceChkAll : function(){
        if($("input[name='apiChk']:checked").length == 0){
            alert("변경할 자산을 선택해주세요.");
            return
        }

        var astPdaInfoSn = "";
        $.each($("input[name='apiChk']:checked"), function(e, i){
            astPdaInfoSn += ',' + $(this).val()
        })

        var url = "/inside/placeChangePop.do?astPdaInfoSn=" + astPdaInfoSn.substring(1);
        var name = "placeChangePop";
        var option = "width = 650, height = 335, top = 100, left = 200, location = no, _blank"
        var popup = window.open(url, name, option);
    },

    updInspectionType : function(inspectionType){
        if($("input[name='apiChk']:checked").length == 0){
            alert("변경할 자산을 선택해주세요.");
            return
        }

        let txt = "";
        if(inspectionType == "1") {
            txt = "재물조사 실시로 일괄변경 하시겠습니까?";
        } else if(inspectionType == "2") {
            txt = "재물조사 미실시로 일괄변경 하시겠습니까?";
        }

        if(confirm(txt)) {
            var astPdaInfoSn = "";
            $.each($("input[name='apiChk']:checked"), function (e, i) {
                astPdaInfoSn += ',' + $(this).val()
            })

            $.ajax({
                url: "/asset/updInspectionType",
                data: {
                    astPdaInfoSn: astPdaInfoSn.substring(1),
                    inspectionType : inspectionType
                },
                type: "post",
                dataType: "json",
                async: false,
                success: function(){
                    alert("변경되었습니다.");
                    astPdaInfoList.gridReload();
                },
                error: function() {
                    alert("에러가 발생했습니다.");
                }
            })

        }
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
    },

    setAppApkDownLoad : function(){
        kendo.saveAs({
            dataURI: "/asset/setAppApkDownLoad.do"
        });
    },

    setBarcodePrintA: function(){


        if(!confirm("선택된 항목을 바코드(대) 출력 하시겠습니까?")){
            return;
        }
        var data = {
            target : "pda",
            astPdaSnArr : ""
        }

        $("input[name='apiChk']:checked").each(function(e, i){
            data.astPdaSnArr += ',' + $(this).val()
        });

        data.astPdaSnArr = data.astPdaSnArr.substring(1);

        if(data.astPdaSnArr == null){
            alert("자산을 선택해주세요.");
            return;
        }

        $.ajax({
            url : "/asset/setBarcodePrintA",
            data: data,
            type : "post",
            dataType : "json",
            success : function(rs){
                console.log(rs);

                if(rs.code == 200){
                    alert("인쇄성공")
                }
            }
        });
    },

    setBarcodePrintB : function (){

        if(!confirm("선택된 항목을 바코드(소) 출력 하시겠습니까?")){
            return;
        }


        var data = {
            target : "pda",
            astPdaSnArr : ""
        }

        $("input[name='apiChk']:checked").each(function(e, i){
            data.astPdaSnArr += ',' + $(this).val()
        });

        data.astPdaSnArr = data.astPdaSnArr.substring(1);

        if(data.astPdaSnArr == null){
            alert("자산을 선택해주세요.");
            return;
        }

        $.ajax({
            url : "/asset/setBarcodePrintB",
            data: data,
            type : "post",
            dataType : "json",
            success : function(rs){
                console.log(rs);

                if(rs.code == 200){
                    alert("인쇄성공")
                }
            }
        });
    }
}
