var mailHistList = {

    global : {
        dropDownDataSource : "",
        searchAjaxData : "",
        saveAjaxData : "",
    },

    fn_defaultScript : function(){
        mailHistList.pageSet();
        mailHistList.gridReload();
    },

    pageSet : function(){
        const d = new Date();
        const bd = new Date(d.setMonth(d.getMonth() - 1)); // 이전달
        const bdStr = d.getFullYear() + "-" + ('0' + (bd.getMonth() +  1 )).slice(-2) + "-" + ('0' + bd.getDate()).slice(-2);
        customKendo.fn_datePicker("strDe", "depth", "yyyy-MM-dd", bdStr);
        customKendo.fn_datePicker("endDe", "depth", "yyyy-MM-dd", new Date());

        const dropDownDataSource1 = [
            { text: "제목", value: "A" },
            { text: "내용", value: "B" }
        ]
        customKendo.fn_dropDownList("searchKeyword", dropDownDataSource1, "text", "value");
        customKendo.fn_textBox(["searchValue"]);

        $("#strDe, #endDe").attr("readonly", true);
        $("#strDe").data("kendoDatePicker").bind("change", mailHistList.gridReload);
        $("#endDe").data("kendoDatePicker").bind("change", mailHistList.gridReload);
    },

    gridReload : function(){
        mailHistList.global.searchAjaxData = {
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

        mailHistList.mainGrid("/message/getMailHistList", mailHistList.global.searchAjaxData);
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
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-info" onclick="mailHistList.fn_mailReqPopup()">' +
                            '	<span class="k-button-text">메일발송</span>' +
                            '</button>';
                    }
                }, {
                    name: 'button',
                    template: function(){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="mailHistList.gridReload()">' +
                            '	<span class="k-button-text">조회</span>' +
                            '</button>';
                    }
                }
            ],
            columns: [
                {
                    title: "번호",
                    width: 50,
                    template: "#= --record #"
                }, {
                    field: "MAIL_TILE",
                    title: "제목",
                    width: 230
                }, {
                    field: "SEND_DATE",
                    title: "발신일",
                    width: 150,
                }, {
                    field: "REG_EMP_NAME",
                    title: "발송자",
                    width: 230
                }, {
                    field: "",
                    title: "등록",
                    width: 70
                }, {
                    field: "",
                    title: "발송",
                    width: 70
                }, {
                    field: "",
                    title: "실패",
                    width: 70
                }, {
                    title: "처리 명령",
                    width: 230,
                    template: function(row){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" style="margin-right: 5px" onclick="mailHistList.fn_mailDetPopup('+row.MAIL_HIST_SN+')">' +
                            '	<span class="k-button-text">주소등록</span>' +
                            '</button>'
                            +
                            '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="mailHistList.fn_mailReqPopup('+row.MAIL_HIST_SN+')">' +
                            '	<span class="k-button-text">미리보기</span>' +
                            '</button>';
                    }
                }
            ],
            dataBinding: function(){
                record = fn_getRowNum(this, 2);
            }
        }).data("kendoGrid");
    },

    fn_mailReqPopup: function(mailHistSn){
        let url = "/system/pop/mailReqPop.do";
        if(mailHistSn != null && mailHistSn != ""){
            url += "?mailHistSn="+mailHistSn;
        }
        const name = "mailReqPop";
        const option = "width = 720, height = 666, top = 100, left = 300, location = no";
        window.open(url, name, option);
    },

    fn_mailDetPopup: function(mailHistSn){
        let url = "/system/pop/mailDetPop.do";
        if(mailHistSn != null && mailHistSn != ""){
            url += "?mailHistSn="+mailHistSn;
        }
        const name = "mailReqPop";
        const option = "width = 1080, height = 588, top = 100, left = 300, location = no";
        window.open(url, name, option);
    }
}