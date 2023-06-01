
var now = new Date();
var menuCd = $("#menuCd").val();
var docContent = "";





var holidayPlan = {

    holidayPlanInit : function(){

            $("#datePicker").kendoDatePicker({
                value: new Date(),
                start: "decade",
                depth: "decade",
                format: "yyyy",
                width: "150px"
            });
            $("#primaryTextButton").kendoButton({
                themeColor: "primary"
            });

            var dataSource = new kendo.data.DataSource({
                serverPaging: false,
                transport: {
                    read : {
                        url : getContextPath()+"/workPlan/getWorkPlanReqSubList.do",
                        dataType : "json",
                        type : "post"
                    },
                    parameterMap: function(data, operation) {
                        data.empSeq = $("#empSeq").val();
                        data.status = $("#status").val();
                        data.startDay = $("#startDay").val();
                        data.endDay = $("#endDay").val();

                        return data;
                    }
                },
                schema : {
                    data: function (data) {
                        return data.data;
                    },
                    total: function (data) {
                        return data.data.length;
                    },
                },
                pageSize: 10,
            });

            $("#Holidaygrid").kendoGrid({
                dataSource: dataSource,
                height: 300,
                sortable: true,
                scrollable: true,
                toolbar : [
                    {
                        name : 'button',
                        template : function (e){
                            return '<button type="button" class="k-grid-button k-button k-button-md k-rounded-md k-button-solid k-button-solid-base" onclick="selectChkDel()">' +
                                '	<span class="k-button-text">선택삭제</span>' +
                                '</button>';
                        }
                    },
                    {
                        name : 'button',
                        template : function (e){
                            return '<button type="button" class="k-grid-button k-button k-button-md k-rounded-md k-button-solid k-button-solid-base" onclick="holidayPlan.holidayPlanRegPopup()">' +
                                '	<span class="k-button-text">신청</span>' +
                                '</button>';
                        }
                    }
                ],
                noRecords: {
                    template: "데이터가 존재하지 않습니다."
                },
                pageable: {
                    refresh: true,
                    pageSize : 10,
                    pageSizes: [10, 20, 50, "ALL"],
                    buttonCount: 5,
                    messages: {
                        display: "{0} - {1} of {2}",
                        itemsPerPage: "",
                        empty: "데이터가 없습니다.",
                    }
                },
                columns: [
                    {
                        headerTemplate: '<input type="checkbox" id="checkAll" name="checkAll" class="k-checkbox checkbox"/>',
                        template : "<input type='checkbox' id='wpcPk#=WORK_PLAN_CHANGE_ID#' name='wpcPk' value='#=WORK_PLAN_CHANGE_ID#' class='k-checkbox checkbox'/>",
                        width: 30
                    }, {
                        field: "순번",
                        title: "순번",
                        width: 20
                    }, {
                        field: "구분",
                        title: "구분",
                        width: 100
                    }, {
                        field: "기간",
                        title: "기간",
                        width: 150
                    }, {
                        field: "사용일수",
                        title: "사용일수",
                        width: 30
                    }, {
                        field: "상태",
                        title: "상태",
                        width: 50
                    }]
            }).data("kendoGrid");

            $("#checkAll").click(function(){
                if($(this).is(":checked")) $("input[name=wpcPk]").prop("checked", true);
                else $("input[name=wpcPk]").prop("checked", false);
            });




    },

    holidayPlanRegPopup : function(){
        popWin = window.open(getContextPath()+"/holidayPlanReqPop.do", "holidayPlanReqPop", "width=1030, height=850, scrollbars=no, top=100, left=200, resizable=no, toolbars=no, menubar=no");
    }
}
