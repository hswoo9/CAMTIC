var cardList = {

    global : {
        dropDownDataSource : "",
        searchAjaxData : "",
        saveAjaxData : "",
    },

    fn_defaultScript : function(){
        $("#rtYn").kendoDropDownList({
            dataSource : [
                {text : "선택하세요", value : ""},
                {text : "반출중", value : "N"},
                {text : "미반출", value : "Y"},
            ],
            dataTextField : "text",
            dataValueField : "value"
        });

        $("#rtYn").data("kendoDropDownList").select(2)
        customKendo.fn_textBox(["searchValue"])
        cardList.mainGrid();
    },

    mainGrid : function(){
        let dataSource = new kendo.data.DataSource({
            serverPaging: false,
            transport: {
                read: {
                    url: "/g20/getCardList",
                    dataType: "json",
                    type: "post"
                },
                parameterMap: function(data){
                    data.searchValue = $("#searchValue").val();
                    data.cardVal = 'M';
                    data.auth = "user";
                    data.rtYn = $("#rtYn").val();
                    return data;
                }
            },
            schema: {
                data: function(data){
                    return data.list;
                },
                total: function(data){
                    return data.list.length;
                },
            },
            pageSize: 10
        });

        $("#mainGrid").kendoGrid({
            dataSource: dataSource,
            sortable: true,
            scrollable: true,
            selectable: "row",
            height: 472,
            pageable: {
                refresh: true,
                pageSizes: [ 10, 20, 30, 50, 100 ],
                buttonCount: 5
            },
            noRecords: {
                template: "데이터가 존재하지 않습니다."
            },
            columns: [
                {
                    title : "G20",
                    columns : [
                        {
                            title: "카드명",
                            width: 300,
                            template: function (e){
                                if(e.RT_YN == "N"){
                                    return '<input type="hidden" id="trCd" value="' + e.TR_CD + '"/><input type="hidden" id="clttrCd" value="e.CLTTR_CD" />' +e.TR_NM;
                                } else {
                                    return '<input type="hidden" id="trCd" value="' + e.TR_CD + '"/><input type="hidden" id="clttrCd" value="e.CLTTR_CD" />' +
                                        '<a href="javascript:cardList.fn_regCardToPop(\'' + e.TR_CD + '\', \'' + e.CARD_BA_NB + '\', \'' + e.TR_NM + '\');" style="font-weight: bold;">' + e.TR_NM + '</a>';
                                }

                            }
                        }, {
                            title: "카드번호",
                            width: 250,
                            template: function (e) {
                                if (e.CARD_BA_NB != null) {
                                    return e.CARD_BA_NB;
                                } else {
                                    return "";
                                }
                            }
                        }
                    ]
                }, {
                    title: "반출/사용",
                    columns : [
                        {
                            title : "반출여부",
                            template: function (e){
                                var rtYn = "";
                                if(e.RT_YN == "N"){
                                    rtYn = "반출중";
                                } else {
                                    rtYn = "미반출";
                                }

                                return rtYn;
                            }
                        }, {
                            title : "반출자",
                            field : "USE_EMP_NAME",
                            template : function (e){
                                var useEmpName = "";
                                if(e.RT_YN == "N"){
                                    useEmpName = e.USE_EMP_NAME;
                                }
                                return useEmpName;
                            }
                        }, {
                            title : "반출일시",
                            field : "CARD_TO_DE",
                            template : function (e){
                                var cardToDe = "";
                                cardToDe = e.CARD_TO_DE || "";
                                var cardToTime = e.CARD_TO_TIME || "";
                                if(e.RT_YN == "N"){
                                    return '<div style="font-weight: bold;">' + cardToDe + ' ' + cardToTime + '</div">';
                                } else {
                                    return '';
                                }
                            }
                        }, {
                            title : "반납예정일시",
                            field : "CARD_FROM_DE",
                            template : function (e){
                                var cardFromDe = "";
                                cardFromDe = e.CARD_FROM_DE || "";
                                var cardFromTime = e.CARD_FROM_TIME || "";
                                if(e.RT_YN == "N"){
                                    return '<div style="font-weight: bold;">' + cardFromDe + ' ' + cardFromTime + '</div">';
                                } else {
                                    return '';
                                }
                            }
                        }
                    ]
                }, {
                    title: "카드목록(관리자)",
                    columns : [
                        {
                            title : "담당자",
                            columns : [
                                {
                                    title : "부서/팀",
                                    field : "DEPT_NAME",
                                }, {
                                    title : "이름",
                                    field : "MNG_NAME",
                                }
                            ]
                        }
                    ]
                }

            ]
        }).data("kendoGrid");
    },

    fn_regCardToPop : function(trCd, baNb, cardNm){
        var url = "/card/regCardToPop.do?trCd=" + trCd + "&baNb=" + baNb + "&trNm=" + cardNm;

        var name = "_blank";
        var option = "width = 900, height = 400, top = 200, left = 400, location = no"
        var popup = window.open(url, name, option);
    }
}