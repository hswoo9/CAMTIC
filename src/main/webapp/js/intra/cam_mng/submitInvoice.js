var submitInvoice = {

    global: {

    },

    fn_defaultScript: function () {
        var d = new Date();
        var bd = new Date(d.setMonth(d.getMonth() - 1)); // 이전달

        var bdStr = d.getFullYear() + "-" + ('0' + (bd.getMonth() + 1)).slice(-2) + "-" + ('0' + bd.getDate()).slice(-2);

        customKendo.fn_datePicker("fromMonth", "depth", "yyyy-MM-dd", bdStr);
        customKendo.fn_datePicker("endMonth", "depth", "yyyy-MM-dd", new Date());

        $("#status").kendoDropDownList({
            dataTextField: "text",
            dataValueField: "value",
            dataSource: [
                {text: "전체", value: "999"},
                {text: "미전송", value: "0"},
                {text: "전송진행중", value: "2"},
                {text: "전송", value: "1"}
            ],
            index: 0,
            select : onSelect
        });
        function onSelect(e) {
            var dataItem = this.dataItem(e.item.index());

            console.log(dataItem);
        }

        submitInvoice.mainGrid();
    },

    mainGrid : function(){
        let dataSource = new kendo.data.DataSource({
            serverPaging: false,
            transport: {
                read : {
                    url : '',
                    dataType : "json",
                    type : "post"
                },
                parameterMap: function() {

                    return ;
                }

            },
            pageSize: 10,
        });

        $("#invoiceMainGrid").kendoGrid({
            dataSource: dataSource,
            sortable: true,
            scrollable: true,
            selectable: "row",
            height : 525,
            pageable: {
                refresh: true,
                pageSizes : [ 10, 20, 50, "ALL" ],
                buttonCount: 5
            },
            noRecords: {
                template: "데이터가 존재하지 않습니다."
            },
            toolbar: [
                {
                    name: 'button',
                    template: function(){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="submitInvoice.fn_submitInvoice()">' +
                            '	<span class="k-button-text">전송</span>' +
                            '</button>' +
                            '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="submitInvoice.gridReload()">' +
                            '	<span class="k-button-text">조회</span>' +
                            '</button>';
                    }
                }],
            persistSelection : true,
            columns: [
                {
                    width : "30px",
                    headerTemplate : function(e){
                        return '<input type="checkbox" id = "checkboxAll">';
                    },
                   /* template : function(dataItem){
                        if (dataItem.STATE_NM === "전송완료" || dataItem.STATE_NM === "전송진행중" || dataItem.ET_STATE === 'N') {
                            return '';
                        } else {
                            return '<input type="checkbox" class = "checkbox yBox">';
                        }
                    }*/
                },
                {
                    field : "STATE_NM",
                    title : "상태",
                    width : 60
                },
                {
                    field : "EMP_NM",
                    title : "발의자",
                    width : 60
                },
                {
                    title : "발의일자",
                    width : 80
                },	{
                    field : "GISU_SQ",
                    title : "결의번호",
                    width : 60
                },
                {
                    field : "BG_SQ",
                    title : "예산번호",
                    width : 60
                },
                {
                    field : "LN_SQ",
                    title : "거래처순번",
                    width : 60
                },
                {
                    field : "RMK_DC",
                    title : "제목",
                    width : 80
                },
                {
                    field : "DIV_NM",
                    title : "회계단위",
                    width : 80
                },{
                    field : "PJT_NM",
                    title : "프로젝트",
                    width : 90
                },{
                    title : "금액",
                    width : 70
                },
                {
                    field : "CUST_NM",
                    title : "거래처",
                    width : 60
                },
                {
                    field : "ETXBL_CONFM_NO",
                    title : "전자세금계산서 승인번호",
                    width : 130
                },{
                    field : "DDTLBZ_ID",
                    title : "E나라도움 연계 사업ID",
                    width : 100
                },{
                    field : "ET_STATE",
                    title : "전송 가능 여부",
                    width : 70
                }],
        }).data("kendoGrid");
    },


}