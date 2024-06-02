var messageHistList = {

    global : {
        dropDownDataSource : "",
        searchAjaxData : "",
        saveAjaxData : "",
    },

    fn_defaultScript : function(){
        messageHistList.pageSet();
        messageHistList.gridReload();
    },

    pageSet : function(){
        const d = new Date();
        const bd = new Date(d.setMonth(d.getMonth() - 1)); // 이전달
        const bdStr = d.getFullYear() + "-" + ('0' + (bd.getMonth() +  1 )).slice(-2) + "-" + ('0' + bd.getDate()).slice(-2);
        customKendo.fn_datePicker("strDe", "depth", "yyyy-MM-dd", bdStr);
        customKendo.fn_datePicker("endDe", "depth", "yyyy-MM-dd", new Date());

        const dropDownDataSource = [
            { text: "SMS", value: "SMS" },
            { text: "MMS", value: "MMS" }
        ]
        customKendo.fn_dropDownList("searchType", dropDownDataSource, "text", "value", 3);

        const dropDownDataSource1 = [
            { text: "제목", value: "A" },
            { text: "내용", value: "B" }
        ]
        customKendo.fn_dropDownList("searchKeyword", dropDownDataSource1, "text", "value");
        customKendo.fn_textBox(["searchValue"]);

        $("#strDe, #endDe").attr("readonly", true);
        $("#strDe").data("kendoDatePicker").bind("change", messageHistList.gridReload);
        $("#endDe").data("kendoDatePicker").bind("change", messageHistList.gridReload);
        $("#searchType").data("kendoDropDownList").bind("change", messageHistList.gridReload);
    },

    gridReload : function(){
        messageHistList.global.searchAjaxData = {
            strDe : $("#strDe").val(),
            endDe : $("#endDe").val(),
            empSeq : $("#regEmpSeq").val(),
            regEmpSeq : $("#regEmpSeq").val(),
            searchType : $("#searchType").val(),
            searchKeyword : $("#searchKeyword").val(),
            searchValue : $("#searchValue").val(),
        }

        if($("#regEmpSeq").val() == "") {
            return;
        }

        messageHistList.mainGrid("/message/getMessageHistList", messageHistList.global.searchAjaxData);
    },

    mainGrid : function(url, params){
        $("#messageHistGrid").kendoGrid({
            dataSource: customKendo.fn_gridDataSource2(url, params),
            sortable: true,
            selectable: "row",
            height: 525,
            pageable: {
                refresh: true,
                pageSizes : [ 10, 20, 50, "ALL" ],
                buttonCount: 5
            },
            noRecords: {
                template: "데이터가 존재하지 않습니다."
            },
            toolbar: [
                {
                    name: 'button',
                    template: function(){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="messageHistList.gridReload()">' +
                            '	<span class="k-button-text">조회</span>' +
                            '</button>';
                    }
                }],
            columns: [
                {
                    title: "번호",
                    width: 50,
                    template: "#= --record #"
                }, {
                    field: "TYPE",
                    title: "문자유형",
                    width: 90
                }, {
                    field: "SUBJECT",
                    title: "제목",
                    width: 150,
                }, {
                    field: "MSG",
                    title: "내용",
                    width: 280,
                    template: function(e){
                        return '<div style="cursor: pointer; font-weight: bold">'+e.MSG+'</div>';
                    }
                }, {
                    title: "전송날짜",
                    field: "SEND_DATE",
                    width: 150
                }, {
                    title: "받은사람",
                    width: 240,
                    field: "APP_DE",
                    template: function(e){
                        let returnHtml = '';
                        const destArr = e.DEST_INFO.split("|");
                        for(let i=0; i<destArr.length; i++){
                            if(i != 0){
                                returnHtml += ", ";
                            }
                            const destMap = destArr[i];
                            const destData = destMap.replace("^", "");
                            returnHtml += destData;
                        }
                        return returnHtml;
                    }
                }
            ],
            dataBinding: function(){
                record = fn_getRowNum(this, 2);
            }
        }).data("kendoGrid");
    }
}