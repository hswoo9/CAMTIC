package egovframework.com.devjitsu.cam_achieve.service.impl;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import egovframework.com.devjitsu.cam_achieve.repository.AchieveRepository;
import egovframework.com.devjitsu.cam_achieve.service.AchieveService;
import egovframework.com.devjitsu.cam_manager.repository.ManageRepository;
import egovframework.com.devjitsu.cam_project.repository.ProjectRepository;
import egovframework.com.devjitsu.cam_project.repository.ProjectTeamRepository;
import egovframework.com.devjitsu.g20.repository.G20Repository;
import egovframework.com.devjitsu.inside.employee.repository.EmployRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import java.util.*;

@Service
public class AchieveServiceImpl implements AchieveService {

    @Autowired
    private AchieveRepository achieveRepository;
    @Autowired
    private ProjectRepository projectRepository;
    @Autowired
    private G20Repository g20Repository;
    @Autowired
    private ManageRepository manageRepository;
    @Autowired
    private EmployRepository employRepository;
    @Autowired
    private ProjectTeamRepository projectTeamRepository;

    @Override
    public Map<String, Object> getAllPjtCalc(Map<String, Object> params) {
        Map<String, Object> result = new HashMap<>();

        // 엔지니어링, 기타용역 수주, 예상수주금액
        params.put("busnClass", "D");
        List<Map<String, Object>> engnPjtInfo = achieveRepository.getEngnPjtCalc(params);
        params.put("busnClass", "V");
        List<Map<String, Object>> otherPjtInfo = achieveRepository.getEngnPjtCalc(params);

        // R&D, 비R&D 수주, 예상수주금액
        params.put("busnClass", "R");
        List<Map<String, Object>> rndPjtInfo = achieveRepository.getRndPjtCalc(params);
        params.put("busnClass", "S");
        List<Map<String, Object>> unRndPjtInfo = achieveRepository.getRndPjtCalc(params);

        long expEngnAmt = 0;    // 엔지니어링 예상수주금액
        long expOtherAmt = 0;   // 용역/기타 예상수주금액
        long expRndAmt = 0;     // R&D 예상수주금액
        long expUnRndAmt = 0;   // 비R&D 예상수주금액
        long engnAmt = 0;       // 엔지니어링 수주금액
        long otherAmt = 0;      // 용역/기타 수주금액
        long rndAmt = 0;        // R&D 수주금액
        long unRndAmt = 0;      // 비R&D 수주금액

        long saleEngnAmt = 0;       // 엔지니어링 매출액
        long saleOtherAmt = 0;      // 용역/기타 매출액
        long expSaleEngnAmt = 0;    // 엔지니어링 예상매출액
        long expSaleOtherAmt = 0;   // 용역/기타 예상매출액


        for(Map<String, Object> map : rndPjtInfo) {
            if(map.get("STATUS") != null) {
                if(map.get("STATUS").toString().equals("100")) {
                    // R&D 수주금액
                    rndAmt += map.get("PJT_AMT") == null ? 0 : Long.parseLong(map.get("PJT_AMT").toString());
                } else {
                    // R&D 예상수주
                    expRndAmt += map.get("EXP_AMT") == null ? 0 : Long.parseLong(map.get("EXP_AMT").toString());
                }
            } else {
                // R&D 예상수주
                expRndAmt += map.get("EXP_AMT") == null ? 0 : Long.parseLong(map.get("EXP_AMT").toString());
            }
        }

        for(Map<String, Object> map : unRndPjtInfo) {
            if(map.get("STATUS") != null) {
                if(map.get("STATUS").toString().equals("100")) {
                    // 비R&D 수주금액
                    unRndAmt += map.get("PJT_AMT") == null ? 0 : Long.parseLong(map.get("PJT_AMT").toString());
                } else {
                    // 비R&D 예상수주
                    expUnRndAmt += map.get("EXP_AMT") == null ? 0 : Long.parseLong(map.get("EXP_AMT").toString());
                }
            } else {
                // 비R&D 예상수주
                expUnRndAmt += map.get("EXP_AMT") == null ? 0 : Long.parseLong(map.get("EXP_AMT").toString());
            }
        }

        for(Map<String, Object> map : engnPjtInfo) {
            if(map.get("DELV_STATUS") != null) {
                if(map.get("DELV_STATUS").toString().equals("100")) {
                    // 엔지니어링 예상수주금액
                    expEngnAmt += map.get("EXP_AMT") == null ? 0 : Long.parseLong(map.get("EXP_AMT").toString());
                }
            }

            if(map.get("RESULT_STATUS") != null) {
                if(map.get("RESULT_STATUS").toString().equals("100")) {
                    // 엔지니어링 매출액
                    saleEngnAmt += map.get("PJT_AMT") == null ? 0 : Long.parseLong(map.get("PJT_AMT").toString());
                }
            }

            if(map.get("RESULT_STATUS") != null) {
                if(!map.get("RESULT_STATUS").toString().equals("100") && !map.get("RESULT_STATUS").toString().equals("101") && map.get("DELV_STATUS").toString().equals("100")) {
                    // 엔지니어링 예상매출액
                    expSaleEngnAmt += map.get("PJT_AMT") == null ? 0 : Long.parseLong(map.get("PJT_AMT").toString());
                }
            }

            // 엔지니어링 수주액
            engnAmt += map.get("PJT_AMT") == null ? 0 : Long.parseLong(map.get("PJT_AMT").toString());
        }

        for(Map<String, Object> map : otherPjtInfo) {
            if(map.get("DELV_STATUS") != null) {
                if(map.get("DELV_STATUS").toString().equals("100")) {
                    // 용역/기타 예상수주금액
                    expOtherAmt += map.get("EXP_AMT") == null ? 0 : Long.parseLong(map.get("EXP_AMT").toString());
                }
            }

            if(map.get("RESULT_STATUS") != null) {
                if(map.get("RESULT_STATUS").toString().equals("100")) {
                    // 용역/기타 매출액
                    saleOtherAmt += map.get("PJT_AMT") == null ? 0 : Long.parseLong(map.get("PJT_AMT").toString());
                }
            }

            if(map.get("RESULT_STATUS") != null) {
                if(!map.get("RESULT_STATUS").toString().equals("100") && !map.get("RESULT_STATUS").toString().equals("101") && map.get("DELV_STATUS").toString().equals("100")) {
                    // 용역/기타 예상매출액
                    expSaleOtherAmt += map.get("PJT_AMT") == null ? 0 : Long.parseLong(map.get("PJT_AMT").toString());
                }
            }

            // 용역/기타 수주액
            otherAmt += map.get("PJT_AMT") == null ? 0 : Long.parseLong(map.get("PJT_AMT").toString());
        }

        // R&D 구매,출장,지출 정산 금액
        params.put("busnClass", "R");
        params.put("pjtYear", params.get("year"));
//        long purcRndAmt = achieveRepository.getPurcRndAmt(params);
//        long bustripRndAmt = achieveRepository.getBustripRndAmt(params);
//        long exnpRndAmt = achieveRepository.getExnpRndAmt(params);
        List<Map<String, Object>> exnpRndList = achieveRepository.getExnpRndAmtList(params);
        List<Map<String, Object>> incpRndList = achieveRepository.getIncpRndAmtList(params);
        List<Map<String, Object>> rndPjtList = projectRepository.getProjectList(params);

        long aSum = 0;
        long bSum = 0;
        long cSum = 0;
        long dSum = 0;
        long budgetSum = 0;

        for(Map<String, Object> exnpMap : exnpRndList) {
            if("2".equals(exnpMap.get("PAY_APP_TYPE"))) {
                bSum += Long.parseLong(exnpMap.get("TOT_COST").toString());
            } else{
                aSum += Long.parseLong(exnpMap.get("TOT_COST").toString());
            }
        }
        long saleRndAmt =  aSum - bSum;     // R&D 매출

        for(Map<String, Object> incpMap : incpRndList) {
            if("2".equals(incpMap.get("PAY_APP_TYPE"))) {
                dSum += Long.parseLong(incpMap.get("TOT_COST").toString());
            } else{
                cSum += Long.parseLong(incpMap.get("TOT_COST").toString());
            }
        }
        long incpRndAmt = cSum - dSum;      // R&D 수익

        for(Map<String, Object> pjtMap : rndPjtList) {
            pjtMap.put("pjtCd", pjtMap.get("PJT_CD"));
            List<Map<String, Object>> budgetAmtList = g20Repository.getG20BudgetSum(pjtMap);

            if(budgetAmtList.size() != 0){
                for(Map<String, Object> budgetMap : budgetAmtList) {
                    if("1".equals(budgetMap.get("DRCR_FG"))) {
                        // R&D 예산금액
                        budgetSum += Long.parseLong(budgetMap.get("TOT_COST").toString().split("\\.")[0]);
                    }
                }
            }
        }
        long expSaleRndAmt = budgetSum - saleRndAmt;       // R&D 예상매출 = 예산금액 - R&D 매출
        long expIncpRndAmt = /*budgetSum -*/ incpRndAmt;       // R&D 예상수익 = /*예산금액 -*/ R&D 수익


        // 비R&D 구매,출장,지출 정산 금액
        params.put("busnClass", "S");
//        long purcUnRndAmt = achieveRepository.getPurcRndAmt(params);
//        long bustripUnRndAmt = achieveRepository.getBustripRndAmt(params);
//        long exnpUnRndAmt = achieveRepository.getExnpRndAmt(params);
        List<Map<String, Object>> exnpUnRndList = achieveRepository.getExnpRndAmtList(params);
        List<Map<String, Object>> incpUnRndList = achieveRepository.getIncpRndAmtList(params);
        List<Map<String, Object>> unRndPjtList = projectRepository.getProjectList(params);

        aSum = 0;
        bSum = 0;
        cSum = 0;
        dSum = 0;
        budgetSum = 0;

        for(Map<String, Object> exnpMap : exnpUnRndList) {
            if("2".equals(exnpMap.get("PAY_APP_TYPE"))) {
                bSum += Long.parseLong(exnpMap.get("TOT_COST").toString());
            } else{
                aSum += Long.parseLong(exnpMap.get("TOT_COST").toString());
            }
        }
        long saleUnRndAmt = aSum - bSum;      // 비R&D 매출액

        for(Map<String, Object> incpMap : incpUnRndList) {
            if("2".equals(incpMap.get("PAY_APP_TYPE"))) {
                dSum += Long.parseLong(incpMap.get("TOT_COST").toString());
            } else{
                cSum += Long.parseLong(incpMap.get("TOT_COST").toString());
            }
        }
        long incpUnRndAmt = cSum - dSum;    // 비R&D 수익비용


        for(Map<String, Object> pjtMap : unRndPjtList) {
            pjtMap.put("pjtCd", pjtMap.get("PJT_CD"));
            List<Map<String, Object>> budgetAmtList = g20Repository.getG20BudgetSum(pjtMap);

            if(budgetAmtList.size() != 0){
                for(Map<String, Object> budgetMap : budgetAmtList) {
                    if("1".equals(budgetMap.get("DRCR_FG"))) {
                        // 비R&D 예산금액
                        budgetSum += Long.parseLong(budgetMap.get("TOT_COST").toString().split("\\.")[0]);
                    }
                }
            }
        }
        long expSaleUnRndAmt = budgetSum - saleUnRndAmt;     // 비R&D 예상매출 = 예산금액 - 비R&D 매출
        long expIncpUnRndAmt = /*budgetSum -*/ incpUnRndAmt;     // 비R&D 예상수익 = /*예산금액 -*/ 비R&D 수익


        // 엔지니어링 구매,출장 정산 금액 및 투자금액
        params.put("busnClass", "D");
        long purcEngnAmt = achieveRepository.getPurcEngnAmt(params);
        long bustripEngnAmt = achieveRepository.getBustripEngnAmt(params);
        long estEngnAmt = achieveRepository.getEstEngnAmt(params);


        // 기타용역 구매,출장 정산 금액 및 투자금액
        params.put("busnClass", "V");
        long purcOtherAmt = achieveRepository.getPurcEngnAmt(params);
        long bustripOtherAmt = achieveRepository.getBustripEngnAmt(params);
        long estOtherAmt = achieveRepository.getEstEngnAmt(params);


        // 엔지니어링, 용역/기타 운영수익 및 예상수익
        long incpEngnAmt = saleEngnAmt - (purcEngnAmt + bustripEngnAmt);        // 엔지니어링 수익 = 매출 - (구매 + 출장)
        long incpOtherAmt = saleOtherAmt - (purcOtherAmt + bustripOtherAmt);    // 용역/기타 수익 = 매출 - (구매 + 출장)
        long expIncpEngnAmt = expSaleEngnAmt - estEngnAmt;      // 엔지니어링 예상수익 = 예상매출 - 투자금액
        long expIncpOtherAmt = expSaleOtherAmt - estOtherAmt;   // 용역기타 예상수익 = 예상매출 - 투자금액


        /*
        // 전년도 체크
        params.put("year", Integer.parseInt(params.get("year").toString()) - 1);

        // 전년도 R&D 구매,출장,지출 정산 금액
        params.put("busnClass", "R");
        long purcBefRndAmt = achieveRepository.getPurcRndAmt(params);
        long bustripBefRndAmt = achieveRepository.getBustripRndAmt(params);
        long exnpBefRndAmt = achieveRepository.getExnpRndAmt(params);


        // 전년도 비R&D 구매,출장,지출 정산 금액
        params.put("busnClass", "S");
        long purcBefUnRndAmt = achieveRepository.getPurcRndAmt(params);
        long bustripBefUnRndAmt = achieveRepository.getBustripRndAmt(params);
        long exnpBefUnRndAmt = achieveRepository.getExnpRndAmt(params);


        // 전년도 엔지니어링 구매,출장 정산 금액
        params.put("busnClass", "D");
        long purcBefEngnAmt = achieveRepository.getPurcEngnAmt(params);
        long bustripBefEngnAmt = achieveRepository.getBustripEngnAmt(params);


        // 전년도 기타용역 구매,출장 정산 금액
        params.put("busnClass", "V");
        long purcBefOtherAmt = achieveRepository.getPurcEngnAmt(params);
        long bustripBefOtherAmt = achieveRepository.getBustripEngnAmt(params);


        // 전년도 연구개발 수익
        long befIncpRndAmt = purcBefRndAmt + bustripBefRndAmt + exnpBefRndAmt;
        long befIncpUnRndAmt = purcBefUnRndAmt + bustripBefUnRndAmt + exnpBefUnRndAmt;

        // 전년도 개발일반 수익
        long befIncpEngnAmt = purcBefEngnAmt + bustripBefEngnAmt;
        long befIncpOtherAmt = purcBefOtherAmt + bustripBefOtherAmt;


        // year + 1
        params.put("year", Integer.parseInt(params.get("year").toString()) + 1);
        */


        result.put("expIncpRndAmt", expIncpRndAmt);         // R&D 예상수익
        result.put("expIncpUnRndAmt", expIncpUnRndAmt);     // 비R&D 예상수익
        result.put("expIncpEngnAmt", expIncpEngnAmt);       // 엔지니어링 예상수익
        result.put("expIncpOtherAmt", expIncpOtherAmt);     // 용역/기타 예상수익

        result.put("incpRndAmt", incpRndAmt);               // R&D 수익
        result.put("incpUnRndAmt", incpUnRndAmt);           // 비R&D 수익
        result.put("incpEngnAmt", incpEngnAmt);             // 엔지니어링 수익
        result.put("incpOtherAmt", incpOtherAmt);           // 용역/기타 수익

        result.put("expSaleRndAmt", expSaleRndAmt);         // R&D 예상매출액
        result.put("expSaleUnRndAmt", expSaleUnRndAmt);     // 비R&D 예상매출액
        result.put("expSaleEngnAmt", expSaleEngnAmt);       // 엔지니어링 예상매출액
        result.put("expSaleOtherAmt", expSaleOtherAmt);     // 용역/기타 예상매출액

        result.put("saleRndAmt", saleRndAmt);       // R&D 매출액
        result.put("saleUnRndAmt", saleUnRndAmt);   // 비R&D 매출액
        result.put("saleEngnAmt", saleEngnAmt);     // 엔지니어링 매출액
        result.put("saleOtherAmt", saleOtherAmt);   // 용역/기타 매출액

        result.put("expEngnAmt", expEngnAmt);       // 엔지니어링 예상수주금액
        result.put("expOtherAmt", expOtherAmt);     // 용역/기타 예상수주금액
        result.put("expRndAmt", expRndAmt);         // R&D 예상수주금액
        result.put("expUnRndAmt", expUnRndAmt);     // 비R&D 예상수주금액
        result.put("engnAmt", engnAmt);             // 엔지니어링 수주액
        result.put("otherAmt", otherAmt);           // 용역/기타 수주액
        result.put("rndAmt", rndAmt);               // R&D 수주액
        result.put("unRndAmt", unRndAmt);           // 비R&D 수주액

        // 팀 목표
        params.put("deptLevel", "2");
        params.put("objType", "team");
        Map<String, Object> deptObj = achieveRepository.getDeptObjAmt(params);
        result.put("objDelvAmt", deptObj.get("DELV_OBJ").toString());
        result.put("objSaleAmt", deptObj.get("SALE_OBJ").toString());
        result.put("objIncpAmt", deptObj.get("INCP_OBJ").toString());

        // 운영비 목표
        params.put("objType", "oper");
        Map<String, Object> operObj = achieveRepository.getDeptObjAmt(params);
        result.put("objPayrollAmt", operObj.get("PAYROLL_OBJ").toString());
        result.put("objExnpAmt", operObj.get("EXNP_OBJ").toString());
        result.put("objCommAmt", operObj.get("COMM_OBJ").toString());

        return result;
    }

