var placeChangePop = {

    global: {
        dropDownDataSource : "",
        searchAjaxData : "",
        saveAjaxData : "",
    },

    fn_defaultScript: function () {
        placeChangePop.global.dropDownDataSource = customKendo.fn_customAjax("/asset/getAssetPlaceList", {});
        placeChangePop.global.dropDownDataSource.rs.unshift({
            AST_PLACE_NAME : "설치장소",
            AST_PLACE_SN : "",
        })
        $("#newAssetPlaceSn").kendoDropDownList({
            dataTextField: "AST_PLACE_NAME",
            dataValueField: "AST_PLACE_SN",
            dataSource: placeChangePop.global.dropDownDataSource.rs,
            index: 0
        });
    },

    setAstPdaInfoBatch : function(){
        placeChangePop.global.saveAjaxData = {
            astPdaInfoSn : $("#astPdaInfoSn").val(),
            newAssetPlaceSn : $("#newAssetPlaceSn").val(),
            regEmpSeq : $("#regEmpSeq").val(),
            regEmpName : $("#regEmpName").val()
        }

        if(confirm("선택한 자산 정보를 일괄변경하시겠습니까?")){
            var result = customKendo.fn_customAjax('/asset/setAstPdaInfoBatch.do', placeChangePop.global.saveAjaxData);
            if(result.flag){
                alert("변경되었습니다.");
                opener.parent.astPdaInfoList.gridReload();
                window.close();
            }
        }
    }
}


