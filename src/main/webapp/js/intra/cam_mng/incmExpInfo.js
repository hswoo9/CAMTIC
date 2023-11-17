var incmExpInfo = {

    global : {
        params : "",
        searchAjaxData : "",
    },

    fn_defaultScript : function (setParameters){
        incmExpInfo.global.params = setParameters;

        incmExpInfo.fn_makeBudgetTable();
    },

    fn_makeBudgetTable : function (){
        var date = new Date();
        var baseDate = date.getFullYear().toString() + date.getMonth().toString().padStart(2, '0') + date.getDate().toString().padStart(2, '0');

        incmExpInfo.global.searchAjaxData = {
            pjtSn : incmExpInfo.global.params.pjtCd,
            mgtSeq : incmExpInfo.global.params.pjtCd,
            baseDate : baseDate
        }
        var result = customKendo.fn_customAjax("/g20/getBudgetListDuplDel", incmExpInfo.global.searchAjaxData);
        if(result.flag) {
            var rs = result.list;
            var tblHtml = "";

            $("#bgtTblBody").empty();
            for(var i=0; i<rs.length; i++){
                tblHtml += '<tr>';
                tblHtml += '<td><span id="BGT_AT_' + rs[i].BGT_CD + '"></span></td>';
                tblHtml += '<td>' + rs[i].BGT1_NM + '</td>';
                tblHtml += '<td>' + rs[i].BGT2_NM + '</td>';
                if(rs[i].DIV_FG_NM == "항"){
                    tblHtml += '<td>' + rs[i].BGT_NM + '</td>';
                } else {
                    tblHtml += '<td></td>';
                }
                tblHtml += '<td style="text-align: right;">' + comma(rs[i].CALC_AM) + '</td>';
                tblHtml += '</tr>';
            }

            $("#bgtTblBody").append(tblHtml);

            incmExpInfo.global.radioGroupData = [
                { label: "수익", value: "1" },
                { label: "비용", value: "2" },
            ]

            $('[id*=BGT_AT_]').kendoRadioGroup({
                items: incmExpInfo.global.radioGroupData,
                layout: "horizontal",
                labelPosition: "after"
            });
        }
    },
}