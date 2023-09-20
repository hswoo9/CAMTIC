package egovframework.com.devjitsu.cam_project.service;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import java.util.List;
import java.util.Map;

public interface ProjectService {

    List<Map<String, Object>> getProjectList(Map<String, Object> params);

    void setProject(Map<String, Object> params);

    Map<String, Object> getProjectStep(Map<String, Object> params);

    void delProject(Map<String, Object> params);

    Map<String, Object> getProjectData(Map<String, Object> params);

    void setEstInfo(Map<String, Object> params);

    void setEstSub(Map<String, Object> params);

    Map<String, Object> getEstData(Map<String, Object> params);

    Map<String, Object> getStep1SubData(Map<String, Object> params);

    void insStep2(Map<String, Object> params);

    void updProjectDelv(Map<String, Object> params);

    Map<String, Object> getDelvData(Map<String, Object> params);

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

    Map<String, Object> getPjtSnToDev(Map<String, Object> params);

    List<Map<String, Object>> getPsList(Map<String, Object> params);

    void insStep4(Map<String, Object> params);

    void updStep5(Map<String, Object> params);

    void setEngnCrmInfo(Map<String, Object> params);

    void setBustInfo(Map<String, Object> params);

    /** 수주관리 결재 상태값에 따른 UPDATE 메서드 */
    void updateDelvDocState(Map<String, Object> bodyMap) throws Exception;

    /** 개발계획서 결재 상태값에 따른 UPDATE 메서드 */
    void updateDevDocState(Map<String, Object> bodyMap) throws Exception;

    Map<String, Object> getCrmInfo(Map<String, Object> params);

    Map<String, Object> getBustInfo(Map<String, Object> params);

    void setDelvInfo(Map<String, Object> params);

    void setDevInfo(Map<String, Object> params);

    Map<String, Object> getDevData(Map<String, Object> params);

    void stopProject(Map<String, Object> params);

    void setProcessInfo(Map<String, Object> params, MultipartFile[] fileList1, MultipartFile[] fileList2, MultipartFile[] fileList3, String serverDir, String baseDir);

    Map<String, Object> getPsFile(Map<String, Object> params);

    Map<String, Object> setGoodsInfo(Map<String, Object> params);

    void setEstSubMod(Map<String, Object> params);

    void setResultInfo(Map<String, Object> params, MultipartHttpServletRequest request, String serverDir, String baseDir);

    Map<String, Object> getResultInfo(Map<String, Object> params);
}
