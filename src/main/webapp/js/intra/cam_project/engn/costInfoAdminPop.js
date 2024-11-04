var costInfoPop = {

    openModal: function(){
        $("#yearEndDialog").data("kendoWindow").open();
    },

    yearEndPop: function(){
        const list = costInfoAdmin.global.allPjtList;
        const filterList = list.filter(item => item.TEAM_STAT == "N");
        const uniqueYear = [...new Set(filterList.map(item => item.YEAR))];

        let yearSetList = [];
        let yearList = [];

        if(uniqueYear.length >= 2){
            uniqueYear.sort((a, b) => a - b);
            yearList = uniqueYear.slice(0, -1);
            for(let i=0; i<yearList.length; i++){
                const yearData = {text: String(yearList[i])+"년", value: yearList[i]};
                yearSetList.push(yearData);
            }
            $("#costTempBtn").show();
        }

        $("#yearEndDialog").kendoWindow({
            title : "회계년도 마감",
            width: "700px",
            visible: false,
            modal: true,
            position: {
                top: 800,
                left: 500
            },
            open: function(){
                var htmlStr =
                    '<div class="mb-10" style="text-align: right;">' +
                    '	<button type="button" id="cmCodeCRSaveBtn" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-info" onclick="costInfoAdmin.fn_yearEnd()">마감</button>' +
                    '	<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-error" onclick="$(\'#yearEndDialog \').data(\'kendoWindow\').close()">닫기</button>' +
                    '</div>' +
                    '<table class="table table-bordered mb-0" style="margin-top: 10px">' +
                    '	<colgroup>' +
                    '		<col width="20%">' +
                    '		<col width="80%">' +
                    '	</colgroup>' +
                    '	<tbody>' +
                    '		<tr>' +
                    '			<th scope="row" class="text-center th-color" style="line-height:26px">마감년도 선택</th>' +
                    '			<td colspan="3">' +
                    '				<input id="targetYear" style="width: 140px"/>' +
                    '			</td>' +
                    '		</tr>' +
                    '	</tbody>' +
                    '</table>';

                $("#yearEndDialog").html(htmlStr);

                const tempYear = [
                    {text: "2024년", value: "2024"}
                ];

                $("#targetYear").kendoDropDownList({
                    dataTextField: "text",
                    dataValueField: "value",
                    dataSource: yearSetList,
                    index: 0
                });
            },

            close: function(){
                $("#yearEndDialog").empty();
            }
        });
    },

    fn_reqRegPopup: function (key){
        let url = "/payApp/pop/regPayAppCostPop.do?payAppSn=" + key + "&auth=mng&status=rev&reqType=costProcess";
        const name = "regPayAppPop";
        const option = "width = 1700, height = 820, top = 100, left = 400, location = no";
        window.open(url, name, option);
    },

    fn_reqClaiming : function(key){
        let url = "/purc/pop/reqClaiming.do";
        if(key != null && key != ""){
            url = "/purc/pop/reqClaiming.do?claimSn=" + key;
        }
        var name = "_blank";
        var option = "width = 1540, height = 840, top = 100, left = 400, location = no";
        window.open(url, name, option);
    },

    lectureTeamListPop: function(key){
        let url = "/projectUnRnd/lectureTeamListPop.do?pjtSn="+$("#pjtSn").val() + "&purcSn=" + key;
        const name = "lectureReqPop";
        const option = "width = 1250, height = 650, top = 100, left = 300, location = no";
        window.open(url, name, option);
    },

    payAppChoosePop: function(){
        let url = "/project/payAppChoosePop.do?pjtSn="+$("#pjtSn").val();
        const name = "payAppChoosePop";
        const option = "width = 1450, height = 650, top = 150, left = 400, location = no";
        window.open(url, name, option);
    },

    pjtAmtSetPop: function(){
        let url = "/project/pjtAmtSetPop.do?pjtSn="+$("#pjtSn").val();
        const name = "pjtAmtSetPop";
        const option = "width = 800, height = 689, top = 150, left = 400, location = no";
        window.open(url, name, option);
    }
}