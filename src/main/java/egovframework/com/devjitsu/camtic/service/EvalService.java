package egovframework.com.devjitsu.camtic.service;

import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import java.util.List;
import java.util.Map;

public interface EvalService {

    Map<String, Object> getEvalLogin(Map<String, Object> params);
    List<Map<String, Object>> getApplicationScoreBoard(Map<String, Object> params);
    void setApplicationEvalScreen(Map<String, Object> params);
    Map<String, Object> setEvalEnd(Map<String, Object> params);
}
