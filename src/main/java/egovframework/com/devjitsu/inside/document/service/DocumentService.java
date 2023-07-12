package egovframework.com.devjitsu.inside.document.service;

import java.util.List;
import java.util.Map;

public interface DocumentService {

    /**
     * 등록대장 리스트 조회
     * @param params
     * @return
     */
    List<Map<String, Object>> getDocumentList(Map<String, Object> params);

    /**
     * 식대대장 리스트 조회
     * @param params
     * @return
     */
    List<Map<String, Object>> getSnackList(Map<String, Object> params);

    /**
     * 식대대장 데이터 조회
     * @param params
     * @return
     */
    Map<String, Object> getSnackOne(Map<String, Object> params);

    /**
     * 등록대장 문서등록
     * @param params
     */
    void setDocumentInsert(Map<String, Object> params);

    /**
     * 개발사업수주대장 등록
     * @param params
     */
    void setDocuOrderInsert(Map<String, Object> params);

    /**
     * 식대대장 신청
     * @param params
     */
    void setSnackInsert(Map<String, Object> params);

    /**
     * 식대대장 승인요청
     * @param params
     */
    void setSnackReqCert(Map<String, Object> params);
}
