package egovframework.com.devjitsu.cam_achieve.service.impl;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import egovframework.com.devjitsu.cam_achieve.repository.AchieveRepository;
import egovframework.com.devjitsu.cam_achieve.service.AchieveService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class AchieveServiceImpl implements AchieveService {

    @Autowired
    private AchieveRepository achieveRepository;

    @Override
    public Map<String, Object> getAllPjtCalc(Map<String, Object> params) {
        Map<String, Object> result = new HashMap<>();

        // 엔지니어링, 기타용역 수주, 예상수주금액
        List<Map<String, Object>> engnPjtInfo = achieveRepository.getEngnPjtCalc(params);

        // R&D, 비R&D 수주, 예상수주금액
        List<Map<String, Object>> rndPjtInfo = achieveRepository.getRndPjtCalc(params);

        long expEngnAmt = 0;
        long expRndAmt = 0;
        long engnAmt = 0;
        long rndAmt = 0;

        long saleRndAmt = 0;
        long saleEngnAmt = 0;

        long expSaleRndAmt = 0;
        long expSaleEngnAmt = 0;

        for(Map<String, Object> map : engnPjtInfo) {
            if(map.get("DELV_STATUS") != null) {
                if(map.get("DELV_STATUS").toString().equals("100")) {
                    expEngnAmt += map.get("EXP_AMT") == null ? 0 : Long.parseLong(map.get("EXP_AMT").toString());
                }
            }

            if(map.get("RESULT_STATUS") != null) {
                if(map.get("RESULT_STATUS").toString().equals("100")) {
                    // 개발일반 매출액
                    saleEngnAmt += map.get("PJT_AMT") == null ? 0 : Long.parseLong(map.get("PJT_AMT").toString());
                }
            }

            if(map.get("RESULT_STATUS") != null) {
                if(!map.get("RESULT_STATUS").toString().equals("100") && !map.get("RESULT_STATUS").toString().equals("101") && map.get("DELV_STATUS").toString().equals("100")) {
                    // 개발일반 예상매출액
                    expSaleEngnAmt += map.get("PJT_AMT") == null ? 0 : Long.parseLong(map.get("PJT_AMT").toString());
                }
            }

            // 개발일반 수주액
            engnAmt += map.get("PJT_AMT") == null ? 0 : Long.parseLong(map.get("PJT_AMT").toString());
        }

        for(Map<String, Object> map : rndPjtInfo) {
            if(map.get("STATUS") != null) {
                if(map.get("STATUS").toString().equals("100")) {
                    // 연구개발 수주금액
                    rndAmt += map.get("PJT_AMT") == null ? 0 : Long.parseLong(map.get("PJT_AMT").toString());
                } else {
                    // 연구개발 예상수주
                    expRndAmt += map.get("EXP_AMT") == null ? 0 : Long.parseLong(map.get("EXP_AMT").toString());
                }
            } else {
                // 연구개발 예상수주
                expRndAmt += map.get("EXP_AMT") == null ? 0 : Long.parseLong(map.get("EXP_AMT").toString());
            }
        }

        saleRndAmt = achieveRepository.getRndSaleAmt(params);
        expSaleRndAmt = rndAmt - saleRndAmt;

        // R&D, 비R&d 구매 정산 금액
        long purcRndAmt = achieveRepository.getPurcRndAmt(params);

        // R&D, 비R&d 출장 정산 금액
        long bustripRndAmt = achieveRepository.getBustripRndAmt(params);

        // R&D, 비R&d 지출 정산 금액
        long exnpRndAmt = achieveRepository.getExnpRndAmt(params);

        // 엔지니어링, 기타용역 구매 정산 금액
        long purcEngnAmt = achieveRepository.getPurcEngnAmt(params);

        // 엔지니어링, 기타용역 출장 정산 금액
        long bustripEngnAmt = achieveRepository.getBustripEngnAmt(params);

        // 연구개발 수익
        long incpRndAmt = purcRndAmt + bustripRndAmt + exnpRndAmt;

        // 개발일반 수익
        long incpEngnAmt = purcEngnAmt + bustripEngnAmt;

        // 전년도 체크
        params.put("year", Integer.parseInt(params.get("year").toString()) - 1);

        // 전년도 R&D, 비R&d 구매 정산 금액
        long purcBefRndAmt = achieveRepository.getPurcRndAmt(params);

        // 전년도 R&D, 비R&d 출장 정산 금액
        long bustripBefRndAmt = achieveRepository.getBustripRndAmt(params);

        // 전년도 R&D, 비R&d 지출 정산 금액
        long exnpBefRndAmt = achieveRepository.getExnpRndAmt(params);

        // 전년도 엔지니어링, 기타용역 구매 정산 금액
        long purcBefEngnAmt = achieveRepository.getPurcEngnAmt(params);

        // 전년도 엔지니어링, 기타용역 출장 정산 금액
        long bustripBefEngnAmt = achieveRepository.getBustripEngnAmt(params);

        // 전년도 연구개발 수익
        long befIncpRndAmt = purcBefRndAmt + bustripBefRndAmt + exnpBefRndAmt;

        // 전년도 개발일반 수익
        long befIncpEngnAmt = purcBefEngnAmt + bustripBefEngnAmt;

        // year + 1
        params.put("year", Integer.parseInt(params.get("year").toString()) + 1);


        // 연구개발 예상 수익 = 사업비 - 올해 예상수익 - 전년도 예상수익
        result.put("expIncpRndAmt", rndAmt - incpRndAmt - befIncpRndAmt);
        // 개발일반 예상 수익 = 사업비 - 올해 예상수익 - 전년도 예상수익
        result.put("expIncpEngnAmt", saleEngnAmt - incpEngnAmt - befIncpEngnAmt);

        result.put("incpRndAmt", rndAmt - incpRndAmt);
        result.put("incpEngnAmt", saleEngnAmt - incpEngnAmt);

        result.put("expSaleRndAmt", expSaleRndAmt);
        result.put("expSaleEngnAmt", expSaleEngnAmt);

        result.put("saleRndAmt", saleRndAmt);
        result.put("saleEngnAmt", saleEngnAmt);

        result.put("expEngnAmt", expEngnAmt);
        result.put("expRndAmt", expRndAmt);
        result.put("engnAmt", engnAmt);
        result.put("rndAmt", rndAmt);

        // 목표
        params.put("deptLevel", "2");
        Map<String, Object> deptObj = achieveRepository.getDeptObjAmt(params);
        result.put("objDelvAmt", deptObj.get("DELV_OBJ").toString());
        result.put("objSaleAmt", deptObj.get("SALE_OBJ").toString());
        result.put("objIncpAmt", deptObj.get("INCP_OBJ").toString());

        return result;
    }

    @Override
    public List<Map<String, Object>> getEngnList(Map<String, Object> params) {
        return achieveRepository.getEngnList(params);
    }

    @Override
    public List<Map<String, Object>> getEngnDeptData(Map<String, Object> params) {
        return achieveRepository.getEngnDeptData(params);
    }

    @Override
    public Map<String, Object> getSaleByDeptData(Map<String, Object> params) {
        Map<String, Object> result = new HashMap<>();

        List<Map<String, Object>> engnSaleList = achieveRepository.getEngnSaleList(params);
        List<Map<String, Object>> rndSaleList = achieveRepository.getRndSaleList(params);

        result.put("engnSaleList", engnSaleList);
        result.put("rndSaleList", rndSaleList);

        return result;
    }

    @Override
    public List<Map<String, Object>> getDeptObjList(Map<String, Object> params) {
        return achieveRepository.getDeptObjList(params);
    }

    @Override
    public void insDeptObjSetting(Map<String, Object> params) {
        Gson gson = new Gson();
        List<Map<String, Object>> objArr = gson.fromJson((String) params.get("objArr"), new TypeToken<List<Map<String, Object>>>(){}.getType());

        if(params.get("type").equals("upd")){
            for(Map<String, Object> map : objArr) {
                achieveRepository.updDeptObjSetting(map);
            }
        } else {
            for(Map<String, Object> map : objArr) {
                achieveRepository.insDeptObjSetting(map);
            }
        }

    }

    @Override
    public List<Map<String, Object>> getExnpCompAmt(Map<String, Object> params) {
        return achieveRepository.getExnpCompAmt(params);
    }

    @Override
    public List<Map<String, Object>> geincpCompAmt(Map<String, Object> params) {
        return achieveRepository.geincpCompAmt(params);
    }

    @Override
    public Map<String, Object> getResultProject(Map<String, Object> params) {
        return achieveRepository.getResultProject(params);
    }

    @Override
    public Map<String, Object> getPjtDevSn(Map<String, Object> params) {
        return achieveRepository.getPjtDevSn(params);
    }

    @Override
    public void setProjectPaySet(Map<String, Object> params) {
        Map<String, Object> map = new HashMap<>();

        map = achieveRepository.getProjectPaySet(params);
        if(map != null){
            achieveRepository.updProjectPaySet(params);
        } else {
            achieveRepository.insProjectPaySet(params);
        }
    }

    @Override
    public Map<String, Object> getProjectPaySet(Map<String, Object> params) {
        return achieveRepository.getProjectPaySet(params);
    }
}
