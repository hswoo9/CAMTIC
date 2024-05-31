var menuM = {

    global : {

    },

    fn_defaultScript : function(){
        $("#menuTabStrip").kendoTabStrip({
            animation:  {
                open: {
                    effects: "fadeIn"
                }
            }
        });

        $("#menuEditorTabStrip").kendoTabStrip({
            animation:  {
                open: {
                    effects: "fadeIn"
                }
            }
        });

        menuM.makeTreeView();
        customKendo.fn_textBox(["menuSearch", "menuId", "menuName", "menuPath", "sort"]);

        var result = customKendo.fn_customAjax("/system/getBoardList.do", "");
        if(result.flag){
            customKendo.fn_dropDownList("boardId", result.list, "BOARD_NAME", "BOARD_ID", 2);

            $("#boardId").data("kendoDropDownList").enable(false);
            $("#boardId").data("kendoDropDownList").bind("change", menuM.boardDropDownChange);
        }

        $("#menuType").kendoDropDownList({
            dataTextField: "text",
            dataValueField: "value",
            dataSource: [
                { text: "선택", value: "" },
                { text: "일반", value: "c" },
                { text: "게시판", value: "b" },
                { text: "즐겨찾기", value: "a" }
            ],
            index: 0,
            change : function(){
                if(this.value() == "" || this.value() == "c" || this.value() == "a"){
                    $("#boardId").data("kendoDropDownList").value("");
                    $("#menuPath").val("");
                    $("#menuPath").data("kendoTextBox").enable(true);
                    $("#boardId").data("kendoDropDownList").enable(false);
                }else{
                    $("#boardId").data("kendoDropDownList").value("");
                    $("#menuPath").val("");
                    $("#menuPath").data("kendoTextBox").enable(false);
                    $("#boardId").data("kendoDropDownList").enable(true);
                }
            }
        })

        $("#active").kendoDropDownList({
            dataTextField: "text",
            dataValueField: "value",
            dataSource: [
                { text: "선택", value: "" },
                { text: "사용", value: "Y" },
                { text: "미사용", value: "N" }
            ],
            index: 0
        })

        menuM.getMenuList();
    },

    menuTreeSearch : function(e) {
        var query      = e;
        var dataSource = $("#menuTreeView").data("kendoTreeView").dataSource;
        menuM.filter(dataSource, query);
    },

    boardDropDownChange : function(){
        if(this.value() == ""){
            $("#menuPath").data("kendoTextBox").enable(false);
            $("#menuPath").val("");
        }else{
            var data = {
                boardId : this.value()
            }
            var result = customKendo.fn_customAjax("/system/getBoardType.do", data);
            if(result.flag){
                var boardPath = "";
                if(result.rs.BOARD_TYPE == "n"){
                    boardPath = "/board/normalBoardList.do?boardId="+ this.value();
                }else if(result.rs.BOARD_TYPE == "a"){
                    boardPath = "/board/anonymousBoardList.do?boardId="+ this.value();
                }else if(result.rs.BOARD_TYPE == "q"){
                    boardPath = "/board/qnaBoardList.do?boardId="+ this.value();
                }else if(result.rs.BOARD_TYPE == "f"){
                    boardPath = "/board/faqBoardList.do?boardId="+ this.value();
                }

                $("#menuPath").data("kendoTextBox").enable(false);
                $("#menuPath").val(boardPath);
            }
        }
    },

    makeTreeView : function(){
        $.ajax({
            url : getContextPath() + '/system/makeTreeView.do',
            data : "",
            dataType : "json",
            success : function (rs){
                var rs = rs.rs;
                $("#menuTreeView").kendoTreeView({
                    dataSource: JSON.parse(rs),
                    dataTextField:['MENU_NAME'],
                    select: menuM.treeClick,
                });

                menuM.menuTreeSearch($("#menuSearch").val());
            }
        });
    },

    filter : function(dataSource, query) {
        var hasVisibleChildren = false;
        var data = dataSource instanceof kendo.data.HierarchicalDataSource && dataSource.data();

        for (var i = 0; i < data.length; i++) {
            var item = data[i];
            var text = item.MENU_NAME;
            var itemVisible = query === true || query === "" || text.indexOf(query) >= 0;

            var anyVisibleChildren = menuM.filter(item.children, itemVisible || query);

            hasVisibleChildren = hasVisibleChildren || anyVisibleChildren || itemVisible;

            item.hidden = !itemVisible && !anyVisibleChildren;
        }

        if (data) {
            dataSource.filter({ field: "hidden", operator: "neq", value: true });
        }

        return hasVisibleChildren;
    },

    treeClick : function(e){
        var item = $("#menuTreeView").data("kendoTreeView").dataItem(e.node);
        menuM.dataMod(item);
    },

    getMenuList : function(e){
        var menuId = "";

        if(e != null){
            menuId = e;
        }

        var rs = menuM.callMenuList(menuId, 0);

        $("#upperMenuId").kendoDropDownList({
            dataSource : rs,
            dataValueField : "MENU_ID",
            dataTextField : "MENU_NAME",
            dataDepthField : "MENU_DEPTH",
            index : 0,
            change : function(){
                if($("#upperMenuId").val() > 0){
                    $("#tmpUpperMenuId").val($("#upperMenuId").val());
                    menuM.getMenuList2($("#upperMenuId").val());
                    $("#menuDepth").val(1);
                    $("#upperMenuId2").data("kendoDropDownList").enable(true);
                    $("#upperMenuId3").data("kendoDropDownList").select(0);
                    $("#upperMenuId3").data("kendoDropDownList").enable(false);
                } else {
                    $("#tmpUpperMenuId").val(0);
                    $("#menuDepth").val(0);
                    $("#upperMenuId3").data("kendoDropDownList").select(0);
                    $("#upperMenuId3").data("kendoDropDownList").enable(false);
                    $("#upperMenuId2").data("kendoDropDownList").select(0);
                    $("#upperMenuId2").data("kendoDropDownList").enable(false);
                }
            }
        });

        $("#upperMenuId2, #upperMenuId3, #upperMenuId4").kendoDropDownList({
            dataSource : [{text : "선택", value : ""}],
            dataValueField : "value",
            dataTextField : "text",
            index : 0,
            enable : false
        });
    },

    getMenuList2 : function(e){
        var menuId = "";
        var upperMenuId = e;

        var rs = menuM.callMenuList(menuId, 1, e);

        $("#upperMenuId2").kendoDropDownList({
            dataSource : rs,
            dataValueField : "MENU_ID",
            dataTextField : "MENU_NAME",
            dataDepthField : "MENU_DEPTH",
            index : 0,
            change : function(){
                if($("#upperMenuId2").val() > 0){
                    $("#tmpUpperMenuId").val($("#upperMenuId2").val());
                    menuM.getMenuList3($("#upperMenuId2").val());
                    $("#menuDepth").val(2);
                    $("#upperMenuId3").data("kendoDropDownList").enable(true);
                } else {
                    $("#menuDepth").val(1);
                    $("#tmpUpperMenuId").val($("#upperMenuId").val());
                    $("#upperMenuId3").data("kendoDropDownList").enable(false);
                    $("#upperMenuId3").data("kendoDropDownList").select(0);
                }
            }
        });
    },

    getMenuList3 : function(e){
        var menuId = "";
        var upperMenuId = e;

        var rs = menuM.callMenuList(menuId, 2, e);

        $("#upperMenuId3").kendoDropDownList({
            dataSource : rs,
            dataValueField : "MENU_ID",
            dataTextField : "MENU_NAME",
            dataDepthField : "MENU_DEPTH",
            index : 0,
            change : function(){
                if($("#upperMenuId3").val() > 0){
                    $("#menuDepth").val(3);
                    $("#tmpUpperMenuId").val($("#upperMenuId3").val());
                } else {
                    $("#menuDepth").val(2);
                    $("#tmpUpperMenuId").val($("#upperMenuId2").val());
                }
            }
        });
    },

    callMenuList : function(menuId, depth, upperMenuId){
        var result;

        var data = {
            menuId : menuId,
            menuDepth : depth
        }

        if(upperMenuId != "" && upperMenuId != null){
            data.upperMenuId = upperMenuId;
        }

        $.ajax({
            url : getContextPath() + '/system/getMenuList.do',
            data : data,
            dataType : "json",
            async : false,
            success : function (rs){
                result = rs.rs;

                var defaultType = [{
                    "MENU_ID": "",
                    "MENU_NAME": "선택",
                    "MENU_DEPTH" : "",
                }, {
                    "MENU_ID": "0",
                    "MENU_NAME": "최상위 메뉴",
                    "MENU_DEPTH" : "0",
                }];
                if(depth == 0){
                    result.unshift(defaultType[1]);
                }

                result.unshift(defaultType[0]);

            },
            error : function(e){
                console.log(e);
            }
        });

        return result;

    },

    inputReset : function(){
        var treeview = $("#menuTreeView").data("kendoTreeView");
        treeview.select($());
        menuM.getMenuList();
        $('#upperMenuId').data("kendoDropDownList").value("");
        $('#upperMenuId').data("kendoDropDownList").enable(true);
        $("#menuId, #menuName, #menuPath, #sort").val("");
        $("#active").data("kendoDropDownList").value("");
        $("#saveBtn").show();
    },


    dataMod : function(v){
        menuM.getMenuList(v.MENU_ID);
        $('#upperMenuId').data("kendoDropDownList").select(0);
        $('#upperMenuId').data("kendoDropDownList").enable(false);
        $('#tmpUpperMenuId').val(v.UPPER_MENU_ID);
        $('#menuId').val(v.MENU_ID);
        $('#menuName').val(v.MENU_NAME);
        $('#menuType').data("kendoDropDownList").value(v.MENU_TYPE);
        $('#menuType').data("kendoDropDownList").trigger("change");
        /** TODO. 현재 게시판 유무 미정 */
        if(v.MENU_TYPE == "b"){
            $("#boardId").data("kendoDropDownList").value(v.MENU_PATH.split("=")[1]);
        }
        $('#menuPath').val(v.MENU_PATH);
        $('#menuDepth').val(v.MENU_DEPTH);
        $('#sort').val(v.SORT);
        $('#active').data("kendoDropDownList").value(v.ACTIVE);
        $("#saveBtn").show();
    },

    setMenu : function(){
        var flag = true;

        if(!$("#tmpUpperMenuId").val()){
            alert("상위메뉴를 선택해주세요.");
            flag = false;
            return;
        }else if(!$("#menuName").val()){
            alert("메뉴이름을 입력해주세요.");
            flag = false;
            return;
        }else if(!$("#sort").val()){
            alert("메뉴순서를 입력해주세요.");
            flag = false;
            return;
        }else if(!$("#menuDepth").val()){
            alert("상위메뉴를 선택해주세요.");
            flag = false;
            return;
        }else if(!$("#menuPath").val()){
            alert("메뉴경로를 입력해주세요.");
            flag = false;
            return;
        }else if(!$("#active").val()){
            alert("사용유무를 선택해주세요.");
            flag = false;
            return;
        }

        if(confirm("저장하시겠습니까?")){
            if(flag){
                var data = {
                    "menuId" : $("#menuId").val(),
                    "upperMenuId" : $("#tmpUpperMenuId").val(),
                    "menuName" : $("#menuName").val(),
                    "menuType" : $("#menuType").val(),
                    "sort" : $("#sort").val(),
                    "menuDepth" : $("#menuDepth").val(),
                    "menuPath" : $("#menuPath").val(),
                    "active" : $("#active").val(),
                    "loginEmpSeq" : $("#loginEmpSeq").val(),
                }

                $.ajax({
                    url : getContextPath() + '/system/setMenu.do',
                    data : data,
                    dataType : "json",
                    type : "POST",
                    async : false,
                    success : function (){
                        alert("메뉴가 등록 되었습니다.");
                        $("#menuTreeView").data("kendoTreeView").destroy();
                        menuM.makeTreeView();
                    },
                    error : function (){
                        alert("메뉴 등록 중 에러가 발생했습니다.");
                    }
                })
            }else{
                alert("입력값을 확인해주세요.");
            }
        }
    },

    setMenuDel : function(){
        if(!$("#menuId").val()){
            alert("삭제 할 메뉴를 선택해주세요.");
            return;
        }

        if(confirm("삭제 시 해당 메뉴와 하위 메뉴 전체를 사용할 수 없습니다.\n선택한 메뉴를 삭제 하시겠습니까?")){
            var data = {
                "menuId" : $("#menuId").val(),
            }

            $.ajax({
                url : getContextPath() + '/system/setMenuDel.do',
                data : data,
                dataType : "json",
                type : "POST",
                async : false,
                success : function (){
                    alert("메뉴가 삭제 되었습니다.");
                    $("#menuTreeView").data("kendoTreeView").destroy();
                    menuM.makeTreeView();
                },
                error : function (){
                    alert("메뉴 삭제 중 에러가 발생했습니다.");
                }
            })
        }
    }
}