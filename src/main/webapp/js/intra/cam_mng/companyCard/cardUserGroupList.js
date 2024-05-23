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
                pageSizes : [ 10, 20, 50, "ALL" ],
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
                    width: 400,
                    template: function(e){
                        return '<a href="javascript:void(0);" style="font-weight: bold" onClick="cardUserGroupList.fn_cardUserGruopPop('+e.GROUP_ID+')">' + e.GROUP_NAME + '</a>';
                    }
                }, {
                    field: "REG_EMP_NAME",
                    title: "작성자",
                    width: 70
                }, {
                    field: "REG_DEPT_NAME",
                    title: "팀",
                    width: 70
                }, {
                    title: "사용유무",
                    width: 50,
                    template: function(e){
                        if(e.USE_YN == 'N'){
                            return '미사용';
                        } else {
                            return '사용중';
                        }
                    }
                }, {
                    title: "기타",
                    width: 50,
                    template: function(e){
                        var html = '';

                        if(e.USE_YN == 'N'){
                            html += '<button type="button" class="k-button k-button-solid k-button-solid-error" onclick="cardUserGroupList.fn_del('+e.GROUP_ID+')">삭제</button>';
                        } else {
                            html += '<button type="button" class="k-button k-button-solid k-button-solid-error" disabled>삭제</button>';
                        }

                        return html;
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
                pageSizes : [ 10, 20, 50, "ALL" ],
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
                            '	<span class="k-button-text">추가</span>' +
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
                        return '<button type="button" class="k-button k-button-solid k-button-solid-error" onclick="cardUserGroupList.fn_groupUserDel('+e.GROUP_USER_ID+')">삭제</button>';
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

            $("#mainUserGrid").css("display", "");

            cardUserGroupList.mainUserGrid();
        });
    },

    fn_cardUserGruopPop : function(e){
        var url = "/card/cardUserGroupPop.do";

        if(e != undefined){
            url += "?groupId=" + e;
        }

        var name = "카드사용자 그룹 등록";
        var option = "width = 700, height = 200, top = 200, left = 400, location = no";
        var popup = window.open(url, name, option);
    },

    fn_userMultiSelectPop : function() {
        var popup = window.open("/user/pop/userMultiSelectPop.do","조직도","width=1365, height=610, scrollbars=no, top=100, left=200, resizable=no, toolbars=no, menubar=no");

        popup.onload = function() {
            var arr = [];
            var grid = $("#mainUserGrid").data("kendoGrid");
            var data = grid.dataSource.data();

            for(var i = 0; i < data.length; i++){
                arr.push(data[i].EMP_SEQ);
                popup.userMultiSel.addTable(data[i].EMP_SEQ, "userClick");
            }
        }
    },

    userDataSet : function(arr){
        var groupArr = [];

        for(var i = 0; i < arr.length; i++){
            groupArr.push(arr[i]);
        }

        cardUserGroupList.fn_save(groupArr);
    },

    fn_save : function(arr){
        var parameters = {
            groupId : $("#groupId").val(),
            groupArr : JSON.stringify(arr)
        };

        $.ajax({
            url : "/card/saveCardUserGroupList",
            type : "POST",
            data : parameters,
            dataType : "json",
            success : function(rs){
                if(rs.code == 200){
                    alert("저장되었습니다.");
                    cardUserGroupList.mainUserGrid();
                }
            }
        });
    },

    fn_del : function(key){
        if(!confirm("삭제하시겠습니까?\n삭제한 데이터는 복구 할 수 없습니다.")){
            return;
        }

        var parameters = {
            groupId : key
        };

        $.ajax({
            url : "/card/delCardUserGroup",
            data : parameters,
            type : "post",
            dataType : "json",
            success : function(rs){
                if(rs.code == 200){
                    alert("삭제되었습니다.");
                    cardUserGroupList.fn_gridReSet();
                }
            }
        });
    },

    fn_groupUserDel : function (key) {
        if(!confirm("삭제하시겠습니까?")){
            return;
        }
        var parameters = {
            groupUserId : key,
            groupId : $("#groupId").val()
        };

        $.ajax({
            url : "/card/delGroupUser",
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

    fn_gridReSet : function(){
        cardUserGroupList.mainGrid();
        $("#mainUserGrid").css("display", "none");
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