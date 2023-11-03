const lectureTeacher = {
    fn_defaultScript: function(){
        /*this.fn_pageSet();*/
        this.fn_dataSet();
        this.fn_mainGrid();
    },

    fn_dataSet: function(){
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
                    data.pk = $("#start_date").val();
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

        let dataSourceS = new kendo.data.DataSource({
            serverPaging: false,
            transport: {
                read : {
                    url : "/projectUnRnd/getLectureTeacherSelectList",
                    dataType : "json",
                    type : "post"
                },
                parameterMap: function(data){
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



        $("#teacherGridA").kendoGrid({
            dataSource: dataSourceA,
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
            dataBound: this.onDataBound,
            columns: [
                {
                    headerTemplate: '<input type="checkbox" id="checkAllA" name="checkAllA" onclick="fn_checkAll(\'checkAllA\', \'largeCategoryPk\');"/>',
                    template : "<input type='checkbox' name='largeCategoryPk' class='largeCategoryPk' value='#=PRODUCT_CODE_ID#'/>",
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
    },

    fn_saveBtn: function(){
        const data = {
            pjtSn: $("#pjtSn").val(),

            projectType: $("#projectType").data("kendoDropDownList").value(),
            projectTypeName: $("#projectType").data("kendoDropDownList").text(),
            fieldType: $("#fieldType").data("kendoDropDownList").value(),
            fieldTypeName: $("#fieldType").data("kendoDropDownList").text(),

            curriculumType: $("#curriculumType").data("kendoDropDownList").value(),
            curriculumTypeName: $("#curriculumType").data("kendoDropDownList").text(),
            courseType: $("#courseType").data("kendoDropDownList").value(),
            courseTypeName: $("#courseType").data("kendoDropDownList").text(),

            lectureName: $("#lectureName").val(),
            lectureNameEx: $("#lectureNameEx").val(),
            title: $("#title").val(),
            content1: $("#content1").val(),
            content2: $("#content2").val(),

            eduStartDt: $("#eduStartDt").val(),
            eduEndDt: $("#eduEndDt").val(),
            recruitStartDt: $("#recruitStartDt").val(),
            recruitEndDt: $("#recruitEndDt").val(),

            recruitNum: $("#recruitNum").val(),
            eduTime: $("#eduTime").val(),
            eduTimeEx: $("#eduTimeEx").val(),

            area: $("#area").val(),
            status: $("#status").data("kendoDropDownList").value(),
            statusName: $("#status").data("kendoDropDownList").text(),

            goal: $("#goal").val(),
            intro: $("#intro").val(),
            targetUser: $("#targetUser").val(),
            scheduleHtml: $("#scheduleHtml").val(),
            prospectus: $("#prospectus").val(),
            materials: $("#materials").val(),

            textbookFee: $("#textbookFee").val(),
            textbookFeeEx: $("#textbookFeeEx").val(),
            methodType: $("#methodType").data("kendoRadioGroup").value(),

            certType: $("#certType").data("kendoRadioGroup").value(),

            mainType: $("#mainType").data("kendoDropDownList").value(),
            mainTypeName: $("#mainType").data("kendoDropDownList").text(),

            regEmpSeq: $("#regEmpSeq").val()
        }

        /** 유효성 검사 */
        this.fn_validationCheck(data);

        const formData = new FormData();
        for (let key in data) {
            formData.append(key, data[key]);
        }

        const result = customKendo.fn_customFormDataAjax("/projectUnRnd/insLectureInfo", formData);

        if(result.code != 200){
            alert("저장 중 오류가 발생하였습니다.");
            window.close();
        }else{
            alert("단위사업이 등록되었습니다.");
            window.close();
        }
    },

    fn_validationCheck: function(data){
        if(data.projectType == ""){ alert("사업구분이 선택되지 않았습니다."); return; }
        if(data.fieldType == ""){ alert("교육분야가 선택되지 않았습니다."); return; }
        if(data.curriculumType == ""){ alert("과목명이 선택되지 않았습니다."); return; }
        if(data.courseType == ""){ alert("과정명이 선택되지 않았습니다."); return; }
        if(data.lectureName == ""){ alert("강좌명(사업명)이 작성되지 않았습니다."); return; }
        if(data.lectureNameEx == ""){ alert("강좌명(홍보용)이 작성되지 않았습니다."); return; }
        if(data.title == ""){ alert("주제(CEO)가 작성되지 않았습니다."); return; }
        if(data.recruitNum == ""){ alert("모집인원이 작성되지 않았습니다."); return; }
        if(data.eduTime == "" || data.eduTimeEx == ""){ alert("교육시간이 작성되지 않았습니다."); return; }
        if(data.area == ""){ alert("교육장소가 작성되지 않았습니다."); return; }
        if(data.textbookFee == "" || data.textbookFeeEx == ""){ alert("교육비가 작성되지 않았습니다."); return; }
        if(data.courseType == ""){ alert("메인게시여부가 선택되지 않았습니다."); return; }
    },

    fn_testData: function(){
        $("#projectType").data("kendoDropDownList").select(1);
        $("#fieldType").data("kendoDropDownList").select(1);
        $("#curriculumType").data("kendoDropDownList").select(1);
        $("#courseType").data("kendoDropDownList").select(1);

        $("#lectureName").val("test");
        $("#lectureNameEx").val("test");
        $("#title").val("test");
        $("#content1").val("test");
        $("#content2").val("test");

        $("#eduStartDt").val("2023-12-01");
        $("#eduEndDt").val("2023-12-31");
        $("#recruitStartDt").val("2023-11-01");
        $("#recruitEndDt").val("2023-11-10");

        $("#recruitNum").val("10");
        $("#eduTime").val("20");
        $("#eduTimeEx").val("매주월요일 18:00~22:00");

        $("#area").val("test");
        $("#status").data("kendoDropDownList").select(1);

        $("#goal").val("test");
        $("#intro").val("test");
        $("#targetUser").val("test");
        $("#scheduleHtml").val("test");
        $("#prospectus").val("test");
        $("#materials").val("test");

        $("#textbookFee").val("10000");
        $("#textbookFeeEx").val("교재비 제목 : 123");
        $("#methodType").data("kendoRadioGroup").value(1);

        $("#mainType").data("kendoDropDownList").select(1);
    }
}