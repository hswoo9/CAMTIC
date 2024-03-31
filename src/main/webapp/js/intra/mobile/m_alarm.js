var mAlarm = {
    global : {

    },

    fn_defaultScript : function() {
        mAlarm.getAlarmList();
    },

    getAlarmList : function(){
        var result = customKendo.fn_customAjax("/common/getAlarmList.do");
        if(result.flag){
            var rs = result.rs;
            var html = "";
            $("#alarmListDiv a").remove();
            if(rs.length > 0){
                for(var i = 0; i < rs.length; i++) {
                    if(rs[i].URL.indexOf("/approval/approvalDocView.do") > -1){
                        html += '' +
                        '<a href="javascript:void(0)" onclick="mAlarm.moveToApprovalDocView(\'' + rs[i].URL + '\')">' +
                            '<font class="txt type18 time">' + rs[i].REG_DATE + '</font>' +
                            '<font class="txt type30 fP800 mt10 tit">' + rs[i].TITLE + '</font>' +
                            '<font class="txt type22 mt10 cate">' + rs[i].CONTENT + '</font>' +
                            '<font class="txt type22 mt10 cate">홈 > 전자결재</font>' +
                        '</a>';
                    }
                }
            }else{
                html += '' +
                    '<a href="#">' +
                        '<font class="txt type30 fP800 mt10 tit">알림이 없습니다.</font>' +
                    '</a>';
            }

            $("#alarmListDiv").html(html);
        }
    },

    moveToApprovalDocView : function(e){
        var data = {};
        var query = e.split('?')[1];
        $.each(query.split("&"), function(i, e){
            data[e.split("=")[0]] = e.split("=")[1];
        })

        location.href = '/m/payment_view.do?docId=' + data.docId + '&mod=V&approKey=' + data.approKey + '&menuCd=' + data.menuCd + '&mDocType=STR';
    }
}