var bustripList = {
    init: function(){
        bustrip.fn_setPageName();
        bustripList.pageSet();
        bustripList.mainGrid();
    },

    pageSet: function(){
        /** 출장기간 */
        bustrip.fn_periodSet();

        /** 출장구분 */
        bustrip.fn_tripCodeSearchSet();

        /** 관련사업 */
        bustrip.fn_projectSearchSet();

        customKendo.fn_textBox(["busnName"]);
    },

    mainGrid: function(){
        let dataSource = new kendo.data.DataSource({
            serverPaging: false,
            transport: {
                read: {
                    url: "/bustrip/getBustripList",
                    dataType: "json",
                    type: "post"
                },
                parameterMap: function(data){
                    data.startDate = $("#start_date").val();
                    data.endDate = $("#end_date").val();
                    data.tripCode = $("#tripCode").data("kendoDropDownList").value();
                    data.project = $("#project").val();
                    data.busnName = $("#busnName").val();
                    data.empSeq = $("#regEmpSeq").val();
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
            height: 525,
            pageable: {
                refresh: true,
                pageSizes : [ 10, 20, 50, "ALL" ],
                buttonCount: 5
            },
            toolbar: [
                {
                    name: 'button',
                    template: function(){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="gridReload()">' +
                            '	<span class="k-button-text">조회</span>' +
                            '</button>';
                    }
                }, {
                    name : 'button',
                    template : function(){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-info" onclick="bustripList.bustripReqPop()">' +
                            '	<span class="k-button-text">신청</span>' +
                            '</button>';
                    }
                }, {
                    name : 'button',
                    template : function(){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-error" onclick="bustripList.fn_delBtn()">' +
                            '	<span class="k-button-text">신청취소</span>' +
                            '</button>';
                    }
                }
            ],
            noRecords: {
                template: "데이터가 존재하지 않습니다."
            },
            dataBound: bustripList.onDataBound,
            columns: [
                {
                    headerTemplate: '<input type="checkbox" id="checkAll" name="checkAll" onclick="fn_checkAll(\'checkAll\', \'bstCheck\');" class=""/>',
                    template: function(row){
                        if(row.STATUS == 0){
                            return "<input type='checkbox' id='bst"+row.HR_BIZ_REQ_ID+"' name='bstCheck' value='"+row.HR_BIZ_REQ_ID+"' style='position: relative; top:3px' class='bstCheck'/>"
                        }else{
                            return "";
                        }
                    },
                    width: 30
                }, {
                    title: "출장구분",
                    width: 50,
                    template: function(row){
                        return bustrip.fn_getTripCodeText(row);
                    }
                }, {
                    title: "사업명",
                    width: 200,
                    template: function(row){
                        var busnName = "";
                        var project = "";
                        if(row.BUSN_NAME != "" && row.BUSN_NAME != null && row.BUSN_NAME != undefined){
                            busnName = row.BUSN_NAME;
                        }

                        if(row.PROJECT_CD != "" && row.PROJECT_CD != null){
                            project = "(" + row.PROJECT + ") ";
                        }
                        return  project + busnName;
                    }
                }, {
                    field: "EMP_NAME",
                    title: "출장자",
                    width: 80,
                    template: function(row){
                            if(row.COMPANION != 0){
                                return row.EMP_NAME + " 외 "+row.COMPANION+"명";
                            }else{
                                return row.EMP_NAME;
                            }
                    }
                }, {
                    title: "출장지 (경유지)",
                    template: function(row){
                        if(row.VISIT_LOC_SUB != ""){
                            return row.VISIT_CRM + " (" + row.VISIT_LOC_SUB+")";
                        }else{
                            return row.VISIT_CRM;
                        }
                    },
                    width: 160
                }, {
                    title: "출발일시",
                    template: function(row){
                        return row.TRIP_DAY_FR + " " + row.TRIP_TIME_FR;
                    },
                    width: 100
                }, {
                    title: "복귀일시",
                    template: function(row){
                        return row.TRIP_DAY_TO + " " + row.TRIP_TIME_TO;
                    },
                    width: 100
                }, {
                    field: "CAR_CLASS_NAME",
                    title: "차량",
                    width: 80
                }, {
                    title: "결재",
                    template: function(row){
                        if(row.STATUS == 0){
                            return "<button type='button' class='k-button k-button-md k-button-solid k-button-solid-base approvalPopup' onclick='bustripList.bustripDrafting(\""+row.HR_BIZ_REQ_ID+"\");'>" +
                                "<span class='k-icon k-i-track-changes-accept k-button-icon'></span>" +
                                "<span class='k-button-text'>상신</span>" +
                                "</button>";
                        } else if(row.STATUS == 10 || row.STATUS == 50){
                            return "<button type='button' class='k-button k-button-md k-button-solid k-button-solid-base' onclick='docApprovalRetrieve(\""+row.DOC_ID+"\", \""+row.APPRO_KEY+"\", 1, \"retrieve\");'>" +
                                "<span class='k-icon k-i-x-circle k-button-icon'></span>" +
                                "<span class='k-button-text'>회수</span>" +
                                "</button>";
                        } else if(row.STATUS == 30 || row.STATUS == 40){
                            return "<button type='button' class='k-button k-button-md k-button-solid k-button-solid-base approvalPopup' onclick='tempOrReDraftingPop(\""+row.DOC_ID+"\", \""+row.DOC_MENU_CD+"\", \""+row.APPRO_KEY+"\", 2, \"reDrafting\");'>" +
                                "<span class='k-icon k-i-track-changes-accept k-button-icon'></span>" +
                                "<span class='k-button-text'>재상신</span>" +
                                "</button>";
                        } else if(row.STATUS == 100){
                            return "<button type='button' class='k-button k-button-md k-button-solid k-button-solid-base approvalPopup' onclick='approveDocView(\""+row.DOC_ID+"\", \""+row.APPRO_KEY+"\", \""+row.DOC_MENU_CD+"\");'>" +
                                "<span class='k-icon k-i-track-changes-accept k-button-icon'></span>" +
                                "<span class='k-button-text'>열람</span>" +
                                "</button>";
                        } else{
                            return "-";
                        }
                    },
                    width: 60
                }, {
                    title: "결재상태",
                    template: function(row){
                        if(row.STATUS == 0){
                            return "미결재";
                        }else if(row.STATUS == 10){
                            return "상신";
                        }else if(row.STATUS == 30){
                            return "반려";
                        }else if(row.STATUS == 40){
                            return "회수";
                        }else if(row.STATUS == 100){
                            return "결재완료";
                        }else {
                            return "-";
                        }
                    },
                    width: 60
                }
            ]
        }).data("kendoGrid");
    },

    onDataBound: function(){
        var grid = this;
        grid.element.off('dblclick');
        grid.tbody.find("tr").dblclick(function(){
            var dataItem = grid.dataItem($(this).closest("tr"));
            bustripList.bustripReqPop(dataItem.HR_BIZ_REQ_ID);
        });
    },

    fn_delBtn: function(){
        let keyAr = [];
        if($("input[name='bstCheck']:checked").length == 0){ alert("취소할 출장을 선택해주세요.") }
        if(!confirm("선택한 출장 신청을 취소하시겠습니까?")){ return; }

        $("input[name='bstCheck']:checked").each(function(){
            keyAr.push(this.value);
        });

        $.ajax({
            url : "/bustrip/delBustripReq",
            data: {
                keyAr : keyAr
            },
            type : "post",
            traditional: true,
            dataType: "json",
            success : function(){
                alert("취소되었습니다.");
                gridReload();
            }
        });
    },

    bustripReqPop: function(e){
        let url = "";
        if(e == null || e == "" || e== undefined){
            url = "/bustrip/pop/bustripReqPop.do";
        } else {
            url = "/bustrip/pop/bustripReqPop.do?hrBizReqId="+e;
        }
        let name = "bustripReqPop";
        let option = "width=1200, height=700, scrollbars=no, top=100, left=200, resizable=no, toolbars=no, menubar=no"
        window.open(url, name, option);
    },

    bustripDrafting: function(hrBizReqId){
        $("#hrBizReqId").val(hrBizReqId);
        $("#bustripDraftFrm").one("submit", function(){
            let url = "/Inside/pop/approvalFormPopup/bustripApprovalPop.do";
            let name = "_self";
            let option = "width=965, height=900, scrollbars=no, top=100, left=200, resizable=yes, scrollbars = yes, status=no, top=50, left=50"
            window.open(url, name, option);
            this.action = "/Inside/pop/approvalFormPopup/bustripApprovalPop.do";
            this.method = 'POST';
            this.target = '_self';
        }).trigger("submit");
    }
}

function gridReload(){
    bustripList.mainGrid();
}