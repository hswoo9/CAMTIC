var rdTaskPop = {


    fn_defaultScript : function(){

        rdTaskPop.fn_popMainGrid();
    },


    fn_popMainGrid : function (){
        let dataSource = new kendo.data.DataSource({
            serverPaging: false,
            transport: {
                read: {
                    url: "/inside/getPjtList",
                    dataType: "json",
                    type: "post"
                },
                parameterMap: function(data){
                    data.busnClass = $("#busnClass").val();
                    data.myEmpSeq = $("#myEmpSeq").val();
                    data.myDeptSeq = $("#myDeptSeq").val();
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

        $("#popMainGrid").kendoGrid({
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
                    console.log(dataItem);
                });
            },
            columns: [
                {
                    field: "BUSN_NM",
                    title: "사업구분",
                    width: "5%"
                }, {
                    field: "PJT_CD",
                    title: "프로젝트 코드",
                    width: "7%"
                }, {
                    field: "PJT_NM",
                    title: "프로젝트 명",
                    width: "20%"
                }, {

                    field: "STR_DT",
                    title: "수주일",
                    width: "7%",
                    template: function(e){

                        if(e.STR_DT == null || e.STR_DT == ""){
                            return "";
                        }
                        var date = new Date(e.STR_DT);
                        var yyyy = date.getFullYear();
                        var mm = date.getMonth()+1;
                        mm = mm >= 10 ? mm : '0'+mm;	// 10 보다 작으면 0을 앞에 붙여주기 ex) 3 > 03
                        var dd = date.getDate();
                        dd = dd >= 10 ? dd : '0'+dd;	// 10 보다 작으면 9을 앞에 붙여주기 ex) 9 > 09
                        return yyyy+'-'+mm+'-'+dd;
                    }
                }, {
                    field: "END_DT",
                    title: "종료일자",
                    width: "7%",
                    template: function(e){
                        if(e.END_DT == null || e.END_DT == ""){
                            return "";
                        }
                        var date = new Date(e.END_DT);
                        var yyyy = date.getFullYear();
                        var mm = date.getMonth()+1;
                        mm = mm >= 10 ? mm : '0'+mm;	// 10 보다 작으면 0을 앞에 붙여주기 ex) 3 > 03
                        var dd = date.getDate();
                        dd = dd >= 10 ? dd : '0'+dd;	// 10 보다 작으면 9을 앞에 붙여주기 ex) 9 > 09
                        return yyyy+'-'+mm+'-'+dd;
                    }
                }, {
                    field: "PJT_AMT",
                    title: "수주금액",
                    width: "7%",
                    template: function(e){
                        return '<div style="text-align: right;">'+comma(e.PJT_AMT)+'</div>';
                    }
                }, {
                    field: "PM",
                    title: "PM",
                    width: "5%",
                    template : function (e){
                        var html = "";

                        if(e.BUSN_CLASS == "S" || e.BUSN_CLASS == "R"){
                            html = e.EMP_NAME || "";
                        } else {
                            html = e.PM || "";
                        }
                        return html;
                    }
                }, {
                    field: "PJT_STEP_NM",
                    title: "진행단계",
                    width: "5%",
                    template: function(e){
                        if(e.BUSN_CLASS == "D"){
                            var pjtStepNm = "상담";
                            if(e.PJT_STOP == "Y"){
                                pjtStepNm = "미수주";
                            } else if(e.PJT_STEP == "E0"){
                                pjtStepNm = "상담";
                            } else if(e.PJT_STEP == "E1"){
                                pjtStepNm = "견적";
                            } else if(e.PJT_STEP == "E2"){
                                pjtStepNm = "수주";
                            } else if(e.PJT_STEP == "E3"){
                                pjtStepNm = "개발계획";
                            } else if(e.PJT_STEP == "E4"){
                                pjtStepNm = "공정";
                            } else if(e.PJT_STEP == "E5"){
                                pjtStepNm = "납품";
                            } else if(e.PJT_STEP == "E6"){
                                pjtStepNm = "결과보고";
                            } else if(e.PJT_STEP == "E7"){
                                pjtStepNm = "원가보고";
                            }
                        } else if (e.BUSN_CLASS = "R") {
                            if(e.PJT_STEP == "R"){
                                pjtStepNm = "예상수주";
                            } else if(e.PJT_STEP == "R2"){
                                pjtStepNm = "수주보고";
                            }
                        }

                        return pjtStepNm;
                    }
                }, {
                    title: "",
                    width: "5%",
                    template: function(e){

                        return '<button type="button" class="k-button k-button-solid-base" onclick="rdTaskPop.fn_ProjectNm('+e.PJT_SN+', \''+e.PJT_NM+'\', \''+e.PJT_CD+'\');">선택</button>';
                    }
                }
            ],
        }).data("kendoGrid");
    },

    fn_ProjectNm: function(key, name, cd){
        opener.parent.selectProject(key, name, cd);

        window.close();
    }
}