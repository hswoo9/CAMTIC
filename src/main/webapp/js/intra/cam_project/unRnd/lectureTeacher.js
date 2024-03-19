const lectureTeacher = {
    fn_defaultScript: function(){
        /*this.fn_pageSet();*/
        this.fn_dataSet();
        this.fn_mainGrid();
        $("input[name='teacherType']:radio").change(function(){
            lectureTeacher.fn_mainGrid();
        });
    },

    fn_dataSet: function() {
        const data = {
            pk: $("#pk").val()
        }
        const result = customKendo.fn_customAjax("/projectUnRnd/getLectureInfo", data);
        const lecMap = result.data;

        $("#lecTitleBs").text(lecMap.LEC_TITLE_BS);
    },

    fn_mainGrid: function(){
        let dataSourceA = new kendo.data.DataSource({
            serverPaging: false,
            transport: {
                read : {
                    url : "/projectUnRnd/getLectureTeacherList",
                    dataType : "json",
                    type : "post"
                },
                parameterMap: function(data){
                    data.notIn = $("#pk").val();
                    data.sEmpName = $("#sEmpName").val();
                    data.teacherType = $('input[name="teacherType"]:checked').val();
                    return data;
                }
            },
            schema : {
                data: function (data) {
                    return data.list;
                },
                total: function (data) {
                    return data.list.length;z
                },
            }
        });

        let dataSourceS = new kendo.data.DataSource({
            serverPaging: false,
            transport: {
                read : {
                    url : "/projectUnRnd/getLectureTeacherReqList",
                    dataType : "json",
                    type : "post"
                },
                parameterMap: function(data){
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
            }
        });


        $("#teacherGridA").kendoGrid({
            dataSource: dataSourceA,
            sortable: true,
            scrollable: true,
            selectable: "row",
            height: 489,
            toolbar: [
                {
                    name: 'button',
                    template: function (e) {
                        return '<div>' +
                            '<span style="position: relative; top: 5px; right: 5px">성명</span>'+
                            '<input type="text" id="sEmpName" style="width: 180px;" class="k-input" onkeypress="if(window.event.keyCode==13){lectureTeacher.fn_mainGrid();}">'+
                            '</div>';
                    }
                }, {
                    name: 'button',
                    template: function (e) {
                        return '<button type="button" class="k-button k-button-md k-button-solid k-button-solid-base" onclick="lectureTeacher.fn_mainGrid()">' +
                            '	<span class="k-button-text">조회</span>' +
                            '</button>';
                    }
                }, {
                    name: 'button',
                    template: function (e) {
                        return '<button type="button" class="k-button k-button-md k-button-solid k-button-solid-base" onclick="lectureTeacher.fn_saveBtn()">' +
                            '	<span class="k-button-text">등록</span>' +
                            '</button>';
                    }
                },
                {
                    name: 'radioButtons',
                    template: function (e) {
                        return '<label class="k-radio-label">' +
                            '<input type="radio" name="teacherType" value="allTeacher" class="k-radio" checked>' +
                            '<span class="k-radio-wrapper"></span>' +
                            '전체' +
                            '</label>' +
                            '<label class="k-radio-label">' +
                            '<input type="radio" name="teacherType" value="newTeacher" class="k-radio" >' +
                            '<span class="k-radio-wrapper"></span>' +
                            '신강사' +
                            '</label>' +
                            '<label class="k-radio-label">' +
                            '<input type="radio" name="teacherType" value="existingTeacher" class="k-radio">' +
                            '<span class="k-radio-wrapper"></span>' +
                            '구강사' +
                            '</label>';
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
                    const teacherSn = dataItem.TEACHER_SN;
                    $("#teacherA"+teacherSn).trigger("click");
                });

                grid.tbody.find("input").click(function(){
                    $($(this)).trigger("click");
                });
            },
            columns: [
                {
                    headerTemplate: '<input type="checkbox" id="checkAllA" name="checkAllA" onclick="fn_checkAll(\'checkAllA\', \'teacherA\');"/>',
                    template : "<input type='checkbox' id='teacherA#=TEACHER_SN#' name='teacherA' class='teacherA' value='#=TEACHER_SN#'/>",
                    width: 50
                }, {
                    field: "NAME",
                    title: "이름"
                }
            ],
            dataBinding: function(){
                record = fn_getRowNum(this, 2);
            }
        }).data("kendoGrid");
        $("#teacherGridS").kendoGrid({
            dataSource: dataSourceS,
            sortable: true,
            scrollable: true,
            selectable: "row",
            height: 489,
            toolbar: [
                {
                    name: 'button',
                    template: function (e) {
                        return '<button type="button" class="k-button k-button-md k-button-solid k-button-solid-base" onclick="lectureTeacher.fn_delBtn()">' +
                            '	<span class="k-button-text">삭제</span>' +
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
                    const teacherSn = dataItem.TEACHER_SN;
                    $("#teacherS"+teacherSn).trigger("click");
                });

                grid.tbody.find("input").click(function(){
                    $($(this)).trigger("click");
                });
            },
            columns: [
                {
                    headerTemplate: '<input type="checkbox" id="checkAllB" name="checkAllB" onclick="fn_checkAll(\'checkAllB\', \'teacherS\');"/>',
                    template : "<input type='checkbox' id='teacherS#=TEACHER_SN#' name='teacherS' class='teacherS' value='#=TEACHER_REQ_SN#'/>",
                    width: 50
                }, {
                    field: "NAME",
                    title: "이름"
                }, {
                    field: "TEACH_TIME",
                    title: "시간",
                    template : "<input type='text' id='teachTime#=TEACHER_REQ_SN#' name='teachTime' class='k-input' value='#=teachTime#' onblur='lectureTeacher.fn_timeInsert(#=TEACHER_REQ_SN#)' onkeypress='if(window.event.keyCode==13){lectureTeacher.fn_timeInsert(#=TEACHER_REQ_SN#);}' style='width: 60%'/>",
                    width: 100
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

        const checkBox = 'input[name="teacherA"]:checked';
        const selectedElements = document.querySelectorAll(checkBox);

        let arr = new Array();
        selectedElements.forEach((el) => {
            let row = {
                value: el.value
            }
            arr.push(row);
        });


        /*var tcCount = $("#teacherGridS table tbody tr").length;
        console.log(tcCount)
        if (tcCount > 6) {
            alert("강사는 최대 6명까지 선택 가능합니다.");
            return;
        }*/

        if(arr.length == 0) {
            alert("강사가 선택되지 않았습니다.");
            return;
        }
        data.teacherList = JSON.stringify(arr);

        const result = customKendo.fn_customAjax("/projectUnRnd/insLectureTeacherInfo", data);

        if(result.code != 200){
            alert("저장 중 오류가 발생하였습니다.");
        }else{
            this.fn_mainGrid();
        }
    },

    fn_timeInsert: function(key){
        let data = {
            teachTime: $("#teachTime"+key).val(),
            teacherReqSn: key
        }
        const result = customKendo.fn_customAjax("/projectUnRnd/insConTeacherTimeInfo", data);

        if(result.code != 200){
            alert("삭제 중 오류가 발생하였습니다.");
        }else{
            this.fn_mainGrid();
        }
    },

    fn_delBtn: function(){
        let teacherArr = [];
        $("input[name=teacherS]:checked").each(function(i){
            teacherArr.push($(this).val());
        })
        let data = {
            teacherList: teacherArr.join()
        }
        if($("input[name=teacherS]:checked").length == 0) {
            alert("강사가 선택되지 않았습니다.");
            return;
        }

        const result = customKendo.fn_customAjax("/projectUnRnd/delLectureTeacherInfo", data);

        if(result.code != 200){
            alert("삭제 중 오류가 발생하였습니다.");
        }else{
            this.fn_mainGrid();
        }
    }
}