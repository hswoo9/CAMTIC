var regPayAtt = {
    fn_DefaultScript: function(){
        regPayAtt.fn_dataSet();
    },

    fn_dataSet: function(){
        const eviType = $("#eviType").val();
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
        $("#pjtTitle").text("캠매니저 증빙서류 - "+eviText);

        /*const pjtSn = $("#pjtSn").val();
        let url = "/project/getProjectDocInfo";
        const data = { pjtSn: pjtSn };
        const pjtInfo = customKendo.fn_customAjax(url, data).rs;
        $("#pjtTitle").text("결재완료문서 조회 ( " + pjtInfo.PJT_CD + " )");*/

        let html = '';

        html += '<colgroup>';
        html += '   <col width="20%">';
        html += '   <col width="20%">';
        html += '   <col width="20%">';
        html += '   <col width="20%">';
        html += '   <col width="20%">';
        html += '<thead>';
        html += '<tr>';
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
        html += '</tr>';
        html += '<tr>';
        html += "<td style='text-align: center'>" +
            "<label for=\"estFile\" class=\"k-button k-button-solid-base\">파일첨부</label>" +
            "<input type=\"file\" id=\"estFile\" name=\"estFile\" onchange=\"regPayAtt.fileChange(this)\" style=\"display: none\">" +
            "<span id=\"estFileName\"></span>"+
            "</td>";
        html += "<td style='text-align: center'>" +
            "<label for=\"estFile\" class=\"k-button k-button-solid-base\">파일첨부</label>" +
            "<input type=\"file\" id=\"estFile\" name=\"estFile\" onchange=\"regPayAtt.fileChange(this)\" style=\"display: none\">" +
            "<span id=\"estFileName\"></span>"+
            "</td>";
        html += "<td style='text-align: center'>" +
            "<label for=\"estFile\" class=\"k-button k-button-solid-base\">파일첨부</label>" +
            "<input type=\"file\" id=\"estFile\" name=\"estFile\" onchange=\"regPayAtt.fileChange(this)\" style=\"display: none\">" +
            "<span id=\"estFileName\"></span>"+
            "</td>";
        html += "<td style='text-align: center'>" +
            "<label for=\"estFile\" class=\"k-button k-button-solid-base\">파일첨부</label>" +
            "<input type=\"file\" id=\"estFile\" name=\"estFile\" onchange=\"regPayAtt.fileChange(this)\" style=\"display: none\">" +
            "<span id=\"estFileName\"></span>"+
            "</td>";
        html += "<td style='text-align: center'>" +
            "<label for=\"estFile\" class=\"k-button k-button-solid-base\">파일첨부</label>" +
            "<input type=\"file\" id=\"estFile\" name=\"estFile\" onchange=\"regPayAtt.fileChange(this)\" style=\"display: none\">" +
            "<span id=\"estFileName\"></span>"+
            "</td>";
        html += '</tr>';
        html += '<tr>';
        html += '   <th colspan="5" scope="row" class="text-center th-color">';
        html += '       <span class="red-star"></span><b>기타</b>';
        html += '   </th>';
        html += '</tr>';
        html += '<tr>';
        html += "<td colspan='5' style='text-align: center'>";
        html += '<form style="padding: 0px 30px;">' +
            '                            <div class="card-header" style="padding: 5px;">' +
            '                                <h3 class="card-title">첨부파일</h3>' +
            '                                <div class="card-options">' +
            '                                    <div class="filebox">' +
            '                                        <button type="button" class="fileUpload k-grid-button k-button k-button-md k-button-solid k-button-solid-base" id="fileUpload" onclick="$(\'#fileList\').click()">' +
            '                                            <span class="k-icon k-i-track-changes-enable k-button-icon"></span>' +
            '                                            <span class="k-button-text">파일첨부</span>' +
            '                                        </button>' +
            '                                        <input type="file" id="fileList" name="fileList" onchange="fCommon.addFileInfoTable();" multiple style="display: none"/>' +
            '                                    </div>' +
            '                                </div>' +
            '                            </div>' +
            '                            <div class="table-responsive">' +
            '                                <table class="popTable table table-bordered mb-0">' +
            '                                    <colgroup>' +
            '                                        <col width="50%">' +
            '                                        <col width="10%">' +
            '                                        <col width="30%">' +
            '                                        <col width="10%">' +
            '                                    </colgroup>' +
            '                                    <thead>' +
            '                                    <tr class="text-center th-color">' +
            '                                        <th>파일명</th>' +
            '                                        <th>확장자</th>' +
            '                                        <th>용량</th>' +
            '                                        <th>기타</th>' +
            '                                    </tr>' +
            '                                    </thead>' +
            '                                    <tbody id="fileGrid">' +
            '                                    <tr class="defultTr">' +
            '                                        <td colspan="4" style="text-align: center">선택된 파일이 없습니다.</td>' +
            '                                    </tr>' +
            '                                    </tbody>' +
            '                                </table>' +
            '                            </div>' +
            '                        </form>';
        html += '<td>';
        html += '</tr>';
        $("#popTable").html(html);
        console.log(html);
    },

    fileChange: function(){

    }
}