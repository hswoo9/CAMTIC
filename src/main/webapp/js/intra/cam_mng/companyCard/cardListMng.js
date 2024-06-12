var cardListMng = {

    global : {
        dropDownDataSource : "",
        searchAjaxData : "",
        saveAjaxData : "",
        parameters : "",
    },

    fn_defaultScript : function(){
        customKendo.fn_textBox(["searchValue"])
        cardListMng.mainGrid();
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
                    data.cardVal = "M"
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
            height: 570,
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
                    name : 'button',
                    template : function (e){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-info" onclick="cardListMng.fn_setCardManager(\'cardHolder\')">' +
                            '	<span class="k-button-text">소지자 변경</span>' +
                            '</button>';
                    }
                }, {
                    name : 'button',
                    template : function (e){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-info" onclick="cardListMng.fn_setCardManager(\'cardMng\')">' +
                            '	<span class="k-button-text">담당자 지정</span>' +
                            '</button>';
                    }
                }, {
                    name : 'button',
                    template : function (e){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-info" onclick="cardListMng.syncCardG20Data()">' +
                            '	<span class="k-button-text">G20 동기화</span>' +
                            '</button>';
                    }
                }, {
                    name: 'button',
                    template: function(){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="cardListMng.fn_privatePop(\'d\')">' +
                            '	<span class="k-button-text">공개</span>' +
                            '</button>';
                    }
                }, {
                    name: 'button',
                    template: function(){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="cardListMng.fn_privatePop(\'i\')">' +
                            '	<span class="k-button-text">비공개</span>' +
                            '</button>';
                    }
                }, {
                    name : 'excel',
                    text: '엑셀다운로드'
                }
            ],
            excel : {
                fileName : "카드(관리자) 목록.xlsx",
                filterable : true
            },
            excelExport: exportGrid,
            columns: [
                {
                    headerTemplate: '<input type="checkbox" id="checkAll" name="checkAll" onclick="fn_checkAll(\'checkAll\', \'cardPk\');"/>',
                    template : "<input type='checkbox' id='cardPk#=CARD_BA_NB#' name='cardPk' class='cardPk' value='#=CARD_BA_NB#'/>",
                    width: 50
                }, {
                    title : "G20",
                    columns : [
                        {
                            field: "TR_NM",
                            title: "카드명",
                            width: 400,
                            template: function (e){
                                return '<input type="hidden" id="trCd" value="' + e.TR_CD + '"/><input type="hidden" id="clttrCd" value="e.CLTTR_CD" />' + e.TR_NM;
                            }
                        }, {
                            field: "CARD_BA_NB",
                            title: "카드번호",
                            width: 250,
                            template: function (e) {
                                if (e.CARD_BA_NB != null) {
                                    return e.CARD_BA_NB;
                                } else {
                                    return "";
                                }
                            }
                        }
                    ]
                }, {
                    title: "설정",
                    columns: [
                        {
                            title: "담당자",
                            columns: [
                                {
                                    field: "DEPT_NAME",
                                    title: "부서/팀",
                                }, {
                                    field: "MNG_NAME",
                                    title: "이름",
                                }
                            ]
                        }, {
                            field: "MNG_NAME",
                            title: "소지자",
                            template: function (e){
                                if(e.HOLDER_NAME != null){
                                    return e.HOLDER_NAME;
                                } else {
                                    if(e.MNG_NAME != null){
                                        return e.MNG_NAME;
                                    } else {
                                        return "";
                                    }
                                }
                            }
                        }, {
                            field: "USE_YN",
                            title: "공개여부",
                            width: 100,
                            template: function (e){
                                console.log(e);
                                if(e.USE_YN == 'Y'){
                                    return "공개";
                                } else {
                                    return "비공개";
                                }
                            }
                        }
                    ]
                }
            ],
            dataBinding: function() {
                record = (this.dataSource.page() -1) * this.dataSource.pageSize();
            }
        }).data("kendoGrid");
    },

    fn_privatePop : function (stat){
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
            arr : JSON.stringify(arr),
            stat : stat
        }

        $.ajax({
            url : "/card/setPrivateCard",
            data : parameters,
            dataType : "json",
            type : "post",
            success : function(rs){
                if (rs.code == 200){
                    console.log(rs);
                    alert("저장되었습니다.");
                    cardListMng.mainGrid();
                }

            }
        });
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
                    cardListMng.mainGrid();
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
                    cardListMng.mainGrid();
                }
            }
        });
    },

    privateUserPop : function (id){

        var url = "/card/cardPrivateUserPop.do?groupId=" + id;
        var name = "비공개 사원";
        var option = "width = 1300, height = 600, top = 200, left = 400, location = no";
        var popup = window.open(url, name, option);
    },

    syncCardG20Data : function () {
        var data = {
            g20 : "Y"
        };
        $.ajax({
            url : "/g20/setCardList",
            data : data,
            type : "post",
            dataType : "json",
            beforeSend : function(request){
                $("#my-spinner").show();
            },
            success :function (rs){
                if(rs.code == 200){
                    alert("완료되었습니다.");
                    $("#mainGrid").data("kendoGrid").dataSource.read();
                    $("#my-spinner").hide();
                }
            },
            error : function(e){
                alert("오류가 발생하였습니다.");
                $("#my-spinner").hide();
            }
        });
    },

    fn_setCardManager : function (type){

        var grid = $("#mainGrid").data("kendoGrid");
        var arr = [];

        if($("input[name='cardPk']:checked").length == 0){
            alert("카드를 선택해주세요.");
            return false;
        }

        $("input[name='cardPk']").each(function(){
            if(this.checked){

                var row = $(this).closest("tr");
                var rowData = grid.dataItem(row);
                arr.push(rowData);
            }
        });

        var parameters = {
            arr : JSON.stringify(arr)
        };

        cardListMng.global.parameters = parameters;

        window.open("/common/deptListPop.do?type="+type, "조직도", "width=750, height=650");
    }

}