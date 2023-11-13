const regPayAtt = {
    global: {
        eviTypeA : ["세금계산서", "거래명세서", "견적서", "검수조서", "납품사진"],
        eviTypeB : ["계산서", "거래명세서", "견적서", "검수조서", "납품사진"],
        eviTypeC : ["매출전표", "거래명세서", "검수조서", "납품사진"],
        eviTypeD : ["출장대장", "결과보고서"],
        eviTypeE : ["매출전표"],

    },
    fn_DefaultScript: function(){
        regPayAtt.fn_dataSet();
        regPayAtt.fn_fileHtmlSet();
    },

    fn_dataSet: function(){
        let eviType = $("#eviType").val();
        let eviText = "";
        
        if(eviType == "1"){
            eviText = "세금계산서";
        }else if(eviType == "2"){
            eviText = "계산서";
        }else if(eviType == "3"){
            eviText = "신용카드";
        }else if(eviType == "4"){
            eviText = "직원지급";
        }else if(eviType == "5"){
            eviText = "소득신고자";
        }else if(eviType == "6"){
            eviText = "기타";
        }
        $("#pjtTitle").text("증빙서류 - "+eviText);

        /*const pjtSn = $("#pjtSn").val();
        let url = "/project/getProjectDocInfo";
        const data = { pjtSn: pjtSn };
        const pjtInfo = customKendo.fn_customAjax(url, data).rs;
        $("#pjtTitle").text("결재완료문서 조회 ( " + pjtInfo.PJT_CD + " )");*/
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
                '<input type="file" id="file1" name="file1" onchange="regPayAtt.fileChange(this)" style="display: none">' +
                '<p style="margin-bottom: 0px; margin-top: 3px" id="file1Name"></p>' +
                '</td>';
            html += '<td style="text-align: center">' +
                '<label for="file2" class="k-button k-button-solid-base">파일첨부</label>' +
                '<input type="file" id="file2" name="file2" onchange="regPayAtt.fileChange(this)" style="display: none">' +
                '<p style="margin-bottom: 0px; margin-top: 3px" id="file2Name"></p>' +
                '</td>';
            html += '<td style="text-align: center">' +
                '<label for="file3" class="k-button k-button-solid-base">파일첨부</label>' +
                '<input type="file" id="file3" name="file3" onchange="regPayAtt.fileChange(this)" style="display: none">' +
                '<p style="margin-bottom: 0px; margin-top: 3px" id="file3Name"></p>' +
                '</td>';
            html += '<td style="text-align: center">' +
                '<label for="file4" class="k-button k-button-solid-base">파일첨부</label>' +
                '<input type="file" id="file4" name="file4" onchange="regPayAtt.fileChange(this)" style="display: none">' +
                '<p style="margin-bottom: 0px; margin-top: 3px" id="file4Name"></p>' +
                '</td>';
            html += '<td style="text-align: center">' +
                '<label for="file5" class="k-button k-button-solid-base">파일첨부</label>' +
                '<input type="file" id="file5" name="file5" onchange="regPayAtt.fileChange(this)" style="display: none">' +
                '<p style="margin-bottom: 0px; margin-top: 3px" id="file5Name"></p>' +
                '</td>';
        }else if(eviType == "3"){
            html += '<td style="text-align: center">' +
                '<label for="file6" class="k-button k-button-solid-base">파일첨부</label>' +
                '<input type="file" id="file6" name="file6" onchange="regPayAtt.fileChange(this)" style="display: none">' +
                '<p style="margin-bottom: 0px; margin-top: 3px" id="file6Name"></p>' +
                '</td>';
            html += '<td style="text-align: center">' +
                '<label for="file7" class="k-button k-button-solid-base">파일첨부</label>' +
                '<input type="file" id="file7" name="file7" onchange="regPayAtt.fileChange(this)" style="display: none">' +
                '<p style="margin-bottom: 0px; margin-top: 3px" id="file7Name"></p>' +
                '</td>';
            html += '<td style="text-align: center">' +
                '<label for="file8" class="k-button k-button-solid-base">파일첨부</label>' +
                '<input type="file" id="file8" name="file8" onchange="regPayAtt.fileChange(this)" style="display: none">' +
                '<p style="margin-bottom: 0px; margin-top: 3px" id="file8Name"></p>' +
                '</td>';
            html += '<td style="text-align: center">' +
                '<label for="file9" class="k-button k-button-solid-base">파일첨부</label>' +
                '<input type="file" id="file9" name="file9" onchange="regPayAtt.fileChange(this)" style="display: none">' +
                '<p style="margin-bottom: 0px; margin-top: 3px" id="file9Name"></p>' +
                '</td>';
        }else if(eviType == "5"){
            html += '<td style="text-align: center">' +
                '<label for="file10" class="k-button k-button-solid-base">파일첨부</label>' +
                '<input type="file" id="file10" name="file10" onchange="regPayAtt.fileChange(this)" style="display: none">' +
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
}