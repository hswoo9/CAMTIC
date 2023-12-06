var movJbStat = {

    global : {
        searchAjaxData : ""
    },

    fn_defaultScript : function(){

        $("#detailSearch2").kendoDropDownTree({
            placeholder: "선택하세요",
            checkboxes: true,
            checkAll: true,
            autoClose: false,
            dataSource: [
                {"name": "지역", "value": "MF_AREA"},
                {"name": "정상유무", "value": "ACTIVE"},
                {"name": "사업체명", "value": "MF_NAME"},
                {"name": "사업자 번호", "value": "MF_NO"},
                {"name": "대표자 성명(성별)", "value": "CEO_NAME"},
                {"name": "대표자 휴대폰", "value": "CEO_TEL_NUM"},
                {"name": "주소", "value": "ADDR"},
                {"name": "본사소재지", "value": "LOCATION"},
                {"name": "설립일", "value": "EST_DATE"},
                {"name": "업력", "value": "HISTORY"},
                {"name": "전화번호", "value": "TEL_NUM"},
                {"name": "팩스번호", "value": "FAX_NUM"},
                {"name": "홈페이지", "value": "HOME_PAGE"},
                {"name": "E-MAIL", "value": "EMAIL"},
                {"name": "담당자 성명", "value": "CHARGE_NAME"},
                {"name": "담당자 휴대폰", "value": "CHARGE_TEL_NUM"},
                {"name": "업종코드", "value": "INDUSTRY"},
                {"name": "주생산품", "value": "MAIN_PRODUCT"},
                {"name": "자동차부품 여부", "value": "AM_PART"},
                {"name": "자동차부품", "value": "AM_PART_TYPE"},
                {"name": "자본금(백만원)", "value": "CAPITAL"},
                {"name": "매출액", "value": "SALES"},
                {"name": "매출비율합계", "value": "SALES_AMT"},
                {"name": "매출비율도내", "value": "SALES_RATIO_PROV"},
                {"name": "매출비율도외", "value": "SALES_RATIO_OT_PROV"},
                {"name": "수출여부", "value": "EXPORT_YN"},
                {"name": "종사자수", "value": "EMP_CNT"},
                {"name": "외국인고용", "value": "EMP_FOREIGN"},
                {"name": "외국인직원수", "value": "FOREIGN_CNT"},
                {"name": "기업부설연구소/전담부서 운영유무", "value": "LABORATORY_YN"},
                {"name": "탄소소재활용", "value": "CARBON_YN"},
                {"name": "출원/등록 지식재산권", "value": "RPR_YN"},
                {"name": "지식재산권 활용 신규제품 개발여부", "value": "NEW_PRODUCT_YN"},
                {"name": "생산시설 투자계획", "value": "FACILITY_INVEST_YN"},
                {"name": "만족도 높은 분야", "value": "HIGHLY_SAT_FIELD"},
                {"name": "필요한분야", "value": "NEED_FIELD"},
                {"name": "개인정보동의", "value": "AGREE_YN"},
                {"name": "제3자동의", "value": "AGREE2_YN"}
            ],
            dataTextField: "name",
            dataValueField: "value",
            change : function(e){
                var jeonbukChk2 = "";
                var dataItems = e.sender.dataSource.data().filter(dataItem => this.value().indexOf(dataItem.value) > -1);

                if(dataItems.length == 0){
                    $("#statTbody *").remove();
                    return;
                }

                $.each(dataItems, function(i, v){
                    jeonbukChk2 += ","
                    if(v.value == "CEO_NAME"){
                        jeonbukChk2 += "CONCAT(" + v.value + ", '(', IF(CEO_GENDER = '1', '남', '여'), ')') AS CEO_NAME"
                    }else if(v.value == "ACTIVE"){
                        jeonbukChk2 += "IF(ACTIVE = 'Y', '정상', '') AS ACTIVE"
                    }else if(v.value == "EST_DATE"){
                        jeonbukChk2 += "DATE_FORMAT(EST_DATE, '%Y-%m-%d') AS EST_DATE"
                    }else if(v.value == "AM_PART"){
                        jeonbukChk2 += "IF(AM_PART = '1', 'O', 'X') AS AM_PART"
                    }else if(v.value == "AM_PART_TYPE"){
                        jeonbukChk2 += "REPLACE(REPLACE(REPLACE(AM_PART_TYPE, '1', '전기차'), '2', '내연차'), '3', '수소차') AS AM_PART_TYPE"
                    }else if(v.value == "EMP_FOREIGN"){
                        jeonbukChk2 += "IF(EMP_FOREIGN = '1', 'O', 'X') AS EMP_FOREIGN"
                    }else if(v.value == "EXPORT_YN"){
                        jeonbukChk2 += "IF(EXPORT_YN = '1', 'Y', 'N') AS EXPORT_YN"
                    }else if(v.value == "LABORATORY_YN"){
                        jeonbukChk2 += "IF(LABORATORY_YN = '1', 'Y', 'N') AS LABORATORY_YN"
                    }else if(v.value == "CARBON_YN"){
                        jeonbukChk2 += "IF(CARBON_YN = '1', 'Y', 'N') AS CARBON_YN"
                    }else if(v.value == "RPR_YN"){
                        jeonbukChk2 += "IF(RPR_YN = '1', 'Y', 'N') AS RPR_YN"
                    }else if(v.value == "NEW_PRODUCT_YN"){
                        jeonbukChk2 += "IF(NEW_PRODUCT_YN = '1', 'Y', 'N') AS NEW_PRODUCT_YN"
                    }else if(v.value == "FACILITY_INVEST_YN"){
                        jeonbukChk2 += "IF(FACILITY_INVEST_YN = '1', 'Y', 'N') AS FACILITY_INVEST_YN"
                    }else if(v.value == "AGREE_YN"){
                        jeonbukChk2 += "IF(AGREE_YN = '1', 'Y', 'N') AS AGREE_YN"
                    }else if(v.value == "AGREE2_YN"){
                        jeonbukChk2 += "IF(AGREE2_YN = '1', 'Y', 'N') AS AGREE2_YN"
                    }else{
                        jeonbukChk2 += v.value
                    }
                })

                movJbStat.global.searchAjaxData = {
                    mfNo : $("#mfNo").val(),
                    searchContent : jeonbukChk2.substring(1),
                    searchYear : $("#searchYear2").val()
                }

                var result = customKendo.fn_customAjax("/crm/getMfOverviewStatInfo.do", movJbStat.global.searchAjaxData);
                if(result.flag){
                    var data = result.data;
                    $("#statTbody *").remove();

                    $.each(dataItems, function(i, v){
                        var html = "" +
                            "<tr>" +
                            "<td>" + v.name + "</td>";
                        for(var i = 0; i < data.length; i++){
                            html += "<td>";
                            if(data[i][v.value] != null){
                                html += data[i][v.value];
                            }
                            html += "</td>";
                        }
                        html += "" +
                            "</tr>"

                        $("#statTbody").append(html)
                    })
                }
            }
        });
    },

    mfOverViewDataSet : function(){
        $("#statThead *").remove();

        var html = "" +
            "<tr>" +
                "<th>구분</th>";
            for(var i = 0; i < 5; i++){
                html += "" +
                "<th>" + (Number($("#searchYear2").val()) - i) + "</th>";
            }
        html += "" +
            "</tr>";
        $("#statThead").append(html);
        $("#detailSearch2").data("kendoDropDownTree").trigger("change");
    },

    comma: function(str) {
        str = String(str);
        return str.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,');
    },

    uncomma: function(str) {
        str = String(str);
        return str.replace(/[^\d]+/g, '');
    },
}