var insideInit = {

    inComeInit: function(documentSn){
        const pjtInfo = customKendo.fn_customAjax("/inside/getInComeUpdateList", {documentSn: documentSn});
        const map = pjtInfo.data;
        console.log("map : ", map)

        /** 1. 접수대장 정보 */
        hwpDocCtrl.putFieldText("INCOME_NUM", map.DOCUMENT_FIRST_NUMBER+"-"+map.DOCUMENT_SECOND_NUMBER);
        hwpDocCtrl.putFieldText("documentTitleName", map.DOCUMENT_TITLE_NAME);
        hwpDocCtrl.putFieldText("shipmentDt", map.SHIPMENT_DATE);
        hwpDocCtrl.putFieldText("effectiveDt", map.EFFECTIVE_DATE);
        hwpDocCtrl.putFieldText("receiveName", map.RECEIVE_NAME);
        hwpDocCtrl.putFieldText("empName", map.MANAGER_NAME);
        hwpDocCtrl.putFieldText("deptPart", map.DEPT_PART_TYPE);

        if(map.file_no > 0){
            hwpDocCtrl.putFieldText("file_org_name", map.file_org_name);
            hwpDocCtrl.putFieldText("file_ext", map.file_ext);
            hwpDocCtrl.putFieldText("file_size", map.file_size == 0 ? "0" : comma(map.file_size));
        }

        /** 특이사항 */
        setTimeout(function() {
            hwpDocCtrl.putFieldText("remarkCn", "");
            hwpDocCtrl.moveToField("remarkCn", true, true, false);
            hwpDocCtrl.setTextFile('<span style="font-family:굴림체;">' + map.REMARK_CN.replaceAll("\n", "<br>") + '</span>', "html","insertfile");
        }, 1000);
    }
}