var userPrintHtml = {
    html1 : function(userMap2){
        var html = '';

        html += '<table style="font-family:굴림;margin: 0 auto; max-width: none; border-collapse: separate; border-spacing: 0; empty-cells: show; border-width: 0; outline: 0; text-align: left; font-size:12px; line-height: 20px; width: 100%; ">';
        html += '   <tr>';
        html += '       <td style="border-width: 0 0 0 0; font-weight: normal; box-sizing: border-box;">';
        html += '           <table border="3" style="border-collapse: collapse; margin: 0px;">';
        html += '               <tr>';
        html += '                   <td colspan="5" style="height:30px;background-color:#FFFFFF; text-align:left; width: 60px; border-top: none; border-right: none; border-left: none"><p style="font-size:17px;"><b>▣학력사항</b></p></td>';
        html += '               </tr>';
        html += '               <tr>';
        html += '                   <td style="height:30px;background-color:#FFE0E0; text-align:center; width: 60px;"><p style="font-size:12px;"><b>번호</b></p></td>';
        html += '                   <td style="height:30px;background-color:#FFE0E0; text-align:center; width: 148px;"><p style="font-size:12px;"><b>기 간</b></p></td>';
        html += '                   <td style="height:30px;background-color:#FFE0E0; text-align:center; width: 300px;"><p style="font-size:12px;"><b>학교 및 학과</b></p></td>';
        html += '                   <td style="height:30px;background-color:#FFE0E0; text-align:center; width: 100px;"><p style="font-size:12px;"><b>구분</b></p></td>';
        html += '                   <td style="height:30px;background-color:#FFE0E0; text-align:center; width: 100px;"><p style="font-size:12px;"><b>비고</b></p></td>';
        html += '               </tr>';

        for(var i=0;  i < userMap2.length; i++){
            var education = userMap2[i];
            var gubunCodeNm = education.GUBUN_CODE_NM == null ? " " : education.GUBUN_CODE_NM;
            var graduationCodeNm = education.GRADUATION_CODE_NM == null ? " " : education.GRADUATION_CODE_NM;

            html += '               <tr>';
            html += '                   <td style="height:40px;background-color:#FFFFFF; text-align:center;"><p style="font-size:12px;">'+ (i + 1) +'</p></td>';
            html += '                   <td style="height:40px;background-color:#FFFFFF; text-align:center;"><p style="font-size:12px;">'+ education.ADMISSION_DAY + '~' + education.GRADUATION_DAY +'</p></td>';
            html += '                   <td style="height:40px;background-color:#FFFFFF; text-align:center;"><p style="font-size:12px;">'+ education.SCHOOL_NAME +'</p></td>';
            html += '                   <td style="height:40px;background-color:#FFFFFF; text-align:center;"><p style="font-size:12px;">'+ graduationCodeNm +'</p></td>';
            html += '                   <td style="height:40px;background-color:#FFFFFF; text-align:center;"><p style="font-size:12px;">'+ gubunCodeNm +'</p></td>';
            html += '               </tr>';
        }
        html += '           </table>';
        html += '       </td>';
        html += '   </tr>';
        html += '</table>';

        return html;
    },

    html2 : function(userMap3){
        var html = '';

        html += '<table style="font-family:굴림;margin: 0 auto; max-width: none; border-collapse: separate; border-spacing: 0; empty-cells: show; border-width: 0; outline: 0; text-align: left; font-size:12px; line-height: 20px; width: 100%; ">';
        html += '   <tr>';
        html += '       <td style="border-width: 0 0 0 0; font-weight: normal; box-sizing: border-box;">';
        html += '           <table border="3" style="border-collapse: collapse; margin: 0px;">';
        html += '               <tr>';
        html += '                   <td colspan="7" style="height:30px;background-color:#FFFFFF; text-align:left; width: 60px; border-top: none; border-right: none; border-left: none"><p style="font-size:17px;"><b>▣경력사항</b></p></td>';
        html += '               </tr>';
        html += '               <tr>';
        html += '                   <td style="height:30px;background-color:#FFE0E0; text-align:center; width: 40px;"><p style="font-size:12px;"><b>번호</b></p></td>';
        html += '                   <td style="height:30px;background-color:#FFE0E0; text-align:center; width: 148px;"><p style="font-size:12px;"><b>기간</b></p></td>';
        html += '                   <td style="height:30px;background-color:#FFE0E0; text-align:center; width: 200px;"><p style="font-size:12px;"><b>근무처</b></p></td>';
        html += '                   <td style="height:30px;background-color:#FFE0E0; text-align:center; width: 80px;"><p style="font-size:12px;"><b>직위</b></p></td>';
        html += '                   <td style="height:30px;background-color:#FFE0E0; text-align:center; width: 80px;"><p style="font-size:12px;"><b>담당업무</b></p></td>';
        html += '                   <td style="height:30px;background-color:#FFE0E0; text-align:center; width: 80px;"><p style="font-size:12px;"><b>근무년수</b></p></td>';
        html += '                   <td style="height:30px;background-color:#FFE0E0; text-align:center; width: 80px;"><p style="font-size:12px;"><b>비고</b></p></td>';
        html += '               </tr>';

        for(var i=0;  i < userMap3.length; i++){
            var Career = userMap3[i];
            console.log(Career);
            var mainTask = Career.MAIN_TASK == null ? " " : Career.MAIN_TASK;
            var rmk = Career.RMK == null ? " " : Career.RMK;
            html += '               <tr>';
            html += '                   <td style="height:40px;background-color:#FFFFFF; text-align:center;"><p style="font-size:12px;">'+ (i + 1) +'</p></td>';
            html += '                   <td style="height:40px;background-color:#FFFFFF; text-align:center;"><p style="font-size:12px;">'+ Career.JOIN_DAY + '~' + Career.RESIGN_DAY +'</p></td>';
            html += '                   <td style="height:40px;background-color:#FFFFFF; text-align:center;"><p style="font-size:12px;">'+ Career.EMPLOY_DEPT_NAME +'</p></td>';
            html += '                   <td style="height:40px;background-color:#FFFFFF; text-align:center;"><p style="font-size:12px;">'+ Career.POSITION_OR_DUTY +'</p></td>';
            html += '                   <td style="height:40px;background-color:#FFFFFF; text-align:center;"><p style="font-size:12px;">'+ mainTask +'</p></td>';
            html += '                   <td style="height:40px;background-color:#FFFFFF; text-align:center;"><p style="font-size:12px;">'+ Career.CAREER_PERIOD + '년 ' + Career.CAREER_MONTH + '개월' +'</p></td>';
            html += '                   <td style="height:40px;background-color:#FFFFFF; text-align:center;"><p style="font-size:12px;">'+ rmk +'</p></td>';
            html += '               </tr>';
        }
        html += '           </table>';
        html += '       </td>';
        html += '   </tr>';
        html += '</table>';

        return html;
    },

    html3 : function(userMap4){
        var html = '';

        if(userMap4 == null){
            userMap4 = {};
            userMap4.MILITARY_SVC_TYPE_NM=" ";
            userMap4.M_UNFUL_REASON=" ";
            userMap4.M_ENLIST_DAY=" ";
            userMap4.M_DISCHARGE_DAY=" ";
            userMap4.M_LAST_RANK=" ";
            userMap4.M_DIVISION=" ";
            userMap4.MOS=" ";
        }
        html += '<table style="font-family:굴림;margin: 0 auto; max-width: none; border-collapse: separate; border-spacing: 0; empty-cells: show; border-width: 0; outline: 0; text-align: left; font-size:12px; line-height: 20px; width: 100%; ">';
        html += '   <tr>';
        html += '       <td style="border-width: 0 0 0 0; font-weight: normal; box-sizing: border-box;">';
        html += '           <table border="3" style="border-collapse: collapse; margin: 0px;">';
        html += '               <tr>';
        html += '                   <td colspan="4" style="height:30px;background-color:#FFFFFF; text-align:left; width: 60px; border-top: none; border-right: none; border-left: none"><p style="font-size:17px;"><b>▣병역사항</b></p></td>';
        html += '               </tr>';
        html += '               <tr>';
        html += '                   <td style="height:30px;background-color:#FFE0E0; text-align:center; width: 100px;"><p style="font-size:12px;"><b>종 류</b></p></td>';
        html += '                   <td style="height:40px;background-color:#FFFFFF; text-align:center; width: 254px;"><p style="font-size:12px;">'+ userMap4.MILITARY_SVC_TYPE_NM +'</p></td>';
        html += '                   <td style="height:30px;background-color:#FFE0E0; text-align:center; width: 100px;"><p style="font-size:12px;"><b>사 유</b></p></td>';
        html += '                   <td style="height:40px;background-color:#FFFFFF; text-align:center; width: 254px;"><p style="font-size:12px;">'+ userMap4.M_UNFUL_REASON +'</p></td>';
        html += '               </tr>';

        html += '               <tr>';
        html += '                   <td style="height:30px;background-color:#FFE0E0; text-align:center;"><p style="font-size:12px;"><b>복무기간</b></p></td>';
        html += '                   <td style="height:40px;background-color:#FFFFFF; text-align:center;"><p style="font-size:12px;">'+ userMap4.M_ENLIST_DAY + '~' + userMap4.M_DISCHARGE_DAY +'</p></td>';
        html += '                   <td style="height:30px;background-color:#FFE0E0; text-align:center;"><p style="font-size:12px;"><b>최종계급</b></p></td>';
        html += '                   <td style="height:40px;background-color:#FFFFFF; text-align:center;"><p style="font-size:12px;">'+ userMap4.M_LAST_RANK +'</p></td>';
        html += '               </tr>';

        html += '               <tr>';
        html += '                   <td style="height:30px;background-color:#FFE0E0; text-align:center;"><p style="font-size:12px;"><b>군 별</b></p></td>';
        html += '                   <td style="height:40px;background-color:#FFFFFF; text-align:center;"><p style="font-size:12px;">'+ userMap4.M_DIVISION +'</p></td>';
        html += '                   <td style="height:30px;background-color:#FFE0E0; text-align:center;"><p style="font-size:12px;"><b>병 과</b></p></td>';
        html += '                   <td style="height:40px;background-color:#FFFFFF; text-align:center;"><p style="font-size:12px;">'+ userMap4.MOS +'</p></td>';
        html += '               </tr>';

        html += '           </table>';
        html += '       </td>';
        html += '   </tr>';
        html += '</table>';

        return html;
    },

    html4 : function(userMap5){
        var html = '';

        html += '<table style="font-family:굴림;margin: 0 auto; max-width: none; border-collapse: separate; border-spacing: 0; empty-cells: show; border-width: 0; outline: 0; text-align: left; font-size:12px; line-height: 20px; width: 100%; ">';
        html += '   <tr>';
        html += '       <td style="border-width: 0 0 0 0; font-weight: normal; box-sizing: border-box;">';
        html += '           <table border="3" style="border-collapse: collapse; margin: 0px;">';
        html += '               <tr>';
        html += '                   <td colspan="6" style="height:30px;background-color:#FFFFFF; text-align:left; width: 60px; border-top: none; border-right: none; border-left: none"><p style="font-size:17px;"><b>▣가족사항</b></p></td>';
        html += '               </tr>';
        html += '               <tr>';
        html += '                   <td style="height:30px;background-color:#FFE0E0; text-align:center; width: 60px;"><p style="font-size:12px;"><b>번호</b></p></td>';
        html += '                   <td style="height:30px;background-color:#FFE0E0; text-align:center; width: 100px;"><p style="font-size:12px;"><b>관계</b></p></td>';
        html += '                   <td style="height:30px;background-color:#FFE0E0; text-align:center; width: 120px;"><p style="font-size:12px;"><b>성명</b></p></td>';
        html += '                   <td style="height:30px;background-color:#FFE0E0; text-align:center; width: 158px;"><p style="font-size:12px;"><b>생년월일</b></p></td>';
        html += '                   <td style="height:30px;background-color:#FFE0E0; text-align:center; width: 150px;"><p style="font-size:12px;"><b>직업</b></p></td>';
        html += '                   <td style="height:30px;background-color:#FFE0E0; text-align:center; width: 120px;"><p style="font-size:12px;"><b>동거여부</b></p></td>';
        html += '               </tr>';

        for(var i=0;  i < userMap5.length; i++){
            var Family = userMap5[i];
            var familyCodeTypeNm = Family.FAMILY_CODE_TYPE_NM == null ? " " : Family.FAMILY_CODE_TYPE_NM;
            html += '               <tr>';
            html += '                   <td style="height:40px;background-color:#FFFFFF; text-align:center;"><p style="font-size:12px;">'+ (i + 1) +'</p></td>';
            html += '                   <td style="height:40px;background-color:#FFFFFF; text-align:center;"><p style="font-size:12px;">'+ familyCodeTypeNm +'</p></td>';
            html += '                   <td style="height:40px;background-color:#FFFFFF; text-align:center;"><p style="font-size:12px;">'+ Family.FAMILY_NAME +'</p></td>';
            html += '                   <td style="height:40px;background-color:#FFFFFF; text-align:center;"><p style="font-size:12px;">'+ Family.FAMILY_BIRTH +'</p></td>';
            html += '                   <td style="height:40px;background-color:#FFFFFF; text-align:center;"><p style="font-size:12px;">'+ Family.FAMILY_JOB +'</p></td>';
            html += '                   <td style="height:40px;background-color:#FFFFFF; text-align:center;"><p style="font-size:12px;">'+ Family.INCLUDE_TXT +'</p></td>';
            html += '               </tr>';
        }
        html += '           </table>';
        html += '       </td>';
        html += '   </tr>';
        html += '</table>';

        return html;
    },

    html5 : function(userMap6){
        var html = '';

        html += '<table style="font-family:굴림;margin: 0 auto; max-width: none; border-collapse: separate; border-spacing: 0; empty-cells: show; border-width: 0; outline: 0; text-align: left; font-size:12px; line-height: 20px; width: 100%; ">';
        html += '   <tr>';
        html += '       <td style="border-width: 0 0 0 0; font-weight: normal; box-sizing: border-box;">';
        html += '           <table border="3" style="border-collapse: collapse; margin: 0px;">';
        html += '               <tr>';
        html += '                   <td colspan="6" style="height:30px;background-color:#FFFFFF; text-align:left; width: 60px; border-top: none; border-right: none; border-left: none"><p style="font-size:17px;"><b>▣자격증 및 면허, 어학능력</b></p></td>';
        html += '               </tr>';
        html += '               <tr>';
        html += '                   <td style="height:30px;background-color:#FFE0E0; text-align:center; width: 40px;"><p style="font-size:12px;"><b>번호</b></p></td>';
        html += '                   <td style="height:30px;background-color:#FFE0E0; text-align:center; width: 158px;"><p style="font-size:12px;"><b>종류</b></p></td>';
        html += '                   <td style="height:30px;background-color:#FFE0E0; text-align:center; width: 120px;"><p style="font-size:12px;"><b>취득일</b></p></td>';
        html += '                   <td style="height:30px;background-color:#FFE0E0; text-align:center; width: 135px;"><p style="font-size:12px;"><b>자격번호</b></p></td>';
        html += '                   <td style="height:30px;background-color:#FFE0E0; text-align:center; width: 135px;"><p style="font-size:12px;"><b>발급기관</b></p></td>';
        html += '                   <td style="height:30px;background-color:#FFE0E0; text-align:center; width: 120px;"><p style="font-size:12px;"><b>비고</b></p></td>';
        html += '               </tr>';

        for(var i=0;  i < userMap6.length; i++){
            var Licence = userMap6[i];
            html += '               <tr>';
            html += '                   <td style="height:40px;background-color:#FFFFFF; text-align:center;"><p style="font-size:12px;">'+ (i + 1) +'</p></td>';
            html += '                   <td style="height:40px;background-color:#FFFFFF; text-align:center;"><p style="font-size:12px;">'+ Licence.CERTIFICATE_NAME +'</p></td>';
            html += '                   <td style="height:40px;background-color:#FFFFFF; text-align:center;"><p style="font-size:12px;">'+ Licence.ACQUISITION_DAY +'</p></td>';
            html += '                   <td style="height:40px;background-color:#FFFFFF; text-align:center;"><p style="font-size:12px;">'+ Licence.CERTIFICATE_NUM +'</p></td>';
            html += '                   <td style="height:40px;background-color:#FFFFFF; text-align:center;"><p style="font-size:12px;">'+ Licence.ISSUER +'</p></td>';
            html += '                   <td style="height:40px;background-color:#FFFFFF; text-align:center;"><p style="font-size:12px;">'+ (Licence.RMK || '') +'</p></td>';
            html += '               </tr>';
        }
        html += '           </table>';
        html += '       </td>';
        html += '   </tr>';
        html += '</table>';

        return html;
    },

    html6 : function(userMap7){
        var html = '';

        html += '<table style="font-family:굴림;margin: 0 auto; max-width: none; border-collapse: separate; border-spacing: 0; empty-cells: show; border-width: 0; outline: 0; text-align: left; font-size:12px; line-height: 20px; width: 100%; ">';
        html += '   <tr>';
        html += '       <td style="border-width: 0 0 0 0; font-weight: normal; box-sizing: border-box;">';
        html += '           <table border="3" style="border-collapse: collapse; margin: 0px;">';
        html += '               <tr>';
        html += '                   <td colspan="4" style="height:30px;background-color:#FFFFFF; text-align:left; width: 60px; border-top: none; border-right: none; border-left: none"><p style="font-size:17px;"><b>▣직무사항</b></p></td>';
        html += '               </tr>';
        html += '               <tr>';
        html += '                   <td style="height:30px;background-color:#FFE0E0; text-align:center; width: 60px;"><p style="font-size:12px;"><b>번호</b></p></td>';
        html += '                   <td style="height:30px;background-color:#FFE0E0; text-align:center; width: 216px;"><p style="font-size:12px;"><b>근무기간</b></p></td>';
        html += '                   <td style="height:30px;background-color:#FFE0E0; text-align:center; width: 266px;"><p style="font-size:12px;"><b>주요직무</b></p></td>';
        html += '                   <td style="height:30px;background-color:#FFE0E0; text-align:center; width: 166px;"><p style="font-size:12px;"><b>직 급</b></p></td>';

        html += '               </tr>';

        for(var i=0;  i < userMap7.length; i++){
            var Duty = userMap7[i];
            html += '               <tr>';
            html += '                   <td style="height:40px;background-color:#FFFFFF; text-align:center;"><p style="font-size:12px;">'+ (i + 1) +'</p></td>';
            html += '                   <td style="height:40px;background-color:#FFFFFF; text-align:center;"><p style="font-size:12px;">'+ Duty.WORK_JOIN_DAY + '~' + Duty.WORK_LEAVE_DAY +'</p></td>';
            html += '                   <td style="height:40px;background-color:#FFFFFF; text-align:center;"><p style="font-size:12px;">'+ Duty.DUTY_DETAIL +'</p></td>';
            html += '                   <td style="height:40px;background-color:#FFFFFF; text-align:center;"><p style="font-size:12px;">'+ Duty.POSITON_NAME +'</p></td>';

            html += '               </tr>';
        }
        html += '           </table>';
        html += '       </td>';
        html += '   </tr>';
        html += '</table>';

        return html;
    },

    html7 : function(userMap8){
        var html = '';

        html += '<table style="font-family:굴림;margin: 0 auto; max-width: none; border-collapse: separate; border-spacing: 0; empty-cells: show; border-width: 0; outline: 0; text-align: left; font-size:12px; line-height: 20px; width: 100%; ">';
        html += '   <tr>';
        html += '       <td style="border-width: 0 0 0 0; font-weight: normal; box-sizing: border-box;">';
        html += '           <table border="3" style="border-collapse: collapse; margin: 0px;">';
        html += '               <tr>';
        html += '                   <td colspan="6" style="height:30px;background-color:#FFFFFF; text-align:left; width: 60px; border-top: none; border-right: none; border-left: none"><p style="font-size:17px;"><b>▣발령사항</b></p></td>';
        html += '               </tr>';
        html += '               <tr>';
        html += '                   <td style="height:30px;background-color:#FFE0E0; text-align:center; width: 38px;"><p style="font-size:12px;"><b>번호</b></p></td>';
        html += '                   <td style="height:30px;background-color:#FFE0E0; text-align:center; width: 100px;"><p style="font-size:12px;"><b>발령구분</b></p></td>';
        html += '                   <td style="height:30px;background-color:#FFE0E0; text-align:center; width: 120px;"><p style="font-size:12px;"><b>년월일</b></p></td>';
        html += '                   <td style="height:30px;background-color:#FFE0E0; text-align:center; width: 290px;"><p style="font-size:12px;"><b>발령사항</b></p></td>';
        html += '                   <td style="height:30px;background-color:#FFE0E0; text-align:center; width: 80px;"><p style="font-size:12px;"><b>기록인</b></p></td>';
        html += '                   <td style="height:30px;background-color:#FFE0E0; text-align:center; width: 80px;"><p style="font-size:12px;"><b>비고</b></p></td>';
        html += '               </tr>';

        for(var i=0;  i < userMap8.length; i++){
            var Appoint = userMap8[i];
            var afDeptName = Appoint.AF_DEPT_NAME == null ? " " : Appoint.AF_DEPT_NAME;
            var afDeptTeam = Appoint.AF_DEPT_TEAM == null ? " " : Appoint.AF_DEPT_TEAM;
            var afPositionName = Appoint.AF_POSITION_NAME == null ? " " : Appoint.AF_POSITION_NAME;
            var afDutyName = Appoint.AF_DUTY_NAME == null ? " " : Appoint.AF_DUTY_NAME;
            var regUser = getUser(Appoint.REG_EMP_SEQ);
            html += '               <tr>';
            html += '                   <td style="height:40px;background-color:#FFFFFF; text-align:center;"><p style="font-size:12px;">'+ (i + 1) +'</p></td>';
            html += '                   <td style="height:40px;background-color:#FFFFFF; text-align:center;"><p style="font-size:12px;">'+ Appoint.APNT_NAME +'</p></td>';
            html += '                   <td style="height:40px;background-color:#FFFFFF; text-align:center;"><p style="font-size:12px;">'+ Appoint.historyDt +'</p></td>';
            html += '                   <td style="height:40px;background-color:#FFFFFF; text-align:center;"><p style="font-size:12px;">'+ afDeptName +' ' + afDeptTeam +' '+afPositionName+' '+afDutyName +'</p></td>';
            html += '                   <td style="height:40px;background-color:#FFFFFF; text-align:center;"><p style="font-size:12px;">'+ regUser.EMP_NAME_KR +'</p></td>';
            html += '                   <td style="height:40px;background-color:#FFFFFF; text-align:center;"><p style="font-size:12px;">'+ Appoint.ETC +'</p></td>';
            html += '               </tr>';
        }
        html += '           </table>';
        html += '       </td>';
        html += '   </tr>';
        html += '</table>';

        return html;
    },

    html8 : function(userMap9){
        var html = '';

        html += '<table style="font-family:굴림;margin: 0 auto; max-width: none; border-collapse: separate; border-spacing: 0; empty-cells: show; border-width: 0; outline: 0; text-align: left; font-size:12px; line-height: 20px; width: 100%; ">';
        html += '   <tr>';
        html += '       <td style="border-width: 0 0 0 0; font-weight: normal; box-sizing: border-box;">';
        html += '           <table border="3" style="border-collapse: collapse; margin: 0px;">';
        html += '               <tr>';
        html += '                   <td colspan="5" style="height:30px;background-color:#FFFFFF; text-align:left; width: 60px; border-top: none; border-right: none; border-left: none"><p style="font-size:17px;"><b>▣상벌사항</b></p></td>';
        html += '               </tr>';
        html += '               <tr>';
        html += '                   <td style="height:30px;background-color:#FFE0E0; text-align:center; width: 60px;"><p style="font-size:12px;"><b>번호</b></p></td>';
        html += '                   <td style="height:30px;background-color:#FFE0E0; text-align:center; width: 100px;"><p style="font-size:12px;"><b>구분(표창/징계)</b></p></td>';
        html += '                   <td style="height:30px;background-color:#FFE0E0; text-align:center; width: 120px;"><p style="font-size:12px;"><b>년월일</b></p></td>';
        html += '                   <td style="height:30px;background-color:#FFE0E0; text-align:center; width: 298px;"><p style="font-size:12px;"><b>공적(징계)사항</b></p></td>';
        html += '                   <td style="height:30px;background-color:#FFE0E0; text-align:center; width: 130px;"><p style="font-size:12px;"><b>시행처</b></p></td>';
        html += '               </tr>';

        for(var i=0;  i < userMap9.length; i++){
            var Reward = userMap9[i];
            html += '               <tr>';
            html += '                   <td style="height:40px;background-color:#FFFFFF; text-align:center;"><p style="font-size:12px;">'+ (i + 1) +'</p></td>';
            html += '                   <td style="height:40px;background-color:#FFFFFF; text-align:center;"><p style="font-size:12px;">'+ Reward.REWORD_TYPE_NAME1 +'</p></td>';
            html += '                   <td style="height:40px;background-color:#FFFFFF; text-align:center;"><p style="font-size:12px;">'+ Reward.REWORD_DAY +'</p></td>';
            html += '                   <td style="height:40px;background-color:#FFFFFF; text-align:center;"><p style="font-size:12px;">'+ Reward.RWD_OFM +'</p></td>';
            html += '                   <td style="height:40px;background-color:#FFFFFF; text-align:center;"><p style="font-size:12px;">'+ Reward.RWD_ST_COMP +'</p></td>';
            html += '               </tr>';
        }
        html += '           </table>';
        html += '       </td>';
        html += '   </tr>';
        html += '</table>';

        return html;
    },

    html9 : function(){
        var html = '';

        html += '<table style="font-family:굴림;margin: 0 auto; max-width: none; border-collapse: separate; border-spacing: 0; empty-cells: show; border-width: 0; outline: 0; text-align: left; font-size:12px; line-height: 20px; width: 100%; ">';
        html += '   <tr>';
        html += '       <td style="border-width: 0 0 0 0; font-weight: normal; box-sizing: border-box;">';
        html += '           <table border="3" style="border-collapse: collapse; margin: 0px;">';
        html += '               <tr>';
        html += '                   <td colspan="4" style="height:30px;background-color:#FFFFFF; text-align:left; width: 60px; border-top: none; border-right: none; border-left: none"><p style="font-size:17px;"><b>▣평생학습</b></p></td>';
        html += '               </tr>';
        html += '               <tr>';
        html += '                   <td style="height:30px;background-color:#FFE0E0; text-align:center; width: 177px;"><p style="font-size:12px;"><b>직무학습</b></p></td>';
        html += '                   <td style="height:30px;background-color:#FFE0E0; text-align:center; width: 177px;"><p style="font-size:12px;"><b>공통학습</b></p></td>';
        html += '                   <td style="height:30px;background-color:#FFE0E0; text-align:center; width: 177px;"><p style="font-size:12px;"><b>학습조</b></p></td>';
        html += '                   <td style="height:30px;background-color:#FFE0E0; text-align:center; width: 177px;"><p style="font-size:12px;"><b>OJT</b></p></td>';
        html += '               </tr>';



            html += '               <tr>';
            html += '                   <td style="height:40px;background-color:#FFFFFF; text-align:center;"><p style="font-size:12px;">'+ ' ' +'</p></td>';
            html += '                   <td style="height:40px;background-color:#FFFFFF; text-align:center;"><p style="font-size:12px;">'+ ' ' +'</p></td>';
            html += '                   <td style="height:40px;background-color:#FFFFFF; text-align:center;"><p style="font-size:12px;">'+ ' ' +'</p></td>';
            html += '                   <td style="height:40px;background-color:#FFFFFF; text-align:center;"><p style="font-size:12px;">'+ ' ' +'</p></td>';
            html += '               </tr>';

        html += '           </table>';
        html += '       </td>';
        html += '   </tr>';
        html += '</table>';

        return html;
    },

    html10 : function(){
        var html = '';

        html += '<table style="font-family:굴림;margin: 0 auto; max-width: none; border-collapse: separate; border-spacing: 0; empty-cells: show; border-width: 0; outline: 0; text-align: left; font-size:12px; line-height: 20px; width: 100%; ">';
        html += '   <tr>';
        html += '       <td style="border-width: 0 0 0 0; font-weight: normal; box-sizing: border-box;">';
        html += '           <table border="3" style="border-collapse: collapse; margin: 0px;">';
        html += '               <tr>';
        html += '                   <td colspan="3" style="height:30px;background-color:#FFFFFF; text-align:left; width: 60px; border-top: none; border-right: none; border-left: none"><p style="font-size:17px;"><b>▣근무평가</b></p></td>';
        html += '               </tr>';
        html += '               <tr>';
        html += '                   <td style="height:30px;background-color:#FFE0E0; text-align:center; width: 116px;"><p style="font-size:12px;"><b>구분</b></p></td>';
        html += '                   <td style="height:30px;background-color:#FFE0E0; text-align:center; width: 346px;"><p style="font-size:12px;"><b>평가기간</b></p></td>';
        html += '                   <td style="height:30px;background-color:#FFE0E0; text-align:center; width: 246px;"><p style="font-size:12px;"><b>평점 / 등급</b></p></td>';
        html += '               </tr>';

        html += '               <tr>';
        html += '                   <td style="height:40px;background-color:#FFFFFF; text-align:center;"><p style="font-size:12px;">'+ ' ' +'</p></td>';
        html += '                   <td style="height:40px;background-color:#FFFFFF; text-align:center;"><p style="font-size:12px;">'+ ' ' +'</p></td>';
        html += '                   <td style="height:40px;background-color:#FFFFFF; text-align:center;"><p style="font-size:12px;">'+ ' ' +'</p></td>';
        html += '               </tr>';

        html += '           </table>';
        html += '       </td>';
        html += '   </tr>';
        html += '</table>';

        return html;
    },

    html11 : function(userMap12){
        var html = '';

        html += '<table style="font-family:굴림;margin: 0 auto; max-width: none; border-collapse: separate; border-spacing: 0; empty-cells: show; border-width: 0; outline: 0; text-align: left; font-size:12px; line-height: 20px; width: 100%; ">';
        html += '   <tr>';
        html += '       <td style="border-width: 0 0 0 0; font-weight: normal; box-sizing: border-box;">';
        html += '           <table border="3" style="border-collapse: collapse; margin: 0px;">';
        html += '               <tr>';
        html += '                   <td colspan="5" style="height:30px;background-color:#FFFFFF; text-align:left; width: 60px; border-top: none; border-right: none; border-left: none"><p style="font-size:17px;"><b>▣제안제도</b></p></td>';
        html += '               </tr>';
        html += '               <tr>';
        html += '                   <td style="height:30px;background-color:#FFE0E0; text-align:center; width: 60px;"><p style="font-size:12px;"><b>번호</b></p></td>';
        html += '                   <td style="height:30px;background-color:#FFE0E0; text-align:center; width: 100px;"><p style="font-size:12px;"><b>구분</b></p></td>';
        html += '                   <td style="height:30px;background-color:#FFE0E0; text-align:center; width: 120px;"><p style="font-size:12px;"><b>년월일</b></p></td>';
        html += '                   <td style="height:30px;background-color:#FFE0E0; text-align:center; width: 298px;"><p style="font-size:12px;"><b>제안명</b></p></td>';
        html += '                   <td style="height:30px;background-color:#FFE0E0; text-align:center; width: 130px;"><p style="font-size:12px;"><b>현재상태</b></p></td>';
        html += '               </tr>';

        for(var i=0;  i < userMap12.length; i++){
            var Proposal = userMap12[i];
            html += '               <tr>';
            html += '                   <td style="height:40px;background-color:#FFFFFF; text-align:center;"><p style="font-size:12px;">'+ (i + 1) +'</p></td>';
            html += '                   <td style="height:40px;background-color:#FFFFFF; text-align:center;"><p style="font-size:12px;">'+ Proposal.PROPOSAL_GUBUN +'</p></td>';
            html += '                   <td style="height:40px;background-color:#FFFFFF; text-align:center;"><p style="font-size:12px;">'+ Proposal.PROPOSAL_DATE +'</p></td>';
            html += '                   <td style="height:40px;background-color:#FFFFFF; text-align:center;"><p style="font-size:12px;">'+ Proposal.PROPOSAL_DETAIL +'</p></td>';
            html += '                   <td style="height:40px;background-color:#FFFFFF; text-align:center;"><p style="font-size:12px;">'+ Proposal.PROPOSAL_CHECK_CHOICE +'</p></td>';
            html += '               </tr>';
        }
        html += '           </table>';
        html += '       </td>';
        html += '   </tr>';
        html += '</table>';

        return html;
    }
};
