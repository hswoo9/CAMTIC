var archiveList = {
    init: function(){
        archiveList.dataSet();
        archiveList.mainGrid();
    },

    dataSet: function (){
    },

    mainGrid: function () {
        var dataSource = new kendo.data.DataSource({
            serverPaging: false,
            transport: {
                read : {
                    url : '',
                    dataType : "json",
                    type : "post"
                },
                parameterMap: function(data) {
                    data.mod = "manage";
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
            height: 496,
            pageable : {
                refresh : true,
                pageSizes : [ 10, 20, 30, 50, 100 ],
                buttonCount : 5
            },
            toolbar: [
                {
                    name: 'excel',
                    text: '엑셀다운로드'
                }, {
                    name : 'button',
                    template : function (e){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-error" onclick="carManage.delBtn();">' +
                            '	<span class="k-button-text">삭제</span>' +
                            '</button>';
                    }
                }, {
                    name : 'button',
                    template : function (e){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="carManage.clearBtn();">' +
                            '	<span class="k-button-text">신규</span>' +
                            '</button>';
                    }
                }
            ],
            noRecords: {
                template: "데이터가 존재하지 않습니다."
            },
            dataBound : carManage.onDataBound,
            columns: [
                {
                    headerTemplate: '<input type="checkbox" id="checkAll" name="checkAll" onclick="fn_checkAll(\'checkAll\', \'carPk\');"/>',
                    template : "<input type='checkbox' name='carPk' class='carPk'/>",
                    width: 40
                }, {
                    field: "ROW_NUM",
                    title: "순번",
                    width: 50
                }, {
                    field: "CAR_CLASS_NAME",
                    title: "차량 종류",
                    width: 100
                }, {
                    field: "CAR_NUM_NAME",
                    title: "차량 번호",
                    width: 100
                }, {
                    title: "사용 부서",
                    template: function(row){
                        if(row.CAR_USE_DEPT_ACTIVE == "Y"){
                            const useDeptArr = row.CAR_USE_DEPT_NAME.split(",");
                            $("#useDept").data("kendoDropDownTree").value(useDeptArr);
                            const deptLength = useDeptArr.length
                            if(deptLength != 1) {
                                return useDeptArr[0]+"<br> 외 "+(useDeptArr.length-1)+"개 부서";
                            }else {
                                return useDeptArr[0];
                            }
                        }else {
                            return "전체";
                        }
                    }
                }, {
                    field: "MANAGER_NAME",
                    title: "등록자",
                    width: 70
                }, {
                    field: "REG_DT",
                    title: "등록일자",
                    width: 90
                }, {
                    title: "사용여부",
                    width: 50,
                    template: function(row){
                        if(row.ACTIVE == "Y"){
                            return "사용";
                        }else {
                            return "미사용";
                        }
                    }
                }
            ]
        }).data("kendoGrid");
    }
}