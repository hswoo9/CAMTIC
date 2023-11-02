package egovframework.com.devjitsu.hp.board.repository;

import egovframework.com.devjitsu.gw.login.repository.AbstractDAO;
import egovframework.com.devjitsu.hp.board.util.ArticlePage;
import egovframework.com.devjitsu.hp.board.util.PagingResponse;
import egovframework.com.devjitsu.hp.board.util.PostResponse;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;


@Repository
public class BoardRepository extends AbstractDAO {

    public List<PostResponse> selectBoardList(ArticlePage articlePage) {
        return selectList("boardCt.selectBoardList", articlePage);
    }
    public List<PostResponse> selectPrBoardList(ArticlePage articlePage) {
        return selectList("boardCt.selectPrBoardList", articlePage);
    }
    public List<PostResponse> getNewsSubscribeList(ArticlePage articlePage) {
        return selectList("boardCt.getNewsSubscribeList", articlePage);
    }
    public List<Map<String, Object>> selectMainList(Map<String, Object> params) {
        return selectList("boardCt.selectMainList", params);
    }
    public List<Map<String, Object>> selectBsnsMainList(Map<String, Object> params) {
        return selectList("boardCt.selectBsnsMainList", params);
    }
    public Object selectBoardListCount(ArticlePage articlePage) {
        return (int) selectOne("boardCt.selectBoardListCount", articlePage);
    }
    public Object getNewsSubscribeListCnt(ArticlePage articlePage) {
        return (int) selectOne("boardCt.getNewsSubscribeListCnt", articlePage);
    }
    public Map<String, Object> selectBoard(Map<String, Object> params) {
        return (Map<String, Object>) selectOne("boardCt.selectBoard", params);
    }
    public List<Map<String, Object>> selectNewsBoard(Map<String, Object> params) {
        return selectList("boardCt.selectNewsBoard", params);
    }
    public List<Map<String, Object>> selectBoardFile(Map<String, Object> params) {
        return selectList("boardCt.selectBoardFile", params);
    }

    public void insertBoard(Map<String, Object> params) {
        insert("boardCt.insertBoard", params);
    }

    public void insertNews(Map<String, Object> params) {
        insert("boardCt.insertNews", params);
    }

    public Object checkNews(Map<String, Object> param) {
        return (int) selectOne("boardCt.checkNews", param);
    }

    public void deleteNews(Map<String, Object> params) { delete("boardCt.deleteNews", params);}

    public void updateBoard(Map<String, Object> params) {
        update("boardCt.updateBoard", params);
    }

    public void deleteBoard(Map<String, Object> params) {
        delete("boardCt.deleteBoard", params);
    }

    public void setBoardArticleViewCount(Map<String, Object> params) { update("boardCt.setBoardArticleViewCount", params);}
    public Map<String, Object> selectNewsPop(Map<String, Object> params) {
        return (Map<String, Object>) selectOne("boardCt.selectNewsPop", params);
    }
    public Map<String, Object> selectNewsView(Map<String, Object> params) {
        return (Map<String, Object>) selectOne("boardCt.selectNewsView", params);
    }
    public Map<String, Object> getSubscribeChk(Map<String, Object> params) {
        return (Map<String, Object>) selectOne("boardCt.getSubscribeChk", params);
    }
    public void insSubscribe(Map<String, Object> params) {insert("boardCt.insSubscribe", params); }
    public void cancleSubscribe(Map<String, Object> param) {update("boardCt.cancleSubscribe", param); }

    public List<Map<String, Object>> getLetterListOld(Map<String, Object> params) {
        return selectList("boardCt.getLetterListOld", params);
    }

}
