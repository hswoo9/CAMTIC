var cardUserGroupList = {

    global : {
        dropDownDataSource : "",
        searchAjaxData : "",
        saveAjaxData : "",
    },


    fn_defaultScript : function (){
        cardUserGroupList.mainGrid();
    },

    mainGrid: function(){
        let dataSource = new kendo.data.DataSource({
            serverPaging: false,
            transport: {
                read : {
                    url : '/card/getCardUserGroup',
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
            dataBound : cardUserGroupList.onDataBound,
            toolbar : [
                {
                    name : 'button',
                    template : function (e){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-info" onclick="cardUserGroupList.fn_cardUserGruopPop()">' +
                            '	<span class="k-button-text">등록</span>' +
                            '</button>';
                    }
                }, {
                    name : 'button',
                    template : function (e){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="cardUserGroupList.mainGrid()">' +
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
                    field: "GROUP_NAME",
                    title: "그룹명",
                    width: 100
                }, {
                    title: "사용유무",
                    width: 100,
                    template: function(e){
                        if(e.USE_YN == 'N'){
                            return '미사용';
                        } else {
                            return '사용중';
                        }
                    }
                }, {
                    field: "REG_DT",
                    title: "생성일시",
                    width: 100,
                    template: function(e){
                        var currentDate = new Date(e.REG_DT);
                        var currentFormatDate = cardUserGroupList.dateFormat(currentDate);

                        return currentFormatDate;
                    }
                }, {
                    title: "기타",
                    width: 100,
                    template: function(e){
                        if(e.USE_YN == 'N'){
                            return '<button type="button" class="k-button k-button-solid k-button-solid-error" onclick="cardUserGroupList.fn_del('+e.GROUP_ID+')">삭제</button>';
                        } else {
                            return '<button type="button" class="k-button k-button-solid k-button-solid-error" disabled>삭제</button>';
                        }
                    }
                }
            ],
            dataBinding: function(){
                record = fn_getRowNum(this, 2);
            }
        }).data("kendoGrid");
    },

    mainUserGrid: function(){
        let dataSource = new kendo.data.DataSource({
            serverPaging: false,
            transport: {
                read : {
                    url : '/card/getcardUserGroupList',
                    dataType : "json",
                    type : "post"
                },
                parameterMap: function(data) {
                    data.groupId = $("#groupId").val();
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

        $("#mainUserGrid").kendoGrid({
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
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-info" onclick="cardUserGroupList.fn_userMultiSelectPop()">' +
                            '	<span class="k-button-text">등록</span>' +
                            '</button>';
                    }
                }, {
                    name : 'button',
                    template : function (e){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="cardUserGroupList.mainGrid()">' +
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
                    title: "성명",
                    field: "EMP_NAME",
                    width: 250
                }, {
                    title: "부서",
                    field: "DEPT_NAME",
                    width: 250
                }, {
                    title: "직급",
                    field: "POSITION_NAME",
                    width: 250
                }, {
                    title: "기타",
                    width: 80,
                    template : function (e){
                        console.log(e);
                        var rtYn = e.RT_YN;
                        if(rtYn == 'Y'){
                            return '<button type="button" class="k-button k-button-solid k-button-solid-error" disabled onclick="cardUserGroupList.fn_histDel('+e.CARD_TO_HIST_SN+')">삭제</button>';
                        } else {
                            return '<button type="button" class="k-button k-button-solid k-button-solid-error" onclick="cardUserGroupList.fn_histDel('+e.CARD_TO_HIST_SN+')">삭제</button>';
                        }
                    }
                }
            ],
            dataBinding: function(){
                record = fn_getRowNum(this, 2);
            }
        }).data("kendoGrid");
    },

    onDataBound: function(){
        const grid = this;
        grid.tbody.find("tr").dblclick(function(){
            const dataItem = grid.dataItem($(this));

            $("#groupId").val(dataItem.GROUP_ID);

            grid.tbody.find("tr").each(function (){
                $(this).css("background-color", "");
            });

            $(this).css("background-color", "#a7e1fc");

            cardUserGroupList.mainUserGrid();
        });
    },

    fn_cardUserGruopPop : function(){
        var url = "/card/cardUserGroupPop.do";

        var name = "카드사용자 그룹 등록";
        var option = "width = 700, height = 250, top = 200, left = 400, location = no";
        var popup = window.open(url, name, option);
    },

    fn_del : function(key){
        if(!confirm("삭제하시겠습니까?")){
            return;
        }

        var parameters = {
            groupId : key,
        }

        $.ajax({
            url : "/card/delCardTo",
            data : parameters,
            type : "post",
            dataType : "json",
            success : function(rs){
                if(rs.code == 200){
                    alert("삭제되었습니다.");
                    cardUserGroupList.mainGrid();
                }
            }
        });
    },

    fn_histDel : function (key) {
        if(!confirm("삭제하시겠습니까?")){
            return;
        }
        var parameters = {
            cardHistSn : key
        };

        $.ajax({
            url : "/card/delCardHist",
            data : parameters,
            type : "post",
            dataType : "json",
            success : function(rs){
                if(rs.code == 200){
                    cardUserGroupList.mainUserGrid();
                }
            }
        });
    },

    dateFormat : function(date) {
        let month = date.getMonth() + 1;
        let day = date.getDate();
        let hour = date.getHours();
        let minute = date.getMinutes();
        let second = date.getSeconds();

        month = month >= 10 ? month : '0' + month;
        day = day >= 10 ? day : '0' + day;
        hour = hour >= 10 ? hour : '0' + hour;
        minute = minute >= 10 ? minute : '0' + minute;
        second = second >= 10 ? second : '0' + second;

        return date.getFullYear() + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second;
    },

}