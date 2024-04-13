package egovframework.com.devjitsu.inside.bustrip.service;

import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import java.util.List;
import java.util.Map;

public interface BustripService {


    List<Map<String, Object>> getBustripList(Map<String, Object> params);

    void setBustripReq(Map<String, Object> params, MultipartFile[] file, String serverDir, String baseDir);

    void delBustripReq(Map<String, Object> params);

    Map<String, Object> getBustripReqInfo(Map<String, Object> params);
    Map<String, Object> getBustripResReqInfo(Map<String, Object> params);

    List<Map<String, Object>> getBustripReqCheck(Map<String, Object> params);

    List<Map<String, Object>> getBustripTotInfo(Map<String, Object> params);

    List<Map<String, Object>> getBustripResTotInfo(Map<String, Object> params);

    /**
     * 출장신청서 전자결재 상태값 업데이트
     * @param bodyMap
     * @throws Exception
     */
    void updateDocState(Map<String, Object> bodyMap) throws Exception;

    /**
     * 출장결과보고서 전자결재 상태값 업데이트
     * @param bodyMap
     * @throws Exception
     */
    void updateResDocState(Map<String, Object> bodyMap) throws Exception;

    void saveBustripResult(Map<String, Object> params, MultipartFile[] file, String serverDir, String baseDir);

    Map<String, Object> getBustripOne(Map<String, Object> params);

    Map<String, Object> getBusinessOne(Map<String, Object> params);

    void saveBustripExnpPop(Map<String, Object> params);

    void insBustripExnpResult(Map<String, Object> params);

    List<Map<String, Object>> getBusinessExnpInfo(Map<String, Object> params);

    List<Map<String, Object>> getBustripExnpInfo(Map<String, Object> params);

    Map<String, Object> getBustripMaxDayCost(Map<String, Object> params);

    List<Map<String, Object>> getBustripCostList(Map<String, Object> params);

    List<Map<String, Object>> getBusinessCostList(Map<String, Object> params);

    List<Map<String, Object>> nationCodeList(Map<String, Object> params);

    List<Map<String, Object>> nationSmCodeList(Map<String, Object> params);

    List<Map<String, Object>> getNationCode(Map<String, Object> params);

    Map<String, Object> getNationCodeInfo(Map<String, Object> params);

    void setBustripCostInsert(Map<String, Object> params);

    void setBusinessCostInsert(Map<String, Object> params);

    Map<String, Object> getBusinessCostOne(Map<String, Object> params);

    void insNationCode(Map<String, Object> params);

    void setBustripFuelCostInsert(Map<String, Object> params);

    void setFuelCostDelete(Map<String, Object> params);

    void setExchangeRateUpdate(Map<String, Object> params);

    List<Map<String, Object>> getWaypointCostList(Map<String, Object> params);

    void setWaypointCostInsert(Map<String, Object> params);

    Map<String, Object> getWaypointCostOne(Map<String, Object> params);

    void setWaypointCostDelete(Map<String, Object> params);

    void setReqCert(Map<String, Object> params);

    void setBusiCert(Map<String, Object> params);

    List<Map<String, Object>> getBustripFuelCostList(Map<String, Object> params);

    Map<String, Object> getBustripFuelCostOne(Map<String, Object> params);

    Map<String, Object> getBustripFuelCostInfo(Map<String, Object> params);

    Map<String, Object> getRegFuelCost(Map<String, Object> params);

    Map<String, Object> getExchangeInfo(Map<String, Object> params);

    List<Map<String, Object>> getPopBustripList(Map<String, Object> params);

    List<Map<String, Object>> getBustripSettleList(Map<String, Object> params);

    List<Map<String, Object>> getBustripReqFileInfo(Map<String, Object> params);

    List<Map<String, Object>> getBustripReqFileInfoR(Map<String, Object> params);

    List<Map<String, Object>> getAbroadBustripReqFileInfo(Map<String, Object> params);

    void setExnpFile(Map<String, Object> params, MultipartFile[] file, String serverDir, String baseDir);

    List<Map<String, Object>> getExnpFile(Map<String, Object> params);

    List<Map<String, Object>> getExnpFileNum(Map<String, Object> params);
    List<Map<String, Object>> getBustripDocFile(Map<String, Object> params);

    List<Map<String, Object>> getBustripReqDocFile(Map<String, Object> params);

    Map<String, Object> getBustripExnpSum(Map<String, Object> params);
    void delBustripCost(Map<String, Object> params);

    List<Map<String, Object>> getProjectBustList(Map<String, Object> params);
    List<Map<String, Object>> getProjectBustMetList(Map<String, Object> params);
    void setCardHist(Map<String, Object> params);

    List<Map<String, Object>> getCardList(Map<String, Object> params);

    void setBusiCardHist(Map<String, Object> params);

    List<Map<String, Object>> getPersonalExnpData(Map<String, Object> params);

    List<Map<String, Object>> getCorpExnpData(Map<String, Object> params);

    List<Map<String, Object>> getBusinessOverExnpData(Map<String, Object> params);

    List<Map<String, Object>> getBusinessCorpOverExnpData(Map<String, Object> params);

    List<Map<String, Object>> getExnpHistFileList(Map<String, Object> params);
    Map<String, Object> getExnpHistOne(Map<String, Object> params);

    Map<String, Object> getCorpCarExnpData(Map<String, Object> params);

    void setBustripPdfFile(Map<String, Object> params, MultipartFile[] file, String SERVER_DIR, String BASE_DIR);

    void saveBustripOverExnpPop(Map<String, Object> params);

    List<Map<String, Object>> getBusinessOverExnpInfo(Map<String, Object> params);

    List<Map<String, Object>> getExtData(Map<String, Object> params);

    List<Map<String, Object>> getBustripPopList(Map<String, Object> params);
}
