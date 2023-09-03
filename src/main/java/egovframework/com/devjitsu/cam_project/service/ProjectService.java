package egovframework.com.devjitsu.cam_project.service;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Map;

public interface ProjectService {

    List<Map<String, Object>> getProjectList(Map<String, Object> params);

    void setProject(Map<String, Object> params);

    Map<String, Object> getProjectStep1(Map<String, Object> params);

    void delProject(Map<String, Object> params);

    Map<String, Object> getProjectData(Map<String, Object> params);

    void insStep1(Map<String, Object> params);

    void insStep1Sub(Map<String, Object> params);

    Map<String, Object> getStep1Data(Map<String, Object> params);

    Map<String, Object> getStep1SubData(Map<String, Object> params);

    Map<String, Object> getStep1EstData(Map<String, Object> params);

    void insStep2(Map<String, Object> params);

    void updProjectDelv(Map<String, Object> params);

    Map<String, Object> getStep2DelvData(Map<String, Object> params);

    List<Map<String, Object>> groupCodeList(Map<String, Object> params);

    void saveGroupCode(Map<String, Object> params);

    List<Map<String, Object>> codeList(Map<String, Object> params);

    void insSetLgCode(Map<String, Object> params);

    List<Map<String, Object>> smCodeList(Map<String, Object> params);

    void insPjtCode(Map<String, Object> params);

    List<Map<String, Object>> selLgCode(Map<String, Object> params);

    List<Map<String, Object>> selSmCode(Map<String, Object> params);

    List<Map<String, Object>> getDevPjtVerList(Map<String, Object> params);

    Map<String, Object> getStep3PmInfo(Map<String, Object> params);

    void insPjtPs(Map<String, Object> params);

    List<Map<String, Object>> getProcessList(Map<String, Object> params);

    void updProcess(Map<String, Object> params);

    void delProcess(Map<String, Object> params);

    void insInvData(Map<String, Object> params);

    List<Map<String, Object>> getInvList(Map<String, Object> params);

    void updInvest(Map<String, Object> params);

    void delInvest(Map<String, Object> params);

    void insStep3(Map<String, Object> params);

    Map<String, Object> getDevelopPlan(Map<String, Object> params);

    List<Map<String, Object>> getPsList(Map<String, Object> params);

    void insStep4(Map<String, Object> params);

    void updStep5(Map<String, Object> params);
}
