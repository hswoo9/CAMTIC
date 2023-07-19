package egovframework.com.devjitsu.hp.board.service;

import java.util.List;
import java.util.Map;

public interface BoardService {


    List<Map<String, Object>> selectBoardList(Map<String, Object> params);

    Map<String, Object> selectBoard(Map<String, Object> params);

    void insertBoard(Map<String, Object> params);

    void updateBoard(Map<String, Object> params);

    void deleteBoard(Map<String, Object> params);


}
