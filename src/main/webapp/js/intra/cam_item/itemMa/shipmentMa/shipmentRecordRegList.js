var srrl = {

    global : {
        dropDownDataSource : "",
        searchAjaxData : "",
        saveAjaxData : "",
        smRecordSnArr : new Array(),
        now : new Date()
    },

    fn_defaultScript : function (){
        customKendo.fn_datePicker("startDt", '', "yyyy-MM-dd");
        customKendo.fn_datePicker("endDt", '', "yyyy-MM-dd");

        srrl.global.dropDownDataSource = [
            { text : "품번", value : "ITEM_NO" },
            { text : "품명", value : "ITEM_NAME" }
        ]
        customKendo.fn_dropDownList("searchKeyword", srrl.global.dropDownDataSource, "text", "value");
        $("#searchKeyword").data("kendoDropDownList").bind("change", srrl.gridReload);

        customKendo.fn_textBox(["searchValue"]);

        srrl.gridReload();
    },

    mainGrid: function(url, params){
        $("#mainGrid").kendoGrid({
            dataSource: customKendo.fn_gridDataSource2(url, params),
            height : 508,
            sortable: true,
            selectable: "row",
            pageable: {
                refresh: true,
                pageSizes: [ 10, 20, 30, 50, 100 ],
                buttonCount: 5
            },
            noRecords: {
                template: "데이터가 존재하지 않습니다."
            },
            toolbar: [
                /*{
                    name: 'button',
                    template: function(){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-info" onclick="srrl.fn_popShipmentRecordReg()">' +
                            '	<span class="k-button-text">출하실적등록</span>' +
                            '</button>';
                    }
                },*/{
                    name: 'button',
                    template: function(){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-info" onclick="srrl.setDeliveryAmt()">' +
                            '	<span class="k-button-text">저장</span>' +
                            '</button>';
                    }
                }, {
                    name: 'button',
                    template: function(){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-dark" onclick="srrl.setDeadlineUpd()">' +
                            '	<span class="k-button-text">마감</span>' +
                            '</button>';
                    }
                }, {
                    name: 'button',
                    template: function(){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="srrl.gridReload()">' +
                            '	<span class="k-button-text">조회</span>' +
                            '</button>';
                    }
                }, {
                    name : 'excel',
                    text: '엑셀다운로드'
                }
            ],
            excel : {
                fileName : "출하실적등록 목록.xlsx",
                filterable : true
            },
            columns: [
                {
                    headerTemplate: '<input type="checkbox" id="checkAll" name="checkAll" style="top: 3px; position: relative" />',
                    template : function(e){
                        if(e.OVERALL_INVEN != "0"){
                            return ""
                        }else{
                            return "<input type='checkbox' id='rcSn" + e.SM_RECORD_SN + "' name='rcSn' value='" + e.SM_RECORD_SN + "' style=\"top: 3px; position: relative\" />"
                        }
                    },
                    width: 30,
                }, {
                    title: "순번",
                    template: "#= --record #",
                    width: 50
                }, {
                    title: "납품처",
                    field: "CRM_NM",
                    width: 150,
                }, {
                    title: "납품일",
                    field: "DELIVERY_DT",
                    width: 80,
                }, {
                    title: "품번",
                    field: "ITEM_NO",
                    width: 120
                }, {
                    title: "품명",
                    field: "ITEM_NAME",
                    width: 120
                }, {
                    title: "재고",
                    field: "OVERALL_INVEN",
                    width: 100,
                    template : function (e){
                        if(e.OVERALL_INVEN != null && e.OVERALL_INVEN != ""){
                            return srrl.comma(e.OVERALL_INVEN);
                        }else{
                            return "0";
                        }
                    },
                    attributes : {
                        style : "text-align : right;"
                    }
                }, {
                    title: "실제 납품량",
                    field: "DELIVERY_AMT",
                    width: 100,
                    template : function (e){
                        var str = "";
                        if(e.DELIVERY_AMT != null && e.DELIVERY_AMT != ""){
                            str = srrl.comma(Number(e.DELIVERY_VOLUME) - Number(e.DELIVERY_AMT));
                        }else{
                            str = e.DELIVERY_VOLUME;
                        }

                        if(e.DELIVERY_AMT == e.DELIVERY_VOLUME){
                            return "납품완료"
                        }else {
                            return "<input type='text' class='deliveryAmtInput numberInput k-input k-textbox' maxOrderVolume='" + (Number(e.DELIVERY_VOLUME) - Number(e.DELIVERY_AMT)) + "' id='deliveryVolume" + e.SM_RECORD_SN + "' style='text-align: right;' value='" + str + "'>";
                        }
                    },
                    attributes : {
                        style : "text-align : right;"
                    }
                }, {
                    title: "납품누계",
                    field: "DELIVERY_AMT",
                    width: 100,
                    template : function (e){
                        var str = "";
                        if(e.DELIVERY_AMT != null && e.DELIVERY_AMT != ""){
                            str = srrl.comma(e.DELIVERY_AMT);
                        }else{
                            str = "0";
                        }

                        return str;
                    },
                    attributes : {
                        style : "text-align : right;"
                    }
                }, {
                    title: "납품량",
                    field: "DELIVERY_VOLUME",
                    width: 100,
                    template : function (e){
                        if(e.DELIVERY_VOLUME != null && e.DELIVERY_VOLUME != ""){
                            return srrl.comma(e.DELIVERY_VOLUME) + "";
                        }else{
                            return "0";
                        }
                    },
                    attributes : {
                        style : "text-align : right;"
                    }
                }, {
                    title: "단가",
                    width: 100,
                    field: "UNIT_PRICE",
                    template : function (e){
                        if(e.UNIT_PRICE != null && e.UNIT_PRICE != ""){
                            return srrl.comma(e.UNIT_PRICE) + "원";
                        }else{
                            return "0원";
                        }
                    },
                    attributes : {
                        style : "text-align : right;"
                    }
                }, {
                    title: "금액",
                    width: 100,
                    field: "AMT",
                    template: function(e){
                        if(e.AMT != null && e.AMT != ""){
                            return srrl.comma(e.AMT) + "원";
                        }else{
                            return "0원";
                        }
                    },
                    attributes : {
                        style : "text-align : right;"
                    }
                }, {
                    title: "비고",
                    field: "RMK",
                    width: 200,
                }, {
                    title: "상태",
                    width: 80,
                    template : function (e){
                        return "진행중";
                    },
                }, {
                    title: "등록자",
                    field: "EMP_NAME_KR",
                    width: 80,
                }
            ],
            dataBinding: function(){
                record = fn_getRowNum(this, 3);
            }
        }).data("kendoGrid");

        $("#checkAll").click(function(){
            if($(this).is(":checked")) $("input[name=rcSn]").prop("checked", true);
            else $("input[name=rcSn]").prop("checked", false);
        });

        $(".numberInput").keyup(function(){
            if(Number(srrl.uncomma($(this).val())) > Number($(this).attr("maxOrderVolume"))){
                alert("실제 납품량은 납품잔량을 초과할 수 없습니다.");
                $(this).val(srrl.comma($(this).attr("maxOrderVolume")));
            }
        });
    },

    gridReload: function (){
        srrl.global.searchAjaxData = {
            crmSn : $("#crmSn").val(),
            startDt : $("#startDt").val(),
            endDt : $("#endDt").val(),
            deadline : "N",
            searchKeyword : $("#searchKeyword").val(),
            searchValue : $("#searchValue").val(),
        }

        srrl.mainGrid("/item/getShipmentRecordList.do", srrl.global.searchAjaxData);
    },

    crmSnReset : function(){
        $("#crmSn").val("");
        $("#crmNm").val("");
        srrl.gridReload()
    },

    fn_popCamCrmList : function (){
        var url = "/crm/pop/popCrmList.do";
        var name = "_blank";
        var option = "width = 1300, height = 670, top = 200, left = 400, location = no"
        var popup = window.open(url, name, option);
    },

    setDeliveryAmt : function(e){
        if($("input[name=rcSn]:checked").length == 0){
            alert("저장할 항목을 선택해주세요.");
            return;
        }

        var shipmentArr = new Array();
        var itemSnList = "";
        var qtyList = "";
        var smRecordSnArr = "";
        $.each($("input[name=rcSn]:checked"), function(){
            var dataItem = $("#mainGrid").data("kendoGrid").dataItem($(this).closest("tr"));
            if(Number(dataItem.DELIVERY_AMT) < Number(dataItem.DELIVERY_VOLUME)){
                smRecordSnArr += "|smRecordSn_" + $(this).val() + ",deliveryAmt_" + String(Number($("#deliveryVolume" + dataItem.SM_RECORD_SN).val()))
                if(!shipmentArr.find(element => element.masterSn == dataItem.MASTER_SN)){
                    var data = {
                        masterSn : String(dataItem.MASTER_SN),
                        reqQty : Number($("#deliveryVolume" + dataItem.SM_RECORD_SN).val())
                    }
                    shipmentArr.push(data);
                }else{
                    shipmentArr.find(element => element.masterSn == dataItem.MASTER_SN).reqQty += Number($("#deliveryVolume" + dataItem.SM_RECORD_SN).val())
                }
            }
        })

        if(shipmentArr.length == 0){
            alert("저장할 항목이 없습니다.");
            return;
        }

        $.each(shipmentArr, function(){
            this.reqQty = String(this.reqQty);
            qtyList += "|masterSn_" + this.masterSn + ",reqQty_" + String(this.reqQty)
            itemSnList += "," + this.masterSn;
        })

        var result = srrl.getShipmentInvenChk(JSON.stringify(shipmentArr));
        if(result.message != null && result.message != ""){
            alert("출하 불가능한 품목입니다.\n\n" + result.message);
            if(result.whCd != null && result.error == null){
                var url = "/item/pop/popOutputByShipment.do";
                var name = "popOutputByShipment";
                var option = "width = 1055, height = 600, top = 100, left = 400, location = no"
                var popup = window.open(url, name, option);

                $("#smRecordSnArr").val(smRecordSnArr.substr(1));
                $("#itemSnList").val(itemSnList.substr(1));
                $("#qtyList").val(qtyList.substr(1));
                var srForm = document.srForm;
                srForm.action = url;
                srForm.method = "post";
                srForm.target = name;
                srForm.submit();
            }
        }else if(result.success == "200"){
            if(confirm("헤딩 품목을 출하하시겠습니까?")){
                var transferArr = new Array()
                $.each($("input[name=rcSn]:checked"), function(i, v){
                    var dataItem = $("#mainGrid").data("kendoGrid").dataItem($(this).closest("tr"));
                    if(Number(dataItem.DELIVERY_AMT) < Number(dataItem.DELIVERY_VOLUME)){
                        var transfer = {
                            transferType : "S",
                            forwardingDate : $("#deliveryDt").val(),
                            forwarder : $("#regEmpSeq").val(),
                            masterSn : String(dataItem.MASTER_SN),
                            transferQty : srrl.uncomma(Number($("#deliveryVolume" + dataItem.SM_RECORD_SN).val())),
                            empSeq : $("#regEmpSeq").val()
                        }
                        transferArr.push(transfer);
                    }
                })

                smRecordSnArr = smRecordSnArr.substr(1).split("|");
                $.each(smRecordSnArr, function(){
                    var data = {
                        smRecordSn : this.split(",")[0].split("_")[1],
                        deliveryAmt : this.split(",")[1].split("_")[1],
                        empSeq : $("#regEmpSeq").val(),
                    }
                    srrl.global.smRecordSnArr.push(data)
                })

                srrl.global.saveAjaxData = {
                    smRecordSnArr : JSON.stringify(srrl.global.smRecordSnArr),
                    empSeq : $("#regEmpSeq").val(),
                    transferArr : JSON.stringify(transferArr)
                }

                var result = customKendo.fn_customAjax("/item/getFwWhCdDesign.do", srrl.global.saveAjaxData);
                if(result.flag){
                    alert("처리되었습니다.");
                    srrl.gridReload();
                }
            }
        }
    },

    getShipmentInvenChk : function(e){
        var result = "";
        srrl.global.searchAjaxData = {
            shipmentArr : e
        }

        var rs = customKendo.fn_customAjax("/item/getShipmentInvenChk.do", srrl.global.searchAjaxData);
        if(rs.flag){
            result = rs.rs;
        }

        return result;
    },

    setDeadlineUpd : function(){
        if($("input[name=rcSn]:checked").length == 0){
            alert("저장할 항목을 선택해주세요.");
            return;
        }

        if(confirm("선택한 항목을 마감처리하시겠습니까?")){
            var srArr = new Array()
            $.each($("input[name=rcSn]:checked"), function(){
                var data = {
                    smRecordSn : $(this).val(),
                    empSeq : $("#regEmpSeq").val()
                }
                srArr.push(data);
            })

            srrl.global.saveAjaxData = {
                srArr : JSON.stringify(srArr)
            }

            var result = customKendo.fn_customAjax("/item/setShipmentDeadlineUpd.do", srrl.global.saveAjaxData);
            if(result.flag){
                alert("처리되었습니다.");
                srrl.gridReload();
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