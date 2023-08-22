var crm = {


    fn_defaultScript : function (){

        $("#ctmCare").kendoDropDownList({
            dataTextField: "text",
            dataValueField: "value",
            dataSource: [
                { text: "전체", value: "" },
                { text: "관리고객", value: "" },
                { text: "특별고객", value: "" },
                { text: "블랙고객", value: "" },
            ],
            index: 0
        });

        $("#ctmGrade").kendoDropDownList({
            dataTextField: "text",
            dataValueField: "value",
            dataSource: [
                { text: "전체", value: "" },
                { text: "우량고객", value: "" },
                { text: "일반고객", value: "" },
                { text: "휴면고객", value: "" },
                { text: "잠재고객", value: "" },
                { text: "신규고객", value: "" }
            ],
            index: 0
        });

        $("#ctmType").kendoDropDownList({
            dataTextField: "text",
            dataValueField: "value",
            dataSource: [
                { text: "전체", value: "" },
                { text: "기업", value: "" },
                { text: "기관", value: "" }
            ],
            index: 0
        });

        $("#searchKeyword").kendoDropDownList({
            dataTextField: "text",
            dataValueField: "value",
            dataSource: [
                { text: "전체", value: "" },
                { text: "회사명", value: "CRM_NM" },
                { text: "사업자번호", value: "CRM_NO" },
                { text: "전화번호", value: "TEL_NUM" },
                { text: "팩스번호", value: "FAX" },
                { text: "대표자", value: "CRM_CEO" }
            ],
            index: 0,
            change : function () {
                if(this.value != ""){
                    $("#searchValue").removeAttr("disabled");
                } else {
                    $("#searchValue").attr("disabled", "");
                }
            }
        });
        customKendo.fn_textBox(["searchValue"]);

        crm.mainGrid();
    },

    gridReload: function (){
        $("#mainGrid").data("kendoGrid").dataSource.read();
    },

    mainGrid: function(){
        let dataSource = new kendo.data.DataSource({
            serverPaging: false,
            transport: {
                read: {
                    url: "/crm/getCrmList",
                    dataType: "json",
                    type: "post"
                },
                parameterMap: function(data){
                    data.ctmType = $("#ctmType").val();
                    data.ctmGrade = $("#ctmGrade").val();
                    data.ctmCare = $("#ctmCare").val();
                    data.searchKeyword = $("#searchKeyword").val();
                    data.searchValue = $("#searchValue").val();

                    return data;
                }
            },
            schema: {
                data: function(data){
                    return data.list;
                },
                total: function(data){
                    return data.list.length;
                },
            },
            pageSize: 10,
        });

        $("#mainGrid").kendoGrid({
            dataSource: dataSource,
            sortable: true,
            selectable: "row",
            pageable: {
                refresh: true,
                pageSizes: [ 10, 20, 30, 50, 100 ],
                buttonCount: 5
            },
            noRecords: {
                template: "데이터가 존재하지 않습니다."
            },
            toolbar: [
                {
                    name: 'button',
                    template: function(){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="crm.gridReload()">' +
                            '	<span class="k-button-text">조회</span>' +
                            '</button>';
                    }
                }],
            columns: [
                {
                    title: "업태",
                    field: "CRM_OCC",
                    width: 100,
                }, {
                    field: "CRM_NM",
                    title: "업체명",
                    width: 120
                }, {
                    title: "사업자번호",
                    field: "CRM_NO",
                    width: 100
                }, {
                    title: "대표자",
                    field: "CRM_CEO",
                    width: 80
                }, {
                    title: "전화번호",
                    field: "TEL_NUM",
                    width: 100
                }, {
                    title: "팩스번호",
                    field: "FAX",
                    width: 100
                }, {
                    title: "관계이력",
                    width: 100,
                    template : function (e){
                        return "0 건";
                    }
                }, {
                    title: "고객등급",
                    width: 100,
                    template: function(e){
                        return "";
                    }
                }, {
                    title: "최근수정일",
                    width: 100,
                    template:function(e){
                        if(e.MOD_DT == null || e.MOD_DT == ''){
                            return "";
                        } else {
                            return e.MOD_DT;
                        }
                    }
                }
            ]
        }).data("kendoGrid");
    }
}