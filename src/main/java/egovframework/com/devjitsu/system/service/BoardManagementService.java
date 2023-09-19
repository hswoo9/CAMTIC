package egovframework.com.devjitsu.system.service;

import egovframework.com.devjitsu.hp.board.util.ArticlePage;
import java.util.List;
import java.util.Map;

public interface BoardManagementService {

    List<Map<String, Object>> getBoardList (Map<String, Object> params);

    void setBoard(Map<String, Object> params);

    List<Map<String, Object>> getBoardCategoryList(ArticlePage articlePage);

    Map<String, Object> getBoardType(Map<String, Object> params);

    Map<String, Object> getBoardActive(Map<String, Object> params);
}
