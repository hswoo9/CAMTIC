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

    void setDevPjtVer(Map<String, Object> params);

    void setDevInfo(Map<String, Object> params);

    List<Map<String, Object>> getRndDevScheduleList(Map<String, Object> params);

    void setDevSchData(Map<String, Object> params);

    List<Map<String, Object>> getRndDevJobList(Map<String, Object> params);

    void setDevJobInfo(Map<String, Object> params, MultipartFile[] fileList, String SERVER_DIR, String BASE_DIR);

    List<Map<String, Object>> getDevSchInfo(Map<String, Object> params);

    Map<String, Object> getRndDetail(Map<String, Object> params);

    void setRndDetail(Map<String, Object> params);

    void setDelvApprove(Map<String, Object> params);

    void setReqPartRateData(Map<String, Object> params, MultipartFile[] fileList, String serverDir, String baseDir);

    Map<String, Object> getReqPartRateData(Map<String, Object> params);

    List<Map<String, Object>> getFileList(Map<String, Object> params);

    void setPartRateRequest(Map<String, Object> params);

    List<Map<String, Object>> getReqPartRateVerList(Map<String, Object> params);

    void setPartRateDetail(Map<String, Object> params);

    void checkPartRateDetail(Map<String, Object> params);

    void setReqPartRateStatus(Map<String, Object> params);


    Map<String, Object> getPjtDevSchData(Map<String, Object> params);
}
