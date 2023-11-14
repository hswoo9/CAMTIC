var mouAgr = {

    global : {
        dropDownDataSource : "",
        searchAjaxData : "",
        saveAjaxData : "",
        subAjaxData : "",
    },

    fn_defaultScript : function (){
        mouAgr.fn_mainGridReload();
        mouAgr.fn_subGridReload();
    },

    fn_mainGridReload: function (){
        mouAgr.global.searchAjaxData = {

        }

        mouAgr.mainGrid("/crm/getMouAgrList", mouAgr.global.searchAjaxData);
    },

    mainGrid: function(url, params){
        $("#mainGrid").kendoGrid({
            dataSource: customKendo.fn_gridDataSource2(url, params),
            sortable: true,
            selectable: "row",
            height: 508,
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
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="mouAgr.gridReload()">' +
                            '	<span class="k-button-text">조회</span>' +
                            '</button>';
                    }
                }, {
                    name: 'button',
                    template: function(){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-info" onclick="mouAgr.fn_mouAgrRegPopup()">' +
                            '	<span class="k-button-text">MOU 등록</span>' +
                            '</button>';
                    }
                }, {
                    name: 'button',
                    template: function(){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-error" onclick="mouAgr.setMouAgrDel()">' +
                            '	<span class="k-button-text">삭제</span>' +
                            '</button>';
                    }
                }, {
                    name : 'excel',
                    text: '엑셀다운로드'
                }
            ],
            excel : {
                fileName : "MOU 협약 목록.xlsx",
                filterable : true
            },
            columns: [
                {
                    headerTemplate: '<input type="checkbox" id="checkAll" name="checkAll" style="top: 3px; position: relative" />',
                    template : "<input type='checkbox' id='mou#=MOU_AGR_SN#' name='mouAgrSn' value='#=MOU_AGR_SN#' style=\"top: 3px; position: relative\" />",
                    width: 30,
                },{
                    title: "순번",
                    template: "#= --record #",
                    width: 30
                }, {
                    title: "체결일자",
                    field: "MOU_AGR_ST_DT",
                    width: 50
                }, {
                    title: "체결목적",
                    field: "MOU_AGR_PURPOSE",
                    width: 160,
                    template: function(e){
                        return "<a href='javascript:void(0);' style='font-weight: bold' onclick='mouAgr.fn_mouAgrRegPopup("+e.MOU_AGR_SN+")'>" + e.MOU_AGR_PURPOSE + "</a>";
                    }
                }, {
                    title: "협약서 첨부",
                    width: 50,
                    template: function(e){
                        if(e.FILE_CNT > 0){
                            return "<button class='k-icon k-i-paperclip k-button-icon' style='border: none; background-color: transparent;'></button>"
                        } else {
                            return "";
                        }
                    }
                }, {
                    title: "체결기관",
                    width: 50,
                    template: function(e){
                        return "<button type='button' class='k-grid-button k-button k-button-md k-button-solid k-button-solid-base' onclick='mouAgr.fn_subGridReload("+e.MOU_AGR_SN+")'>" +
                               "	<span class='k-button-text'>조회</span>" +
                               "</button>";
                    }
                },
            ],
            dataBinding: function(){
                record = fn_getRowNum(this, 3);
            }
        }).data("kendoGrid");

        $("#checkAll").click(function(){
            if($(this).is(":checked")) $("input[name=mouAgrSn]").prop("checked", true);
            else $("input[name=mouAgrSn]").prop("checked", false);
        });
    },

    subGrid: function(url, params){
        $("#subGrid").kendoGrid({
            dataSource: customKendo.fn_gridDataSource2(url, params),
            sortable: true,
            selectable: "row",
            height: 508,
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
                    template: function(e){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="mouAgr.fn_popCamCrmList()">' +
                            '	<span class="k-button-text">추가</span>' +
                            '</button>';
                    }
                }, {
                    name: 'button',
                    template: function(){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="mouAgr.setMouCrmDel()">' +
                            '	<span class="k-button-text">삭제</span>' +
                            '</button>';
                    }
                },
            ],
            columns: [
                {
                    headerTemplate: '<input type="checkbox" id="subCheckAll" name="checkAll" style="top: 3px; position: relative" />',
                    template : "<input type='checkbox' id='mouCrm#=MOU_CRM_SN#' name='mouCrmSn' value='#=MOU_CRM_SN#' style=\"top: 3px; position: relative\" />",
                    width: 30,
                }, {
                    title: "순번",
                    template: "#= --record #",
                    width: 30
                }, {
                    title: "체결기관",
                    field: "CRM_NM",
                    width: 120
                },
            ],
            dataBinding: function(){
                record = fn_getRowNum(this, 3);
            }
        }).data("kendoGrid");

        $("#subCheckAll").click(function(){
            if($(this).is(":checked")) $("input[name=mouCrmSn]").prop("checked", true);
            else $("input[name=mouCrmSn]").prop("checked", false);
        });
    },

    setMouAgrDel : function(){
        if($("input[name='mouAgrSn']:checked").length == 0){
            alert("삭제할 협약을 선택해주세요.");
            return
        }

        if(confirm("선택한 협약을 삭제하시겠습니까?")){
            var mouAgrSn = "";

            $.each($("input[name='mouAgrSn']:checked"), function(){
                mouAgrSn += "," + $(this).val()
            })

            mouAgr.global.saveAjaxData = {
                empSeq : $("#empSeq").val(),
                mouAgrSn : mouAgrSn.substring(1)
            }

            var result = customKendo.fn_customAjax("/crm/setMouAgrSnDel", mouAgr.global.saveAjaxData);
            if(result.flag){
                alert("처리되었습니다.");
                mouAgr.fn_mainGridReload();
            }
        }
    },

    fn_mouAgrRegPopup : function (key){
        var url = "/crm/pop/regMouAgrPop.do";
        if(key != null && key != ""){
            url += "?mouArgSn=" + key;
        }
        var name = "_blank";
        var option = "width = 1080, height = 520, top = 100, left = 400, location = no"
        var popup = window.open(url, name, option);
    },

    fn_subGridReload : function (key){
        mouAgr.global.subAjaxData = {
            mouAgrSn : key
        }

        mouAgr.subGrid("/crm/getMouCrmList", mouAgr.global.subAjaxData);
    },

    fn_popCamCrmList : function (){
        var key = mouAgr.global.subAjaxData.mouAgrSn;
        if(key == null || key == ''){
            alert('MOU 협약을 선택해주세요.');
            return;
        }

        var url = "/crm/pop/popCrmList.do?status=mou&key=" + key;
        var name = "_blank";
        var option = "width = 1300, height = 670, top = 200, left = 400, location = no"
        var popup = window.open(url, name, option);
    },

    setMouCrmDel : function(){
        var key = mouAgr.global.subAjaxData.mouAgrSn;
        if(key == null || key == ''){
            alert('MOU 협약을 선택해주세요.');
            return;
        }

        if($("input[name='mouCrmSn']:checked").length == 0){
            alert("삭제할 체결기관을 선택해주세요.");
            return
        }

        if(confirm("선택한 체결기관을 삭제하시겠습니까?")){
            var mouCrmSn = "";

            $.each($("input[name='mouCrmSn']:checked"), function(){
                mouCrmSn += "," + $(this).val()
            })

            mouAgr.global.saveAjaxData = {
                empSeq : $("#empSeq").val(),
                mouCrmSn : mouCrmSn.substring(1),
                mouAgrSn : key
            }

            var result = customKendo.fn_customAjax("/crm/setMouCrmSnDel", mouAgr.global.saveAjaxData);
            if(result.flag){
                alert("처리되었습니다.");
                mouAgr.fn_subGridReload(key);
            }
        }
    },
}

function gridReload(){
    mouAgr.fn_mainGridReload();
    mouAgr.fn_subGridReload();
}