package egovframework.com.devjitsu.inside.recruit.service;

import org.springframework.web.multipart.MultipartHttpServletRequest;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.List;
import java.util.Map;

public interface RecruitService {

    Map<String, Object> getRecruitNum();
    List<Map<String, Object>> getRecruitList(Map<String, Object> params);
    Map<String, Object> getRecruit(Map<String, Object> params);
    List<Map<String, Object>> getRecruitAreaList(Map<String, Object> params);
    Map<String, Object> getRecruitArea(Map<String, Object> params);
    Map<String, Object> getUserInfoByApplication(Map<String, Object> params);
    List<Map<String, Object>> getCommissionerList(Map<String, Object> params);
    void setEvalEmpInfo(Map<String, Object> params);
    void setCommissionerEmpInfoDel(Map<String, Object> params);
    void evalSetExcelFormDown(HttpServletRequest request, HttpServletResponse response);
    List<Map<String, Object>> evalExcelUploadData(Map<String, Object> params, MultipartHttpServletRequest request) throws Exception;
    void setEvalExcelUploadData(Map<String, Object> params) throws Exception;
    List<Map<String, Object>> getEvalHistoryList(Map<String, Object> params);
    void setRecruitInsert(Map<String, Object> params);
    void setRecruitUpdate(Map<String, Object> params);
    void setRecruitDel(Map<String, Object> params);
    void setRecruitStatusUpd(Map<String, Object> params);
    List<Map<String, Object>> getApplicationList(Map<String, Object> params);
    Map<String, Object> getApplication(Map<String, Object> params);
    List<Map<String, Object>> getUserDuplicationList(Map<String, Object> params);
    void setApplicationUpd(Map<String, Object> params);
    void setInAvoidUpd(Map<String, Object> params);
    List<Map<String, Object>> getInApplicationList(Map<String, Object> params);
    void setApplicationInTime(Map<String, Object> params);
    void setPrePassAppl(Map<String, Object> params);
    List<Map<String, Object>> getRecruitPrint(Map<String, Object> params);
    void setRecruitArticleViewCount(Map<String, Object> params);

    void insRecruitMember(Map<String, Object> params);

    List<Map<String, Object>> getCommissionerListCustom(Map<String, Object> params);

    Map<String, Object> getRecruitPrintTitle(Map<String, Object> params);

    void insRecruitMemberDelete(Map<String, Object> params);

    List<Map<String, Object>> getDraftingList(Map<String, Object> params);

    /** 채용 결재 상태값에 따른 UPDATE 메서드 */
    void updateDraftDocState(Map<String, Object> bodyMap) throws Exception;

    List<Map<String, Object>> getApplicationCareer(Map<String, Object> params);

    List<Map<String, Object>> getRecruitHistList(Map<String, Object> params);

}
