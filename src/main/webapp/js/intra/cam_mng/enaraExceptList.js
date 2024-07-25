var enaraExceptList = {

    global: {

    },

    fn_defaultScript: function () {
        enaraExceptList.mainGrid();
    },

    mainGrid : function(){
        let dataSource = new kendo.data.DataSource({
            serverPaging: false,
            transport: {
                read : {
                    url : '/kukgoh/getPayAppList',
                    dataType : "json",
                    type : "post"
                },
                parameterMap: function(data) {
                    data.exceptYn = "Y";
                    return data;
                }

            },
            schema : {
                data: function (data) {
                    return data.list;
                },
                total: function (data) {
                    return data.list.length;
                },
            },
            pageSize: 10,
        });

        $("#mainGrid").kendoGrid({
            dataSource: dataSource,
            sortable: true,
            scrollable: true,
            selectable: "row",
            height : 525,
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
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="enaraExceptList.fn_enaraSendExcept()">' +
                            '	<span class="k-button-text">전송제외 해제</span>' +
                            '</button>' +
                            '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="enaraExceptList.mainGrid()">' +
                            '	<span class="k-button-text">조회</span>' +
                            '</button>';
                    }
                }],
            // persistSelection : true,
            columns: [
                {
                    headerTemplate: '<input type="checkbox" id="checkAll" name="checkAll" onclick="fn_checkAll(\'checkAll\', \'payAppDetChk\');"/>',
                    template : function(e){
                        return "<input type='checkbox' id='payAppDet_"+e.PAY_APP_DET_SN+"' name='payAppDetChk' class='payAppDetChk'  value='"+e.PAY_APP_DET_SN+"'>";
                    },
                    width: 30
                },
                {
                    field: "EMP_NAME",
                    title: "결의자",
                    width: 70
                }, {
                    field: "DOC_NO",
                    title: "문서번호",
                    width: 120
                }, {
                    field: "DOC_TITLE",
                    title: "문서제목",
                    width: 220
                },{
                    field: "PJT_NM",
                    title: "프로젝트",
                    width: 300
                },  {
                    field: "BUDGET_NM",
                    title: "예산과목",
                    width: 180
                }, {
                    field: "EVID_TYPE",
                    title: "결재수단",
                    width: 100,
                    template : function (e){
                        if(e.EVID_TYPE == 1){
                            return "세금계산서"
                        } else if (e.EVID_TYPE == 2){
                            return "계산서"
                        } else if(e.EVID_TYPE == 3){
                            return "신용카드"
                        } else if(e.EVID_TYPE == 4){
                            return "직원지급"
                        } else if(e.EVID_TYPE == 5){
                            return "사업소득자"
                        } else if(e.EVID_TYPE == 6){
                            return "기타"
                        } else if(e.EVID_TYPE == 9) {
                            return "기타소득자";
                        }
                    }
                }, {
                    field: "",
                    title: "금액",
                    width: 100,
                    template : function (e){
                        return '<div style="text-align: right">'+comma(e.TOT_COST)+'</div>'
                    }
                }
            ]
        }).data("kendoGrid");
    },

    fn_enaraSendExcept : function(e) {

        if($("input[name='payAppDetChk']:checked").length == 0){
            alert("전송제외 해제할 항목을 선택해주세요.");
            return
        }

        if(confirm("전송제외에서 해제하시겠습니까?")){
            var payAppDetSn = "";

            $.each($("input[name='payAppDetChk']:checked"), function(){
                payAppDetSn += "," + $(this).val()
            })

            $.ajax({
                url: "/kukgoh/setEnaraSendExcept",
                data: {
                    payAppDetSn : payAppDetSn.substring(1),
                    exceptYn : "N"
                },
                type: "post",
                dataType: "json",
                async: false,
                success: function(rs) {
                    alert("해제되었습니다.");
                    enaraExceptList.mainGrid();
                },
                error: function (e) {
                    console.log('error : ', e);
                }
            });
        }
    },
}