package egovframework.com.devjitsu.campus.service;

import org.springframework.web.multipart.MultipartHttpServletRequest;

import java.util.List;
import java.util.Map;

public interface CampusService {

    /** 코드 조회 시작 */
    List<Map<String, Object>> getCodeList(Map<String, Object> params);
    Map<String, Object> getCodeOne(Map<String, Object> params);
    /** 코드 조회 끝 */

    /** 개인학습관리 시작 */
    Map<String, Object> getRealEduTimeYear(Map<String, Object> params);
    Map<String, Object> getRealEduTimeStudyWeekly(Map<String, Object> params);
    Map<String, Object> getRealEduTimePropagWeekly(Map<String, Object> params);
    List<Map<String, Object>> getEduInfoList(Map<String, Object> params);
    Map<String, Object> getEduInfoOne(Map<String, Object> params);
    Map<String, Object> getEduResultOne(Map<String, Object> params);
    /** 개인학습관리 끝 */

    /** 학습조 시작 */
    List<Map<String, Object>> getStudyInfoStatList(Map<String, Object> params);
    List<Map<String, Object>> getStudyInfoList(Map<String, Object> params);
    Map<String, Object> getStudyInfoOne(Map<String, Object> params);
    List<Map<String, Object>> getStudyUserList(Map<String, Object> params);
    List<Map<String, Object>> getStudyJournalList(Map<String, Object> params);
    Map<String, Object> getStudyJournalOne(Map<String, Object> params);
    List<Map<String, Object>> getStudyPropagList(Map<String, Object> params);
    List<Map<String, Object>> getOjtPlanList(Map<String, Object> params);
    Map<String, Object> getOjtPlanOne(Map<String, Object> params);
    List<Map<String, Object>> getOjtResultList(Map<String, Object> params);
    Map<String, Object> getOjtResultOne(Map<String, Object> params);
    /** 학습조 끝 */

    /** 오픈스터디 시작 */
    List<Map<String, Object>> getOpenStudyInfoStatList(Map<String, Object> params);
    List<Map<String, Object>> getOpenStudyInfoList(Map<String, Object> params);
    Map<String, Object> getOpenStudyInfoOne(Map<String, Object> params);
    List<Map<String, Object>> getOpenStudyUserList(Map<String, Object> params);
    /** 오픈스터디 끝 */

    /** 공통학습 시작 */
    List<Map<String, Object>> getCommonEduStatList(Map<String, Object> params);
    List<Map<String, Object>> getCommonEduList(Map<String, Object> params);
    Map<String, Object> getCommonEduOne(Map<String, Object> params);
    List<Map<String, Object>> getCommonEduUserList(Map<String, Object> params);
    List<Map<String, Object>> getCommonEduUserAddList(Map<String, Object> params);
    /** 공통학습 끝 */

    /** 학습통계 시작 */
    List<Map<String, Object>> getEduStat(Map<String, Object> params);
    List<Map<String, Object>> getEduAllStatList(Map<String, Object> params);
    /** 학습통계 끝 */

    /** 목표기술서 시작 */
    List<Map<String, Object>> getTargetYearList(Map<String, Object> params);
    List<Map<String, Object>> getTargetOne(Map<String, Object> params);
    List<Map<String, Object>> getTargetList(Map<String, Object> params);
    Map<String, Object> getEduCategoryOne(Map<String, Object> params);
    List<Map<String, Object>> getEduCategoryList(Map<String, Object> params);
    Map<String, Object> getEduCategoryDetailOne(Map<String, Object> params);
    List<Map<String, Object>> getEduCategoryDetailList(Map<String, Object> params);
    List<Map<String, Object>> getTargetCategoryList(Map<String, Object> params);
    List<Map<String, Object>> getTargetCategoryDetailList(Map<String, Object> params);
    List<Map<String, Object>> getEduPlanList(Map<String, Object> params);
    List<Map<String, Object>> getEduPlanOne(Map<String, Object> params);
    /** 목표기술서 끝 */

