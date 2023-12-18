var cardList = {

    global : {
        dropDownDataSource : "",
        searchAjaxData : "",
        saveAjaxData : "",
    },

    fn_defaultScript : function(){
        customKendo.fn_textBox(["searchValue"])
        cardList.mainGrid();
    },

    mainGrid : function(){
        let dataSource = new kendo.data.DataSource({
            serverPaging: false,
            transport: {
                read: {
                    url: "/g20/getCardAdminList",
                    dataType: "json",
                    type: "post"
                },
                parameterMap: function(data){
                    data.searchValue = $("#searchValue").val();
                    data.cardName = "법인카드"
                    return data;
                }
            },
            schema: {
                data: function(data){
                    return data.list;
                },
                total: function(data){
                    return data.list.length;
                },
            },
            pageSize: 10
        });

        $("#mainGrid").kendoGrid({
            dataSource: dataSource,
            sortable: true,
            scrollable: true,
            selectable: "row",
            height: 472,
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
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="cardList.privatePop()">' +
                            '	<span class="k-button-text">설정</span>' +
                            '</button>';
                    }
                }, {
                    name: 'button',
                    template: function(){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="cardList.fn_cancleGroup()">' +
                            '	<span class="k-button-text">해제</span>' +
                            '</button>';
                    }
                }
            ],
            columns: [
                {
                    headerTemplate: '<input type="checkbox" id="checkAll" name="checkAll" onclick="fn_checkAll(\'checkAll\', \'cardPk\');"/>',
                    template : "<input type='checkbox' id='cardPk#=CARD_BA_NB#' name='cardPk' class='cardPk' value='#=CARD_BA_NB#'/>",
                    width: 50
                }, {
                    title: "카드명",
                    width: 500,
                    template: function (e){
                        return '<input type="hidden" id="trCd" value="' + e.TR_CD + '"/><input type="hidden" id="clttrCd" value="e.CLTTR_CD" />' + e.TR_NM;
                    }
                }, {
                    title: "카드번호",
                    width: 500,
                    template: function (e){
                        if(e.CARD_BA_NB != null){
                            return e.CARD_BA_NB;
                        } else {
                            return "";
                        }
                    }
                }, {
                    title: "비공개 사원",
                    width: 100,
                    template: function (e){
                        if(e.groupId != null){
                            return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="cardList.privateUserPop('+ e.groupId +')">' +
                                '	<span class="k-button-text">조회</span>' +
                                '</button>';
                        }else{
                            return '설정미완료';
                        }
                    }
                }
            ],
            dataBinding: function() {
                record = (this.dataSource.page() -1) * this.dataSource.pageSize();
            }
        }).data("kendoGrid");
    },

    privatePop : function (){
        var saveFlag = true;
        var grid = $("#mainGrid").data("kendoGrid");

        $("input[name='cardPk']").each(function(){
            if(this.checked){

                var row = $(this).closest("tr");
                var rowData = grid.dataItem(row);

                if(rowData.groupId != null){
                    alert("등록 된 설정이 있습니다.");
                    saveFlag = false;
                }
            }
        });

        if(!saveFlag){return false;}

        var url = "/card/cardPrivateMngPop.do";
        var name = "그룹 선택";
        var option = "width = 1300, height = 600, top = 200, left = 400, location = no";
        var popup = window.open(url, name, option);
    },

    fn_save : function (id){
        var grid = $("#mainGrid").data("kendoGrid");
        var arr = [];

        $("input[name='cardPk']").each(function(){
            if(this.checked){

                var row = $(this).closest("tr");
                var rowData = grid.dataItem(row);
                arr.push(rowData);
            }
        });

        var parameters = {
            groupId : id,
            groupArr : JSON.stringify(arr)
        };

        $.ajax({
            url : "/card/saveCardUserGroupSel",
            type : "POST",
            data : parameters,
            dataType : "json",
            success : function(rs){
                if(rs.code == 200){
                    alert("저장되었습니다.");
                    cardList.mainGrid();
                }
            }
        });
    },

    fn_cancleGroup : function (){
        var saveFlag = true;
        var grid = $("#mainGrid").data("kendoGrid");
        var arr = [];

        $("input[name='cardPk']").each(function(){
            if(this.checked){
                var row = $(this).closest("tr");
                var rowData = grid.dataItem(row);

                if(rowData.groupId == null){
                    alert("설정이 미완료된 카드가 포함되어있습니다.");
                    saveFlag = false;
                }else{
                }

                arr.push(rowData);
            }
        });

        if(!saveFlag){return false;}

        var parameters = {
            groupArr : JSON.stringify(arr)
        };

        if(!confirm("설정된 그룹을 해제하시겠습니까?")){return false;};

        $.ajax({
            url : "/card/saveCardUserGroupSelCancle",
            type : "POST",
            data : parameters,
            dataType : "json",
            success : function(rs){
                if(rs.code == 200){
                    alert("해제되었습니다.");
                    cardList.mainGrid();
                }
            }
        });
    },

    privateUserPop : function (id){

        var url = "/card/cardPrivateUserPop.do?groupId=" + id;
        var name = "비공개 사원";
        var option = "width = 1300, height = 600, top = 200, left = 400, location = no";
        var popup = window.open(url, name, option);
    }

}