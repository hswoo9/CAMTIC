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
    List<Map<String, Object>> getConTeacherList(Map<String, Object> params);
    List<Map<String, Object>> getPersonList(Map<String, Object> params);
    Map<String, Object> getPersonData(Map<String, Object> params);
    Map<String, Object> getPersonReqData(Map<String, Object> params);
    Map<String, Object> getTeacherData(Map<String, Object> params);
    List<Map<String, Object>> getLectureTeacherReqList(Map<String, Object> params);
    List<Map<String, Object>> getConTeacherReqList(Map<String, Object> params);
    List<Map<String, Object>> getLecturePersonReqList(Map<String, Object> params);
    List<Map<String, Object>> getLecturePersonDupleCk(Map<String, Object> params);
    List<Map<String, Object>> getLectureList(Map<String, Object> params);
    List<Map<String, Object>> getConsultingList(Map<String, Object> params);
    Map<String, Object> getLectureInfo(Map<String, Object> params);
    List<Map<String, Object>> getLectureTeacherInfo(Map<String, Object> params);
    Map<String, Object> getConsultingInfo(Map<String, Object> params);
    List<Map<String, Object>> getConsultingTeacherInfo(Map<String, Object> params);

    void insLectureTeacherInfo(Map<String, Object> params);
    void insConTeacherInfo(Map<String, Object> params);
    void insLecturePersonInfo(Map<String, Object> params);
    void setLecturePersonData(Map<String, Object> params);
    void setLectureTeacherData(Map<String, Object> params);
    void delLecturePersonData(Map<String, Object> params);
    void delLectureTeacherData(Map<String, Object> params);
    void insLectureInfo(Map<String, Object> params, MultipartHttpServletRequest request, String SERVER_DIR, String BASE_DIR);
    void insConsultingInfo(Map<String, Object> params);
    void updLectureInfo(Map<String, Object> params, MultipartHttpServletRequest request, String SERVER_DIR, String BASE_DIR);
    void updLectureTime(Map<String, Object> params);
    void updConsultingTime(Map<String, Object> params);
    void updConsultingInfo(Map<String, Object> params);
    void updPersonApp(Map<String, Object> params);
    void updPersonPartic(Map<String, Object> params);
    void updPersonAudit(Map<String, Object> params);
    void updPersonRefund(Map<String, Object> params);
    void updPersonPay(Map<String, Object> params);
    void delLecturePersonInfo(Map<String, Object> params);
    void delLectureInfo(Map<String, Object> params);
    void delLectureTeacherInfo(Map<String, Object> params);
    void insConTeacherTimeInfo(Map<String, Object> params);
    void delConTeacherInfo(Map<String, Object> params);

    /** 수주관리 결재 상태값에 따른 UPDATE 메서드 */
    void updateUnRndDelvDocState(Map<String, Object> bodyMap) throws Exception;

    /** 계획서보고 결재 상태값에 따른 UPDATE 메서드 */
    void updateUnRndDevDocState(Map<String, Object> bodyMap) throws Exception;

    /** 결과보고 결재 상태값에 따른 UPDATE 메서드 */
    void updateUnRndResDocState(Map<String, Object> bodyMap) throws Exception;

    void setUnitBusnInfo(Map<String, Object> params);

    Map<String, Object> getPjtUnitData(Map<String, Object> params);

    List<Map<String, Object>> getUnitBusnList(Map<String, Object> params);

    void delUnitBusn(Map<String, Object> params);

    List<Map<String, Object>> getPjtUnitCrmList(Map<String, Object> params);

    void setPurcUnitCrm(Map<String, Object> params);
}
