package egovframework.com.devjitsu.cam_project.service;

import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import java.util.List;
import java.util.Map;

public interface ProjectRndService {
    void setSubjectInfo(Map<String, Object> params);

    List<Map<String, Object>> getPopRschList(Map<String, Object> params);

    Map<String, Object> getRschData(Map<String, Object> params);

    void setRschData(Map<String, Object> params);

    List<Map<String, Object>> getPjtRschInfo(Map<String, Object> params);

    int getRschCount(Map<String, Object> params);

    void delRschData(Map<String, Object> params);

    void updRschStatus(Map<String, Object> params);

    void setDevPjtVer(Map<String, Object> params);

    void setDevInfo(Map<String, Object> params);

    List<Map<String, Object>> getRndDevScheduleList(Map<String, Object> params);

    void setDevSchData(Map<String, Object> params);

    List<Map<String, Object>> getRndDevJobList(Map<String, Object> params);

    void setDevJobInfo(Map<String, Object> params, MultipartFile[] fileList, String SERVER_DIR, String BASE_DIR);

    List<Map<String, Object>> getDevSchInfo(Map<String, Object> params);

    Map<String, Object> getRndDetail(Map<String, Object> params);

    Map<String, Object> getRndFileList(Map<String, Object> params);

    void setRndDetail(Map<String, Object> params, MultipartHttpServletRequest request, String SERVER_DIR, String BASE_DIR);

    void setDelvApprove(Map<String, Object> params);

    void setReqPartRateData(Map<String, Object> params, MultipartFile[] fileList, String serverDir, String baseDir);

    Map<String, Object> getReqPartRateData(Map<String, Object> params);

    List<Map<String, Object>> getFileList(Map<String, Object> params);

    void setPartRateRequest(Map<String, Object> params);

    List<Map<String, Object>> getReqPartRateVerList(Map<String, Object> params);

    List<Map<String, Object>> getAccountInfo(Map<String, Object> params);

    List<Map<String, Object>> getChangeList(Map<String, Object> params);
    Map<String, Object> getChangeOne(Map<String, Object> params);

    void setPartRateDetail(Map<String, Object> params);

    void checkPartRateDetail(Map<String, Object> params);

    void setReqPartRateStatus(Map<String, Object> params);


    Map<String, Object> getPjtDevSchData(Map<String, Object> params);

    void insPjtPsRnd(Map<String, Object> params);

    void delPjtPsRnd(Map<String, Object> params);

    void tmpUpdDevPlanApprove(Map<String, Object> params);

    /** 수주관리 결재 상태값에 따른 UPDATE 메서드 */
    void updateRndDelvDocState(Map<String, Object> bodyMap) throws Exception;

    /** 계획서보고 결재 상태값에 따른 UPDATE 메서드 */
    void updateRndDevDocState(Map<String, Object> bodyMap) throws Exception;

    /** 결과보고 결재 상태값에 따른 UPDATE 메서드 */
    void updateRndResDocState(Map<String, Object> bodyMap) throws Exception;

    /** 세세목변경서 결재 상태값에 따른 UPDATE 메서드 */
    void updateChangeDocState(Map<String, Object> bodyMap, int num) throws Exception;

    /** 참여연구원변경공문 결재 상태값에 따른 UPDATE 메서드 */
    void updateRateDocState(Map<String, Object> bodyMap) throws Exception;

    void delDevSch(Map<String, Object> params);

    void carryoverApp(Map<String, Object> params);

    void insChangeInfo(Map<String, Object> params);

    void updNowYear(Map<String, Object> params);

    Map<String, Object> getNowYearChangeHist(Map<String, Object> params);
}
