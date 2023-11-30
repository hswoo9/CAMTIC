package egovframework.com.devjitsu.camtic.service;

import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import java.util.List;
import java.util.Map;

public interface ApplicationService {

    void setJoinAccess(Map<String, Object> params);
    Map<String, Object> getApplicationUser(Map<String, Object> params);
    Map<String, Object> userAgreeChk(Map<String, Object> params);
    void setUserAgree(Map<String, Object> params);
    Map<String, Object> getApplicationForm1(Map<String, Object> params);
    void setApplicationForm1(Map<String, Object> params, MultipartFile photoFile, MultipartFile armiFile, String serverDir, String baseDir);
    void setApplicationForm2(Map<String, Object> params, MultipartHttpServletRequest request, String serverDir, String baseDir);
    Map<String, Object> getApplicationForm2(Map<String, Object> params);
    void setApplicationForm3(Map<String, Object> params, MultipartHttpServletRequest request, String serverDir, String baseDir);
    Map<String, Object> getApplicationForm3(Map<String, Object> params);
    void setApplicationIntroduce(Map<String, Object> params);
    Map<String, Object> getApplicationIntroduce(Map<String, Object> params);
    List<Map<String,Object>> getApplicationByRecruitArea(Map<String,Object> params);
}
