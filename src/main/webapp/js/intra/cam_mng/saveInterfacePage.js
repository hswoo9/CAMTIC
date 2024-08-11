var saveInterfacePage = {

    global: {

    },

    fn_defaultScript: function () {
        saveInterfacePage.mainGrid();
    },

    mainGrid : function(){
        let dataSource = new kendo.data.DataSource({
            serverPaging: false,
            transport: {
                read : {
                    url : '/kukgoh/getInterfaceList',
                    dataType : "json",
                    type : "post"
                },
                parameterMap: function(data) {

                    return data;
                }

            },
            schema: {
                data: function (data){
                    return data.list;
                },
                total: function (data){
                    return data.list.length;
                },
            },
            pageSize: 10,
        });

        $("#kukgohInterfaceGrid").kendoGrid({
            dataSource: dataSource,
            sortable: true,
            scrollable: true,
            selectable: "row",
            height : 300,
            pageable: {
                refresh: true,
                pageSizes : [ 10, 20, 50, "ALL" ],
                buttonCount: 5
            },
            noRecords: {
                template: "데이터가 존재하지 않습니다."
            },
            persistSelection : true,
            columns: [
                {
                    field : "INTERFACE_ID",
                    title : "인터페이스 ID",
                },
                {
                    field : "INTERFACE_NM",
                    title : "인터페이스 명",
                },
                {
                    field : "BATCH",
                    title : "배치 시간"
                },
                {
                    title : "다운받기",
                    width : 100,
                    template:function (e){
                        return '<button type="button" class="k-button k-button-solid-base" onclick="saveInterfacePage.fn_down( \'' + e.URL + '\')">다운</button>'
                    }
                }],
        }).data("kendoGrid");
    },


    fn_down : function(url){
        var data = {
            url : "url"
        }

        $.ajax({
            url : "/kukgoh/setInterfaceAuto",
            data : data,
            type : "post",
            dataType : "json",
            success : function(rs){
                console.log(rs);

                if(rs.code == 200){
                    alert("다운로드가 완료 되었습니다.");
                } else {
                    alert("다운로드가 실패하였습니다.");
                }
            }
        })

    }
}