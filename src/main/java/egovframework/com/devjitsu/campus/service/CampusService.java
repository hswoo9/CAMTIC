package egovframework.com.devjitsu.campus.service;

import java.util.List;
import java.util.Map;

public interface CampusService {

    /** 코드 조회 시작 */
    List<Map<String, Object>> getCodeList(Map<String, Object> params);
    Map<String, Object> getCodeOne(Map<String, Object> params);
    /** 코드 조회 끝 */

    /**
     * 개인학습관리 개인학습 리스트 조회
     * @param params
     * @return
     */
    List<Map<String, Object>> getEduInfoList(Map<String, Object> params);

    /**
     * 개인학습관리 개인학습조회팝업 단일데이터 조회
     * @param params
     * @return
     */
    Map<String, Object> getEduInfoOne(Map<String, Object> params);

    /**
     * 개인학습관리 결과보고서조회팝업 단일데이터 조회
     * @param params
     * @return
     */
    Map<String, Object> getEduResultOne(Map<String, Object> params);

    /**
     * 목표기술서 등록된 연도 조회
     * @param params
     * @return
     */
    List<Map<String, Object>> getTargetYearList(Map<String, Object> params);

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

    Map<String, Object> getEduCategoryOne(Map<String, Object> params);
    List<Map<String, Object>> getEduCategoryList(Map<String, Object> params);
    Map<String, Object> getEduCategoryDetailOne(Map<String, Object> params);
    List<Map<String, Object>> getEduCategoryDetailList(Map<String, Object> params);

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
     * 학습체계도 학습계획 리스트
     * @param params
     * @return
     */
    List<Map<String, Object>> getEduPlanList(Map<String, Object> params);

    /**
     * 학습체계도 학습계획 데이터
     * @param params
     * @return
     */
    List<Map<String, Object>> getEduPlanOne(Map<String, Object> params);

    List<Map<String, Object>> getStudyInfoList(Map<String, Object> params);
    Map<String, Object> getStudyInfoOne(Map<String, Object> params);
    List<Map<String, Object>> getStudyUserList(Map<String, Object> params);
    List<Map<String, Object>> getStudyJournalList(Map<String, Object> params);
    Map<String, Object> getStudyJournalOne(Map<String, Object> params);
    List<Map<String, Object>> getOpenStudyInfoList(Map<String, Object> params);
    Map<String, Object> getOpenStudyInfoOne(Map<String, Object> params);

    List<Map<String, Object>> getEduStat(Map<String, Object> params);
    List<Map<String, Object>> getEduAllStatList(Map<String, Object> params);

    /** 직무관리 시작 */
    List<Map<String, Object>> getDutyInfoList(Map<String, Object> params);
    Map<String, Object> getDutyInfoOne(Map<String, Object> params);
    List<Map<String, Object>> getDutyInfoMngList(Map<String, Object> params);
    /** 직무관리 끝 */





    /**
     * 학습신청 교육수강신청서 저장
     * @param params
     * @return
     */
    void setEduInfoInsert(Map<String, Object> params);

    /**
     * 학습관리 학습결과보고서 저장
     * @param params
     * @return
     */
    void setEduResultInsert(Map<String, Object> params);

    void setStudyInfoInsert(Map<String, Object> params);
    void setStudyUserMngUpdate(Map<String, Object> params);
    void studyReq(Map<String, Object> params);
    void setStudyJournalInsert(Map<String, Object> params);
    void setStudyJournalApp(Map<String, Object> params);
    void setOpenStudyInfoIns(Map<String, Object> params);
    void setOpenStudyInfoUpd(Map<String, Object> params);
    void setOpenNextStep(Map<String, Object> params);
    void setOpenStudyUser(Map<String, Object> params);

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

    /**
     * 학습계획 등록
     * @param params
     * @return
     */
    Map<String, Object> setEduPlanInsert(Map<String, Object> params);

    /**
     * 학습계획 수정
     * @param params
     * @return
     */
    Map<String, Object> setEduPlanUpdate(Map<String, Object> params);

    /**
     * 개인학습관리 - 승인프로세스(임시)
     * @param params
     * @return
     */
    Map<String, Object> updateEduInfoApprStat(Map<String, Object> params);

    /**
     * 목표기술서작성 - 승인프로세스(임시)
     * @param params
     * @return
     */
    Map<String, Object> updateApprStat(Map<String, Object> params);

    void setEduCode(Map<String, Object> params);
    void setEduCategory(Map<String, Object> params);
    void setEduCategoryDetail(Map<String, Object> params);
    void setEduCodeUpd(Map<String, Object> params);
    void setEduCategoryUpd(Map<String, Object> params);
    void setEduCategoryDetailUpd(Map<String, Object> params);
    void setEduCodeDel(Map<String, Object> params);
    void setEduCategoryDel(Map<String, Object> params);
    void setEduCategoryDetailDel(Map<String, Object> params);
    
    /** 직무기술서 시작 */
    void setDutyInfoIns(Map<String, Object> params);
    void setDutyInfoUpd(Map<String, Object> params);
    void setDutyCertReq(Map<String, Object> params);
    /** 직무기술서 끝 */

    /**
     * 학습신청서 전자결재 상태값 업데이트
     * @param bodyMap
     * @throws Exception
     */
    void updateDocState(Map<String, Object> bodyMap) throws Exception;

    /**
     * 학습결과보고서 전자결재 상태값 업데이트
     * @param bodyMap
     * @throws Exception
     */
    void updateResDocState(Map<String, Object> bodyMap) throws Exception;

}
