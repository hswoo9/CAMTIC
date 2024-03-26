var dutyInfo = {
    init: function(){
        dutyInfo.dataSet();
        dutyInfo.mainGrid();
    },

    dataSet: function(){
    },

    gridReload: function(){
        $("#mainGrid").data("kendoGrid").dataSource.read();
    },

    mainGrid: function(){
        let dataSource = new kendo.data.DataSource({
            serverPaging: false,
            transport: {
                read : {
                    url : '/campus/getDutyInfoList',
                    dataType : "json",
                    type : "post"
                },
                parameterMap: function(data) {
                    data.regEmpSeq = $("#regEmpSeq").val();
                    return data;
                }
            },
            schema : {
                data: function (data) {
                    return data.list;
                },
                total: function (data) {
                    return data.list.length;
                }
            },
            pageSize: 10,
        });

        $("#mainGrid").kendoGrid({
            dataSource: dataSource,
            sortable: true,
            scrollable: true,
            height: 551,
            pageable: {
                refresh: true,
                pageSizes: [ 10, 20, 30, 50, 100 ],
                buttonCount: 5
            },
            toolbar: [
                {
                    name: 'button',
                    template: function(){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-info" onclick="dutyInfo.dutyInfoReqPop(\'ins\');">' +
                            '	<span class="k-button-text">직무기술서 신규등록</span>' +
                            '</button>';
                    }
                }, {
                    name: 'button',
                    template: function(){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="dutyInfo.dutyInfoImagePop();">' +
                            '	<span class="k-button-text">직무기술서 개요</span>' +
                            '</button>';
                    }
                }
            ],
            noRecords: {
                template: "데이터가 존재하지 않습니다."
            },
            // dataBound : dutyInfo.onDataBound,
            columns: [
                {
                    title: "순번",
                    template: "#= --record #",
                    width: 50
                }, {
                    field: "DUTY_MONTH",
                    title: "적용년도"
                }, {
                    field: "DUTY_NAME",
                    title: "직무명",
                    template: function(row){
                        return '<a href="javascript:dutyInfo.dutyInfoReqPop(\'upd\', \''+row.DUTY_INFO_SN+'\');" style="font-weight: bold;">' + row.DUTY_NAME + '</a>'
                    }
                }, {
                    field: "DUTY_NAME",
                    title: "상태",
                    width: 150,
                    template: function(row){
                        if(row.STATUS == 0){
                            return "작성중";
                        }else if(row.STATUS == 10){
                            return "승인요청중";
                        }else if(row.STATUS == 30){
                            return "반려";
                        }else if(row.STATUS == 100){
                            return "승인완료";
                        }else{
                            return "-";
                        }
                    }
                }, {
                    field: "",
                    title: "",
                    width: 120,
                    template: function(row){
                        const today = new Date();
                        if(row.DUTY_YEAR == today.getFullYear()){
                            if(row.STATUS == 0){
                                return '<button type="button" id="appBtn" class="k-button k-button-solid-info" onclick="dutyInfo.fn_dutyCertReq('+row.DUTY_INFO_SN+', 10);">승인요청</button>';
                            } else if (row.STATUS == 10) {
                                return '<button type="button" id="canBtn" class="k-button k-button-solid-error" onclick="dutyInfo.fn_dutyCertReq('+row.DUTY_INFO_SN+', 0);">승인요청취소</button>';
                            } else {
                                return "-";
                            }
                        } else {
                            return "-";
                        }
                    }
                }
            ],
            dataBinding: function(){
                record = fn_getRowNum(this, 2);
            }
        }).data("kendoGrid");
    },

    onDataBound: function(){
        const grid = this;
        grid.tbody.find("tr").dblclick(function(){
            const dataItem = grid.dataItem($(this));
            const pk = dataItem.DUTY_INFO_SN;
            dutyInfo.dutyInfoReqPop("upd", pk);
        });
    },

    dutyInfoReqPop: function(mode, pk){
        let url = "/Campus/pop/dutyInfoReqPop.do?mode="+mode;
        if(mode == "upd" || mode == "mng"){
            url += "&pk="+pk;
        }
        const name = "dutyInfoReqPop";
        const option = "width = 1000, height = 800, top = 100, left = 200, location = no";
        window.open(url, name, option);
    },

    dutyInfoImagePop: function(){
        const url = "/Campus/pop/dutyInfoImagePop.do";
        const name = "dutyInfoPopImagePop";
        const option = "width = 960, height = 530, top = 100, left = 200, location = no";
        window.open(url, name, option);
    },

    fn_dutyCertReq: function(key, status){
        let data = {
            pk : key,
            regEmpSeq : $("#regEmpSeq").val(),
            regEmpName : $("#regEmpName").val(),
            status : status
        }

        if(status == 10){
            if(!confirm("요청하시겠습니까?")){
                return;
            }
        } else if(status == 0){
            if(!confirm("취소하시겠습니까?")){
                return;
            }
        }

        var result = customKendo.fn_customAjax("/campus/setDutyCertReq", data);

        if(result.flag){
            if(status == 10){
                alert("승인 요청이 완료되었습니다.");
            }else if(status == 0){
                alert("승인 요청이 취소되었습니다.");
            }
            dutyInfo.gridReload();
        }
    }
}
