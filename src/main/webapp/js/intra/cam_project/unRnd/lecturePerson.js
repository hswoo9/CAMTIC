let lecturePerson = {
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
                    field: "REG_DATE",
                    title: "수강신청일",
                    width: "6%"
                }, {
                    field: "REQ_STATUS_NAME",
                    title: "신청상태",
                    width: "5%"
                }, {
                    field: "NAME",
                    title: "수강료<br>(계산서)",
                    width: "5%",
                    template: function(row){
                        let costText = "납부<br>";
                        if(row.COST_YN != '"Y'){
                            costText = "<span style='color: red'>미납</span><br>";
                        }
                        return costText += fn_numberWithCommas(row.LEC_COST)+"원";
                    }
                }, {
                    title: "불참<br>사유서",
                    width: "5%",
                    template: function(row){
                        return row.PARTIC_YN == 'Y' ? "미접수" : "접수";
                    }
                }
            ],
            dataBinding: function(){
                record = fn_getRowNum(this, 2);
            }
        }).data("kendoGrid");
    },

    fn_appBtn: function(stat){
        let personArr = [];
        $("input[name=person]:checked").each(function(i){
            personArr.push($(this).val());
        })
        let statText = "";
        if(stat == "Y"){
            statText = "신청완료";
        }else if(stat == "N"){
            statText = "수강취소";
        }else if(stat == "X"){
            statText = "불참";
        }else if(stat == "O"){
            statText = "수료";
        }else if(stat == "F"){
            statText = "미수료";
        }
        let data = {
            personList: personArr.join(),
            stat: stat,
            pk: $("#pk").val(),
            year: $("#year").val(),
            statText: statText
        }
        if($("input[name=person]:checked").length == 0) {
            alert("수강자가 선택되지 않았습니다.");
            return;
        }

        const result = customKendo.fn_customAjax("/projectUnRnd/updPersonApp", data);

        if(result.code != 200){
            alert("저장 중 오류가 발생하였습니다.");
        }else{
            gridReload();
        }
    },

    fn_particBtn: function(stat){
        let personArr = [];
        $("input[name=person]:checked").each(function(i){
            personArr.push($(this).val());
        })
        let data = {
            personList: personArr.join(),
            stat: stat,
            pk: $("#pk").val()
        }
        if($("input[name=person]:checked").length == 0) {
            alert("수강자가 선택되지 않았습니다.");
            return;
        }

        const result = customKendo.fn_customAjax("/projectUnRnd/updPersonPartic", data);

        if(result.code != 200){
            alert("저장 중 오류가 발생하였습니다.");
        }else{
            gridReload();
        }
    },

    fn_delBtn: function(){
        if(!confirm("삭제하시겠습니까?")){
            return;
        }

        let personArr = [];
        $("input[name=person]:checked").each(function(i){
            personArr.push($(this).val());
        })
        let data = {
            personList: personArr.join(),
            pk: $("#pk").val()
        }
        if($("input[name=person]:checked").length == 0) {
            alert("수강자가 선택되지 않았습니다.");
            return;
        }

        const result = customKendo.fn_customAjax("/projectUnRnd/delLecturePersonInfo", data);

        if(result.code != 200){
            alert("삭제 중 오류가 발생하였습니다.");
        }else{
            alert("삭제되었습니다.");
            gridReload();
        }
    }
}

function gridReload() {
    $("#personGrid").data("kendoGrid").dataSource.read();
}