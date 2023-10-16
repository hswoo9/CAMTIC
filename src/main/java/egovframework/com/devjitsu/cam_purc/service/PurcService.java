package egovframework.com.devjitsu.cam_purc.service;

import org.springframework.web.multipart.MultipartHttpServletRequest;

import java.util.List;
import java.util.Map;

public interface PurcService {


    List<Map<String, Object>> getPurcReqList(Map<String, Object> params);
    void setPurcReq(Map<String, Object> params, MultipartHttpServletRequest request, String SERVER_DIR, String BASE_DIR);
    Map<String, Object> getPurcReq(Map<String, Object> params);
    List<Map<String, Object>> getPurcItemList(Map<String, Object> params);

    List<Map<String, Object>> getClaimItemList(Map<String, Object> params);
    Map<String, Object> getPurcItemAmtTotal(Map<String, Object> params);
    Map<String, Object> getPurcClaimItemAmtTotal(Map<String, Object> params);
    void updatePurcDocState(Map<String, Object> bodyMap) throws Exception;
    void updateClaimDocState(Map<String, Object> bodyMap) throws Exception;

    List<Map<String, Object>> getMngReqPurcList(Map<String, Object> params);

    void setPurcItemStat(Map<String, Object> params);

    void setPurcClaimData(Map<String, Object> params);

    Map<String, Object> getPurcClaimData(Map<String, Object> params);

    List<Map<String, Object>> getPurcClaimList(Map<String, Object> params);

    Map<String, Object> getPurcSum(Map<String, Object> params);
}
