package egovframework.com.devjitsu.cams_pot.service;

import egovframework.com.devjitsu.hp.board.util.ArticlePage;
import egovframework.com.devjitsu.hp.board.util.PagingResponse;
import egovframework.com.devjitsu.hp.board.util.PostResponse;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Map;

public interface camsBoardService {
    /*PagingResponse<PostResponse> getRecentBoardArticleList(ArticlePage articlePage);*/

    Map<String, Object> getBoardInfo(ArticlePage articlePage);

    PagingResponse<PostResponse> getBoardArticleList(ArticlePage articlePage);

    void setBoardArticleViewCount(Map<String, Object> params);

    void setBoardArticle(Map<String, Object> params);

    void setBoardAttachFileInit(Map<String, Object> params, MultipartFile[] mpfList, String server_dir, String base_dir);

    Map<String, Object> getArticleInfo(Map<String, Object> params);

    List<Map<String, Object>> getArticleFileList(Map<String, Object> params);

    List<Map<String, Object>> getArticleReplyList(Map<String, Object> params);

    void setArticleDel(Map<String, Object> params);

    void setArticleReply(Map<String, Object> params);

    void setArticleReplyActiveUpd(Map<String, Object> params);

    Object getBoardArticleListCnt(ArticlePage articlePage);

    Map<String, Object> getContentBoardFileOne(Map<String, Object> params);
}
