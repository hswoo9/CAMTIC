/**
 * 2023.06.21
 * 작성자 : 김지혜
 * 내용 : 자산관리 > 장비관리 - 장비사용 등록 수정 팝업창
 */
var now = new Date();
var now1 = new Date();
var equipmentUseUpdatePop = {

    global : {
        eqipmnGbnName : [],
        eqipmnUseSn : ""
    },

    fn_defaultScript: function () {

        $("#eqipmnName").kendoDropDownList({
            dataTextField: "TEXT",
            dataValueField: "VALUE",
            index: 0
        })

        //사용기간 - 시작
        $("#usePdStrDe").kendoDatePicker({
            depth: "month",
            start: "month",
            culture : "ko-KR",
            format : "yyyy-MM-dd"
        });

        //사용기간 - 끝
        $("#usePdEndDe").kendoDatePicker({
            depth: "month",
            start: "month",
            culture : "ko-KR",
            format : "yyyy-MM-dd"
        });

        $("#userName").kendoTextBox();
        $("#operCn").kendoTextBox();
        $("#useTime").kendoTextBox();
        $("#useAmt").kendoTextBox();
        $("#clientPrtpcoName").kendoTextBox();
        $("#sortSn").kendoTextBox();

        $("#regDe").kendoDatePicker({
            depth: "month",
            start: "month",
            culture : "ko-KR",
            format : "yyyy-MM-dd"
        });

        //업체구분 드롭박스 리스트
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

        //장비명 드롭박스 리스트
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

        //조회한 데이터 세팅
        $.ajax({
            url : '/asset/getEqipmnUseUpdateList',
            data : {
                pk : $("#eqipmnUseSn").val()
            },
            dataType: "json",
            type : "get",
            async : false,
            success : function(result){
                console.log(result.rs);
                const rs = result.rs[0];

                $("#eqipmnGbnName").data("kendoDropDownList").value(rs.EQIPMN_GBN_CMMN_CD_SN); //구분공통코드sn
                var data = {
                    eqipmnGbnCmmnCdSn : rs.EQIPMN_GBN_CMMN_CD_SN
                }
                $.ajax({
                    url : "/asset/getEqipmnNameList",
                    type : "post",
                    async: false,
                    data : data,
                    dataType : "json",
                    success : function (eqipmnResult){
                        console.log(eqipmnResult);
                        var ds = eqipmnResult.list;
                        ds.unshift({TEXT: '선택하세요', VALUE: ''});

                        $("#eqipmnName").kendoDropDownList({
                            dataTextField: "TEXT",
                            dataValueField: "VALUE",
                            dataSource: ds,
                            index: 0
                        })
                    }
                })
                $("#eqipmnName").data("kendoDropDownList").value(rs.EQIPMN_MST_SN); //장비명
                $("#usePdStrDe").val(rs.USE_PD_STR_DE); //사용기간 시작일
                $("#usePdEndDe").val(rs.USE_PD_END_DE); //사용기간 종료일
                $("#userName").val(rs.USER_NAME); //사용자명
                $("#operCn").val(rs.OPER_CN); //작업내용
                $("#useTime").val(rs.USE_TIME); //사용시간
                $("#useAmt").val(rs.USE_AMT); //사용대금
                $("#prtpcoGbnName").data("kendoDropDownList").value(rs.PRTPCO_GBN_SN); //업체구분 공통코드sn
                $("#regDe").val(rs.REG_DE); //작성일자
                $("#sortSn").val(rs.SORT_SN); //정렬순번
            }
        });
    },

    equipUpdate : function(){
        if(confirm("수정하시겠습니까?")){
            var data = {
                pk : $("#eqipmnUseSn").val(), //장비사용 pk
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
                useAmt : $("#useAmt").val(), //사용대금
                prtpcoGbnName : $("#prtpcoGbnName").data("kendoDropDownList").text(), //업체구분명
                prtpcoGbnSn : $("#prtpcoGbnName").data("kendoDropDownList").value(), //업체구분 공통코드sn
                regDe : $("#regDe").val().replaceAll('-',''), //작성일자
                sortSn : $("#sortSn").val(), //정렬순번
                crtrSn : $("#empSeq").val(), //생성자sn - 로그인한 계정
                clientPprtpcoName : $("#clientPprtpcoName").val(), //의뢰업체명
                updusrSn : $("#empSeq").val() //수정자sn - 로그인한 계정
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
            }else if(data.sortSn == null || data.sortSn == '') {
                alert("정렬순번을 입력하세요.")
                return false;
            }
            console.log(data);

            $.ajax({
                url : '/asset/setEquipmenUseUpdate',
                data : data,
                dataType: "json",
                type : "get",
                async : false,
            });
            alert("수정 되었습니다.");
            opener.gridReload();
            window.close()
        }
    }
}

