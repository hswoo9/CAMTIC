const lecturePerson = {
    fn_defaultScript: function(){
        /*this.fn_pageSet();*/
        this.fn_mainGrid();
    },

    fn_mainGrid: function(){
        let dataSource = new kendo.data.DataSource({
            serverPaging: false,
            transport: {
                read : {
                    url : "/projectUnRnd/getLecturePersonReqList",
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
            }
        });

        $("#personGrid").kendoGrid({
            dataSource: dataSource,
            sortable: true,
            scrollable: true,
            selectable: "row",
            height: 489,
            toolbar: [
                {
                    name: 'button',
                    template: function (e) {
                        return '<button type="button" class="k-button k-button-md k-button-solid k-button-solid-base" onclick="lectureTeacher.fn_saveBtn()">' +
                            '	<span class="k-button-text">등록</span>' +
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
                    $("#teacherA"+teacherSn).trigger("click");
                });
            },
            columns: [
                {
                    headerTemplate: '<input type="checkbox" id="checkAllA" name="checkAllA" onclick="fn_checkAll(\'checkAllA\', \'teacherA\');"/>',
                    template : "<input type='checkbox' id='teacherA#=TEACHER_SN#' name='teacherA' class='teacherA' value='#=TEACHER_SN#'/>",
                    width: "5%"
                }, {
                    title: "번호",
                    template: "#= --record #",
                    width: "5%"
                }, {
                    field: "NAME",
                    title: "이름",
                    width: "5%"
                }, {
                    field: "NAME",
                    title: "회사명",
                    width: "6%"
                }, {
                    field: "NAME",
                    title: "부서",
                    width: "5%"
                }, {
                    field: "NAME",
                    title: "직책",
                    width: "5%"
                }, {
                    field: "NAME",
                    title: "생년월일",
                    width: "6%"
                }, {
                    field: "NAME",
                    title: "전화번호",
                    width: "6%"
                }, {
                    field: "NAME",
                    title: "팩스번호",
                    width: "6%"
                }, {
                    field: "NAME",
                    title: "휴대폰",
                    width: "5%"
                }, {
                    field: "NAME",
                    title: "수강신청일",
                    width: "6%"
                }, {
                    field: "NAME",
                    title: "신청상태",
                    width: "5%"
                }, {
                    field: "NAME",
                    title: "수강료(계산서)",
                    width: "5%"
                }, {
                    field: "NAME",
                    title: "불참사유서",
                    width: "5%"
                }
            ],
            dataBinding: function(){
                record = fn_getRowNum(this, 2);
            }
        }).data("kendoGrid");
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