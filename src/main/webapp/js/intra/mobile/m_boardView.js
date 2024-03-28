var mBv = {
    global : {
        searchAjaxData : "",
        articleDetailInfo : "",
    },

    fn_defaultScript : function() {
        if($("#boardType").val() == "watch"){
            $(".boardTab.t3").addClass('active');

            mBv.getWatchBoardArticle();
        }else{
            $(".boardTab[boardId='" + $("#boardId").val() + "']").addClass('active');

            mBv.getBoardArticle();
        }
    },

    getBoardArticle : function(){
        mBv.global.searchAjaxData = {
            boardId : $("#boardId").val(),
            boardArticleId : $("#boardArticleId").val()
        }

        var result = customKendo.fn_customAjax("/board/getArticleInfo.do", mBv.global.searchAjaxData);
        if(result.flag){
            mBv.global.articleDetailInfo = result.rs;

            var boardTitle = "";
            if(mBv.global.articleDetailInfo.BOARD_ARTICLE_CONCAT_TITLE != null && mBv.global.articleDetailInfo.BOARD_ARTICLE_CONCAT_TITLE != ""){
                boardTitle = mBv.global.articleDetailInfo.BOARD_ARTICLE_CONCAT_TITLE;
            }else{
                boardTitle = "제목없음";
            }

            $("#articleTitle").html(boardTitle);
            $("#articleRegEmpName").text(mBv.global.articleDetailInfo.REG_EMP_NAME);
            $("#articleRegDate").text(mBv.global.articleDetailInfo.REG_DATE);
            $("#articleViewCount").text(mBv.global.articleDetailInfo.BOARD_ARTICLE_VIEW_COUNT);


            var contents = "";
            if(mBv.global.articleDetailInfo.BOARD_ARTICLE_CONTENT != null){
                contents = mBv.global.articleDetailInfo.BOARD_ARTICLE_CONTENT.replaceAll("&lt;", "<").replaceAll("&gt;", ">").replaceAll("&quot;", "\"").replaceAll("&apos;", "'");
            }
            $("#articleContentDiv").html(contents);
        }

        var file = customKendo.fn_customAjax("/board/getArticleFileList.do", mBv.global.searchAjaxData);
        if(file.flag){
            var html = "";
            for(var i = 0; i < file.list.length; i++) {
                var fileNameText = "";
                if(file.list[i].FILE_PATH.indexOf('camticOldFile') !== 1){
                    fileNameText = file.list[i].FILE_ORG_NAME + '.' + file.list[i].FILE_EXT;
                }else{
                    fileNameText = file.list[i].FILE_ORG_NAME;
                }

                html += "" +
                    '<a href="#" class="file" onclick="mBv.fileDownOne(\'' + file.list[i].FILE_PATH + file.list[i].FILE_UUID + '\', \'' + fileNameText + '\')">' +
                    '<img src="/images/camspot_m/ico-file.png"/>' + fileNameText + '(' + mBv.formatBytes(file.list[i].FILE_SIZE, 3) + ')' +
                    '</a>';

            }

            $("#fileDiv").html(html);
        }
    },

    getWatchBoardArticle : function(){
        mBv.global.searchAjaxData = {
            watchBoardId : $("#watchBoardId").val()
        }

        var result = customKendo.fn_customAjax("/spot/getWatchBoard.do", mBv.global.searchAjaxData);
        if(result.flag){
            mBv.global.articleDetailInfo = result.rs;
            var boardArticleTitle = "";
            if(mBv.global.articleDetailInfo.BOARD_ARTICLE_TITLE != null && mBv.global.articleDetailInfo.BOARD_ARTICLE_TITLE != ""){
                boardArticleTitle = mBv.global.articleDetailInfo.BOARD_ARTICLE_TITLE;
            }else{
                boardArticleTitle = "제목없음";
            }

            $("#articleTitle").html(boardArticleTitle);
            $("#articleRegEmpName").html(mBv.global.articleDetailInfo.REG_EMP_NAME);
            $("#articleRegDate").html(mBv.global.articleDetailInfo.REG_DATE);
            $("#articleViewCount").html(mBv.global.articleDetailInfo.BOARD_ARTICLE_VIEW_COUNT);
            $("#articleContentDiv").html(mBv.global.articleDetailInfo.BOARD_ARTICLE_CONTENT);
        }

        $(".fileGrid").hide();
    },
    
    formatBytes : function(bytes, decimals = 2) {
        if (bytes === 0) return '0 Bytes';

        const k = 1024;
        const dm = decimals < 0 ? 0 : decimals;
        const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

        const i = Math.floor(Math.log(bytes) / Math.log(k));

        return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
    },

    fileDownOne : function(filePath, fileName) {
        kendo.saveAs({
            dataURI: "/common/fileDownload.do?filePath=" + filePath + "&fileName=" + fileName,
        });
    },
}