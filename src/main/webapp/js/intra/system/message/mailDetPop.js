var mailDetPop = {

    global : {
        attFiles : [],
        list : [],
    },

    fn_defaultScript: function(){
        this.fn_pageSet();
        this.fn_mainGrid();
    },

    gridReload: function(){
        $("#mailDetGrid").data("kendoGrid").dataSource.read();
    },

    fn_mainGrid: function(){
        let dataSource = new kendo.data.DataSource({
            serverPaging: false,
            transport: {
                read : {
                    url : "/message/getMailDetList",
                    dataType : "json",
                    type : "post"
                },
                parameterMap: function(data){
                    data.mailHistSn = $("#mailHistSn").val();
                    return data;
                }
            },
            schema : {
                data: function (data) {
                    return data.list;
                },
                total: function (data) {
                    return data.list.length;
                },
            },
            pageSize: 10
        });

        $("#mailDetGrid").kendoGrid({
            dataSource: dataSource,
            sortable: true,
            scrollable: true,
            selectable: "row",
            height: 489,
            pageable : {
                refresh : true,
                pageSizes : [ 10, 20, 50, "ALL" ],
                buttonCount : 5
            },
            noRecords: {
                template: "데이터가 존재하지 않습니다."
            },
            columns: [
                {
                    headerTemplate: '<input type="checkbox" id="checkAll" name="checkAll" onclick="fn_checkAll(\'checkAll\', \'mailHistDetSn\');"/>',
                    width: 50,
                    template: function(row){
                        if(row.SEND_YN == "N"){
                            return "<input type='checkbox' id='mailHistDetSn"+row.MAIL_HIST_DET_SN+"' name='mailHistDetSn' class='mailHistDetSn' value='"+row.MAIL_HIST_DET_SN+"'/>";
                        }else{
                            return "";
                        }
                    }
                }, {
                    title: "번호",
                    width: 50,
                    template: "#= --record #"
                }, {
                    field: "MAIL_TILE",
                    title: "제목",
                    width: 150
                }, {
                    field: "NAME",
                    title: "성명",
                    width: 150,
                }, {
                    field: "EMAIL",
                    title: "메일주소",
                    width: 150
                }, {
                    title: "발송상태",
                    width: 150,
                    template: function(row){
                        if(row.SEND_YN == "N"){
                            return "미발송";
                        }else{
                            return "발송 "+row.SEND_DATE;
                        }
                    }
                }

            ],
            dataBinding: function(){
                record = fn_getRowNum(this, 2);
            }
        }).data("kendoGrid");
    },

    fn_pageSet: function(){
        $("#excelUpload").kendoWindow({
            title : "엑셀업로드",
            width: "700px",
            visible: false,
            modal: true,
            position : {
                top : 200,
                left : 200
            },
            open : function (){
                var htmlStr =
                    '<div class="mb-10" style="text-align: right;">' +
                    '	<button type="button" id="download" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-info" onclick="mailDetPop.fileDown()">양식다운로드</button>' +
                    '	<button type="button" id="upload" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-info" onclick="mailDetPop.fn_excelUpload()">업로드</button>' +
                    '	<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-error" onclick="$(\'#excelUpload \').data(\'kendoWindow\').close()">닫기</button>' +
                    '</div>' +
                    '<table class="table table-bordered mb-0" style="margin-top: 10px">' +
                    '	<colgroup>' +
                    '		<col width="20%">' +
                    '		<col width="80%">' +
                    '	</colgroup>' +
                    '	<tbody>' +
                    '		<tr>' +
                    '			<th scope="row" class="text-center th-color"><span style="position:relative; top: 9px;">엑셀업로드</span></th>' +
                    '			<td>' +
                    '               <div>' +
                    '	                <input type="file" id="excelUploadFile" onchange="mailDetPop.fileSv(event)" /> ' +
                    '               </div>' +
                    '			</td>' +
                    '		</tr>' +
                    '	</tbody>' +
                    '</table>';


                $("#excelUpload").html(htmlStr);

                // modalKendoSetCmCodeCM();
                $("#excelUploadFile").kendoTextBox();
            },
            close: function () {
                $("#excelUpload").empty();
            }
        });
    },

    fn_excelUpload: function(){
        const excelArr = new Array();
        const event = mailDetPop.global.event;
        const input = event.target;
        const reader = new FileReader();
        reader.onload = function(){
            const fData = reader.result;
            const read_buffer = XLSX.read(fData, {type : 'binary'});
            read_buffer.SheetNames.forEach(function(sheetName){
                const rowData = XLSX.utils.sheet_to_json(read_buffer.Sheets[sheetName]);
                console.log("rowData", rowData);

                for(let i = 0; i < rowData.length; i++){

                    if(rowData[i]["성명"] != undefined && rowData[i]["성명"] != null && rowData[i]["성명"] != ""){
                    }else{
                        alert(22);
                        continue;
                    }

                    if(rowData[i]["메일주소"] != undefined && rowData[i]["메일주소"] != null && rowData[i]["메일주소"] != ""){
                    }else{
                        alert(23);
                        continue;
                    }

                    const name = String(rowData[i]["성명"]);
                    const email = String(rowData[i]["메일주소"]);

                    excelArr.push({
                        name : name,
                        email : email
                    });
                }

                console.log("excelArr", excelArr);
                console.log("JSON.stringify(excelArr)", JSON.stringify(excelArr));

                var formData = new FormData();
                formData.append("mailHistSn", $("#mailHistSn").val());
                formData.append("itemArr", JSON.stringify(excelArr));
                const result = customKendo.fn_customFormDataAjax("/system/setMailDet", formData);
                if(result.params.code == "200"){
                    alert("저장되었습니다.");
                    mailDetPop.gridReload();
                }
            });
        };
        reader.readAsBinaryString(input.files[0]);
        $('#excelUpload').data('kendoWindow').close();
    },

    fn_excelUploadModal: function(){
        $("#excelUpload").data("kendoWindow").open();
    },

    fileSv: function(event){
        mailDetPop.global.event = event;
    },

    fileDown: function(filePath, fileName){
        filePath = "/upload/excelForm"
        fileName = "메일업로드양식.xlsx";
        kendo.saveAs({
            dataURI: "/common/fileDownload.do?filePath=" + filePath + "/mailReqExcelUpload.xlsx&fileName=" + encodeURIComponent(fileName),
        });
    },

    fn_sendMailSel: function(){
        const mailHistSn = $("#mailHistSn").val();
        let mailArr = [];
        $("input[name=mailHistDetSn]:checked").each(function(i){
            mailArr.push($(this).val());
        })
        if(mailArr.length == 0) {
            alert("수신자가 선택되지 않았습니다.");
            return;
        }
        const data = {
            mailArr: mailArr.join(),
            mailHistSn: mailHistSn
        }
        const result = customKendo.fn_customAjax("/system/sendMailSel", data);
        if(result.flag){
            var rs = result.rs;
            if(rs == "SUCCESS"){
                alert("전송되었습니다.");
                mailDetPop.gridReload();
            }
        }
    },

    fn_sendMailAll: function(){
        const mailHistSn = $("#mailHistSn").val();
        const data = {
            mailHistSn: mailHistSn,
            ck: "All"
        }
        const resultList = customKendo.fn_customAjax("/message/getMailDetList", data);
        const list = resultList.list;
        console.log("AllList", list);

        if(list.length == 0){
            alert("발송가능한 수신자가 없습니다."); return;
        }

        const result = customKendo.fn_customAjax("/system/sendMailSel", data);
        if(result.flag){
            var rs = result.rs;
            if(rs == "SUCCESS"){
                alert("전송되었습니다.");
                mailDetPop.gridReload();
            }
        }

    }
}