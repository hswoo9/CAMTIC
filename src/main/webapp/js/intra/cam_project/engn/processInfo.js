var processInfo = {


    fn_defaultScript : function (){
        commonProject.setPjtStat();
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
                for(var i = 0 ; i < rs.psList.length ; i++){
                    $("#commFileHtml" + rs.psList[i].PS_PREP).css("display", "");
                }

                if(rs.psFileList != null){
                    var pf1 = rs.psFileList.psFile1List;
                    var pf2 = rs.psFileList.psFile2List;
                    var pf3 = rs.psFileList.psFile3List;
                    var pf4 = rs.psFileList.psFile4List;
                    var pf5 = rs.psFileList.psFile5List;
                    var pf6 = rs.psFileList.psFile6List;



                    if(pf1.length != 0){
                        var html = '';

                        for(var i = 0; i < pf1.length; i++){
                            html += '<tr style="text-align: center">';
                            html += '   <td><span style="cursor: pointer" onclick="fileDown(\''+pf1[i].file_path+pf1[i].file_uuid+'\', \''+pf1[i].file_org_name+'.'+pf1[i].file_ext+'\')">'+pf1[i].file_org_name+'</span></td>';
                            html += '   <td>'+ pf1[i].file_ext +'</td>';
                            html += '   <td>'+ pf1[i].file_size +'</td>';
                            html += '   <td>' +
                                '           <button type="button" class="k-button k-rounded k-button-solid k-button-solid-error" onclick="fCommon.commonFileDel('+ pf1[i].file_no +', this)">' +
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
                            html += '   <td><span style="cursor: pointer" onclick="fileDown(\''+pf2[i].file_path+pf2[i].file_uuid+'\', \''+pf2[i].file_org_name+'.'+pf2[i].file_ext+'\')">'+pf2[i].file_org_name+'</span></td>';
                            html += '   <td>'+ pf2[i].file_ext +'</td>';
                            html += '   <td>'+ pf2[i].file_size +'</td>';
                            html += '   <td>' +
                                '           <button type="button" class="k-button k-rounded k-button-solid k-button-solid-error" onclick="fCommon.commonFileDel('+ pf2[i].file_no +', this)">' +
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
                            html += '   <td><span style="cursor: pointer" onclick="fileDown(\''+pf3[i].file_path+pf3[i].file_uuid+'\', \''+pf3[i].file_org_name+'.'+pf3[i].file_ext+'\')">'+pf3[i].file_org_name+'</span></td>';
                            html += '   <td>'+ pf3[i].file_ext +'</td>';
                            html += '   <td>'+ pf3[i].file_size +'</td>';
                            html += '   <td>' +
                                '           <button type="button" class="k-button k-rounded k-button-solid k-button-solid-error" onclick="fCommon.commonFileDel('+ pf3[i].file_no +', this)">' +
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

                    if(pf4.length != 0){
                        var html = '';

                        for(var i = 0; i < pf4.length; i++){
                            html += '<tr style="text-align: center">';
                            html += '   <td><span style="cursor: pointer" onclick="fileDown(\''+pf4[i].file_path+pf4[i].file_uuid+'\', \''+pf4[i].file_org_name+'.'+pf4[i].file_ext+'\')">'+pf4[i].file_org_name+'</span></td>';
                            html += '   <td>'+ pf4[i].file_ext +'</td>';
                            html += '   <td>'+ pf4[i].file_size +'</td>';
                            html += '   <td>' +
                                '           <button type="button" class="k-button k-rounded k-button-solid k-button-solid-error" onclick="fCommon.commonFileDel('+ pf4[i].file_no +', this)">' +
                                '			    <span class="k-button-text">삭제</span>' +
                                '		    </button>';
                            html += '   </td>';
                            html += '</tr>';
                        }
                        $("#fileGrid4").html(html);
                    } else {
                        $("#fileGrid4").html('<tr>' +
                            '	<td colspan="4" style="text-align: center">선택된 파일이 없습니다.</td>' +
                            '</tr>');
                    }

                    if(pf5.length != 0){
                        var html = '';

                        for(var i = 0; i < pf5.length; i++){
                            html += '<tr style="text-align: center">';
                            html += '   <td><span style="cursor: pointer" onclick="fileDown(\''+pf5[i].file_path+pf5[i].file_uuid+'\', \''+pf5[i].file_org_name+'.'+pf5[i].file_ext+'\')">'+pf5[i].file_org_name+'</span></td>';
                            html += '   <td>'+ pf5[i].file_ext +'</td>';
                            html += '   <td>'+ pf5[i].file_size +'</td>';
                            html += '   <td>' +
                                '           <button type="button" class="k-button k-rounded k-button-solid k-button-solid-error" onclick="fCommon.commonFileDel('+ pf5[i].file_no +', this)">' +
                                '			    <span class="k-button-text">삭제</span>' +
                                '		    </button>';
                            html += '   </td>';
                            html += '</tr>';
                        }
                        $("#fileGrid5").html(html);
                    } else {
                        $("#fileGrid5").html('<tr>' +
                            '	<td colspan="4" style="text-align: center">선택된 파일이 없습니다.</td>' +
                            '</tr>');
                    }

                    if(pf6.length != 0){
                        var html = '';

                        for(var i = 0; i < pf6.length; i++){
                            html += '<tr style="text-align: center">';
                            html += '   <td><span style="cursor: pointer" onclick="fileDown(\''+pf6[i].file_path+pf6[i].file_uuid+'\', \''+pf6[i].file_org_name+'.'+pf6[i].file_ext+'\')">'+pf6[i].file_org_name+'</span></td>';
                            html += '   <td>'+ pf6[i].file_ext +'</td>';
                            html += '   <td>'+ pf6[i].file_size +'</td>';
                            html += '   <td>' +
                                '           <button type="button" class="k-button k-rounded k-button-solid k-button-solid-error" onclick="fCommon.commonFileDel('+ pf6[i].file_no +', this)">' +
                                '			    <span class="k-button-text">삭제</span>' +
                                '		    </button>';
                            html += '   </td>';
                            html += '</tr>';
                        }
                        $("#fileGrid6").html(html);
                    } else {
                        $("#fileGrid6").html('<tr>' +
                            '	<td colspan="4" style="text-align: center">선택된 파일이 없습니다.</td>' +
                            '</tr>');
                    }
                }

                var rs = rs.psList;

                $("#file1Etc").val(rs[0].FILE_ETC1);
                $("#file2Etc").val(rs[0].FILE_ETC2);
                $("#file3Etc").val(rs[0].FILE_ETC3);
                $("#file4Etc").val(rs[0].FILE_ETC4);
                $("#file5Etc").val(rs[0].FILE_ETC5);
                $("#file6Etc").val(rs[0].FILE_ETC6);

            }
        });

        $("#file1Etc, #file2Etc, #file3Etc, #file4Etc, #file5Etc, #file6Etc").kendoTextArea({
            rows: 5,
        })

        if(commonProject.global.busnClass == "R" || commonProject.global.busnClass == "S"){
            $("#teamAppBtn").show();
            if(commonProject.global.pjtTeamCk == "Y"){
                $("#teamAppBtn").hide();
                $("#btnDiv").append('<span style="float: right; color: red; font-size: 12px;">마감되었습니다</span>');
            }
        }
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
            file3Etc : $("#file3Etc").val(),
            file4Etc : $("#file4Etc").val(),
            file5Etc : $("#file5Etc").val(),
            file6Etc : $("#file6Etc").val()
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
        fd.append("fileEtc4", $("#file4Etc").val());
        fd.append("fileEtc5", $("#file5Etc").val());
        fd.append("fileEtc6", $("#file6Etc").val());



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

        if(fCommon.global.attFiles4 != null){
            for(var i = 0; i < fCommon.global.attFiles4.length; i++){
                fd.append("fileList4", fCommon.global.attFiles4[i]);
            }
        }

        if(fCommon.global.attFiles5 != null){
            for(var i = 0; i < fCommon.global.attFiles5.length; i++){
                fd.append("fileList5", fCommon.global.attFiles5[i]);
            }
        }

        if(fCommon.global.attFiles6 != null){
            for(var i = 0; i < fCommon.global.attFiles6.length; i++){
                fd.append("fileList6", fCommon.global.attFiles6[i]);
            }
        }

        commonProject.loading();
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
                alert("저장되었습니다.");
                commonProject.getReloadPage(4, 3, 3, 2, 1, 1);
            }
        });
    }
}