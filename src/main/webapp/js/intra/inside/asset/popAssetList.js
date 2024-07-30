var now = new Date();
var record = 0;

var popAssetList = {
    global : {
        searchAjaxData : "",
        dropDownDataSource : "",
    },

    fn_deafultScript : function(){
        popAssetList.kendoSetting();
        popAssetList.gridReload();
    },

    gridReload : function(){
        popAssetList.global.searchAjaxData = {
            startDate : $("#startDate").val(),
            endDate : $("#endDate").val(),
            assetPosition : $("#assetPosition").val(),
            assetType : $("#assetType").val(),
            categoryA : $("#categoryA").val(),
            categoryB : $("#categoryB").val(),
            categoryC : $("#categoryC").val(),
            assetStatus : $("#assetStatus").val(),
            assetPlace : $("#assetPlace").val(),
            regStatus : $("#regStatus").val(),
            barcodeType : $("#barcodeType").val(),
            searchType : $("#searchType").val(),
            searchContent : $("#searchContent").val(),
        }

        popAssetList.mainGrid("/inside/getAssetList.do", popAssetList.global.searchAjaxData);
    },

    mainGrid : function(url, params) {
        $("#mainGrid").kendoGrid({
            dataSource: customKendo.fn_gridDataSource2(url,params),
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
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="popAssetList.gridReload()">' +
                            '	<span class="k-button-text">조회</span>' +
                            '</button>';
                    }
                }
            ],
            dataBound : popAssetList.onDataBound,
            noRecords: {
                template: "데이터가 존재하지 않습니다."
            },
            columns: [
                {
                    title: "순번",
                    width: 50,
                    template: "#= --record #",
                }, {
                    field: "AST_NO",
                    title: "자산 번호",
                    width : 100
                }, {
                    field: "PURC_DATE",
                    title: "구입일자",
                    width : 100
                }, {
                    field: "AST_NAME",
                    title: "자산명"
                }, {
                    field: "MODEL_NAME",
                    title: "모델명"
                }, {
                    field: "MODEL_SIZE",
                    title: "규격"
                },{
                    field: "AST_PLACE_NAME",
                    title: "설치 장소"
                }, {
                    field: "EMP_NAME",
                    title: "사용자",
                    width : 80
                }, {
                    field: "PURC_PRICE",
                    title: "구입가격(원)",
                    attributes: { style: "text-align: right" },
                    template : function(e){
                        return e.PURC_PRICE.toString().toMoney() + "원";
                    }
                }, {
                    field: "INSIDE_DT_CODE_NM",
                    title: "상태"
                }, {
                    title: "",
                    width: "5%",
                    template: function(e){
                        return '<button type="button" class="k-button k-button-solid-base" onclick="popAssetList.fn_selectAsset('+e.AST_INFO_SN+', \''+e.AST_NO+'\', \''+e.AST_NAME+'\', \''+e.MODEL_NAME+'\', \''+e.PURC_DATE+'\', \''+e.PURC_PRICE+'\', \''+e.PURC_COMPANY_NAME+'\');" style=\'color: rgb(0, 51, 255);\'>선택</button>';
                    }
                }
            ],
            dataBinding: function(){
                record = fn_getRowNum(this, 2);
            }
        }).data("kendoGrid");
    },

    kendoSetting : function() {
        $("#startDate").kendoDatePicker({
            depth: "month",
            start: "month",
            culture : "ko-KR",
            format : "yyyy-MM-dd",
            value : new Date("1990-01-01")
        });
        $("#endDate").kendoDatePicker({
            depth: "month",
            start: "month",
            culture : "ko-KR",
            format : "yyyy-MM-dd",
            value : new Date()
        });

        popAssetList.global.dropDownDataSource = customKendo.fn_customAjax("/inside/getClassPositionList", {});
        popAssetList.global.dropDownDataSource.rs.unshift({
            AST_CP_CODE_NM : "전체",
            AST_CP_CODE : "",
        })
        $("#assetPosition").kendoDropDownList({
            dataTextField: "AST_CP_CODE_NM",
            dataValueField: "AST_CP_CODE",
            dataSource: popAssetList.global.dropDownDataSource.rs,
            index: 0
        });

        popAssetList.global.dropDownDataSource = customKendo.fn_customAjax("/inside/getClassDivisionList", {});
        popAssetList.global.dropDownDataSource.rs.unshift({
            AST_TYPE_CODE_NM : "전체",
            AST_TYPE_CODE : "",
        })
        $("#assetType").kendoDropDownList({
            dataTextField: "AST_TYPE_CODE_NM",
            dataValueField: "AST_TYPE_CODE",
            dataSource: popAssetList.global.dropDownDataSource.rs
        });

        /** 카테고리 드롭다운 */
        popAssetList.global.searchAjaxData = {
            astUpperCode : 0
        }
        popAssetList.global.dropDownDataSource = customKendo.fn_customAjax("/asset/getAstCategoryList", popAssetList.global.searchAjaxData);
        popAssetList.global.dropDownDataSource.rs.unshift({
            AST_CODE_NM : "카테고리(대)",
            AST_CODE : "",
        })
        $("#categoryA").kendoDropDownList({
            dataTextField: "AST_CODE_NM",
            dataValueField: "AST_CODE",
            dataSource: popAssetList.global.dropDownDataSource.rs,
            change : function(e){
                popAssetList.categoryAddRow('categoryA', this.dataItem().AST_CODE_ID)
            }
        });

        popAssetList.global.dropDownDataSource = [{
            AST_CODE_NM : "카테고리(중)",
            AST_CODE : "",
        }]
        $("#categoryB").kendoDropDownList({
            dataTextField: "AST_CODE_NM",
            dataValueField: "AST_CODE",
            dataSource: popAssetList.global.dropDownDataSource
        });

        popAssetList.global.dropDownDataSource = [{
            AST_CODE_NM : "카테고리(소)",
            AST_CODE : "",
        }]
        $("#categoryC").kendoDropDownList({
            dataTextField: "AST_CODE_NM",
            dataValueField: "AST_CODE",
            dataSource: popAssetList.global.dropDownDataSource
        });
        /** 카테고리 드롭다운 종료 */

        popAssetList.global.searchAjaxData = {
            insideMdCode : "03"
        }
        popAssetList.global.dropDownDataSource = customKendo.fn_customAjax("/inside/getInsideCodeList.do", popAssetList.global.searchAjaxData);
        popAssetList.global.dropDownDataSource.rs.unshift({
            INSIDE_DT_CODE_NM : "자산상태",
            INSIDE_DT_CODE : "",
        })
        $("#assetStatus").kendoDropDownList({
            dataTextField: "INSIDE_DT_CODE_NM",
            dataValueField: "INSIDE_DT_CODE",
            dataSource: popAssetList.global.dropDownDataSource.rs,
        });

        popAssetList.global.dropDownDataSource = customKendo.fn_customAjax("/asset/getAssetPlaceList", {});
        popAssetList.global.dropDownDataSource.rs.unshift({
            AST_PLACE_NAME : "설치장소",
            AST_PLACE_SN : "",
        })
        $("#assetPlace").kendoDropDownList({
            dataTextField: "AST_PLACE_NAME",
            dataValueField: "AST_PLACE_SN",
            dataSource: popAssetList.global.dropDownDataSource.rs,
            index: 0
        });

        $("#regStatus").kendoDropDownList({
            dataTextField: "text",
            dataValueField: "value",
            dataSource: [
                { text: "등록상태", value: "" },
                { text: "승인", value: "1" },
                { text: "미승인", value: "2" }
            ],
            index: 0
        });

        $("#barcodeType").kendoDropDownList({
            dataTextField: "text",
            dataValueField: "value",
            dataSource: [
                { text: "바코드", value: "" },
                { text: "대", value: "1" },
                { text: "소", value: "2" }
            ],
            index: 0
        });

        $("#searchType").kendoDropDownList({
            dataTextField: "text",
            dataValueField: "value",
            dataSource: [
                { text: "자산명", value: "assetName" },
                { text: "자산번호", value: "assetCode" },
                { text: "규격", value: "modelSize" },
                { text: "모델", value: "modelName" },
                { text: "사용자", value: "empName" }
            ],
            index: 0
        });

        customKendo.fn_textBox(["searchContent"])
    },

    fn_selectAsset: function(key, astNo, astNm, modelNm, date, price, compName) {
        opener.parent.selectAsset(key, astNo, astNm, modelNm, date, price, compName);

        window.close();
    },

    categoryAddRow : function(id, astUpperCode){
        var changeId = "";
        var defaultName = ""
        if(id == "categoryA"){
            changeId = "categoryB";
            defaultName = "카테고리(중)";
        }else if(id == "categoryB"){
            changeId = "categoryC";
            defaultName = "카테고리(소)";
        }

        if($("#" + id).val() != ""){
            var result = customKendo.fn_customAjax("/asset/getAstCategoryList", {astUpperCode : astUpperCode});
            if(result.flag){
                $("#categoryC").data("kendoDropDownList").dataSource.data([{
                    AST_CODE_NM : "카테고리(소)",
                    AST_CODE    : "",
                }]);

                if(id == "categoryA"){
                    $("#categoryB").data("kendoDropDownList").dataSource.data([{
                        AST_CODE_NM : "카테고리(중)",
                        AST_CODE    : "",
                    }]);
                }

                popAssetList.global.dropDownDataSource = result.rs;
                popAssetList.global.dropDownDataSource.unshift({
                    AST_CODE_NM : defaultName,
                    AST_CODE    : "",
                })

                $("#" + changeId).data("kendoDropDownList").dataSource.data(popAssetList.global.dropDownDataSource)
                $("#" + changeId).data("kendoDropDownList").select(0);
                if(id == "categoryA"){
                    $("#" + changeId).data("kendoDropDownList").bind("change", function(){popAssetList.categoryAddRow("categoryB", this.dataItem().AST_CODE_ID)});
                }
            }
        }
    },
}
