var now = new Date();

var inBustripList = {

    init : function(){
        inBustripList.dataSet();
        inBustripList.mainGrid();
    },

    dataSet() {
        $("#start_date").kendoDatePicker({
            depth: "month",
            start: "month",
            culture : "ko-KR",
            format : "yyyy-MM-dd",
            value : new Date(now.setMonth(now.getMonth() - 1))
        });

        $("#end_date").kendoDatePicker({
            depth: "month",
            start: "month",
            culture : "ko-KR",
            format : "yyyy-MM-dd",
            value : new Date()
        });

        $("#pjt_cd").kendoDropDownList({
            dataTextField: "text",
            dataValueField: "value",
            dataSource: [
                { text: "선택하세요", value: "" },
                { text: "해당없음", value: "0" },
                { text: "연구개발", value: "1" },
                { text: "개발사업", value: "2" },
                { text: "교육사업", value: "3" },
                { text: "일자리사업", value: "4" },
                { text: "지원사업", value: "5" },
                { text: "평생학습", value: "6" },
                { text: "캠스타트업", value: "7" }
            ],
            index : 0,
        });

        $("#busnName").kendoTextBox();

    },

    mainGrid : function() {
        var dataSource = new kendo.data.DataSource({
            serverPaging: false,
            transport: {
                read : {
                    url : '/bustrip/getBustripReq',
                    dataType : "json",
                    type : "post"
                },
                parameterMap: function(data, operation) {
                    data.startDate = $("#start_date").val();
                    data.endDate = $("#end_date").val();
                    data.projectCd = $("#pjt_cd").val();
                    data.busnName = $("#busnName").val();

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
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-info" onclick="inBustripList.inBustripReqPop()">' +
                            '	<span class="k-button-text">신청</span>' +
                            '</button>';
                    }
                }, {
                    name : 'button',
                    template : function (e){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-error" onclick="inBustripList.fn_delBustripReq()">' +
                            '	<span class="k-button-text">신청취소</span>' +
                            '</button>';
                    }
                }
            ],
            noRecords: {
                template: "데이터가 존재하지 않습니다."
            },
            dataBound : inBustripList.onDataBound,
            columns: [
                {
                    headerTemplate: '<input type="checkbox" id="checkAll" name="checkAll" onclick="inBustripList.fn_checkAll()" class=""/>',
                    template : function (d) {
                        if(d.status == 0){
                            return "<input type='checkbox' id='bst"+d.hr_biz_req_id+"' name='bstCheck' value='"+d.hr_biz_req_id+"' style='position: relative; top:3px' class='bstCheck'/>"
                        } else {
                            return "";
                        }
                    },
                    width: 50
                }, {
                    title: "사업명",
                    width: 250,
                    template : function(d){
                        var busnName = "";
                        var project = "";
                        if(d.busn_name != "" && d.busn_name != null && d.busn_name != undefined){
                            busnName = d.busn_name;
                        }

                        if(d.project_cd != "" && d.project_cd != null){
                            project = "(" + d.project + ") ";
                        }
                        return  project + busnName;
                    }
                }, {
                    field: "emp_name",
                    title: "출장자",
                    width: 80
                }, {
                    title: "출장지<br>(경유지)",
                    template: function(d){
                        return d.visit_loc + " → " + d.visit_loc_sub;
                    },
                    width: 120
                }, {
                    title: "출발일시",
                    template: function(d){
                        return d.trip_day_fr + " " + d.trip_time_fr;
                    },
                    width: 100
                }, {
                    title: "복귀일시",
                    template: function(d){
                        return d.trip_day_to + " " + d.trip_time_to;
                    },
                    width: 100
                }, {
                    title: "업무차량",
                    template : function(d){
                        if(d.use_car == "Y"){
                            if(d.use_trspt == 1){
                                return "사용 (카니발)";
                            } else if(d.use_trspt == 5){
                                return "사용 (아반떼)";
                            } else if(d.use_trspt == 3){
                                return "사용 (트럭)";
                            }
                            return "사용";
                        } else {
                            return "사용안함";
                        }
                    },
                    width: 100
                }, {
                    field: "",
                    title: "결재",
                    template: function(e){
                        if(e.status == 0){
                            return "<button type='button' class='k-button k-button-md k-button-solid k-button-solid-base approvalPopup' onclick='inBustripList.bustripDrafting(\""+e.hr_biz_req_id+"\");'>" +
                                "<span class='k-icon k-i-track-changes-accept k-button-icon'></span>" +
                                "<span class='k-button-text'>상신</span>" +
                                "</button>";
                        } else if(e.status == 10){
                            return "<button type='button' class='k-button k-button-md k-button-solid k-button-solid-base' onclick='docApprovalRetrieve(\""+e.doc_id+"\", \""+e.APPRO_KEY+"\", 1, \"retrieve\");'>" +
                                "<span class='k-icon k-i-x-circle k-button-icon'></span>" +
                                "<span class='k-button-text'>회수</span>" +
                                "</button>";
                        } else if(e.status == 30 || e.status == 40){
                            return "<button type='button' class='k-button k-button-md k-button-solid k-button-solid-base approvalPopup' onclick='tempOrReDraftingPop(\""+e.doc_id+"\", \""+e.DOC_MENU_CD+"\", \""+e.APPRO_KEY+"\", 2, \"reDrafting\");'>" +
                                "<span class='k-icon k-i-track-changes-accept k-button-icon'></span>" +
                                "<span class='k-button-text'>재상신</span>" +
                                "</button>";
                        } else if(e.status == 100){
                            return "<button type='button' class='k-button k-button-md k-button-solid k-button-solid-base approvalPopup' onclick='approveDocView(\""+e.doc_id+"\", \""+e.APPRO_KEY+"\", \""+e.DOC_MENU_CD+"\");'>" +
                                "<span class='k-icon k-i-track-changes-accept k-button-icon'></span>" +
                                "<span class='k-button-text'>열람</span>" +
                                "</button>";
                        } else{
                            return "-";
                        }
                    },
                    width: 80
                }, {
                    field: "",
                    title: "결재상태",
                    template: function(d){
                        if(d.status == 0){
                            return "미결재";
                        } else if(d.status == 10){
                            return "상신";
                        } else if(d.status == 30){
                            return "반려";
                        } else if(d.status == 40){
                            return "회수";
                        } else if(d.status == 100){
                            return "결재완료";
                        } else {
                            return "-";
                        }
                    },
                    width: 80
                }
            ]
        }).data("kendoGrid");
    },

    inBustripReqPop : function(e) {
        var url = "";
        if(e == null || e == "" || e== undefined){
            url = "/bustrip/pop/inBustripReqPop.do";
        } else {
            url = "/bustrip/pop/inBustripReqPop.do?hrBizReqId="+e;
        }
        var name = "inBustripReqPop";
        var option = "width=1200, height=700, scrollbars=no, top=100, left=200, resizable=no, toolbars=no, menubar=no"
        var popup = window.open(url, name, option);
    },

    fn_checkAll: function(){
        if($("#checkAll").is(":checked")) {
            $("input[name='bstCheck']").prop("checked", true);
        }else{
            $("input[name='bstCheck']").prop("checked", false);
        }
    },

    fn_delBustripReq: function (){
        var keyAr = [];

        if($("input[name='bstCheck']:checked").length == 0){
            alert("취소할 출장을 선택해주세요.")
        }

        if(!confirm("선택한 출장 신청을 취소하시겠습니까?")){
            return;
        }

        $("input[name='bstCheck']:checked").each(function(){
            keyAr.push(this.value);
        });

        var data = {
            keyAr : keyAr
        }

        $.ajax({
            url : "/bustrip/delBustripReq",
            data: {
                keyAr : keyAr
            },
            type : "post",
            traditional: true,
            dataType: "json",
            success : function(rs){
                inBustripList.mainGrid();
            }
        });
    },

    onDataBound: function () {
        var grid = this;
        grid.element.off('dblclick');

        grid.tbody.find("tr").dblclick(function (e) {
            var dataItem = grid.dataItem($(this).closest("tr"));
            console.log(dataItem)

            inBustripList.inBustripReqPop(dataItem.hr_biz_req_id)
        });
    },

    bustripDrafting: function(hrBizReqId) {
        $("#hrBizReqId").val(hrBizReqId);
        $("#bustripDraftFrm").one("submit", function() {
            var url = "/Inside/pop/approvalFormPopup/bustripApprovalPop.do";
            var name = "bustripApprovalPop";
            var option = "width=965, height=900, scrollbars=no, top=100, left=200, resizable=yes, scrollbars = yes, status=no, top=50, left=50"
            var popup = window.open(url, name, option);
            this.action = "/Inside/pop/approvalFormPopup/bustripApprovalPop.do";
            this.method = 'POST';
            this.target = 'bustripApprovalPop';
        }).trigger("submit");
    }
}
