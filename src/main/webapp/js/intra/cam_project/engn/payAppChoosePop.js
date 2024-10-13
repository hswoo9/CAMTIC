var payAppChoosePop = {

    global : {
        searchAjaxData : ""
    },

    fn_defaultScript: function(){
        this.fn_pageSet();
        this.gridReload();
    },

    fn_pageSet: function(){
        payAppChoosePop.global.dropDownDataSource2 = [
            { text: "신청일", value: "1" },
            { text: "지출요청일", value: "2" },
            { text: "지출예정일", value: "3" }
        ]

        var d = new Date();
        var bd = new Date(d.setMonth(d.getMonth() - 1)); // 이전달
        var bdStr = d.getFullYear() + "-" + ('0' + (bd.getMonth() +  1 )).slice(-2) + "-" + ('0' + bd.getDate()).slice(-2)
        customKendo.fn_dropDownList("searchDate", payAppChoosePop.global.dropDownDataSource2, "text", "value", 3);
        customKendo.fn_datePicker("payAppStrDe", "depth", "yyyy-MM-dd", bdStr);
        customKendo.fn_datePicker("payAppEndDe", "depth", "yyyy-MM-dd", new Date());

        $("#payAppStrDe, #payAppEndDe").attr("readonly", true);

        payAppChoosePop.global.dropDownDataSource = [
            { text: "문서번호", value: "A" },
            { text: "신청건명", value: "B" },
            { text: "거래처", value: "D" },
            { text: "프로젝트명", value: "C" },
            { text: "신청자", value: "E" },
        ]
        customKendo.fn_dropDownList("searchKeyword", payAppChoosePop.global.dropDownDataSource, "text", "value");
        customKendo.fn_textBox(["searchValue"]);
    },

    gridReload: function(){
        payAppChoosePop.mainGrid("/project/payAppChooseList", {
            searchDate: $("#searchDate").val(),
            strDe: $("#payAppStrDe").val(),
            endDe: $("#payAppEndDe").val(),
            searchKeyword: $("#searchKeyword").val(),
            searchValue: $("#searchValue").val()
        });
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
                        return '<button type="button" class="k-button k-button-md k-button-solid k-button-solid-base" onclick="payAppChoosePop.gridReload()">' +
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
                    const payAppSn = dataItem.PAY_APP_SN;
                    $("#payAppSn"+payAppSn).trigger("click");
                });

                grid.tbody.find("input").click(function(){
                    $($(this)).trigger("click");
                });
            },
            columns: [
                {
                    headerTemplate: '<input type="checkbox" id="checkAll" name="checkAll" onclick="fn_checkAll(\'checkAll\', \'payAppSn\');"/>',
                    template : "<input type='checkbox' id='payAppSn#=PAY_APP_SN#' name='payAppSn' class='payAppSn' value='#=PAY_APP_SN#'/>",
                    width: 50
                }, {
                    title: "번호",
                    template: "#= --record #",
                    width: 50
                }, {
                    field: "PAY_APP_TYPE",
                    title: "문서유형",
                    width: 120,
                    template: function(e){
                        if(e.PAY_APP_TYPE == 1){
                            return "지급신청서";
                        } else if (e.PAY_APP_TYPE == 2){
                            return "여입신청서";
                        } else if(e.PAY_APP_TYPE == 3){
                            return "반납신청서";
                        } else if(e.PAY_APP_TYPE == 4){
                            return "대체신청서";
                        }
                    }
                }, {
                    field: "DOC_NO",
                    title: "문서번호",
                    width: 150,
                }, {
                    field: "APP_TITLE",
                    title: "신청건명",
                    template: function(e){
                        var status = "";
                        if(e.PAY_APP_TYPE == 1){
                            status = "rev";
                        } else if (e.PAY_APP_TYPE == 2){
                            status = "in";
                        } else if (e.PAY_APP_TYPE == 3){
                            status = "re";
                        } else if (e.PAY_APP_TYPE == 4){
                            status = "alt";
                        }

                        if(e.ORG_YN == 'N'){
                            return '<div style="cursor: pointer; font-weight: bold" onclick="paymentList.fn_reqRegPopup('+e.PAY_APP_SN+', \''+status+'\', \'user\')">'+e.APP_TITLE+'</div>';
                        } else {
                            return '<div style="cursor: pointer; font-weight: bold">'+e.APP_TITLE+'</div>';
                        }
                    }
                }, {
                    field: "EMP_NAME",
                    title: "신청자",
                    width: 80
                }, {
                    field: "APP_DE",
                    title: "신청일",
                    width: 80,
                    template: function(e){

                        return new Date(e.REG_DT + 3240 * 10000).toISOString().split("T")[0];
                    }
                }, {
                    field: "TOT_COST",
                    title: "지출금액",
                    width: 110,
                    template: function(e){
                        if(e.TOT_COST != null && e.TOT_COST != "" && e.TOT_COST != undefined){
                            return '<div style="text-align: right">'+comma(e.TOT_COST)+'</div>';
                        } else {
                            return '<div style="text-align: right">'+0+'</div>';
                        }
                    }
                }, {
                    field: "DOC_STATUS",
                    title: "상태",
                    width: 70,
                    template : function(e){
                        console.log(e);
                        var stat = "";
                        if(e.DOC_STATUS == "100"){
                            stat = "결재완료"
                        } else if(e.DOC_STATUS == "10" || e.DOC_STATUS == "50"){
                            stat = "결재중"
                        } else if(e.DOC_STATUS == "30"){
                            stat = "반려"
                        } else {
                            stat = "작성중"
                        }
                        return stat;
                    }
                }
            ],
            dataBinding: function(){
                record = fn_getRowNum(this, 2);
            }
        }).data("kendoGrid");
    },

    fn_saveBtn: function(){
        let payAppSnArr = [];
        $("input[name=payAppSn]:checked").each(function(i){
            payAppSnArr.push($(this).val());
        })
        let data = {
            payAppSnList: payAppSnArr.join(),
            pjtSn: $("#pjtSn").val()
        }
        if($("input[name=payAppSn]:checked").length == 0) {
            alert("지급신청서가 선택되지 않았습니다.");
            return;
        }

        const result = customKendo.fn_customAjax("/project/updPayAppChoose", data);

        if(result.code != 200){
            alert("저장 중 오류가 발생하였습니다.");
        }else{
            alert("저장 되었습니다.");
            opener.costInfoGrid.gridReload();
            this.gridReload();
        }
    }
}

function gridReload(){
    payAppChoosePop.gridReload();
}