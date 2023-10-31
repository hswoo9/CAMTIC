package egovframework.com.devjitsu.g20.service.impl;

import egovframework.com.devjitsu.g20.repository.G20Repository;
import egovframework.com.devjitsu.g20.service.G20Service;
import egovframework.com.devjitsu.gw.login.dto.LoginVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Service
public class G20ServiceImpl implements G20Service {

    @Autowired
    private G20Repository g20Repository;

    @Override
    public List<Map<String, Object>> getProjectList(Map<String, Object> params) {
        return g20Repository.getProjectList(params);
    }

    @Override
    public List<Map<String, Object>> getSubjectList(Map<String, Object> params) {
         List<Map<String, Object>> listMap = g20Repository.getCommonGisuInfo(params);

        params.put("gisu", listMap.get(0).get("gisu"));
        params.put("fromDate", listMap.get(0).get("fromDate"));
        params.put("toDate", listMap.get(0).get("toDate"));

        params.put("mgtSeq", params.get("mgtSeq") + "|");

//        List<Map<String, Object>> subjectList = g20Repository.getSubjectList(params);

        List<Map<String, Object>> budgetList = g20Repository.getBudgetInfo(params);

        List<Map<String, Object>> result = new ArrayList<>();

        if(params.containsKey("stat")){
            for(Map<String, Object> map : budgetList){

                if(!"0".equals(map.get("DIV_FG"))){
                    result.add(map);
                }
            }
        } else {
            for(Map<String, Object> map : budgetList){

                if(!"0".equals(map.get("DIV_FG"))){

                    if(map.get("DIV_FG").equals("3")){
                        String bgt1Cd = map.get("BGT_CD").toString().substring(0, 1);
                        String bgt2Cd = map.get("BGT_CD").toString().substring(0, 3);

                        for(Map<String, Object> subject : budgetList) {
                            if (bgt1Cd.equals(subject.get("BGT_CD"))) {
                                map.put("BGT1_NM", subject.get("BGT_NM"));
                            }

                            if(bgt2Cd.equals(subject.get("BGT_CD"))) {
                                map.put("BGT2_NM", subject.get("BGT_NM"));
                            }
                        }
                        result.add(map);
                    }
                }
            }
        }

        return result;
    }

    @Override
    public List<Map<String, Object>> getBankList(Map<String, Object> params) {
        return g20Repository.getBankList(params);
    }

    @Override
    public Map<String, Object> getCrmInfo(Map<String, Object> params) {
        return g20Repository.getCrmInfo(params);
    }

    @Override
    public void setCrmInfo(Map<String, Object> params) {
        g20Repository.insCrmInfo(params);
    }

    @Override
    public List<Map<String, Object>> getClientList(Map<String, Object> params) {
        return g20Repository.getClientList(params);
    }

    @Override
    public List<Map<String, Object>> getCardList(Map<String, Object> params) {
        return g20Repository.getCardList(params);
    }

    @Override
    public List<Map<String, Object>> getOtherList(Map<String, Object> params) {
        return g20Repository.getOtherList(params);
    }

    @Override
    public Map<String, Object> getSempData(Map<String, Object> params) {
        return g20Repository.getSempData(params);
    }
}
