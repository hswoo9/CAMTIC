var popupWrite = {

    global : {
        createHtmlStr : "",
        nowPage : "",
        boardList : "",
        params : "",
        attFiles : new Array(),
        fileAllowType : "",
        popupFile : "",
        previewInput : "",
        url : "",
    },

    fn_defaultScript : function (){

        handler.removeFile();

        var dropBoxData = [
            { text : "새창", value : 0 },
            { text : "현재창", value : 1 }
        ];
        customKendo.fn_dropDownList("bannerPopupTarget", dropBoxData, "text", "value");

        var dropdownlist = $("#bannerPopupTarget").data("kendoDropDownList");
        var dataSource = dropdownlist.dataSource;
        var firstItem = dataSource.at(0);
        dataSource.remove(firstItem);

        customKendo.fn_textBox(["bannerPopupWidth", "bannerPopupHeight", "bannerPopupTop", "bannerPopupLeft", "bannerPopupLink", "bannerPopupTitle", "inputFile"]);

        var today = new Date();
        var tomorrow = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);
        var defalutStartTime = "09시";
        var defalutEndTime = "18시";

        var finalStartDt;
        var finalStartTime;
        var finalEndDt;
        var finalEndTime;

        if(!$("#returnStartDt").val()){
            finalStartDt = today;
            finalEndDt = tomorrow;
            finalStartTime = defalutStartTime;
            finalEndTime = defalutEndTime;
        }else{
            var returnStartTime = $("#returnStartTime").val();
            var returnEndTime = $("#returnEndTime").val();
            finalStartDt = $("#returnStartDt").val();
            finalEndDt = $("#returnEndDt").val();
            finalStartTime = returnStartTime + "시";
            finalEndTime = returnEndTime + "시";
        }

        customKendo.fn_datePicker("startDt", '', "yyyy-MM-dd", finalStartDt);
        customKendo.fn_datePicker("endDt", '', "yyyy-MM-dd", finalEndDt);

        $("#startDt").on("change", function(){
            if($(this).val() > $("#endDt").val()){
                $("#endDt").val($(this).val());
            }
        });
        $("#endDt").on("change", function(){
            if($(this).val() < $("#startDt").val()){
                $("#startDt").val($(this).val());
            }
        });
        customKendo.fn_timePicker("startTime", 60, "HH시", finalStartTime);
        customKendo.fn_timePicker("endTime", 60, "HH시", finalEndTime);

        $("#startDt, #endDt, #startTime, #endTime").attr("readonly", true);

        if($("#uuid").val() != ""){
            $("#chkUseAt" + $("#returnUseAt").val()).prop("checked", true);
            $("#chkGubun" + $("#returnGubun").val()).prop("checked", true);
            $("#bannerPopupTarget").data("kendoDropDownList").select(Number($("#returnTarget").val()));

            if ($("#returnCenterYn").val() == 'Y') {
                $("#chkCenter").prop("checked", true);
            }
        }else{
            $("#chkUseAt0").prop("checked", true);
            $("#chkGubun1").prop("checked", true);
            $("#bannerPopupTarget").data("kendoDropDownList").select(1);
        }

        $("#files").change(function() {
            popupWrite.readURL(this);
        });

        popupWrite.clock();
    },

    setPopupWrite : function(){
        var startDate = $("#startDt").val();
        var startTime = $("#startTime").data("kendoTimePicker").value().getHours();

        if(startTime < 10){
            startTime = "0" + startTime;
        }
        var endDate = $("#endDt").val();
        var endTime = $("#endTime").data("kendoTimePicker").value().getHours();

        if(endTime < 10){
            endTime = "0" + endTime;
        }

        // date와 time을 DATETIME(6) 형식으로 조합
        var startDateTime = startDate + " " + startTime + ":00.000000";
        var endDateTime = endDate + " " + endTime + ":00.000000";

        var useAt = $("input[name='chkUseAt']:checked").val();

        //출력형식 구분
        var cGroup = 'popup';
        var bannerPopupGroup;
        var bannerPopupGubun;

        var cGubun = $("input[name='chkGubun']:checked").val();

        if (cGroup == 'popup') {
            bannerPopupGroup = 1;
        }else{
            bannerPopupGroup = 0;
        }

        if (cGubun != null && cGubun != undefined) {
            bannerPopupGubun = Number(cGubun);
        }

        if (!$("#bannerPopupWidth").val()) {
            $("#bannerPopupWidth").val(500);
        }
        if (!$("#bannerPopupHeight").val()) {
            $("#bannerPopupHeight").val(500);
        }
        if (!$("#bannerPopupTop").val()) {
            $("#bannerPopupTop").val(0);
        }
        if (!$("#bannerPopupLeft").val()) {
            $("#bannerPopupLeft").val(0);
        }
        if (!$("#bannerPopupTitle").val()) {
            alert('제목을 입력해주십시오.');
            $("#bannerPopupTitle").focus();
            return false;
        }

        if (startDate || endDate ) {
            startDate = startDate.replace(/(-)/g, '');
            endDate = endDate.replace(/(-)/g, '');

            if(!startDate){
                alert("시작일시를 입력해주세요.");
                return false;
            }
            if(!endDate){
                alert("종료일시를 입력해주세요.");
                return false;
            }
            if (endDate < startDate && endDate) {
                alert("종료일시가 잘못 입력되었습니다.");
                $("#endDt").val('');
                $("#endDt").focus();
                return false;
            }
        }

        if(confirm("등록하시겠습니까?")){
            var formData = new FormData();
            formData.append("bannerPopupGroup", bannerPopupGroup);
            formData.append("bannerPopupGubun", bannerPopupGubun);
            formData.append("bannerPopupWidth", $("#bannerPopupWidth").val());
            formData.append("bannerPopupHeight", $("#bannerPopupHeight").val());
            formData.append("bannerPopupTop", $("#bannerPopupTop").val());
            formData.append("bannerPopupLeft", $("#bannerPopupLeft").val());
            formData.append("bannerPopupLink", $("#bannerPopupLink").val());
            formData.append("bannerPopupTarget", $("#bannerPopupTarget").val());
            formData.append("bannerPopupStartDt", startDateTime);
            formData.append("bannerPopupEndDt", endDateTime);
            formData.append("bannerPopupTitle", $("#bannerPopupTitle").val());
            formData.append("id", $("#regEmpSeq").val());
            formData.append("useAt", useAt);
            formData.append("popupFile", popupWrite.global.popupFile);
            formData.append("gubun", $("#mode").val());
            formData.append("menuCd", "popup");

            var chkCenterYn = $('#chkCenter').prop('checked');
            var centerYn = chkCenterYn ? 'Y' : 'N';

            formData.append("centerYn", centerYn);

            if ($("#uuid").val() != "" && $("#uuid").val() != null) {
                formData.append("uuid", $("#uuid").val());
            }

            //첨부파일
            if(popupWrite.global.attFiles.length > 0){
                for(var i = 0; i < popupWrite.global.attFiles.length; i++){
                    formData.append("file", popupWrite.global.attFiles[i]);
                }
            }

            $.ajax({
                url :  "/mngr/bannerpopup/save",
                type : 'POST',
                data : formData,
                dataType : "json",
                contentType: false,
                processData: false,
                enctype : 'multipart/form-data',
                async : false,
                success : function(){
                    alert("저장이 완료되었습니다.");
                    window.close();
                    window.opener.gridReload();
                },
                error : function (request,status,error) {
                    alert("오류가 발생하였습니다. 관리자에게 문의하세요.\n errorCode :"+request.responseText+"\n");
                }
            })
        }
    },

    addFile : function(){
        var indexList = [];
        for(var i = 0; i < $("#fileList")[0].files.length; i++){
            if($.inArray($("#fileList")[0].files[i].name.split('.').pop().toLowerCase(), popupWrite.global.fileAllowType.split(",")) < 0){
                alert("등록 불가능한 확장자 입니다.\n[등록가능 확장자 : " + popupWrite.global.fileAllowType.replaceAll(",", ", ") + "]");
                indexList.push(i);
            }else{
                if(!popupWrite.global.attFiles.find(e => e.lastModified == $("#fileList")[0].files[i].lastModified)){
                    popupWrite.global.attFiles.push($("#fileList")[0].files[i]);
                }
            }
        }

        for(var i = 0; i < indexList.length; i++){
            const dataTransfer = new DataTransfer();
            let files = $('#fileList')[0].files;
            let fileArray = Array.from(files);
            fileArray.splice(indexList[i], 1);
            fileArray.forEach(file => { dataTransfer.items.add(file); });
            $('#fileList')[0].files = dataTransfer.files;	//제거 처리된 FileList를 돌려줌
        }

        $("#inputFile").find("p.addFile").remove()
        if(popupWrite.global.attFiles.length > 0){
            var html = '';
            for (var i = 0; i < popupWrite.global.attFiles.length; i++) {
                html += '<p style="margin-right: 15px;height: 46px;line-height: 45px;font-size: 1.5rem" class="addFile" id="' + popupWrite.global.attFiles[i].lastModified + '">';
                html +=     popupWrite.global.attFiles[i].name;
                html +=     '<button data-index="' + popupWrite.global.attFiles[i].lastModified + '" fileIndex="' + i + '" class="file-remove" style="margin-left: 10px;cursor: pointer;font-size:2rem;width: 24px;font-weight: bold;background: #ffffff">X</button>';
                html += '</p>';
            }

            $("#inputFile").append(html);
        }
    },

    fileDel : function(e){
        if(confirm("삭제한 파일은 복구할 수 없습니다.\n그래도 삭제하시겠습니까?")){
            var result = popupWrite.setFileDel($(e).attr("id"));
            if(result.code == "500"){
                alert(result.message);
                return;
            }else{
                alert("삭제되었습니다.");
                $(e).closest("p").remove();
            }
        }
    },

    setFileDel : function(e){
        var result = '';
        var ajaxOpt = {
            url : "/common/setFileDel",
            async: false,
            data : {
                fileDataIdx : e
            },
            successFn : function(data){
                result = data.rs;
            },
            failFn : function (request,status,error) {
                alert("오류가 발생하였습니다. 관리자에게 문의하세요.\n errorCode :"+request.responseText+"\n");
            }
        };
        acUtil.ajax.call(ajaxOpt);

        return result;
    },

    clock : function() {
        var date = new Date();

        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        var clockDate = date.getDate();
        var day = date.getDay();
        var week = ['일', '월', '화', '수', '목', '금', '토'];
        var hours = String(date.getHours()).padStart(2,"0");
        var minutes = String(date.getMinutes()).padStart(2,"0");
        var seconds = String(date.getSeconds()).padStart(2,"0");

        var clockTarget = document.getElementById("clock");

        var time = year + "년 " + month + "월 " + clockDate + "일 " + week[day] + "요일 " + hours + "시";

        clockTarget .innerText = time;

        setTimeout(popupWrite.clock(), 1000);
    },

    readURL : function(input) {
        state = 'new';

        popupWrite.global.previewInput = input;
        $("#inputFile").val($("#files")[0].files[0].name);

        var ext = $('#files').val().split('.').pop().toLowerCase();

        if ($.inArray(ext, ['jpg', 'png']) == -1) {
            alert("jpg/png 확장자만 업로드 가능합니다.");
            $("#inputFile").val("");
            $("#files").val("");
            $("#preview").removeAttr('src');
            return false;
        }

        if (input.files && input.files[0]) {
            var reader = new FileReader();
            reader.onload = function (e) {
                document.getElementById('preview').src = e.target.result;

                var originalImage = new Image();
                originalImage.src = e.target.result;
                originalImage.onload = function() {
                    // 이미지 크기를 1/3으로 조절
                    var canvas = document.createElement('canvas');
                    var context = canvas.getContext('2d');
                    canvas.width = originalImage.naturalWidth / 3;
                    canvas.height = originalImage.naturalHeight / 3;
                    context.drawImage(originalImage, 0, 0, canvas.width, canvas.height);

                    // 조절된 이미지를 미리보기에 출력 (png 또는 jpg로 출력)
                    if (ext === 'jpg') {
                        document.getElementById('preview').src = canvas.toDataURL('image/jpeg');
                    } else if (ext === 'png') {
                        document.getElementById('preview').src = canvas.toDataURL('image/png');
                    }

                    $("#previewDiv").css("width", canvas.width);
                    $("#previewDiv").css("height", canvas.height);
                }
            };
            reader.readAsDataURL(input.files[0]);
        } else {
            document.getElementById('preview').src = "";
        }
        popupWrite.global.popupFile = input.files[0];
    },


    //첨부파일 이미지 미리보기 팝업
    previewPopup : function(){
        var reader = new FileReader();

        if($("#uuid").val() == "") {
            if ($("#files").val() != "") {
                reader.readAsDataURL(popupWrite.global.previewInput.files[0]);
                reader.onload = function (e) {
                    var base64URL = e.target.result;
                    var img = new Image();

                    //base64 URL을 직접 열기 위한 우회
                    img.src = base64URL;
                    img.onload = function () {
                        var imgWidth = img.width;
                        var imgHeight = img.height;
                        var win = window.open('', '미리보기', 'width=' + imgWidth + ', height=' + imgHeight + ', location=no, scrollbars=no');
                        var html = '';

                        html += '<title>';
                        html += '이미지 미리보기';
                        html += '</title>';
                        html += '<div style="overflow-x: hidden;">';
                        html += '<img src="' + base64URL + '" style="border:0;" allowfullscreen />';
                        html += '</div>';

                        win.document.write(html);
                    };
                };
            } else {
                alert("이미지가 없습니다.");
            }
        }else{
            var img = document.getElementById("preview");
            var src = $("#preview").attr("src");

            var host = $(location).attr("host").split(":")[0];

            var url = "http://" + host + src;

            //base64 URL을 직접 열기 위한 우회
            var imgWidth = img.naturalWidth; // 이미지의 너비
            var imgHeight = img.naturalHeight; // 이미지의 높이
            var win = window.open('', '미리보기', 'width=' + imgWidth + ', height=' + imgHeight + ', location=no, scrollbars=no');
            var html = '';

            html += '<title>';
            html += '이미지 미리보기';
            html += '</title>';
            html += '<div style="overflow-x: hidden;">';
            html += '   <img src="' + url + '" style="border:0;" allowfullscreen />';
            html += '</div>';

            win.document.write(html);
        }
    },

    setImage : function(){
        var img = document.getElementById("preview");
        var imgWidth = img.naturalWidth / 3; // 이미지의 너비
        var imgHeight = img.naturalHeight / 3; // 이미지의 높이

        // 이미지의 width 및 height 속성을 변경
        $("#previewDiv").css("width", imgWidth);
        $("#previewDiv").css("height", imgHeight);
    },

    fileDown : function (filePath, fileName) {
        kendo.saveAs({
            dataURI: "/common/fileDownload.do?filePath=" + filePath + "&fileName=" + encodeURIComponent(fileName),
        });
    }
}

