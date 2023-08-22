package egovframework.com.devjitsu.inside.bustrip.service;

import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Map;

public interface BustripService {


    List<Map<String, Object>> getBustripList(Map<String, Object> params);

    void setBustripReq(Map<String, Object> params, MultipartFile[] file, String serverDir, String baseDir);

    void delBustripReq(Map<String, Object> params);

    Map<String, Object> getBustripReqInfo(Map<String, Object> params);

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

    void saveBustripResult(Map<String, Object> params);

    Map<String, Object> getBustripOne(Map<String, Object> params);

    void saveBustripExnpPop(Map<String, Object> params);

    void insBustripExnpResult(Map<String, Object> params);

    List<Map<String, Object>> getBustripExnpInfo(Map<String, Object> params);

    Map<String, Object> getBustripMaxDayCost(Map<String, Object> params);

    List<Map<String, Object>> getBustripCostList(Map<String, Object> params);

    void setBustripCostInsert(Map<String, Object> params);

    void setBustripFuelCostInsert(Map<String, Object> params);

    List<Map<String, Object>> getWaypointCostList(Map<String, Object> params);

    void setWaypointCostInsert(Map<String, Object> params);

    void setReqCert(Map<String, Object> params);

    List<Map<String, Object>> getBustripFuelCostList(Map<String, Object> params);

    Map<String, Object> getBustripFuelCostInfo(Map<String, Object> params);

    List<Map<String, Object>> getPopBustripList(Map<String, Object> params);

    List<Map<String, Object>> getBustripSettleList(Map<String, Object> params);
}
