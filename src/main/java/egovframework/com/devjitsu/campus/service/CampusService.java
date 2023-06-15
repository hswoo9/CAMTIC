package egovframework.com.devjitsu.campus.service;

import java.util.List;
import java.util.Map;

public interface CampusService {
    /**
     * 캠퍼스 코드 리스트
     * @param params
     * @return
     */
    List<Map<String, Object>> getCodeList(Map<String, Object> params);

    /**
     * 연도등록팝업 해당연도 중복 조회
     * @param params
     * @return
     */
    List<Map<String, Object>> getTargetOne(Map<String, Object> params);

    /**
     * 목표기술서 직무조회
     * @param params
     * @return
     */
    List<Map<String, Object>> getTargetList(Map<String, Object> params);

    /**
     * 목표기술서 작성 유저별 구분 리스트
     * @param params
     * @return
     */
    List<Map<String, Object>> getTargetCategoryList(Map<String, Object> params);

    /**
     * 목표기술서 작성 유저별 레벨 리스트
     * @param params
     * @return
     */
    List<Map<String, Object>> getTargetCategoryDetailList(Map<String, Object> params);

    /**
     * 학습체계도 설정 구분 리스트
     * @param params
     * @return
     */
    List<Map<String, Object>> getEduCategoryList(Map<String, Object> params);

    /**
     * 학습체계도 설정 LEVEL 리스트
     * @param params
     * @return
     */
    List<Map<String, Object>> getEduCategoryDetailList(Map<String, Object> params);

    /**
     * 연도등록팝업 연도 등록
     * @param params
     * @return
     */
    Map<String, Object> setTargetInsert(Map<String, Object> params);

    /**
     * 주업무등록팝업 직무 등록
     * @param params
     * @return
     */
    Map<String, Object> setTargetDetailInsert(Map<String, Object> params);

    /**
     * 현황/목표설정팝업 현황/목표 설정
     * @param params
     * @return
     */
    Map<String, Object> setEduTargetDetailUpdate(Map<String, Object> params);
}