const handler = {
    removeFile: () => {
        document.addEventListener('click', (e) => {
            if(e.target.className !== 'file-remove') return;
            const dataTransfer = new DataTransfer();
            const removeTargetIndex = $(e.target).attr("fileIndex");
            let fileArray = Array.from(popupWrite.global.attFiles);
            fileArray.splice(removeTargetIndex, 1);
            fileArray.forEach(file => {
                dataTransfer.items.add(file);
            });

            popupWrite.global.attFiles = dataTransfer.files;
            document.querySelector('#fileList').files = dataTransfer.files;

            $("#inputFile").find("p.addFile").remove()
            if(popupWrite.global.attFiles.length > 0){
                var html = '';
                for (var i = 0; i < popupWrite.global.attFiles.length; i++) {
                    html += '<p style="margin-right: 15px;height: 46px;line-height: 45px;font-size: 1.5rem" class="addFile" id="' + popupWrite.global.attFiles[i].lastModified + '">';
                    html +=     popupWrite.global.attFiles[i].name;
                    html +=     '<button data-index="' + popupWrite.global.attFiles[i].lastModified + '" fileIndex="' + i + '" class="file-remove" style="margin-left: 10px;cursor: pointer;font-size:2rem;width: 24px;font-weight: bold;background: #ffffff">X</button>';
                    html += '</p>';
                }

                $("#inputFile").append(html);
            }

            if(popupWrite.global.attFiles.length == 0){
                popupWrite.global.attFiles = new Array();
            }

            popupWrite.global.attFiles = Array.from(popupWrite.global.attFiles);
        })
    }
}