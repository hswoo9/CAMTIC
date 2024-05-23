var proposalList = {

    init: function(){
        proposalList.dataSet();
        proposalList.mainGrid();
    },

    dataSet: function(){
        $("#searchType").kendoDropDownList({
            dataTextField: "text",
            dataValueField: "value",
            dataSource: [
                { text: "물품명", value: "" },
                { text: "문서번호", value: "1" },
                { text: "청구서 제목", value: "2" }
            ],
            index: 0
        });

        $("#searchVal").kendoTextBox();
    },

    mainGrid: function(){
        var dataSource = new kendo.data.DataSource({
            serverPaging: false,
            transport: {
                read : {
                    url: '/purc/getPurcAssetList',
                    dataType: "json",
                    type: "post"
                },
                parameterMap: function(data, operation) {
                    return data;
                }
            },
            schema : {
                data: function(data){
                    return data.list;
                },
                total: function(data){
                    return data.list.length;
                },
            },
            pageSize: 10,
        });

        $("#mainGrid").kendoGrid({
            dataSource: dataSource,
            sortable: true,
            scrollable: true,
            selectable: "row",
            height: 508,
            pageable: {
                refresh: true,
                pageSizes : [ 10, 20, 50, "ALL" ],
                buttonCount: 5
            },
            toolbar: [
                {
                    name: 'button',
                    template: function (e){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="proposalList.mainGrid();">' +
                            '	<span class="k-button-text">조회</span>' +
                            '</button>';
                    }
                }, {
                    name: 'button',
                    template: function (e){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="proposalList.fn_itemUnAssetStat();">' +
                            '	<span class="k-button-text">미자산 처리</span>' +
                            '</button>';
                    }
                }
            ],
            noRecords: {
                template: "데이터가 존재하지 않습니다."
            },
            columns: [
                {
                    headerTemplate: '<input type="checkbox" id="checkAll" name="checkAll" onclick="fn_checkAll(\'checkAll\', \'item\');"/>',
                    template : function(row){
                        if(row.PROD_SN == null){
                            return "<input type='checkbox' id='item#="+row.CLAIM_ITEM_SN+"' name='item' class='item' value='"+row.CLAIM_ITEM_SN+"'/>"
                        }else{
                            return "";
                        }
                    },
                    width: "3%"
                }, {
                    template: "#= --record #",
                    title: "순번",
                    width : 50
                }, {
                    field: "ITEM_NM",
                    title: "물품명"
                }, {
                    field: "ITEM_STD",
                    title: "규격"
                }, {
                    field: "ITEM_UNIT",
                    title: "단가"
                }, {
                    field: "ITEM_EA",
                    title: "수량"
                }, {
                    title: "금액",
                    template: function(row){
                        return fn_numberWithCommas(row.ITEM_UNIT_AMT);
                    }
                }, {
                    field: "CLAIM_DE",
                    title: "구입일"
                }, {
                    title: "자산등록",
                    template: function(row){
                        let html = "";
                        if(row.PROD_SN == null){
                            html += '<button type="button" class="k-button k-button-solid-base" onclick="proposalList.addAssetPopup(' + row.CLAIM_ITEM_SN + ')">자산등록</button>';
                        }else{
                            html += '<a onclick="proposalList.viewAssetPop(' + row.PROD_SN + ')" style="font-weight: bold">자산등록완료</a>';
                        }
                        return html;
                    }
                }
            ],
            dataBinding: function(){
                record = fn_getRowNum(this, 2);
            }
        }).data("kendoGrid");
    },

    fn_itemUnAssetStat: function(){
        let itemArr = [];
        $("input[name=item]:checked").each(function(i){
            itemArr.push($(this).val());
        })
        let data = {
            itemList: itemArr.join()
        }
        if($("input[name=item]:checked").length == 0) {
            alert("구매내역이 선택되지 않았습니다.");
            return;
        }

        const result = customKendo.fn_customAjax("/purc/updItemUnAssetStat", data);

        if(result.code != 200){
            alert("비자산 처리 중 오류가 발생하였습니다.");
        }else{
            proposalList.mainGrid();
        }
    },

    addAssetPopup: function(itemSn){
        let url = "/inside/addAssetPop.do";
        if(itemSn != null){
            url+= "?itemSn="+itemSn;
        }
        const name = "addAssetPop";
        const option = "width = 1125, height = 700, top = 100, left = 200, location = no, _blank"
        window.open(url, name, option);
    },

    viewAssetPop : function(astInfoSn) {
        var url = "/inside/viewAssetPop.do?astInfoSn=" + astInfoSn;
        var name = "viewAssetPop";
        var option = "width = 950, height = 620, top = 100, left = 200, location = no, _blank"
        var popup = window.open(url, name, option);
    },
}
