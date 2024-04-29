package egovframework.com.devjitsu.cam_purc.service;

import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import java.util.List;
import java.util.Map;

public interface PurcService {


    List<Map<String, Object>> getPurcReqList(Map<String, Object> params);
    List<Map<String, Object>> getPjtPurcItemList(Map<String, Object> params);
    void setPurcReq(Map<String, Object> params, MultipartFile[] file, MultipartHttpServletRequest request, String SERVER_DIR, String BASE_DIR);
    Map<String, Object> getPurcReq(Map<String, Object> params);
    List<Map<String, Object>> getPurcReqFileList(Map<String, Object> params);
    List<Map<String, Object>> getPurcItemList(Map<String, Object> params);

    List<Map<String, Object>> getClaimItemList(Map<String, Object> params);
    Map<String, Object> getPurcItemAmtTotal(Map<String, Object> params);
    Map<String, Object> getPurcClaimItemAmtTotal(Map<String, Object> params);
    void updatePurcDocState(Map<String, Object> bodyMap) throws Exception;
    void updateClaimDocState(Map<String, Object> bodyMap) throws Exception;

    List<Map<String, Object>> getMngReqPurcList(Map<String, Object> params);

    void setPurcItemStat(Map<String, Object> params);

    void setPurcClaimData(Map<String, Object> params, MultipartFile[] file, MultipartHttpServletRequest request, String SERVER_DIR, String BASE_DIR);

    Map<String, Object> getPurcClaimData(Map<String, Object> params);

    List<Map<String, Object>> getPurcClaimList(Map<String, Object> params);

    Map<String, Object> getPurcClaimItemData(Map<String, Object> params);

    void delPurcClaimData(Map<String, Object> params);

    List<Map<String, Object>> getPurcAssetList(Map<String, Object> params);

    Map<String, Object> getPurcSum(Map<String, Object> params);

    List<Map<String, Object>> getPurcProductList(Map<String, Object> params);

    void updPurcInspect(Map<String, Object> params, MultipartFile[] file, String SERVER_DIR, String BASE_DIR);

    void updPurcInspectStat(Map<String, Object> params);

    void updItemUnAssetStat(Map<String, Object> params);

    Map<String, Object> getCrmInfo(Map<String, Object> params);

    void setOrderInfo(Map<String, Object> params);

    void setOrderYnInfo(Map<String, Object> params);

    List<Map<String, Object>> getProjectPurcList(Map<String, Object> params);

    List<Map<String, Object>> getProjectPurcReqList(Map<String, Object> params);

    Map<String, Object> getPurcClaimDataByPayApp(Map<String, Object> params);

    List<Map<String, Object>> getClaimFileList(Map<String, Object> map);

    void delPurcReq(Map<String, Object> params);

    void setOnSiteCardPurcClaimData(Map<String, Object> params);

    Map<String, Object> getPurcAndClaimData(Map<String, Object> params);

    List<Map<String, Object>> getProjectReqFile(Map<String, Object> map);

    List<Map<String, Object>> getMngPurcAppList(Map<String, Object> params);

    List<Map<String, Object>> purcFileList(Map<String, Object> params);

    void setPurcFileAdd(Map<String, Object> params, MultipartFile[] fileList, String serverDir, String baseDir);

    List<Map<String, Object>> getPurcClaimDocFile(Map<String, Object> params);

    List<Map<String, Object>> getClaimMngList(Map<String, Object> params);

    void setPayAppPurcReq(Map<String, Object> params, MultipartFile[] fileList, String serverDir, String baseDir);

    List<Map<String, Object>> getUserPurcAppList(Map<String, Object> params);

    Map<String, Object> getClaimExnpData(Map<String, Object> params);

    Map<String, Object> setPurcBasicSetting(Map<String, Object> params);

    Map<String, Object> getBasicSetting(Map<String, Object> params);

    List<Map<String, Object>> getHistPurcList(Map<String, Object> params);

    void setOrderSendMailInfo(Map<String, Object> params, MultipartFile[] fileList, String serverDir, String baseDir);

    List<Map<String, Object>> getOrderSendFileList (Map<String, Object> params);

    Map<String, Object> getClaimExnpGwCardList(Map<String, Object> map);

    Map<String, Object> getClaimExnpGwEtaxList(Map<String, Object> map);

    List<Map<String, Object>> getPurcReqClaimList(Map<String, Object> params);

    List<Map<String, Object>> getPurcReqClaimEmpList(Map<String, Object> params);

    List<Map<String, Object>> getPurcClaimExnpList(Map<String, Object> params);

    void delClaimExnpData(Map<String, Object> params);

    void updClaimExpDe(Map<String, Object> params);
}
