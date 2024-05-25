var g20Subject = {


    fn_defaultScript : function (){
        var today = new Date();
        customKendo.fn_datePicker("pjtFromDate", "decade", "yyyy-MM-dd", new Date(today.setFullYear(today.getFullYear(),0,1)));
        customKendo.fn_datePicker("pjtToDate", "decade", "yyyy-MM-dd", new Date(today.setFullYear(today.getFullYear(),11,31)));


        g20Subject.mainGrid();
    },

    gridReload : function (){

    },

    mainGrid : function () {
        let dataSource = new kendo.data.DataSource({
            serverPaging: false,
            transport: {
                read: {
                    url: "/g20/getSubjectList",
                    dataType: "json",
                    type: "post"
                },
                parameterMap: function(data){
                    data.pjtFromDate = $("#pjtFromDate").val().replaceAll("-", "");
                    data.pjtToDate = $("#pjtToDate").val().replaceAll("-", "");
                    data.baseDate = new Date(+new Date() + 3240 * 10000).toISOString().split("T")[0].replaceAll("-", "");

                    data.atTrName = $("#atTrName").val();
                    data.bankNumber = $("#bankNumber").val();
                    data.isBusinessLink = $("#isBusinessLink").val();
                    data.pjtDeptName = $("#pjtDeptName").val();
                    data.pjtName = $("#pjtName").val();
                    data.pjtSeq = $("#pjtSeq").val();
                    data.progFg = $("#progFg").val();
                    data.trSeq = $("#trSeq").val();
                    data.uid = $("#uid").val();
                    data.opt01 = 3;
                    data.opt02 = 1;
                    data.opt03 = 2;


                    // data.erpDivSeq = '1000' + '|', /* 회계통제단위 구분값 '|' */

                        // erpGisu : '12', /* ERP 기수 */
                        // gisu : '12', /* ERP 기수 */
                        //
                        // erpGisuFromDate : '20230101', /* 기수 시작일 */
                        // frDate : '20230101', /* 기수 시작일 */
                        //
                        // erpGisuToDate : '20231231', /* 기수 종료일 */
                        // toDate : '20231231', /* 기수 종료일 */
                        //
                        // erpMgtSeq : $('#erpMgtCode').val() + '|', /* 예산통제단위 구분값 '|' */
                        // opt01 : '3',  /* 1: 모든 예산과목, 2: 당기편성, 3: 프로젝트 기간 예산 */
                        // opt02 : '1', /* 1: 모두표시, 2: 사용기한결과분 숨김 */
                        // opt03 : '2', /* 1: 예산그룹 전체, 2: 예산그룹 숨김 */
                        // grFg : '2', /*지출*/
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
            scrollable: true,
            selectable: "row",
            height: 300,
            pageable: {
                refresh: true,
                pageSizes : [ 10, 20, 50, "ALL" ],
                buttonCount: 5
            },
            noRecords: {
                template: "데이터가 존재하지 않습니다."
            },
            dataBound : function(e){
                const grid = this;
                grid.tbody.find("tr").dblclick(function (e) {
                    const dataItem = grid.dataItem($(this));
                    // const crmMemSn = dataItem.CRM_MEM_SN;
                });
            },
            columns: [
                {
                    field: "pjtSeq",
                    title: "구분",
                    width: 200
                }, {
                    title: "프로젝트명",
                    field: "pjtName"
                }
            ],
        }).data("kendoGrid");
    },


}