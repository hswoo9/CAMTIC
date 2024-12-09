var lecturePersonReq = {

    global : {
        searchAjaxData : ""
    },

    fn_defaultScript: function(){
        this.fn_pageSet();
        this.gridReload();

        $("#searchKeyword").kendoDropDownList({
            dataTextField: "text",
            dataValueField: "value",
            dataSource: [
                { text: "이름", value: "name" },
                { text: "소속", value: "crmNm" }
            ]
        });
    },

    fn_pageSet: function(){

    },

    gridReload: function(){
        lecturePersonReq.global.searchAjaxData = {
            notIn : $("#pk").val(),
            sEmpName : $("#sEmpName").val(),
            searchKeyword : $("#searchKeyword").val()
        }

        lecturePersonReq.mainGrid("/projectUnRnd/getPersonList", lecturePersonReq.global.searchAjaxData);
    },

    mainGrid: function(url, params){
        $("#personGrid").kendoGrid({
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
                        return '<div style="margin-left: 100px;">' +
                            '<span style="position: relative; top: 5px; right: 5px">검색어</span>'+
                            '<input type="text" id="searchKeyword" style="width: 90px; margin-right:10px;"/>'+
                            '<input type="text" id="sEmpName" style="width: 180px;" class="k-input" onkeypress="if(window.event.keyCode==13){gridReload();}">' +
                        '</div>';
                    }
                }, {
                    name: 'button',
                    template: function (e) {
                        return '<button type="button" class="k-button k-button-md k-button-solid k-button-solid-base" onclick="gridReload()">' +
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

                grid.tbody.find("input").click(function(){
                    $($(this)).trigger("click");
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
                    field: "USER_TYPE",
                    title: "구분",
                    width: "30px",
                    template: function(row){
                        if(row.USER_TYPE == "S"){
                            return "학생";
                        }else if(row.USER_TYPE == "C"){
                            return "재직자";
                        } else {
                            return "일반";
                        }
                    }
                },{
                    field: "NAME",
                    title: "이름",
                    width: "10%"
                }, {
                    /*field: "CO_NAME",*/
                    field: "CRM_NM",
                    title: "소속",
                    width: "30%",
                    template: function(row){
                        if(row.EXISTING_YN == "Y"){
                            if(row.CO_NAME == null){
                                return "";
                            } else {
                                return row.CO_NAME;
                            }
                        } else if(row.EXISTING_YN == "N"){
                            if(row.CRM_NM == null){
                                return "";
                            } else {
                                return row.CRM_NM;
                            }
                        } else {
                            return "";
                        }
                    }
                }, {
                    field: "PART",
                    title: "부서",
                    width: "15%",
                    template: function(row){
                        if(row.USER_TYPE == "S"){
                            if(row.SCHOOL_MAJOR == null){
                                return "";
                            } else {
                                return row.SCHOOL_MAJOR;
                            }
                        }else{
                            if(row.PART == null){
                                return "";
                            } else {
                                return row.PART;
                            }
                        }
                    }
                }, {
                    field: "PLACE",
                    title: "직위",
                    width: "10%"
                }, {
                    title: "처리명령",
                    width: "15%",
                    template: function(e){
                        let buttonHtml = '<button type="button" id="saveBtn" style="margin-right: 5px" class="k-button k-button-solid-primary" onclick="lecturePop.lecturePersonMngPop('+e.PERSON_SN+')">수정</button>';
                        buttonHtml += '<button type="button" id="delBtn" class="k-button k-button-solid-error" onclick="lecturePersonReq.fn_delete('+e.PERSON_SN+')">삭제</button>';
                        return buttonHtml;
                    }
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
            alert("수강자가 선택되지 않았습니다.");
            return;
        }
        data.personList = JSON.stringify(arr);

        const result = customKendo.fn_customAjax("/projectUnRnd/insLecturePersonInfo", data);

        if(result.code != 200){
            alert("저장 중 오류가 발생하였습니다.");
        }else{
            opener.gridReload();
            window.close();
        }
    },

    fn_delete: function(personSn){
        if(!confirm("삭제하시겠습니까?")){
            return;
        }

        const data = {
            personSn: personSn
        }

        const result = customKendo.fn_customAjax("/projectUnRnd/delLecturePersonData", data);

        if(result.code != 200){
            alert("삭제 중 오류가 발생하였습니다.");
        }else{
            alert("삭제되었습니다");
            gridReload();
        }
    }
}

function gridReload(){
    lecturePersonReq.gridReload();
}