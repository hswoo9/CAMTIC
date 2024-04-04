const lectureReq = {
    fn_defaultScript: function(){
        this.fn_pageSet();
        if($("#pk").val() != ""){
            this.fn_dataSet();
        }else{
            //this.fn_testData();
        }
    },

    fn_pageSet: function(){
        customKendo.fn_textBox(["projectName", "lectureName", "lectureNameEx", "methodTypePr", "title", "recruitNum", "eduTime", "eduTimeEx", "area", "textbookFee", "field3", "conName", "conTitle", "conDetailTitle", "conTime", "conNum", "conArea", "conCost", "conPerson"]);
        customKendo.fn_textArea(["content1", "content2", "goal", "intro", "targetUser", "scheduleHtml", "prospectus", "materials"]);

        /** form구분 drop box */
       /* ub.fn_writeTypeSet();*/

        /** 사업구분 drop box */
        /*ub.fn_projectTypeSet();*/
        ub.fn_conProjectTypeSet();

        /** 교육분야 drop box */
        ub.fn_fieldTypeSet();
        ub.fn_fieldType2Set();

        /** 컨설팅분야 drop box */
        ub.fn_fieldSet();
        ub.fn_field2Set();

        /** 과목명 drop box */
        ub.fn_curriculumTypeSet();

        /** 과정명 drop box*/
        ub.fn_courseTypeSet();

        /** 진행상태 drop box */
        ub.fn_statusSet();

        /** 메인게시여부 drop box */
        ub.fn_mainTypeSet();
        ub.fn_conMainTypeSet();

        /** 교육기간 date picker */
        ub.fn_eduDtSet();

        /** 모집기간 date picker */
        ub.fn_recruitDtSet();

        /** 컨설팅 협약기간 date picker */
        ub.fn_agmDtSet();

        /** 운영방법 radio button */
        /*ub.fn_methodTypeSet();*/

        /** 인증서 radio button */
        /*ub.fn_certTypeSet();*/
    },

    fn_dataSet: function(){
        const currentUrl = window.location.href;
        const urlParams = new URLSearchParams(currentUrl);
        const typeValue = urlParams.get('type');

        const data = {
            pk: $("#pk").val()
        };

        if(typeValue == "lec") {
            const result = customKendo.fn_customAjax("/projectUnRnd/getLectureInfo", data);
            const lecMap = result.data;
            const lecList = result.list;
            var html = "";
            var teachTime = 0;

            if(lecList != null && lecList != ""){
                $("#tList").html("");

                for(var i = 0 ; i < lecList.length ; i++) {
                    html +='<tr>';
                    html +='<td style="text-align: center;">'+lecList[i].NAME+'</td>';
                    html +='<td>'+lecList[i].HP_NUM+'</td>';
                    html +='</tr>';

                    teachTime += parseInt(lecList[i].teachTime);
                }

                $("#tList").html(html);
            }

            /*$("#projectType").data("kendoDropDownList").value(lecMap.LEC_BUSN_CLASS);*/
            $("#fieldType").data("kendoDropDownList").value(lecMap.LEC_FIELD);
            $("#fieldType2").data("kendoDropDownList").value(lecMap.LEC_FIELD1);
            /*$("#curriculumType").data("kendoDropDownList").value(lecMap.LEC_SBJ_CD);
            $("#courseType").data("kendoDropDownList").value(lecMap.LEC_PS_CD);*/

            $("#lectureName").val(lecMap.LEC_TITLE_BS);
            $("#lectureNameEx").val(lecMap.LEC_TITLE_PR);
            $("#title").val(lecMap.LEC_TOPIC);
            $("#content1").val(lecMap.LEC_PS_GUIDE_A);
            $("#content2").val(lecMap.LEC_PS_GUIDE_B);

            $("#eduStartDt").val(lecMap.LEC_STR_DE);
            $("#eduEndDt").val(lecMap.LEC_END_DE);
            $("#recruitStartDt").val(lecMap.RECR_STR_DE);
            $("#recruitEndDt").val(lecMap.RECR_END_DE);

            $("#recruitNum").val(lecMap.RECR_MEM_CNT);
            $("#eduTime").val(lecMap.LEC_TIME);
            $("#eduTimeEx").val(lecMap.LEC_TIME_RNG);

            $("#area").val(lecMap.LEC_ADDR);
            $("#status").data("kendoDropDownList").value(lecMap.LEC_STATUS);

            $("#goal").val(lecMap.LEC_OBJ);
            $("#intro").val(lecMap.LEC_SUMR);
            $("#targetUser").val(lecMap.LEC_TARG);
            $("#scheduleHtml").val(lecMap.LEC_SCH);
            $("#prospectus").val(lecMap.LEC_INQ);
            $("#materials").val(lecMap.LEC_MAT);
            /*$("#textbookFee").val(lecMap.LEC_COST);*/
            /*$("#methodType").data("kendoRadioGroup").value(lecMap.LEC_OPER);*/

            if (lecMap.LEC_OPER_TYPE_N === "Y") {
                $("#typeN").prop("checked", true);
            } else {
                $("#typeN").prop("checked", false);
            }
            if (lecMap.LEC_OPER_TYPE_C === "Y") {
                $("#typeC").prop("checked", true);
            } else {
                $("#typeC").prop("checked", false);
            }
            if (lecMap.LEC_OPER_TYPE_S === "Y") {
                $("#typeS").prop("checked", true);
            } else {
                $("#typeS").prop("checked", false);
            }
            if (lecMap.LEC_OPER_TYPE_H === "Y") {
                $("#typeH").prop("checked", true);
            } else {
                $("#typeH").prop("checked", false);
            }
            $("#methodTypePr").val(lecMap.LEC_OPER_PR);

            /*$("#certType").data("kendoRadioGroup").value(lecMap.LEC_CERT);*/

            $("#mainType").data("kendoDropDownList").value(lecMap.LEC_OPEN_BD);

            if(lecMap.file1 != null){
                $("#file1Name").text(lecMap.file1.file_org_name + '.' +lecMap.file1.file_ext);
                $("#file1Name").attr("onclick", "fileDown('" + lecMap.file1.file_path + lecMap.file1.file_uuid +"', '" + lecMap.file1.file_org_name + "." + lecMap.file1.file_ext + "')");
                $("#file1Name").css("cursor", "pointer");
            }
            if (lecMap.file2 != null) {
                var html = "";
                for (let i = 0; i < lecMap.file2.length; i++) {
                    const file = lecMap.file2[i];
                    const filePath = file.file_path;
                    const fileName = file.file_org_name + '.' + file.file_ext;

                    html += `<div style="margin-top:5px;">
                                <a href="javascript:" style="color:#343a40;" onclick="fileDown('${filePath}', '${encodeURIComponent(fileName)}')">${fileName}</a>
                                <span onclick="lectureReq.deleteFile('${file.file_no}', this)" style="color:red;cursor:pointer; font-weight: bold;">&nbsp;X</span>
                            </div>`;
                }
                $("#file2Name").html(html);
                $("#file2Name").css("cursor", "pointer");
            }
            if(lecMap.file3 != null){
                $("#file3Name").text(lecMap.file3.file_org_name + '.' +lecMap.file3.file_ext);
                $("#file3Name").attr("onclick", "fileDown('" + lecMap.file3.file_path + lecMap.file3.file_uuid +"', '" + lecMap.file3.file_org_name + "." + lecMap.file3.file_ext + "')");
                $("#file3Name").css("cursor", "pointer");
            }
            /*$("#file1Name").text(lecMap.file1.file_org_name + '.' +lecMap.file1.file_ext);
            $("#file2Name").text(lecMap.file2.file_org_name + '.' +lecMap.file2.file_ext);
            $("#file3Name").text(lecMap.file3.file_org_name + '.' +lecMap.file3.file_ext);*/

            $("#file1Sn").val(lecMap.LEC_BOOK_IMG_SN);
            $("#file2Sn").val(lecMap.LEC_APPL_SN);
            $("#file3Sn").val(lecMap.LEC_MAIN_IMG_SN);

            this.fn_btnSet(lecMap);

        }else if(typeValue == "con") {
            const result = customKendo.fn_customAjax("/projectUnRnd/getConsultingInfo", data);
            const conMap = result.data;
            const conTc = result.list;
            var html1 = "";

            if(conTc != null && conTc != ""){
                $("#conTeacherInfo").html('');

                for(var i = 0 ; i < conTc.length ; i++) {
                    html1 +='<table class="popTable table table-bordered mb-10 mt--5" style="width: 33.3%">';
                    html1 +='<tbody class="ctList">';
                    html1 +='<tr>';
                    html1 +='<td class="tcTb">'+conTc[i].NAME+'</td>';
                    html1 +='</tr>';

                    html1 +='<tr>';
                    html1 +='<td class="tcTb">'+conTc[i].BIRTH+'</td>';
                    html1 +='</tr>';

                    html1 +='<tr>';
                    if (conTc[i].GENDER === 'F') {
                        html1 += '<td class="tcTb">여</td>';
                    }else if(conTc[i].GENDER === 'M') {
                        html1 += '<td class="tcTb">남</td>';
                    }else if(conTc[i].GENDER == null){
                        html1 += '<td class="tcTb"></td>';
                    }else{
                        html1 += '<td class="tcTb">'+conTc[i].GENDER+'</td>';
                    }
                    html1 +='</tr>';

                    html1 +='<tr>';
                    html1 +='<td class="tcTb">'+conTc[i].TEL_NUM+'</td>';
                    html1 +='</tr>';

                    html1 +='<tr>';
                    html1 +='<td class="tcTb">'+conTc[i].HP_NUM+'</td>';
                    html1 +='</tr>';

                    html1 +='<tr>';
                    html1 +='<td class="tcTb">'+conTc[i].EMAIL+'</td>';
                    html1 +='</tr>';
                    html1 +='</tbody>';
                    html1 +='</table>';
                }

                $("#conTeacherInfo").html(html1);
            }


            $("#field").data("kendoDropDownList").value(conMap.CON_FIELD);
            $("#field2").data("kendoDropDownList").value(conMap.CON_FIELD1);
            $("#field3").val(conMap.CON_FIELD_NAME2);
           /* $("#projectType").data("kendoDropDownList").value(conMap.CON_BUSN_CLASS);*/
            $("#conTitle").val(conMap.CON_TITLE_PR);
            $("#conDetailTitle").val(conMap.CON_TOPIC);
            $("#agmStartDt").val(conMap.CON_STR_DE);
            $("#agmEndDt").val(conMap.CON_END_DE);
            $("#conTime").val(conMap.CON_TIME);
            $("#conArea").val(conMap.CON_ADDR);
            $("#conCost").val(conMap.CON_COST);
            $("#conPerson").val(conMap.CON_PER);
            $("#conNum").val(conMap.RECR_MEM_CNT);
            $("#conMainType").data("kendoDropDownList").value(conMap.CON_OPEN_BD);

            this.fn_btnSet1(conMap);
        }
    },

    fn_btnSet: function(lecMap){
        if(lecMap != null){
            $("#saveBtn").hide();
            $("#modBtn").show();
            $("#teacherBtn").show();
            $("#personBtn").show();
            $("#eduBtn").show();
            $("#payBtn").show();
        }
    },

    fn_btnSet1: function(conMap){
        if(conMap != null){
            $("#saveBtn").hide();
            $("#modBtn").show();
            $("#consultantBtn").show();
            $("#conTeacherInfo").show();
            $("#teacherBtn").hide();
            $("#personBtn").hide();
            $("#eduBtn").hide();
            $("#payBtn").hide();
        }
    },

    fn_saveBtn: function(){
        const currentUrl = window.location.href;
        const urlParams = new URLSearchParams(currentUrl);
        const typeValue = urlParams.get('type');

        if(typeValue == "lec") {
            var typeN = $("#typeN").is(":checked") ? "Y" : "N";
            var typeC = $("#typeC").is(":checked") ? "Y" : "N";
            var typeS = $("#typeS").is(":checked") ? "Y" : "N";
            var typeH = $("#typeH").is(":checked") ? "Y" : "N";

            const data = {
                pjtSn: $("#pjtSn").val(),
                // projectType: $("#projectType").data("kendoDropDownList").value(),
                // projectTypeName: $("#projectType").data("kendoDropDownList").text(),
                fieldType: $("#fieldType").data("kendoDropDownList").value(),
                fieldTypeName: $("#fieldType").data("kendoDropDownList").text(),
                fieldType1: $("#fieldType2").data("kendoDropDownList").value(),
                fieldTypeName1: $("#fieldType2").data("kendoDropDownList").text(),
                /*curriculumType: $("#curriculumType").data("kendoDropDownList").value(),
                curriculumTypeName: $("#curriculumType").data("kendoDropDownList").text(),
                courseType: $("#courseType").data("kendoDropDownList").value(),
                courseTypeName: $("#courseType").data("kendoDropDownList").text(),*/
                lectureName: $("#lectureName").val(),
                lectureNameEx: $("#lectureNameEx").val(),
                /*title: $("#title").val(),
                content1: $("#content1").val(),
                content2: $("#content2").val(),*/
                eduStartDt: $("#eduStartDt").val(),
                eduEndDt: $("#eduEndDt").val(),
                recruitStartDt: $("#recruitStartDt").val(),
                recruitEndDt: $("#recruitEndDt").val(),

                recruitNum: $("#recruitNum").val(),
                eduTime: $("#eduTime").val(),
                eduTimeEx: $("#eduTimeEx").val(),

                area: $("#area").val(),
                status: $("#status").data("kendoDropDownList").value(),
                statusName: $("#status").data("kendoDropDownList").text(),

                /*goal: $("#goal").val(),
                intro: $("#intro").val(),
                targetUser: $("#targetUser").val(),*/
                scheduleHtml: $("#scheduleHtml").val(),
                prospectus: $("#prospectus").val(),
                /*materials: $("#materials").val(),*/

                /*textbookFee: $("#textbookFee").val().replace(/,/g, ''),*/
                textbookFeeEx: "",
                /*methodType: $("#methodType").data("kendoRadioGroup").value(),*/
                typeN : typeN,// methodType 일반
                typeC : typeC,// methodType 재직자
                typeS : typeS,// methodType 학생
                typeH : typeH,// methodType 구직자

                methodTypePr: $("#methodTypePr").val(),

                /*certType: $("#certType").data("kendoRadioGroup").value(),*/

                mainType: $("#mainType").data("kendoDropDownList").value(),
                mainTypeName: $("#mainType").data("kendoDropDownList").text(),

                regEmpSeq: $("#regEmpSeq").val(),

                file1 : $("#file1")[0].files[0],
                //file1 : file1,
                file2 : file2,
                file3 : $("#file3")[0].files[0],
                file1sn : $("#file1Sn").val(),
                file2sn : $("#file2Sn").val(),
                file3sn : $("#file3Sn").val()
            }

            /** 유효성 검사 */
            /*if (data.projectType == "") {
                alert("사업구분이 선택되지 않았습니다.");
                return;
            }*/
            if (data.fieldType == "") {
                alert("교육분야가 선택되지 않았습니다.");
                return;
            }
            if (data.curriculumType == "") {
                alert("과목명이 선택되지 않았습니다.");
                return;
            }
            if (data.courseType == "") {
                alert("과정명이 선택되지 않았습니다.");
                return;
            }
            /*if(data.lectureName == ""){ alert("강좌명(사업명)이 작성되지 않았습니다."); return; }*/
            if (data.lectureNameEx == "") {
                alert("강좌명(홍보용)이 작성되지 않았습니다.");
                return;
            }
            if (data.title == "") {
                alert("주제(CEO)가 작성되지 않았습니다.");
                return;
            }
            if (data.recruitNum == "") {
                alert("모집인원이 작성되지 않았습니다.");
                return;
            }
            /*if (data.eduTime == "" || data.eduTimeEx == "") {
                alert("교육시간이 작성되지 않았습니다.");
                return;
            }*/
            if (data.area == "") {
                alert("교육장소가 작성되지 않았습니다.");
                return;
            }
            /*if (data.textbookFee == "") {
                alert("교육비가 작성되지 않았습니다.");
                return;
            }*/
            if (data.courseType == "") {
                alert("메인게시여부가 선택되지 않았습니다.");
                return;
            }

            let url = "/projectUnRnd/insLectureInfo";
            if ($("#pk").val() != "") {
                data.pk = $("#pk").val();
                url = "/projectUnRnd/updLectureInfo";
            }

            const formData = new FormData();
            for (let key in data) {
                formData.append(key, data[key]);
            }

            if($("#file2")[0].files.length > 0){
                for(var i = 0; i < $("#file2")[0].files.length; i++){
                    formData.append("file2", $("#file2")[0].files[i]);
                }
            }


            const result = customKendo.fn_customFormDataAjax(url, formData);

            if (result.code != 200) {
                alert("저장 중 오류가 발생하였습니다.");
                /*window.close();*/
            } else {
                alert("단위사업이 등록되었습니다.");
                let src = "/projectUnRnd/lectureReqPop.do?pjtSn="+$("#pjtSn").val();
                src += "&type=lec";
                src += "&pk="+result.lecSn;
                window.location = src;
                opener.unRndLectList.mainGrid();
            }
        }else if(typeValue == "con"){
            const data = {
                pjtSn: $("#pjtSn").val(),
                /*teacherSn: $("#pjtSn").val(),*/
                projectType: $("#conProjectType").data("kendoDropDownList").value(),
                projectTypeName: $("#conProjectType").data("kendoDropDownList").text(),
                fieldType: $("#field").data("kendoDropDownList").value(),
                fieldTypeName: $("#field").data("kendoDropDownList").text(),
                fieldType1: $("#field2").data("kendoDropDownList").value(),
                fieldTypeName1: $("#field2").data("kendoDropDownList").text(),
                fieldTypeName2: $("#field3").val(),
                /*conName: $("#conName").val(),*/
                conTitle: $("#conTitle").val(),
                conDetailTitle: $("#conDetailTitle").val(),
                agmStartDt: $("#agmStartDt").val(),
                agmEndDt: $("#agmEndDt").val(),
                conTime: $("#conTime").val(),
                conArea: $("#conArea").val(),
                conCost: $("#conCost").val(),
                conPerson: $("#conPerson").val(),
                conNum: $("#conNum").val(),
                mainType: $("#conMainType").data("kendoDropDownList").value(),
                mainTypeName: $("#conMainType").data("kendoDropDownList").text(),
                regEmpSeq: $("#regEmpSeq").val()
            }

            /** 유효성 검사 */
            if (data.fieldType == "") {
                alert("컨선팅 분야가 선택되지 않았습니다.");
                return;
            }
            if (data.fieldType2 == "") {
                alert("컨선팅 분야가 선택되지 않았습니다.");
                return;
            }
            if (data.fieldType3 == "") {
                alert("컨선팅 분야가 작성되지 않았습니다.");
                return;
            }
            if (data.lectureName == "") {
                alert("사업명이 작성되지 않았습니다.");
                return;
            }
            if (data.title == "") {
                alert("과제명이 작성되지 않았습니다.");
                return;
            }
            if (data.detailTitle == "") {
                alert("세부 프로그램명이 작성되지 않았습니다.");
                return;
            }
            if (data.eduStartDt == "") {
                alert("협약기간이 작성되지 않았습니다.");
                return;
            }
            if (data.eduEndDt == "") {
                alert("협약기간이 작성되지 않았습니다.");
                return;
            }
            if (data.eduTime == "") {
                alert("컨설팅 시간이 작성되지 않았습니다.");
                return;
            }
            if (data.conPerson == "") {
                alert("수혜기업 담당자가 작성되지 않았습니다.");
                return;
            }
            if (data.recruitNum == "") {
                alert("수혜인원 수가 작성되지 않았습니다.");
                return;
            }

            let url = "/projectUnRnd/insConsultingInfo";
            if ($("#pk").val() != "") {
                data.pk = $("#pk").val();
                url = "/projectUnRnd/updConsultingInfo";
            }

            const formData = new FormData();
            for (let key in data) {
                formData.append(key, data[key]);
            }

            const result = customKendo.fn_customFormDataAjax(url, formData);

            if (result.code != 200) {
                alert("저장 중 오류가 발생하였습니다.");
                window.close();
            } else {
                alert("단위사업이 등록되었습니다.");
                let src = "/projectUnRnd/lectureReqPop.do?pjtSn="+$("#pjtSn").val();
                src += "&type=con";
                src += "&pk="+result.conSn;
                window.location = src;
                opener.unRndLectList.mainGrid();
            }
        }
    },

    fn_validationCheck: function(data){
    },

    fn_testData: function(){
       /* $("#projectType").data("kendoDropDownList").select(1);*/
        $("#fieldType").data("kendoDropDownList").select(1);
        $("#curriculumType").data("kendoDropDownList").select(1);
        $("#courseType").data("kendoDropDownList").select(1);

        $("#lectureName").val("test");
        $("#lectureNameEx").val("test");
        $("#title").val("test");
        $("#content1").val("test");
        $("#content2").val("test");

        $("#eduStartDt").val("2023-12-01");
        $("#eduEndDt").val("2023-12-31");
        $("#recruitStartDt").val("2023-11-01");
        $("#recruitEndDt").val("2023-11-10");

        $("#recruitNum").val("10");
        $("#eduTime").val("20");
        $("#eduTimeEx").val("매주월요일 18:00~22:00");

        $("#area").val("test");
        $("#status").data("kendoDropDownList").select(1);

        $("#goal").val("test");
        $("#intro").val("test");
        $("#targetUser").val("test");
        $("#scheduleHtml").val("test");
        $("#prospectus").val("test");
        $("#materials").val("test");

        $("#textbookFee").val("10000");
        $("#textbookFeeEx").val("교재비 제목 : 123");
        $("#methodType").data("kendoRadioGroup").value(1);

        $("#mainType").data("kendoDropDownList").select(1);
    },

    fn_regProjectUnRnd : function (){
        var url = "/unrnd/pop/unrndAttachmentPop.do";
        var name = "_blank";
        var option = "width = 850, height = 400, top = 200, left = 350, location = no";
        var popup = window.open(url, name, option);
    },

    deleteFile : function(key, e) {
        if(confirm("삭제한 파일은 복구할 수 없습니다.\n그래도 삭제하시겠습니까?")) {
            const fileSn = $("#file2Sn").val();
            var fileSnList = fileSn.split(',');

            fileSnList = fileSnList.filter(sn => sn.trim() !== key);

            const data = {
                regEmpSeq: $("#regEmpSeq").val(),
                pk: $("#pk").val()
            };

            const formData = new FormData();
            for (let key in data) {
                formData.append(key, data[key]);
            }
            formData.append('fileNo', key);
            formData.append('lecApplSn', fileSnList.join(','));

            const url = "/projectUnRnd/deleteFile";
            const result = customKendo.fn_customFormDataAjax(url, formData);
            if (result.flag) {
                alert("파일이 삭제되었습니다.");
                $(e).closest('div').remove();
            }
        }
    }
}

function fileDown(filePath, fileName){
    kendo.saveAs({
        dataURI: "/common/fileDownload.do?filePath=" + filePath + "&fileName=" + encodeURIComponent(fileName),
    });
}