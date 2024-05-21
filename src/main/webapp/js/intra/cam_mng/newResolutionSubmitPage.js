var newResolutionSubmitPage = {

    global: {
        searchAjaxData : ""
    },

    fn_defaultScript: function () {
        $("#korNm, #gisuDt, #gisuSeq, #BG_SQ, #docNumber, #docTitle, #kukgoPjtNm, #divNm, #pjtNm, #abgtNm, #setFgNm, #vatFgNm, #unitAm, #ASSTN_TAXITM_CODE_NM, #EXCUT_PRPOS_CN, #PRDLST_NM, #PRUF_SE_NO, #EXCUT_REQUST_DE, #SUM_AMOUNT, #SPLPC, #VAT, #BCNC_SE_CODE, #BCNC_CMPNY_NM, #BCNC_LSFT_NO, #PIN_NO_1, #PIN_NO_2, #BCNC_RPRSNTV_NM, #BCNC_TELNO, #BCNC_BIZCND_NM, #BCNC_INDUTY_NM, #POST_CD, #BCNC_ADRES, #BCNC_BANK_CODE_NM, #BCNC_ACNUT_NO, #TRANSFR_ACNUT_SE_CODE, #SBSACNT_TRFRSN_CODE, #SBSACNT_TRFRSN_CN, #SBSIDY_BNKB_INDICT_CN, #BCNC_BNKB_INDICT_CN, #PROCESS_RESULT_MSSAGE").kendoTextBox();

        var evidence = JSON.parse('${resultMap.evidence}');
        evidence.unshift({CMMN_DETAIL_CODE_NM : "선택", CMMN_DETAIL_CODE : ""});

        $("#PRUF_SE_CODE").kendoComboBox({
            dataSource: evidence,
            dataTextField: "CMMN_DETAIL_CODE_NM",
            dataValueField: "CMMN_DETAIL_CODE",
            index: 0,
            select : newResolutionSubmitPage.fn_prufSeCode, // select 하면 발생하는 이벤트
            change : newResolutionSubmitPage.onChange
        });
    },

    //증빙선택
    fn_prufSeCode : function(e){
        var dataItem = this.dataItem(e.item.index());

        if (dataItem.CMMN_DETAIL_CODE == "1" || dataItem.CMMN_DETAIL_CODE =="001" ) {
            newResolutionSubmitPage.fn_selectElecInvoice();
        } else if (dataItem.CMMN_DETAIL_CODE =="2" || dataItem.CMMN_DETAIL_CODE == "002") {
            newResolutionSubmitPage.fn_selectNomalInvoice();
        } else if (dataItem.CMMN_DETAIL_CODE == '004') {
            console.log("보조금전용카드 선택");
            newResolutionSubmitPage.fn_selectCard();
        } else if (dataItem.CMMN_DETAIL_CODE == "999") {
            console.log("기타 선택");
            newResolutionSubmitPage.fn_selectEtc();
        } else if (dataItem.CMMN_DETAIL_CODE_NM === "선택") {
            newResolutionSubmitPage.fn_selectEtc();
        }
    },

    fn_selectElecInvoice: function(){
        fn_commonSelect('A');
        fn_commonSelect2(true);
        $('#BCNC_LSFT_NO').prop('readonly', true);
    },

    // 증빙선택 onChange
    onChange: function(e) {
        var cb = $("#PRUF_SE_CODE").data("kendoComboBox");

        if (cb.value() === "999") {
            $('#EXCUT_REQUST_DE').val(fn_formatDate('${data.DOC_REGDATE}'));
        } else {
            $('#EXCUT_REQUST_DE').val('');
        }
    },

    fn_backClick: function(){
        $("#subPopUp").data("kendoWindow").open();
        $("#bankGrid").data('kendoGrid').dataSource.read();
    },

// 승인번호 조회
    searchBtn : function() {
        var selectedPrufCode = $('#PRUF_SE_CODE').data("kendoComboBox").select();

        if (selectedPrufCode == 1 || selectedPrufCode == 2) {
            $('#popUp').data('kendoWindow').open();
            invoiceMainGrid();
            // 세금계산서 전송 팝업 ㄱㄱ
        } else if (selectedPrufCode == 3) {
            $("#cardPopup").data("kendoWindow").open();
        }
    },

    cardSearch: function() {
        newResolutionSubmitPage.cardGridReload();
    },

    cardGridReload: function(){
        $("#cardGrid").data("kendoGrid").dataSource.read();
    },

    addrSearch : function(){
        daum.postcode.load(function(){
            new daum.Postcode({
                oncomplete: function(data){

                    var roadAddr = data.roadAddress; // 도로명 주소 변수
                    var extraRoadAddr = ''; // 참고 항목 변수

                    // 법정동명이 있을 경우 추가한다. (법정리는 제외)
                    // 법정동의 경우 마지막 문자가 "동/로/가"로 끝난다.
                    if(data.bname !== '' && /[동|로|가]$/g.test(data.bname)){
                        extraRoadAddr += data.bname;
                    }
                    // 건물명이 있고, 공동주택일 경우 추가한다.
                    if(data.buildingName !== '' && data.apartment === 'Y'){
                        extraRoadAddr += (extraRoadAddr !== '' ? ', ' + data.buildingName : data.buildingName);
                    }
                    // 표시할 참고항목이 있을 경우
                    if(extraRoadAddr !== ''){
                        extraRoadAddr = ' (' + extraRoadAddr + ')';
                    }

                    $("#post").val(data.zonecode);
                    $("#POST_CD").val(data.zonecode);
                    $("#BCNC_ADRES").val(roadAddr);
                    $("#ADDR_D").val(roadAddr);

                    // 참고항목 문자열이 있을 경우 해당 필드에 넣는다.
                    if(roadAddr !== ''){
                        //$("#subAddr").val(extraRoadAddr);
                    } else {
                        //$("#subAddr").val("");
                    }

                    var guideTextBox = document.getElementById("guide");
                    // 사용자가 '선택 안함'을 클릭한 경우, 예상 주소라는 표시
                    if(data.autoRoadAddress) {
                        var expRoadAddr = data.autoRoadAddress + extraRoadAddr;
                        guideTextBox.innerHTML = '(예상 도로명 주소 : ' + expRoadAddr + ')';
                        guideTextBox.style.display = 'block';

                    } else if(data.autoJibunAddress) {
                        var expJibunAddr = data.autoJibunAddress;
                        guideTextBox.innerHTML = '(예상 지번 주소 : ' + expJibunAddr + ')';
                        guideTextBox.style.display = 'block';
                    } else if(guideTextBox != null){
                        guideTextBox.innerHTML = '';
                        guideTextBox.style.display = 'none';
                    }

                    $("#addrDetail").focus();
                }
            }).open();
        });
    },





<!-- 첨부파일 -->
    fileCountChenck:function(){
        var dt = $('#gisuDt').val().replace(/\-/g,'');
        var data = {
            INTRFC_ID :  $('#INTRFC_ID').val(),
            TRNSC_ID : $('#TRNSC_ID').val(),
            C_DIKEYCODE : $('#C_DIKEYCODE').val(),
            KUKGO_STATE_YN : $('#KUKGO_STATE_YN').val(),
            targetId : dt+""+pad($('#gisuSeq').val(), 4) + ""+ pad($('#LN_SQ').val(), 2),
            FILE_ID : dt+""+pad($('#gisuSeq').val(), 4) + ""+ pad($('#LN_SQ').val(), 2)
        }

        $('#fileDiv').empty();

        $.ajax({
            url: "/kukgoh/getFileList",
            dataType : 'json',
            data : data,
            type : 'POST',
            async : true,
            success: function(result){
                $('#FILE_ID').val("1");
                if (result.list.length > 0) {
                    console.log('0 이상')
                    $('#attachFileYn').show();
                }else {
                    console.log('0 이하')
                    $('#attachFileYn').hide();
                }
            }
        });
    },

    fileRow :function() {
        var dt = $('#gisuDt').val().replace(/\-/g,'');

        var data = {
            INTRFC_ID : $('#INTRFC_ID').val(),
            TRNSC_ID : $('#TRNSC_ID').val(),
            C_DIKEYCODE : $('#C_DIKEYCODE').val(),
            KUKGO_STATE_YN : $('#KUKGO_STATE_YN').val(),
            targetId : dt+""+pad($('#gisuSeq').val(), 4) + ""+ pad($('#LN_SQ').val(), 2),
            FILE_ID : dt+""+pad($('#gisuSeq').val(), 4) + ""+ pad($('#LN_SQ').val(), 2)
        }

        $('#fileDiv').empty();

        $.ajax({
            url: "/kukgoh/getFileList",
            dataType : 'json',
            data : data,
            type : 'POST',
            success: function(result){
                if (result.list.length > 0) {
                    $('#FILE_ID').val("1");
                    $('#attachFileYn').show();
                    var kukgohStateYn = $('#KUKGO_STATE_YN').val();

                    if(kukgohStateYn == 'N'){
                        //미전송
                        for (var i = 0 ; i < result.list.length ; i++) {
                            fn_setFileDivN(result, i);
                        }
                    }else if(kukgohStateYn == 'Y'){
                        //전송
                        for (var i = 0 ; i < result.list.length ; i++) {
                            fn_setFileDivY(result, i);
                        }
                    }
                }else {
                    $('#attachFileYn').hide();
                    $('#fileDiv').append(
                    '<tr id="testDefault">'+
                    '<td class="" style="width:250px;">'+
                    '<span class="mr20">'+
                    '<img src="<c:url value="/Images/ico/ico_clip02.png"/>" alt="" />'+
                    '<a href="#n" style="color: #808080;" id="fileText">&nbsp;첨부파일이 없습니다.'+
                    '</a>'+
                    '</span>'+
                    '</td>'+
                    '</tr>'
                    );
                }
            }
        });
        $('#filePop').data("kendoWindow").open();
    },

    upFile :function() {
        $("#fileID").click();
    },

    getFileNm : function(e) {
        var index = $(e).val().lastIndexOf('\\') + 1;
        var valLength = $(e).val().length;
        var row = $(e).closest('dl');
        var fileNm = $(e).val().substr(index, valLength);
        row.find('#fileText').text(fileNm).css({'color':'#0033FF','margin-left':'5px'});
        insertFile(fileNm);
    },

    delFile : function(attach_file_id, file_seq) {
        var data = {
        attach_file_id : attach_file_id,
        fileSeq : file_seq
    },

    $.ajax({
    url : _g_contextPath_+'/kukgoh/deleteFile',
    type : 'GET',
    data : data,
}).success(function(result) {
    if(result.outYn == 'Y'){
    $('#test'+result.attach_file_id).closest('tr').remove()
}else{
}
});
}

    function insertFile(fileNm){
    var dt = $('#gisuDt').val().replace(/\-/g,'');
    var form = new FormData($("#fileForm")[0]);

    form.append("C_DIKEYCODE", $('#C_DIKEYCODE').val());
    form.append("targetId", dt+""+pad($('#gisuSeq').val(), 4) + ""+ $('#attachLnSeq').val());
    form.append("fileNm",fileNm);
    form.append("intrfcId", "IF-EXE-EFR-0074");

    $.ajax({
    url : _g_contextPath_+"/kukgoh/insertAttachFile",
    data : form,
    type : 'post',
    processData : false,
    async: false,
    contentType : false,
    success : function(result) {

    if(result.outYn == 'Y'){
    alert("첨부파일을 등록하였습니다.");
    $('#FILE_ID').val("1");
    $('#testDefault').remove();
    $('#fileDiv').append(
    '<tr id="test'+result.attach_file_id+'">'+
    '<td class="">'+
    '<span style=" display: block;" class="mr20">'+
    '<img src="<c:url value="/Images/ico/ico_clip02.png"/>" alt="" />&nbsp;'+
    '<a href="#n" style="line-height: 23px; cursor: pointer; color: #0033FF" id="fileText" onclick="kukgohFileDown(this);" class="file_name">'+result.fileNm+'.'+result.ext+'</a>&nbsp;'+
    '&nbsp;'
    +'<a href="javascript:delFile('+result.attach_file_id+','+result.file_seq+')"><img src="<c:url value="/Images/btn/btn_del_reply.gif"/>" /></a>' +
    '<input type="hidden" id="fileId" class = "fileId" value="'+result.attach_file_id+'" />'+
    '<input type="hidden" id="fileSeq" class = "fileSeq" value="'+result.file_seq+'" />'+

    '</span>'+
    '</td>'+
    '</tr>'
    );
}else{
    alert(result.outMsg);
}
},
    error : function(error) {
    console.log(error);
    console.log(error.status);
}
});
}

    function filepopClose(){
    fileCountChenck();
    $('#filePop').data('kendoWindow').close();
}

    function getNumString(s) {
    var rtn = parseFloat(s.replace(/,/gi, ""));
    if (isNaN(rtn)) return 0;
    else return rtn;
}

    function fn_btnDocView(){
    var dikeyCode = '${data.C_DIKEYCODE}';
    fn_viewDoc(dikeyCode);
}

    function check(str){
    var result = true;
    if( str == '' || str == null ){
    alert( '값을 입력해주세요' );
    result = false;
    return result;
}
    var blank_pattern = /^\s+|\s+$/g;
    if( str.replace( blank_pattern, '' ) == "" ){
    alert(' 공백만 입력되었습니다 ');
    result = false;
    return result;
}
    //공백 금지
    //var blank_pattern = /^\s+|\s+$/g;(/\s/g
    var blank_pattern = /[\s]/g;
    if( blank_pattern.test( str) == true){
    alert(' 공백은 사용할 수 없습니다. ');
    result = false;
    return result;
}

    return result;
}

    function postSearchBtn(){
    fnZipPop('temp');
}

    function fn_setFileDivY(result, i){
    $('#fileDiv').append(
        '<tr id="test'+result.list[i].attach_file_id+'">'+
        '<td class="">'+
        '<span style=" display: block;" class="mr20">'+
        '<img src="<c:url value="/Images/ico/ico_clip02.png"/>" alt="" />&nbsp;'+
        '<a href="#n" style="line-height: 23px; cursor: pointer; color: #0033FF" id="fileText" onclick="kukgohFileDown(this);" class="file_name">'+result.list[i].real_file_name+'.'+result.list[i].file_extension+'</a>&nbsp;'+
        '<input type="hidden" id="fileId" class = "fileId" value="'+result.list[i].attach_file_id+'" />'+
        '<input type="hidden" id="fileSeq" class = "fileSeq" value="'+result.list[i].file_seq+'" />'+

        '</span>'+
        '</td>'+
        '</tr>'
    );
}

    function fn_setFileDivN(result, i){
    $('#fileDiv').append(
        '<tr id="test'+result.list[i].attach_file_id+'">'+
        '<td class="">'+
        '<span style=" display: block;" class="mr20">'+
        '<img src="<c:url value="/Images/ico/ico_clip02.png"/>" alt="" />&nbsp;'+
        '<a href="#n" style="line-height: 23px; cursor: pointer; color: #0033FF" id="fileText" onclick="kukgohFileDown(this);" class="file_name">'+result.list[i].real_file_name+'.'+result.list[i].file_extension+'</a>&nbsp;'+
        '&nbsp;<a href="javascript:delFile('+result.list[i].attach_file_id+','+result.list[i].file_seq+')"><img src="<c:url value="/Images/btn/btn_del_reply.gif"/>" /></a>' +
        '<input type="hidden" id="fileId" class = "fileId" value="'+result.list[i].attach_file_id+'" />'+
        '<input type="hidden" id="fileSeq" class = "fileSeq" value="'+result.list[i].file_seq+'" />'+

        '</span>'+
        '</td>'+
        '</tr>'
    );
}

    function kukgohFileDown(e){
    var row = $(e).closest("tr");
    var attach_file_id = row.find('#fileId').val();
    var file_seq = row.find('#fileSeq').val()
    var data = {
    attach_file_id : row.find('#fileId').val(),
    file_seq : row.find('#fileSeq').val()
}
    $.ajax({
    url : _g_contextPath_+'/kukgoh/fileDownLoad',
    type : 'get',
    data : data,
}).success(function(data) {

    var downWin = window.open('','_self');
    downWin.location.href = _g_contextPath_+"/kukgoh/fileDownLoad?attach_file_id="+attach_file_id+'&file_seq='+file_seq;
});
}
    function fn_commonSelect(ab){
    //비활성 : 거래처구분, 거래처명, 사업자등록번호, 업태 , 업종, 주소, 예금주명,
    //대표자명, 전화번호, , 은행명, 계좌번호,  이체구분, 내통장표시, 받는통장표시
    //승인번호는 다 있다.

    $('#dt_invoice').show();	//승인번호
    $('#dd_invoice1').show();	//승인번호
    if(ab == 'A'){
    $("#PRUF_SE_NO").val(typeof dataJson.PRUF_SE_NO === 'undefined' ? dataJson.ETXBL_CONFM_NO : dataJson.PRUF_SE_NO);
}else if(ab == 'B'){
    $("#PRUF_SE_NO").val(typeof dataJson.PRUF_SE_NO === 'undefined' ? '' : dataJson.PRUF_SE_NO);
}

}
    function fn_commonSelect2(tf){
// 	$('#EXCUT_REQUST_DE').data("kendoDatePicker").readonly(tf);
// 	$('#BCNC_SE_CODE').data("kendoComboBox").readonly(tf);
    $('#BCNC_CMPNY_NM').prop('readonly', tf);	//거래처명
    $('#BCNC_LSFT_NO').prop('readonly', tf);		//사업자등록번호
    //BCNC_BIZCND_NM
    $('#BCNC_BIZCND_NM').prop('readonly', tf)		//업태
    $('#BCNC_INDUTY_NM').prop('readonly', tf)		//업종
    $('#POST_CD').prop('readonly', tf)
    $('#BCNC_ADRES').prop('readonly', tf);	//주소

    //활성
    $('#BCNC_RPRSNTV_NM').prop('readonly', false);	 //대표자명
    $('#BCNC_TELNO').prop('readonly', false);	//전화번호

    //이체구분
    $('#SBSIDY_BNKB_INDICT_CN').prop('readonly', false);//내통장표시
    $('#BCNC_BNKB_INDICT_CN').prop('readonly', false);//받는통장표시
}
    function fn_selectElecInvoice(){
    fn_commonSelect('A');
    fn_commonSelect2(true);
    $('#BCNC_LSFT_NO').prop('readonly', true);
}

    function fn_selectNomalInvoice(){
    fn_commonSelect('A');
    fn_commonSelect2(true);
    $('#BCNC_LSFT_NO').prop('readonly', false);
}

    function fn_selectCard(){
    fn_commonSelect('B');
    fn_commonSelect2(true);
}

    function fn_selectEtc(){
    $('#dt_invoice').hide();	//승인번호
    $('#dd_invoice1').hide();	//승인번호
    fn_commonSelect2(false);
}

    //거래처 계좌로 이체
    function fn_depositToCompAccount(){
    //다오픈
}

    //보조금계좌로 이체
    function fn_depositToTpfAccount(){
    //다오픈
}

</script>


}