    /** 직무기술서 시작 */
    List<Map<String, Object>> getDutyInfoList(Map<String, Object> params);
    Map<String, Object> getDutyInfoOne(Map<String, Object> params);
    List<Map<String, Object>> getDutyInfoMngList(Map<String, Object> params);
    /** 직무기술서 끝 */





    /** 개인학습 시작 */
    void setEduInfoInsert(Map<String, Object> params, MultipartHttpServletRequest request, String serverDir, String baseDir);
    void setEduResultInsert(Map<String, Object> params);
    void setMngCheckUpd(Map<String, Object> params);
    /** 개인학습 끝 */

    /** 학습조 시작 */
    void setStudyInfoInsert(Map<String, Object> params);
    void setStudyUserMngUpdate(Map<String, Object> params);
    void studyReq(Map<String, Object> params);
    void setStudyJournalInsert(Map<String, Object> params, MultipartHttpServletRequest request, String SERVER_DIR, String BASE_DIR);
    void setStudyJournalApp(Map<String, Object> params);
    void setOjtPlanInsert(Map<String, Object> params);
    void setOjtPlanUpdate(Map<String, Object> params);
    void setOjtPlanDelete(Map<String, Object> params);
    void setOjtResultInsert(Map<String, Object> params, MultipartHttpServletRequest request, String SERVER_DIR, String BASE_DIR);
    /** 학습조 끝 */

    /** */
    void setStudyPropagInsert(Map<String, Object> params, MultipartHttpServletRequest request, String SERVER_DIR, String BASE_DIR);
    /** */

    /** 오픈스터디 시작 */
    void setOpenStudyInfoIns(Map<String, Object> params);
    void setOpenStudyInfoUpd(Map<String, Object> params);
    void setOpenNextStep(Map<String, Object> params);
    void setOpenStudyUser(Map<String, Object> params);
    void setOpenStudyResultUpd(Map<String, Object> params);
    void setOpenStudyCertReq(Map<String, Object> params);
    /** 오픈스터디 끝 */

    /** 공통학습 시작 */
    void setCommonEduIns(Map<String, Object> params);
    void setCommonEduUpd(Map<String, Object> params);
    void setCommonEduAddUserAll(Map<String, Object> params);
    void setCommonEduUserUpd(Map<String, Object> params);
    void setCommonEduUserTimeUpd(Map<String, Object> params);
    /** 공통학습 끝 */

    /** 목표기술서 시작 */
    Map<String, Object> setTargetInsert(Map<String, Object> params);
    Map<String, Object> setTargetDetailInsert(Map<String, Object> params);
    Map<String, Object> setEduTargetDetailUpdate(Map<String, Object> params);
    Map<String, Object> setEduPlanInsert(Map<String, Object> params);
    Map<String, Object> setEduPlanUpdate(Map<String, Object> params);
    Map<String, Object> updateEduInfoApprStat(Map<String, Object> params);
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
    /** 목표기술서 끝 */
    
    /** 직무기술서 시작 */
    void setDutyInfoIns(Map<String, Object> params);
    void setDutyInfoUpd(Map<String, Object> params);
    void setTargetCertReq(Map<String, Object> params);
    void setDutyCertReq(Map<String, Object> params);
    /** 직무기술서 끝 */

    /** 전자결재 시작 */
    void updateDocState(Map<String, Object> bodyMap) throws Exception;
    void updateResDocState(Map<String, Object> bodyMap) throws Exception;

    void deleteStudyJournal(Map<String, Object> params);

    void setStudyInfoComplete(Map<String, Object> params);

    void setStudyResult(Map<String, Object> params);

    Map<String, Object> getStudyResultData(Map<String, Object> params);

    Map<String, Object> getStudyResultOne(Map<String, Object> params);

    List<Map<String, Object>> getStudyResultList(Map<String, Object> params);

    void setStudyResultSc(Map<String, Object> params);

    void deleteOjtResult(Map<String, Object> params);

    void setStudyResultComplete(Map<String, Object> params);
    /** 전자결재 끝 */
}
