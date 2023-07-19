var draftFormList = {
    global: {
        formList: "",
        searchAjaxData: "",
        draftParam: "",
        windowPopUrl: "",
        popName: "",
        popStyle: "",
    },

    fn_DefaultScript: function(params){
        draftFormList.dataSet(params);
        draftFormList.mainTree(params);
    },

    dataSet: function(params){
        draftFormList.global.formList = params;
        customKendo.fn_textBox(['formSearch']);
    },

    mainTree: function(params){
        let mainTree = $("#formTreeViewDiv").kendoTreeView({
            dataSource: params,
            dataTextField:['FORM_NAME'],
            select: draftFormList.treeClick,
        });
    },

    treeClick: function(e){
        var item = $("#formTreeViewDiv").data("kendoTreeView").dataItem(e.node);
        draftFormList.global.searchAjaxData = {
            formId : item.FORM_ID
        }

        var result = customKendo.fn_customAjax("/approval/getDocFormReqOpt", draftFormList.global.searchAjaxData);
        if(result.flag){
            console.log("draftFormList");
            console.log(result);
            $("#formDetailDiv *").remove();
            var htmlStr = "";
            htmlStr += "<table id=\"formItemInfo\" class=\"table table-bordered\" style=\"border: 1px solid #dcdcdc; background-color: white;\">" +
                "   <colgroup>" +
                "       <col width=\"15%\">" +
                "   </colgroup>" +
                "   <tbody>" +
                "       <tr>" +
                "           <th class=\"text-center th-color\">양식명</th>" +
                "           <td id=\"formName\">" +
                                result.formInfoReqOpt.FORM_NAME +
                "           </td>" +
                "       </tr>" +
                "       <tr>" +
                "           <th class=\"text-center th-color\">양식종류</th>";
            if(result.formInfoReqOpt.LINKAGE_TYPE == 1){
                htmlStr += "           <td id=\"formLinkageType\">일반문서</td>";
            }else{
                htmlStr += "           <td id=\"formLinkageType\">시스템연동문서</td>";
            }
            htmlStr += "       </tr>" +
                "   </tbody>" +
                "</table>" +
                "<input type=\"button\" class=\"k-button k-button-md k-button-solid k-button-solid-base\" style='float: right;' id=\"formDraftBtn\" value=\"기안하기\" onclick='draftFormList.formDraftPop()' />";
            $("#formDetailDiv").append(htmlStr);

            draftFormList.global.draftParam = {
                mod: "W",
                formId: result.formInfoReqOpt.FORM_ID,
                compSeq: "1000",
                empSeq: $("#regEmpSeq").val(),
                type: "drafting",
                menuCd: "normal",
                docType: "A",
                linkageProcessId: result.formInfoReqOpt.LINKAGE_PROCESS_ID,
                linkageType: result.formInfoReqOpt.LINKAGE_TYPE,
                linkagePopActive: result.formInfoReqOpt.LINKAGE_POP_ACTIVE,
                linkagePopWidth: result.formInfoReqOpt.LINKAGE_POP_WIDTH,
                linkagePopHeight: result.formInfoReqOpt.LINKAGE_POP_HEIGHT
            }
        }
    },

    getDraftFormSearch: function(){
        var query = $("#formSearch").val();
        var dataSource = $("#formTreeViewDiv").data("kendoTreeView").dataSource;
        draftFormList.filter(dataSource, query);
    },

    filter: function(dataSource, query){
        var hasVisibleChildren = false;
        var data = dataSource instanceof kendo.data.HierarchicalDataSource && dataSource.data();

        for(var i = 0; i < data.length; i++){
            var item = data[i];
            var text = item.FORM_NAME;
            var itemVisible = query === true || query === "" || text.indexOf(query) >= 0;

            var anyVisibleChildren = draftFormList.filter(item.children, itemVisible || query);

            hasVisibleChildren = hasVisibleChildren || anyVisibleChildren || itemVisible;

            item.hidden = !itemVisible && !anyVisibleChildren;
        }

        if(data){
            dataSource.filter({ field: "hidden", operator: "neq", value: true });
        }

        return hasVisibleChildren;
    },

    formDraftPop: function(){
        if(draftFormList.global.draftParam.linkagePopActive == "Y"){
            draftFormList.global.searchAjaxData = {
                linkageProcessId : draftFormList.global.draftParam.linkageProcessId
            }

            var result = customKendo.fn_customAjax("/approval/getDocFormLinkagePopUrl", draftFormList.global.searchAjaxData)
            if(result.flag){
                console.log(result);
                if(result.LINKAGE_PROCESS_POPUP_URL != null && result.LINKAGE_PROCESS_POPUP_URL != ""){
                    window.open(
                        result.LINKAGE_PROCESS_POPUP_URL,
                        result.LINKAGE_PROCESS_NAME,
                        'scrollbars=yes, resizeble=yes, menubar=no, toolbar=no, location=no, directories=yes, status=yes, width=' + draftFormList.global.draftParam.linkagePopWidth + ', height=' + draftFormList.global.draftParam.linkagePopHeight);
                }else{
                    alert("신청 팝업 주소를 찾을 수 없습니다.");
                }
            }
        }else{
            linkageProcessOn(draftFormList.global.draftParam, "target");
        }
    }
}