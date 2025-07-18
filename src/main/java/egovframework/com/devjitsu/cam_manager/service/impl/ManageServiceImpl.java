package egovframework.com.devjitsu.cam_manager.service.impl;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import dev_jitsu.MainLib;
import egovframework.com.devjitsu.cam_manager.repository.ManageRepository;
import egovframework.com.devjitsu.cam_manager.repository.PayAppRepository;
import egovframework.com.devjitsu.cam_manager.service.ManageService;
import egovframework.com.devjitsu.cam_project.repository.ProjectRepository;
import egovframework.com.devjitsu.common.repository.CommonRepository;
import egovframework.com.devjitsu.g20.repository.G20Repository;
import egovframework.com.devjitsu.g20.service.G20Service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.*;

@Service
public class ManageServiceImpl implements ManageService {

    @Autowired
    private ManageRepository manageRepository;

    @Autowired
    private CommonRepository commonRepository;

    @Autowired
    private ManageService manageService;

    @Autowired
    private G20Service g20Service;

    @Autowired
    private G20Repository g20Repository;

    @Autowired
    private PayAppRepository payAppRepository;

    @Override
    public List<Map<String, Object>> getMemList(Map<String, Object> params) {
        return manageRepository.getMemList(params);
    }

    @Override
    public Map<String, Object> getProjectData(Map<String, Object> map) {
        return manageRepository.getProjectData(map);
    }

    @Override
    public Map<String, Object> getEmpInfo(Map<String, Object> params) {
        return manageRepository.getEmpInfo(params);
    }

    @Override
    public List<Map<String, Object>> getUserPartRateInfo(Map<String, Object> params) {
        return manageRepository.getUserPartRateInfo(params);
    }

    @Override
    public List<Map<String, Object>> getUserSalList(Map<String, Object> params) {
        List<Map<String, Object>> list = new ArrayList<>();
        Map<String, Object> map = new HashMap<>();
        for(int i = 0 ; i < Integer.parseInt(params.get("diffMon").toString()) ; i++){
            map = manageRepository.getUserSalList(params);
            list.add(map);

            params.put("strMonth", LocalDate.parse(params.get("strMonth").toString()).plusMonths(1).format(DateTimeFormatter.ofPattern("yyyy-MM-dd")));
        }

        return list;
    }

    @Override
    public List<Map<String, Object>> checkExnpDetData(Map<String, Object> params) {

        List<Map<String, Object>> list = new ArrayList<>();

        String itemAr[] = params.get("arr").toString().split(",");

        for(String item : itemAr){
            Map<String, Object> map = new HashMap<>();
            params.put("payAppDetSn", item);

            map = manageRepository.checkExnpDetData(params);

            list.add(map);
        }

        return list;
    }

    @Override
    public void insIncmExpInfo(Map<String, Object> params) {
        Gson gson = new Gson();

        if (!StringUtils.isEmpty(params.get("itemArr"))) {
            manageRepository.incmExpInfoActiveN(params);
            List<Map<String, Object>> itemList = gson.fromJson((String) params.get("itemArr"), new TypeToken<List<Map<String, Object>>>(){}.getType());
            manageRepository.insIncmExpInfo(itemList);
        }
    }

    @Override
    public List<Map<String, Object>> getProjectBgtList (Map<String, Object> params){
        return manageRepository.getProjectBgtList(params);
    }

    @Override
    public int getProjectBgtCheck (Map<String, Object> params){
        return manageRepository.getProjectBgtCheck(params);
    }

    @Override
    public void setManageDepo (Map<String, Object> params){

        int cnt = Integer.parseInt(String.valueOf(manageRepository.chkManageDepo(params)));

        if(cnt > 0){
            manageRepository.updateManageDepo(params);
        }else{
            manageRepository.setManageDepo(params);
        }

    }

    @Override
    public Map<String, Object> getManageDepo (Map<String, Object> params){
        return manageRepository.getManageDepo(params);
    }

