<%--
  Created by IntelliJ IDEA.
  User: user
  Date: 2023-03-13
  Time: 오후 2:10
  To change this template use File | Settings | File Templates.
--%>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c"       uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<jsp:useBean id="today" class="java.util.Date" />
<script type = "text/javascript" src = "https://cdnjs.cloudflare.com/ajax/libs/jspdf/1.5.3/jspdf.min.js"></script>
<script type = "text/javascript" src = "https://html2canvas.hertzen.com/dist/html2canvas.min.js"></script>
<script type="text/javascript" src="/js/intra/inside/userManage/employmentReq.js?v=${toDate}"/></script>
<style>
    .k-grid-toolbar {
        justify-content: flex-end !important;
    }

    .k-editor-toolbar {
        display: flex;
        flex-direction: row;
        justify-content: flex-end;
    }
    .k-editor-toolbar > .k-tool-group:first-child {
        margin-right: 0;
    }
    .k-editor-toolbar > .k-tool-group:last-child {
        margin-right: 5px;
    }
</style>

<input type="hidden" id="empSeq" value="${loginVO.uniqId}"/>
<input type="hidden" id="deptSeq" value="${loginVO.orgnztId}"/>
<input type="hidden" id="deptName" value="${loginVO.orgnztNm}"/>

<div class="col-md-10 col-lg-10 dash-left">
    <div class="panel">
        <div class="panel-heading">
            <h4 class="panel-title">근로계약서 작성</h4>
            <div class="title-road">인사관리 > 임용문서관리 > 근로계약서 작성</div>
        </div>

        <div class="panel-body">
            <div id="startView" style="padding: 10px 0 0 0; border-top: 2px solid #dfdfdf;"></div>

            <div>
                <textarea id="editor" style="height: 920px;">
                </textarea>
            </div>
            <div style="float:right; margin-top: 10px;">
                <button type="button" id="drawSign" class="k-button k-button-solid-base k-button-md">
                    <span class="k-icon k-i-file-pdf"></span> PDF 다운로드
                </button>
            </div>
        </div>

    </div>

    <div class="panel">
        <div class="panel-heading">
            <h4 class="panel-title">근로계약서</h4>
        </div>

        <div class="panel-body">
            <div id="secondView" style="padding: 10px 0 0 0; border-top: 2px solid #dfdfdf;"></div>

            <div id="mainGrid"></div>
        </div>

    </div>
</div><!-- col-md-9 -->

