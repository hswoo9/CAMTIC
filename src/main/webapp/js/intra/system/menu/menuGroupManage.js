var menuGM = {

    global : {
        usersArr : new Array(),
        authorityUserArr : new Array(),
        windowPopUrl : "",
        popName : "",
        popStyle : "",


        searchAjaxData : "",
    },

    fn_defaultScript : function() {
        $("#authorityTabStrip, #authorityEditorTabStrip").kendoTabStrip({
            animation:  {
                open: {
                    effects: "fadeIn"
                }
            }
        });

        menuGM.gridReload();
        menuGM.subGrid();

        customKendo.fn_textBox(["searchContent", 'searchUserName']);
    },

    gridReload : function(){
        menuGM.global.searchAjaxData = {
            searchContent : $("#searchContent").val(),
        }
        menuGM.mainGrid("/system/getMenuAuthorityGroupList.do", menuGM.global.searchAjaxData);
    },

    mainGrid : function(url, params){
        $("#mainGrid").kendoGrid({
            dataSource: customKendo.fn_gridDataSource3(url, params, 13),
            height: 637,
            sortable: true,
            scrollable: false,
            pageable: {
                refresh: true,
                pageSizes : [ 10, 20, 50, "ALL" ],
                buttonCount: 5
            },
            noRecords: {
                template: "데이터가 존재하지 않습니다."
            },
            toolbar : [
                {
                    name: 'button',
                    template: function (e) {
                        return "그룹명 <input type='text' id='searchContent' name='searchContent' onkeypress='if(window.event.keyCode==13){menuGM.gridReload()}'>" +
                            "<button type='button' class='k-button k-button-md k-button-solid k-button-solid-base' onclick='menuGM.gridReload()'>" +
                            "<span class='k-button-text'>조회</span>" +
                            "</button>"
                    }
                }
            ],
            noRecords: {
                template: "데이터가 존재하지 않습니다."
            },
            dataBound : menuGM.onDataBound,
            columns: [
                {
                    field: "AUTHORITY_GROUP_NAME",
                    title: "권한그룹 이름",
                },{
                    field: "CM_CODE_NM",
                    title: "권한 구분",
                    width: 200
                }]
        }).data("kendoGrid");
    },

    onDataBound(){
        var grid = this;

        grid.tbody.find("tr").dblclick(function (e) {
            var dataItem = grid.dataItem($(this));
            $("#authorityGroupId").val(dataItem.AUTHORITY_GROUP_ID);
            $("#authorityGroupName").text(dataItem.AUTHORITY_GROUP_NAME);
            menuGM.subGrid();
        });
    },

    subGrid : function(){
        var subGridDataSource = new kendo.data.DataSource({
            serverPaging: false,
            transport: {
                read : {
                    url : getContextPath() + '/system/getAuthorityGroupUserList.do',
                    dataType : "json",
                    type : "post",
                    async : false
                },
                parameterMap: function(data, operation) {
                    data.searchUserName = $("#searchUserName").val();
                    data.authorityGroupId = $("#authorityGroupId").val();
                    return data;
                },
            },
            schema : {
                data : function (data) {
                    menuGM.global.authorityUserArr = [];
                    menuGM.global.usersArr = [];
                    $.each(data.rs, function(i, v){
                        var result = {
                            authorityGrantId : String(this.AUTHORITY_GRANT_ID),
                            authorityGroupId : this.AUTHORITY_GROUP_ID,
                            empSeq : this.EMP_SEQ,
                            empName : this.EMP_NAME,
                            loginId : this.LOGIN_ID,
                            deptSeq : this.DEPT_SEQ,
                            deptName : this.DEPT_NAME,
                            positionName : this.POSITION_NAME,
                            dutyName : this.DUTY_NAME,
                            authorityDate : this.AUTHORITY_DATE,
                            regEmpSeq : $("#empSeq").val()
                        }
                        menuGM.global.usersArr.push(result);
                        menuGM.global.authorityUserArr.push(result);
                    })

                    return data.rs;
                }
            }
        });

        $("#subGrid").kendoGrid({
            dataSource: subGridDataSource,
            height: 627,
            sortable: false,
            scrollable: false,
            toolbar : [
                {
                    name: 'button',
                    template: function (e) {
                        return "권한그룹 : <p style='margin-right: auto;' id='authorityGroupName'></p>" +
                            "<input type='hidden' id='authorityGroupId' name='authorityGroupId'>"
                    }
                }, {
                    name: 'button',
                    template: function (e) {
                        return "<input type='text' id='searchUserName' name='searchUserName' onkeypress='if(window.event.keyCode==13){menuGM.subGrid();}' placeholder='사용자명' style='margin-right: 0'>" +
                            "<button type='button' class='k-button k-button-md k-button-solid k-button-solid-base' onclick='menuGM.subGrid();'>" +
                            "<span class='k-button-text'>조회</span>" +
                            "</button>"
                    }
                }, {
                    name: 'button',
                    template: function (e) {
                        return "<button type='button' class='k-button k-button-md k-button-solid k-button-solid-base' onclick='menuGM.userMultiplePop()'>" +
                            "<span class='k-button-text'>사용자 선택</span>" +
                            "</button>";
                    }
                }, {
                    name: 'button',
                    template: function (e) {
                        return "<button type='button' class='k-button k-button-md k-button-solid k-button-solid-info' onclick='menuGM.setAuthorityGroupUser()'>" +
                            "<span class='k-button-text'>저장</span>" +
                            "</button>";
                    }
                }, {
                    name: 'button',
                    template: function (e) {
                        return "<button type='button' class='k-button k-button-md k-button-solid k-button-solid-error' onclick='menuGM.setAuthorityGroupUserDel()'>" +
                            "<span class='k-button-text'>삭제</span>" +
                            "</button>";
                    }
                }

            ],
            noRecords: {
                template: "데이터가 존재하지 않습니다."
            },
            columns: [
                {
                    headerTemplate: '<input type="checkbox" id="checkAll" name="checkAll" class="k-checkbox checkbox"/>',
                    template : "<input type='checkbox' id='aguPk#=AUTHORITY_GRANT_ID#' name='aguPk' value='#=AUTHORITY_GRANT_ID#' class='k-checkbox checkbox'/>",
                    width : 20
                }, {
                    field: "DEPT_NAME",
                    title: "부서명",
                    width: 180
                }, {
                    field: "POSITION_NAME",
                    title: "직급",
                    width: 100
                }, {
                    field: "DUTY_NAME",
                    title: "직책",
                    width: 100
                }, {
                    field: "EMP_NAME_ID",
                    title : "사용자명(ID)",
                    width: 180
                }, {
                    field: "AUTHORITY_DATE",
                    title : "권한 부여일",
                    width: 160,
                    template : function(e){
                        if(e.AUTHORITY_DATE != null){
                            return "<input type='text' id='authorityDate' name='authorityDate' class='authorityDate' value='" + e.AUTHORITY_DATE + "'>";
                        }else{
                            return "<input type='text' id='authorityDate' name='authorityDate' class='authorityDate' value=''>";
                        }
                    }
                }]
        }).data("kendoGrid");

        $("#checkAll").click(function () {
            if ($(this).is(":checked")) $("input[name=aguPk]").prop("checked", true);
            else $("input[name=aguPk]").prop("checked", false);
        });

        $(".authorityDate").kendoDatePicker({
            format : "yyyy-MM-dd",
            culture : "ko-KR",
        });

        $(".authorityDate").attr("readonly", true);
    },

    userMultiplePop : function(){
        if(!$("#authorityGroupId").val()){
            alert("사용자를 추가할 권한그룹을 선택해주세요.");
            return;
        }

        /** TODO. 사용자 선택 팝업 없는 것 같음 */
        var url = "/user/pop/userMultiSelectPop.do";
        var name = "userMultiSelectPop";
        var option = "width=1365, height=647, scrollbars=no, top=100, left=200, resizable=no, toolbars=no, menubar=no"

        window.open(url, name, option);
    },

    userMultiplePopClose : function(e){
        menuGM.global.usersArr = e;
        /** 부서별 메뉴 권한 추가는 예약기능을 사용할 수 없음 */

        for(var i = 0; i < menuGM.global.usersArr.length; i++){
            if(menuGM.global.authorityUserArr.filter(element => element.empSeq === menuGM.global.usersArr[i].empSeq).length == 0){
                menuGM.global.usersArr[i].authorityGrantId = "";
                menuGM.global.usersArr[i].authorityGroupId = $("#authorityGroupId").val();
                menuGM.global.authorityUserArr.push(menuGM.global.usersArr[i]);
            }
        }

        for(var i = 0; i < menuGM.global.authorityUserArr.length; i++){
            if(menuGM.global.authorityUserArr[i].authorityGrantId == ""){
                $("#subGrid").data("kendoGrid").dataSource.add({
                    AUTHORITY_GRANT_ID : menuGM.global.authorityUserArr[i].authorityGrantId,
                    DEPT_NAME : menuGM.global.authorityUserArr[i].deptName,
                    POSITION_NAME : menuGM.global.authorityUserArr[i].positionName,
                    DUTY_NAME : menuGM.global.authorityUserArr[i].dutyName,
                    EMP_SEQ : menuGM.global.authorityUserArr[i].empSeq,
                    EMP_NAME_ID : menuGM.global.authorityUserArr[i].empName + "(" + menuGM.global.authorityUserArr[i].loginId + ")",
                    AUTHORITY_DATE : menuGM.global.authorityUserArr[i].authorityDate
                });

                $(".authorityDate").kendoDatePicker({
                    format : "yyyy-MM-dd",
                    culture : "ko-KR",
                });
            }
        }
    },

    setAuthorityGroupUser : function(){
        if(confirm("저장하시겠습니까?")){
            var flag = true;

            $.each($("input[name='authorityDate']"), function(e, i){
                var dataItem = $("#subGrid").data("kendoGrid").dataItem($(this).closest("tr"));
                $.each(menuGM.global.authorityUserArr, function(ee, ii){
                    if(dataItem.EMP_SEQ == ii.empSeq){
                        if($(i).val() == ""){
                            flag = false;
                        }else{
                            ii.authorityDate = $(i).val()
                        }

                        if(new Date(ii.authorityDate) <= new Date()){
                            ii.active = "Y"
                        }else{
                            ii.active = "N"
                        }
                    }
                })

                if(!flag){
                    return;
                }
            })

            if(!flag){
                alert("권한 부여일을 입력하지 않은 사용자가 있습니다.");
                return;
            }

            menuGM.global.searchAjaxData = {
                authorityUserArr : JSON.stringify(menuGM.global.authorityUserArr)
            };

            var result = customKendo.fn_customAjax("/system/setAuthorityGroupUser.do", menuGM.global.searchAjaxData);
            if(result.flag){
                alert("권한이 저장 되었습니다.");
                menuGM.subGrid();
            }else{
                alert("권한 등록 중 에러가 발생했습니다.");
            }
        }
    },

    setAuthorityGroupUserDel : function(){
        if(confirm("선택한 사용자의 권한을 삭제하시겠습니까?")){
            var aguAr = new Array();

            $.each($("input[name='aguPk']:checked"), function(e){
                aguAr.push($(this).val());
            })

            menuGM.global.searchAjaxData = {
                aguAr : aguAr
            };

            var result = customKendo.fn_customAjax("/system/setAuthorityGroupUserDel.do", menuGM.global.searchAjaxData);
            if(result.flag){
                alert("사용자 권한이 삭제 되었습니다.");
                menuGM.subGrid();
            }else{
                alert("사용자 권한 삭제 중 에러가 발생했습니다.");
            }
        }
    }
}