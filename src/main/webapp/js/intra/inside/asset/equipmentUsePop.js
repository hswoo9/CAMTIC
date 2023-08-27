/**
 * 2023.06.06
 * 작성자 : 김지혜
 * 내용 : 자산관리 > 장비관리 - 장비사용 등록 팝업창
 */
var now = new Date();
var now1 = new Date();
var equipmentUsePop = {

    global : {
        eqipmnGbnName : []
    },

    fn_defaultScript: function () {

        //사용기간 - 시작
        $("#usePdStrDe").kendoDatePicker({
            depth: "month",
            start: "month",
            culture : "ko-KR",
            format : "yyyy-MM-dd",
            value : new Date(now.setMonth(now.getMonth()))
        });

        //사용기간 - 끝
        $("#usePdEndDe").kendoDatePicker({
            depth: "month",
            start: "month",
            culture : "ko-KR",
            format : "yyyy-MM-dd",
            value : new Date(now.setMonth(now.getMonth()+1))
        });

        //장비명
        $("#eqipmnName").kendoDropDownList({
            dataTextField: "TEXT",
            dataValueField: "VALUE",
            index: 0
        })

        $("#userName").kendoTextBox();
        $("#operCn").kendoTextBox();
        $("#useTime").kendoTextBox();
        $("#useAmt").kendoTextBox();
        $("#clientPrtpcoName").kendoTextBox();

        $("#regDe").kendoDatePicker({
            depth: "month",
            start: "month",
            culture : "ko-KR",
            format : "yyyy-MM-dd",
            value : new Date(now1.setMonth(now1.getMonth()))
        });

        $.ajax({
            url : "/asset/getEqipmnList",
            type : "post",
            async: false,
            dataType : "json",
            success : function (result){
                var ds = result.list;
                ds.unshift({TEXT: '선택하세요', VALUE: ''});

                $("#eqipmnGbnName").kendoDropDownList({
                    dataTextField: "TEXT",
                    dataValueField: "VALUE",
                    dataSource: ds,
                    index: 0,
                    change : function(){
                        console.log(this.value());

                        var data = {
                            eqipmnGbnCmmnCdSn : this.value()
                        }
                        $.ajax({
                            url : "/asset/getEqipmnNameList",
                            type : "post",
                            async: false,
                            data : data,
                            dataType : "json",
                            success : function (result){
                                var ds = result.list;
                                ds.unshift({TEXT: '선택하세요', VALUE: ''});

                                $("#eqipmnName").kendoDropDownList({
                                    dataTextField: "TEXT",
                                    dataValueField: "VALUE",
                                    dataSource: ds,
                                    index: 0
                                })
                            }
                        })
                    }
                })
            }
        })

        $.ajax({
            url : "/asset/getPrtpcoGbnNameList",
            type : "post",
            async: false,
            dataType : "json",
            success : function (result){
                var ds = result.list;
                ds.unshift({TEXT: '선택하세요', VALUE: ''});

                $("#prtpcoGbnName").kendoDropDownList({
                    dataTextField: "TEXT",
                    dataValueField: "VALUE",
                    dataSource: ds,
                    index: 0
                })
            }
        })

        $("#useAmt").bind("keyup keydown", function() {
            equipmentUsePop.inputNumberFormat(this)
        })
    },

    inputNumberFormat: function (obj){
        obj.value = equipmentUsePop.fn_comma(obj.value);
    },

    fn_comma: function(str){
        return str.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",").replace(/(^0+)/, "");
    },

    equipUseSave : function (){

        if(confirm("등록하시겠습니까?")){
            var data = {
                eqipmnGbnName : $("#eqipmnGbnName").data("kendoDropDownList").text(), //구분명
                eqipmnGbnCmmnCdSn : $("#eqipmnGbnName").data("kendoDropDownList").value(), //구분공통코드sn
                eqipmnName : $("#eqipmnName").data("kendoDropDownList").text(), //장비명
                eqipmnMstSn : $("#eqipmnName").data("kendoDropDownList").value(), //장비마스터 순번
                usePdStrDe : $("#usePdStrDe").val().replaceAll('-',''), //사용기간 시작일
                usePdEndDe : $("#usePdEndDe").val().replaceAll('-',''), //사용기간 종료일
                userName : $("#userName").val(), //사용자명
                userSn : $("#empSeq").val(), //사용자 사원번호
                operCn : $("#operCn").val(), //작업내용
                useTime : $("#useTime").val(), //사용시간
                useAmt : $("#useAmt").val().replace(/,/g, ''), //사용대금
                prtpcoGbnName : $("#prtpcoGbnName").data("kendoDropDownList").text(), //업체구분명
                prtpcoGbnSn : $("#prtpcoGbnName").data("kendoDropDownList").value(), //업체구분 공통코드sn
                regDe : $("#regDe").val().replaceAll('-',''), //작성일자
                crtrSn : $("#empSeq").val(), //생성자sn - 로그인한 계정
                clientPprtpcoName : $("#clientPprtpcoName").val() //의뢰업체명
            }

            if(data.eqipmnGbnCmmnCdSn == null || data.eqipmnGbnCmmnCdSn == ''){
                alert("장비명의 첫번째 항목을 선택하세요.")
                return false;
            }else if(data.eqipmnMstSn == null || data.eqipmnMstSn == '') {
                alert("장비명의 두번째 항목을 입력하세요.")
                return false;
            }else if(data.usePdStrDe == null || data.usePdStrDe == '') {
                alert("사용기간 시작일을 입력하세요.")
                return false;
            }else if(data.usePdEndDe == null || data.usePdEndDe == '') {
                alert("사용기간 종료일을 입력하세요.")
                return false;
            }else if(data.userName == null || data.userName == '') {
                alert("사용기간 사용자명을 입력하세요.")
                return false;
            }else if(data.operCn == null || data.operCn == '') {
                alert("작업내용을 입력하세요.")
                return false;
            }else if(data.useTime == null || data.useTime == '') {
                alert("사용시간을 입력하세요.")
                return false;
            }else if(data.useAmt == null || data.useAmt == '') {
                alert("사용대금을 입력하세요.")
                return false;
            }/*else if(data.clientPprtpcoName == null || data.clientPprtpcoName == '') {
                alert("의뢰업체를 입력하세요.")
                return false;
            }*/else if(data.prtpcoGbnName == null || data.prtpcoGbnName == '') {
                alert("업체구분을 선택하세요.")
                return false;
            }else if(data.regDe == null || data.regDe == '') {
                alert("작성일자를 입력하세요.")
                return false;
            }

            $.ajax({
                url : '/asset/setEquipmentUseInsert',
                data : data,
                dataType: "json",
                type : "get",
                async : false
            });
            alert("저장 되었습니다.");
            opener.gridReload();
            window.close()
        }
    }
}

