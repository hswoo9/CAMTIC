package egovframework.com.devjitsu.test.service;

import java.awt.print.Pageable;
import java.util.List;
import java.util.Map;

public interface TestService {

    void getTest_bInsert(Map<String, Object> params);

    List<Map<String, Object>> getTest_bList(Map<String, Object> params);

    Map<String, Object> getBoardContent(Map<String, Object> params);

    void updAboardModify(Map<String, Object> params);

    void AboardDelete(Map<String, Object> params);

    void boardViewCnt(Map<String, Object> params);

    int boardTotalCnt(Map<String, Object> params);
}
