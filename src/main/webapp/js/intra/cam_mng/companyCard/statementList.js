var statementList = {

    global : {
        dropDownDataSource : "",
        searchAjaxData : "",
        saveAjaxData : "",
    },


    fn_defaultScript : function (){
        statementList.mainGrid();
    },

    mainGrid: function(){
        let dataSource = new kendo.data.DataSource({
            serverPaging: false,
            transport: {
                read : {
                    url : '/card/getCardTOData',
                    dataType : "json",
                    type : "post"
                },
                parameterMap: function(data) {

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

        $("#mainGrid").kendoGrid({
            dataSource: dataSource,
            sortable: true,
            scrollable: true,
            selectable: "row",
            height: 508,
            pageable : {
                refresh : true,
                pageSizes : [ 10, 20, 30, 50, 100 ],
                buttonCount : 5
            },
            noRecords: {
                template: "데이터가 존재하지 않습니다."
            },
            toolbar : [
                {
                    name : 'button',
                    template : function (e){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-info" onclick="statementList.fn_regCardToPop()">' +
                            '	<span class="k-button-text">등록</span>' +
                            '</button>';
                    }
                }, {
                    name : 'button',
                    template : function (e){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="">' +
                            '	<span class="k-button-text">조회</span>' +
                            '</button>';
                    }
                }
            ],
            columns: [
                {
                    title: "순번",
                    template: "#= --record #",
                    width: 50
                }, {
                    field: "TR_NM",
                    title: "카드명"
                }, {
                    field: "CARD_TO_DE",
                    title: "사용일자",
                    width: 200
                }, {
                    field: "USE_EMP_NAME",
                    title: "사용자",
                    width: 180
                }, {
                    field: "CARD_BA_NB",
                    title: "카드번호",
                    width: 300,
                }, {
                    title: "기타",
                    width: 100,
                    template: function(e){
                        return '<button type="button" class="k-button k-button-solid k-button-solid-error" onclick="statementList.fn_del('+e.CARD_TO_SN+')">삭제</button>'
                    }
                }
            ],
            dataBinding: function(){
                record = fn_getRowNum(this, 2);
            }
        }).data("kendoGrid");
    },

    fn_regCardToPop : function(){
        var url = "/card/regCardToPop.do";
        var name = "_blank";
        var option = "width = 700, height = 500, top = 200, left = 400, location = no"
        var popup = window.open(url, name, option);
    },

    fn_del : function(key){
        if(!confirm("삭제하시겠습니까?")){
            return;
        }

        var parameters = {
            cardToSn : key,
        }

        $.ajax({
            url : "/card/delCardTo",
            data : parameters,
            type : "post",
            dataType : "json",
            success : function(rs){
                if(rs.code == 200){
                    alert("삭제되었습니다.");
                    statementList.mainGrid();
                }
            }
        });
    }
}