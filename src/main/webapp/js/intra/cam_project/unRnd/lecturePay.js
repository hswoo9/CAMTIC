let lecturePay = {
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
                    field: "HP_NUM",
                    title: "휴대폰",
                    width: "5%"
                }, {
                    title: "교육비",
                    width: "5%",
                    template: function(row){
                        return fn_numberWithCommas(row.LEC_COST);
                    }
                }, {
                    title: "납부방법",
                    width: "6%",
                    template: function(row){
                        let payTypeText = "";
                        if(row.PAY_TYPE == "0"){
                            payTypeText = "무통장입금";
                        }else if(row.PAY_TYPE == "1"){
                            payTypeText = "신용카드";
                        }
                        return payTypeText;
                    }
                }, {
                    title: "납부상태",
                    width: "6%",
                    template: function(row){
                        let costText = "";
                        if(row.COST_YN == "Y"){
                            costText = "납부<br>";
                        }else if(row.COST_YN == "N"){
                            costText = "<span style='color: red'>미납</span><br>";
                        }else if(row.COST_YN == "R") {
                            costText = "<span style='color: red'>취소</span><br>";
                        }
                        return costText;
                    }
                }, {
                    field: "PAY_DT",
                    title: "납부일",
                    width: "5%"
                }, {
                    title: "납부금액",
                    width: "6%",
                    template: function(row){
                        return fn_numberWithCommas(row.PAY_AMT);
                    }
                }, {
                    title: "계산서",
                    width: "5%",
                    template: function(row){
                        let billText = "";
                        if(row.BILL_TYPE == "N"){
                            billText = "요청안함";
                        }else if(row.BILL_TYPE == "Y"){
                            billText = "영수발행";
                        }
                        return billText;
                    }
                }, {
                    title: "불참사유서",
                    width: "5%",
                    template: function(row){
                        return row.PARTIC_YN == 'N' ? "접수" : "미접수";
                    }
                }, {
                    title: "환불",
                    width: "5%",
                    template: function(row){
                        let refundText = "";
                        if(row.REFUND_TYPE == "A"){
                            refundText = "환불요청";
                        }else if(row.REFUND_TYPE == "R"){
                            refundText = "환불완료";
                        }
                        return refundText;
                    }
                }
            ],
            dataBinding: function(){
                record = fn_getRowNum(this, 2);
            }
        }).data("kendoGrid");
    },

    fn_refundBtn: function(stat){
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

        const result = customKendo.fn_customAjax("/projectUnRnd/updPersonRefund", data);

        if(result.code != 200){
            alert("저장 중 오류가 발생하였습니다.");
        }else{
            gridReload();
        }
    }
}