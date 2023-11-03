const lecturePersonReq = {
    fn_defaultScript: function(){
        this.fn_pageSet();
        this.fn_mainGrid();
    },

    fn_pageSet: function(){

    },

    fn_mainGrid: function(){
        let dataSource = new kendo.data.DataSource({
            serverPaging: false,
            transport: {
                read : {
                    url : "/projectUnRnd/getPersonList",
                    dataType : "json",
                    type : "post"
                },
                parameterMap: function(data){
                    data.notIn = $("#pk").val();
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

        $("#personGrid").kendoGrid({
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
            toolbar: [
                {
                    name: 'button',
                    template: function (e) {
                        return '<button type="button" class="k-button k-button-md k-button-solid k-button-solid-base" onclick="unRndLectList.gridReload()">' +
                            '	<span class="k-button-text">조회</span>' +
                            '</button>';
                    }
                }

            ],
            noRecords: {
                template: "데이터가 존재하지 않습니다."
            },
            dataBound: function(){
                const grid = this;
                grid.tbody.find("tr").click(function(){
                    const dataItem = grid.dataItem($(this));
                    const teacherSn = dataItem.PERSON_SN;
                    $("#person"+teacherSn).trigger("click");
                });
            },
            columns: [
                {
                    headerTemplate: '<input type="checkbox" id="checkAll" name="checkAll" onclick="fn_checkAll(\'checkAll\', \'person\');"/>',
                    template : "<input type='checkbox' id='person#=PERSON_SN#' name='person' class='person' value='#=PERSON_SN#'/>",
                    width: "5%"
                }, {
                    title: "번호",
                    template: "#= --record #",
                    width: "5%"
                }, {
                    field: "NAME",
                    title: "이름",
                    width: "10%"
                }, {
                    field: "BELONG",
                    title: "소속",
                    width: "40%"
                }, {
                    field: "PART",
                    title: "부서",
                    width: "15%"
                }, {
                    field: "PLACE",
                    title: "직위",
                    width: "10%"
                }
            ],
            dataBinding: function(){
                record = fn_getRowNum(this, 2);
            }
        }).data("kendoGrid");
    },

    fn_saveBtn: function(){
        const data = {
            pk: $("#pk").val()
        }

        const checkBox = 'input[name="person"]:checked';
        const selectedElements = document.querySelectorAll(checkBox);

        let arr = new Array();
        selectedElements.forEach((el) => {
            let row = {
                value: el.value
            }
            arr.push(row);
        });

        if(arr.length == 0) {
            alert("강사가 선택되지 않았습니다.");
            return;
        }
        data.personList = JSON.stringify(arr);

        const result = customKendo.fn_customAjax("/projectUnRnd/insLecturePersonInfo", data);

        if(result.code != 200){
            alert("저장 중 오류가 발생하였습니다.");
        }else{
            opener.lecturePerson.fn_mainGrid();
        }
    }
}