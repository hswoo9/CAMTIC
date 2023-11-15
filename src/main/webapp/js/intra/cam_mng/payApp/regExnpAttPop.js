const regExnpAtt = {
    global: {
        eviTypeA : ["세금계산서", "거래명세서", "견적서", "검수조서", "납품사진"],
        eviTypeB : ["계산서", "거래명세서", "견적서", "검수조서", "납품사진"],
        eviTypeC : ["매출전표", "거래명세서", "검수조서", "납품사진"],
        eviTypeD : ["출장대장", "결과보고서"],
        eviTypeE : ["매출전표"],

    },
    fn_DefaultScript: function(){
        regExnpAtt.fn_fileHtmlSet();
        regExnpAtt.fn_dataSet();
        regExnpAtt.fn_mngMode();
    },

    fn_dataSet: function(){
        let eviType = $("#eviType").val();
        let eviText = "";

        const exnpDestSn = $("#exnpDestSn").val();
        let url = "/pay/getExnpAttInfo";
        const data = { exnpDestSn: exnpDestSn };
        const attInfo = customKendo.fn_customAjax(url, data).data;
        console.log(attInfo);
        
        if(eviType == "1"){
            eviText = "세금계산서";
            $("#file1Sn").val(attInfo.FILE1_NO);
            $("#file1Name").text(attInfo.FILE1_NAME);
            $("#file1Name").css("cursor", "pointer");
            $("#file1Name").attr("onclick", "fileDown('" + attInfo.FILE1_PATH + "', '" + attInfo.FILE1_NAME + "')");
            $("#file2Sn").val(attInfo.FILE2_NO);
            $("#file2Name").text(attInfo.FILE2_NAME);
            $("#file2Name").css("cursor", "pointer");
            $("#file2Name").attr("onclick", "fileDown('" + attInfo.FILE2_PATH + "', '" + attInfo.FILE2_NAME + "')");
            $("#file3Sn").val(attInfo.FILE3_NO);
            $("#file3Name").text(attInfo.FILE3_NAME);
            $("#file3Name").css("cursor", "pointer");
            $("#file3Name").attr("onclick", "fileDown('" + attInfo.FILE3_PATH + "', '" + attInfo.FILE3_NAME + "')");
            $("#file4Sn").val(attInfo.FILE4_NO);
            $("#file4Name").text(attInfo.FILE4_NAME);
            $("#file4Name").css("cursor", "pointer");
            $("#file4Name").attr("onclick", "fileDown('" + attInfo.FILE4_PATH + "', '" + attInfo.FILE4_NAME + "')");
            $("#file5Sn").val(attInfo.FILE5_NO);
            $("#file5Name").text(attInfo.FILE5_NAME);
            $("#file5Name").css("cursor", "pointer");
            $("#file5Name").attr("onclick", "fileDown('" + attInfo.FILE5_PATH + "', '" + attInfo.FILE5_NAME + "')");
        }else if(eviType == "2"){
            eviText = "계산서";
            $("#file1Sn").val(attInfo.FILE1_NO);
            $("#file1Name").text(attInfo.FILE1_NAME);
            $("#file1Name").css("cursor", "pointer");
            $("#file1Name").attr("onclick", "fileDown('" + attInfo.FILE1_PATH + "', '" + attInfo.FILE1_NAME + "')");
            $("#file2Sn").val(attInfo.FILE2_NO);
            $("#file2Name").text(attInfo.FILE2_NAME);
            $("#file2Name").css("cursor", "pointer");
            $("#file2Name").attr("onclick", "fileDown('" + attInfo.FILE2_PATH + "', '" + attInfo.FILE2_NAME + "')");
            $("#file3Sn").val(attInfo.FILE3_NO);
            $("#file3Name").text(attInfo.FILE3_NAME);
            $("#file3Name").css("cursor", "pointer");
            $("#file3Name").attr("onclick", "fileDown('" + attInfo.FILE3_PATH + "', '" + attInfo.FILE3_NAME + "')");
            $("#file4Sn").val(attInfo.FILE4_NO);
            $("#file4Name").text(attInfo.FILE4_NAME);
            $("#file4Name").css("cursor", "pointer");
            $("#file4Name").attr("onclick", "fileDown('" + attInfo.FILE4_PATH + "', '" + attInfo.FILE4_NAME + "')");
            $("#file5Sn").val(attInfo.FILE5_NO);
            $("#file5Name").text(attInfo.FILE5_NAME);
            $("#file5Name").css("cursor", "pointer");
            $("#file5Name").attr("onclick", "fileDown('" + attInfo.FILE5_PATH + "', '" + attInfo.FILE5_NAME + "')");
        }else if(eviType == "3"){
            eviText = "신용카드";
            $("#file6Sn").val(attInfo.FILE6_NO);
            $("#file6Name").text(attInfo.FILE6_NAME);
            $("#file6Name").css("cursor", "pointer");
            $("#file6Name").attr("onclick", "fileDown('" + attInfo.FILE6_PATH + "', '" + attInfo.FILE6_NAME + "')");
            $("#file7Sn").val(attInfo.FILE7_NO);
            $("#file7Name").text(attInfo.FILE7_NAME);
            $("#file7Name").css("cursor", "pointer");
            $("#file7Name").attr("onclick", "fileDown('" + attInfo.FILE7_PATH + "', '" + attInfo.FILE7_NAME + "')");
            $("#file8Sn").val(attInfo.FILE8_NO);
            $("#file8Name").text(attInfo.FILE8_NAME);
            $("#file8Name").css("cursor", "pointer");
            $("#file8Name").attr("onclick", "fileDown('" + attInfo.FILE8_PATH + "', '" + attInfo.FILE8_NAME + "')");
            $("#file9Sn").val(attInfo.FILE9_NO);
            $("#file9Name").text(attInfo.FILE9_NAME);
            $("#file9Name").css("cursor", "pointer");
            $("#file9Name").attr("onclick", "fileDown('" + attInfo.FILE9_PATH + "', '" + attInfo.FILE9_NAME + "')");
        }else if(eviType == "4"){
            eviText = "직원지급";
        }else if(eviType == "5"){
            eviText = "소득신고자";
            $("#file10Sn").val(attInfo.FILE10_NO);
            $("#file10Name").text(attInfo.FILE10_NAME);
            $("#file10Name").css("cursor", "pointer");
            $("#file10Name").attr("onclick", "fileDown('" + attInfo.FILE10_PATH + "', '" + attInfo.FILE10_NAME + "')");
        }else if(eviType == "6"){
            eviText = "기타";
        }

        $("#pjtTitle").text("증빙서류 - "+eviText);

        if(attInfo.etcFile != null){
            regExnpAtt.settingTempFileDataInit(attInfo.etcFile);
        }
    },

    fn_fileHtmlSet: function(){
        let eviType = $("#eviType").val();
        let eviText = $("#eviType").val();
        let html = '';
        html += '<colgroup>';
        if(eviType == "1" || eviType == "2"){
            html += '   <col width="20%">';
            html += '   <col width="20%">';
            html += '   <col width="20%">';
            html += '   <col width="20%">';
            html += '   <col width="20%">';
        }else if(eviType == "3"){
            html += '   <col width="25%">';
            html += '   <col width="25%">';
            html += '   <col width="25%">';
            html += '   <col width="25%">';
        }else if(eviType == "5"){
            html += '   <col width="100%">';
        }
        html += '</colgroup>';
        html += '<thead>';
        html += '<tr>';
        if(eviType == "1" || eviType == "2"){
            html += '   <th scope="row" class="text-center th-color">';
            html += '       <span class="red-star"></span><b>세금계산서/계산서</b>';
            html += '   </th>';
            html += '   <th scope="row" class="text-center th-color">';
            html += '       <span class="red-star"></span><b>거래명세서</b>';
            html += '   </th>';
            html += '   <th scope="row" class="text-center th-color">';
            html += '       <span class="red-star"></span><b>견적서</b>';
            html += '   </th>';
            html += '   <th scope="row" class="text-center th-color">';
            html += '       <span class="red-star"></span><b>검수조서</b>';
            html += '   </th>';
            html += '   <th scope="row" class="text-center th-color">';
            html += '       <span class="red-star"></span><b>납품사진</b>';
            html += '   </th>';
        }else if(eviType == "3"){
            html += '   <th scope="row" class="text-center th-color">';
            html += '       <span class="red-star"></span><b>매출전표</b>';
            html += '   </th>';
            html += '   <th scope="row" class="text-center th-color">';
            html += '       <span class="red-star"></span><b>거래명세서</b>';
            html += '   </th>';
            html += '   <th scope="row" class="text-center th-color">';
            html += '       <span class="red-star"></span><b>검수조서</b>';
            html += '   </th>';
            html += '   <th scope="row" class="text-center th-color">';
            html += '       <span class="red-star"></span><b>납품사진</b>';
            html += '   </th>';
        }else if(eviType == "5"){
            html += '   <th scope="row" class="text-center th-color">';
            html += '       <span class="red-star"></span><b>계좌이체동의서</b>';
            html += '   </th>';
        }
        html += '</tr>';
        html += '<tr>';

        if(eviType == "1" || eviType == "2"){
            html += '<td style="text-align: center">' +
                '<label for="file1" class="k-button k-button-solid-base">파일첨부</label>' +
                '<input type="file" id="file1" name="file1" onchange="regExnpAtt.fileChange(this)" style="display: none">' +
                '<p style="margin-bottom: 0px; margin-top: 3px" id="file1Name"></p>' +
                '</td>';
            html += '<td style="text-align: center">' +
                '<label for="file2" class="k-button k-button-solid-base">파일첨부</label>' +
                '<input type="file" id="file2" name="file2" onchange="regExnpAtt.fileChange(this)" style="display: none">' +
                '<p style="margin-bottom: 0px; margin-top: 3px" id="file2Name"></p>' +
                '</td>';
            html += '<td style="text-align: center">' +
                '<label for="file3" class="k-button k-button-solid-base">파일첨부</label>' +
                '<input type="file" id="file3" name="file3" onchange="regExnpAtt.fileChange(this)" style="display: none">' +
                '<p style="margin-bottom: 0px; margin-top: 3px" id="file3Name"></p>' +
                '</td>';
            html += '<td style="text-align: center">' +
                '<label for="file4" class="k-button k-button-solid-base">파일첨부</label>' +
                '<input type="file" id="file4" name="file4" onchange="regExnpAtt.fileChange(this)" style="display: none">' +
                '<p style="margin-bottom: 0px; margin-top: 3px" id="file4Name"></p>' +
                '</td>';
            html += '<td style="text-align: center">' +
                '<label for="file5" class="k-button k-button-solid-base">파일첨부</label>' +
                '<input type="file" id="file5" name="file5" onchange="regExnpAtt.fileChange(this)" style="display: none">' +
                '<p style="margin-bottom: 0px; margin-top: 3px" id="file5Name"></p>' +
                '</td>';
        }else if(eviType == "3"){
            html += '<td style="text-align: center">' +
                '<label for="file6" class="k-button k-button-solid-base">파일첨부</label>' +
                '<input type="file" id="file6" name="file6" onchange="regExnpAtt.fileChange(this)" style="display: none">' +
                '<p style="margin-bottom: 0px; margin-top: 3px" id="file6Name"></p>' +
                '</td>';
            html += '<td style="text-align: center">' +
                '<label for="file7" class="k-button k-button-solid-base">파일첨부</label>' +
                '<input type="file" id="file7" name="file7" onchange="regExnpAtt.fileChange(this)" style="display: none">' +
                '<p style="margin-bottom: 0px; margin-top: 3px" id="file7Name"></p>' +
                '</td>';
            html += '<td style="text-align: center">' +
                '<label for="file8" class="k-button k-button-solid-base">파일첨부</label>' +
                '<input type="file" id="file8" name="file8" onchange="regExnpAtt.fileChange(this)" style="display: none">' +
                '<p style="margin-bottom: 0px; margin-top: 3px" id="file8Name"></p>' +
                '</td>';
            html += '<td style="text-align: center">' +
                '<label for="file9" class="k-button k-button-solid-base">파일첨부</label>' +
                '<input type="file" id="file9" name="file9" onchange="regExnpAtt.fileChange(this)" style="display: none">' +
                '<p style="margin-bottom: 0px; margin-top: 3px" id="file9Name"></p>' +
                '</td>';
        }else if(eviType == "5"){
            html += '<td style="text-align: center">' +
                '<label for="file10" class="k-button k-button-solid-base">파일첨부</label>' +
                '<input type="file" id="file10" name="file10" onchange="regExnpAtt.fileChange(this)" style="display: none">' +
                '<p style="margin-bottom: 0px; margin-top: 3px" id="file10Name"></p>' +
                '</td>';
        }
        html += '</tr>';
        html += '<tr>';
        html += '   <th colspan="5" scope="row" class="text-center th-color">';
        html += '       <span class="red-star"></span><b>기타</b>';
        html += '   </th>';
        html += '</tr>';
        html += '<tr>';
        html += "<td colspan='5' style='text-align: center'>";
        html +=
            '<form style="padding: 0px 30px;">' +
            '   <div class="card-header" style="padding: 5px;">' +
            '       <h3 class="card-title">기타 첨부파일</h3>' +
            '       <div class="card-options">' +
            '           <div class="filebox">' +
            '               <button type="button" class="fileUpload k-grid-button k-button k-button-md k-button-solid k-button-solid-base" id="fileUpload" onclick="$(\'#fileList\').click()">' +
            '                   <span class="k-icon k-i-track-changes-enable k-button-icon"></span>' +
            '                   <span class="k-button-text">파일첨부</span>' +
            '               </button>' +
            '               <input type="file" id="fileList" name="fileList" onchange="fCommon.addFileInfoTable();" multiple style="display: none"/>' +
            '           </div>' +
            '       </div>' +
            '   </div>' +
            '   <div class="table-responsive">' +
            '       <table class="popTable table table-bordered mb-0">' +
            '           <colgroup>' +
            '               <col width="50%">' +
            '               <col width="10%">' +
            '               <col width="30%">' +
            '               <col width="10%">' +
            '           </colgroup>' +
            '           <thead>' +
            '               <tr class="text-center th-color">' +
            '                   <th>파일명</th>' +
            '                   <th>확장자</th>' +
            '                   <th>용량</th>' +
            '                   <th>기타</th>' +
            '               </tr>' +
            '           </thead>' +
            '           <tbody id="fileGrid">' +
            '               <tr class="defultTr">' +
            '                   <td colspan="4" style="text-align: center">선택된 파일이 없습니다.</td>' +
            '               </tr>' +
            '           </tbody>' +
            '       </table>' +
            '   </div>' +
            '</form>';
        html += '</td>';
        html += '</tr>';
        $("#popTable").html(html);
        console.log(html);
    },

    fileChange: function(e){
        $(e).next().text($(e)[0].files[0].name);
    },

    fn_saveBtn: function(){
        let eviType = $("#eviType").val();

        const formData = new FormData();
        formData.append("exnpDestSn", $("#exnpDestSn").val());
        formData.append("menuCd", "exnpAtt");
        formData.append("empSeq", $("#regEmpSeq").val());
        formData.append("regEmpSeq", $("#regEmpSeq").val());

        if(eviType == "1" || eviType == "2"){

            if($("#file1")[0].files.length == 1){
                formData.append("file1", $("#file1")[0].files[0]);
            }else{
                if($("#file1Name").text() == ""){
                    alert("세금계산서/계산서 첨부파일이 등록되지 않았습니다"); return;
                }
            }

            if($("#file2")[0].files.length == 1){
                formData.append("file2", $("#file2")[0].files[0]);
            }else{
                if($("#file2Name").text() == ""){
                    alert("거래명세서 첨부파일이 등록되지 않았습니다"); return;
                }
            }

            if($("#file3")[0].files.length == 1){
                formData.append("file3", $("#file3")[0].files[0]);
            }else{
                if($("#file3Name").text() == ""){
                    alert("견적서 첨부파일이 등록되지 않았습니다"); return;
                }
            }

            if($("#file4")[0].files.length == 1){
                formData.append("file4", $("#file4")[0].files[0]);
            }else{
                if($("#file4Name").text() == ""){
                    alert("검수조서 첨부파일이 등록되지 않았습니다"); return;
                }
            }

            if($("#file5")[0].files.length == 1){
                formData.append("file5", $("#file5")[0].files[0]);
            }else{
                if($("#file5Name").text() == ""){
                    alert("납품사진 첨부파일이 등록되지 않았습니다"); return;
                }
            }

        }else if(eviType == "3"){

            if($("#file6")[0].files.length == 1){
                formData.append("file6", $("#file6")[0].files[0]);
            }else{
                if($("#file6Name").text() == ""){
                    alert("매출전표 첨부파일이 등록되지 않았습니다"); return;
                }
            }

            if($("#file7")[0].files.length == 1){
                formData.append("file7", $("#file7")[0].files[0]);
            }else{
                if($("#file7Name").text() == ""){
                    alert("거래명세서 첨부파일이 등록되지 않았습니다"); return;
                }
            }

            if($("#file8")[0].files.length == 1){
                formData.append("file8", $("#file8")[0].files[0]);
            }else{
                if($("#file8Name").text() == ""){
                    alert("검수조서 첨부파일이 등록되지 않았습니다"); return;
                }
            }

            if($("#file9")[0].files.length == 1){
                formData.append("file9", $("#file9")[0].files[0]);
            }else{
                if($("#file9Name").text() == ""){
                    alert("납품사진 첨부파일이 등록되지 않았습니다"); return;
                }
            }

        }else if(eviType == "5"){

            if($("#file10")[0].files.length == 1){
                formData.append("file10", $("#file10")[0].files[0]);
            }else{
                if($("#file10Name").text() == ""){
                    alert("계좌이체동의서 첨부파일이 등록되지 않았습니다"); return;
                }
            }

        }

        /** 증빙파일 첨부파일 */
        if(fCommon.global.attFiles != null){
            for(var i = 0; i < fCommon.global.attFiles.length; i++){
                formData.append("file11", fCommon.global.attFiles[i]);
            }
        }

        const result = customKendo.fn_customFormDataAjax("/pay/updExnpAttDetData", formData);
        if(result.flag){
            alert("저장되었습니다.");
            window.close();
        }
    },

    /** 첨부파일 데이터 세팅 */
    settingTempFileDataInit: function(e){
        var html = '';
        if(e.length > 0){
            for(var i = 0; i < e.length; i++){
                html += '<tr style="text-align: center">';
                html += '   <td><span style="cursor: pointer" onclick="fileDown(\''+e[i].file_path+e[i].file_uuid+'\', \''+e[i].file_org_name+'.'+e[i].file_ext+'\')">'+e[i].file_org_name+'</span></td>';
                html += '   <td>'+ e[i].file_ext +'</td>';
                html += '   <td>'+ e[i].file_size +'</td>';
                html += '   <td class="delBtn">';
                html += '       <button type="button" class="k-button k-rounded k-button-solid k-button-solid-error" onclick="fCommon.commonFileDel('+ e[i].file_no +', this)">' +
                    '			<span class="k-button-text">삭제</span>' +
                    '		</button>';
                html += '   </td>';
                html += '</tr>';
            }
            $("#fileGrid").html(html);
        }else{
            $("#fileGrid").html('<tr>' +
                '	<td colspan="4" style="text-align: center">선택된 파일이 없습니다.</td>' +
                '</tr>');
        }
    },

    fn_mngMode: function(){
        if(opener.parent.$("#mode").val() == "view"){
            $("#saveBtn").hide();
            $(".delBtn").text("-");
            $(".k-button-solid-base").hide();
        }
    }
}