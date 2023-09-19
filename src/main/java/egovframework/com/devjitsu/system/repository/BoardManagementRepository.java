package egovframework.com.devjitsu.system.repository;

import egovframework.com.devjitsu.gw.login.dto.LoginVO;
import egovframework.com.devjitsu.gw.login.repository.AbstractDAO;
import egovframework.com.devjitsu.hp.board.util.ArticlePage;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository
public class BoardManagementRepository extends AbstractDAO {

    private static final Logger logger = (Logger) LoggerFactory.getLogger(BoardManagementRepository.class);

    public List<Map<String, Object>> getBoardList(Map<String, Object> params){ return selectList("board.getBoardList", params);}

    public void setBoardUpd(Map<String, Object> params) { update("board.setBoardUpd", params);}

    public void setBoard(Map<String, Object> params) { insert("board.setBoard", params);}

    public void setBoardCategoryDel(Map<String, Object> params) { delete("board.setBoardCategoryDel", params);}

    public void setBoardCategory(List<Map<String, Object>> params) { insert("board.setBoardCategory", params);}

    public List<Map<String, Object>> getBoardCategoryList(ArticlePage articlePage){ return selectList("board.getBoardCategoryList", articlePage);}

    public Map<String, Object> getBoardType(Map<String, Object> params){ return (Map<String, Object>) selectOne("board.getBoardType", params);}

    public Map<String, Object> getBoardActive(Map<String, Object> params){ return (Map<String, Object>) selectOne("board.getBoardActive", params);}


}
