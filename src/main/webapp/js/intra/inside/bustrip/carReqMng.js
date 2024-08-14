var carReqMng = {

    fn_defaultScript: function(){
        customKendo.fn_datePicker("startDt", '', "yyyy-MM-dd", new Date(new Date().getFullYear(), new Date().getMonth() - 2, 1));
        customKendo.fn_datePicker("endDt", '', "yyyy-MM-dd", new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0));

        $("#startDt").change(function (){
            if($("#startDt").val() > $("#endDt").val()){
                $("#endDt").val($("#startDt").val());
            }
        });
        $("#endDt").change(function (){
            if($("#startDt").val() > $("#endDt").val()){
                $("#startDt").val($("#endDt").val());
            }
        });

        var data = [
            { text : "업무용", value : 1 },
            { text : "개인사유", value : 2 }
        ];
        customKendo.fn_dropDownList("carType", data, "text", "value");

        var data2 = [
            { text : "운행자", value : 1 },
            { text : "사용부서", value : 2 }
        ];
        customKendo.fn_dropDownList("searchType", data2, "text", "value");

        customKendo.fn_textBox(["searchText"]);

        carReqMng.mainGrid();
    },

    gridReload : function(){
        $("#mainGrid").data("kendoGrid").dataSource.read();
    },

    mainGrid: function () {
        var dataSource = new kendo.data.DataSource({
            serverPaging: false,
            transport: {
                read : {
                    url : '/inside/getUserCarReqList',
                    dataType : "json",
                    type : "post"
                },
                parameterMap: function(data) {
                    data.startDt = $("#startDt").val();
                    data.endDt = $("#endDt").val();
                    data.carType = 2;
                    data.searchType = $("#searchType").val();
                    data.searchText = $("#searchText").val();
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
            height: 496,
            pageable : {
                refresh : true,
                pageSizes : [ 10, 20, 50, "ALL" ],
                buttonCount : 5
            },
            toolbar: [
                {
                    name : 'button',
                    template : function (e){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="carReqMng.gridReload();">' +
                            '	<span class="k-button-text">조회</span>' +
                            '</button>';
                    }
                }, {
                    name: 'excel',
                    text: '엑셀다운로드'
                }
            ],
            noRecords: {
                template: "데이터가 존재하지 않습니다."
            },
            // dataBound : carReq.onDataBound,
            columns: [
                {
                    title: "순번",
                    template: "#= --record #",
                    width: 50
                }, {
                    field: "REQ_DATE",
                    title: "운행일시",
                    width: 180
                }, {
                    field: "USE_DEPT_NAME",
                    title: "사용부서",
                    width: 100
                },  {
                    field: "CAR_CLASS_TEXT",
                    title: "사용차량",
                    width: 80
                },  {
                    field: "CAR_TYPE_TEXT",
                    title: "운행구분",
                    width: 80
                },  {
                    field: "CAR_TITLE_NAME",
                    title: "운행목적",
                    width: 100
                },  {
                    field: "EMP_NAME",
                    title: "운행자",
                    width: 80
                },  {
                    field: "REG_DT",
                    title: "신청일자",
                    width: 80
                },  {
                    field: "",
                    title: "",
                    width: 80,
                    template: function(e) {
                        if(e.CAR_TYPE_SN == 2) {
                            if(e.STATUS == "0"){
                                return "<button type=\"button\" id=\"carAppBtn\" style=\"margin-right: 5px;\" class=\"k-button k-button-solid-info\" onclick=\"carReqMng.carDrafting('"+e.CAR_REQ_SN+"',)\">상신</button>";
                            }else if(e.STATUS == "10"){
                                return "<button type=\"button\" id=\"carCanBtn\" style=\"margin-right: 5px;\" class=\"k-button k-button-solid-error\" onclick=\"docApprovalRetrieve('"+e.DOC_ID+"', '"+e.APPRO_KEY+"', 1, 'retrieve');\">회수</button>";
                            }else if(e.STATUS == "30" || e.STATUS == "40"){
                                return "<button type=\"button\" id=\"carCanBtn\" style=\"margin-right: 5px;\" class=\"k-button k-button-solid-error\" onclick=\"tempOrReDraftingPop('"+e.DOC_ID+"', '"+e.DOC_MENU_CD+"', '"+e.APPRO_KEY+"', 2, 'reDrafting', 'target');\">재상신</button>";
                            }else if(e.STATUS == "100"){
                                return "<button type=\"button\" id=\"carCanBtn\" style=\"margin-right: 5px;\" class=\"k-button k-button-solid-base\" onclick=\"approveDocView('"+e.DOC_ID+"', '"+e.APPRO_KEY+"', '"+e.DOC_MENU_CD+"');\">열람</button>";
                            } else {
                                return "";
                            }
                        } else {
                            return "";
                        }
                    }
                },
            ],
            dataBinding: function(){
                record = fn_getRowNum(this, 3);
            }
        }).data("kendoGrid");
    },

    carDrafting: function(key) {
        $("#carReqSn").val(key);

        $("#carDraftFrm").one("submit", function() {
            var url = "/popup/inside/approvalFormPopup/carApprovalPop.do";
            var name = "carApprovalPop";
            var option = "width=965, height=900, scrollbars=no, top=100, left=200, resizable=yes, scrollbars = yes, status=no, top=50, left=50"
            var popup = window.open(url, name, option);
            this.action = "/popup/inside/approvalFormPopup/carApprovalPop.do";
            this.method = 'POST';
            this.target = 'carApprovalPop';
        }).trigger("submit");
    },
}
