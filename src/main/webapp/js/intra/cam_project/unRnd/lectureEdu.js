var lectureEdu = {

    global : {
        attFiles : [],
        list : [],
    },

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
            pageSize: 10
        });

        $("#personGrid").kendoGrid({
            dataSource: dataSource,
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
                    name: 'excel',
                    text: '엑셀다운로드'
                }
            ],
            excel : {
                fileName : "수강생 관리 목록.xlsx",
                filterable : true
            },
            excelExport: exportGrid,
            noRecords: {
                template: "데이터가 존재하지 않습니다."
            },
            dataBound: function(){
                const grid = this;
                grid.tbody.find("tr").click(function(){
                    const dataItem = grid.dataItem($(this));
                    const personSn = dataItem.PERSON_SN;
                    $("#person"+personSn).trigger("click");
                });

                grid.tbody.find("input").click(function(){
                    $($(this)).trigger("click");
                });
            },
            columns: [
                {
                    headerTemplate: '<input type="checkbox" id="checkAll" name="checkAll" onclick="fn_checkAll(\'checkAll\', \'person\');"/>',
                    template : "<input type='checkbox' id='person#=PERSON_SN#' name='person' class='person' value='#=PERSON_SN#'/><input type='hidden' id='personReqSn#=PERSON_SN#' value='#=PERSON_REQ_SN#'/>",
                    width: "30px"
                }, {
                    title: "번호",
                    template: "#= --record #",
                    width: "30px"
                },{
                    field: "USER_TYPE",
                    title: "구분",
                    width: "40px",
                    template: function(row){
                        if(row.USER_TYPE == "S"){
                            return "학생";
                        }else if(row.USER_TYPE == "C"){
                            return "재직자";
                        } else {
                            return "일반";
                        }
                    }
                }, {
                    field: "NAME",
                    title: "이름",
                    width: "40px"
                }, {
                    /*field: "CO_NAME",*/
                    field: "CRM_NM",
                    title: "소속",
                    width: "60px",
                    template: function(row){
                        if(row.CRM_NM != null){
                            return row.CRM_NM;
                        }else{
                            return "";
                        }
                    }
                }, {
                    field: "PART",
                    title: "부서(학과)",
                    width: "50px",
                    template: function(row){
                        if(row.USER_TYPE == "S"){
                            if(row.SCHOOL_MAJOR != null){
                                return row.SCHOOL_MAJOR;
                            }else if(row.SCHOOL_NAME != null){
                                return row.SCHOOL_NAME;
                            }else{
                                return "-";
                            }
                        }else if(row.PART != null){
                            return row.PART;
                        }else{
                            return "-";
                        }
                    }
                }, {
                    field: "PLACE",
                    title: "직위",
                    width: "50px"
                }, {
                    field: "BIRTH",
                    title: "생년월일",
                    width: "60px"
                }, /*{
                    field: "TEL_NUM",
                    title: "전화번호",
                    width: "6%"
                },*/ {
                    /*field: "FAX_NUM",*/
                    field: "CRM_FAX",
                    title: "팩스번호",
                    width: "60px"
                }, {
                    field: "HP_NUM",
                    title: "휴대폰",
                    width: "80px"
                },  {
                    field: "EMAIL",
                    title: "이메일",
                    width: "80px"
                }, {
                    field: "REQ_STATUS",
                    title: "수료(인증)",
                    width: "50px",
                    template: function(row){
                        let ox = "X";
                        if(row.REQ_STATUS == "O"){
                            ox = "O";
                        }
                        let auditText = "";
                        if(row.AUDIT_YN == "Y"){
                            auditText += "<br>(청강)"
                        }
                        return row.REQ_STATUS_NAME+"("+ox+")"+auditText;
                    }
                },{
                    title: "첨부파일",
                    width: "60px",
                    template: function(e){
                        lectureEdu.global.list.push(e);
                        var fileList = [];
                        var fileListStr = "";
                        if(e.FORM_FILE != "" && e.FORM_FILE != null && e.FORM_FILE != undefined){

                            return '<button type="button" class="k-button k-button-solid-base" onclick="lectureEdu.fn_filePopView('+e.PERSON_REQ_SN+')">첨부</button>';
                        } else {
                            return '';
                        }


                    }
                }

                /* {
                    field: "NAME",
                    title: "수강료<br>(계산서)",
                    width: "5%",
                    template: function(row){
                        let costText = "납부<br>";
                        if(row.COST_YN != "Y"){
                            costText = "<span style='color: red'>미납</span><br>";
                        }
                        return costText += fn_numberWithCommas(row.LEC_COST)+"원";
                    }
                }, {
                    title: "불참<br>사유서",
                    width: "5%",
                    template: function(row){
                        return row.PARTIC_YN == 'N' ? "접수" : "미접수";
                    }
                }*/
            ],
            dataBinding: function(){
                record = fn_getRowNum(this, 2);
            }
        }).data("kendoGrid");
    },

    fn_auditBtn: function(){
        let personArr = [];
        $("input[name=person]:checked").each(function(i){
            personArr.push($(this).val());
        })
        let data = {
            personList: personArr.join(),
            stat: 'Y',
            pk: $("#pk").val()
        }
        if($("input[name=person]:checked").length == 0) {
            alert("수강자가 선택되지 않았습니다.");
            return;
        }

        const result = customKendo.fn_customAjax("/projectUnRnd/updPersonAudit", data);

        if(result.code != 200){
            alert("저장 중 오류가 발생하였습니다.");
        }else{
            gridReload();
        }
    },

    fn_filePopView: function (key){

        var ls = lectureEdu.global.list;

        for(var i = 0 ; i < ls.length ; i++){
            if(ls[i].PERSON_REQ_SN == key){
                lectureEdu.global.attFiles = ls[i].fileList;
            }
        }

        var url = "/unrnd/pop/unrndFilePop.do";

        var name = "_blank";
        var option = "width = 850, height = 400, top = 200, left = 350, location = no";
        var popup = window.open(url, name, option);
    }

}