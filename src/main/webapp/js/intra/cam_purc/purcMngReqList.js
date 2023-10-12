var purcMngReqList = {

    global : {
        dropDownDataSource : []
    },


    fn_defaultScript : function (){
        purcMngReqList.global.dropDownDataSource = [
            { text: "내 구매만 조회", value: "empDept" },
        ]
        customKendo.fn_dropDownList("searchDept", purcMngReqList.global.dropDownDataSource, "text", "value");
        $("#searchDept").data("kendoDropDownList").value("empDept");
        $("#searchDept").data("kendoDropDownList").bind("change", purcMngReqList.gridReload);

        purcMngReqList.global.dropDownDataSource = [
            { text: "문서번호", value: "DOC_NO" },
            { text: "목적", value: "PURC_REQ_PURPOSE" },
            { text: "품명", value: "PURC_ITEM_NAME" },
        ]

        customKendo.fn_dropDownList("searchKeyword", purcMngReqList.global.dropDownDataSource, "text", "value");
        customKendo.fn_textBox(["searchValue"]);
        purcMngReqList.mainGrid();
    },

    mainGrid: function(url, params){
        let dataSource = new kendo.data.DataSource({
            serverPaging: false,
            transport: {
                read: {
                    url: '/purc/getMngReqPurcList',
                    dataType: "json",
                    type: "post"
                },
                parameterMap: function(data) {
                    data.empSeq = $("#myEmpSeq").val();
                    data.searchDept = $("#searchDept").val();
                    data.searchKeyword = $("#searchKeyword").val();
                    data.searchValue = $("#searchValue").val();

                    return data;
                }
            },
            schema: {
                data: function (data) {
                    return data.list;
                },
                total: function (data) {
                    return data.list.length;
                },
            },
            pageSize: 10,
        });

        $("#mainGrid").kendoGrid({
            dataSource: dataSource,
            sortable: true,
            selectable: "row",
            height : 525,
            pageable: {
                refresh: true,
                pageSizes: [ 10, 20, 30, 50, 100 ],
                buttonCount: 5
            },
            noRecords: {
                template: "데이터가 존재하지 않습니다."
            },
            toolbar: [
                {
                    name: 'button',
                    template: function(){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-info" onclick="purcMngReqList.fn_reqRegPopup()">' +
                            '	<span class="k-button-text">구매청구서 작성</span>' +
                            '</button>';
                    }
                }, {
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
                    width: 100,
                }, {
                    field: "PURC_REQ_DATE",
                    title: "요청일",
                    width: 120,
                }, {
                    title: "요청자",
                    field: "EMP_NAME_KR",
                    width: 100
                }, {
                    title: "목적",
                    field: "PURC_REQ_PURPOSE",
                    template : function(e){
                        return '<a onclick="purcMngReqList.fn_reqRegPopup(' + e.PURC_SN + ')">' + e.PURC_REQ_PURPOSE + '</a>'
                    }
                }, {
                    title: "구매",
                    width: 100,
                    template : function(e){
                        return e.CP_CNT + "건 / " + e.RP_CNT + "건"
                    }
                }, {
                    title: "외주",
                    width: 100
                }, {
                    title: "상태",
                    field: "STATUS",
                    width: 100,
                    template : function(e){
                        if(e.STATUS == "W"){
                            return "작성중"
                        }else if(e.STATUS == "C"){
                            return "요청완료"
                        }
                    }
                }
            ],
            dataBinding: function(){
                record = fn_getRowNum(this, 2);
            }
        }).data("kendoGrid");
    },

    gridReload: function (){
        $("#mainGrid").data("kendoGrid").dataSource.read();
    },
}