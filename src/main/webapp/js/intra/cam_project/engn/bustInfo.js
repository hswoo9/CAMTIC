var bustInfo = {


    fn_defaultScript : function(){
        customKendo.fn_textBox(["bustripReq"]);

        $("#contEtc").kendoTextArea({
            rows: 5,
        });

        bustInfo.fn_setData();
    },

    fn_setData : function (){
        // var parameters = {
        //     pjtSn : $("#pjtSn").val()
        // }
        //
        // $.ajax({
        //     url : "/project/engn/getBustInfo",
        //     data : parameters,
        //     type : "post",
        //     dataType : "json",
        //     success : function(rs){
        //         var rs = rs.rs;
        //         if(rs != null){
        //             // $("#contEtc").val(rs.RESULT);
        //             var busnName = "";
        //             var project = "";
        //             if(rs.BUSN_NAME != "" && rs.BUSN_NAME != null && rs.BUSN_NAME != undefined){
        //                 busnName = p.BUSN_NAME;
        //             }
        //
        //             if(rs.PROJECT_CD != "" && rs.PROJECT_CD != null){
        //                 project = "(엔지니어링) ";
        //             }
        //             var title =  project + busnName + " 출장지 : " + rs.VISIT_LOC_SUB;
        //             if(rs.VISIT_LOC_SUB != null && rs.VISIT_LOC_SUB != ''){
        //                 // $("#bustripReq").val(title);
        //                 // $("#hrBizReqResultId").val(rs.HR_BIZ_REQ_RESULT_ID);
        //             }
        //         }
        //     }
        // });

        bustInfo.bustripMainGrid();
    },

    bustripMainGrid : function(){
        let dataSource = new kendo.data.DataSource({
            serverPaging: false,
            transport: {
                read: {
                    url: "/bustrip/getProjectBustList",
                    dataType: "json",
                    type: "post"
                },
                parameterMap: function(data){
                    data.startDate = $("#start_date").val();
                    data.endDate = $("#end_date").val();
                    data.projectCd = $("#pjtSn").val();
                    data.busnName = $("#busnName").val();
                    data.empSeq = $("#regEmpSeq").val();
                    data.pjtSn = $("#pjtSn").val();
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

        $("#bustripMainGrid").kendoGrid({
            dataSource: dataSource,
            sortable: true,
            scrollable: true,
            selectable: "row",
            height: 480,
            pageable: {
                refresh: true,
                pageSizes: [ 10, 20, 30, 50, 100 ],
                buttonCount: 5
            },
            toolbar : [
                {
                    name : 'button',
                    template : function (e){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="bustInfo.bustripMainGrid()">' +
                            '	<span class="k-button-text">조회</span>' +
                            '</button>';
                    }
                }
            ],
            dataBound : function(e){
                const grid = this;
                grid.tbody.find("tr").click(function (e) {
                    const dataItem = grid.dataItem($(this));
                    console.log(dataItem);

                    $("#contEtc").val(dataItem.RESULT);

                    grid.tbody.find("tr").each(function (){
                        $(this).css("background-color", "");
                    });

                    $(this).css("background-color", "#a7e1fc");
                });
            },
            noRecords: {
                template: "데이터가 존재하지 않습니다."
            },
            columns: [
                {
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
                        return  $("#pjtNm").val();
                    }
                }, {
                    field: "EMP_NAME",
                    title: "출장자",
                    width: 80
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
                    width: 80,
                    template : function (e){
                        if(e.USE_TRSPT == 1){
                            return "카니발";
                        } else if(e.USE_TRSPT == 2){
                            return "아반떼";
                        } else if (e.USE_TRSPT == 3){
                            return "트럭";
                        } else if (e.USE_TRSPT == 4){
                            return "모하비";
                        } else if (e.USE_TRSPT == 5){
                            return "솔라티";
                        } else if (e.USE_TRSPT == 6){
                            return "드론관제차량";
                        } else if (e.USE_TRSPT == 7){
                            return "자가";
                        } else if (e.USE_TRSPT == 8){
                            return "대중교통";
                        } else {
                            return "";
                        }
                    }
                }, {
                    title : "상태",
                    width: 50,
                    template : function (e){
                        if(e.RS_STATUS != null && e.RS_STATUS != ""){
                            if(e.RS_STATUS == 100){
                                return "결과보고완료"
                            } else {
                                return "신청완료"
                            }
                        } else {
                            if(e.STATUS == 100){
                                return "신청완료";
                            } else {
                                return "작성중";
                            }
                        }
                    }
                }, {
                    title : "",
                    width: 50,
                    template : function (e){
                        console.log(e);
                        return '<button type="button" class="k-button k-button-solid-base" onclick="bustInfo.bustripReqPop('+e.HR_BIZ_REQ_ID+', \'req\')">보기</button>';
                    }
                }, {
                    title : "",
                    width: 50,
                    template : function (e){
                        console.log(e);
                        return '<button type="button" class="k-button k-button-solid-error" onclick="bustInfo.fn_delPjtBustrip('+e.HR_BIZ_REQ_RESULT_ID+', '+e.HR_BIZ_REQ_ID+')">제외</button>';
                    }
                }
            ]
        }).data("kendoGrid");
    },

    fn_delPjtBustrip : function (key, reqKey){
        var data= {
            hrBizReqResultId : key,
            hrBizReqId : reqKey,
        }

        $.ajax({
            url : "/project/engn/delPjtBustrip",
            data : data,
            type : "post",
            dataType : "json",
            success : function(rs){
               if(rs.code == 200){
                   $("#bustripMainGrid").data("kendoGrid").dataSource.read();
               }
            }
        })
    },

    fn_popBustrip : function (){
        var url = "/bustrip/pop/viewBustripList.do";
        var name = "_blank";
        var option = "width = 1300, height = 670, top = 200, left = 400, location = no"
        var popup = window.open(url, name, option);
    },

    fn_save : function (){

        if($("#hrBizReqResultId").val() == ""){
            alert("출장 내역을 선택해주세요.");
            return ;
        }

        var data ={
            contEtc : $("#contEtc").val(),
            hrBizReqResultId : $("#hrBizReqResultId").val(),
            hrBizReqId : $("#hrBizReqId").val(),
            bustripReq : $("#bustripReq").val(),
            pjtSn : $("#pjtSn").val(),
            engnSn : $("#engnSn").val(),
            busnName : $("#pjtNm").val()
        }

        $.ajax({
            url : "/project/engn/setBustInfo",
            data : data,
            type : "post",
            dataType : "json",
            success: function(rs){
                alert("저장되었습니다.");

                window.location.href="/project/pop/viewRegProject.do?pjtSn=" + data.pjtSn + "&tab=1";

            }
        });


        console.log("출장 정보");
    },

    bustripReqPop: function(e, type){
        let url = "/bustrip/pop/bustripReqPop.do?pjtSn=" + e;

        if(type == "req"){
            url = "/bustrip/pop/bustripReqPop.do?hrBizReqId=" + e;
        }

        let name = "bustripReqPop";
        let option = "width=1200, height=700, scrollbars=no, top=100, left=200, resizable=no, toolbars=no, menubar=no"
        window.open(url, name, option);
    },
}