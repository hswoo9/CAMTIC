var payEtaxHist = {

    global : {
        searchAjaxData : "",
        eTaxInfo : {},
    },

    fn_defaultScript : function (){
        customKendo.fn_datePicker("startDt", 'month', "yyyy-MM-dd", new Date());
        customKendo.fn_datePicker("endDt", 'month', "yyyy-MM-dd", new Date());

        $("#startDt").val("2023-12-01");
        $("#endDt").val("2024-12-31");
        $("#startDt, #endDt").attr("readonly", true);
        $("#startDt").on("change", function(){
            if($(this).val() > $("#endDt").val()){
                $("#endDt").val($(this).val());
            }
        });
        $("#endDt").on("change", function(){
            if($(this).val() < $("#startDt").val()){
                $("#startDt").val($(this).val());
            }
        });
        customKendo.fn_textBox(["searchValue"]);

        payEtaxHist.etaxMainGrid();


        $("#searchValue").on("keyup", function(key){
            if(key.keyCode == 13){
                payEtaxHist.fn_search();
            }
        })
    },

    gridReload: function (type){
        $("#etaxMainGrid").data("kendoGrid").dataSource.read();
    },

    etaxMainGrid : function (params) {
        let dataSource = new kendo.data.DataSource({
            serverPaging: false,
            transport: {
                read: {
                    url: "/mng/getEtaxListAll",
                    dataType: "json",
                    type: "post"
                },
                parameterMap: function(data){
                    data.searchValue = $("#searchValue").val();
                    data.type = $("#type").val();
                    data.dtGubun = 'b';
                    data.strDt = $("#startDt").val().toString().replace(/-/g, "");
                    data.endDt = $("#endDt").val().toString().replace(/-/g, "");
                    data.viewType = 'payment';
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

        $("#etaxMainGrid").kendoGrid({
            dataSource: dataSource,
            sortable: true,
            scrollable: true,
            selectable: "row",
            pageable: {
                refresh: true,
                pageSizes : [ 10, 20, 50, "ALL" ],
                buttonCount: 5
            },
            noRecords: {
                template: "데이터가 존재하지 않습니다."
            },
            dataBound: payDetView.onDataBound,
            columns: [
                {
                    template: "#= ++record #",
                    title: "번호",
                    width : 50
                }, {
                    title: "사업장",
                    width: 120,
                    template: function (e){
                        return e.DIV_NM;
                    }
                }, {
                    title: "구분",
                    width: 80,
                    template: function (e){
                        if(e.ETAX_TY == 1){
                            return "일반";
                        } else if(e.ETAX_TY == 2){
                            return "수정";
                        } else {
                            return "";
                        }
                    }
                }, {
                    title: "작성일자",
                    width: 80,
                    template: function (e){
                        return e.ISS_DT.substring(0,4) + "-" + e.ISS_DT.substring(4,6) + "-" + e.ISS_DT.substring(6,8);
                    }
                }, {
                    field: "ISU_DT",
                    title: "발급일자",
                    width: 80,
                    template: function (e){
                        return e.ISU_DT.substring(0,4) + "-" + e.ISU_DT.substring(4,6) + "-" + e.ISU_DT.substring(6,8);
                    }
                }, {
                    title: "거래처명",
                    width: 200,
                    template: function (e){
                        return '<input type="hidden" id="trCd" value="' + e.TR_CD + '"/>' + e.TR_NM;
                    }
                }, {
                    title: "사업자번호",
                    width: 100,
                    template: function (e){
                        if(e.TRREG_NB != null){
                            return e.TRREG_NB;
                        } else {
                            return "";
                        }
                    }
                }, {
                    title: "공급가액",
                    width: 100,
                    template: function (e){
                        return '<div style="text-align: right;">'+comma(e.SUP_AM.toString().split(".")[0])+'</div>';
                    }
                }, {
                    title: "세액",
                    width: 100,
                    template: function (e){
                        return '<div style="text-align: right;">'+comma(e.VAT_AM.toString().split(".")[0])+'</div>';
                    }
                }, {
                    title: "합계금액",
                    width: 100,
                    template: function (e){
                        return '<div style="text-align: right;">'+comma(e.SUM_AM.toString().split(".")[0])+'</div>';
                    }
                }, {
                    title: "",
                    width: 80,
                    template: function(e){
                        console.log(e);
                        return '<button type="button" class="k-button k-button-solid-base" ' +
                            'onclick="payEtaxHist.fn_selEtaxInfo(\'' + e.TR_CD + '\', \'' + e.TR_NM + '\', \'' + e.ISU_DT + '\', ' +
                            '\'' + e.TRREG_NB + '\', \'' + e.SUP_AM + '\', \'' + e.VAT_AM +  '\', \'' + e.SUM_AM + '\', ' +
                            '\'' + e.ISS_NO + '\', \'' + e.CO_CD + '\', \'' + e.TAX_TY + '\', \'' + e.BA_NB + '\', \'' + e.BANK_NM + '\'' +
                            ', \'' + e.DEPOSITOR + '\')" style="font-size: 12px);">' +
                            '   보기' +
                            '</button>'+
                            '<button type="button" class="k-button k-button-solid-info" style="margin-left: 5px;" ' +
                            'onclick="payEtaxHist.fn_selEtaxInfo2(\'' + e.TR_CD + '\', \'' + e.TR_NM + '\', \'' + e.ISU_DT + '\', ' +
                            '\'' + e.TRREG_NB + '\', \'' + e.SUP_AM + '\', \'' + e.VAT_AM +  '\', \'' + e.SUM_AM + '\', ' +
                            '\'' + e.ISS_NO + '\', \'' + e.CO_CD + '\', \'' + e.TAX_TY + '\', \'' + e.BA_NB + '\', \'' + e.BANK_NM + '\'' +
                            ', \'' + e.DEPOSITOR + '\')" style="font-size: 12px);">' +
                            '   반영' +
                            '</button>';
                    }
                }
            ],

            dataBinding: function() {
                record = (this.dataSource.page() -1) * this.dataSource.pageSize();
            }
        }).data("kendoGrid");
    },

    fn_selEtaxInfo : function (trCd, trNm, isuDt, trregNb, supAm, vatAm, sumAm, issNo, coCd, taxTy, baNb, bankNm, depositor) {
        var idx = $("#index").val();

        var data = {
            issNo : issNo,
            coCd : coCd,
            taxTy : taxTy
        }

        $.ajax({
            url : "/g20/getEtaxData",
            type : "post",
            dataType : "json",
            data : data,
            success : function(rs){
                var rs = rs.data;

                var eTaxInfo = rs;

                var txtAuthNum = (eTaxInfo.ISS_NO || '');
                var txtLSaupNum = (eTaxInfo.TRREG_NB || '');
                var txtLTrName = (eTaxInfo.TR_NM || '');
                var txtLCeoName = (eTaxInfo.TRCEO_NM || '');
                var txtLAddr = (eTaxInfo.DIV_ADDR1 || '') + '<br>' + (eTaxInfo.ADDR2 || '');

                var txtLJongmokNum	 = (eTaxInfo.TRSUB_NB || '');
                var txtLBusinessType = (eTaxInfo.BUSINESS || '');
                var txtLJongmokName = (eTaxInfo.JONGMOK || '');
                var txtLDeptName = (eTaxInfo.lDeptName || '');
                var txtLEmpName = (eTaxInfo.lEmpName || '');
                var txtLTell = (eTaxInfo.TEL || '');
                var txtLCellPhone = (eTaxInfo.lCellPhone || '');
                var txtRDeptName = (eTaxInfo.RDeptName || '');
                var txtREmpName = (eTaxInfo.REmpName || '');
                var txtRTell = (eTaxInfo.DIV_DDD + eTaxInfo.DIV_TEL || '');
                var txtRCellPhone = (eTaxInfo.RCellPhone || '');
                var txtLEmail = (eTaxInfo.EMAIL_DC || '');


                var txtRSaupNum = (eTaxInfo.DIVREG_NB || '');
                var txtRTrName = (eTaxInfo.DIV_NM || '');
                var txtRCeoName = (eTaxInfo.DIVCEO_NM || '');
                var txtRAddr = (eTaxInfo.RDIV_ADDR || '') + '<br>' + (eTaxInfo.RDIV_ADDR1 || '');
                var txtRJongmokNum = (eTaxInfo.DIVSUB_NB || '');
                var txtRBusinessType = (eTaxInfo.RBUSINESS || '');
                var txtRJongmokName = (eTaxInfo.RJONGMOK || '');
                var txtREmail = (eTaxInfo.TRCHARGE_EMAIL || '');


                var txtDummy1 = (eTaxInfo.DUMMY1 || '');
                var txtItemName = (eTaxInfo.itemName || eTaxInfo.ITEM_DC) || '';
                var txtItemStendard = (eTaxInfo.itemStendard || '-');
                var txtItemCnt = Number(eTaxInfo.itemCnt || '0') == 0 ? '' : fnGetCurrencyCode(eTaxInfo.itemCnt, 0);
                var txtItemUnitAmt = Number(eTaxInfo.itemUnitAmt || '0') == 0 ? '' : fnGetCurrencyCode(eTaxInfo.itemUnitAmt, 0);
                var txtItemStdAmt = Number(eTaxInfo.itemStdAmt || '0') == 0 ? fnGetCurrencyCode(eTaxInfo.stdAmt, 0) : fnGetCurrencyCode(eTaxInfo.itemStdAmt, 0);
                var txtItemVatAmt = Number(eTaxInfo.itemVatAmt || '0') == 0 ? fnGetCurrencyCode(eTaxInfo.vatAmt, 0) : fnGetCurrencyCode(eTaxInfo.itemVatAmt, 0);

                var txtItemNote = (eTaxInfo.itemNote || '');
                var txtDummy2 = (eTaxInfo.DUMMY2 || '');

                /* 날짜 처리 필요 */
                var txtIssDateYear = (eTaxInfo.ISS_DT || '').substring(0, 4);
                var txtIssDateMonth = (eTaxInfo.ISS_DT || '').substring(4, 6);
                var txtIssDateDate =  (eTaxInfo.ISS_DT || '').substring(6, 8);

                var txtItemDateMonth = ((eTaxInfo.itemDateMonth || '').substring(0, 2) || (eTaxInfo.ISS_DT || '').substring(4, 6)) || '';
                var txtItemDateDate =  (eTaxInfo.itemDateDate || '').substring(2, 4)  || (eTaxInfo.ISS_DT || '').substring(6, 8);

                /* 금액 처리 필요. */
                var txtStdAmt = fnGetCurrencyCode(eTaxInfo.SUP_AM, 0);
                if(eTaxInfo.TAX_TY == '4'){
                    $("#txtVatAmt, #txtVatTitle, #txtVatCol").css("display", "none");
                } else {
                    var txtVatAmt = fnGetCurrencyCode(eTaxInfo.VAT_AM, 0);
                }

                var txtAmt = fnGetCurrencyCode(eTaxInfo.SUM_AM, 0);


                console.log(eTaxInfo.TAX_TY)
                if(eTaxInfo.TAX_TY == 1){
                    $('.txtTaxTy').html('매출세금계산서');
                } else if(eTaxInfo.TAX_TY == 2){
                    if(eTaxInfo.ETAX_TY == 2){
                        $('.txtTaxTy').html('수정전자세금계산서');
                    } else {
                        $('.txtTaxTy').html('전자세금계산서');
                    }
                } else if(eTaxInfo.TAX_TY == 3){
                    $('.txtTaxTy').html('매출계산서');
                } else if(eTaxInfo.TAX_TY == 4){
                    $('.txtTaxTy').html('전자계산서');
                }  else{
                    $('.txtTaxTy').html('전자세금계산서');
                }

                /* 승인번호 */
                $('#txtAuthNum').html('<span class="fwb">' + txtAuthNum + '</span>');
                $('#txtLSaupNum').html(txtLSaupNum);
                $('#txtLTrName').html(txtLTrName);
                $('#txtLCeoName').html(txtLCeoName);
                $('#txtLAddr').html(txtLAddr);
                $('#txtLJongmokNum').html(txtLJongmokNum);
                $('#txtLBusinessType').html(txtLBusinessType);
                $('#txtLJongmokName').html(txtLJongmokName);
                // $('#txtLDeptName').html(txtLDeptName);
                // $('#txtLEmpName').html(txtLEmpName);
                // $('#txtLTell').html(txtLTell);
                // $('#txtLCellPhone').html(txtLCellPhone);
                $('#txtLEmail').html(txtLEmail);
                // $('#txtRDeptName').html(txtRDeptName);
                // $('#txtREmpName').html(txtREmpName);
                // $('#txtRTell').html(txtRTell);
                // $('#txtRCellPhone').html(txtRCellPhone);

                $('#txtRSaupNum').html(txtRSaupNum);
                $('#txtRTrName').html(txtRTrName);
                $('#txtRCeoName').html(txtRCeoName);
                $('#txtRAddr').html(txtRAddr);
                $('#txtRJongmokNum').html(txtRJongmokNum);
                $('#txtRBusinessType').html(txtRBusinessType);
                $('#txtRJongmokName').html(txtRJongmokName);
                $('#txtREmail').html(txtREmail);

                $('#txtDummy1').html(txtDummy1);
                $('#txtDummy2').html(txtDummy2);
                $('#txtStdAmt').html(txtStdAmt);
                $('#txtVatAmt').html(txtVatAmt);
                $('#txtAmt').html(txtAmt);
                $('#txtIssDateYear').html(txtIssDateYear);
                $('#txtIssDateMonth').html(txtIssDateMonth);
                $('#txtIssDateDate').html(txtIssDateDate);


                /* 물품 그리기 */
                // <c:set var="myVar" value="Dale's Truck" />
                // <c:set var="search" value="'" />
                // <c:set var="replace" value="%27" />
                // <c:set var="eTaxItemInfo" value="${fn:replace(eTaxItemInfo, search, replace)}"/>
                // var itemListJSON = '${eTaxItemInfo}' || '';
                // if(itemList == ''){
                //     itemList = '[]';
                // }



                var itemList = [];

                if(itemList.length == 1){
                    /* 단일건의 경우 1행 출력 */
                    $('#txtItemDateMonth').html(txtItemDateMonth);
                    $('#txtItemDateDate').html(txtItemDateDate);
                    $('#txtItemName').html(txtItemName);
                    $('#txtItemStendard').html(txtItemStendard);
                    $('#txtItemCnt').html(txtItemCnt);
                    $('#txtItemUnitAmt').html(txtItemUnitAmt);
                    $('#txtItemStdAmt').html(txtItemStdAmt);
                    $('#txtItemVatAmt').html(txtItemVatAmt);
                    $('#txtItemNote').html(txtItemNote);
                }else{
                    $('#tbl_itemList').empty();
                    for(var i = 0; i < 4; i++){
                        // var item = itemList[i];
                        var item = "";
                        //항목이 있는 경우만 리스트 나타냄

                        var itemDateMonth = "";
                        var itemDateDate = "";
                        if(eTaxInfo.TAX_TY == 2){
                            itemDateMonth = ((eTaxInfo.ISS_DT || '').substring(4, 6) || (item.issDate || '').substring(4, 6)) || '';
                            itemDateDate = ( (eTaxInfo.ISS_DT || '').substring(6, 8) || (item.issDate || '').substring(6, 8) ) || '';
                        } else {
                            itemDateMonth = ((eTaxInfo.ISU_DT || '').substring(4, 6) || (item.issDate || '').substring(4, 6)) || '';
                            itemDateDate = ( (eTaxInfo.ISU_DT || '').substring(6, 8) || (item.issDate || '').substring(6, 8) ) || '';
                        }
                        var itemCnt = Number(item.itemCnt || '0') == 0 ? '' : fnGetCurrencyCode(item.itemCnt, 0);
                        var itemUnitAmt = Number(eTaxInfo.SUP_AM || '0') == 0 ? '' : fnGetCurrencyCode(eTaxInfo.SUP_AM, 0);
                        var itemStdAmt = Number(eTaxInfo.SUP_AM || '0') == 0 ? '' : fnGetCurrencyCode(eTaxInfo.SUP_AM, 0);
                        if(eTaxInfo.TAX_TY == '4'){

                        } else {
                            var itemVatAmt = Number(eTaxInfo.VAT_AM || '0') == 0 ? '' : fnGetCurrencyCode(eTaxInfo.VAT_AM, 0);
                        }
                        var itemName = eTaxInfo.ITEM_DC;

                        if(i != 0){
                            itemDateMonth = "";
                            itemDateDate = "";
                            itemCnt = "";
                            itemUnitAmt = "";
                            itemStdAmt = "";
                            itemVatAmt = "";
                            itemName = "";
                        }

                        var tr = '';
                        tr += '<tr>';
                        tr += '	<td class="textC" >' + itemDateMonth + '</td>';
                        tr += '	<td class="textC" >' + itemDateDate + '</td>';
                        tr += '	<td>' + (itemName || '') + '</td>';
                        tr += '	<td class="textC" >' + (item.itemStendard || '') + '</td>';
                        tr += '	<td class="textC" >' + itemCnt + '</td>';
                        tr += '	<td class="textR" >' + itemUnitAmt + '</td>';
                        tr += '	<td class="textR" >' + itemStdAmt + '</td>';
                        if(eTaxInfo.TAX_TY == '4'){
                            $("#txtItemVatAmt").css("display", "none");
                            $("#txtItemVatAmtTitle").css("display", "none");
                            $("#txtItemVatAmtCol").remove();
                        } else {
                            tr += '	<td class="textR" >' + itemVatAmt + '</td>';
                        }
                        tr += '	<td id="">' + (item.itemNote || '') + '</td>';
                        tr += '</tr>';
                        $('#tbl_itemList').append(tr);
                    }
                }
                // $("#etaxMainGrid").css("display", "none");

                $("#capture").css("display", "");
                html2canvas(document.querySelector("#capture")).then(function(canvas) {

                    // jsPDF 객체 생성 생성자에는 가로, 세로 설정, 페이지 크기 등등 설정할 수 있다. 자세한건 문서 참고. // 현재 파라미터는 기본값이다 굳이 쓰지 않아도 되는데 저것이 기본값이라고 보여준다
                    var doc = new jsPDF('p', 'mm', 'a4'); // html2canvas의 canvas를 png로 바꿔준다.
                    var imgData = canvas.toDataURL('image/png'); //Image 코드로 뽑아내기 // image 추가
                    imgData = imgData.replace("data:image/png;base64,", "");
                });
            }
        });
    },

    fn_selEtaxInfo2 : function (trCd, trNm, isuDt, trregNb, supAm, vatAm, sumAm, issNo, coCd, taxTy, baNb, bankNm, depositor) {
        if($("#paySetting").val() == "Y"){
            if(Math.round(sumAm) > Number(opener.parent.$("#reqAmtTotal").val())){
                alert("지출금액을 초과하였습니다.");
                return;
            }
        }

        var idx = $("#index").val();

        var data = {
            issNo : issNo,
            coCd : coCd,
            taxTy : taxTy
        }

        $.ajax({
            url : "/g20/getEtaxData",
            type : "post",
            dataType : "json",
            data : data,
            success : function(rs){
                var rs = rs.data;

                var eTaxInfo = rs;

                var txtAuthNum = (eTaxInfo.ISS_NO || '');
                var txtLSaupNum = (eTaxInfo.TRREG_NB || '');
                var txtLTrName = (eTaxInfo.TR_NM || '');
                var txtLCeoName = (eTaxInfo.TRCEO_NM || '');
                var txtLAddr = (eTaxInfo.DIV_ADDR1 || '') + '<br>' + (eTaxInfo.ADDR2 || '');

                var txtLJongmokNum	 = (eTaxInfo.TRSUB_NB || '');
                var txtLBusinessType = (eTaxInfo.BUSINESS || '');
                var txtLJongmokName = (eTaxInfo.JONGMOK || '');
                var txtLDeptName = (eTaxInfo.lDeptName || '');
                var txtLEmpName = (eTaxInfo.lEmpName || '');
                var txtLTell = (eTaxInfo.TEL || '');
                var txtLCellPhone = (eTaxInfo.lCellPhone || '');
                var txtRDeptName = (eTaxInfo.RDeptName || '');
                var txtREmpName = (eTaxInfo.REmpName || '');
                var txtRTell = (eTaxInfo.DIV_DDD + eTaxInfo.DIV_TEL || '');
                var txtRCellPhone = (eTaxInfo.RCellPhone || '');
                var txtLEmail = (eTaxInfo.EMAIL_DC || '');


                var txtRSaupNum = (eTaxInfo.DIVREG_NB || '');
                var txtRTrName = (eTaxInfo.DIV_NM || '');
                var txtRCeoName = (eTaxInfo.DIVCEO_NM || '');
                var txtRAddr = (eTaxInfo.RDIV_ADDR || '') + '<br>' + (eTaxInfo.RDIV_ADDR1 || '');
                var txtRJongmokNum = (eTaxInfo.DIVSUB_NB || '');
                var txtRBusinessType = (eTaxInfo.RBUSINESS || '');
                var txtRJongmokName = (eTaxInfo.RJONGMOK || '');
                var txtREmail = (eTaxInfo.TRCHARGE_EMAIL || '');


                var txtDummy1 = (eTaxInfo.DUMMY1 || '');
                var txtItemName = (eTaxInfo.itemName || eTaxInfo.ITEM_DC) || '';
                var txtItemStendard = (eTaxInfo.itemStendard || '-');
                var txtItemCnt = Number(eTaxInfo.itemCnt || '0') == 0 ? '' : fnGetCurrencyCode(eTaxInfo.itemCnt, 0);
                var txtItemUnitAmt = Number(eTaxInfo.itemUnitAmt || '0') == 0 ? '' : fnGetCurrencyCode(eTaxInfo.itemUnitAmt, 0);
                var txtItemStdAmt = Number(eTaxInfo.itemStdAmt || '0') == 0 ? fnGetCurrencyCode(eTaxInfo.stdAmt, 0) : fnGetCurrencyCode(eTaxInfo.itemStdAmt, 0);
                var txtItemVatAmt = Number(eTaxInfo.itemVatAmt || '0') == 0 ? fnGetCurrencyCode(eTaxInfo.vatAmt, 0) : fnGetCurrencyCode(eTaxInfo.itemVatAmt, 0);

                var txtItemNote = (eTaxInfo.itemNote || '');
                var txtDummy2 = (eTaxInfo.DUMMY2 || '');

                /* 날짜 처리 필요 */
                var txtIssDateYear = (eTaxInfo.ISS_DT || '').substring(0, 4);
                var txtIssDateMonth = (eTaxInfo.ISS_DT || '').substring(4, 6);
                var txtIssDateDate =  (eTaxInfo.ISS_DT || '').substring(6, 8);

                var txtItemDateMonth = ((eTaxInfo.itemDateMonth || '').substring(0, 2) || (eTaxInfo.ISS_DT || '').substring(4, 6)) || '';
                var txtItemDateDate =  (eTaxInfo.itemDateDate || '').substring(2, 4)  || (eTaxInfo.ISS_DT || '').substring(6, 8);

                /* 금액 처리 필요. */
                var txtStdAmt = fnGetCurrencyCode(eTaxInfo.SUP_AM, 0);
                if(eTaxInfo.TAX_TY == '4'){
                    $("#txtVatAmt, #txtVatTitle, #txtVatCol").css("display", "none");
                } else {
                    var txtVatAmt = fnGetCurrencyCode(eTaxInfo.VAT_AM, 0);
                }

                var txtAmt = fnGetCurrencyCode(eTaxInfo.SUM_AM, 0);


                if(eTaxInfo.TAX_TY == 1){
                    $('.txtTaxTy').html('매출세금계산서');
                } else if(eTaxInfo.TAX_TY == 2){
                    if(eTaxInfo.ETAX_TY == 2){
                        $('.txtTaxTy').html('수정전자세금계산서');
                    } else {
                        $('.txtTaxTy').html('전자세금계산서');
                    }
                } else if(eTaxInfo.TAX_TY == 3){
                    $('.txtTaxTy').html('매출계산서');
                } else if(eTaxInfo.TAX_TY == 4){
                    $('.txtTaxTy').html('전자계산서');
                }  else{
                    $('.txtTaxTy').html('전자세금계산서');
                }

                /* 승인번호 */
                $('#txtAuthNum').html('<span class="fwb">' + txtAuthNum + '</span>');
                $('#txtLSaupNum').html(txtLSaupNum);
                $('#txtLTrName').html(txtLTrName);
                $('#txtLCeoName').html(txtLCeoName);
                $('#txtLAddr').html(txtLAddr);
                $('#txtLJongmokNum').html(txtLJongmokNum);
                $('#txtLBusinessType').html(txtLBusinessType);
                $('#txtLJongmokName').html(txtLJongmokName);
                // $('#txtLDeptName').html(txtLDeptName);
                // $('#txtLEmpName').html(txtLEmpName);
                // $('#txtLTell').html(txtLTell);
                // $('#txtLCellPhone').html(txtLCellPhone);
                $('#txtLEmail').html(txtLEmail);
                // $('#txtRDeptName').html(txtRDeptName);
                // $('#txtREmpName').html(txtREmpName);
                // $('#txtRTell').html(txtRTell);
                // $('#txtRCellPhone').html(txtRCellPhone);

                $('#txtRSaupNum').html(txtRSaupNum);
                $('#txtRTrName').html(txtRTrName);
                $('#txtRCeoName').html(txtRCeoName);
                $('#txtRAddr').html(txtRAddr);
                $('#txtRJongmokNum').html(txtRJongmokNum);
                $('#txtRBusinessType').html(txtRBusinessType);
                $('#txtRJongmokName').html(txtRJongmokName);
                $('#txtREmail').html(txtREmail);

                $('#txtDummy1').html(txtDummy1);
                $('#txtDummy2').html(txtDummy2);
                $('#txtStdAmt').html(txtStdAmt);
                $('#txtVatAmt').html(txtVatAmt);
                $('#txtAmt').html(txtAmt);
                $('#txtIssDateYear').html(txtIssDateYear);
                $('#txtIssDateMonth').html(txtIssDateMonth);
                $('#txtIssDateDate').html(txtIssDateDate);

                eTaxInfo.tradeDe = txtIssDateYear + '-' + txtIssDateMonth + '-' + txtIssDateDate;


                /* 물품 그리기 */
                // <c:set var="myVar" value="Dale's Truck" />
                // <c:set var="search" value="'" />
                // <c:set var="replace" value="%27" />
                // <c:set var="eTaxItemInfo" value="${fn:replace(eTaxItemInfo, search, replace)}"/>
                // var itemListJSON = '${eTaxItemInfo}' || '';
                // if(itemList == ''){
                //     itemList = '[]';
                // }



                var itemList = [];

                if(itemList.length == 1){
                    /* 단일건의 경우 1행 출력 */
                    $('#txtItemDateMonth').html(txtItemDateMonth);
                    $('#txtItemDateDate').html(txtItemDateDate);
                    $('#txtItemName').html(txtItemName);
                    $('#txtItemStendard').html(txtItemStendard);
                    $('#txtItemCnt').html(txtItemCnt);
                    $('#txtItemUnitAmt').html(txtItemUnitAmt);
                    $('#txtItemStdAmt').html(txtItemStdAmt);
                    $('#txtItemVatAmt').html(txtItemVatAmt);
                    $('#txtItemNote').html(txtItemNote);
                }else{
                    $('#tbl_itemList').empty();
                    for(var i = 0; i < 4; i++){
                        // var item = itemList[i];
                        var item = "";
                        //항목이 있는 경우만 리스트 나타냄
                        var itemDateMonth = "";
                        var itemDateDate = "";
                        if(eTaxInfo.TAX_TY == 2){
                            itemDateMonth = ((eTaxInfo.ISS_DT || '').substring(4, 6) || (item.issDate || '').substring(4, 6)) || '';
                            itemDateDate = ( (eTaxInfo.ISS_DT || '').substring(6, 8) || (item.issDate || '').substring(6, 8) ) || '';
                        } else {
                            itemDateMonth = ((eTaxInfo.ISU_DT || '').substring(4, 6) || (item.issDate || '').substring(4, 6)) || '';
                            itemDateDate = ( (eTaxInfo.ISU_DT || '').substring(6, 8) || (item.issDate || '').substring(6, 8) ) || '';
                        }
                        var itemCnt = Number(item.itemCnt || '0') == 0 ? '' : fnGetCurrencyCode(item.itemCnt, 0);
                        var itemUnitAmt = Number(eTaxInfo.SUP_AM || '0') == 0 ? '' : fnGetCurrencyCode(eTaxInfo.SUP_AM, 0);
                        var itemStdAmt = Number(eTaxInfo.SUP_AM || '0') == 0 ? '' : fnGetCurrencyCode(eTaxInfo.SUP_AM, 0);
                        if(eTaxInfo.TAX_TY == '4'){

                        } else {
                            var itemVatAmt = Number(eTaxInfo.VAT_AM || '0') == 0 ? '' : fnGetCurrencyCode(eTaxInfo.VAT_AM, 0);
                        }
                        var itemName = eTaxInfo.ITEM_DC;

                        if(i != 0){
                            itemDateMonth = "";
                            itemDateDate = "";
                            itemCnt = "";
                            itemUnitAmt = "";
                            itemStdAmt = "";
                            itemVatAmt = "";
                            itemName = "";
                        }

                        var tr = '';
                        tr += '<tr>';
                        tr += '	<td class="textC" >' + itemDateMonth + '</td>';
                        tr += '	<td class="textC" >' + itemDateDate + '</td>';
                        tr += '	<td>' + (itemName || '') + '</td>';
                        tr += '	<td class="textC" >' + (item.itemStendard || '') + '</td>';
                        tr += '	<td class="textC" >' + itemCnt + '</td>';
                        tr += '	<td class="textR" >' + itemUnitAmt + '</td>';
                        tr += '	<td class="textR" >' + itemStdAmt + '</td>';
                        if(eTaxInfo.TAX_TY == '4'){
                            $("#txtItemVatAmt").css("display", "none");
                            $("#txtItemVatAmtTitle").css("display", "none");
                            $("#txtItemVatAmtCol").remove();
                        } else {
                            tr += '	<td class="textR" >' + itemVatAmt + '</td>';
                        }
                        tr += '	<td id="">' + (item.itemNote || '') + '</td>';
                        tr += '</tr>';
                        $('#tbl_itemList').append(tr);
                    }
                }
                // $("#etaxMainGrid").css("display", "none");

                $("#capture").css("display", "");
                html2canvas(document.querySelector("#capture")).then(function(canvas) {

                    // jsPDF 객체 생성 생성자에는 가로, 세로 설정, 페이지 크기 등등 설정할 수 있다. 자세한건 문서 참고. // 현재 파라미터는 기본값이다 굳이 쓰지 않아도 되는데 저것이 기본값이라고 보여준다
                    var doc = new jsPDF('p', 'mm', 'a4'); // html2canvas의 canvas를 png로 바꿔준다.
                    var imgData = canvas.toDataURL('image/png'); //Image 코드로 뽑아내기 // image 추가
                    imgData = imgData.replace("data:image/png;base64,", "");
                    eTaxInfo.imgValue = 'etax';
                    eTaxInfo.imgSrc = imgData;
                    eTaxInfo.empSeq = $("#empSeq").val()

                    eTaxInfo.trCd = trCd;
                    eTaxInfo.trNm = trNm;
                    eTaxInfo.isuDt = isuDt;
                    eTaxInfo.trregNb = trregNb;
                    eTaxInfo.supAm = supAm;
                    eTaxInfo.vatAm = vatAm;
                    eTaxInfo.sumAm = sumAm;
                    eTaxInfo.issNo = issNo;
                    eTaxInfo.coCd = coCd;
                    eTaxInfo.taxTy = taxTy;
                    eTaxInfo.idx = idx;
                    eTaxInfo.baNb = baNb;
                    eTaxInfo.bankNm = bankNm;
                    eTaxInfo.depositor = depositor;

                    payEtaxHist.global.eTaxInfo = eTaxInfo;
                    payEtaxHist.fn_etaxSetting(JSON.stringify(payEtaxHist.global.eTaxInfo));
                });
            }
        });
    },

    fn_etaxSetting: function(eTaxInfo){

        eTaxInfo = JSON.parse(eTaxInfo);

        $.ajax({
            type : "POST",
            data : eTaxInfo,
            dataType : "text",
            url : "/mng/imgSaveTest",
            async : false,
            success : function(data) {

                var data = JSON.parse(data);
                var fileNo = data.result.fileNo;
                alert("반영되었습니다.");
                opener.parent.fn_selEtaxInfo(
                    eTaxInfo.trCd, eTaxInfo.trNm, eTaxInfo.isuDt, eTaxInfo.trregNb,
                    eTaxInfo.supAm, eTaxInfo.vatAm, eTaxInfo.sumAm, eTaxInfo.issNo, eTaxInfo.coCd,
                    eTaxInfo.taxTy, eTaxInfo.idx, fileNo, eTaxInfo.baNb, eTaxInfo.bankNm,
                    eTaxInfo.depositor, eTaxInfo.tradeDe);

                if($("#paySetting").val() == "Y" && opener.parent.$(".payTr").length == 1){
                    var openerAmt = uncommaN(opener.parent.$("#reqAmt0").val());
                    opener.parent.$("#reqAmt0").val(comma(Number(openerAmt) + Number(eTaxInfo.sumAm)));
                }

                window.close();

            },
            error : function(a, b, c) {
                alert("error");
            }
        });
    },

    fn_search : function (){
        payEtaxHist.gridReload("search");
        payEtaxHist.etaxMainGrid("search");
    }
}
