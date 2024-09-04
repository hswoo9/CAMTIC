var now = new Date();
var record = 0;

var assetList = {

    global : {
        searchAjaxData : "",
        dropDownDataSource : "",
    },

    fnDefaultScript : function(){
        assetList.kendoSetting();
        assetList.mainGrid();
    },

    gridReload : function(){
        $("#mainGrid").data("kendoGrid").dataSource.read();
    },

    mainGrid : function() {
        var dataSource = new kendo.data.DataSource({
            serverPaging: false,
            pageSize: 10,
            transport: {
                read : {
                    url : "/inside/getAssetList.do",
                    dataType : "json",
                    type : "post"
                },
                parameterMap: function(data) {
                    data.startDate = $("#startDate").val();
                    data.endDate = $("#endDate").val();
                    data.assetPosition = $("#assetPosition").val();
                    data.assetType = $("#assetType").val();
                    data.categoryA = $("#categoryA").val();
                    data.categoryB = $("#categoryB").val();
                    data.categoryC = $("#categoryC").val();
                    data.assetStatus = $("#assetStatus").val();
                    data.assetPlace = $("#assetPlace").val();
                    data.regStatus = $("#regStatus").val();
                    data.barcodeType = $("#barcodeType").val();
                    data.searchType = $("#searchType").val();
                    data.searchContent = $("#searchContent").val();

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
        });

        $("#mainGrid").kendoGrid({
            dataSource: dataSource,
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
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="assetList.gridReload()">' +
                            '	<span class="k-button-text">조회</span>' +
                            '</button>';
                    }
                }, {
                    name : 'button',
                    template : function (e){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="assetList.assetManagePop();">' +
                            '	<span class="k-button-text">물품관리관 관리</span>' +
                            '</button>';
                    }
                }, {
                    name : 'button',
                    template : function (e){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="assetList.bulkChangePopup();">' +
                            '	<span class="k-button-text">일괄 변경</span>' +
                            '</button>';
                    }
                }, {
                    name : 'button',
                    template : function (e){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="assetList.addAssetPopup();">' +
                            '	<span class="k-button-text">자산 추가</span>' +
                            '</button>';
                    }
                }, {
                    name : 'button',
                    template : function (e){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="assetList.setAssetDel();">' +
                            '	<span class="k-button-text">삭제</span>' +
                            '</button>';
                    }
                }, {
                    name: 'excel',
                    text: '엑셀다운로드'
                }
            ],
            dataBound : assetList.onDataBound,
            noRecords: {
                template: "데이터가 존재하지 않습니다."
            },
            columns: [
                {
                    headerTemplate: '<input type="checkbox" id="checkAll" name="checkAll"/>',
                    template : "<input type='checkbox' id='aiChk#=AST_INFO_SN#' name='aiChk' value='#=AST_INFO_SN#'/>",
                    width: 50
                }, {
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
                    title: "자산명",
                    template: function(e) {
                        return "<a href='#' onclick='assetList.viewAssetPop(" + e.AST_INFO_SN + ")' style='color: rgb(0, 51, 255);'>" + e.AST_NAME + "</a>";
                    }
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
                }
            ],
            dataBinding: function(){
                record = fn_getRowNum(this, 2);
            }
        }).data("kendoGrid");

        $("#checkAll").click(function(){
            if($(this).is(":checked")) $("input[name=aiChk]").prop("checked", true);
            else $("input[name=aiChk]").prop("checked", false);
        });
    },

    assetManagePop : function() {
        var url = "/inside/assetManagePop.do";
        var name = "goodsManagePop";
        var option = "width = 500, height = 240, top = 100, left = 200, location = no, _blank"
        var popup = window.open(url, name, option);
    },

    bulkChangePopup : function() {
        if($("input[name='aiChk']:checked").length == 0){
            alert("변경할 자산을 선택해주세요.");
            return
        }

        var id = "";
        $.each($("input[name='aiChk']:checked"), function(e, i){
            id += ',' + $(this).val()
        })

        var url = "/inside/bulkChangePop.do?astInfoSn=" + id.substring(1);
        var name = "bulkChangePop";
        var option = "width = 650, height = 380, top = 100, left = 200, location = no, _blank"
        var popup = window.open(url, name, option);
    },

    addAssetPopup : function() {
        var url = "/inside/addAssetPop.do";
        var name = "addAssetPop";
        var option = "width = 1125, height = 700, top = 100, left = 200, location = no, _blank"
        var popup = window.open(url, name, option);
    },

    setAssetDel : function(){
        if(confirm("선택한 자산을 삭제하시겠습니까?")){
            var astInfoSn = "";
            $.each($("input[name='aiChk']:checked"), function(){
                astInfoSn += "," + this.value;
            })

            var result = customKendo.fn_customAjax("/inside/setAssetDel.do", {astInfoSn : astInfoSn.substr(1), empSeq : $("#regEmpSeq").val()});
            if(result.flag){
                alert("삭제되었습니다.");
                assetList.gridReload();
            }
        }
    },



    viewAssetPop : function(astInfoSn) {
        var url = "/inside/viewAssetPop.do?astInfoSn=" + astInfoSn;
        var name = "viewAssetPop";
        var option = "width = 950, height = 620, top = 100, left = 200, location = no, _blank"
        var popup = window.open(url, name, option);
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

        assetList.global.dropDownDataSource = customKendo.fn_customAjax("/inside/getClassPositionList", {});
        assetList.global.dropDownDataSource.rs.unshift({
            AST_CP_CODE_NM : "전체",
            AST_CP_CODE : "",
        })
        $("#assetPosition").kendoDropDownList({
            dataTextField: "AST_CP_CODE_NM",
            dataValueField: "AST_CP_CODE",
            dataSource: assetList.global.dropDownDataSource.rs,
            index: 0
        });

        assetList.global.dropDownDataSource = customKendo.fn_customAjax("/inside/getClassDivisionList", {});
        assetList.global.dropDownDataSource.rs.unshift({
            AST_TYPE_CODE_NM : "전체",
            AST_TYPE_CODE : "",
        })
        $("#assetType").kendoDropDownList({
            dataTextField: "AST_TYPE_CODE_NM",
            dataValueField: "AST_TYPE_CODE",
            dataSource: assetList.global.dropDownDataSource.rs
        });

        /** 카테고리 드롭다운 */
        assetList.global.searchAjaxData = {
            astUpperCode : 0
        }
        assetList.global.dropDownDataSource = customKendo.fn_customAjax("/asset/getAstCategoryList", assetList.global.searchAjaxData);
        assetList.global.dropDownDataSource.rs.unshift({
            AST_CODE_NM : "카테고리(대)",
            AST_CODE : "",
        })
        $("#categoryA").kendoDropDownList({
            dataTextField: "AST_CODE_NM",
            dataValueField: "AST_CODE",
            dataSource: assetList.global.dropDownDataSource.rs,
            change : function(e){
                assetList.categoryAddRow('categoryA', this.dataItem().AST_CODE_ID)
            }
        });

        assetList.global.dropDownDataSource = [{
            AST_CODE_NM : "카테고리(중)",
            AST_CODE : "",
        }]
        $("#categoryB").kendoDropDownList({
            dataTextField: "AST_CODE_NM",
            dataValueField: "AST_CODE",
            dataSource: assetList.global.dropDownDataSource
        });

        assetList.global.dropDownDataSource = [{
            AST_CODE_NM : "카테고리(소)",
            AST_CODE : "",
        }]
        $("#categoryC").kendoDropDownList({
            dataTextField: "AST_CODE_NM",
            dataValueField: "AST_CODE",
            dataSource: assetList.global.dropDownDataSource
        });
        /** 카테고리 드롭다운 종료 */

        assetList.global.searchAjaxData = {
            insideMdCode : "03"
        }
        assetList.global.dropDownDataSource = customKendo.fn_customAjax("/inside/getInsideCodeList.do", assetList.global.searchAjaxData);
        assetList.global.dropDownDataSource.rs.unshift({
            INSIDE_DT_CODE_NM : "자산상태",
            INSIDE_DT_CODE : "",
        })
        $("#assetStatus").kendoDropDownList({
            dataTextField: "INSIDE_DT_CODE_NM",
            dataValueField: "INSIDE_DT_CODE",
            dataSource: assetList.global.dropDownDataSource.rs,
        });

        assetList.global.dropDownDataSource = customKendo.fn_customAjax("/asset/getAssetPlaceList", {});
        assetList.global.dropDownDataSource.rs.unshift({
            AST_PLACE_NAME : "설치장소",
            AST_PLACE_SN : "",
        })
        $("#assetPlace").kendoDropDownList({
            dataTextField: "AST_PLACE_NAME",
            dataValueField: "AST_PLACE_SN",
            dataSource: assetList.global.dropDownDataSource.rs,
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

                assetList.global.dropDownDataSource = result.rs;
                assetList.global.dropDownDataSource.unshift({
                    AST_CODE_NM : defaultName,
                    AST_CODE    : "",
                })

                $("#" + changeId).data("kendoDropDownList").dataSource.data(assetList.global.dropDownDataSource)
                $("#" + changeId).data("kendoDropDownList").select(0);
                if(id == "categoryA"){
                    $("#" + changeId).data("kendoDropDownList").bind("change", function(){assetList.categoryAddRow("categoryB", this.dataItem().AST_CODE_ID)});
                }
            }
        }
    },


    setBarcodePrintA: function(){
        if(!confirm("선택된 항목을 바코드(대) 출력 하시겠습니까?")){
            return;
        }
        var data = {
            target : "asset",
            astSnArr : "",
        }


        $("input[name='aiChk']:checked").each(function(e, i){
            data.astSnArr += ',' + $(this).val()
        })

        data.astSnArr = data.astSnArr.substring(1);

        if(data.astSnArr == ""){
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
            target : "asset",
            astSnArr : ""
        }

        $("input[name='aiChk']:checked").each(function(e, i){
            data.astSnArr += ',' + $(this).val()
        });

        data.astSnArr = data.astSnArr.substring(1);

        if(data.astSnArr == ""){
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
