var appView = {

    global : {
        saveAjaxData : "",
    },

    fn_defaultScript : function(){
        // appView.getSelectBoxSetting();
        var recruitAreaInfoSn = $("#recruitAreaInfoSn").val();
        console.log("recruitAreaInfoSn : ",recruitAreaInfoSn);

        $.ajax({
            url : "/application/getApplicationByRecruitArea.do",
            data : { recruitAreaInfoSn: recruitAreaInfoSn, recruitInfoSn: $("#recruitInfoSn").val(), type: $("#type").val() },
            method : "POST",
            dataType : "json",
            success: function (data){
                var applicationList = data.list;
                console.log("applicationList",applicationList);

                var html = '';
                html = '<table class="popTable table table-bordered mb-0" style="border: 0; margin-top: 5px; border: 1px solid #dedfdf;">' +
                    '<colgroup>' +
                    '<col width="12%">' +
                    '</colgroup>' +
                    '<thead><tr><th style="width: 113px;">지원자</th>';

                for (var i = 0; i < applicationList.length; i++) {
                    // Start a new row every 6 items
                    if (i % 6 === 0 && i !== 0) {
                        html += '</tr><tr>';
                    }

                    html += '<td style="height: 40px; width: 110px;">' +
                        '<a href="javascript:void(0);" class="k-button k-button-solid-base" onclick="appView.getNewData(\'' + applicationList[i].APPLICATION_ID + '\')">' +
                        '<span>' + (i+1) + '. ' + applicationList[i].USER_NAME + '('+applicationList[i].BYEAR+')</span></a>' +
                        '</td>';
                }

                html += '</tr></thead></table>';

                $("#applicationList").append(html);
            },
            error: function(error){
                console.log("ajax 요청 중 오류가 발생하였습니다.",error);
            }
        });

        appView.getFile();
        appView.getCareerSum();

        appView.viewMod();
    },

    getFile : function(){
        /** 인적성 파일 */
        const result = customKendo.fn_customAjax("/inside/applicationViewRegrid", {applicationId : $("#applicationId").val()});
        const data = result.data;

        if(data.file != null){
            let html = '<img src="/images/ico/file.gif" onclick="fileDown(\'' + data.file.file_path + data.file.file_uuid + '\', \'' + data.file.file_org_name + '.' + data.file.file_ext + '\')">';
            $("#fileName").html(html);
        }else{
            let html = '<span>미첨부</span>';
            $("#fileName").html(html);
        }
    },

    getCareerSum : function(){
        /** 개월수 총합 계산 */
        let sum = 0;
        let sumText = "";
        $(".careerDiff").each(function(){
            const mm = $(this).val();
            sum += Number(mm);
        });
        sumText = Math.floor(sum/12)+"년"+(sum%12)+"개월";
        $("#totCareer").text(sumText);
    },

    getNewData : function (e){
        var applicationId = e;
        console.log("applicationID : ", applicationId);


        $.ajax({
            url : "/inside/applicationViewRegrid",
            data : {applicationId : applicationId},
            type : "POST",
            dataType: "json",
            success : function(data){
                const responseData = data.data;
                console.log("js data : ",responseData);
                $("#mainGrid *").remove();
                appView.changeMainGrid(responseData);
                $("#applicationId").val(applicationId);

                appView.getFile();
                appView.getCareerSum();

                appView.viewMod();
            },
            error: function (error){
                console.error("Error fetching data:", error);
            }
        });
    },

    changeMainGrid : function(e){
        var data = e;

        var html = '';
        html +=' <table class="popTable table table-bordered mb-0" style="border: 0; margin-top : 5px; border: 1px solid #dedfdf;">' +
            '        <colgroup>' +
            '          <col width="12%">' +
            '        </colgroup>' +
            '        <thead>' +
            '        <tr>' +
            '          <th>' +
            '            지원분야' +
            '          </th>' +
            '          <td>' +
            '            <span id="recruitAreaInfoSnTxt">'+
            data.JOB +
            '</span>' +
            '          </td>' +
            '        </tr>' +
            '        </thead>' +
            '      </table>' +
            '\n' +
            '      <table class="popTable table table-bordered mb-0 mt10" id="recruitReqPop">' +
            '        <colgroup>' +
            '          <col width="14%">' +
            '          <col>' +
            '          <col width="10%">' +
            '        </colgroup>' +
            '        <thead>' +
            '        <tr>' +
            '          <th colspan="3" style="font-size: 14px; font-weight:600;background-color: #00397f96; color: #fff;">인적사항</th>' +
            '        </tr>' +
            '        <tr>' +
            '          <th>' +
            '            이름' +
            '          </th>' +
            '          <td>' +
            '            <img id="imgName_ko" src="/images/ico/imgName_ko.gif" align="absmiddle" border="0"><span id="kName">'+
            data.USER_NAME+
            ' </span><img id="imgName_ko" src="/images/ico/imgName_En.gif" align="absmiddle" border="0">'+
            data.USER_NAME_EN+
            '<img id="imgName_ko" src="/images/ico/imgName_Ch.gif" align="absmiddle" border="0">'+
            data.USER_NAME_CN+
            '</td>' +
            '          <td rowspan="4">' +
            '            <img id="imgPerson" src="http://218.158.231.189' + data.photoFile.file_path + data.photoFile.file_uuid+
            '" border="0" style="height:110px;width:85px;">' +
            '          </td>' +
            '        </tr>' +
            '        <tr>' +
            '          <th>' +
            '            생년월일/성별' +
            '          </th>' +
            '          <td>'+
            data.BDAY+'('+data.AGE+'세)('+data.GENDER_TXT+')'+
            '<input type="hidden" id="bDayText" value="'+data.BDAY+'">' +
            '</td>' +
            '        </tr>' +
            '        <tr>' +
            '          <th>' +
            '            연락처' +
            '          </th>' +
            '          <td>' +
            '            <img id="imgName_ko" src="/images/ico/imgTel.gif" align="absmiddle" border="0">'+
            data.TEL_NUM+
            '<img id="imgName_ko" src="/images/ico/imgHP.gif" align="absmiddle" border="0">'+
            data.MOBILE_TEL_NUM+
            '</td>' +
            '        </tr>' +
            '        <tr>' +
            '          <th>' +
            '            현주소' +
            '          </th>' +
            '          <td>'+
            '['+data.ZIP_CODE+']'+data.ADDR+' '+data.ADDR_DETAIL+
            '</td>' +
            '        </tr>' +
            '        <tr>' +
            '          <th>' +
            '            이메일' +
            '          </th>' +
            '          <td colspan="2">'+
            data.USER_EMAIL+
            ' </td>' +
            '        </tr><tr>' +
            '          <th>' +
            '            취미/특기' +
            '          </th>' +
            '          <td colspan="2">' +
            '            <img id="imgName_ko" src="/images/ico/imgTaste.gif" align="absmiddle" border="0">'+
            data.HOBBY+
            '<img id="imgName_ko" src="/images/ico/imgSpe.gif" align="absmiddle" border="0">'+
            data.SPECIALTY+
            '</td>' +
            '        </tr>' +
            '        <tr>' +
            '          <th>' +
            '            보훈' +
            '          </th>' +
            '          <td colspan="2">';
            if(data.VETERANS === 'Y'){
                html += data.VETERANS_NUM;
            }else{
                html += '비대상';
            }
            html+='</tr>' +
                '        <tr>' +
                '          <th>' +
                '            인적성검사문서' +
                '          </th>' +
                '          <td colspan="2">' +
                '            <input type="hidden" id="fileChange" name="fileChange" value="N">' +
                '            <span id="fileName" style="position: relative; top: 5px; left: 5px"></span>' +
                /*'            <label for="file" class="k-button k-button-clear-info k-rounded mngBtn" style="float:left; vertical-align: bottom;margin:0;">파일첨부</label>' +
                '            <input type="file" id="file" name="file" style="display: none;" onchange="appView.getFileName(this)">' +
                '            <button type="button" class="k-button k-button-solid-info mngBtn" style="margin-left:10px;" onclick="appView.fileSave(this)">저장</button>' +*/
                '          </td>' +
                '        </tr>' +
                '      </table>' +
                '\n' +
                '      <table class="popTable table table-bordered mb-0 mt10 text-center">' +
                '        <colgroup>' +
                '          <col width="15%">' +
                '          <col>' +
                '          <col width="10%">' +
                '        </colgroup>' +
                '        <thead>' +
                '        <tr>' +
                '          <th colspan="9" style="font-size: 14px; font-weight:600;background-color: #00397f96; color: #fff;">학력사항</th>' +
                '        </tr>' +
                '        <tr>' +
                '          <th>구분</th>' +
                '          <th>기간</th>' +
                '          <th>학교명</th>' +
                '          <th>학과</th>' +
                '          <th>전공</th>' +
                '          <th>졸업</th>' +
                '          <th>평점</th>' +
                '          <th>학위증빙</th>' +
                '          <th>성적증빙</th>' +
                '        </tr>';
        for (let i = 0; i < data.school.length; i++) {
            const item = data.school[i];

            html += '<tr>';
            html += '<td>' + item.SCHOOL_TYPE_TXT + '</td>';
            html += '<td>' + item.ADMISSION_DT + ' ~ ' + item.GRADUATION_DT + '</td>';
            html += '<td>' + item.SCHOOL_NAME + '</td>';
            html += '<td>' + item.DEPT + '</td>';
            html += '<td>' + item.MAJOR + '</td>';
            html += '<td>' + item.GRADUATE_TYPE_TXT + '</td>';
            html += '<td>' + item.GRADE + '</td>';
            if (item.degreeFile !== null && item.degreeFile !== undefined){
                html += '<td><img src="/images/ico/file.gif" onclick="fileDown(\'' + item.degreeFile.file_path + item.degreeFile.file_uuid + '\', \'' + item.degreeFile.file_org_name + '.' + item.degreeFile.file_ext + '\', \'recruit\')"></td>';
            } else{
                html += '<td></td>';
            }
            if (item.sexualFile !== null && item.sexualFile !== undefined) {
                html += '<td><img src="/images/ico/file.gif" onclick="fileDown(\'' + item.sexualFile.file_path + item.sexualFile.file_uuid + '\', \'' + item.sexualFile.file_org_name + '.' + item.sexualFile.file_ext + '\', \'recruit\')"></td>';
            } else {
                html += '<td></td>';
            }
            html += '</tr>';
        }
            html +='</thead>' +
                '      </table>' +
                '</thead>' +
                '      </table>' +
                '<div class="mb-0 mt10" style="text-align: right"><b>※ 총 경력 : <span id="totCareer"></span></b></div>' +
                '      <table class="popTable table table-bordered text-center" style="margin-top: 0">' +
                '        <colgroup>' +
                '          <col width="15%">' +
                '          <col>' +
                '          <col width="10%">' +
                '        </colgroup>' +
                '        <thead>' +
                '        <tr>' +
                '          <th colspan="7" style="font-size: 14px; font-weight:600;background-color: #00397f96; color: #fff;">경력사항</th>' +
                '        </tr>' +
                '        <tr>' +
                '          <th>근무처</th>' +
                '          <th>근무기간</th>' +
                '          <th>직위</th>' +
                '          <th>담당업무</th>' +
                '          <th>퇴직시연봉</th>' +
                '          <th>퇴직사유</th>' +
                '          <th>증빙</th>' +
                '        </tr>';
        for (let i = 0; i < data.career.length; i++) {
            const item = data.career[i];

            html += '<tr>';
            html += '<td>' + item.CAREER_ORG_NAME + '</td>';
            html += '<td>' + item.WORK_ST_DT + ' ~ ' + item.WORK_EN_DT + '<br>('+item.DIFF_YEAR+'년 '+item.DIFF_MONTH+'개월)' +
                '<input type="hidden" class="careerDiff" value="'+item.DIFF+'">'+
                '</td>';
            html += '<td>' + item.POSITION + '</td>';
            html += '<td>' + item.CHARGE_WORK + '</td>';
            html += '<td>' + item.RETIRE_SALARY + '</td>';
            html += '<td>' + item.RETIRE_REASON + '</td>';
            html += '<td>';
            if(item.careerFile != null){
                html += '<img src="/images/ico/file.gif" onclick="fileDown(\'' + item.careerFile.file_path + item.careerFile.file_uuid + '\', \'' + item.careerFile.file_org_name + '.' + item.careerFile.file_ext + '\', \'recruit\')">';
            }
            html += '</td>';
            html += '</tr>';

            html += '<tr>';
            html += '<th>담당업무 세부사항</th>';
            html += '<td colspan="6">' + item.CAREER_CONTENT + '</td>';
            html += '</tr>';
        }
            html +='</thead>' +
                '      </table>' +
                '      <table class="popTable table table-bordered mb-0 mt10">' +
                '        <colgroup>' +
                '          <col width="15%">' +
                '          <col>' +
                '          <col width="10%">' +
                '        </colgroup>' +
                '        <thead>' +
                '        <tr>' +
                '          <th colspan="4" style="font-size: 14px; font-weight:600;background-color: #00397f96; color: #fff;">병역사항</th>' +
                '        </tr>' +
                '        <tr>' +
                '          <th>군별</th>' +
                '          <td>'+
                (data.CLSFT_CODE_TXT ? data.CLSFT_CODE_TXT : '') +
                '</td>' +
                '          <th>병역구분</th>' +
                '          <td>'+
                (data.MILITARY_SVC_TYPE_TXT ? data.MILITARY_SVC_TYPE_TXT : '') +
                '</td>' +
                '        </tr>' +
                '        <tr>' +
                '          <th>복무기간</th>' +
                '          <td>';
        if (data.M_ENLIST_DAY !== null && data.M_ENLIST_DAY !== undefined) {
            html += data.M_ENLIST_DAY + ' ~ ';
            if (data.M_DISHARGE_DAY !== null && data.M_DISHARGE_DAY !== undefined) {
                html += data.M_DISHARGE_DAY;
            }
        } else {
            html += '';
        }
            html+='</td>' +
                '          <th>계급</th>' +
                '          <td>'+
                (data.RANK ? data.RANK : '') +
                '</td>' +
                '        </tr>' +
                '        <tr>' +
                '          <th>병과</th>' +
                '          <td>'+
                (data.ETC ? data.ETC : '')+
                '</td>' +
                '          <th>증빙</th>' +
                '          <td>';
        if (data.armiFile !== null && data.armiFile !== undefined) {
            html += '<img src="/images/ico/file.gif" onclick="fileDown(\'' + data.armiFile.file_path + data.armiFile.file_uuid + '\', \'' + data.armiFile.file_org_name + '.' + data.armiFile.file_ext + '\', \'recruit\')">';
        } else {
            html += '';
        }
            html+='</td>' +
                '        </tr>' +
                '        <tr>' +
                '          <th>면제사유</th>' +
                '          <td colspan="3">' +
                (data.M_UNFUL_REASON ? data.M_UNFUL_REASON : '')+
                '</td>' +
                '        </tr>' +
                '        </thead>' +
                '      </table>' +
                '      <table class="popTable table table-bordered mb-0 mt10">' +
                '        <colgroup>' +
                '          <col width="15%">' +
                '          <col>' +
                '          <col width="10%">' +
                '        </colgroup>' +
                '        <thead>' +
                '        <tr>' +
                '          <th colspan="5" style="font-size: 14px; font-weight:600;background-color: #00397f96; color: #fff;">자격면허</th>' +
                '        </tr>' +
                '        <tr>' +
                '          <th>명칭</th>' +
                '          <th>등급</th>' +
                '          <th>검정기관</th>' +
                '          <th>활용능력</th>' +
                '          <th>증빙</th>' +
                '        </tr>';
        if (data.cert !== null && data.cert !== undefined) {
            for (let i = 0; i < data.cert.length; i++) {
                const item = data.cert[i];

                html += '<tr>';
                html += '<td>' + item.CERT_NAME + '</td>';
                html += '<td>' + item.CERT_CLASS + '</td>';
                html += '<td>' + item.CERT_ISSUER + '</td>';
                html += '<td>' + item.CERT_CONTENT + '</td>';

                if (item.certFile !== null && item.certFile !== undefined) {
                    html += '<td><img src="/images/ico/file.gif" onclick="fileDown(\'' + item.certFile.file_path + item.certFile.file_uuid + '\', \'' + item.certFile.file_org_name + '.' + item.certFile.file_ext + '\', \'recruit\')"></td>';
                } else {
                    html += '<td></td>';
                }

                html += '</tr>';
            }
        } else {

        }
            html+='</thead></table>'+
                '<table class="popTable table table-bordered mb-0 mt20" >' +
                '        <tr>' +
                '          <td>' +
                '            <b>☞ 기타 외국어 능력</b>' +
                '          </td>';
        if (data.OTHER_YN === 'Y') {
            html += '<tr><td>' + data.OTHER_LANG + '</td></tr>';
        }
            html+='</table>'+
                ' <table class="popTable table table-bordered mb-0 mt10">' +
                '        <thead>' +
                '        <tr>' +
                '          <th style="font-size: 14px; font-weight:600;background-color: #00397f96; color: #fff;">성장과정 및 장단점</th>' +
                '        </tr>';
        if (data.introduce.INTRODUCE1 !== null && data.introduce.INTRODUCE1 !== undefined) {
            html += '<tr><td>' + data.introduce.INTRODUCE1 + '</td></tr>';
        } else {
            html += '<tr><td></td></tr>';
        }
            html+='<table class="popTable table table-bordered mb-0 mt10">' +
                '        <thead>' +
                '        <tr>' +
                '          <th style="font-size: 14px; font-weight:600;background-color: #00397f96; color: #fff;">입사 후 포부 및 업무추진계획</th>' +
                '        </tr>';
        if (data.introduce.INTRODUCE2 !== null && data.introduce.INTRODUCE2 !== undefined) {
            html += '<tr><td>' + data.introduce.INTRODUCE2 + '</td></tr>';
        } else {
            html += '<tr><td></td></tr>';
        }
            html+='</thead></table>'+
                '<table class="popTable table table-bordered mb-0 mt10">' +
                '        <thead>' +
                '        <tr>' +
                '          <th style="font-size: 14px; font-weight:600;background-color: #00397f96; color: #fff;">기타사항</th>' +
                '        </tr>';
        if (data.introduce.INTRODUCE3 !== null && data.introduce.INTRODUCE3 !== undefined) {
            html += '<tr><td>' + data.introduce.INTRODUCE3 + '</td></tr>';
        } else {
            html += '<tr><td></td></tr>';
        }
            html+='</thead></table>';
        if(data.APPLICATION_STAT == 'I'){
            html +='<div style= "display: flex; justify-content: center; align-items: center; margin-top: 20px;">'+
                '<button type="button" class="k-button k-button-solid-info" style= "display: flex; justify-content: center; align-items: center;" onclick="appView.applicationReg('+data.APPLICATION_ID+')"><span>인사정보 등록</span></button>'+
                '</div>';
        }
            $("#mainGrid").append(html);

    },


    getSelectBoxSetting : function(){
        var result = customKendo.fn_customAjax("/inside/getRecruitArea.do", {recruitAreaInfoSn : $("#recruitAreaInfoSn").val()});
        if(result.flag){
            $("#recruitAreaInfoSnTxt").text(result.recruitArea.JOB)
        }
    },

    applicationReg : function (e){
        let data = {
            bDay : $("#bDayText").val(),
            kName : $("#kName").text()
        }
        var ck = customKendo.fn_customAjax("/inside/getUserInfoByApplication", data);
        if(ck.data != null){
            alert("이미 등록된 사용자 입니다."); return;
        }

        var applicationId = e;
        console.log("applicationId : ",applicationId);
        var url = "/inside/pop/applicationReg.do?recruitAreaInfoSn="+$("#recruitAreaInfoSn").val()+"&applicationId="+applicationId;
        var name = "applicationReg";
        var option = "width = 550, height = 600, top =100, left =200, location = no";
        window.open(url,name,option);
    },

    applicationMod : function(){
        var url = "/application/applicationForm1.do?applicationId="+$("#applicationId").val()+"&regEmpSeq="+$("#regEmpSeq").val();
        var name = "applicationForm1";
        var option = "width=1000, height=860, top=100, left=200, location=no";
        window.open(url, name, option);
    },

    viewMod : function(){
        /** view 모드일때 조회 이외에 버튼 전부 사라짐 */
        if($("#stat").val() == "view"){
            $(".mngBtn").hide();
        } else if($("#stat").val() == "docView"){
            $("#modBtn").hide();
        }
    },

    applicationPrintPop : function(){
        let recruitAreaInfoSn = $("#recruitAreaInfoSn").val();
        let applicationId = $("#applicationId").val();

        var url = "/Inside/pop/applicationPrintPop.do?recruitAreaInfoSn="+recruitAreaInfoSn+"&applicationId="+applicationId;
        var name = "applicationPrintPop";
        var option = "width=965, height=900, scrollbars=no, top=100, left=200, resizable=yes, scrollbars = yes, status=no, top=50, left=50";
        var popup = window.open(url, name, option);
    },

    getFileName : function(e){
        $(e).prev().prev().text(e.files[0].name);
        $("#fileChange").val("Y");
    },

    fileSave : function(){
        if($("#fileChange").val() != "Y" && $("#fileName").text() == ""){
            alert("파일 첨부 후 저장 가능합니다."); return;
        }else if($("#fileChange").val() != "Y" && $("#fileName").text() != ""){
            alert("파일 변경 후 저장 가능합니다."); return;
        }

        var formData = new FormData();
        formData.append("applicationId", $("#applicationId").val());
        formData.append("file", $("#file")[0].files[0]);
        formData.append("empSeq", $("#regEmpSeq").val());

        var result = customKendo.fn_customFormDataAjax("/application/setApplicationFile.do", formData);
        if(result.flag){
            alert("수정되었습니다.");
            location.reload();
        }
    }
}

