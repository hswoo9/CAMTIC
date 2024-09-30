var budgetPjtChoicePop = {

    global: {

    },

    fn_defaultScript: function () {
        customKendo.fn_datePicker("fromMonth", 'decade', "yyyy", new Date());

        budgetPjtChoicePop.mainGrid();
    },

    gridReload : function(){
        if($("#budgetPjtChoice").data("kendoGrid") != null){
            $("#budgetPjtChoice").data("kendoGrid").destroy();
        }

        budgetPjtChoicePop.mainGrid();
    },

    mainGrid : function(){
        let dataSource = new kendo.data.DataSource({
            serverPaging: false,
            transport: {
                read : {
                    url : '/kukgoh/getEnaraPjtList',
                    dataType : "json",
                    type : "post"
                },
                parameterMap: function(data) {

                    data.year = $("#fromMonth").val();
                    data.ddtlbzNm = $("#budgetGroup").val();
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
            pageSize: 10,
        });

        $("#budgetPjtChoice").kendoGrid({
            dataSource: dataSource,
            sortable: true,
            selectable: "row",
            resizable : true,
            height : 650,
            pageable: {
                refresh: true,
                pageSizes : [ 10, 20, 50, "ALL" ],
                buttonCount: 5
            },
            noRecords: {
                template: "데이터가 존재하지 않습니다."
            },
            // persistSelection : true,
            columns: [
                {
                    field : "DDTLBZ_ID",
                    title : "사업코드",
                    width : 80
                },
                {
                    field : "DDTLBZ_NM",
                    title : "사업명",
                    width : 150
                },
                {
                    field : "UPPER_BSNS_ID",
                    title : "상위사업코드",
                    width : 100
                },
                {
                    field : "UPPER_BSNS_NM",
                    title : "상위사업명",
                    width : 150
                },
                {
                    field : "REQST_DE",
                    title : "신청일자",
                    width : 80,
                    template : function(data){
                        return data.REQST_DE.toString().substring(0,4) + "-" + data.REQST_DE.toString().substring(4,6) + "-" + data.REQST_DE.toString().substring(6,8);
                    }
                }, {
                    title : "설정",
                    width : 50,
                    template : function(data){
                        return '<button type="button" class="k-button k-button-solid-base" onclick="budgetPjtChoicePop.setEnaraProject('+data.CNTC_SN+')">설정</button>';
                    }
                }
                ]
        }).data("kendoGrid");
    },

    setEnaraProject: function(sn) {
        var data = {
            cntcSn : sn,
            pjtSn : $("#pjtSn").val()
        }
        $.ajax({
            url : "/kukgoh/setEnaraProject",
            data : data,
            type : "post",
            dataType: "json",
            success : function(rs){
                if(rs.code == 200){
                    alert(rs.message);

                    opener.parent.projectConfigView.mainGrid()
                    window.close();
                }
            }
        })
    }


}