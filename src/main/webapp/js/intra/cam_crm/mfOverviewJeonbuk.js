var movJb = {

    global : {
        searchAjaxData : ""
    },

    fn_defaultScript : function(){
        $("#searchYear").kendoDatePicker({
            start: "decade",
            depth: "decade",
            culture : "ko-KR",
            format : "yyyy",
            value : new Date()
        });

        $("#detailSearch").kendoDropDownTree({
            placeholder: "선택하세요",
            checkboxes: true,
            checkAll: true,
            autoClose: false,
            dataSource: [
                {"name": "지역", "value": "area"},
                {"name": "정상유무", "value": "active"},
                {"name": "사업체명", "value": "mfName"},
                {"name": "사업자 번호", "value": "mfNo2"},
                {"name": "대표자 성명(성별)", "value": "ceoName"},
                {"name": "대표자 휴대폰", "value": "ceoTelNum"},
                {"name": "주소", "value": "addr"},
                {"name": "본사소재지", "value": "location"},
                {"name": "설립일", "value": "estDate"},
                {"name": "업력", "value": "history"},
                {"name": "전화번호", "value": "telNum"},
                {"name": "팩스번호", "value": "faxNum"},
                {"name": "홈페이지", "value": "homepage"},
                {"name": "E-MAIL", "value": "email"},
                {"name": "담당자 성명", "value": "chargeName"},
                {"name": "담당자 휴대폰", "value": "chargeTelNum"},
                {"name": "업종코드", "value": "industry"},
                {"name": "주생산품", "value": "mainProduct"},
                {"name": "자동차부품 여부", "value": "amPart"},
                {"name": "자동차부품", "value": "amPartType"},
                {"name": "자본금(백만원)", "value": "capital"},
                {"name": "매출액", "value": "sales"},
                {"name": "매출비율합계", "value": "salesAmt"},
                {"name": "매출비율도내", "value": "salesRatioProv"},
                {"name": "매출비율도외", "value": "salesRatioOtProv"},
                {"name": "수출여부", "value": "exportYn"},
                {"name": "종사자수", "value": "empCnt"},
                {"name": "외국인고용", "value": "empForeign"},
                {"name": "외국인직원수", "value": "foreignCnt"},
                {"name": "기업부설연구소/전담부서 운영유무", "value": "laboratoryYn"},
                {"name": "탄소소재활용", "value": "carbonYn"},
                {"name": "출원/등록 지식재산권", "value": "rprYn"},
                {"name": "지식재산권 활용 신규제품 개발여부", "value": "newProductYn"},
                {"name": "생산시설 투자계획", "value": "facilityInvestYn"},
                {"name": "만족도 높은 분야", "value": "highlySatField"},
                {"name": "필요한분야", "value": "needField"},
                {"name": "개인정보동의", "value": "agreeYn"},
                {"name": "제3자동의", "value": "agree2Yn"}
            ],
            dataTextField: "name",
            dataValueField: "value",
            change : function(){
                $("#jeonbukTb thead th, #jeonbukTb thead td").hide();
                $.each(this.value(), function(i, v){
                    $("." + v).show();
                })
            }
        });

        movJb.mfOverViewDataSet();
    },

    mfOverViewDataSet : function(){
        movJb.global.searchAjaxData = {
            mfNo : $("#mfNo").val(),
            searchYear : $("#searchYear").val()
        }

        var result = customKendo.fn_customAjax("/crm/getMfOverviewInfo", movJb.global.searchAjaxData);
        if(result.flag){
            var data = result.data;
            if(data != null){
                $("#area").text(data.MF_AREA);
                $("#active").text(data.ACTIVE);
                $("#mfName").text(data.MF_NAME);
                $("#mfNo2").text(data.MF_NO.substring(0, 3) + "-" + data.MF_NO.substring(3, 5) + "-" + data.MF_NO.substring(5));
                $("#ceoName").text(data.CEO_NAME + "(" + data.CEO_GENDER + ")");
                $("#ceoTelNum").text(data.CEO_TEL_NUM);
                $("#addr").text(data.ADDR);
                $("#estDate").text(data.EST_DATE);
                $("#history").text(data.HISTORY);
                $("#location").text(data.LOCATION);
                $("#telNum").text(data.TEL_NUM);
                $("#faxNum").text(data.FAX_NUM);
                $("#homepage").text(data.HOME_PAGE);
                $("#email").text(data.EMAIL);
                $("#chargeName").text(data.CHARGE_NAME);
                $("#chargeTelNum").text(data.CHARGE_TEL_NUM);
                $("#industry").text(data.INDUSTRY);
                $("#mainProduct").text(data.MAIN_PRODUCT);
                $("#amPart").text(data.AM_PART);
                $("#amPartType").text(data.AM_PART_TYPE);

                if(!isNaN(data.CAPITAL)){
                    $("#capital").text(movJb.comma(Number(movJb.uncomma(data.CAPITAL)) * 1000000));
                }else{
                    $("#capital").text(data.CAPITAL)
                }

                if(!isNaN(data.SALES)){
                    $("#sales").text(movJb.comma(Number(movJb.uncomma(data.SALES)) * 1000000));
                }else{
                    $("#sales").text(data.SALES);
                }

                if(!isNaN(data.SALES_AMT) && data.SALES_AMT != ""){
                    $("#salesAmt").text((data.SALES_AMT.replaceAll("%", '') * 100) + "%");
                } else if(data.SALES_AMT != "미응답"){
                    $("#salesAmt").text(data.SALES_AMT);
                } else{
                    $("#salesAmt").text("0%");
                }

                if(!isNaN(data.SALES_RATIO_PROV) && data.SALES_RATIO_PROV != ""){
                    $("#salesRatioProv").text((data.SALES_RATIO_PROV.replaceAll("%", '') * 100) + "%");
                } else if(data.SALES_RATIO_PROV != "미응답"){
                    $("#salesRatioProv").text(data.SALES_RATIO_PROV);
                } else{
                    $("#salesRatioProv").text("0%");
                }

                if(!isNaN(data.SALES_RATIO_OT_PROV) && data.SALES_RATIO_OT_PROV != ""){
                    $("#salesRatioOtProv").text((data.SALES_RATIO_OT_PROV.replaceAll("%", '') * 100) + "%");
                } else if(data.SALES_RATIO_OT_PROV != "미응답"){
                    $("#salesRatioOtProv").text(data.SALES_RATIO_OT_PROV);
                } else{
                    $("#salesRatioOtProv").text("0%");
                }

                if(data.EMP_CNT != null && data.EMP_CNT != ""){
                    $("#empCnt").text(data.EMP_CNT + "명");
                }else{
                    $("#empCnt").text("0명");
                }

                $("#empForeign").text(data.EMP_FOREIGN);

                if(data.FOREIGN_CNT != null && data.FOREIGN_CNT != ""){
                    $("#foreignCnt").text(data.FOREIGN_CNT + "명");
                }else{
                    $("#foreignCnt").text("0명");
                }

                $("#exportYn").text(data.EXPORT_YN);

                $("#laboratoryYn").text(data.LABORATORY_YN);
                $("#carbonYn").text(data.CARBON_YN);
                $("#rprYn").text(data.RPR_YN);
                $("#newProductYn").text(data.NEW_PRODUCT_YN);
                $("#facilityInvestYn").text(data.FACILITY_INVEST_YN);
                $("#highlySatField").text(data.HIGHLY_SAT_FIELD);
                $("#needField").text(data.NEED_FIELD);
                $("#agreeYn").text(data.AGREE_YN);
                $("#agree2Yn").text(data.AGREE2_YN);
            }else {
                $(".textTd").text("");
            }
        }
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