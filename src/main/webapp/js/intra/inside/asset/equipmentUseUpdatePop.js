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
        eqipmnUseSn : "",
        list : []
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
        $("#busnName").kendoTextBox();
        $("#perAmt").kendoTextBox();
        $("#perReason").kendoTextBox();

        $("#regDe").kendoDatePicker({
            depth: "month",
            start: "month",
            culture : "ko-KR",
            format : "yyyy-MM-dd"
        });

        customKendo.fn_timePicker("time1", '10', "HH:mm", "09:00");
        customKendo.fn_timePicker("time2", '10', "HH:mm", "18:00");
        $("#usePdStrDe, #time1, #time2").attr("readonly", true);

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
                                    index: 0,
                                    change : function(){
                                        /*for(let i=0; i<equipmentUseUpdatePop.global.list.length; i++){
                                            if(equipmentUseUpdatePop.global.list[i].VALUE == this.value()){
                                                const empSeq = equipmentUseUpdatePop.global.list[i].EMP_SEQ;
                                                $("#hourlyUsageFee").val(equipmentUseUpdatePop.global.list[i].HOURLY_USAGE_FEE);
                                                $("#useAmt").val(comma($("#useTime").val() * uncomma($("#hourlyUsageFee").val())));
                                                if(empSeq != null){
                                                    $("#userSn").val(empSeq);
                                                    const empInfo = customKendo.fn_customAjax("/user/getUserInfo", {empSeq:empSeq});
                                                    if(empInfo != null){
                                                        $("#userName").val(empInfo.EMP_NAME_KR);
                                                    }
                                                }


                                            }
                                        }*/
                                    }
                                })
                            }
                        })
                    }
                })
            }
        })
        equipmentUseUpdatePop.fn_calTime();

        window.call = function (data){
            equipmentUseUpdatePop.fn_EqipmnInfo(data);
        };

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
                $("#useAmt").val(rs.USE_AMT == 0 ? 0 : equipmentUseUpdatePop.fn_comma(rs.USE_AMT)); //사용대금
                $("#regDe").val(rs.REG_DE); //작성일자

                $("#pjtSn").val(rs.PJT_SN);
                if(rs.PJT_NM != null){
                    $("#busnName").val(rs.PJT_NM);
                }
                $("#time1").val(rs.STR_TIME);
                $("#time2").val(rs.END_TIME);
                $("#perAmt").val(rs.PER_AMT);
                $("#perReason").val(rs.PER_REASON);
            }
        });
    },

    fn_EqipmnInfo : function (name){

        $.ajax({
            url : "/asset/getEqipmnOne",
            type : "post",
            data : {
                userName : name
            },
            async: false,
            dataType : "json",
            success : function (rs){
                var result = rs.map;

                console.log(result);

                $("#hourlyUsageFee").val("");

                if(result != null) {
                    $("#eqipmnGbnName").data("kendoDropDownList").value(result.eqipmn_gbn_cmmn_cd_sn);
                    $("#eqipmnGbnName").data("kendoDropDownList").trigger("change");

                    $("#eqipmnName").data("kendoDropDownList").value(result.eqipmn_mst_sn);

                    $("#hourlyUsageFee").val(result.hourly_usage_fee);
                }
            }
        });
    },

    fn_comma: function(str){
        return str.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",").replace(/(^0+)/, "");
    },

    inputNumberFormat: function (obj){
        obj.value = equipmentUseUpdatePop.fn_comma(obj.value);
    },

    uncomma: function(str) {
        str = String(str);
        return str.replace(/[^\d]+/g, '');
    },

    equipUpdate : function(){
        /** 사용대금 필수값 해제로 인하여 공백값일시 0원 들어가게 변경 */
        let useAmt = $("#useAmt").val().replace(/,/g, '');
        if($("#useAmt").val() == ""){
            useAmt = 0;
        }

        let perAmt = $("#perAmt").val().replace(/,/g, '');
        if($("#perAmt").val() == ""){
            perAmt = 0;
        }

        if(confirm("수정하시겠습니까?")){
            var data = {
                pk : $("#eqipmnUseSn").val(), //장비사용 pk
                pjtSn : $("#pjtSn").val(),
                eqipmnGbnName : $("#eqipmnGbnName").data("kendoDropDownList").text(), //구분명
                eqipmnGbnCmmnCdSn : $("#eqipmnGbnName").data("kendoDropDownList").value(), //구분공통코드sn
                eqipmnName : $("#eqipmnName").data("kendoDropDownList").text(), //장비명
                eqipmnMstSn : $("#eqipmnName").data("kendoDropDownList").value(), //장비마스터 순번
                usePdStrDe : $("#usePdStrDe").val().replaceAll('-',''), //사용기간 시작일
                //usePdEndDe : $("#usePdEndDe").val().replaceAll('-',''), //사용기간 종료일
                time1 : $("#time1").val(), //사용기간 시작시간
                time2 : $("#time2").val(), //사용기간 종료시간
                userName : $("#userName").val(), //사용자명
                userSn : $("#empSeq").val(), //사용자 사원번호
                operCn : $("#operCn").val(), //작업내용
                useTime : $("#useTime").val(), //사용시간
                useAmt : useAmt, //사용대금
                perAmt : perAmt, //할인금액
                perReason : $("#perReason").val(),
                regDe : $("#regDe").val().replaceAll('-',''), //작성일자
                crtrSn : $("#regEmpSeq").val(), //생성자sn - 로그인한 계정
                clientPprtpcoName : $("#clientPprtpcoName").val(), //의뢰업체명
                updusrSn : $("#regEmpSeq").val() //수정자sn - 로그인한 계정
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
            //}else if(data.usePdEndDe == null || data.usePdEndDe == '') {
            //    alert("사용기간 종료일을 입력하세요.")
            //    return false;
            }else if(data.userName == null || data.userName == '') {
                alert("사용기간 사용자명을 입력하세요.")
                return false;
            }else if(data.operCn == null || data.operCn == '') {
                alert("작업내용을 입력하세요.")
                return false;
            }else if(data.useTime == null || data.useTime == '') {
                alert("사용시간을 입력하세요.")
                return false;
            }else if(data.regDe == null || data.regDe == '') {
                alert("작성일자를 입력하세요.")
                return false;
            }

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
    },

    fn_calTime : function(){
        let startTime = $("#time1").val();
        let endTime = $("#time2").val();
        var now = new Date();
        var year = now.getFullYear();
        var month = now.getMonth()+1;
        var day = now.getDate();
        var hour1 = startTime.split(":")[0];
        var hour2 = endTime.split(":")[0];
        var min1 = startTime.split(":")[1];
        var min2 = endTime.split(":")[1];
        var bfDate = new Date(year, month, day, hour1, min1);
        var afDate = new Date(year, month, day, hour2, min2);
        var diffSec = afDate.getTime() - bfDate.getTime();
        var diffMin = diffSec / 1000 / 60 / 60;

        $("#useTime").val(Math.ceil(diffMin));
        equipmentUseUpdatePop.fn_EqipmnHUF(Math.ceil(diffMin));
    },

    // 시간당 사용대금 계산
    fn_EqipmnHUF : function (time){
        $("#useAmt").val(comma(time * $("#hourlyUsageFee").val()));
    }
}