    @Override
    public Map<String, Object> getDeptPayrollData(Map<String, Object> params){
        return achieveRepository.getDeptPayrollData(params);
    }

    @Override
    public List<Map<String, Object>> getDeptPayrollList(Map<String, Object> params){
        return achieveRepository.getDeptPayrollList(params);
    }

    @Override
    public List<Map<String, Object>> getDeptPayrollDutyList(Map<String, Object> params){
        return achieveRepository.getDeptPayrollDutyList(params);
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
    public Map<String, Object> getIncpByDeptData(Map<String, Object> params) {
        Map<String, Object> result = new HashMap<>();

        List<Map<String, Object>> engnEstList = achieveRepository.getEngnEstList(params);           // 민간사업 투자금액
        List<Map<String, Object>> engnPurcList = achieveRepository.getEngnPurcList(params);         // 민간사업 구매
        List<Map<String, Object>> engnBustripList = achieveRepository.getEngnBustripList(params);   // 민간사업 출장
        List<Map<String, Object>> rndIncpList = achieveRepository.getRndIncpList(params);           // 정부사업 수익

        result.put("engnEstList", engnEstList);
        result.put("engnPurcList", engnPurcList);
        result.put("engnBustripList", engnBustripList);
        result.put("rndIncpList", rndIncpList);

        return result;
    }

    @Override
    public List<Map<String, Object>> getDeptObjList(Map<String, Object> params) {
        return achieveRepository.getDeptObjList(params);
    }

    @Override
    public List<Map<String, Object>> getObjByDeptList(Map<String, Object> params) {
        return achieveRepository.getObjByDeptList(params);
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

        if(params.containsKey("objType") && params.get("objType").equals("team")){
            achieveRepository.insDeptObjSettingHistory(params);
        }

    }

    @Override
    public List<Map<String, Object>> getProjectListByAchieve(Map<String, Object> params) {
        return achieveRepository.getProjectListByAchieve(params);
    }

    @Override
    public Map<String, Object> getExnpCompAmt(Map<String, Object> params) {
        return achieveRepository.getExnpCompAmt(params);
    }
    @Override
    public Map<String, Object> getExnpCompAmtAll(Map<String, Object> params) {
        return achieveRepository.getExnpCompAmtAll(params);
    }

    @Override
    public Map<String, Object> getIncpCompAmt(Map<String, Object> params) {
        return achieveRepository.getIncpCompAmt(params);
    }

    @Override
    public Map<String, Object> getIncpCompAmt2(Map<String, Object> params) {
        return achieveRepository.getIncpCompAmt2(params);
    }

    @Override
    public Map<String, Object> getRealUseExnpAmt(Map<String, Object> params) {
        return achieveRepository.getRealUseExnpAmt(params);
    }
    @Override
    public Map<String, Object> getRealUseExnpAmt2(Map<String, Object> params) {
        return achieveRepository.getRealUseExnpAmt2(params);
    }
    @Override
    public Map<String, Object> getRealUseExnpAmt3(Map<String, Object> params) {
        return achieveRepository.getRealUseExnpAmt3(params);
    }

    @Override
    public Map<String, Object> getRealUseExnpAllAmt(Map<String, Object> params) {
        return achieveRepository.getRealUseExnpAllAmt(params);
    }
    @Override
    public Map<String, Object> getRealUseExnpAllAmt2(Map<String, Object> params) {
        return achieveRepository.getRealUseExnpAllAmt2(params);
    }
    @Override
    public Map<String, Object> getRealUseExnpAllAmt3(Map<String, Object> params) {
        return achieveRepository.getRealUseExnpAllAmt3(params);
    }

    @Override
    public Map<String, Object> getPlanExnpAmt(Map<String, Object> params) {
        return achieveRepository.getPlanExnpAmt(params);
    }
    @Override
    public Map<String, Object> getUseExnpAmt(Map<String, Object> params) {
        return achieveRepository.getUseExnpAmt(params);
    }

    @Override
    public Map<String, Object> getGoodsAmt(Map<String, Object> params) {
        return achieveRepository.getGoodsAmt(params);
    }

    @Override
    public Map<String, Object> getGoodsLastInfo(Map<String, Object> params) {
        return achieveRepository.getGoodsLastInfo(params);
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
    @Override
    public Map<String, Object> getProjectPayBef(Map<String, Object> params) {
        return achieveRepository.getProjectPayBef(params);
    }
    @Override
    public Map<String, Object> getProjectPayNow(Map<String, Object> params) {
        return achieveRepository.getProjectPayNow(params);
    }
    @Override
    public Map<String, Object> getProjectPayAft(Map<String, Object> params) {
        return achieveRepository.getProjectPayAft(params);
    }
    @Override
    public Map<String, Object> getProjectPayBefMul(Map<String, Object> params) {
        return achieveRepository.getProjectPayBefMul(params);
    }
    @Override
    public Map<String, Object> getProjectPayNowMul(Map<String, Object> params) {
        return achieveRepository.getProjectPayNowMul(params);
    }

    @Override
    public List<Map<String, Object>> getExnpList(Map<String, Object> params) {
        return achieveRepository.getExnpList(params);
    }

    @Override
    public List<Map<String, Object>> getExnpDetailList(Map<String, Object> params) {
        return achieveRepository.getExnpDetailList(params);
    }

    @Override
    public List<Map<String, Object>> getDeptExnpList(Map<String, Object> params) {
        return achieveRepository.getDeptExnpList(params);
    }

    @Override
    public List<Map<String, Object>> getDeptPayrollListForTotRate(Map<String, Object> params) {
        return achieveRepository.getDeptPayrollListForTotRate(params);
    }

    @Override
    public List<Map<String, Object>> getExnpListForTotRate(Map<String, Object> params) {
        return achieveRepository.getExnpListForTotRate(params);
    }

    @Override
    public void updateExnpStatus(Map<String, Object> params) {
        achieveRepository.updateExnpStatus(params);
    }

    @Override
    public void updChangeTeam(Map<String, Object> params) {
        achieveRepository.updChangeTeam(params);
    }

    @Override
    public void updateExnpExceptPay(Map<String, Object> params) {
        achieveRepository.updateExnpExceptPay(params);
    }

    @Override
    public List<Map<String, Object>> getEmpRateValue(Map<String, Object> params) {
        return achieveRepository.getEmpRateValue(params);
    }

    @Override
    public void insDeptExpenseRateValue(Map<String, Object> params) {
        Gson gson = new Gson();

        if (!StringUtils.isEmpty(params.get("rateArr"))) {
            List<Map<String, Object>> itemList = gson.fromJson((String) params.get("rateArr"), new TypeToken<List<Map<String, Object>>>(){}.getType());
            achieveRepository.insDeptExpenseRateValue(itemList);
        }
    }

    @Override
    public void updDeptExpenseRateStatus(Map<String, Object> params) {
        achieveRepository.updDeptExpenseRateStatus(params);
    }

    @Override
    public List<Map<String, Object>> getPayRollCompList(Map<String, Object> params) {
        return achieveRepository.getPayRollCompList(params);
    }

    @Override
    public List<Map<String, Object>> getDeptPayRollCompList(Map<String, Object> params) {
        return achieveRepository.getDeptPayRollCompList(params);
    }

    @Override
    public List<Map<String, Object>> getDeptPayrollCompDutyList(Map<String, Object> params) {
        return achieveRepository.getDeptPayrollCompDutyList(params);
    }

    @Override
    public List<Map<String, Object>> getObjHistList(Map<String, Object> params) {
        return achieveRepository.getObjHistList(params);
    }

    @Override
    public Map<String, Object> getCorpProjectData(Map<String, Object> params) {
        Map<String, Object> map = achieveRepository.getCorpProjectData(params);
        Map<String, Object> g20Map = new HashMap<>();
        Map<String, Object> resultMap = new HashMap<>();

        if(map != null) {
            params.put("pjtCd", map.get("CORP_PJT_CD"));
            g20Map = g20Repository.getProjectInfo(params);

            if(g20Map != null) {
                params.put("bankNB", g20Map.get("BA_NB"));
                resultMap = manageRepository.getCurrentAmountStatus(params);
            }
        }

        return resultMap;
    }

    @Override
    public Map<String, Object> getIncpPayData(Map<String, Object> params) {
        Map<String, Object> resultMap = new HashMap<>();
        resultMap.put("privList", achieveRepository.getIncpPayData(params));    // 민간사업 수입예상

        Long commPay = achieveRepository.getCommPayData(params);            // 기관공통지원경비
        List<Map<String, Object>> commPayWaitList = achieveRepository.getCommPayWaitData(params);    // 지출대기
        List<Map<String, Object>> commPayApprList = achieveRepository.getCommPayApprData(params);    // 지출완료
        List<Map<String, Object>> partRateList = employRepository.getCalcPartRate(params);           // 참여율

        Map<String, Object> commPayList = new HashMap<>();
        Long exnpTotalPay = Long.valueOf(0);
        for(int i=0; i<12; i++){

            Long waitPay = Long.valueOf(0);
            Long apprPay = Long.valueOf(0);
            Long partRatePay = Long.valueOf(0);
            Long totalPay = Long.valueOf(0);

            for(Map<String, Object> map : commPayWaitList) {
                for(int j=0; j<(i+1); j++){
                    waitPay += Long.valueOf(map.get("EXNP_TOTAL_PAY_" + (j+1)).toString());
                }
            }

            for(Map<String, Object> map : commPayApprList) {
                for(int j=0; j<(i+1); j++){
                    apprPay += Long.valueOf(map.get("EXNP_TOTAL_PAY_" + (j+1)).toString());
                }
            }

            for(Map<String, Object> map : partRateList) {
                partRatePay += Long.valueOf(map.get("SUM_MON_PAY_" + (i+1)).toString());
            }

            totalPay = (commPay - (waitPay + apprPay) + partRatePay);
            exnpTotalPay += totalPay;
            commPayList.put("EXNP_TOTAL_PAY_" + (i+1), totalPay);
        }

        commPayList.put("EXNP_TOTAL_PAY", exnpTotalPay);
        resultMap.put("govrList", commPayList);    // 정부사업 수입예상

        return resultMap;
    }

    @Override
    public Map<String, Object> getExnpPayData (Map<String, Object> params) {
        Map<String, Object> resultMap = new HashMap<>();

        resultMap.put("psList", achieveRepository.getExnpPersonnelData(params));
        resultMap.put("opList", achieveRepository.getExnpOperationData(params));
        resultMap.put("purcList", achieveRepository.getExnpPurcData(params));

        return resultMap;
    }

    @Override
    public List<Map<String, Object>> getIncpExpList(Map<String, Object> params) {
        return achieveRepository.getIncpExpList(params);
    }

    @Override
    public List<Map<String, Object>> getExnpExpList(Map<String, Object> params) {
        return achieveRepository.getExnpExpList(params);
    }

    @Override
    public void insExpStatus(Map<String, Object> params) {
        if(params.containsKey("expSn")) {
            achieveRepository.updExpStatus(params);
        } else {
            achieveRepository.insExpStatus(params);
        }
    }

    @Override
    public void insExpectPayData(Map<String, Object> params) {
        if(params.containsKey("expPaySn")){
            achieveRepository.updExpectPayData(params);
        } else {
            achieveRepository.insExpectPayData(params);
        }
    }

    @Override
    public void updExpectPayStatus(Map<String, Object> params) {
        achieveRepository.updExpectPayStatus(params);
    }

    @Override
    public Map<String, Object> getExpertPayData(Map<String, Object> params) {
        return achieveRepository.getExpertPayData(params);
    }

    @Override
    public List<Map<String, Object>> getPurcClaimList(Map<String, Object> params) {
        return achieveRepository.getPurcClaimList(params);
    }

    @Override
    public List<Map<String, Object>> getPurcClaimDetList(Map<String, Object> params) {
        return achieveRepository.getPurcClaimDetList(params);
    }

    @Override
    public Map<String, Object> getPurcCrmAchieveData(Map<String, Object> params) {
        return achieveRepository.getPurcCrmAchieveData(params);
    }

    @Override
    public Map<String, Object> getPurcCrmLocAchieveData(Map<String, Object> params) {
        return achieveRepository.getPurcCrmLocAchieveData(params);
    }

    @Override
    public List<Map<String, Object>> getPurcCrmCKAchieveData(Map<String, Object> params) {
        return achieveRepository.getPurcCrmCKAchieveData(params);
    }

    @Override
    public List<Map<String, Object>> getPurcCrmCKAchieveDataDet(Map<String, Object> params) {
        return achieveRepository.getPurcCrmCKAchieveDataDet(params);
    }

    @Override
    public List<Map<String, Object>> getPurcFundAchieveData(Map<String, Object> params) {
        return achieveRepository.getPurcFundAchieveData(params);
    }

    @Override
    public List<Map<String, Object>> getPurcFund2AchieveData(Map<String, Object> params) {
        return achieveRepository.getPurcFund2AchieveData(params);
    }

    @Override
    public List<Map<String, Object>> getPurcAchieveMngList(Map<String, Object> params) {
        return achieveRepository.getPurcAchieveMngList(params);
    }

    @Override
    public int getPjtTeamInvAmt(Map<String, Object> params) {
        return achieveRepository.getPjtTeamInvAmt(params);
    }

    @Override
    public Map<String, Object> getAllPjtCalcTemp(Map<String, Object> params) {
        Map<String, Object> result = new HashMap<>();

        // 엔지니어링, 기타/용역
        params.put("busnClass", "D");
        List<Map<String, Object>> engnPjtInfo = achieveRepository.getProjectListByAchieve(params);
        params.put("busnClass", "V");
        List<Map<String, Object>> otherPjtInfo = achieveRepository.getProjectListByAchieve(params);

        // R&D, 비R&D
        params.put("busnClass", "R");
        List<Map<String, Object>> rndPjtInfo = achieveRepository.getProjectListByAchieve(params);
        params.put("busnClass", "S");
        List<Map<String, Object>> unRndPjtInfo = achieveRepository.getProjectListByAchieve(params);

        long engnAmt = 0;       // 엔지니어링 수주금액
        long otherAmt = 0;      // 용역/기타 수주금액
        long rndAmt = 0;        // R&D 수주금액
        long unRndAmt = 0;      // 비R&D 수주금액

        long expEngnAmt = 0;    // 엔지니어링 예상수주금액
        long expOtherAmt = 0;   // 용역/기타 예상수주금액
        long expRndAmt = 0;     // R&D 예상수주금액
        long expUnRndAmt = 0;   // 비R&D 예상수주금액

        long saleRndAmt = 0;        // R&D 달성매출액
        long saleUnRndAmt = 0;      // 비R&D 달성매출액
        long saleEngnAmt = 0;       // 엔지니어링 달성매출액
        long saleOtherAmt = 0;      // 용역/기타 달성매출액

        long expSaleEngnAmt = 0;    // 엔지니어링 예상매출액
        long expSaleOtherAmt = 0;   // 용역/기타 예상매출액

        long incpRndAmt = 0;        // R&D 달성운영수익
        long incpUnRndAmt = 0;      // 비R&D 달성운영수익
        long incpEngnAmt = 0;       // 엔지니어링 달성운영수익
        long incpOtherAmt = 0;      // 용역/기타 달성운영수익

        long expIncpRndAmt = 0;     // R&D 예상운영수익
        long expIncpUnRndAmt = 0;   // 비R&D 예상운영수익
        long expIncpEngnAmt = 0;    // 엔지니어링 예상운영수익
        long expIncpOtherAmt = 0;   // 용역/기타 예상운영수익


        /** 엔지니어링 */
        long engnCostSum = 0;   // 엔지니어링 지출비용
        long engnPurcSum = 0;   // 엔지니어링 구매비용
        long engnBustSum = 0;   // 엔지니어링 출장비용

        for(Map<String, Object> map : engnPjtInfo) {
            if(map.get("LIST_NOW_STR_DE") != null && map.get("LIST_NOW_END_DE") != null) {
                int nowStrYear = Integer.parseInt(map.get("LIST_NOW_STR_DE").toString().split("-")[0]);     // 프로젝트 시작년도
                int nowEndYear = Integer.parseInt(map.get("LIST_NOW_END_DE").toString().split("-")[0]);     // 프로젝트 종료년도

                Map<String, Object> paramsTempMap = new HashMap<>();
                paramsTempMap.put("pjtSn", map.get("PJT_SN"));

                if(map.get("SBJ_SEP") != null) {
                    paramsTempMap.put("sbjSep", map.get("SBJ_SEP"));
                }

                if(map.get("COST_CLOSE_CK") != null && map.get("COST_CLOSE_CK").toString().equals("Y")) {
                    paramsTempMap.put("costCloseDt", map.get("COST_CLOSE_DT"));
                }

                paramsTempMap.put("reqYear", map.get("YEAR"));
                paramsTempMap.put("busnClass", map.get("BUSN_CLASS"));

                // 당해년도 종료 사업 여부
                if(nowStrYear == nowEndYear) {

                    if(map.get("COST_CLOSE_CK").equals("Y")) {      // 사업종료 여부

                        if(map.get("TEAM_CK").equals("Y")) {        // 협업 - 수주부서
                            engnAmt += map.get("PJT_AMT") == null ? 0 : Long.parseLong(map.get("PJT_AMT").toString());                  // 수주금액
                            saleEngnAmt += map.get("REAL_PJT_AMT") == null ? 0 : Long.parseLong(map.get("REAL_PJT_AMT").toString());    // 달성매출
                            engnCostSum += achieveRepository.getEngnUseExnpCostAmt(paramsTempMap);                                      // 지출비용
                            engnPurcSum += achieveRepository.getEngnUseExnpPurcAmt(paramsTempMap);                                      // 구매비용
                            engnBustSum += achieveRepository.getEngnUseExnpBustAmt(paramsTempMap);                                      // 출장비용
                        } else {
                            if(map.get("TEAM_STAT").equals("Y")) {  // 협업 - 협업부서
                                saleEngnAmt += map.get("REAL_PJT_AMT") == null ? 0 : Long.parseLong(map.get("REAL_PJT_AMT").toString());    // 달성매출
                                engnCostSum += achieveRepository.getEngnUseExnpCostAmt(paramsTempMap);                                      // 지출비용
                                engnPurcSum += achieveRepository.getEngnUseExnpPurcAmt(paramsTempMap);                                      // 구매비용
                                engnBustSum += achieveRepository.getEngnUseExnpBustAmt(paramsTempMap);                                      // 출장비용
                            } else {
                                engnAmt += map.get("PJT_AMT") == null ? 0 : Long.parseLong(map.get("PJT_AMT").toString());              // 수주금액
                                saleEngnAmt += achieveRepository.getEngnGoodsAmt(paramsTempMap);                                        // 달성매출
                                engnCostSum += achieveRepository.getEngnUseExnpCostAmt(paramsTempMap);                                  // 지출비용
                                engnPurcSum += achieveRepository.getEngnUseExnpPurcAmt(paramsTempMap);                                  // 구매비용
                                engnBustSum += achieveRepository.getEngnUseExnpBustAmt(paramsTempMap);                                  // 출장비용
                            }
                        }
                    } else {

                        if(map.get("TEAM_CK").equals("Y")) {        // 협업 - 수주부서
                            engnAmt += map.get("PJT_AMT") == null ? 0 : Long.parseLong(map.get("PJT_AMT").toString());                      // 수주금액
                            expSaleEngnAmt += (map.get("REAL_PJT_AMT") == null ? 0 : Long.parseLong(map.get("REAL_PJT_AMT").toString()));   // 예상달성매출

                            if(map.containsKey("PNT_TM_SN")) {
                                paramsTempMap.put("tmSn", map.get("PNT_TM_SN"));
                                map.put("DEV_INV_AMT", achieveRepository.getPjtTeamInvAmt(paramsTempMap));      // 협업 예상비용
                            }

                            expIncpEngnAmt += (map.get("REAL_PJT_AMT") == null ? 0 : Long.parseLong(map.get("REAL_PJT_AMT").toString())) - (map.get("DEV_INV_AMT") == null ? 0 : Long.parseLong(map.get("DEV_INV_AMT").toString()));       // 예상달성운영수익

                        } else {
                            if(map.get("TEAM_STAT").equals("Y")) {  // 협업 - 협업부서
                                expSaleEngnAmt += (map.get("REAL_PJT_AMT") == null ? 0 : Long.parseLong(map.get("REAL_PJT_AMT").toString()));       // 예상달성매출

                                if(map.containsKey("TM_SN")) {
                                    paramsTempMap.put("tmSn", map.get("TM_SN"));
                                    map.put("DEV_INV_AMT", achieveRepository.getPjtTeamInvAmt(paramsTempMap));  // 협업 예상비용
                                }

                                expIncpEngnAmt += (map.get("REAL_PJT_AMT") == null ? 0 : Long.parseLong(map.get("REAL_PJT_AMT").toString())) - (map.get("DEV_INV_AMT") == null ? 0 : Long.parseLong(map.get("DEV_INV_AMT").toString()));   // 예상달성운영수익

                            } else {
                                engnAmt += map.get("PJT_AMT") == null ? 0 : Long.parseLong(map.get("PJT_AMT").toString());      // 수주금액

                                Map<String, Object> getPjtDevInfo = achieveRepository.getPjtDevSn(paramsTempMap);
                                if(getPjtDevInfo != null) {
                                    map.put("DEV_INV_AMT", getPjtDevInfo.get("INV_TOT_SUM"));       // 수행계획금액
                                }

                                Map<String, Object> projectPaySetData1 = achieveRepository.getProjectPayBef(paramsTempMap);
                                if(projectPaySetData1 != null) {
                                    long befExpSaleAmt = Long.parseLong(projectPaySetData1.get("AFT_SALE_AMT").toString() == null ? "0" : projectPaySetData1.get("AFT_SALE_AMT").toString());           // 차년도 매출액
                                    long befExpProfitAmt = Long.parseLong(projectPaySetData1.get("AFT_PROFIT_AMT").toString() == null ? "0" : projectPaySetData1.get("AFT_PROFIT_AMT").toString());     // 차년도 운영수익
                                    expSaleEngnAmt += (map.get("REAL_PJT_AMT") == null ? 0 : Long.parseLong(map.get("REAL_PJT_AMT").toString())) - befExpSaleAmt;   // 예상매출액
                                    expIncpEngnAmt += (map.get("REAL_PJT_AMT") == null ? 0 : Long.parseLong(map.get("REAL_PJT_AMT").toString())) - (map.get("DEV_INV_AMT") == null ? 0 : Long.parseLong(map.get("DEV_INV_AMT").toString())) - befExpProfitAmt;  // 예상달성운영수익
                                } else {
                                    expSaleEngnAmt += (map.get("REAL_PJT_AMT") == null ? 0 : Long.parseLong(map.get("REAL_PJT_AMT").toString()));                   // 예상매출액
                                    expIncpEngnAmt += (map.get("REAL_PJT_AMT") == null ? 0 : Long.parseLong(map.get("REAL_PJT_AMT").toString())) - (map.get("DEV_INV_AMT") == null ? 0 : Long.parseLong(map.get("DEV_INV_AMT").toString()));                    // 예상달성운영수익
                                }

                            }
                        }
                    }
                } else {
                    // 프로젝트 종료년도 = 조회년도
                    if(nowEndYear == Integer.parseInt(map.get("YEAR").toString())) {

                        if(map.get("COST_CLOSE_CK").equals("Y")) {      // 사업종료 여부

                            if(map.get("TEAM_CK").equals("Y")) {        // 협업 - 수주부서

                                Map<String, Object> projectPaySetData1 = achieveRepository.getProjectPayBefMul(paramsTempMap);
                                long befExpSaleAmt = Long.parseLong(projectPaySetData1.get("AFT_SALE_AMT").toString() == null ? "0" : projectPaySetData1.get("AFT_SALE_AMT").toString());
                                saleEngnAmt += (map.get("REAL_PJT_AMT") == null ? 0 : Long.parseLong(map.get("REAL_PJT_AMT").toString())) + befExpSaleAmt;      // 달성매출

                                paramsTempMap.put("befYear", "Y");
                                engnCostSum += achieveRepository.getEngnUseExnpCostAmt(paramsTempMap);   // 지출비용
                                engnPurcSum += achieveRepository.getEngnUseExnpPurcAmt(paramsTempMap);   // 구매비용
                                engnBustSum += achieveRepository.getEngnUseExnpBustAmt(paramsTempMap);   // 출장비용

                            } else {

                                if(map.get("TEAM_STAT").equals("Y")) {  // 협업 - 협업부서

                                    Map<String, Object> projectPaySetData1 = achieveRepository.getProjectPayBefMul(paramsTempMap);
                                    long befExpSaleAmt = Long.parseLong(projectPaySetData1.get("AFT_SALE_AMT").toString() == null ? "0" : projectPaySetData1.get("AFT_SALE_AMT").toString());
                                    saleEngnAmt += (map.get("REAL_PJT_AMT") == null ? 0 : Long.parseLong(map.get("REAL_PJT_AMT").toString())) + befExpSaleAmt;

                                    paramsTempMap.put("befYear", "Y");
                                    engnCostSum += achieveRepository.getEngnUseExnpCostAmt(paramsTempMap);   // 지출비용
                                    engnPurcSum += achieveRepository.getEngnUseExnpPurcAmt(paramsTempMap);   // 구매비용
                                    engnBustSum += achieveRepository.getEngnUseExnpBustAmt(paramsTempMap);   // 출장비용

                                } else {
                                    saleEngnAmt += achieveRepository.getEngnGoodsAmt(paramsTempMap);        // 달성매출액

                                    paramsTempMap.put("befYear", "Y");
                                    engnCostSum += achieveRepository.getEngnUseExnpCostAmt(paramsTempMap);   // 지출비용
                                    engnPurcSum += achieveRepository.getEngnUseExnpPurcAmt(paramsTempMap);   // 구매비용
                                    engnBustSum += achieveRepository.getEngnUseExnpBustAmt(paramsTempMap);   // 출장비용
                                }
                            }
                        } else {
                            Map<String, Object> projectPaySetData1 = achieveRepository.getProjectPayBef(paramsTempMap);
                            if(projectPaySetData1 != null) {
                                long befExpSaleAmt = Long.parseLong(projectPaySetData1.get("AFT_SALE_AMT").toString() == null ? "0" : projectPaySetData1.get("AFT_SALE_AMT").toString());           // 차년도 매출액
                                long befExpProfitAmt = Long.parseLong(projectPaySetData1.get("AFT_PROFIT_AMT").toString() == null ? "0" : projectPaySetData1.get("AFT_PROFIT_AMT").toString());     // 차년도 운영수익
                                expSaleEngnAmt += befExpSaleAmt;   // 예상매출액
                                expIncpEngnAmt += befExpProfitAmt; // 예상운영수익
                            }
                        }

                    } else if (nowStrYear == Integer.parseInt(map.get("YEAR").toString())) {        // 프로젝트 시작년도 = 조회년도

                        // 회계년도 마감여부
                        if(map.get("NOW_DEADLINE_YN") != null && map.get("NOW_DEADLINE_YN").toString().equals("Y")) {

                            if(map.get("TEAM_CK").equals("Y")) {
                                engnAmt += map.get("PJT_AMT") == null ? 0 : Long.parseLong(map.get("PJT_AMT").toString());

                                Map<String, Object> projectPaySetData2 = achieveRepository.getProjectPayNow(paramsTempMap);
                                long nowExpSaleAmt = Long.parseLong(projectPaySetData2.get("AFT_SALE_AMT").toString() == null ? "0" : projectPaySetData2.get("AFT_SALE_AMT").toString());
                                saleEngnAmt += (map.get("REAL_PJT_AMT") == null ? 0 : Long.parseLong(map.get("REAL_PJT_AMT").toString())) - nowExpSaleAmt;

                            } else {
                                if(map.get("TEAM_STAT").equals("Y")) {

                                    Map<String, Object> projectPaySetData2 = achieveRepository.getProjectPayNow(paramsTempMap);
                                    long nowExpSaleAmt = Long.parseLong(projectPaySetData2.get("AFT_SALE_AMT").toString() == null ? "0" : projectPaySetData2.get("AFT_SALE_AMT").toString());
                                    saleEngnAmt += (map.get("REAL_PJT_AMT") == null ? 0 : Long.parseLong(map.get("REAL_PJT_AMT").toString())) - nowExpSaleAmt;

                                } else {
                                    engnAmt += map.get("PJT_AMT") == null ? 0 : Long.parseLong(map.get("PJT_AMT").toString());
                                }
                            }

                        } else {

                            if(map.get("TEAM_CK").equals("Y")) {
                                engnAmt += map.get("PJT_AMT") == null ? 0 : Long.parseLong(map.get("PJT_AMT").toString());
                                expSaleEngnAmt += (map.get("REAL_PJT_AMT") == null ? 0 : Long.parseLong(map.get("REAL_PJT_AMT").toString()));

                                if(map.containsKey("PNT_TM_SN")) {
                                    paramsTempMap.put("tmSn", map.get("PNT_TM_SN"));
                                    map.put("DEV_INV_AMT", achieveRepository.getPjtTeamInvAmt(paramsTempMap));
                                }

                                expIncpEngnAmt += (map.get("REAL_PJT_AMT") == null ? 0 : Long.parseLong(map.get("REAL_PJT_AMT").toString())) - (map.get("DEV_INV_AMT") == null ? 0 : Long.parseLong(map.get("DEV_INV_AMT").toString()));   // 예상달성운영수익

                            } else {
                                if(map.get("TEAM_STAT").equals("Y")) {
                                    expSaleEngnAmt += (map.get("REAL_PJT_AMT") == null ? 0 : Long.parseLong(map.get("REAL_PJT_AMT").toString()));

                                    if(map.containsKey("TM_SN")) {
                                        paramsTempMap.put("tmSn", map.get("TM_SN"));
                                        map.put("DEV_INV_AMT", achieveRepository.getPjtTeamInvAmt(paramsTempMap));
                                    }

                                    expIncpEngnAmt += (map.get("REAL_PJT_AMT") == null ? 0 : Long.parseLong(map.get("REAL_PJT_AMT").toString())) - (map.get("DEV_INV_AMT") == null ? 0 : Long.parseLong(map.get("DEV_INV_AMT").toString()));   // 예상달성운영수익

                                } else {
                                    engnAmt += map.get("PJT_AMT") == null ? 0 : Long.parseLong(map.get("PJT_AMT").toString());

                                    Map<String, Object> getPjtDevInfo = achieveRepository.getPjtDevSn(paramsTempMap);
                                    if(getPjtDevInfo != null) {
                                        map.put("DEV_INV_AMT", getPjtDevInfo.get("INV_TOT_SUM"));
                                    }

                                    Map<String, Object> projectPaySetData1 = achieveRepository.getProjectPayBef(paramsTempMap);
                                    if(projectPaySetData1 != null) {
                                        long befExpSaleAmt = Long.parseLong(projectPaySetData1.get("AFT_SALE_AMT").toString() == null ? "0" : projectPaySetData1.get("AFT_SALE_AMT").toString());   // 차년도 매출액
                                        long befExpProfitAmt = Long.parseLong(projectPaySetData1.get("AFT_PROFIT_AMT").toString() == null ? "0" : projectPaySetData1.get("AFT_PROFIT_AMT").toString());     // 차년도 운영수익
                                        expSaleEngnAmt += (map.get("REAL_PJT_AMT") == null ? 0 : Long.parseLong(map.get("REAL_PJT_AMT").toString())) - befExpSaleAmt;   // 예상매출액
                                        expIncpEngnAmt += (map.get("REAL_PJT_AMT") == null ? 0 : Long.parseLong(map.get("REAL_PJT_AMT").toString())) - (map.get("DEV_INV_AMT") == null ? 0 : Long.parseLong(map.get("DEV_INV_AMT").toString())) - befExpProfitAmt;   // 예상달성운영수익
                                    } else {
                                        expSaleEngnAmt += (map.get("REAL_PJT_AMT") == null ? 0 : Long.parseLong(map.get("REAL_PJT_AMT").toString()));
                                        expIncpEngnAmt += (map.get("REAL_PJT_AMT") == null ? 0 : Long.parseLong(map.get("REAL_PJT_AMT").toString())) - (map.get("DEV_INV_AMT") == null ? 0 : Long.parseLong(map.get("DEV_INV_AMT").toString()));
                                    }
                                }
                            }

                        }
                    } else {        // 중간년도 = 조회년도
                        // 회계년도 마감여부
                        if(map.get("NOW_DEADLINE_YN") != null && map.get("NOW_DEADLINE_YN").toString().equals("Y")) {

                        }
                    }
                }
            }
        }

        // 엔지니어링 달성운영수익 = 달성매출액 - 총 비용합계
        incpEngnAmt = saleEngnAmt - (engnCostSum + engnPurcSum + engnBustSum);


        /** 용역/기타 */
        long otherCostSum = 0;   // 용역/기타 지출비용
        long otherPurcSum = 0;   // 용역/기타 구매비용
        long otherBustSum = 0;   // 용역/기타 출장비용

        for(Map<String, Object> map : otherPjtInfo) {
            if(map.get("LIST_NOW_STR_DE") != null && map.get("LIST_NOW_END_DE") != null) {
                int nowStrYear = Integer.parseInt(map.get("LIST_NOW_STR_DE").toString().split("-")[0]);     // 프로젝트 시작년도
                int nowEndYear = Integer.parseInt(map.get("LIST_NOW_END_DE").toString().split("-")[0]);     // 프로젝트 종료년도

                Map<String, Object> paramsTempMap = new HashMap<>();
                paramsTempMap.put("pjtSn", map.get("PJT_SN"));

                if(map.get("SBJ_SEP") != null) {
                    paramsTempMap.put("sbjSep", map.get("SBJ_SEP"));
                }

                if(map.get("COST_CLOSE_CK") != null && map.get("COST_CLOSE_CK").toString().equals("Y")) {
                    paramsTempMap.put("costCloseDt", map.get("COST_CLOSE_DT"));
                }

                paramsTempMap.put("reqYear", map.get("YEAR"));
                paramsTempMap.put("busnClass", map.get("BUSN_CLASS"));

                // 당해년도 종료 사업 여부
                if(nowStrYear == nowEndYear) {

                    if(map.get("COST_CLOSE_CK").equals("Y")) {      // 사업종료 여부

                        if(map.get("TEAM_CK").equals("Y")) {        // 협업 - 수주부서
                            otherAmt += map.get("PJT_AMT") == null ? 0 : Long.parseLong(map.get("PJT_AMT").toString());                  // 수주금액
                            saleOtherAmt += map.get("REAL_PJT_AMT") == null ? 0 : Long.parseLong(map.get("REAL_PJT_AMT").toString());    // 달성매출
                            otherCostSum += achieveRepository.getEngnUseExnpCostAmt(paramsTempMap);                                      // 지출비용
                            otherPurcSum += achieveRepository.getEngnUseExnpPurcAmt(paramsTempMap);                                      // 구매비용
                            otherBustSum += achieveRepository.getEngnUseExnpBustAmt(paramsTempMap);                                      // 출장비용
                        } else {
                            if(map.get("TEAM_STAT").equals("Y")) {  // 협업 - 협업부서
                                saleOtherAmt += map.get("REAL_PJT_AMT") == null ? 0 : Long.parseLong(map.get("REAL_PJT_AMT").toString());    // 달성매출
                                otherCostSum += achieveRepository.getEngnUseExnpCostAmt(paramsTempMap);                                      // 지출비용
                                otherPurcSum += achieveRepository.getEngnUseExnpPurcAmt(paramsTempMap);                                      // 구매비용
                                otherBustSum += achieveRepository.getEngnUseExnpBustAmt(paramsTempMap);                                      // 출장비용
                            } else {
                                otherAmt += map.get("PJT_AMT") == null ? 0 : Long.parseLong(map.get("PJT_AMT").toString());              // 수주금액
                                saleOtherAmt += achieveRepository.getEngnGoodsAmt(paramsTempMap);                                        // 달성매출
                                otherCostSum += achieveRepository.getEngnUseExnpCostAmt(paramsTempMap);                                  // 지출비용
                                otherPurcSum += achieveRepository.getEngnUseExnpPurcAmt(paramsTempMap);                                  // 구매비용
                                otherBustSum += achieveRepository.getEngnUseExnpBustAmt(paramsTempMap);                                  // 출장비용
                            }
                        }
                    } else {

                        if(map.get("TEAM_CK").equals("Y")) {        // 협업 - 수주부서
                            otherAmt += map.get("PJT_AMT") == null ? 0 : Long.parseLong(map.get("PJT_AMT").toString());                      // 수주금액
                            expSaleOtherAmt += (map.get("REAL_PJT_AMT") == null ? 0 : Long.parseLong(map.get("REAL_PJT_AMT").toString()));   // 예상달성매출

                            if(map.containsKey("PNT_TM_SN")) {
                                paramsTempMap.put("tmSn", map.get("PNT_TM_SN"));
                                map.put("DEV_INV_AMT", achieveRepository.getPjtTeamInvAmt(paramsTempMap));      // 협업 예상비용
                            }

                            expIncpOtherAmt += (map.get("REAL_PJT_AMT") == null ? 0 : Long.parseLong(map.get("REAL_PJT_AMT").toString())) - (map.get("DEV_INV_AMT") == null ? 0 : Long.parseLong(map.get("DEV_INV_AMT").toString()));       // 예상달성운영수익

                        } else {
                            if(map.get("TEAM_STAT").equals("Y")) {  // 협업 - 협업부서
                                expSaleOtherAmt += (map.get("REAL_PJT_AMT") == null ? 0 : Long.parseLong(map.get("REAL_PJT_AMT").toString()));       // 예상달성매출

                                if(map.containsKey("TM_SN")) {
                                    paramsTempMap.put("tmSn", map.get("TM_SN"));
                                    map.put("DEV_INV_AMT", achieveRepository.getPjtTeamInvAmt(paramsTempMap));  // 협업 예상비용
                                }

                                expIncpOtherAmt += (map.get("REAL_PJT_AMT") == null ? 0 : Long.parseLong(map.get("REAL_PJT_AMT").toString())) - (map.get("DEV_INV_AMT") == null ? 0 : Long.parseLong(map.get("DEV_INV_AMT").toString()));   // 예상달성운영수익

                            } else {
                                otherAmt += map.get("PJT_AMT") == null ? 0 : Long.parseLong(map.get("PJT_AMT").toString());      // 수주금액

                                Map<String, Object> getPjtDevInfo = achieveRepository.getPjtDevSn(paramsTempMap);
                                if(getPjtDevInfo != null) {
                                    map.put("DEV_INV_AMT", getPjtDevInfo.get("INV_TOT_SUM"));       // 수행계획금액
                                }

                                Map<String, Object> projectPaySetData1 = achieveRepository.getProjectPayBef(paramsTempMap);
                                if(projectPaySetData1 != null) {
                                    long befExpSaleAmt = Long.parseLong(projectPaySetData1.get("AFT_SALE_AMT").toString() == null ? "0" : projectPaySetData1.get("AFT_SALE_AMT").toString());           // 차년도 매출액
                                    long befExpProfitAmt = Long.parseLong(projectPaySetData1.get("AFT_PROFIT_AMT").toString() == null ? "0" : projectPaySetData1.get("AFT_PROFIT_AMT").toString());     // 차년도 운영수익
                                    expSaleOtherAmt += (map.get("REAL_PJT_AMT") == null ? 0 : Long.parseLong(map.get("REAL_PJT_AMT").toString())) - befExpSaleAmt;   // 예상매출액
                                    expIncpOtherAmt += (map.get("REAL_PJT_AMT") == null ? 0 : Long.parseLong(map.get("REAL_PJT_AMT").toString())) - (map.get("DEV_INV_AMT") == null ? 0 : Long.parseLong(map.get("DEV_INV_AMT").toString())) - befExpProfitAmt;  // 예상달성운영수익
                                } else {
                                    expSaleOtherAmt += (map.get("REAL_PJT_AMT") == null ? 0 : Long.parseLong(map.get("REAL_PJT_AMT").toString()));                   // 예상매출액
                                    expIncpOtherAmt += (map.get("REAL_PJT_AMT") == null ? 0 : Long.parseLong(map.get("REAL_PJT_AMT").toString())) - (map.get("DEV_INV_AMT") == null ? 0 : Long.parseLong(map.get("DEV_INV_AMT").toString()));                    // 예상달성운영수익
                                }

                            }
                        }
                    }
                } else {
                    // 프로젝트 종료년도 = 조회년도
                    if(nowEndYear == Integer.parseInt(map.get("YEAR").toString())) {

                        if(map.get("COST_CLOSE_CK").equals("Y")) {      // 사업종료 여부

                            if(map.get("TEAM_CK").equals("Y")) {        // 협업 - 수주부서

                                Map<String, Object> projectPaySetData1 = achieveRepository.getProjectPayBefMul(paramsTempMap);
                                long befExpSaleAmt = Long.parseLong(projectPaySetData1.get("AFT_SALE_AMT").toString() == null ? "0" : projectPaySetData1.get("AFT_SALE_AMT").toString());
                                saleOtherAmt += (map.get("REAL_PJT_AMT") == null ? 0 : Long.parseLong(map.get("REAL_PJT_AMT").toString())) + befExpSaleAmt;      // 달성매출

                                paramsTempMap.put("befYear", "Y");
                                otherCostSum += achieveRepository.getEngnUseExnpCostAmt(paramsTempMap);   // 지출비용
                                otherPurcSum += achieveRepository.getEngnUseExnpPurcAmt(paramsTempMap);   // 구매비용
                                otherBustSum += achieveRepository.getEngnUseExnpBustAmt(paramsTempMap);   // 출장비용

                            } else {

                                if(map.get("TEAM_STAT").equals("Y")) {  // 협업 - 협업부서

                                    Map<String, Object> projectPaySetData1 = achieveRepository.getProjectPayBefMul(paramsTempMap);
                                    long befExpSaleAmt = Long.parseLong(projectPaySetData1.get("AFT_SALE_AMT").toString() == null ? "0" : projectPaySetData1.get("AFT_SALE_AMT").toString());
                                    saleOtherAmt += (map.get("REAL_PJT_AMT") == null ? 0 : Long.parseLong(map.get("REAL_PJT_AMT").toString())) + befExpSaleAmt;

                                    paramsTempMap.put("befYear", "Y");
                                    otherCostSum += achieveRepository.getEngnUseExnpCostAmt(paramsTempMap);   // 지출비용
                                    otherPurcSum += achieveRepository.getEngnUseExnpPurcAmt(paramsTempMap);   // 구매비용
                                    otherBustSum += achieveRepository.getEngnUseExnpBustAmt(paramsTempMap);   // 출장비용

                                } else {
                                    saleOtherAmt += achieveRepository.getEngnGoodsAmt(paramsTempMap);        // 달성매출액

                                    paramsTempMap.put("befYear", "Y");
                                    otherCostSum += achieveRepository.getEngnUseExnpCostAmt(paramsTempMap);   // 지출비용
                                    otherPurcSum += achieveRepository.getEngnUseExnpPurcAmt(paramsTempMap);   // 구매비용
                                    otherBustSum += achieveRepository.getEngnUseExnpBustAmt(paramsTempMap);   // 출장비용
                                }
                            }
                        } else {
                            Map<String, Object> projectPaySetData1 = achieveRepository.getProjectPayBef(paramsTempMap);
                            if(projectPaySetData1 != null) {
                                long befExpSaleAmt = Long.parseLong(projectPaySetData1.get("AFT_SALE_AMT").toString() == null ? "0" : projectPaySetData1.get("AFT_SALE_AMT").toString());           // 차년도 매출액
                                long befExpProfitAmt = Long.parseLong(projectPaySetData1.get("AFT_PROFIT_AMT").toString() == null ? "0" : projectPaySetData1.get("AFT_PROFIT_AMT").toString());     // 차년도 운영수익
                                expSaleOtherAmt += befExpSaleAmt;   // 예상매출액
                                expIncpOtherAmt += befExpProfitAmt; // 예상운영수익
                            }
                        }

                    } else if (nowStrYear == Integer.parseInt(map.get("YEAR").toString())) {        // 프로젝트 시작년도 = 조회년도

                        // 회계년도 마감여부
                        if(map.get("NOW_DEADLINE_YN") != null && map.get("NOW_DEADLINE_YN").toString().equals("Y")) {

                            if(map.get("TEAM_CK").equals("Y")) {
                                otherAmt += map.get("PJT_AMT") == null ? 0 : Long.parseLong(map.get("PJT_AMT").toString());

                                Map<String, Object> projectPaySetData2 = achieveRepository.getProjectPayNow(paramsTempMap);
                                long nowExpSaleAmt = Long.parseLong(projectPaySetData2.get("AFT_SALE_AMT").toString() == null ? "0" : projectPaySetData2.get("AFT_SALE_AMT").toString());
                                saleOtherAmt += (map.get("REAL_PJT_AMT") == null ? 0 : Long.parseLong(map.get("REAL_PJT_AMT").toString())) - nowExpSaleAmt;

                            } else {
                                if(map.get("TEAM_STAT").equals("Y")) {

                                    Map<String, Object> projectPaySetData2 = achieveRepository.getProjectPayNow(paramsTempMap);
                                    long nowExpSaleAmt = Long.parseLong(projectPaySetData2.get("AFT_SALE_AMT").toString() == null ? "0" : projectPaySetData2.get("AFT_SALE_AMT").toString());
                                    saleOtherAmt += (map.get("REAL_PJT_AMT") == null ? 0 : Long.parseLong(map.get("REAL_PJT_AMT").toString())) - nowExpSaleAmt;

                                } else {
                                    otherAmt += map.get("PJT_AMT") == null ? 0 : Long.parseLong(map.get("PJT_AMT").toString());
                                }
                            }

                        } else {

                            if(map.get("TEAM_CK").equals("Y")) {
                                otherAmt += map.get("PJT_AMT") == null ? 0 : Long.parseLong(map.get("PJT_AMT").toString());
                                expSaleOtherAmt += (map.get("REAL_PJT_AMT") == null ? 0 : Long.parseLong(map.get("REAL_PJT_AMT").toString()));

                                if(map.containsKey("PNT_TM_SN")) {
                                    paramsTempMap.put("tmSn", map.get("PNT_TM_SN"));
                                    map.put("DEV_INV_AMT", achieveRepository.getPjtTeamInvAmt(paramsTempMap));
                                }

                                expIncpOtherAmt += (map.get("REAL_PJT_AMT") == null ? 0 : Long.parseLong(map.get("REAL_PJT_AMT").toString())) - (map.get("DEV_INV_AMT") == null ? 0 : Long.parseLong(map.get("DEV_INV_AMT").toString()));   // 예상달성운영수익

                            } else {
                                if(map.get("TEAM_STAT").equals("Y")) {
                                    expSaleOtherAmt += (map.get("REAL_PJT_AMT") == null ? 0 : Long.parseLong(map.get("REAL_PJT_AMT").toString()));

                                    if(map.containsKey("TM_SN")) {
                                        paramsTempMap.put("tmSn", map.get("TM_SN"));
                                        map.put("DEV_INV_AMT", achieveRepository.getPjtTeamInvAmt(paramsTempMap));
                                    }

                                    expIncpOtherAmt += (map.get("REAL_PJT_AMT") == null ? 0 : Long.parseLong(map.get("REAL_PJT_AMT").toString())) - (map.get("DEV_INV_AMT") == null ? 0 : Long.parseLong(map.get("DEV_INV_AMT").toString()));   // 예상달성운영수익

                                } else {
                                    otherAmt += map.get("PJT_AMT") == null ? 0 : Long.parseLong(map.get("PJT_AMT").toString());

                                    Map<String, Object> getPjtDevInfo = achieveRepository.getPjtDevSn(paramsTempMap);
                                    if(getPjtDevInfo != null) {
                                        map.put("DEV_INV_AMT", getPjtDevInfo.get("INV_TOT_SUM"));
                                    }

                                    Map<String, Object> projectPaySetData1 = achieveRepository.getProjectPayBef(paramsTempMap);
                                    if(projectPaySetData1 != null) {
                                        long befExpSaleAmt = Long.parseLong(projectPaySetData1.get("AFT_SALE_AMT").toString() == null ? "0" : projectPaySetData1.get("AFT_SALE_AMT").toString());   // 차년도 매출액
                                        long befExpProfitAmt = Long.parseLong(projectPaySetData1.get("AFT_PROFIT_AMT").toString() == null ? "0" : projectPaySetData1.get("AFT_PROFIT_AMT").toString());     // 차년도 운영수익
                                        expSaleOtherAmt += (map.get("REAL_PJT_AMT") == null ? 0 : Long.parseLong(map.get("REAL_PJT_AMT").toString())) - befExpSaleAmt;   // 예상매출액
                                        expIncpOtherAmt += (map.get("REAL_PJT_AMT") == null ? 0 : Long.parseLong(map.get("REAL_PJT_AMT").toString())) - (map.get("DEV_INV_AMT") == null ? 0 : Long.parseLong(map.get("DEV_INV_AMT").toString())) - befExpProfitAmt;   // 예상달성운영수익
                                    } else {
                                        expSaleOtherAmt += (map.get("REAL_PJT_AMT") == null ? 0 : Long.parseLong(map.get("REAL_PJT_AMT").toString()));
                                        expIncpOtherAmt += (map.get("REAL_PJT_AMT") == null ? 0 : Long.parseLong(map.get("REAL_PJT_AMT").toString())) - (map.get("DEV_INV_AMT") == null ? 0 : Long.parseLong(map.get("DEV_INV_AMT").toString()));
                                    }
                                }
                            }

                        }
                    } else {        // 중간년도 = 조회년도
                        // 회계년도 마감여부
                        if(map.get("NOW_DEADLINE_YN") != null && map.get("NOW_DEADLINE_YN").toString().equals("Y")) {

                        }
                    }
                }
            }
        }

        // 용역/기타 달성운영수익 = 달성매출액 - 총 비용합계
        incpOtherAmt = saleOtherAmt - (otherCostSum + otherPurcSum + otherBustSum);


        /** R&D */
        long rndCostSum = 0;   // R&D 지출비용
        long rndPurcSum = 0;   // R&D 구매비용
        long rndBustSum = 0;   // R&D 출장비용

        for(Map<String, Object> map : rndPjtInfo) {
            if(map.get("LIST_NOW_STR_DE") != null && map.get("LIST_NOW_END_DE") != null) {
                int nowStrYear = Integer.parseInt(map.get("LIST_NOW_STR_DE").toString().split("-")[0]);     // 프로젝트 시작년도
                int nowEndYear = Integer.parseInt(map.get("LIST_NOW_END_DE").toString().split("-")[0]);     // 프로젝트 종료년도

                Map<String, Object> paramsTempMap = new HashMap<>();
                paramsTempMap.put("pjtSn", map.get("PJT_SN"));
                paramsTempMap.put("pjtCd", map.get("PJT_CD"));

                if(map.get("SBJ_SEP") != null) {
                    paramsTempMap.put("sbjSep", map.get("SBJ_SEP"));
                }

                if(map.get("COST_CLOSE_CK") != null && map.get("COST_CLOSE_CK").toString().equals("Y")) {
                    paramsTempMap.put("costCloseDt", map.get("COST_CLOSE_DT"));
                }

                paramsTempMap.put("reqYear", map.get("YEAR"));
                paramsTempMap.put("busnClass", map.get("BUSN_CLASS"));

                Map<String, Object> getPjtDevInfo = achieveRepository.getPjtDevSn(paramsTempMap);
                if(getPjtDevInfo != null) {
                    map.put("DEV_INV_AMT", getPjtDevInfo.get("INV_TOT_SUM"));
                }

                // 협업 체크
                if(map.get("TEAM_CK").equals("Y")) {
                    if(map.containsKey("PNT_TM_SN")) {
                        paramsTempMap.put("tmSn", map.get("PNT_TM_SN"));
                        map.put("DEV_INV_AMT", achieveRepository.getPjtTeamInvAmt(paramsTempMap));
                        List<Map<String, Object>> pjtTeamList = projectTeamRepository.getTeamList2(paramsTempMap);

                        double teamAmt = 0;         // 배분금액
                        double pjtAmt = 0;          // 총사업비
                        double teamExpAmtSum = 0;   // 예상수익 총합
                        double teamExpAmt = 0;      // 예상수익
                        for(Map<String, Object> pjtTeamInfo : pjtTeamList) {
                            teamExpAmtSum += Double.parseDouble(pjtTeamInfo.get("TM_EXP_AMT").toString());

                            if(pjtTeamInfo.get("TM_SN").toString().equals(map.get("PNT_TM_SN").toString())) {
                                teamAmt = Double.parseDouble(pjtTeamInfo.get("TM_AMT2").toString());
                                pjtAmt = Double.parseDouble(pjtTeamInfo.get("PJT_AMT").toString());
                                teamExpAmt = Double.parseDouble(pjtTeamInfo.get("TM_EXP_AMT").toString());
                            }
                        }

                        map.put("TM_EXP_AMT", teamExpAmt);             // 예상수익
                        map.put("TM_EXNP_PCT", Math.round(((teamAmt / pjtAmt) * 100) * 10) / 10.0);             // 매출배분율
                        map.put("TM_INCP_PCT", Math.round(((teamExpAmt / teamExpAmtSum) * 100) * 10) / 10.0);   // 수익배분율
                    }
                } else {
                    if(map.get("TEAM_STAT").equals("Y")) {
                        if(map.containsKey("TM_SN")) {
                            paramsTempMap.put("tmSn", map.get("TM_SN"));
                            map.put("DEV_INV_AMT", achieveRepository.getPjtTeamInvAmt(paramsTempMap));
                            List<Map<String, Object>> pjtTeamList = projectTeamRepository.getTeamList2(paramsTempMap);

                            double teamAmt = 0;         // 배분금액
                            double pjtAmt = 0;          // 총사업비
                            double teamExpAmtSum = 0;   // 예상수익 총합
                            double teamExpAmt = 0;      // 예상수익
                            for(Map<String, Object> pjtTeamInfo : pjtTeamList) {
                                teamExpAmtSum += Double.parseDouble(pjtTeamInfo.get("TM_EXP_AMT").toString());

                                if(pjtTeamInfo.get("TM_SN").toString().equals(map.get("TM_SN").toString())) {
                                    teamAmt = Double.parseDouble(pjtTeamInfo.get("TM_AMT2").toString());
                                    pjtAmt = Double.parseDouble(pjtTeamInfo.get("PJT_AMT").toString());
                                    teamExpAmt = Double.parseDouble(pjtTeamInfo.get("TM_EXP_AMT").toString());
                                }
                            }

                            map.put("TM_EXP_AMT", teamExpAmt);             // 예상수익
                            map.put("TM_EXNP_PCT", Math.round(((teamAmt / pjtAmt) * 100) * 10) / 10.0);             // 매출배분율
                            map.put("TM_INCP_PCT", Math.round(((teamExpAmt / teamExpAmtSum) * 100) * 10) / 10.0);   // 수익배분율
                        }
                    }
                }

                // 수익설정 예산
                Map<String, Object> planMap = achieveRepository.getPlanExnpAmt(paramsTempMap);
                double planAmt = (planMap.get("TOT_COST") == null ? 0 : Double.parseDouble(planMap.get("TOT_COST").toString()));

                // 비용설정 예산
                Map<String, Object> useMap = achieveRepository.getUseExnpAmt(paramsTempMap);
                double useAmt = (useMap.get("TOT_COST") == null ? 0 :  Double.parseDouble(useMap.get("TOT_COST").toString()));

                // 수익설정 지출합계
                Map<String, Object> incpMap = achieveRepository.getIncpCompAmt(paramsTempMap);
                double incpCompAmt1 = (incpMap.get("TOT_COST") == null ? 0 :  Double.parseDouble(incpMap.get("TOT_COST").toString()));

                // 비용설정 지출합계
                Map<String, Object> incpMap2 = achieveRepository.getIncpCompAmt2(paramsTempMap);
                double incpCompAmt2 = (incpMap2.get("TOT_COST") == null ? 0 :  Double.parseDouble(incpMap2.get("TOT_COST").toString()));

                // 다년프로젝트 체크해서 쿼리 분기
                Map<String, Object> projectPaySetData1 = new HashMap<>();
                Map<String, Object> projectPaySetData2 = new HashMap<>();
                if("C".equals(map.get("TEXT")) && "M".equals(map.get("YEAR_CLASS"))){
                    projectPaySetData1 = achieveRepository.getProjectPayBefMul(params);
                    projectPaySetData2 = achieveRepository.getProjectPayNowMul(params);
                }else{
                    projectPaySetData1 = achieveRepository.getProjectPayBef(params);
                    projectPaySetData2 = achieveRepository.getProjectPayNow(params);
                }



                // 수주금액
                if(map.get("LIST_STR_DE") != "") {
                    if(map.get("LIST_STR_DE").toString().split("-")[0].equals(params.get("pjtYear").toString())) {
                        if(map.get("TEAM_CK").equals("Y")) {        // 협업 - 수주부서
                            if(map.get("YEAR_CLASS").equals("M")) {
                                rndAmt += (map.get("ALL_PJT_AMT") == null ? 0 : Long.parseLong(map.get("ALL_PJT_AMT").toString()));
                            } else {
                                rndAmt += (map.get("PJT_AMT") == null ? 0 : Long.parseLong(map.get("PJT_AMT").toString()));
                            }
                        } else {
                            if(map.get("TEAM_STAT").equals("Y")) {  // 협업 - 협업부서

                            } else {
                                if(map.get("YEAR_CLASS").equals("M")) {
                                    rndAmt += (map.get("ALL_PJT_AMT") == null ? 0 : Long.parseLong(map.get("ALL_PJT_AMT").toString()));
                                } else {
                                    rndAmt += (map.get("PJT_AMT") == null ? 0 : Long.parseLong(map.get("PJT_AMT").toString()));
                                }
                            }
                        }
                    }
                }

                // 당해년도 종료 사업 여부
                if(nowStrYear == nowEndYear) {
                    long allAsrAmt = 0;     // 총 지출완료 합계
                    long asrAmt = 0;        // 총 지출완료 합계 * 매출배분율
                    if(map.get("COST_CLOSE_CK").equals("Y")) {      // 사업종료 여부

                        if(map.get("TEAM_CK").equals("Y")) {        // 협업 - 수주부서

                        } else {
                            if(map.get("TEAM_STAT").equals("Y")) {  // 협업 - 협업부서

                            } else {

                            }
                        }

                    } else {

                        if(map.get("TEAM_CK").equals("Y")) {        // 협업 - 수주부서

                        } else {

                            if(map.get("TEAM_STAT").equals("Y")) {  // 협업 - 협업부서

                            } else {

                            }
                        }
                    }
                } else {
                    // 프로젝트 종료년도 = 조회년도
                    if(nowEndYear == Integer.parseInt(map.get("YEAR").toString())) {
                        long allAsrAmt = 0;
                        long asrAmt = 0;
                        if(map.get("COST_CLOSE_CK").equals("Y")) {

                        } else {
                            if(map.get("BEF_DEADLINE_YN").equals("Y")) {      // 전년도 회계 마감 여부

                                if(map.get("TEAM_CK").equals("Y")) {        // 협업 - 수주부서

                                } else {

                                    if(map.get("TEAM_STAT").equals("Y")) {  // 협업 - 협업부서

                                    } else {

                                    }
                                }
                            } else {

                            }
                        }
                    } else if (nowStrYear == Integer.parseInt(map.get("YEAR").toString())) {        // 프로젝트 시작년도 = 조회년도
                        long asrAmt = 0;    // 달성매출액
                        // 회계년도 마감여부
                        if(map.get("NOW_DEADLINE_YN") != null && map.get("NOW_DEADLINE_YN").toString().equals("Y")) {

                            if(map.get("TEAM_CK").equals("Y")) {

                            } else {
                                if(map.get("TEAM_STAT").equals("Y")) {

                                } else {

                                }
                            }

                        } else {

                            if(map.get("TEAM_CK").equals("Y")) {

                            } else {
                                if(map.get("TEAM_STAT").equals("Y")) {

                                } else {

                                }
                            }

                        }


                    } else {        // 중간년도 = 조회년도
                        // 회계년도 마감여부
                        if(map.get("NOW_DEADLINE_YN") != null && map.get("NOW_DEADLINE_YN").toString().equals("Y")) {

                        }
                    }
                }
            }
        }


//        result.put("expIncpRndAmt", expIncpRndAmt);         // R&D 예상수익
//        result.put("expIncpUnRndAmt", expIncpUnRndAmt);     // 비R&D 예상수익
        result.put("expIncpEngnAmt", expIncpEngnAmt);       // 엔지니어링 예상운영수익
        result.put("expIncpOtherAmt", expIncpOtherAmt);     // 용역/기타 예상운영수익

//        result.put("incpRndAmt", incpRndAmt);               // R&D 달성운영수익
//        result.put("incpUnRndAmt", incpUnRndAmt);           // 비R&D 수익
        result.put("incpEngnAmt", incpEngnAmt);               // 엔지니어링 달성운영수익
        result.put("incpOtherAmt", incpOtherAmt);           // 용역/기타 달성운영수익

//        result.put("expSaleRndAmt", expSaleRndAmt);         // R&D 예상매출액
//        result.put("expSaleUnRndAmt", expSaleUnRndAmt);     // 비R&D 예상매출액
        result.put("expSaleEngnAmt", expSaleEngnAmt);       // 엔지니어링 예상매출액
        result.put("expSaleOtherAmt", expSaleOtherAmt);     // 용역/기타 예상매출액

//        result.put("saleRndAmt", saleRndAmt);       // R&D 달성매출액
//        result.put("saleUnRndAmt", saleUnRndAmt);   // 비R&D 매출액
        result.put("saleEngnAmt", saleEngnAmt);     // 엔지니어링 달성매출액
        result.put("saleOtherAmt", saleOtherAmt);   // 용역/기타 달성매출액

//        result.put("expEngnAmt", expEngnAmt);       // 엔지니어링 예상수주금액
//        result.put("expOtherAmt", expOtherAmt);     // 용역/기타 예상수주금액
//        result.put("expRndAmt", expRndAmt);         // R&D 예상수주금액
//        result.put("expUnRndAmt", expUnRndAmt);     // 비R&D 예상수주금액
        result.put("engnAmt", engnAmt);             // 엔지니어링 수주금액
        result.put("otherAmt", otherAmt);           // 용역/기타 수주금액
        result.put("rndAmt", rndAmt);               // R&D 수주액
//        result.put("unRndAmt", unRndAmt);           // 비R&D 수주액

        // 팀 목표
        params.put("deptLevel", "2");
        params.put("objType", "team");
        Map<String, Object> deptObj = achieveRepository.getDeptObjAmt(params);
        result.put("objDelvAmt", deptObj.get("DELV_OBJ").toString());
        result.put("objSaleAmt", deptObj.get("SALE_OBJ").toString());
        result.put("objIncpAmt", deptObj.get("INCP_OBJ").toString());

        // 운영비 목표
        params.put("objType", "oper");
        Map<String, Object> operObj = achieveRepository.getDeptObjAmt(params);
        result.put("objPayrollAmt", operObj.get("PAYROLL_OBJ").toString());
        result.put("objExnpAmt", operObj.get("EXNP_OBJ").toString());
        result.put("objCommAmt", operObj.get("COMM_OBJ").toString());

        return result;
    }
}
