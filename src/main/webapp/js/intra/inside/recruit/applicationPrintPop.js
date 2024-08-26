const applicationPrintPop = {
    global: {
        hwpCtrl : "",
        params : "",
        now : "",
        fileTitle : "",
        diffSum : 0
    },

    init: function(){
        applicationPrintPop.dataSet();
    },

    openCallBack: function(){
        const params = {
            applicationId : $("#applicationId").val()
        }
        const result = customKendo.fn_customAjax("/inside/applicationViewRegrid", params);
        const data = result.data;
        if(data == null){
            alert("데이터 조회 중 오류가 발생하였습니다. 로그아웃 후 재진행 바랍니다."); return;
        }

        /** 학력사항 */
        const html1 = this.makeTable1(data.school);
        /** 경력사항 */
        const html2 = this.makeTable2(data.career);
        /** 자격/면허 */
        const html3 = this.makeTable3(data.cert);
        /** 외국어 */
        const html4 = this.makeTable4(data.lang);
        /** 기타 외국어 능력 */
        const html5 = data.OTHER_YN == 'Y' ? this.makeTable5(data.OTHER_LANG) : this.makeTable5("N");
        /** 성장과정 및 장단점 능력 */
        const html6 = this.makeTable6(data.introduce.INTRODUCE1);
        /** 입사 후 포부 및 업무추진계획 */
        const html7 = this.makeTable7(data.introduce.INTRODUCE2);
        /** 기타사항 */
        const html8 = this.makeTable8(data.introduce.INTRODUCE3);


        /** 인적사항 한글기안기에 입력 */
        applicationPrintPop.global.hwpCtrl.PutFieldText("JOB", data.JOB);
        applicationPrintPop.global.hwpCtrl.PutFieldText("USER_NAME", data.USER_NAME);
        applicationPrintPop.global.hwpCtrl.PutFieldText("USER_NAME_ALL", data.USER_NAME+"("+data.USER_NAME_EN+", "+data.USER_NAME_CN+")");
        applicationPrintPop.global.hwpCtrl.PutFieldText("BDAY", data.BDAY+"("+data.AGE+"세)");
        applicationPrintPop.global.hwpCtrl.PutFieldText("GENDER", data.GENDER_TXT);
        applicationPrintPop.global.hwpCtrl.PutFieldText("USER_EMAIL", data.USER_EMAIL);
        applicationPrintPop.global.hwpCtrl.PutFieldText("TEL_NUM", data.TEL_NUM);
        applicationPrintPop.global.hwpCtrl.PutFieldText("MOBILE_TEL_NUM", data.MOBILE_TEL_NUM);
        applicationPrintPop.global.hwpCtrl.PutFieldText("ADDR", "["+data.ZIP_CODE+"]"+data.ADDR+data.ADDR_DETAIL);
        applicationPrintPop.global.hwpCtrl.PutFieldText("HOBBY", data.HOBBY);
        applicationPrintPop.global.hwpCtrl.PutFieldText("SPECIALTY", data.SPECIALTY);
        applicationPrintPop.global.hwpCtrl.PutFieldText("VETERANS", data.VETERANS === 'Y' ? data.VETERANS_NUM : "비대상");
        applicationPrintPop.global.hwpCtrl.MoveToField("IMG", true, true, false);
        applicationPrintPop.global.hwpCtrl.InsertBackgroundPicture(
            "SelectedCell",
            "https://www.camtic.or.kr" + data.photoFile.file_path + data.photoFile.file_uuid,
            1, 6, 0, 0, 0, 0
        );

        /** 학력사항 한글기안기에 입력 */
        setTimeout(function() {
            applicationPrintPop.global.hwpCtrl.MoveToField("html1", true, true, false);
            applicationPrintPop.global.hwpCtrl.SetTextFile(html1, "html","insertfile");
        }, 200);

        /** 경력사항 한글기안기에 입력 */
        setTimeout(function() {
            applicationPrintPop.global.hwpCtrl.MoveToField("html2", true, true, false);
            applicationPrintPop.global.hwpCtrl.SetTextFile(html2, "html","insertfile");
        }, 400);

        /** 총 경력 */
        const sum = applicationPrintPop.global.diffSum;
        const sumText = Math.floor(sum/12)+"년"+(sum%12)+"개월";
        applicationPrintPop.global.hwpCtrl.PutFieldText("TOT_CAREER", sumText);

        /** 병역사항 한글기안기에 입력 */
        applicationPrintPop.global.hwpCtrl.PutFieldText("CLSFT_CODE_TXT", data.CLSFT_CODE_TXT ? data.CLSFT_CODE_TXT : '');
        applicationPrintPop.global.hwpCtrl.PutFieldText("MILITARY_SVC_TYPE_TXT", data.MILITARY_SVC_TYPE_TXT ? data.MILITARY_SVC_TYPE_TXT : '');
        let M_ENLIST_DAY_TEXT = '';
        if (data.M_ENLIST_DAY !== null && data.M_ENLIST_DAY !== undefined) {
            M_ENLIST_DAY_TEXT += data.M_ENLIST_DAY + ' ~ ';
            if (data.M_DISHARGE_DAY !== null && data.M_DISHARGE_DAY !== undefined) {
                M_ENLIST_DAY_TEXT += data.M_DISHARGE_DAY;
            }
        } else {
            M_ENLIST_DAY_TEXT += '';
        }
        applicationPrintPop.global.hwpCtrl.PutFieldText("M_ENLIST_DAY", M_ENLIST_DAY_TEXT);
        applicationPrintPop.global.hwpCtrl.PutFieldText("RANK", data.RANK ? data.RANK : '');
        applicationPrintPop.global.hwpCtrl.PutFieldText("ETC", data.ETC ? data.ETC : '');
        applicationPrintPop.global.hwpCtrl.PutFieldText("M_UNFUL_REASON", data.M_UNFUL_REASON ? data.M_UNFUL_REASON : '');

        /** 자격면허 한글기안기에 입력 */
        setTimeout(function() {
            applicationPrintPop.global.hwpCtrl.MoveToField("html3", true, true, false);
            applicationPrintPop.global.hwpCtrl.SetTextFile(html3, "html","insertfile");
        }, 600);

        /** 외국어 한글기안기에 입력 */
        setTimeout(function() {
            applicationPrintPop.global.hwpCtrl.MoveToField("html4", true, true, false);
            applicationPrintPop.global.hwpCtrl.SetTextFile(html4, "html","insertfile");
        }, 800);

        /** 기타외국어능력 한글기안기에 입력 */
        setTimeout(function() {
            applicationPrintPop.global.hwpCtrl.MoveToField("html5", true, true, false);
            applicationPrintPop.global.hwpCtrl.SetTextFile(html5, "html","insertfile");
            // applicationPrintPop.global.hwpCtrl.SetTextFile(data.OTHER_YN == 'Y' ? data.OTHER_LANG.replaceAll("\n", "<br>") : "", "html","insertfile");
        }, 1000);

        /** 성장과정및장단점 한글기안기에 입력 */
        setTimeout(function() {
            applicationPrintPop.global.hwpCtrl.MoveToField("html6", true, true, false);
            applicationPrintPop.global.hwpCtrl.SetTextFile(html6, "html","insertfile");
            // applicationPrintPop.global.hwpCtrl.SetTextFile(data.introduce.INTRODUCE1.replaceAll("\n", "<br>"), "html","insertfile");
        }, 1200);

        /** 입사후포부및업무추진계획 한글기안기에 입력 */
        setTimeout(function() {
            applicationPrintPop.global.hwpCtrl.MoveToField("html7", true, true, false);
            applicationPrintPop.global.hwpCtrl.SetTextFile(html7, "html","insertfile");
            // applicationPrintPop.global.hwpCtrl.SetTextFile(data.introduce.INTRODUCE2.replaceAll("\n", "<br>"), "html","insertfile");
        }, 1400);

        /** 기타사항 한글기안기에 입력 */
        setTimeout(function() {
            applicationPrintPop.global.hwpCtrl.MoveToField("html8", true, true, false);
            applicationPrintPop.global.hwpCtrl.SetTextFile(html8, "html","insertfile");
            // applicationPrintPop.global.hwpCtrl.SetTextFile(data.introduce.INTRODUCE3.replaceAll("\n", "<br>"), "html","insertfile");
        }, 1600);
    },

    makeTable1 : function(list){
        console.log("schoolList");
        console.log(list);
        let html = "";
        html += '<table style="font-family:굴림체; margin: 0 auto; max-width: none; border-collapse: separate; border-spacing: 0; empty-cells: show; border-width: 0; outline: 0; text-align: left; font-size:13px; line-height: 120%; width: 100%; ">';
        html += '   <tr>';
        html += '       <td style="border-width: 0 0 0 0; font-weight: normal; box-sizing: border-box;">';
        html += '           <table border="5.5" style="border-collapse: collapse; margin: 0px;">';
        html += '               <tr>';
        html += '                   <td style="height:40px;background-color:#BFBFFF; text-align:center; width: 70px;"><p style="font-size:13px;font-family:굴림체;line-height: 120%;"><b>구 분</b></p></td>';
        html += '                   <td style="height:40px;background-color:#BFBFFF; text-align:center; width: 82px;"><p style="font-size:13px;font-family:굴림체;line-height: 120%;"><b>기 간</b></p></td>';
        html += '                   <td style="height:40px;background-color:#BFBFFF; text-align:center; width: 142px;"><p style="font-size:13px;font-family:굴림체;line-height: 120%;"><b>학교명</b></p></td>';
        html += '                   <td style="height:40px;background-color:#BFBFFF; text-align:center; width: 142px;"><p style="font-size:13px;font-family:굴림체;line-height: 120%;"><b>학 과</b></p></td>';
        html += '                   <td style="height:40px;background-color:#BFBFFF; text-align:center; width: 104px;"><p style="font-size:13px;font-family:굴림체;line-height: 120%;"><b>전 공</b></p></td>';
        html += '                   <td style="height:40px;background-color:#BFBFFF; text-align:center; width: 80px;"><p style="font-size:13px;font-family:굴림체;line-height: 120%;"><b>졸 업</b></p></td>';
        html += '                   <td style="height:40px;background-color:#BFBFFF; text-align:center; width: 80px;"><p style="font-size:13px;font-family:굴림체;line-height: 120%;"><b>평 점</b></p></td>';
        html += '               </tr>';
        for(let i=0;  i < list.length; i++){
            const item = list[i];
            html += '               <tr>';
            html += '                   <td style="height:40px;background-color:#FFFFFF; text-align:center;"><p style="font-size:13px;font-family:굴림체;line-height: 120%;">'+ item.SCHOOL_TYPE_TXT +'</p></td>';
            html += '                   <td style="height:40px;background-color:#FFFFFF; text-align:center;"><p style="font-size:13px;font-family:굴림체;line-height: 120%;">'+ item.ADMISSION_DT + '\n ~ ' + item.GRADUATION_DT +'</p></td>';
            html += '                   <td style="height:40px;background-color:#FFFFFF; text-align:center;"><p style="font-size:13px;font-family:굴림체;line-height: 120%;">'+ item.SCHOOL_NAME +'</p></td>';
            html += '                   <td style="height:40px;background-color:#FFFFFF; text-align:center;"><p style="font-size:13px;font-family:굴림체;line-height: 120%;">'+ item.DEPT +'</p></td>';
            html += '                   <td style="height:40px;background-color:#FFFFFF; text-align:center;"><p style="font-size:13px;font-family:굴림체;line-height: 120%;">'+ item.MAJOR +'</p></td>';
            html += '                   <td style="height:40px;background-color:#FFFFFF; text-align:center;"><p style="font-size:13px;font-family:굴림체;line-height: 120%;">'+ item.GRADUATE_TYPE_TXT +'</p></td>';
            html += '                   <td style="height:40px;background-color:#FFFFFF; text-align:center;"><p style="font-size:13px;font-family:굴림체;line-height: 120%;">'+ (item.GRADE == "undefined" ? "" : (item.GRADE || "")) +'</p></td>';
            html += '               </tr>';
        }
        html += '           </table>';
        html += '       </td>';
        html += '   </tr>';
        html += '</table>';

        return html.replaceAll("\n", "<br>");
    },

    makeTable2 : function(list){
        console.log("careerList");
        console.log(list);
        let html = "";
        html += '<table style="font-family:굴림체; margin: 0 auto; max-width: none; border-collapse: separate; border-spacing: 0; empty-cells: show; border-width: 0; outline: 0; text-align: left; font-size:13px; line-height: 120%; width: 100%; ">';
        html += '   <tr>';
        html += '       <td style="border-width: 0 0 0 0; font-weight: normal; box-sizing: border-box;">';
        html += '           <table border="5.5" style="border-collapse: collapse; margin: 0px;">';
        html += '               <tr>';
        html += '                   <td style="height:40px;background-color:#BFBFFF; text-align:center; width: 156px;"><p style="font-size:13px;font-family:굴림체;line-height: 120%;"><b>근무처</b></p></td>';
        html += '                   <td style="height:40px;background-color:#BFBFFF; text-align:center; width: 108px;"><p style="font-size:13px;font-family:굴림체;line-height: 120%;"><b>근무기간</b></p></td>';
        html += '                   <td style="height:40px;background-color:#BFBFFF; text-align:center; width: 110px;"><p style="font-size:13px;font-family:굴림체;line-height: 120%;"><b>직 위</b></p></td>';
        html += '                   <td style="height:40px;background-color:#BFBFFF; text-align:center; width: 110px;"><p style="font-size:13px;font-family:굴림체;line-height: 120%;"><b>담당업무</b></p></td>';
        html += '                   <td style="height:40px;background-color:#BFBFFF; text-align:center; width: 108px;"><p style="font-size:13px;font-family:굴림체;line-height: 120%;"><b>퇴직시연봉</b></p></td>';
        html += '                   <td style="height:40px;background-color:#BFBFFF; text-align:center; width: 108px;"><p style="font-size:13px;font-family:굴림체;line-height: 120%;"><b>퇴직사유</b></p></td>';
        html += '               </tr>';

        if(list.length > 0){
            for(let i=0;  i < list.length; i++){
                const item = list[i];
                html += '               <tr>';
                html += '                   <td style="height:60px;background-color:#FFFFFF; text-align:center;"><p style="font-size:13px;font-family:굴림체;line-height: 120%;">'+ item.CAREER_ORG_NAME +'</p></td>';
                html += '                   <td style="height:60px;background-color:#FFFFFF; text-align:center;"><p style="font-size:13px;font-family:굴림체;line-height: 120%;">'+ item.WORK_ST_DT + '\n ~ ' + item.WORK_EN_DT + '\n('+item.DIFF_YEAR+'년 '+item.DIFF_MONTH+'개월)' +'</p></td>';
                html += '                   <td style="height:60px;background-color:#FFFFFF; text-align:center;"><p style="font-size:13px;font-family:굴림체;line-height: 120%;">'+ item.POSITION +'</p></td>';
                html += '                   <td style="height:60px;background-color:#FFFFFF; text-align:center;"><p style="font-size:13px;font-family:굴림체;line-height: 120%;">'+ item.CHARGE_WORK +'</p></td>';
                html += '                   <td style="height:60px;background-color:#FFFFFF; text-align:center;"><p style="font-size:13px;font-family:굴림체;line-height: 120%;">'+ item.RETIRE_SALARY +'</p></td>';
                html += '                   <td style="height:60px;background-color:#FFFFFF; text-align:center;"><p style="font-size:13px;font-family:굴림체;line-height: 120%;">'+ item.RETIRE_REASON +'</p></td>';
                html += '               </tr>';
                html += '               <tr>';
                html += '                   <td style="height:40px;background-color:#BFBFFF; text-align:center;"><p style="font-size:13px;font-family:굴림체;line-height: 120%;"><b>담당업무 세부사항</b></p></td>';
                html += '                   <td colspan="5" style="height:40px;background-color:#FFFFFF; text-align:center;"><p style="font-size:13px;font-family:굴림체;line-height: 120%;text-align: justify;">'+ item.CAREER_CONTENT +'</p></td>';
                html += '               </tr>';

                /** 총 경력 */
                applicationPrintPop.global.diffSum += Number(item.DIFF);
            }
        } else {
            html += '               <tr>';
            html += '                   <td style="height:40px;background-color:#FFFFFF; text-align:center;"><p style="font-size:13px;font-family:굴림체;line-height: 120%;"></p></td>';
            html += '                   <td style="height:40px;background-color:#FFFFFF; text-align:center;"><p style="font-size:13px;font-family:굴림체;line-height: 120%;"></p></td>';
            html += '                   <td style="height:40px;background-color:#FFFFFF; text-align:center;"><p style="font-size:13px;font-family:굴림체;line-height: 120%;"></p></td>';
            html += '                   <td style="height:40px;background-color:#FFFFFF; text-align:center;"><p style="font-size:13px;font-family:굴림체;line-height: 120%;"></p></td>';
            html += '                   <td style="height:40px;background-color:#FFFFFF; text-align:center;"><p style="font-size:13px;font-family:굴림체;line-height: 120%;"></p></td>';
            html += '                   <td style="height:40px;background-color:#FFFFFF; text-align:center;"><p style="font-size:13px;font-family:굴림체;line-height: 120%;"></p></td>';
            html += '               </tr>';
            html += '               <tr>';
            html += '                   <td style="height:40px;background-color:#BFBFFF; text-align:center;"><p style="font-size:13px;font-family:굴림체;line-height: 120%;"><b>담당업무 세부사항</b></p></td>';
            html += '                   <td colspan="5" style="height:40px;background-color:#FFFFFF; text-align:center;"><p style="font-size:13px;font-family:굴림체;line-height: 120%;"></p></td>';
            html += '               </tr>';

            /** 총 경력 */
            applicationPrintPop.global.diffSum += Number(0);
        }
        html += '           </table>';
        html += '       </td>';
        html += '   </tr>';
        html += '</table>';

        return html.replaceAll("\n", "<br>");
    },

    makeTable3 : function(list){
        console.log("certList");
        console.log(list);
        let html = "";
        html += '<table style="font-family:굴림체; margin: 0 auto; max-width: none; border-collapse: separate; border-spacing: 0; empty-cells: show; border-width: 0; outline: 0; text-align: left; font-size:13px; line-height: 120%; width: 100%; ">';
        html += '   <tr>';
        html += '       <td style="border-width: 0 0 0 0; font-weight: normal; box-sizing: border-box;">';
        html += '           <table border="5.5" style="border-collapse: collapse; margin: 0px;">';
        html += '               <tr>';
        html += '                   <td style="height:40px;background-color:#BFBFFF; text-align:center; width: 154px;"><p style="font-size:13px;font-family:굴림체;line-height: 120%;"><b>명 칭</b></p></td>';
        html += '                   <td style="height:40px;background-color:#BFBFFF; text-align:center; width: 62px;"><p style="font-size:13px;font-family:굴림체;line-height: 120%;"><b>등 급</b></p></td>';
        html += '                   <td style="height:40px;background-color:#BFBFFF; text-align:center; width: 172px;"><p style="font-size:13px;font-family:굴림체;line-height: 120%;"><b>검정기관</b></p></td>';
        html += '                   <td style="height:40px;background-color:#BFBFFF; text-align:center; width: 312px;"><p style="font-size:13px;font-family:굴림체;line-height: 120%;"><b>활용능력</b></p></td>';
        html += '               </tr>';
        if(list.length > 0){
            for(let i=0;  i < list.length; i++){
                const item = list[i];
                html += '               <tr>';
                html += '                   <td style="height:40px;background-color:#FFFFFF; text-align:center;"><p style="font-size:13px;font-family:굴림체;line-height: 120%;">'+ item.CERT_NAME +'</p></td>';
                html += '                   <td style="height:40px;background-color:#FFFFFF; text-align:center;"><p style="font-size:13px;font-family:굴림체;line-height: 120%;">'+ item.CERT_CLASS +'</p></td>';
                html += '                   <td style="height:40px;background-color:#FFFFFF; text-align:center;"><p style="font-size:13px;font-family:굴림체;line-height: 120%;">'+ item.CERT_ISSUER +'</p></td>';
                html += '                   <td style="height:40px;background-color:#FFFFFF; text-align:center;"><p style="font-size:13px;font-family:굴림체;line-height: 120%;">'+ item.CERT_CONTENT +'</p></td>';
                html += '               </tr>';
            }
        } else {
            html += '               <tr>';
            html += '                   <td style="height:40px;background-color:#FFFFFF; text-align:center;"><p style="font-size:13px;font-family:굴림체;line-height: 120%;"></p></td>';
            html += '                   <td style="height:40px;background-color:#FFFFFF; text-align:center;"><p style="font-size:13px;font-family:굴림체;line-height: 120%;"></p></td>';
            html += '                   <td style="height:40px;background-color:#FFFFFF; text-align:center;"><p style="font-size:13px;font-family:굴림체;line-height: 120%;"></p></td>';
            html += '                   <td style="height:40px;background-color:#FFFFFF; text-align:center;"><p style="font-size:13px;font-family:굴림체;line-height: 120%;"></p></td>';
            html += '               </tr>';
        }
        html += '           </table>';
        html += '       </td>';
        html += '   </tr>';
        html += '</table>';

        return html.replaceAll("\n", "<br>");
    },

    makeTable4 : function(list){
        console.log("langList");
        console.log(list);
        let html = "";
        html += '<table style="font-family:굴림체; margin: 0 auto; max-width: none; border-collapse: separate; border-spacing: 0; empty-cells: show; border-width: 0; outline: 0; text-align: left; font-size:13px; line-height: 120%; width: 100%; ">';
        html += '   <tr>';
        html += '       <td style="border-width: 0 0 0 0; font-weight: normal; box-sizing: border-box;">';
        html += '           <table border="5.5" style="border-collapse: collapse; margin: 0px;">';
        html += '               <tr>';
        html += '                   <td style="height:40px;background-color:#BFBFFF; text-align:center; width: 154px;"><p style="font-size:13px;font-family:굴림체;line-height: 120%;"><b>명 칭</b></p></td>';
        html += '                   <td style="height:40px;background-color:#BFBFFF; text-align:center; width: 62px;"><p style="font-size:13px;font-family:굴림체;line-height: 120%;"><b>등 급</b></p></td>';
        html += '                   <td style="height:40px;background-color:#BFBFFF; text-align:center; width: 172px;"><p style="font-size:13px;font-family:굴림체;line-height: 120%;"><b>검정기관</b></p></td>';
        html += '                   <td style="height:40px;background-color:#BFBFFF; text-align:center; width: 312px;"><p style="font-size:13px;font-family:굴림체;line-height: 120%;"><b>활용능력</b></p></td>';
        html += '               </tr>';
        if(list.length > 0){
            for(let i=0;  i < list.length; i++){
                const item = list[i];
                html += '               <tr>';
                html += '                   <td style="height:40px;background-color:#FFFFFF; text-align:center;"><p style="font-size:13px;font-family:굴림체;line-height: 120%;">'+ item.LANG_NAME +'</p></td>';
                html += '                   <td style="height:40px;background-color:#FFFFFF; text-align:center;"><p style="font-size:13px;font-family:굴림체;line-height: 120%;">'+ item.ACQUISITION_DATE +'</p></td>';
                html += '                   <td style="height:40px;background-color:#FFFFFF; text-align:center;"><p style="font-size:13px;font-family:굴림체;line-height: 120%;">'+ item.ACQUISITION_SCORE +'</p></td>';
                html += '                   <td style="height:40px;background-color:#FFFFFF; text-align:center;"><p style="font-size:13px;font-family:굴림체;line-height: 120%;">'+ item.LANG_CONTENT +'</p></td>';
                html += '               </tr>';
            }
        } else {
            html += '               <tr>';
            html += '                   <td style="height:40px;background-color:#FFFFFF; text-align:center;"><p style="font-size:13px;font-family:굴림체;line-height: 120%;"></p></td>';
            html += '                   <td style="height:40px;background-color:#FFFFFF; text-align:center;"><p style="font-size:13px;font-family:굴림체;line-height: 120%;"></p></td>';
            html += '                   <td style="height:40px;background-color:#FFFFFF; text-align:center;"><p style="font-size:13px;font-family:굴림체;line-height: 120%;"></p></td>';
            html += '                   <td style="height:40px;background-color:#FFFFFF; text-align:center;"><p style="font-size:13px;font-family:굴림체;line-height: 120%;"></p></td>';
            html += '               </tr>';
        }
        html += '           </table>';
        html += '       </td>';
        html += '   </tr>';
        html += '</table>';

        return html.replaceAll("\n", "<br>");
    },

    makeTable5 : function(data){
        let html = "";
        if(data == "N"){
            html += '<p style="font-size:13px;font-family:굴림체;line-height: 120%;"></p>';
        } else {
            html += '<p style="font-size:13px;font-family:굴림체;line-height: 120%;">' + data + '</p>'
        }

        return html.replaceAll("\n", "<br>");
    },

    makeTable6 : function(data){
        let html = "";
        html += '<p style="font-size:13px;font-family:굴림체;line-height: 120%;">' + data + '</p>';

        return html.replaceAll("\n", "<br>");
    },

    makeTable7 : function(data){
        let html = "";
        html += '<p style="font-size:13px;font-family:굴림체;line-height: 120%;">' + data + '</p>';

        return html.replaceAll("\n", "<br>");
    },

    makeTable8 : function(data){
        let html = "";
        html += '<p style="font-size:13px;font-family:굴림체;line-height: 120%;">' + data + '</p>';

        return html.replaceAll("\n", "<br>");
    },

    dataSet: function(){
        applicationPrintPop.loading();
        applicationPrintPop.global.params = params;
        applicationPrintPop.global.hwpCtrl = BuildWebHwpCtrl("hwpApproveContent",applicationPrintPop.global.params.hwpUrl, function () {applicationPrintPop.editorComplete();});
    },

    loading: function(){
        $.LoadingOverlay("show", {
            background       : "rgba(0, 0, 0, 0.5)",
            image            : "",
            maxSize          : 60,
            fontawesome      : "fa fa-spinner fa-pulse fa-fw",
            fontawesomeColor : "#FFFFFF",
        });
    },

    editorComplete: function(){
        let filePath = "http://218.158.231.184/upload/templateForm/recruitAcceptTmp.hwp";
        applicationPrintPop.global.hwpCtrl.Open(filePath, "HWP", "", function(){
            applicationPrintPop.openCallBack();
            applicationPrintPop.global.hwpCtrl.EditMode = 0;
            applicationPrintPop.global.hwpCtrl.SetToolBar(1, "TOOLBAR_MENU");
            applicationPrintPop.global.hwpCtrl.SetToolBar(1, "TOOLBAR_STANDARD");
            applicationPrintPop.global.hwpCtrl.ShowRibbon(false);
            applicationPrintPop.global.hwpCtrl.ShowCaret(false);
            applicationPrintPop.global.hwpCtrl.ShowStatusBar(false);
            applicationPrintPop.global.hwpCtrl.SetFieldViewOption(1);
        }, {"userData" : "success"});

        applicationPrintPop.resize();
        $.LoadingOverlay("hide", {});
    },

    saveHwp : function (){
        applicationPrintPop.global.hwpCtrl.SaveAs(applicationPrintPop.global.fileTitle, "hwp", "download:true");
    },

    resize: function() {
        if (document.getElementById("hwpctrl_frame") != null && typeof(document.getElementById("hwpctrl_frame")) != "undefined") {
            var pHeight = (window.innerHeight - 20) + "px";
            document.getElementById("hwpctrl_frame").style.width = "100%";
            document.getElementById("hwpctrl_frame").style.height = pHeight;
        }
    },

    print: function() {
        applicationPrintPop.global.hwpCtrl.PrintDocument();
    }
}