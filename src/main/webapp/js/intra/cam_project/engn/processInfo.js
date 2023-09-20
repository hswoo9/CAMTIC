var processInfo = {




    fn_defaultScript : function (){

        var data= {
            pjtSn : $("#pjtSn").val(),
            empSeq : $("#regEmpSeq").val()
        }
        $.ajax({
            url : "/project/getPsList",
            data : data,
            dataType : "json",
            type : "post",
            success : function(rs){
                var pf1 = rs.psFileList.psFile1List;
                var pf2 = rs.psFileList.psFile2List;
                var pf3 = rs.psFileList.psFile3List;

                console.log(rs);
                var rs = rs.psList;

                for(var i = 0 ; i < rs.length ; i++){
                    if(rs[i].PS_EMP_SEQ == null || rs[i].PS_EMP_SEQ == ""){
                        $("#commFileHtml" + Number(rs[i].PS_PREP)).css("display", "none");
                    } else {
                        var arr = rs[i].PS_EMP_SEQ.split(",");
                        var flag = false;
                        for(var j = 0 ; j < arr.length ; j++) {
                            if(data.empSeq == arr[j]){
                                flag = true;
                            }
                        }
                        if (flag){
                            $("#commFileHtml" + Number(rs[i].PS_PREP)).css("display", "");
                        }
                    }
                }

                $("#file1Etc").val(rs[0].FILE_ETC1);
                $("#file2Etc").val(rs[0].FILE_ETC2);
                $("#file3Etc").val(rs[0].FILE_ETC3);


                if(pf1.length != 0){
                    var html = '';

                    for(var i = 0; i < pf1.length; i++){
                        html += '<tr style="text-align: center">';
                        html += '   <td>'+ pf1[i].file_org_name +'</td>';
                        html += '   <td>'+ pf1[i].file_ext +'</td>';
                        html += '   <td>'+ pf1[i].file_size +'</td>';
                        html += '   <td>' +
                            '           <button type="button" class="k-button k-rounded k-button-solid k-button-solid-error" onclick="fCommon.commonFileDel('+ pf1.file_no +', this)">' +
                            '			    <span class="k-button-text">삭제</span>' +
                            '		    </button>';
                        html += '   </td>';
                        html += '</tr>';
                    }
                    $("#fileGrid1").html(html);
                } else {
                    $("#fileGrid1").html('<tr>' +
                    '	<td colspan="4" style="text-align: center">선택된 파일이 없습니다.</td>' +
                    '</tr>');
                }

                if(pf2.length != 0){
                    var html = '';

                    for(var i = 0; i < pf2.length; i++){
                        html += '<tr style="text-align: center">';
                        html += '   <td>'+ pf2[i].file_org_name +'</td>';
                        html += '   <td>'+ pf2[i].file_ext +'</td>';
                        html += '   <td>'+ pf2[i].file_size +'</td>';
                        html += '   <td>' +
                            '           <button type="button" class="k-button k-rounded k-button-solid k-button-solid-error" onclick="fCommon.commonFileDel('+ pf1.file_no +', this)">' +
                            '			    <span class="k-button-text">삭제</span>' +
                            '		    </button>';
                        html += '   </td>';
                        html += '</tr>';
                    }
                    $("#fileGrid2").html(html);
                } else {
                    $("#fileGrid2").html('<tr>' +
                        '	<td colspan="4" style="text-align: center">선택된 파일이 없습니다.</td>' +
                        '</tr>');
                }

                if(pf3.length != 0){
                    var html = '';

                    for(var i = 0; i < pf3.length; i++){
                        html += '<tr style="text-align: center">';
                        html += '   <td>'+ pf3[i].file_org_name +'</td>';
                        html += '   <td>'+ pf3[i].file_ext +'</td>';
                        html += '   <td>'+ pf3[i].file_size +'</td>';
                        html += '   <td>' +
                            '           <button type="button" class="k-button k-rounded k-button-solid k-button-solid-error" onclick="fCommon.commonFileDel('+ pf1.file_no +', this)">' +
                            '			    <span class="k-button-text">삭제</span>' +
                            '		    </button>';
                        html += '   </td>';
                        html += '</tr>';
                    }
                    $("#fileGrid3").html(html);
                } else {
                    $("#fileGrid3").html('<tr>' +
                        '	<td colspan="4" style="text-align: center">선택된 파일이 없습니다.</td>' +
                        '</tr>');
                }
            }
        });

        $("#file1Etc, #file2Etc, #file3Etc").kendoTextArea({
            rows: 5,
        })



    },

    fn_save: function(){
        var data = {
            pjtSn : $("#pjtSn").val(),
            empSeq : $("#regEmpSeq").val(),

            step : $("#step").val(),
            stepColumn : $("#stepColumn").val(),
            nextStepColumn : $("#nextStepColumn").val(),
            stepValue : $("#stepValue").val(),
            nextStepValue : $("#nextStepValue").val(),
            file1Etc : $("#file1Etc").val(),
            file2Etc : $("#file2Etc").val(),
            file3Etc : $("#file3Etc").val()
        }

        var fd = new FormData();
        fd.append("pjtSn", $("#pjtSn").val());
        fd.append("empSeq", $("#regEmpSeq").val());
        fd.append("step", $("#step").val());
        fd.append("stepColumn", $("#stepColumn").val());
        fd.append("nextStepColumn", $("#nextStepColumn").val());
        fd.append("stepValue", $("#stepValue").val());
        fd.append("nextStepValue", $("#nextStepValue").val());
        fd.append("fileEtc1", $("#file1Etc").val());
        fd.append("fileEtc2", $("#file2Etc").val());
        fd.append("fileEtc3", $("#file3Etc").val());


        if(fCommon.global.attFiles1 != null){
            for(var i = 0; i < fCommon.global.attFiles1.length; i++){
                fd.append("fileList1", fCommon.global.attFiles1[i]);
            }
        }

        if(fCommon.global.attFiles2 != null){
            for(var i = 0; i < fCommon.global.attFiles2.length; i++){
                fd.append("fileList2", fCommon.global.attFiles2[i]);
            }
        }

        if(fCommon.global.attFiles3 != null){
            for(var i = 0; i < fCommon.global.attFiles3.length; i++){
                fd.append("fileList3", fCommon.global.attFiles3[i]);
            }
        }

        $.ajax({
            url : "/project/setProcessInfo",
            data : fd,
            type : "post",
            dataType: "json",
            contentType: false,
            processData: false,
            enctype : 'multipart/form-data',
            async: false,
            success: function(rs){
                window.location.href="/project/pop/viewRegProject.do?pjtSn=" + data.pjtSn + "&tab=5";
            }
        });
    }
}