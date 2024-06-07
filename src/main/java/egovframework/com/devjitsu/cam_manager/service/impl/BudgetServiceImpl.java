package egovframework.com.devjitsu.cam_manager.service.impl;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import egovframework.com.devjitsu.cam_manager.repository.BudgetRepository;
import egovframework.com.devjitsu.cam_manager.service.BudgetService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class BudgetServiceImpl implements BudgetService {

    @Autowired
    private BudgetRepository budgetRepository;

    @Override
    public void setBudget(Map<String, Object> params) {

        Gson gson = new Gson();

        List<Map<String, Object>> aList = gson.fromJson((String) params.get("aItemArr"), new TypeToken<List<Map<String, Object>>>() {}.getType());
        List<Map<String, Object>> bList = gson.fromJson((String) params.get("bItemArr"), new TypeToken<List<Map<String, Object>>>() {}.getType());

        if(params.get("aBg").equals("Y")) {
            for(Map<String, Object> item : aList) {
                params.put("jang", item.get("jang"));
                params.put("gwan", item.get("gwan"));
                params.put("hang", item.get("hang"));
                params.put("jangCd", item.get("jangCd"));
                params.put("gwanCd", item.get("gwanCd"));
                params.put("hangCd", item.get("hangCd"));
                params.put("budgetAmt", item.get("budgetAmt"));
                params.put("budgetType", item.get("budgetType"));
                params.put("budgetTypeCd", item.get("budgetTypeCd"));

                if(params.get("type").equals("M")){
                    params.put("pjtBudgetSn", item.get("pjtBudgetSn"));
                }

                if(params.get("type").equals("M") && !params.get("pjtBudgetSn").equals("")){
                    budgetRepository.insBudgetAHist(params);
                    budgetRepository.updBudgetAData(params);
                } else {
                    budgetRepository.insBudgetAData(params);
                }
            }


        }

        if(params.get("bBg").equals("Y")) {
            for(Map<String, Object> item : bList) {
                params.put("jang", item.get("jang"));
                params.put("gwan", item.get("gwan"));
                params.put("hang", item.get("hang"));
                params.put("jangCd", item.get("jangCd"));
                params.put("gwanCd", item.get("gwanCd"));
                params.put("hangCd", item.get("hangCd"));
                params.put("budgetAmt", item.get("budgetAmt"));
                params.put("budgetType", item.get("budgetType"));
                params.put("budgetTypeCd", item.get("budgetTypeCd"));

                if(params.get("type").equals("M")){
                    params.put("pjtBudgetSn", item.get("pjtBudgetSn"));
                }

                if(params.get("type").equals("M") && !params.get("pjtBudgetSn").equals("")){
                    budgetRepository.insBudgetBHist(params);
                    budgetRepository.updBudgetBData(params);
                } else {
                    budgetRepository.insBudgetBData(params);
                }
            }

        }
    }

    @Override
    public List<Map<String, Object>> getBudgetList(Map<String, Object> params) {
        return budgetRepository.getBudgetList(params);
    }

    @Override
    public int getBudgetCdDuplCnt(Map<String, Object> params) {
        Gson gson = new Gson();

        List<Map<String, Object>> aList = gson.fromJson((String) params.get("aItemArr"), new TypeToken<List<Map<String, Object>>>() {}.getType());
        List<Map<String, Object>> bList = gson.fromJson((String) params.get("bItemArr"), new TypeToken<List<Map<String, Object>>>() {}.getType());

        if(params.get("aBg").equals("Y")) {
            for(Map<String, Object> item : aList) {
                int cnt = 0;
                if(item.get("pjtBudgetSn") == null || item.get("pjtBudgetSn").equals("")){
                    params.put("jang", item.get("jang"));
                    params.put("gwan", item.get("gwan"));
                    params.put("hang", item.get("hang"));
                    params.put("jangCd", item.get("jangCd"));
                    params.put("gwanCd", item.get("gwanCd"));
                    params.put("hangCd", item.get("hangCd"));
                    params.put("budgetAmt", item.get("budgetAmt"));
                    params.put("budgetType", item.get("budgetType"));
                    params.put("budgetTypeCd", item.get("budgetTypeCd"));

                    cnt = budgetRepository.getBudgetACdCheck(params);
                }

                if(cnt > 0){
                    return cnt;
                }
            }
        }

        if(params.get("bBg").equals("Y")) {
            for(Map<String, Object> item : bList) {
                int cnt = 0;
                if(item.get("pjtBudgetSn") == null || item.get("pjtBudgetSn").equals("")){
                    params.put("jang", item.get("jang"));
                    params.put("gwan", item.get("gwan"));
                    params.put("hang", item.get("hang"));
                    params.put("jangCd", item.get("jangCd"));
                    params.put("gwanCd", item.get("gwanCd"));
                    params.put("hangCd", item.get("hangCd"));
                    params.put("budgetAmt", item.get("budgetAmt"));
                    params.put("budgetType", item.get("budgetType"));
                    params.put("budgetTypeCd", item.get("budgetTypeCd"));

                    cnt = budgetRepository.getBudgetBCdCheck(params);
                }

                if(cnt > 0){
                    return cnt;
                }
            }
        }


        return 0;
    }

    @Override
    public List<Map<String, Object>> getBudgetBList(Map<String, Object> params) {
        return budgetRepository.getBudgetBList(params);
    }

    @Override
    public List<Map<String, Object>> getBudgetAList(Map<String, Object> params) {
        return budgetRepository.getBudgetAList(params);
    }

    @Override
    public List<Map<String, Object>> getBudgets(Map<String, Object> params) {

        Gson gson = new Gson();
        List<String> ar = gson.fromJson((String) params.get("arKey"), new TypeToken<List<String>>() {}.getType());


        List<Map<String, Object>> list = new ArrayList<>();

        for(String key : ar) {
            Map<String, Object> map = new HashMap<>();

            params.put("pjtBudgetSn", key.substring(1));
            if(key.substring(0, 1).equals("A")) {
                map = budgetRepository.getBudgetAData(params);
            } else {
                map = budgetRepository.getBudgetBData(params);
            }

            list.add(map);
        }

        return list;
    }

    @Override
    public void delPjtBudgetItem(Map<String, Object> params) {
        if(!params.get("aItemArr").equals("")){
            budgetRepository.delPjtBudgetA(params);
        }

        if(!params.get("bItemArr").equals("")){
            budgetRepository.delPjtBudgetB(params);
        }
    }

    @Override
    public void regCloseBudget(Map<String, Object> params) {
        budgetRepository.regCloseBudgetA(params);
        budgetRepository.regCloseBudgetB(params);
    }

    @Override
    public List<Map<String, Object>> getPjtBudgetHistList(Map<String, Object> params) {
        List<Map<String, Object>> result = new ArrayList<>();

        if(params.get("pjtBudgetType").equals("A")){
            result = budgetRepository.getPjtBudgetAHistList(params);
        } else if(params.get("pjtBudgetType").equals("B")){
            result = budgetRepository.getPjtBudgetBHistList(params);
        }

        return result;
    }

    @Override
    public List<Map<String, Object>> getPreConditionA(Map<String, Object> params) {
        return budgetRepository.getPreConditionA(params);
    }

    @Override
    public List<Map<String, Object>> getPreConditionB(Map<String, Object> params) {
        return budgetRepository.getPreConditionB(params);
    }

    @Override
    public Map<String, Object> getBudgetDetail(Map<String, Object> params) {

        Map<String, Object> result = new HashMap<>();
        List<Map<String, Object>> rList = budgetRepository.getBudgetDetR(params);
        List<Map<String, Object>> sList = budgetRepository.getBudgetDetS(params);
        List<Map<String, Object>> mList = budgetRepository.getBudgetDetM(params);
        List<Map<String, Object>> dList = budgetRepository.getBudgetDetD(params);
        List<Map<String, Object>> vList = budgetRepository.getBudgetDetV(params);

        result.put("rList", rList);
        result.put("sList", sList);
        result.put("mList", mList);
        result.put("dList", dList);
        result.put("vList", vList);


        return result;
    }
}
