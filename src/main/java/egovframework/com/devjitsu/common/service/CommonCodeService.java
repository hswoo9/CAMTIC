package egovframework.com.devjitsu.common.service;

import java.util.List;
import java.util.Map;

public interface CommonCodeService {

    /**
     * 공통 그룹코드별 코드리스트
     * @param params
     * @return
     */
    List<Map<String, Object>> getCmCodeList(Map<String, Object> params);

    List<Map<String, Object>> getCmCodeListReward(Map<String, Object> params);
    /**
     * 커스텀 코드리스트
     * @param params
     * @return
     */
    List<Map<String, Object>> getCustomCodeList(Map<String, Object> params);

    /**
     * 한글 기안기 서버 URL 조회
     * @param achrGbn
     * @return
     */
    String getHwpCtrlUrl(String achrGbn);

    /**
     * 공통 코드 조회 ( cmCode = 코드 or cmCodeId = 코드 기본키 )
     * @param params
     * @return
     */
    Map<String, Object> getCmCodeInfo(Map<String, Object> params);

    /**
     * 공통 그룹코드 리스트
     * @param
     * @return
     */
    List<Map<String, Object>> getCmGroupCodeList(Map<String, Object> params);

    /**
     * 공통 그룹코드 조회
     * @param params
     * @return
     */
    Map<String, Object> getCmGroupCodeInfo(Map<String, Object> params);

    /**
     * 공통 그룹코드 등록, 수정
     * @param params
     */
    Map<String, Object> setCmGroupCodeSave(Map<String, Object> params);

    /**
     * 공통 코드 등록, 수정 수정가능
     * @param params
     */
    Map<String, Object> setCmCodeSave(Map<String, Object> params);

    List<Map<String, Object>> commonCodeList(Map<String, Object> params);
}
