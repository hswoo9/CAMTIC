let lectureEdu = {
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
                pageSizes : [ 10, 20, 30, 50, 100 ],
                buttonCount : 5
            },
            toolbar: [
                {
                    name: 'excel',
                    text: '엑셀다운로드'
                }
            ],
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
                    template : "<input type='checkbox' id='person#=PERSON_SN#' name='person' class='person' value='#=PERSON_SN#'/>",
                    width: "3%"
                }, {
                    title: "번호",
                    template: "#= --record #",
                    width: "3%"
                }, {
                    field: "NAME",
                    title: "이름",
                    width: "4%"
                }, {
                    field: "CO_NAME",
                    title: "회사명",
                    width: "6%"
                }, {
                    field: "PART",
                    title: "부서",
                    width: "5%"
                }, {
                    field: "PLACE",
                    title: "직책",
                    width: "5%"
                }, {
                    field: "BIRTH",
                    title: "생년월일",
                    width: "6%"
                }, {
                    field: "TEL_NUM",
                    title: "전화번호",
                    width: "6%"
                }, {
                    field: "HP_NUM",
                    title: "팩스번호",
                    width: "6%"
                }, {
                    field: "HP_NUM",
                    title: "휴대폰",
                    width: "5%"
                }, {
                    title: "수료(인증)",
                    width: "5%",
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
                }, {
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
                }
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
    }
}