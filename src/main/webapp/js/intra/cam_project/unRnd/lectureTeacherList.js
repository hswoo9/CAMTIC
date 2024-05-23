var lectureTeacherList = {

    global : {
        searchAjaxData : ""
    },

    fn_defaultScript: function(){
        this.fn_pageSet();
        this.gridReload();
    },

    fn_pageSet: function(){
        customKendo.fn_textBox(["sEmpName"]);

        $("#teacherType").kendoDropDownList({
            dataTextField: "text",
            dataValueField: "value",
            dataSource: [
                { text: "전체", value: "" },
                { text: "신전문가", value: "newTeacher" },
                { text: "구전문가", value: "existingTeacher" }
            ],
            index: 0
        });

        $("#teacherType").data("kendoDropDownList").bind("change", lectureTeacherList.gridReload);
    },

    gridReload: function(){
        lectureTeacherList.global.searchAjaxData = {
            sEmpName : $("#sEmpName").val(),
            teacherType : $("#teacherType").val()
        }

        lectureTeacherList.mainGrid("/projectUnRnd/getLectureTeacherList", lectureTeacherList.global.searchAjaxData);
    },

    mainGrid: function(url, params){
        $("#lectureTeacherGrid").kendoGrid({
            dataSource: customKendo.fn_gridDataSource2(url, params),
            sortable: true,
            scrollable: true,
            selectable: "row",
            height: 489,
            pageable : {
                refresh : true,
                pageSizes : [ 10, 20, 50, "ALL" ],
                buttonCount : 5
            },
            toolbar: [
                {
                    name: 'button',
                    template: function (e) {
                        return '<button type="button" class="k-button k-button-md k-button-solid k-button-solid-info" onclick="lecturePop.lectureTeacherMngPop()">' +
                            '	<span class="k-button-text">신규 전문가 추가</span>' +
                            '</button>';
                    }
                }, {
                    name: 'button',
                    template: function (e) {
                        return '<button type="button" class="k-button k-button-md k-button-solid k-button-solid-base" onclick="lectureTeacherList.gridReload()">' +
                            '	<span class="k-button-text">조회</span>' +
                            '</button>';
                    }
                }

            ],
            noRecords: {
                template: "데이터가 존재하지 않습니다."
            },
            columns: [
                {
                    title: "번호",
                    template: "#= --record #",
                    width: "3%"
                }, {
                    field: "NAME",
                    title: "이름",
                    width: "10%"
                }, {
                    field: "TEL_NUM",
                    title: "전화번호",
                    width: "10%"
                }, {
                    field: "TEL_NUM",
                    title: "핸드폰",
                    width: "10%"
                }, {
                    field: "BELONG",
                    title: "소속",
                    width: "10%"
                }, {
                    field: "PART",
                    title: "부서",
                    width: "10%"
                }, {
                    field: "PLACE",
                    title: "직위",
                    width: "10%"
                }, {
                    title: "처리명령",
                    width: "8%",
                    template: function(e){
                        console.log(e);
                        let buttonHtml = '<button type="button" id="saveBtn" style="margin-right: 5px" class="k-button k-button-solid-primary" onclick="lecturePop.lectureTeacherMngPop('+e.TEACHER_SN+')">수정</button>';
                        buttonHtml += '<button type="button" id="delBtn" class="k-button k-button-solid-error" onclick="lectureTeacherList.fn_delete('+e.TEACHER_SN+')">삭제</button>';
                        return buttonHtml;
                    }
                }
            ],
            dataBinding: function(){
                record = fn_getRowNum(this, 2);
            }
        }).data("kendoGrid");
    },

    fn_delete: function(teacherSn){
        if(!confirm("삭제하시겠습니까?")){
            return;
        }

        const data = {
            teacherSn: teacherSn
        }

        const result = customKendo.fn_customAjax("/projectUnRnd/delLectureTeacherData", data);

        if(result.code != 200){
            alert("삭제 중 오류가 발생하였습니다.");
        }else{
            alert("삭제되었습니다");
            gridReload();
        }
    }
}

function gridReload(){
    lectureTeacherList.gridReload();
}