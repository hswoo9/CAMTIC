var now = new Date();

var equipmentListAdminView = {

    init : function(){
        equipmentListAdminView.dataSet();
        equipmentListAdminView.mainGrid();
    },

    dataSet() {
        $("#usePdStrDe").kendoDatePicker({
            depth: "month",
            start: "month",
            culture : "ko-KR",
            format : "yyyy-MM-dd",
            value : new Date()
        });

        $("#usePdEndDe").kendoDatePicker({
            depth: "month",
            start: "month",
            culture : "ko-KR",
            format : "yyyy-MM-dd",
            value : new Date(now.setMonth(now.getMonth() + 1))
        });

        $("#searchType").kendoDropDownList({
            dataTextField: "text",
            dataValueField: "value",
            dataSource: [
                { text: "전체", value: "" },
                { text: "사용자", value: "1" },
                { text: "작업내용", value: "2" },
                { text: "의뢰업체", value: "3" }
            ],
            index: 0
        });

        $("#searchVal").kendoTextBox();

        $.ajax({
            url : "/asset/getEqipmnList",
            type : "post",
            async: false,
            dataType : "json",
            success : function (result){
                var ds = result.list;
                ds.unshift({TEXT: '전체', VALUE: ''});

                $("#mainEqipmnGbnName").kendoDropDownList({
                    dataTextField: "TEXT",
                    dataValueField: "VALUE",
                    dataSource: ds,
                    index: 0
                })
            }
        })

        $.ajax({
            url : "/asset/getPrtpcoGbnNameList",
            type : "post",
            async: false,
            dataType : "json",
            success : function (result){
                var ds = result.list;
                ds.unshift({TEXT: '전체', VALUE: ''});

                $("#mainPrtpcoGbnName").kendoDropDownList({
                    dataTextField: "TEXT",
                    dataValueField: "VALUE",
                    dataSource: ds,
                    index: 0
                })
            }
        })

    },

    mainGrid : function(e) {
        var dataSource = new kendo.data.DataSource({
            serverPaging: false,
            transport: {
                read : {
                    url : '/asset/getEqipmnUseList',
                    dataType : "json",
                    type : "post"
                },
                parameterMap: function(data, operation) {

                    data.usePdStrDe = $("#usePdStrDe").val().replaceAll('-','');
                    data.usePdEndDe = $("#usePdEndDe").val().replaceAll('-','');
                    data.eqipmnGbnCmmnCdSn = $("#mainEqipmnGbnName").getKendoDropDownList().value();
                    data.prtpcoGbnSn = $("#mainPrtpcoGbnName").getKendoDropDownList().value();
                    var searchType = $("#searchType").getKendoDropDownList().value()
                    if(searchType == 1) {
                        data.searchText = "A.USER_NAME"
                    }else if(searchType == 2) {
                        data.searchText = "A.OPER_CN"
                    }else if(searchType == 3) {
                        data.searchText = ""
                    }
                    /*data.searchText = "A.USER_NAME"*/
                    data.searchVal = $("#searchVal").val();
                    return data;
                }
            },
            schema : {
                data: function (data) {
                    return data.rs;
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
                    name: '',
                    text: '결재',
                    template : function (e){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="equipmentListAdminView.equipApprovalPopup();">' +
                            '   <span class="k-button-text">결재</span>' +
                            '</button>';
                    }
                }
            ],
            noRecords: {
                template: "데이터가 존재하지 않습니다."
            },
            dataBound : equipmentListAdminView.onDataBound,
            columns: [
                {
                    field: "SORT_SN",
                    title: "순번"
                }, {
                    field: "EQIPMN_GBN_NAME",
                    title: "구분"
                }, {
                    field: "EQIPMN_NAME",
                    title: "장비명"
                }, {
                    title : "사용기간",
                    columns : [
                        {
                            field : "USE_PD_STR_DE",
                            title : "시작일자",
                        }, {
                            field: "USE_PD_END_DE",
                            title: "종료일자"
                        }
                    ]
                }, {
                    field: "USER_NAME",
                    title: "사용자"
                }, {
                    field: "OPER_CN",
                    title: "작업내용"
                }, {
                    field: "USE_TIME",
                    title: "총 사용시간"
                }, {
                    field: "USE_AMT",
                    title: "사용대금"
                }, {
                    field: "CLIENT_PRTPCO_NAME",
                    title: "의뢰업체"
                }, {
                    field: "PRTPCO_GBN_NAME",
                    title: "업체구분"
                }
            ]
        }).data("kendoGrid");
    },

    equipmentmangePopup : function(){
        var url = "/Inside/Pop/equipmentmangePop.do";
        var name = "equipmentmangePop";
        var option = "width = 1300, height = 800, top = 100, left = 200, location = no"
        var popup = window.open(url, name, option);
    },

    equipApprovalPopup : function (){
        var url = "/Inside/Pop/equipApprovalPop.do";
        var name = "equipApprovalPop";
        var option = "width = 400, height = 200, top = 100, left = 200, location = no"
        var popup = window.open(url, name, option);
    }

}
