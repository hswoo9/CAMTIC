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
    List<Map<String, Object>> getLectureList(Map<String, Object> params);
    Map<String, Object> getLectureInfo(Map<String, Object> params);
    void insLectureInfo(Map<String, Object> params);
    void updLectureInfo(Map<String, Object> params);
    void delLectureInfo(Map<String, Object> params);
}
