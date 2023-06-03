var employmentReq = {
    global : {
        now : new Date(),
        params  : "",
        data : "",
        searchAjaxData : "",
        saveAjaxData : "",
        hwpCtrl : "",
    },

    init : function(params){
        employmentReq.drawCell();
        employmentReq.mainGrid();
    },

    mainGrid : function() {
        var dataSource = new kendo.data.DataSource({
            serverPaging: false,
            transport: {
                read : {
                    url : '',
                    dataType : "json",
                    type : "post"
                },
                parameterMap: function(data, operation) {
                    return data;
                }
            },
            schema : {
                data: function (data) {
                    return data;
                },
                total: function (data) {
                    return data.length;
                },
            },
            pageSize: 10,
        });

        $("#mainGrid").kendoGrid({
            dataSource: dataSource,
            sortable: true,
            scrollable: true,
            selectable: "row",
            height: 489,
            pageable : {
                refresh : true,
                pageSizes : [ 10, 20, 30, 50, 100 ],
                buttonCount : 5
            },
            toolbar : [
                {
                    name : 'button',
                    template : function (e){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-rounded-md k-button-solid k-button-solid-base" onclick="">' +
                            '	<span class="k-button-text">파일첨부</span>' +
                            '</button>';
                    }
                }
            ],
            noRecords: {
                template: "데이터가 존재하지 않습니다."
            },
            columns: [
                {
                    field: "",
                    title: "번호",
                    width: "25%"
                }, {
                    field: "",
                    title: "파일명",
                    width: "25%"
                }, {
                    field: "",
                    title: "날짜",
                    width: "25%"
                }, {
                    field: "",
                    title: "기타",
                    width: "25%"
                }
            ]
        }).data("kendoGrid");
    },

    editorComplete : function() {
        var uri = employmentReq.global.params.hwpUrl;
        employmentReq.open(
            "http://121.186.165.80:8010/upload/salaryForm/salaryCont.hwp",
            "HWP",
            "",
            {"userData" : "success"}
        )

    },

    drawSignPop : function() {
        var url = "/Inside/pop/sign/popDrawSignView.do?code=5";
        var name = "popup test";
        var option = "width = 320, height = 360, top = 100, left = 200, location = no"
        var popup = window.open(url, name, option);
    },

    drawCell : function() {
        var html = '<table role="grid" style="margin-left:auto; margin-right:auto; max-width: none; border-collapse: separate; border-spacing: 0; empty-cells: show; font-size:14px; line-height:40px; width:630px;">'
            + '    <tr contenteditable="false">'
            + '    <th colspan="4" style="height: 150px;"><input type="text" style="width: 80%;border : none;text-align: center; font-size:23px; font-weight:bold; color: #4a4a4a;" value="근로계약서" readonly/></th>'
            + '</tr>'
            + '<tr contenteditable="false">'
            + '    <td colspan="4" style="height: 150px; padding: 5px 0; color: #4a4a4a; text-align:center;">'
            + '        <br>'
            + '        '
            + '        '
            + '    </td>'
            + '</tr>'
            + '<tr>'
            + '    <td colspan="4" style="height: 200px; padding: 5px 0; color: #4a4a4a; text-align:center;">'
            + '        <span></span>년 <span></span>월 <span></span>일'
            + '    </td>'
            + '</tr>'
            + '<tr>'
            + '    <td rowspan="3" style="height: 50px; padding: 5px 0; color: #4a4a4a; text-align:right; vertical-align: top;"><input type="text" style="width: 20%;border : none;text-align: center;" value="서약자" readonly/></td>'
            + '    <td style="width:20px; height: 50px; padding: 5px 0; color: #4a4a4a; text-align:center;"></td>'
            + '    <td style="height: 50px; padding: 5px 0; color: #4a4a4a; text-align:left; vertical-align: top;"><input type="text" style="width: 30%;border : none;text-align: center;" value="소 속 : " readonly/></td>'
            + '    <td style="height: 50px; padding: 5px 0; color: #4a4a4a; text-align:center;"></td>'
            + '</tr>'
            + '<tr>'
            + '    <td style="width:20px; height: 50px; padding: 5px 0; color: #4a4a4a; text-align:center;"></td>'
            + '    <td style="height: 50px; padding: 5px 0; color: #4a4a4a; text-align:left; vertical-align: top;"><input type="text" style="width: 30%;border : none;text-align: center;" value="직 급 : " readonly/></td>'
            + '    <td style="height: 50px; padding: 5px 0; color: #4a4a4a; text-align:center;"></td>'
            + '</tr>'
            + '<tr>'
            + '    <td style="width:20px; height: 50px; padding: 5px 0; color: #4a4a4a; text-align:center;"></td>'
            + '    <td style="height: 50px; padding: 5px 0; color: #4a4a4a; text-align:left; vertical-align: top;"><input type="text" style="width: 30%;border : none;text-align: center;" value="성 명 :" readonly/></td>'
            + '    <td style="height: 50px; padding: 5px 0; color: #4a4a4a; text-align:left; vertical-align: top;">(인)<span id="signVal"></span></td>'
            + '</tr>'
            + '<tr contenteditable="false">'
            + '    <td colspan="4" style="height:150px; padding: 5px 0; text-align:center;">'
            + '         <span><input type="text" style="border : none;color: #4a4a4a;font-weight:bold; font-size:18px;width:42%;" value="캠틱종합기술원" readonly/></span>'
            + '         <span><input type="text" style="border : none;font-size:12px;width:7%;" value="귀하" readonly/></span>'
            + '    </td>'
            + '</tr>'
            + '</table>';

        $("#editor").kendoEditor({
            value: html,
            encoded: false,
            tools: [
                "undo",
                "redo",
            ]
        });
    }
}