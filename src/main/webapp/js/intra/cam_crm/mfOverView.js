var mov = {

    global : {
        dropDownDataSource : "",
        searchAjaxData : "",
        saveAjaxData : "",
    },

    fn_defaultScript : function (){

        $("#searchYear").kendoDatePicker({
            start: "decade",
            depth: "decade",
            culture : "ko-KR",
            format : "yyyy",
            value : new Date()
        });

        mov.global.dropDownDataSource = [
            { text: "지역", value: "MF_AREA" },
            { text: "사업체명", value: "MF_NAME" },
            { text: "사업자번호", value: "MF_NO" },
            { text: "대표자", value: "CEO_NAME" },
            { text: "주생산품", value: "MAIN_PRODUCT" }
        ]
        customKendo.fn_dropDownList("searchKeyword", mov.global.dropDownDataSource, "text", "value");
        customKendo.fn_textBox(["searchValue"]);

        mov.gridReload();
    },

    statGrid : function(url, param){
        var result = customKendo.fn_customAjax(url, param);
        $("#areaTr *").remove();
        $("#statTr *").remove();

        if(result.flag){
            var areaTd = "";
            var statTd = "";
            var sum = 0;

            for(var i = 0; i < result.data.length; i++){
                sum += Number(result.data[i].STAT);
                areaTd += '<th>' + result.data[i].MF_AREA + '</th>';
                statTd += '<td class="text-right"><a onclick="mov.gridReload(\'' + result.data[i].MF_AREA + '\')">' + mov.comma(result.data[i].STAT) + '</a></td>';

                if((i+1) == result.data.length){
                    areaTd = '<th>합계</th>' + areaTd;
                    statTd = '<td class="text-right">' + mov.comma(sum) + '</td>' + statTd;
                }
            }

            $("#areaTr").append(areaTd);
            $("#statTr").append(statTd);
        }
    },

    mainGrid: function(url, params){
        $("#mainGrid").kendoGrid({
            dataSource: customKendo.fn_gridDataSource(url, params),
            sortable: true,
            selectable: "row",
            serverPaging: true,
            pageable: {
                refresh: true,
                pageSizes : [ 10, 20, 50, "ALL" ],
                buttonCount: 5,
            },
            noRecords: {
                template: "데이터가 존재하지 않습니다."
            },
            toolbar: [
                {
                    name: 'button',
                    template: function(){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="mov.gridReload()">' +
                            '	<span class="k-button-text">조회</span>' +
                            '</button>';
                    }
                }, {
                    name: 'button',
                    template: function(){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-error" onclick="mov.setMfOverviewDel()">' +
                            '	<span class="k-button-text">삭제</span>' +
                            '</button>';
                    }
                }, {
                    name: 'button',
                    template: function(){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="mov.setMfOverviewByCrmInfoUpd()">' +
                            '	<span class="k-button-text">고객정보 최신화</span>' +
                            '</button>';
                    }
                }, {
                    name : 'button',
                    template : function (e){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-info" onclick="mov.fn_mfExcelUploadPop()">' +
                            '	<span class="k-button-text">등록양식 업로드</span>' +
                            '</button>';
                    }
                }, {
                    name : 'button',
                    template : function (e){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="mov.templateExcelFormDown()">' +
                            '	<span class="k-button-text">등록양식 다운로드</span>' +
                            '</button>';
                    }
                }],
            columns: [
                {
                    headerTemplate: '<input type="checkbox" id="checkAll" name="checkAll" style="top: 3px; position: relative" />',
                    template : "<input type='checkbox' id='mf#=CRM_MF_SN#' name='mf' value='#=CRM_MF_SN#' style=\"top: 3px; position: relative\" />",
                    width: 30,
                }, {
                    title: "번호",
                    width: 50,
                    template: "#= record-- #"
                }, {
                    title: "지역",
                    field: "MF_AREA",
                    width: 60,
                }, {
                    field: "ACTIVE",
                    title: "정상유무",
                    width: 80,
                }, {
                    title: "사업체명",
                    field: "MF_NAME",
                    width: 200,
                    template: function(e){
                        return "<a href='javascript:void(0);' onclick=\"mov.mfOverViewPopup(" + e.CRM_MF_SN + ", " + $("#searchYear").val() + ")\">" + e.MF_NAME + "</a>";
                    }
                }, {
                    title: "사업자번호",
                    field: "MF_NO",
                    width: 120,
                    template : function(e){
                        if(e.MF_NO != null && e.MF_NO != ""){
                            return e.MF_NO.substring(0, 3) + "-" + e.MF_NO.substring(3, 5) + "-" + e.MF_NO.substring(5)
                        }
                    }
                }, {
                    title: "대표자 성명",
                    field: "CEO_NAME",
                    width: 100
                }, {
                    title: "대표자 성별",
                    field: "CEO_GENDER",
                    width: 100
                }, {
                    title: "주소",
                    field: "ADDR",
                    width: 380,
                }, {
                    title: "설립일",
                    field: "EST_DATE",
                    width: 100,
                }, {
                    title: "업력",
                    field: "HISTORY",
                    width: 100,
                    template : function(e){
                        if(e.HISTORY != null && e.HISTORY != ""){
                            if(!isNaN(e.HISTORY)){
                                return e.HISTORY + "년";
                            }else{
                                return e.HISTORY;
                            }
                        }else{
                            return "0년";
                        }
                    }
                }, {
                    title: "본사소재지",
                    field: "LOCATION",
                    width: 100,
                }, {
                    title: "업종코드",
                    field: "INDUSTRY",
                    width: 100,
                }, {
                    title: "업종코드2자리",
                    field: "INDUSTRY2",
                    width: 100,
                }, {
                    title: "주생산품",
                    field: "MAIN_PRODUCT",
                    width: 300,
                }/*, {
                    title: "자동차부품",
                    field: "AM_PART",
                    width: 80,
                }, {
                    title: "자동차",
                    field: "AM_PART_TYPE",
                    width: 150,
                }, {
                    title: "전화번호",
                    field: "TEL_NUM",
                    width: 200,
                }, {
                    title: "팩스번호",
                    field: "FAX_NUM",
                    width: 120,
                }, {
                    title: "홈페이지",
                    field: "HOME_PAGE",
                    width: 150,
                }, {
                    title: "E-mail",
                    field: "EMAIL",
                    width: 200,
                }, {
                    title: "자본금",
                    field: "CAPITAL",
                    width: 100,
                    attributes: { style: "text-align: right" },
                    template : function(e){
                        if(!isNaN(e.CAPITAL)){
                            return mov.comma(Number(mov.uncomma(e.CAPITAL)) * 1000000);
                        }else{
                            return e.CAPITAL;
                        }
                    }
                }, {
                    title: "매출액",
                    field: "SALES",
                    width: 100,
                    attributes: { style: "text-align: right" },
                    template : function(e){
                        if(!isNaN(e.SALES)){
                            return mov.comma(Number(mov.uncomma(e.SALES)) * 1000000);
                        }else{
                            return e.SALES;
                        }
                    }
                }, {
                    title: "매출비율(합계)",
                    field: "SALES_AMT",
                    width: 100,
                    template : function(e){
                        if(!isNaN(e.SALES_AMT) && e.SALES_AMT != ""){
                            return (e.SALES_AMT.replaceAll("%", '') * 100) + "%"
                        } else if(e.SALES_AMT != "미응답"){
                            return e.SALES_AMT;
                        } else{
                            return "0%";
                        }
                    }
                }, {
                    title: "매출비율(도내)",
                    field: "SALES_RATIO_PROV",
                    width: 100,
                    template : function(e){
                        if(!isNaN(e.SALES_RATIO_PROV) && e.SALES_RATIO_PROV != ""){
                            return (e.SALES_RATIO_PROV.replaceAll("%", '') * 100) + "%"
                        } else if(e.SALES_RATIO_PROV != "미응답"){
                            return e.SALES_RATIO_PROV;
                        } else{
                            return "0%";
                        }
                    }
                }, {
                    title: "매출비율(도외)",
                    field: "SALES_RATIO_OT_PROV",
                    width: 100,
                    template : function(e){
                        if(!isNaN(e.SALES_RATIO_OT_PROV) && e.SALES_RATIO_OT_PROV != ""){
                            return (e.SALES_RATIO_OT_PROV.replaceAll("%", '') * 100) + "%"
                        } else if(e.SALES_RATIO_OT_PROV != "미응답"){
                            return e.SALES_RATIO_OT_PROV;
                        } else{
                            return "0%";
                        }
                    }
                }, {
                    title: "종사자수",
                    field: "EMP_CNT",
                    width: 100,
                    template : function(e){
                        if(e.EMP_CNT != null && e.EMP_CNT != ""){
                            return e.EMP_CNT + "명"
                        }else{
                            return "0명";
                        }
                    }
                }, {
                    title: "외국인 고용",
                    field: "EMP_FOREIGN",
                    width: 100,
                }, {
                    title: "외국인 직원수",
                    field: "FOREIGN_CNT",
                    width: 100,
                    template : function(e){
                        if(e.FOREIGN_CNT != null && e.FOREIGN_CNT != ""){
                            return e.FOREIGN_CNT + "명"
                        }else{
                            return "0명";
                        }
                    }
                }, {
                    title: "수출여부",
                    field: "EXPORT_YN",
                    width: 100,
                }, {
                    title: "기업부설연구소/전담부서",
                    field: "LABORATORY_YN",
                    width: 180,
                }, {
                    title: "탄소소재 활용",
                    field: "CARBON_YN",
                    width: 100,
                }, {
                    title: "출원/등록 지식재산권",
                    field: "RPR_YN",
                    width: 150,
                }, {
                    title: "지식재산권 활용 신규제품 개발",
                    field: "NEW_PRODUCT_YN",
                    width: 200,
                }, {
                    title: "생산시설 투자계획",
                    field: "FACILITY_INVEST_YN",
                    width: 150,
                }, {
                    title: "만족도 높은 분야",
                    field: "HIGHLY_SAT_FIELD",
                    width: 200,
                }, {
                    title: "필요한 분야",
                    field: "NEED_FIELD",
                    width: 100,
                }, {
                    title: "개인정보동의",
                    field: "AGREE_YN",
                    width: 100,
                }, {
                    title: "제3자동의",
                    field: "AGREE2_YN",
                    width: 100,
                }, {
                    title: "대표자 휴대폰",
                    field: "CEO_TEL_NUM",
                    width: 150,
                }, {
                    title: "담당자 이름",
                    field: "CHARGE_NAME",
                    width: 100,
                }, {
                    title: "담당자 휴대폰",
                    field: "CHARGE_TEL_NUM",
                    width: 100,
                }*/
            ],
            dataBinding: function() {
                record = record - ((this.dataSource.page() -1) * this.dataSource.pageSize());
            }
        }).data("kendoGrid");

        $("#checkAll").click(function(){
            if($(this).is(":checked")) $("input[name=mf]").prop("checked", true);
            else $("input[name=mf]").prop("checked", false);
        });
    },

    gridReload: function (e){
        if(e != null){
            $("#searchArea").val(e);
        }else{
            $("#searchArea").val("");
        }

        mov.global.searchAjaxData = {
            searchYear : $("#searchYear").val(),
            searchKeyword : $("#searchKeyword").val(),
            searchValue : $("#searchValue").val(),
            searchArea : $("#searchArea").val()
        }

        mov.statGrid("/crm/getMfOverviewAreaStat", mov.global.searchAjaxData);
        mov.mainGrid("/crm/getMfOverviewList", mov.global.searchAjaxData);
    },

    templateExcelFormDown : function(){
        kendo.saveAs({
            dataURI: "/crm/templateExcelFormDown.do"
        });
    },

    setMfOverviewDel : function(){
        if($("input[name='mf']:checked").length == 0){
            alert("삭제할 고객을 선택해주세요.");
            return
        }

        if(confirm("선택한 고객을 삭제하시겠습니까?")){
            var mf = "";

            $.each($("input[name='mf']:checked"), function(){
                mf += "," + $(this).val()
            })

            mov.global.saveAjaxData = {
                empSeq : $("#myEmpSeq").val(),
                mf : mf.substring(1)
            }

            var result = customKendo.fn_customAjax("/crm/setMfOverviewDel.do", mov.global.saveAjaxData);
            if(result.flag){
                alert("처리되었습니다.");
                mov.gridReload();
            }
        }
    },

    setMfOverviewByCrmInfoUpd : function(){
        if(confirm("고객정보를 업데이트 하시겠습니까?")){
            var result = customKendo.fn_customAjax("/crm/setMfOverviewByCrmInfoUpd.do", {empSeq : $("#myEmpSeq").val()});
            if(result.flag){
                alert("처리되었습니다.");
                mov.gridReload();
            }
        }
    },

    fn_mfExcelUploadPop : function (){
        var url = "/crm/pop/mfExcelUploadPop.do?popType=mf";
        var name = "_blank";
        var option = "width = 500, height = 230, top = 100, left = 400, location = no"
        var popup = window.open(url, name, option);
    },

    comma: function(str) {
        str = String(str);
        return str.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,');
    },

    uncomma: function(str) {
        str = String(str);
        return str.replace(/[^\d]+/g, '');
    },

    mfOverViewPopup : function (e, i){
        var url = "/crm/pop/mfOverviewPop.do?crmMfSn=" + e + "&searchYear=" + i;
        var name = "_blank";
        var option = "width = 1300, height = 820, top = 100, left = 400, location = no"
        var popup = window.open(url, name, option);
    }
}

function gridReload(){
    mov.gridReload();
}