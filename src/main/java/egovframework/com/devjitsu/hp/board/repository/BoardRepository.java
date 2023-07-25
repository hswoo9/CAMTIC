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

    public Object selectBoardListCount(ArticlePage articlePage) {
        return (int) selectOne("boardCt.selectBoardListCount", articlePage);
    }

    public Map<String, Object> selectBoard(Map<String, Object> params) {
        return (Map<String, Object>) selectOne("boardCt.selectBoard", params);
    }
    public List<Map<String, Object>> selectBoardFile(Map<String, Object> params) {
        return selectList("boardCt.selectBoardFile", params);
    }

    public void insertBoard(Map<String, Object> params) {
        insert("boardCt.insertBoard", params);
    }

    public void updateBoard(Map<String, Object> params) {
        update("boardCt.updateBoard", params);
    }

    public void deleteBoard(Map<String, Object> params) {
        delete("boardCt.deleteBoard", params);
    }

    public void setBoardArticleViewCount(Map<String, Object> params) { update("boardCt.setBoardArticleViewCount", params);}
}