    @Override
    public List<Map<String, Object>> getEtaxListAll(Map<String, Object> params) {

        return manageRepository.getEtaxListAll(params);
    }

    @Override
    public List<Map<String, Object>> getUserAccountManagementList(Map<String, Object> map) {
        return manageRepository.getUserAccountManagementList(map);
    }

    @Override
    public Map<String, Object> getAccountInfoOne(Map<String, Object> params) {
        return manageRepository.getAccountInfoOne(params);
    }

    @Override
    public Map<String, Object> getCurrentAmountStatus(Map<String, Object> params) {
        return manageRepository.getCurrentAmountStatus(params);
    }

    @Override
    public Map<String, Object> getCarryoverAmt(Map<String, Object> params) {
        return manageRepository.getCarryoverAmt(params);
    }

    @Override
    public void updCarryoverAmt(Map<String, Object> params) {

        Map<String, Object> map = manageRepository.getExistProject(params);

        if(map == null){
            if(params.containsKey("carryoverCash")){
                manageRepository.insOverCash(params);
            }

            if(params.containsKey("carryoverPoint")){
                manageRepository.insOverPoint(params);
            }
        } else {
            if(params.containsKey("carryoverCash")){
                manageRepository.updOverCash(params);
            }

            if(params.containsKey("carryoverPoint")){
                manageRepository.updOverPoint(params);
            }
        }



    }

    @Override
    public List<Map<String, Object>> getBudgetDetailViewData(Map<String, Object> params) {
        return manageRepository.getBudgetDetailViewData(params);
    }

    @Override
    public List<Map<String, Object>> getIncpBudgetDetailViewData(Map<String, Object> params) {
        return manageRepository.getIncpBudgetDetailViewData(params);
    }

    @Override
    public Map<String, Object> getBudgetCodeData(Map<String, Object> params) {
        Map<String, Object> resultMap = new HashMap<>();

        int bgtCdLen = params.get("bgtCd").toString().length();

        if(bgtCdLen == 1){
            params.put("jangCd", params.get("bgtCd").toString().substring(0, 1));
            resultMap.put("JANG_NM", commonRepository.getJangCodeInfo(params).get("JANG_NM"));
        } else if(bgtCdLen == 3){
            params.put("jangCd", params.get("bgtCd").toString().substring(0, 1));
            resultMap.put("JANG_NM", commonRepository.getJangCodeInfo(params).get("JANG_NM"));
            params.put("gwanCd", params.get("bgtCd").toString().substring(1, 3));
            resultMap.put("GWAN_NM", commonRepository.getGwanCodeInfo(params).get("GWAN_NM"));
        } else if(bgtCdLen == 6){
            params.put("jangCd", params.get("bgtCd").toString().substring(0, 1));
            resultMap.put("JANG_NM", commonRepository.getJangCodeInfo(params).get("JANG_NM"));
            params.put("gwanCd", params.get("bgtCd").toString().substring(1, 3));
            resultMap.put("GWAN_NM", commonRepository.getGwanCodeInfo(params).get("GWAN_NM"));
            params.put("hangCd", params.get("bgtCd").toString().substring(3, 6));
            resultMap.put("HANG_NM", commonRepository.getHangCodeInfo(params).get("HANG_NM"));
        }

        return resultMap;
    }

    @Override
    public Map<String, Object> getIncpExnpAmt(Map<String, Object> params) {

        Map<String, Object> result = new HashMap<>();

        result = manageRepository.getIncpExnpAmtCondition(params);

        /*Map<String, Object> incpAData = manageRepository.getIncpACost(params);
        Map<String, Object> incpBData = manageRepository.getIncpBCost(params);
        Map<String, Object> incpCData = manageRepository.getIncpCCost(params);

        Map<String, Object> exnpAData = manageRepository.getExnpACost(params);
        Map<String, Object> exnpBData = manageRepository.getExnpBCost(params);
        Map<String, Object> exnpCData = manageRepository.getExnpCCost(params);

        result.put("incpA", incpAData.get("TOT_COST"));
        result.put("incpB", incpBData.get("TOT_COST"));
        result.put("incpC", incpCData.get("TOT_COST"));

        result.put("exnpA", exnpAData.get("TOT_COST"));
        result.put("exnpB", exnpBData.get("TOT_COST"));
        result.put("exnpC", exnpCData.get("TOT_COST"));*/

        return result;
    }