<script>

    kendoSetting();

    $('#drawSign').click(function(){
        var url = "/Inside/pop/sign/popDrawSignView.do?code=5";
        var name = "drawSignPop";
        var option = "width = 340, height = 390, top = 100, left = 200, location = no"
        var popup = window.open(url, name, option);
    });

    var html = '<table role="grid" style="margin-left:auto; margin-right:auto; max-width: none; border-collapse: separate; border-spacing: 0; empty-cells: show; font-size:14px; line-height:40px; width:630px;">'
        + '    <tr contenteditable="false">'
        + '    <th colspan="4" style="height: 150px;"><input type="text" style="width: 80%;border : none;text-align: center; font-size:23px; font-weight:bold; color: #4a4a4a;" value="근로계약서" readonly/></th>'
        + '</tr>'
        + '<tr contenteditable="false">'
        + '    <td colspan="4" style="height: 150px; padding: 5px 0; color: #4a4a4a; text-align:center;">'
        + '        <br>'
        + '        '
        + '        '
        + '    </td>'
        + '</tr>'
        + '<tr>'
        + '    <td colspan="4" style="height: 200px; padding: 5px 0; color: #4a4a4a; text-align:center;">'
        + '        <span></span>년 <span></span>월 <span></span>일'
        + '    </td>'
        + '</tr>'
        + '<tr>'
        + '    <td rowspan="3" style="height: 50px; padding: 5px 0; color: #4a4a4a; text-align:right; vertical-align: top;"><input type="text" style="width: 20%;border : none;text-align: center;" value="서약자" readonly/></td>'
        + '    <td style="width:20px; height: 50px; padding: 5px 0; color: #4a4a4a; text-align:center;"></td>'
        + '    <td style="height: 50px; padding: 5px 0; color: #4a4a4a; text-align:left; vertical-align: top;"><input type="text" style="width: 30%;border : none;text-align: center;" value="소 속 : " readonly/></td>'
        + '    <td style="height: 50px; padding: 5px 0; color: #4a4a4a; text-align:center;"></td>'
        + '</tr>'
        + '<tr>'
        + '    <td style="width:20px; height: 50px; padding: 5px 0; color: #4a4a4a; text-align:center;"></td>'
        + '    <td style="height: 50px; padding: 5px 0; color: #4a4a4a; text-align:left; vertical-align: top;"><input type="text" style="width: 30%;border : none;text-align: center;" value="직 급 : " readonly/></td>'
        + '    <td style="height: 50px; padding: 5px 0; color: #4a4a4a; text-align:center;"></td>'
        + '</tr>'
        + '<tr>'
        + '    <td style="width:20px; height: 50px; padding: 5px 0; color: #4a4a4a; text-align:center;"></td>'
        + '    <td style="height: 50px; padding: 5px 0; color: #4a4a4a; text-align:left; vertical-align: top;"><input type="text" style="width: 30%;border : none;text-align: center;" value="성 명 :" readonly/></td>'
        + '    <td style="height: 50px; padding: 5px 0; color: #4a4a4a; text-align:left; vertical-align: top;">(인)<span id="signVal"></span></td>'
        + '</tr>'
        + '<tr contenteditable="false">'
        + '    <td colspan="4" style="height:150px; padding: 5px 0; text-align:center;">'
        + '         <span><input type="text" style="border : none;color: #4a4a4a;font-weight:bold; font-size:18px;width:42%;" value="캠틱종합기술원" readonly/></span>'
        + '         <span><input type="text" style="border : none;font-size:12px;width:7%;" value="귀하" readonly/></span>'
        + '    </td>'
        + '</tr>'
        + '</table>';


    function editorReload(e, url){
        var imgUrl = '<img src="'+url+'" height="50" width="50" style="position: absolute; text-align: center; transform: translate(-40px, -17px);"/>';
        console.log($("iframe").contents().find("#signVal").html(imgUrl));
    }

    $("#editor").kendoEditor({
        value: html,
        encoded: false,
        tools: [
            "undo",
            "redo",
        ]
    });

    var editor = $("#editorTest").data("kendoEditor");

    function htmlToPdf(){

        var textarea = $('iframe').contents().find("html")
        html2canvas(textarea[0],{
            //logging : true,		// 디버그 목적 로그
            //proxy: "html2canvasproxy.php",
            allowTaint : true,	// cross-origin allow
            useCORS: true,		// CORS 사용한 서버로부터 이미지 로드할 것인지 여부
            scale : 2			// 기본 96dpi에서 해상도를 두 배로 증가

        }).then(function(canvas){
            // 캔버스를 이미지로 변환
            var imgData = canvas.toDataURL('image/png');
            var doc = new jsPDF('p', 'mm');

            // 첫 페이지 출력
            doc.addImage(imgData, 'PNG', -110, 25, 430, 250);

            // 파일 저장
            doc.save('근로계약서.pdf');
        });


    };

    function kendoSetting(){
        $("#fileAppendM").kendoWindow({
            width : "700px",
            height : "350px",
            visible: false,
            modal: true,
            position : {
                top : 1100,
                left : 700
            },
            open : function () {
                var htmlStr = '<div class="card-header" style="margin-left:8px;">' +
                    '<h3 class="card-title" style="font-size:18px;">파일업로드</h3>' +
                    '</div>' +
                    '<div class="table-responsive">' +
                    '    <table class="table subbtnBox">' +
                    '        <tbody>' +
                    '            <tr>' +
                    '                <th class="bgfont-color text-center">파일첨부</th>' +
                    '                <td style="display: flex; border-top:0;">' +
                    '                    <input type="text" id="inputFile" style="width: 80%; border: 1px solid #bbb;">' +
                    '                        <div class="filebox" style="width: 20%;">' +
                    '                            <label for="fileList" class="fileUpload" style="margin:0 0 0 5px; height:auto">파일첨부</label>' +
                    '                            <input type="file" id="fileList" name="fileList" class="hidden" onchange="getFileNm(\'Mopen\');" />' +
                    '                        </div>' +
                    '                </td>' +
                    '            </tr>' +
                    '        </tbody>' +
                    '    </table>' +
                    '    <div class="spanft">' +
                    '        <span class="red-star" style="margin-left:30px;">10MB이하</span>의 <span class="red-star">PDF</span>파일만 등록할 수 있습니다.' +
                    '    </div>' +
                    '    <div class="btn-st" style="margin:30px 24px 0 0;">' +
                    '        <input type="reset" style="margin-right:5px;" class="cancelBtn" id="uploadCancle" value="취소" onclick="$(\'#fileAppendM\').data(\'kendoWindow\').close();" />' +
                    '        <input type="button" class="saveBtn" id="uploadSave" value="저장" onclick="securityFileUpload()" />' +
                    '    </div>' +
                    '</div>';

                $('#fileAppendM').html(htmlStr);

                $('#fileAppendM').parent().find('.k-window-titlebar').css('background-color', '#333948')
                $('#fileAppendM').parent().find('.k-window-actions').css('color', 'white');
            },
            close: function () {
                $("#fileAppendM").empty();
            }
        });
    }

    function getFileNm(type){
        var attFiles = new Array();

        if($("input[name='fileList']")[0].files[0].name.split(".")[1] != "pdf"){
            alert("PDF 확장자만 업로드할 수 있습니다.");
            return;
        }

        if(type != null){
            for(var i = 0; i < $("input[name='fileList']")[0].files.length; i++){
                attFiles.push($("input[name='fileList']")[0].files[i]);
            }
        }

        var filesLength = attFiles.length;

        if(filesLength > 1){
            $("#inputFile").val(attFiles[0].name + " 등 " + filesLength + "개")
        } else if(filesLength == 1){
            $("#inputFile").val(attFiles[0].name)
        }
    }

    //파일업로드
    function securityFileUpload(){
        var formData = new FormData();

        formData.append("fileList", $("#fileList")[0].files[0]);
        formData.append("menuCd", $("#menuCd").val() + "_secReq");
        formData.append("loginEmpSeq", $("#empSeq").val());
        formData.append("empSeq", $("#empSeq").val());

        $.ajax({
            url: "<c:url value=''/>",
            data: formData,
            type: "post",
            dataType: "json",
            contentType : false,
            processData : false,
            success: function () {
                alert("등록이 완료되었습니다.");
                // 팝업 closed
                $('#fileAppendM').data('kendoWindow').close();

            },
            error : function(){
                alert("등록 중 에러가 발생했습니다.");
            }
        });
    }

    //그리드영역
    var dataSource = new kendo.data.DataSource({
        serverPaging: false,
        transport: {
            read : {
                url : "<c:url value=''/>",
                dataType : "json",
                type : "post",
                async : false
            },
            parameterMap: function(data, operation) {
                data.empSeq = $("#empSeq").val();
                data.menuCd = $("#menuCd").val() + "_secReq";
                return data;
            }
        },
        schema : {
            data: function (data) {
                return data.rs;
            },
            total: function (data) {
                record = data.rs.length;

                return record;
            },
        }
    });

    $("#mainGrid").kendoGrid({
        dataSource: dataSource,
        height: 300,
        sortable: true,
        scrollable: true,
        toolbar : [
            {
                name : 'button',
                template : function (e){
                    return '<button type="button" class="k-grid-button k-button k-button-md k-rounded-md k-button-solid k-button-solid-base" onclick="$(\'#fileAppendM\').data(\'kendoWindow\').open();">' +
                        '	<span class="k-button-text">파일첨부</span>' +
                        '</button>';
                }
            }
        ],
        noRecords: {
            template: "데이터가 존재하지 않습니다."
        },
        //dataBound : onDataBound,
        columns: [
            {
                title: "번호",
                width: 50,
                template: "#= record-- #"
            }, {
                field: "file_org_name",
                title: "파일명",
                width: 50,
            },{
                field: "REG_DATE",
                title: "날짜",
                width: 50,
            },
            {
                title: "기타",
                template : function (e){
                    return '<button type="button" class="k-button k-button-md k-rounded-md k-button-solid k-button-solid-base" style="margin-right: 5px;" onclick="employmentFileDownload()">' +
                        '	<span class="k-button-text">다운로드</span>' +
                        '</button>'; /*+
						'<button type="button" class="k-button k-button-md k-rounded-md k-button-solid k-button-solid-base">' +
						'	<span class="k-button-text">삭제</span>' +
						'</button>';*/
                },
                width: 50,
            },]
    }).data("kendoGrid");
</script>
</body>
