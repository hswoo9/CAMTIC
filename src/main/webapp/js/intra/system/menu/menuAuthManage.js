var menuAM = {

    global : {
        chkArr : new Array(),
        searchAjaxData : "",

    },

    fn_defaultScript : function() {
        $(document).on("input","#menuSearch",function(){
            var query = this.value;
            var dataSource = $("#menuTreeView").data("kendoTreeView").dataSource;

            menuAM.filter(dataSource, query);
        });

        $("#menuTabStrip").kendoTabStrip({
            animation : {
                open : {
                    effects : "fadeIn"
                }
            }
        });
        $("#authorityTabStrip, #authorityEditorTabStrip").kendoTabStrip({
            animation : {
                open : {
                    effects : "fadeIn"
                }
            }
        });

        menuAM.makeTreeView();
        menuAM.gridReload();
        customKendo.fn_textBox(["menuSearch", "authorityGroupId", "searchContent", "authorityGroupName"]);

        menuAM.getAuthorityTypeCode();

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


    },

    gridReload : function(){
        menuAM.global.searchAjaxData = {
            searchContent : $("#searchContent").val(),
        }
        menuAM.mainGrid("/system/getMenuAuthorityGroupList.do", menuAM.global.searchAjaxData);
    },

    mainGrid : function(url, params){
        $("#mainGrid").kendoGrid({
            dataSource: customKendo.fn_gridDataSource3(url, params),
            height: 370,
            sortable: true,
            scrollable: true,
            toolbar : [
                {
                    name: 'button',
                    template: function (e) {
                        return "그룹명 <input type='text' id='searchContent' name='searchContent' onkeypress='if(window.event.keyCode==13){menuAM.gridReload()}'>" +
                            "<button type='button' class='k-button k-button-md k-button-solid k-button-solid-base' onclick='menuAM.gridReload()'>" +
                            "<span class='k-button-text'>조회</span>" +
                            "</button>"
                    }
                }, {
                    name: 'button',
                    template: function (e) {
                        return "<button type='button' class='k-grid-button k-button k-button-md k-button-solid k-button-solid-error' onclick='menuAM.setMenuAuthorityGroupDel()'>" +
                            "<span class='k-button-text'>삭제</span>" +
                            "</button>"
                    }
                }
            ],
            pageable: {
                refresh: true,
                pageSize : 10,
                pageSizes : [ 10, 20, 50, "ALL" ],
                buttonCount: 5,
                messages: {
                    display: "{0} - {1} of {2}",
                    itemsPerPage: "",
                    empty: "데이터가 없습니다.",
                }
            },
            noRecords: {
                template: "데이터가 존재하지 않습니다."
            },
            dataBound : menuAM.onDataBound,
            columns: [
                {
                    headerTemplate: '<input type="checkbox" id="checkAll" name="checkAll" class="k-checkbox checkbox"/>',
                    template : "<input type='checkbox' id='agiPk#=AUTHORITY_GROUP_ID#' name='agiPk' value='#=AUTHORITY_GROUP_ID#' class='k-checkbox checkbox'/>",
                    width : 35
                }, {
                    field: "AUTHORITY_GROUP_NAME",
                    title: "권한그룹 이름",
                }, {
                    field : "CM_CODE_NM",
                    title : "권한 구분",
                    width: 150
                }, {
                    field: "ACTIVE",
                    title: "사용유무",
                    width: 100
                }, {
                    field : "REG_DT",
                    title : "등록일",
                    width: 100
                }]
        }).data("kendoGrid");
    },

    onDataBound(){
        var grid = this;

        grid.tbody.find("tr").dblclick(function (e) {
            var dataItem = grid.dataItem($(this));
            menuAM.getMenuAuthorityGroup(dataItem.AUTHORITY_GROUP_ID);
        });
    },

    getAuthorityTypeCode : function(){
        menuAM.global.searchAjaxData = {
            cmGroupCodeId : "8"
        }

        var result = customKendo.fn_customAjax("/system/commonCodeManagement/getCmCodeList", menuAM.global.searchAjaxData);

        if(result.flag){
            var rs = result;
            var defaultType = [{
                "CM_CODE": "",
                "CM_CODE_NM": "선택"
            }]

            rs.unshift(defaultType[0]);
            $("#authorityType").kendoDropDownList({
                dataSource : rs,
                dataValueField : "CM_CODE",
                dataTextField : "CM_CODE_NM",
                index : 0
            });
        }
    },

    makeTreeView : function(){
        menuAM.global.searchAjaxData = {};
        var result = customKendo.fn_customAjax("/system/makeTreeView.do", menuAM.global.searchAjaxData);
        if(result.flag){
            var rs = result.rs;
            $("#menuTreeView").kendoTreeView({
                checkboxes: {
                    template: "<input type='checkbox' name='menuPkCheckBox' class='k-checkbox k-checkbox-md' value='#= item.MENU_ID #' depth='#= item.MENU_DEPTH #' idPath='#= item.MENU_ID_PATH #' onclick='menuAM.treeClickCheckBox(this)'/>"
                },
                dataSource: JSON.parse(rs),
                dataTextField:['MENU_NAME'],
            });
        }
    },

    filter : function(dataSource, query) {
        var hasVisibleChildren = false;
        var data = dataSource instanceof kendo.data.HierarchicalDataSource && dataSource.data();

        for (var i = 0; i < data.length; i++) {
            var item = data[i];
            var text = item.MENU_NAME;
            var itemVisible = query === true || query === "" || text.indexOf(query) >= 0;

            var anyVisibleChildren = menuAM.filter(item.children, itemVisible || query);

            hasVisibleChildren = hasVisibleChildren || anyVisibleChildren || itemVisible;

            item.hidden = !itemVisible && !anyVisibleChildren;
        }

        if (data) {
            dataSource.filter({ field: "hidden", operator: "neq", value: true });
        }

        return hasVisibleChildren;
    },

    treeClickCheckBox : function(e){
        var chkFlag = true;

        /** 현재 클릭한 체크 박스 체크 여부 (체크된 노드 배열에 담아둠)*/
        if(!$(e).prop("checked")){
            // menuAM.global.chkArr = menuAM.global.chkArr.filter(element => element !== $(e.closest("li")).find("input")[0]);
            chkFlag = false;
            $(e.closest("li")).find("input").prop("checked", false);
        }else{
            // menuAM.global.chkArr.push($(e.closest("li")).find("input")[0]);
            chkFlag = true;
            $(e.closest("li")).find("input").prop("checked", true);
        }

        /** 현재 클릭한 체크 박스의 상위 경로 체크 */
        var idPath = $(e).attr("idPath").split("|");
        for(var i = 0; i < idPath.length; i++){
            if(idPath[i] != ''){
                $("input[value=" + idPath[i] + "]").not( 'input[name=agiPk]' ).prop("checked", chkFlag);
            }
        }

        var idPath = $(e).attr("idPath").split("|");
        for(var i = 0; i < idPath.length; i++){
            if(idPath[i] != ''){
                if($(e).val() != idPath[i]){
                    $("input[value=" + idPath[i] + "][name='menuPkCheckBox']").prop("checked", true);
                }
            }
        }

        /**
         * 현재 클릭된 체크박스 체크 해제시 동일 노드에 체크된 체크박스 있어도 상위 노드 체크 해제되는 이슈로 인해
         * 체크박스 배열 루프 돌면서 상위 노드 재체크
         * */
        // console.log(menuAM.global.chkArr);
        // $.each(menuAM.global.chkArr, function(v, i){
        //     var arrIdPath = $(i).attr("idPath").split("|");
        //     if(i.checked){
        //         $.each(arrIdPath.filter(element => element != ""), function(vv, ii){
        //             console.log(arrIdPath[vv]);
        //             $("input[value=" + arrIdPath[vv] + "]").not( 'input[name=agiPk]' ).prop("checked", true);
        //         })
        //     }
        // })
    },

    getMenuAuthorityGroup(e){
        menuAM.global.searchAjaxData = {
            authorityGroupId : e
        };

        var result = customKendo.fn_customAjax("/system/getMenuAuthorityGroup.do", menuAM.global.searchAjaxData);
        if(result.flag){
            var authorityGrooup = result.rs.authorityGroup;
            var accessMenu = result.rs.accessMenu;
            $("#authorityGroupId").val(authorityGrooup.AUTHORITY_GROUP_ID);
            $("#authorityGroupName").val(authorityGrooup.AUTHORITY_GROUP_NAME);
            $("#authorityType").data("kendoDropDownList").value(authorityGrooup.AUTHORITY_TYPE);
            $("#active").data("kendoDropDownList").value(authorityGrooup.ACTIVE);
            $("#authorityGroupInfoTp").empty();
            $("#authorityGroupInfoTp").append('<tr>' +
                '	<th class="text-center th-color">최초 등록일</th>' +
                '	<td>' +
                '		<span id="regDt" name="regDt">'+authorityGrooup.REG_DT+'</span>' +
                '	</td>' +
                '	<th class="text-center th-color">최종 수정일</th>' +
                '	<td>' +
                '		<span id="modDt" name="modDt">'+authorityGrooup.MOD_DT+'</span>' +
                '	</td>' +
                '</tr>');

            $("#menuTreeView .k-checkbox-wrapper input").prop("checked", false).trigger("change");

            $.each($("input[name=menuPkCheckBox]"), function(e, i){
                $.each(accessMenu, function(ee, ii){
                    if($(i).val() == ii.MENU_ID){
                        $(i).prop("checked", true).trigger("change");
                    }
                })
            })
        }
    },

    inputReset : function(){
        $("#menuTreeView .k-checkbox-wrapper input").prop("checked", false).trigger("change");
        $("#authorityGroupId, #authorityGroupName").val("");
        $("#authorityType").data("kendoDropDownList").value("");
        $("#active").data("kendoDropDownList").value("");
        $("#authorityGroupInfoTp").empty();
    },

    setMenuAuthorityGroupDel : function(){
        if(confirm("권한그룹을 삭제하시겠습니까?\n권한 삭제 시 연결된 메뉴 및 사용자가 모두 초기화 됩니다.")){
            var agiAr = new Array();

            $.each($("input[name='agiPk']:checked"), function(e){
                agiAr.push($(this).val());
            })


            menuAM.global.searchAjaxData = {
                agiAr : agiAr
            };

            var result = customKendo.fn_customAjax("/system/setMenuAuthorityGroupDel.do", menuAM.global.searchAjaxData);
            if(result.flag){
                alert("권한 그룹이 삭제 되었습니다.");
                menuAM.gridReload();
            }else{
                alert("권한 그룹 삭제 중 에러가 발생했습니다.");
            }
        }
    },

    setMenuAuthorityGroup : function(){
        var flag = true;

        if(!$("#authorityGroupName").val()){
            alert("권한그룹 이름을 입력해주세요.");
            flag = false;
            return;
        }else if(!$("#authorityType").val()){
            alert("권한구분을 선택해주세요.");
            flag = false;
            return;
        }else if(!$("#active").val()){
            alert("사용유무를 선택해주세요.");
            flag = false;
            return;
        }

        if(confirm("저장하시겠습니까?")){
            if(flag){
                menuAM.global.searchAjaxData = {
                    authorityGroupId : $("#authorityGroupId").val(),
                    authorityGroupName : $("#authorityGroupName").val(),
                    authorityType : $("#authorityType").val(),
                    active : $("#active").val(),
                    loginEmpSeq : $("#loginEmpSeq").val()
                };

                var menuArr = new Array();
                $.each($("#menuTreeView  .k-item input[type=checkbox]:checked").closest(".k-item"), function(e, v){
                    var dataItem = $("#menuTreeView").data("kendoTreeView").dataItem($(v));
                    menuArr.push({
                        menuId : dataItem.MENU_ID,
                        loginEmpSeq : $("#loginEmpSeq").val()
                    });
                });

                menuAM.global.searchAjaxData.menuData = JSON.stringify(menuArr);

                var result = customKendo.fn_customAjax("/system/setMenuAuthorityGroup.do", menuAM.global.searchAjaxData);
                if(result.flag){
                    alert("메뉴권한이 저장 되었습니다.");
                    menuAM.gridReload();
                }else{
                    alert("메뉴권한 등록 중 에러가 발생했습니다.");
                }
            }else{
                alert("입력값을 확인해주세요.");
            }
        }
    }
}