    @Override
    public void updProjectPayAsync(Map<String, Object> params) {

        List<Map<String, Object>> list = g20Service.getProjectList(params);

        for(Map<String, Object> map : list){
            params.put("pjtCd", map.get("pjtSeq"));
            params.put("baNb", map.get("bankNumber").toString().replaceAll("-", ""));

            Map<String, Object> result = manageService.getIncpExnpAmt(params);
            Map<String, Object> overAmt = manageRepository.getCarryoverAmt(params);

            long cash = 0;
            long point = 0;
            if(overAmt != null){
                cash = Long.parseLong(String.valueOf(overAmt.get("CARRYOVER_CASH")));
                point = Long.parseLong(String.valueOf(overAmt.get("CARRYOVER_POINT")));
            }

            long incpA = 0, incpB = 0, exnpA = 0, exnpB = 0;

            if(result != null){
                incpA = Long.parseLong(String.valueOf(result.get("incpA")));
                incpB = Long.parseLong(String.valueOf(result.get("incpB")));
                exnpA = Long.parseLong(String.valueOf(result.get("exnpA")));
                exnpB = Long.parseLong(String.valueOf(result.get("exnpB")));
            }

            long pjtPay =  (cash + point) + (incpA - exnpA) + (incpB - exnpB);

            params.put("pjtPay", pjtPay);


            Map<String, Object> existPjt = manageRepository.getExistProjectPayData(params);

            if(existPjt == null){
                manageRepository.insProjectPayAsync(params);
            } else {
                manageRepository.updProjectPayAsync(params);
            }
        }
    }

