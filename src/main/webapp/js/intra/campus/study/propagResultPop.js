const propagView = {
    global: {
        propagInfo: {},
        propagUser: []
    },

    init: function(){
        propagView.dataSet();
        propagView.fn_btnSet();
        propagView.mainGrid();
        propagView.mainGrid3();
        propagView.makeTable();
    },

    makeTable: function(){
        let list = customKendo.fn_customAjax("/campus/getStudyPropagList", {
            studyInfoSn: $("#pk").val()
        }).list;
        console.log(list);
        let html = '';
        for(let i=0; i<list.length; i++){
            html = '';
            const map = list[i];
            html += '<tr class="addRow">';
            html += '   <td style="text-align: center"><input type="hidden" id="studyPropagSn'+i+'" value="'+map.STUDY_PROPAG_SN+'"/>'+(i+1)+'</td>';
            html += '   <td>'+map.PROPAG_DT + " (" + map.START_TIME +"~"+map.END_TIME+" / "+map.EDU_TIME+")"+'</td>';
            html += '   <td><input id="mng'+i+'" class="mng'+i+'" value="'+map.EDU_MNG_TIME+'"/></td>';
            html += '   <td><input id="user'+i+'" class="user'+i+'" value="'+map.EDU_USER_TIME+'"/></td>';
            let userList = customKendo.fn_customAjax("/campus/getStudyPropagUserList", {
                studyPropagSn: map.STUDY_PROPAG_SN
            }).list;
            html += '   <td>';
                for(let j=0; j<userList.length; j++){
                    const userMap = userList[j];
                    if(j != 0){
                        html += ',';
                    }
                    html += userMap.PROPAG_EMP_NAME;
                }
            html += '   </td>';
            html += '</tr>';
            $("#table").append(html);
            $("#mng"+i).kendoTextBox();
            $("#user"+i).kendoTextBox();
        }
    },

    dataSet: function(){
        let propagInfo = customKendo.fn_customAjax("/campus/getStudyInfoOne", {
            pk: $("#pk").val()
        }).data;
        propagView.global.propagInfo = propagInfo;

        $("#propagNameTd").text(propagInfo.STUDY_NAME);
        $("#propagDtTd").text(propagInfo.START_DT+" ~ "+propagInfo.END_DT+" / 매회"+propagInfo.START_TIME+" ~ "+propagInfo.END_TIME+" (총 "+propagInfo.EDU_TERM+"회 "+propagInfo.EDU_TIME+"시간)");
        $("#propagLocationTd").text(propagInfo.STUDY_LOCATION);
        $("#propagObjectTd").text(propagInfo.STUDY_OBJECT);
        $("#propagContentTd").text(propagInfo.STUDY_CONTENT);
        $("#propagAmtTd").text(fn_numberWithCommas(propagInfo.STUDY_MONEY));
        $("#propagAmtTextTd").text(propagInfo.STUDY_MONEY_VAL);
        $("#regDateTd").text(propagInfo.REG_DT);
        $("#regDeptTd").text(propagInfo.deptNm + " " + propagInfo.teamNm);
        if(propagInfo.dutyNm == ""){
            $("#regPositionTd").text(propagInfo.positionNm);
        }else{
            $("#regPositionTd").text(propagInfo.dutyNm);
        }
        $("#regEmpNameTd").text(propagInfo.REG_EMP_NAME);
        console.log(propagInfo);
        if(propagInfo.ADD_STATUS == "C" || propagInfo.ADD_STATUS == "S"){
            $("#saveBtn").hide();
        }
    },

    fn_btnSet: function(){
        console.log("eduInfo", propagView.global.propagInfo);
        let html = makeApprBtnHtml(propagView.global.propagInfo, 'fn_save()', '3-2');
        $("#propagResBtnBox").html(html);

        const status = propagView.global.propagInfo.STATUS;
        if((status == "10" || status == "20" || status == "50" || status == "100") || $("#mode").val() == "mng"){
            //propagView.fn_kendoUIEnableSet();
        }

        if($("#mode").val() == "mng" && status != "100"){
            $("#propagResBtnBox").hide();
        }
    },

    mainGrid: function(){
        let dataSource = new kendo.data.DataSource({
            serverPaging: false,
            transport: {
                read : {
                    url : '/campus/getStudyUserList',
                    dataType : "json",
                    type : "post"
                },
                parameterMap: function(data) {
                    data.studyClassSn = 4;
                    data.pk = $("#pk").val();
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
            height: 300,
            pageable : {
                refresh : true,
                pageSizes : [ 10, 20, 30, 50, 100 ],
                buttonCount : 5
            },
            noRecords: {
                template: "데이터가 존재하지 않습니다."
            },
            columns: [
                {
                    title: "소속",
                    width: 300,
                    template: function(row){
                        return row.STUDY_DEPT_NAME + " " + row.STUDY_TEAM_NAME;
                    }
                }, {
                    title: "직위",
                    template: function(row){
                        return row.STUDY_DUTY_NAME == "" ? row.STUDY_POSITION_NAME : row.STUDY_DUTY_NAME;
                    }
                }, {
                    field: "STUDY_EMP_NAME",
                    title: "성명",
                    width: 80
                }
            ]
        }).data("kendoGrid");

        let subDataSource = new kendo.data.DataSource({
            serverPaging: false,
            transport: {
                read : {
                    url : '/campus/getStudyUserList',
                    dataType : "json",
                    type : "post"
                },
                parameterMap: function(data) {
                    data.studyClassSn = 5;
                    data.pk = $("#pk").val();
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

        $("#subGrid").kendoGrid({
            dataSource: subDataSource,
            sortable: true,
            scrollable: true,
            selectable: "row",
            height: 300,
            pageable : {
                refresh : true,
                pageSizes : [ 10, 20, 30, 50, 100 ],
                buttonCount : 5
            },
            noRecords: {
                template: "데이터가 존재하지 않습니다."
            },
            columns: [
                {
                    title: "소속",
                    width: 300,
                    template: function(row){
                        return row.STUDY_DEPT_NAME + " " + row.STUDY_TEAM_NAME;
                    }
                }, {
                    title: "직위",
                    template: function(row){
                        return row.STUDY_DUTY_NAME == "" ? row.STUDY_POSITION_NAME : row.STUDY_DUTY_NAME;
                    }
                }, {
                    field: "STUDY_EMP_NAME",
                    title: "성명",
                    width: 80
                }
            ]
        }).data("kendoGrid");
    },

    mainGrid3: function(){
        let dataSource = new kendo.data.DataSource({
            serverPaging: false,
            transport: {
                read : {
                    url : "/campus/getStudyPropagList",
                    dataType : "json",
                    type : "post"
                },
                parameterMap: function(data) {
                    data.studyInfoSn = $("#pk").val();
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

        $("#mainGrid3").kendoGrid({
            dataSource: dataSource,
            sortable: true,
            scrollable: true,
            selectable: "row",
            height: 250,
            pageable : {
                refresh : true,
                pageSizes : [ 10, 20, 30, 50, 100 ],
                buttonCount : 5
            },
            noRecords: {
                template: "데이터가 존재하지 않습니다."
            },
            dataBound: function(){
                let grid = this;
                grid.element.off('dblclick');
                grid.tbody.find("tr").dblclick(function(){
                    const dataItem = grid.dataItem($(this).closest("tr"));
                    studyView.studyJournalPop(2, dataItem.STUDY_INFO_SN, dataItem.STUDY_JOURNAL_SN);
                });
            },
            columns: [
                {
                    title: "번호",
                    width: 50,
                    template: "#= --record #"
                }, {
                    title: "일시",
                    template: function(row){
                        console.log(row);
                        return row.PROPAG_DT + " (" + row.START_TIME +"~"+row.END_TIME+" / "+row.EDU_TIME+")";
                    }
                }, {
                    title: "학습시간",
                    width: 150,
                    template: function(row){
                        console.log(row);
                        return row.EDU_TIME + "시간";
                    }
                }, {
                    title: "인정시간",
                    columns : [
                        {
                            title: "지도자",
                            width: 150,
                            template: function(row){
                                console.log(row);
                                return (Number(row.EDU_TIME * 1.5)).toFixed(1) + "시간";
                            }
                        }, {
                            title: "학습자",
                            width: 150,
                            template: function(row){
                                console.log(row);
                                return row.EDU_TIME + "시간";
                            }
                        }
                    ]
                }
            ],
            dataBinding: function(){
                record = fn_getRowNum(this, 2);
            }
        }).data("kendoGrid");
    }
}

function gridReload(){
    propagView.mainGrid3();
    propagView.dataSet();
}