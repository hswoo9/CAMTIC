package egovframework.com.devjitsu.cams_pot.repository;

import egovframework.com.devjitsu.hp.board.util.ArticlePage;
import egovframework.com.devjitsu.hp.board.util.PostResponse;
import egovframework.com.devjitsu.gw.login.repository.AbstractDAO;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository
public class camsBoardRepository extends AbstractDAO {
	private static final Logger logger = (Logger) LoggerFactory.getLogger(camsBoardRepository.class);

    public Map<String, Object> getBoardInfo(ArticlePage articlePage){ return (Map<String, Object>) selectOne("camsBoard.getBoardInfo", articlePage);}

    /*public List<PostResponse> getRecentBoardArticleList(ArticlePage articlePage){ return selectList("camsBoard.getRecentBoardArticleList", articlePage);}*/

    public List<PostResponse> getBoardArticleList(ArticlePage articlePage){ return selectList("camsBoard.getBoardArticleList", articlePage);}

    public void setBoardArticleViewCount(Map<String, Object> params) { update("camsBoard.setBoardArticleViewCount", params);}

    public int getBoardArticleMaxGroup(Map<String, Object> params) { return (int)selectOne("camsBoard.getBoardArticleMaxGroup", params);}

    public int getBoardArticleMaxLevel(Map<String, Object> params) { return (int) selectOne("camsBoard.getBoardArticleMaxLevel", params);}

    public void setBoardArticle(Map<String, Object> params){ insert("camsBoard.setBoardArticle", params);}

    public void setBoardArticleUpd(Map<String, Object> params) {update("camsBoard.setBoardArticleUpd", params);}

    public void setArticleFileInfo(List<Map<String, Object>> list) { insert("camsBoard.setArticleFileInfo", list);}

    public Map<String, Object> getArticleInfo(Map<String, Object> params){ return (Map<String, Object>) selectOne("camsBoard.getArticleInfo", params);}

    public List<Map<String, Object>> getArticleFileList(Map<String, Object> params){ return selectList("camsBoard.getArticleFileList", params);}

    public void setArticleDel(Map<String, Object> params) { update("camsBoard.setArticleDel", params);}

    /*public Map<String, Object> getArticleFileOne(Map<String, Object> params) { return (Map<String, Object>) selectOne("board.getArticleFileOne", params);}*/

    /*public void setArticleFileDelOne(Map<String, Object> params){ delete("board.setArticleFileDelOne", params);}*/

    public List<Map<String, Object>> getArticleReplyList(Map<String, Object> params){ return selectList("camsBoard.getArticleReplyList", params);}

    public void setArticleReply(Map<String, Object> params){ insert("camsBoard.setArticleReply", params);}

    public void setArticleReplyUpd(Map<String, Object> params) {update("camsBoard.setArticleReplyUpd", params);}

    public void setArticleReplyActiveUpd(Map<String, Object> params) {update("camsBoard.setArticleReplyActiveUpd", params);}

    public int getArticleReplyMaxGroup(Map<String, Object> params) { return (int)selectOne("camsBoard.getArticleReplyMaxGroup", params);}

    public int getArticleReplyMaxStep(Map<String, Object> params) { return (int)selectOne("camsBoard.getArticleReplyMaxStep", params);}

    public void setArticleReplyStepUpd(Map<String, Object> params) { update("camsBoard.setArticleReplyStepUpd", params);}

    public int getArticleReplyMaxLevel(Map<String, Object> params) { return (int)selectOne("camsBoard.getArticleReplyMaxLevel", params);}

    public Object getBoardArticleListCnt(ArticlePage articlePage) {
        return (int) selectOne("camsBoard.getBoardArticleListCnt", articlePage);
    }

/*    public Object getRecentBoardArticleListCnt(ArticlePage articlePage) {
        return (int) selectOne("camsBoard.getRecentBoardArticleListCnt", articlePage);
    }*/
}
