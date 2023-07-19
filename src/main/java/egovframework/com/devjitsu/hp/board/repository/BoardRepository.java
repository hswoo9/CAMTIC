package egovframework.com.devjitsu.hp.board.repository;

import egovframework.com.devjitsu.gw.login.repository.AbstractDAO;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;


@Repository
public class BoardRepository extends AbstractDAO {

    public List<Map<String, Object>> selectBoardList(Map<String, Object> params) {
        return selectList("selectBoardList", params);
    }

    public Map<String, Object> selectBoard(Map<String, Object> params) {
        return (Map<String, Object>) selectOne("selectBoard", params);
    }

    public void insertBoard(Map<String, Object> params) {
        insert("insertBoard", params);
    }

    public void updateBoard(Map<String, Object> params) {
        update("updateBoard", params);
    }

    public void deleteBoard(Map<String, Object> params) {
        delete("deleteBoard", params);
    }
}
