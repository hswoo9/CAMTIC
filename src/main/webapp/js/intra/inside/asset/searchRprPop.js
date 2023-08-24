const searchRprPop = {
    init: function(){
        searchRprPop.dataSet();
        searchRprPop.mainGrid();

        $(document).on('change', '.checkSingle', function (event) {
            if (this.checked) {
                // 체크된 것이 클릭된 경우 다른 모든 체크박스 비활성화
                $('.checkSingle').not(this).attr('disabled', true);
            } else {
                // 체크 해제 된 경우 다른 모든 체크박스 활성화
                $('.checkSingle').attr('disabled', false);
            }
        });
    },

    dataSet: function(){
        customKendo.fn_datePicker("startDt", 'month', "yyyy-MM-dd", new Date(now.setMonth(now.getMonth() - 1)));
        customKendo.fn_datePicker("endDt", 'month', "yyyy-MM-dd", new Date());
    },

    mainGrid: function(){
        let dataSource = new kendo.data.DataSource({
            serverPaging: false,
            pageSize: 10,
            transport: {
                read : {
                    url : "/inside/getRprReceiptList",
                    dataType : "json",
                    type : "post"
                },
                parameterMap: function(data) {
                    data.rprClass = 2;
                    data.resYn = "N";
                    data.beforeYn = "Y";
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
            }
        });

        $("#mainGrid").kendoGrid({
            dataSource: dataSource,
            sortable: true,
            scrollable: true,
            selectable: "row",
            height: 350,
            pageable : {
                refresh : true,
                pageSizes : [ 10, 20, 30, 50, 100 ],
                buttonCount : 5
            },
            noRecords: {
                template: "데이터가 존재하지 않습니다."
            },
            columns: [
                {
                    headerTemplate: '',
                    template : function(e){
                        return "<input type='checkbox' id='invPk#=INVENTION_INFO_SN#' name='invPk' value=\""+e.INVENTION_INFO_SN+"\" class='checkbox checkSingle'/>";
                    },
                    width: 30
                }, {
                    field: "APPLICANT_NUM",
                    title: "출원번호",
                }, {
                    field: "REG_NUM",
                    title: "등록번호",
                }, {
                    field: "APPLICANT_DT",
                    title: "출원일",
                }, {
                    field: "REG_DATE",
                    title: "등록일",
                }, {
                    field: "TITLE",
                    title: "지식재산권 명칭",
                    width: 180
                }
            ]
        }).data("kendoGrid");
    },

    fn_selectChkUse: function(){
        if($("input[name='invPk']:checked").length == 0){
            alert("포상금지급 신청을 진행하실 지식재산권을 선택해주세요.");
        }

        $("input[name='invPk']:checked").each(function(){
            const dataItem = $("#mainGrid").data("kendoGrid").dataItem($(this).closest("tr"));
            window.opener.parent.rprResReq.dataSet(dataItem.INVENTION_INFO_SN);
            window.close();
        });
    }
}