    @Override
    public void insProjectBudgetStatus(Map<String, Object> params){

        if(params.containsKey("pjtCd")){
            params.put("searchValue2", "1");
            params.put("searchText", params.get("pjtCd"));
        }

        params.put("pjtFromDate", LocalDate.now().getYear() + "0101");
        params.put("pjtToDate", LocalDate.now().getYear() + "1231");

        List<Map<String, Object>> list = g20Repository.getProjectList(params);

        for(Map<String, Object> map : list){
            Map<String, Object> paramMap = new HashMap<>();

            paramMap.put("pjtCd", map.get("pjtSeq"));
            paramMap.put("pjtNm", map.get("pjtName"));
            paramMap.put("pjtStrDt", map.get("pjtFromDate"));
            paramMap.put("pjtEndDt", map.get("pjtToDate"));

            params.put("pjtCd", map.get("pjtSeq"));
            params.put("mgtSeq", map.get("pjtSeq") + "|");
            params.put("erpCompSeq", "1212");

            List<Map<String, Object>> listMap = g20Repository.getCommonGisuInfo(params);

            params.put("gisu", listMap.get(0).get("gisu"));
            params.put("fromDate", map.get("pjtFromDate").toString().replaceAll("-", ""));
            params.put("toDate", map.get("pjtToDate").toString().replaceAll("-", ""));
            params.put("startDt", map.get("pjtFromDate"));
            params.put("endDt", map.get("pjtToDate"));
            params.put("baseDate", LocalDate.now().toString().replaceAll("-", ""));
            params.put("temp", "2");

            // 지출예산
            List<Map<String, Object>> budgetList = g20Repository.getBudgetInfo(params);
            params.put("mgtSeq", map.get("pjtSeq"));

            List<Map<String, Object>> exnpBudgetList = payAppRepository.getExnpBudgetList(params);

            long exnpAmt = 0;
            long exnpApprAmt = 0;

            for(Map<String, Object> budget : budgetList){
                if(!"0".equals(budget.get("DIV_FG"))){
                    if(budget.get("DIV_FG").equals("1")){
                        exnpAmt += Double.parseDouble(String.valueOf(budget.get("CALC_AM")));
                    }

                    for(Map<String, Object> tMap : exnpBudgetList){
                        if(budget.get("BGT_CD").toString().equals(tMap.get("BUDGET_SN").toString())){
                            exnpApprAmt += Long.parseLong(tMap.get("APPROVAL_AMT").toString());
                        }
                    }
                }
            }

            paramMap.put("exnpBudgetAmt", exnpAmt);                      // 지출예산
            paramMap.put("exnpBudgetSubAmt", exnpAmt - exnpApprAmt);     // 지출예산잔액

            // 수입예산
            params.put("temp", "1");
            params.put("mgtSeq", map.get("pjtSeq") + "|");
            List<Map<String, Object>> incpList = g20Repository.getBudgetInfo(params);
            params.put("mgtSeq", map.get("pjtSeq"));

            List<Map<String, Object>> incpBudgetList = payAppRepository.getIncpBudgetList(params);

            long incpAmt = 0;
            long incpApprAmt = 0;

            for(Map<String, Object> budget : incpList){
                if(!"0".equals(budget.get("DIV_FG"))){
                    if(budget.get("DIV_FG").equals("1")){
                        incpAmt += Double.parseDouble(String.valueOf(budget.get("CALC_AM")));
                    }

                    for(Map<String, Object> tMap : incpBudgetList){
                        if(budget.get("BGT_CD").toString().equals(tMap.get("BUDGET_SN").toString())){
                            incpApprAmt += Long.parseLong(tMap.get("APPROVAL_AMT").toString());
                        }
                    }
                }
            }

            paramMap.put("incpBudgetAmt", incpAmt);                                 // 수입예산
            paramMap.put("incpBudgetSubAmt", incpAmt - incpApprAmt);    // 수입예산잔액

            // 이월금액
            Map<String, Object> corpPjtInfo = manageRepository.getExistProject(params);

            if(corpPjtInfo != null) {
                paramMap.put("carryoverCash", corpPjtInfo.get("OVER_CASH") == null ? 0 : corpPjtInfo.get("OVER_CASH"));
                paramMap.put("carryoverPoint", corpPjtInfo.get("OVER_POINT") == null ? 0 : corpPjtInfo.get("OVER_POINT"));
            } else {
                paramMap.put("carryoverCash", 0);
                paramMap.put("carryoverPoint", 0);
            }

            // 계좌
            params.put("bankNB", map.get("bankNumber").toString().replaceAll("-", ""));
            params.put("baNb", params.get("bankNB"));
            paramMap.put("bankNB", map.get("bankNumber"));

            // 시재
            Map<String, Object> incpExnpMap = manageRepository.getIncpExnpAmtCondition(params);
            if(incpExnpMap != null){
                paramMap.put("pettyCash", incpExnpMap.get("SIJE") == null ? 0 : incpExnpMap.get("SIJE"));
            } else {
                paramMap.put("pettyCash", 0);
            }

            // 금융CM연동시재
            Map<String, Object> ibranchMap = manageRepository.getCurrentAmountStatus(params);

            if(ibranchMap != null){
                paramMap.put("ibranchAmt", ibranchMap.get("TX_CUR_BAL") == null ? 0 : ibranchMap.get("TX_CUR_BAL"));
            } else {
                paramMap.put("ibranchAmt", 0);
            }

            manageRepository.insProjectBudgetStatus(paramMap);
        }
    }

    @Override
    public List<Map<String, Object>> getProjectBudgetStatusList(Map<String, Object> params) {
        return manageRepository.getProjectBudgetStatusList(params);
    }

    @Override
    public Map<String, Object> getExistProject(Map<String, Object> params) {
        return manageRepository.getExistProject(params);
    }
}
