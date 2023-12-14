package egovframework.com.devjitsu.cam_project.service;

import org.springframework.web.multipart.MultipartHttpServletRequest;

import java.util.List;
import java.util.Map;

public interface ProjectUnRndService {
    void setSubjectInfo(Map<String, Object> params);

    Map<String, Object> getUnRndDetail(Map<String, Object> params);

    void setUnRndDetail(Map<String, Object> params, MultipartHttpServletRequest request, String SERVER_DIR, String BASE_DIR);

    void setDelvApprove(Map<String, Object> params);

    List<Map<String, Object>> getLectureTeacherList(Map<String, Object> params);
    List<Map<String, Object>> getPersonList(Map<String, Object> params);
    Map<String, Object> getPersonData(Map<String, Object> params);
    List<Map<String, Object>> getLectureTeacherReqList(Map<String, Object> params);
    List<Map<String, Object>> getLecturePersonReqList(Map<String, Object> params);
    List<Map<String, Object>> getLecturePersonDupleCk(Map<String, Object> params);
    List<Map<String, Object>> getLectureList(Map<String, Object> params);
    Map<String, Object> getLectureInfo(Map<String, Object> params);
    void insLectureTeacherInfo(Map<String, Object> params);
    void insLecturePersonInfo(Map<String, Object> params);
    void setLecturePersonData(Map<String, Object> params);
    void delLecturePersonData(Map<String, Object> params);
    void insLectureInfo(Map<String, Object> params);
    void updLectureInfo(Map<String, Object> params);
    void updPersonApp(Map<String, Object> params);
    void updPersonPartic(Map<String, Object> params);
    void updPersonAudit(Map<String, Object> params);
    void updPersonRefund(Map<String, Object> params);
    void updPersonPay(Map<String, Object> params);
    void delLecturePersonInfo(Map<String, Object> params);
    void delLectureInfo(Map<String, Object> params);
    void delLectureTeacherInfo(Map<String, Object> params);

    /** 수주관리 결재 상태값에 따른 UPDATE 메서드 */
    void updateUnRndDelvDocState(Map<String, Object> bodyMap) throws Exception;

    /** 결과보고 결재 상태값에 따른 UPDATE 메서드 */
    void updateUnRndResDocState(Map<String, Object> bodyMap) throws Exception;
}
