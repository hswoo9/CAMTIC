var cardAuthMng = {

    global : {

    },

    fn_defaultScript : function(){
        customKendo.fn_textBox(["searchValue"])
        cardAuthMng.mainGrid();
        cardAuthMng.subGrid();
    },

    mainGrid : function(){
        let dataSource = new kendo.data.DataSource({
            serverPaging: false,
            transport: {
                read: {
                    url: "/card/getCardAuthList",
                    dataType: "json",
                    type: "post"
                },
                parameterMap: function(data){
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
                pageSizes : [ 10, 20, 50, "ALL" ],
                buttonCount: 5
            },
            noRecords: {
                template: "데이터가 존재하지 않습니다."
            },
            toolbar: [
                {
                    name : 'button',
                    template : function (e){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-info" onclick="cardAuthMng.fn_popRegDet(8, 9999);">' +
                            '	<span class="k-button-text">카드 추가</span>' +
                            '</button>';
                    }
                }, {
                    name : 'button',
                    template : function (e){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-error" onclick="cardAuthMng.fn_delCardAuth();">' +
                            '	<span class="k-button-text">선택삭제</span>' +
                            '</button>';
                    }
                }, {
                    name : 'button',
                    template : function (e){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="cardAuthMng.mainGrid();">' +
                            '	<span class="k-button-text">조회</span>' +
                            '</button>';
                    }
                },
            ],
            columns: [
                {
                    headerTemplate: '<input type="checkbox" id="checkAll" name="checkAll" onclick="fn_checkAll(\'checkAll\', \'authSn\');"/>',
                    template : "<input type='checkbox' id='authSn#=CARD_AUTH_SN#' name='authSn' class='authSn' value='#=CARD_AUTH_SN#'/>",
                    width: 50
                }, {
                    title: "순번",
                    template: "#= ++record #",
                    width: 80
                }, {
                    title : "카드명",
                    field : "TR_NM"
                }, {
                    title : "카드번호",
                    field : "CARD_NO"
                },
            ],
            dataBinding: function() {
                record = (this.dataSource.page() -1) * this.dataSource.pageSize();
            }
        }).data("kendoGrid");
    },

    subGrid : function(){
        let dataSource = new kendo.data.DataSource({
            serverPaging: false,
            transport: {
                read: {
                    url: "/card/getCardAuthUserList",
                    dataType: "json",
                    type: "post"
                },
                parameterMap: function(data){

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

        $("#subGrid").kendoGrid({
            dataSource: dataSource,
            sortable: true,
            scrollable: true,
            selectable: "row",
            height: 570,
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
                    name : 'button',
                    template : function (e){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-info" onclick="cardAuthMng.fn_setCardAuthUser(\'cardMng\')">' +
                            '	<span class="k-button-text">사용자 추가</span>' +
                            '</button>';
                    }
                }, {
                    name : 'button',
                    template : function (e){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-error" onclick="cardAuthMng.fn_delCardAuthUser();">' +
                            '	<span class="k-button-text">선택삭제</span>' +
                            '</button>';
                    }
                }, {
                    name : 'button',
                    template : function (e){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="cardAuthMng.subGrid();">' +
                            '	<span class="k-button-text">조회</span>' +
                            '</button>';
                    }
                },
            ],
            columns: [
                {
                    headerTemplate: '<input type="checkbox" id="checkAll" name="checkAll" onclick="fn_checkAll(\'checkAll\', \'authUserSn\');"/>',
                    template : "<input type='checkbox' id='authUserSn#=CARD_AUTH_USER_SN#' name='authUserSn' class='authUserSn' value='#=CARD_AUTH_USER_SN#'/>",
                    width: 50
                }, {
                    title: "순번",
                    template: "#= ++record #",
                    width: 80
                }, {
                    title : "이름",
                    field : "EMP_NAME"
                }
            ],
            dataBinding: function() {
                record = (this.dataSource.page() -1) * this.dataSource.pageSize();
            }
        }).data("kendoGrid");
    },

    fn_popRegDet : function(v, i){
        var url = "/mng/pop/paymentDetView.do?type=" + v + "&index=" + i;

        var name = "_blank";
        var option = "width = 1100, height = 650, top = 100, left = 400, location = no";
        var popup = window.open(url, name, option);
    },

    fn_selCardInfo : function(trCd, trNm, cardNo){
        var data = {
            trCd : trCd,
            trNm : trNm,
            cardNo : cardNo
        }

        $.ajax({
            url : "/card/setCardAuthData",
            data : data,
            dataType : "json",
            type : "post",
            success : function(rs) {
                if (rs.code == 200) {
                    alert("등록되었습니다.");
                    cardAuthMng.mainGrid();
                }
            },
            error : function(rs){
                console.log(rs);
            }
        })
    },

    fn_delCardAuth : function(){

        if($("input[name=authSn]:checked").length == 0){
            alert("선택된 카드가 없습니다.");
            return;
        }
        if(confirm("삭제하시겠습니까?")){
            var cardAuthSn = "";

            $.each($("input[name='authSn']:checked"), function(){
                cardAuthSn += "," + $(this).val()
            })

            $.ajax({
                url : "/card/delCardAuthData",
                data : {
                    cardAuthSn : cardAuthSn.substring(1)
                },
                dataType : "json",
                type : "post",
                success : function(rs){
                    if (rs.code == 200){
                        console.log(rs);
                        alert("삭제되었습니다.");
                        cardAuthMng.mainGrid();
                    }

                }
            });
        }
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
                    cardAuthMng.mainGrid();
                }
            }
        });
    },

    fn_setCardAuthUser : function (){

        window.open("/common/deptListPop.do?type=cardAuthUser", "조직도", "width=750, height=650");
    },

    fn_cardAuthUser : function(empSeq, empName){

        $.ajax({
            url : "/card/setCardAuthUserData",
            data : {
                empSeq: empSeq,
                empName: empName
            },
            type : "post",
            dataType : "json",
            success : function(rs){
                if(rs.code == 200){
                    alert("등록되었습니다.");
                    cardAuthMng.subGrid();
                }
            }
        });
    },

    fn_delCardAuthUser : function(){

        if($("input[name=authUserSn]:checked").length == 0){
            alert("선택된 직원이 없습니다.");
            return;
        }
        if(confirm("삭제하시겠습니까?")){
            var cardAuthUserSn = "";

            $.each($("input[name='authUserSn']:checked"), function(){
                cardAuthUserSn += "," + $(this).val()
            })

            $.ajax({
                url : "/card/delCardAuthUserData",
                data : {
                    cardAuthUserSn : cardAuthUserSn.substring(1)
                },
                dataType : "json",
                type : "post",
                success : function(rs){
                    if (rs.code == 200){
                        console.log(rs);
                        alert("삭제되었습니다.");
                        cardAuthMng.subGrid();
                    }

                }
            });
        }
    },

}